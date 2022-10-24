<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header">
          Combine Train and Cargo
        </slot>
        <button
            type="button"
            class="btn-close"
            @click="close"
        >
          x
        </button>
      </header>

      <section class="modal-body">
        <slot name="body">
          <div>
            train id : {{ input_item_id }}
          </div>
          <div>
            current balance wallet: {{ input_currentBalance_wallet }}
          </div>
          <div>
            current balance bank: {{ input_currentBalance_bank }}
          </div>
          <br/>
          <div>
            train config: {{ cargo_info }}
          </div>

          <hr/>


          <template v-for="item in inputs" :key="item">

            <br/>
            <div>{{ item.id }} - {{ item.name }}</div>
            <div>unused cargo : {{ item.quantity }}</div>


            <div class="grid grid-rows-4 grid-flow-col gap-4">
              <button
                  type="button"
                  class="btn-green"
                  @click="removeButton(item.id)"
              >
                -
              </button>

              <div class="text-center">
                {{ item.current_qty }}
              </div>


              <button
                  type="button"
                  class="btn-green"
                  @click="addButton(item.id)"
              >
                +
              </button>
            </div>
            <div class="text-center">
              change: {{ infoNumber(item.diff) }}
            </div>


          </template>

          <br/>
          <hr/>
          <br/>

          <div class="grid grid-rows-4 grid-flow-col gap-4">
            <button
                type="button"
                class="btn-green"
                @click="executeUpgrade()"
            >
              Upgrade
            </button>


          </div>

        </slot>
      </section>

      <footer class="modal-footer">
        <slot name="footer">
          status: {{ loading_status }}
          <!--          {{status}}-->
        </slot>
      </footer>
    </div>
  </div>
</template>

<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #FFFFFF;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: #4AAE9B;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #4AAE9B;
  background: transparent;
}

.btn-green {
  color: white;
  background: #4AAE9B;
  border: 1px solid #4AAE9B;
  border-radius: 2px;
}
</style>


<script>
import trancodeCombineService from "../library/trancode_combine_service";
import trancode_train_service from "../library/trancode_train_service";
import {InputCargoUpgrade, ListInputCombine, PassingItemToModal} from "@/library/models";

export default {
  name: 'Modal',
  data() {
    return {
      cargo_info: "",
      // map_id: 1,
      // gameInfo: null,
      rockInfo: null,
      isModalGenericVisible: false,
      isModalGenericProcessing: false,
      content: "",
      methodName: "",
      status: "",
      total_cargo: 1,
      input_cargo_ids: [],
      input_item_id: -1,
      // input_currentBalance: -1,
      input_weaponTier: -1,
      loading_status: "",
      inputs: [],
      input_currentBalance_wallet: -1,
      input_currentBalance_bank: -1

    }
  },
  props: {
    current_address: String,
  },
  mounted() {
    window.vm_modal_combine = this;

  },
  methods: {
    addButton(item_id) {
      // console.log("add");

      let item = this.inputs.filter(function (item) {
        return item.id == item_id;
      })[0];


      // if (item.current_qty == item.quantity) {
      //   return;
      // }
      if (item.current_qty == item.max_qty) {
        return;
      }
      item.current_qty = item.current_qty + 1;
      item.diff++;

    },
    removeButton(item_id) {
      // console.log("remove");

      let item = this.inputs.filter(function (item) {
        return item.id == item_id;
      })[0];

      if (item.current_qty == 0) {
        return;
      }
      // if (item.current_qty == item.min_qty) {
      //   return;
      // }
      item.current_qty = item.current_qty - 1;
      item.diff--;
    },
    receiveDataFromMain(x) {

      this.input_cargo_ids = x.cargo_ids;
      this.input_item_id = x.item_id;
      this.input_currentBalance_bank = x.currentBalanceBank;
      this.input_currentBalance_wallet = x.currentBalanceWallet;
      this.input_weaponTier = x.weaponTier;

      const trainCargos = x.train.trainCargos;
      this.cargo_info = this.getTrainCargoDesc(trainCargos)

      this.loading_status = "prepare for transaction";


      this.inputs = this.input_cargo_ids.map(y => {
        let item = new ListInputCombine();
        item.id = parseInt(y.id);
        item.name = y.name;
        item.quantity = parseInt(y.quantity);
        // item.current_qty = item.quantity;
        item.min_qty = parseInt(trainCargos[item.id]);
        item.current_qty = item.min_qty;
        item.max_qty = item.min_qty + item.quantity;
        return item;
      })


    },
    infoNumber(input) {
      if (input >= 0) {
        return "+" + input;
      } else {
        return input;
      }
    },

    parseCargos(total_cargo) {
      return total_cargo.toString().split(",");
    },
    getTrainCargoDesc(input) {
      let itemsCargo = input;
      // console.log("getTrainCargoDesc",input)
      return "[coal-" + itemsCargo[1] + "]|  [oil-" + itemsCargo[2] + "]";
    },
    async executeUpgrade() {


      this.loading_status = "transaction in progress";


      let inputs2 = this.inputs.map(y => {
        let item = new InputCargoUpgrade();
        item.cargo_id = parseInt(y.id);
        item.amount = y.diff;
        if (y.diff < 0){
          item.amount = y.diff * -1 + 1000;
        }
        return item;
      })

      console.log("input2", inputs2)

      await trancodeCombineService.functionCombineCargo(this.current_address, this.input_item_id, inputs2);

      this.loading_status = "transaction complete";
      this.$emit('close');
      window.vm.reloadData();


    },
    close() {
      // window.vm.showAlert();
      this.$emit('close');
    },
  },
};
</script>