<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header">
          Pick Map
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
            current balance wallet: {{ input_currentBalance_wallet }}
          </div>
          <div>
            current balance bank: {{ input_currentBalance_bank }}
          </div>
          <br/>
          <div>
            weapon tier: {{ input_weaponTier }}
          </div>
          <div>cargo: {{ input_train.trainCargoDesc }}</div>
          <div>coal: 20 | oil: 30</div>
          <br/>
          <li v-for="item in maps" :key="item">
            {{ displayCityInfo(item) }}
            <!--            {{ item }}-->
          </li>
          <br/>
          <hr/>

          <br/>

          <!--          <div>input cargo ids</div>-->
          <!--          <div class="p-2 bg-blue-400">-->

          <!--            <input-->
          <!--                class="-->
          <!--                        shadow-->
          <!--                        appearance-none-->
          <!--                        border-->
          <!--                        rounded-->
          <!--                        w-full-->
          <!--                        py-2-->
          <!--                        px-3-->
          <!--                        text-gray-700-->
          <!--                        leading-tight-->
          <!--                        focus:outline-none focus:shadow-outline-->
          <!--                      "-->
          <!--                v-model="total_cargo"-->
          <!--            />-->
          <!--          </div>-->
          <br/>


          <div class="grid grid-rows-4 grid-flow-col gap-4">
            <button
                type="button"
                class="btn-green"
                @click="executeActiveStake(1)"
            >
              Berlin
            </button>

            <br/>
            <br/>

            <button
                type="button"
                class="btn-green"
                @click="executeActiveStake(2)"
            >
              London
            </button>

            <br/>
            <br/>
            <button
                type="button"
                class="btn-green"
                @click="executeActiveStake(3)"
            >
              Tokyo
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
import trancode_train_service from "../library/trancode_train_service";
import {PassingItemToModal} from "@/library/models";

export default {
  name: 'Modal',
  data() {
    return {
      maps: [],
      // map_id: 1,
      // gameInfo: null,
      rockInfo: null,
      isModalGenericVisible: false,
      isModalGenericProcessing: false,
      content: "",
      methodName: "",
      status: "",
      total_cargo: 1,
      // input_cargo_ids : [],
      input_item_id: -1,
      input_train: [],

      input_weaponTier: -1,
      loading_status: "",
      reload_id: 0,
      input_currentBalance_wallet : -1,
      input_currentBalance_bank : -1

    }
  },
  props: {
    current_address: String,
  },
  mounted() {
    this.maps.push({display: "1 - berlin - [100] block cooldown", value: 5, result: -1, map_id: 1})
    this.maps.push({display: "2 - london - [200] block cooldown", value: 15, result: -1, map_id: 2})
    this.maps.push({display: "3 - tokyo - [300] block cooldown", value: 30, result: -1, map_id: 3})
    window.vm_modal = this;
    // this.maps.push("3 - tokyo - [300] block cooldown - got 30");


  },
  methods: {

    async reloadDataInquiry() {
      this.reload_id = this.reload_id + 1;
      console.log("reload_id", this.reload_id)
      let reload_id_local = this.reload_id;
      for (let i = 1; i <= 3; i++) {
        let map_id = i;
        const item = this.maps.filter(function (item) {
          return item.map_id == map_id;
        })[0];
        item.result = -1;
      }
      for (let i = 1; i <= 3; i++) {
        let map_id = i;
        let output = await trancode_train_service.functionCalcCampaign(map_id, this.input_weaponTier,
            this.input_train.trainCargos);
        const item = this.maps.filter(function (item) {
          return item.map_id == map_id;
        })[0];

        if (this.reload_id == reload_id_local) {
          item.result = output;
          item.result = parseFloat(item.result) / parseFloat(10 ** 18);
        }


      }


    },
    receiveDataFromMain(x) {
      console.log("modal", "receiveData", x)

      // this.input_cargo_ids = x.cargo_ids;
      this.input_item_id = x.item_id;
      this.input_currentBalance_wallet = x.currentBalanceWallet;
      this.input_currentBalance_bank = x.currentBalanceBank;

      this.input_weaponTier = x.weaponTier;
      this.input_train = x.train;
      this.loading_status = "prepare for transaction";


      // window.modal_loading_status = "prepare for transaction";
      // alert("receive-data-"+x);

      this.reloadDataInquiry();
    },
    // displayCargoIds() {
    //   const output = this.input_cargo_ids.map(x => {
    //     return x.id
    //   })
    //   return output.join(",");
    //
    // },
    displayCityInfo(item) {
      let tier = (this.input_weaponTier + 1);
      let output = tier * item.value;
      // let nextBalance = this.input_currentBalance + output;

      let nextBalance = "---"
      if (item.result != -1) {
        nextBalance = item.result;
      }

      return item.display + " - reward " + item.value + " * " + tier + " = " + output + " , forecast balance: " + nextBalance;
    },


    parseCargos(total_cargo) {
      return total_cargo.toString().split(",");
    },
    async executeActiveStake(map_id) {
      let item_id = parseInt(this.input_item_id);
      let item_cargos = this.parseCargos(this.total_cargo);
      let log1 = "item_id: " + item_id + " - " + "map_id:" + map_id;
      console.log("active stake", log1);

      this.loading_status = "transaction in progress";
      await trancode_train_service.functionSendCampaign(this.current_address, item_id, map_id);
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