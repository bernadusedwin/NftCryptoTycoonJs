<template>
  <div>
    <sidebar-component></sidebar-component>
    <div class="relative md:ml-64 bg-blueGray-100">
      <navbar-component></navbar-component>
      <!-- Header - Start -->
      <div class="relative bg-blue-600 md:pt-32 pb-32 pt-12">
        <div class="px-4 md:px-10 mx-auto w-full">
          <div>
            <login-component
                title="hello world"
                :callbackMetamask="receiveMetamask"
            ></login-component>


            <div class="text-white p-2 m-4 bg-blue-400">
              <div>Balance Wallet: {{ balanceWallet }}</div>
              <div>Balance Bank: {{ balanceBank }}</div>
            </div>
            <button
                v-if="is_ready == true"
                class="text-white p-2 m-4 bg-blue-400"
                v-on:click="mintingFreshTrain()"
            >
              Fresh Mint - {{ getFreshMintPrice() }}
            </button>
            <br/>

            <button
                v-if="is_ready == true"
                class="text-white p-2 m-4 bg-blue-400"
                v-on:click="mintingTrain()"
            >
              Mint - {{ getMintFromCoinPrice() }}
            </button>

            <button
                v-if="is_ready == true"
                class="text-white p-2 m-4 bg-blue-400"
                v-on:click="claimMoney()"
            >
              Claim TRAIN
            </button>

            <br/>
            <button
                v-if="is_ready == true"
                class="text-white p-2 m-4 bg-blue-400"
                v-on:click="mintCargoCoal()"
            >
              Mint Coal - {{ getMintCargoPrice() }}

            </button>
            <button
                v-if="is_ready == true"
                class="text-white p-2 m-4 bg-blue-400"
                v-on:click="mintCargoOil()"
            >
              Mint Oil - {{ getMintCargoPrice() }}
            </button>


            <!-- Card stats -->
          </div>
        </div>
      </div>
      <!-- Header - End -->

      <div class="px-4 md:px-10 mx-auto w-full -m-24">

        <div class="w-full 2xl:w-8/12 mb-12 xl:mb-0 px-4">
          <div
              class="
              relative
              flex flex-col
              min-w-0
              break-words
              bg-white
              w-full
              mb-6
              shadow-lg
              rounded
            "
          >
            <div class="rounded-t mb-0 px-4 py-3 border-0">

              <div>local mode: {{ is_debug }}</div>
              <div>Contract Main: {{ contractMain }}</div>
              <div>Contract TRAIN: {{ contractErc20 }}</div>
              <div>Contract Cargo: {{ contractCargo }}</div>

              <br/>
              <div class="flex flex-wrap items-center">
                <div
                    class="relative w-full px-4 max-w-full flex-grow flex-1"
                    v-if="is_ready == false"
                >
                  <div>Connect first</div>
                </div>
                <div
                    class="relative w-full px-4 max-w-full flex-grow flex-1"
                    v-if="is_ready"
                >


                  <div>Item List</div>
                  <!--                  <div>Total Your NFT: {{ totalNftFromPlayer }}</div>-->

                  <div>Total Supply NFT Item: {{ totalSupply }}</div>
                  <div>Total Supply NFT Cargo Item: {{ totalSupplyCargo }}</div>
                  <br/>
                  <div>Prev timestamp block number: {{ prevBlockNumber }}</div>
                  <div>Current timestamp block number: {{ blockNumber }}</div>
                  <br/>
                  <div>Timer: {{ timer }}</div>
                  <br/>

                  <br/>
                  <div v-if="items.length == 0">---</div>

                  <table class="border-collapse border border-amber-600 w-full">
                    <thead>
                    <tr>
                      <th class="border border-amber-600 ...">Id</th>
                      <th class="border border-amber-600 ...">Body</th>
                      <th class="border border-amber-600 ..."></th>
                      <!--                      <th class="border border-amber-600 ...">Level</th>-->
                      <th class="border border-amber-600 ...">TrainTier</th>
                      <th class="border border-amber-600 ...">Action</th>
                      <th class="border border-amber-600 ...">Timestamp</th>
                      <th class="border border-amber-600 ...">Button</th>


                    </tr>
                    </thead>
                    <tbody>
                    <template v-for="item in items" :key="item">
                      <tr class="text-center">
                        <td class="border border-amber-600 ...">{{ item.id }}</td>
                        <td class="border border-amber-600 ...">{{ item.body }}</td>
                        <td class="border border-amber-600 content-center">
                          <img
                              v-bind:src="convertImage(item.body)"
                              class="object-contain w-16 content-center m-4"
                          />
                        </td>
                        <!--                        <td class="border border-amber-600 ...">{{ item.level }}</td>-->
                        <td class="border border-amber-600 ...">{{ item.weaponTier }}</td>
                        <td class="border border-amber-600 ...">
                          {{ item.action }}
                          <br/>
                          ({{ infoAction(item.action) }})

                        </td>
                        <td class="border border-amber-600 ...">
                          {{ item.timestamp }} ({{ inquiryItemReady(item.timestamp) }})
                          <br/>
                          <div class="text-red-500" v-if="inquiryIsItemBusy(item.timestamp)">
                            TRAIN IN PROGRESS
                          </div>

                          <br/>
                          ownerNft:
                          <br/>
                          <div class="text-sm">
                            {{ item.ownerNft }}
                          </div>
                          ownerAddress:
                          <br/>
                          <div class="text-sm">
                            {{ item.ownerAddress }}
                          </div>

                          <br/>
                          opensea: {{ item.isOpenSea }}
                          <br/>
                          {{ item.trainCargoDesc }}

                        </td>

                        <td class="border border-amber-600 ...">
                          <br/>
                          <button
                              v-if="is_ready == true"
                              class="text-white p-2 bg-blue-400"
                              v-on:click="unstake(item)"
                          >
                            Unstake
                          </button>
                          <br/>
                          <br/>
                          <button
                              v-if="is_ready == true"
                              class="text-white p-2 bg-orange-600"
                              v-on:click="activeStake(item)"
                          >
                            Transport
                          </button>
                          <br/>
                          <br/>

                          <button
                              v-if="is_ready == true"
                              class="text-white p-2 bg-red-600"
                              v-on:click="combineCargo(item)"
                          >
                            Manage Cargo
                          </button>
                          <br/>
                          <br/>


<!--                          <button-->
<!--                              v-if="is_ready == true"-->
<!--                              class="text-white p-2 bg-green-500"-->
<!--                              v-on:click="splitCargo(item)"-->
<!--                          >-->
<!--                            Split Cargo-->
<!--                          </button>-->
<!--                          <br/>-->
<!--                          <br/>-->

                          <button
                              v-if="is_ready == true"
                              class="text-white p-2 bg-blueGray-600"
                              v-on:click="upgradeWeapon(item)"
                          >
                            Upgrade Train <br/> {{ getUpgradePrice() }}
                          </button>
                          <br/>
                          <br/>
                        </td>


                      </tr>
                    </template>
                    </tbody>
                  </table>


                  <br/>

                  <br/>
                  <hr/>
                  <br/>

                  <h2>Cargo</h2>
                  <table class="border-collapse border border-amber-600 w-full">
                    <thead>
                    <tr>
                      <th class="border border-amber-600 ...">Id</th>
                      <th class="border border-amber-600 ...">Name</th>
                      <th class="border border-amber-600 ...">Amount</th>
                      <th class="border border-amber-600 ...">Button</th>


                    </tr>
                    </thead>
                    <tbody>
                    <template v-for="item in itemsCargo" :key="item">
                      <tr class="text-center">
                        <td class="border border-amber-600 ...">{{ item.id }}</td>
                        <td class="border border-amber-600 ...">{{ item.name }}</td>
                        <td class="border border-amber-600 content-center">
                          {{ item.quantity }}
                        </td>
                        <td class="border border-amber-600 ...">
                          <!--                          <br/>-->
                          <!--                          <button-->
                          <!--                              v-if="is_ready == true"-->
                          <!--                              class="text-white p-2 bg-blue-400"-->
                          <!--                              v-on:click="unstakeCargo(item)"-->
                          <!--                          >-->
                          <!--                            Unstake-->
                          <!--                          </button>-->
                          <!--                          <br/>-->
                          <!--                          <br/>-->
                          <!--                          <button-->
                          <!--                              v-if="is_ready == true"-->
                          <!--                              class="text-white p-2 bg-orange-600"-->
                          <!--                              v-on:click="stakeCargo(item)"-->
                          <!--                          >-->
                          <!--                            Stake-->
                          <!--                          </button>-->
                          <!--                          <br/>-->
                          <!--                          <br/>-->
                        </td>


                      </tr>
                    </template>
                    </tbody>
                  </table>


                  <br/>
                  <br/>
                  <hr/>


                  <div v-if="is_loading">Loading .....</div>
                  <div v-if="is_loading">
                    If the newly minted item does not appear. try again after 2
                    min
                  </div>
                  <div v-if="loading_counter >= 0">
                    {{ loading_counter }} of {{ total }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <about-component></about-component>
        <ModalStacking
            v-bind:current_address="current_address"
            v-show="isModalVisible"
            @close="closeModal"
        />
        <ModalSplit
            v-bind:current_address="current_address"
            v-show="isModalSplitVisible"
            @close="closeModalSplit"
        />
        <ModalCombine
            v-bind:current_address="current_address"
            v-show="isModalCombineVisible"
            @close="closeModalCombine"
        />
<!--        <modal-generic-->
<!--            ref="modalGeneric"-->
<!--            v-bind:current_address="current_address"-->
<!--        ></modal-generic>-->
<!--        <modal-sell-->
<!--            ref="modalSell"-->
<!--            v-bind:current_address="current_address"-->
<!--        ></modal-sell>-->
      </div>
    </div>
  </div>


</template>


<script>
import NavbarComponent from "../components/Navbar.vue";
import SidebarComponent from "../components/Sidebar.vue";
import AboutComponent from "../components/About.vue";
import LoginComponent from "../components/Login.vue";
// import ModalGeneric from "@/components/ModalGeneric";
// import ModalSell from "@/components/ModalSell";
import trancodeCargoService from "../library/trancode_cargo_service";
import trancodeTrainService from "../library/trancode_train_service";
import trancodeGenericService from "../library/trancode_generic_service";
import trancodeTrainInquiryListService from "../library/trancode_train_inquiry_list_service";
import trancodeCargoInquiryListService from "../library/trancode_cargo_inquiry_list_service";
import trancodeCombineService from "../library/trancode_combine_service";

import abi_service from "@/library/abi_service";
import priceParam from "../library/price_param";
import ModalStacking from './ModalStacking.vue';
import ModalCombine from './ModalCombine.vue';
import ModalSplit from './ModalSplit.vue';
import {InputCargoUpgrade, PassingItemToModal} from "@/library/models";

let vm = null;

export default {
  name: "main-page",
  components: {
    NavbarComponent,
    SidebarComponent,
    AboutComponent,
    LoginComponent,
    // ModalGeneric,
    // ModalSell,
    ModalStacking,
    ModalSplit,
    ModalCombine,


  },
  data() {
    return {
      isModalVisible: false,
      isModalSplitVisible: false,
      isModalCombineVisible: false,
      map_id: 1,
      contractMain: "no_data",
      contractErc20: "no_data",
      contractCargo: "no_data",
      total: 10000,
      loading_counter: -1,
      is_ready: false,
      is_loading: false,
      // totalNftFromPlayer: "no_data",
      balanceBank: -1,
      balanceWallet: -1,
      totalSupply: -1,
      totalSupplyCargo: -1,
      is_debug: false,
      gameService: null,
      trancodeService: null,
      address: "",
      current_address: "",
      items: [],
      itemsCargo: [],
      prevBlockNumber: -1,
      blockNumber: -1,
      timer: 1,
      reload_id: 0,
    };
  },
  mounted: function () {
    this.is_debug = abi_service.isDevMode();
    this.address = "info 1";
    this.contractErc20 = abi_service.getErc20Contract();
    this.contractMain = abi_service.getMainContract();
    this.contractCargo = abi_service.getCargoContract();

    vm = this;
    window.vm = this;
    this.runTimer();
    // }
  },
  methods: {
    async debugCallCargo() {

      let inputs = [];
      {
        let item = new InputCargoUpgrade();
        item.cargo_id = 1;
        item.amount = 1;
        inputs.push(item);
      }
      {
        let item = new InputCargoUpgrade();
        item.cargo_id = 2;
        item.amount = 1;
        inputs.push(item);
      }

      await trancodeCombineService.functionCombineCargo(this.address, 1,inputs);
    },
    getMintFromCoinPrice() {
      let v = abi_service.inquiryChainId();
      return priceParam.inquiryMintFromCoinPrice()
    },
    getMintCargoPrice() {
      let v = abi_service.inquiryChainId();
      return priceParam.inquiryMintCargoPrice()
    },
    getFreshMintPrice() {
      return priceParam.inquiryFreshMintPrice();
    },
    getUpgradePrice() {
      return priceParam.inquiryUpgradePrice();
    },
    showAlert() {
      alert("hello")
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    showModalSplit() {
      this.isModalSplitVisible = true;
    },
    closeModalSplit() {
      this.isModalSplitVisible = false;
    },
    showModalCombine() {
      this.isModalCombineVisible = true;
    },
    closeModalCombine() {
      this.isModalCombineVisible = false;
    },
    async updateBlockInfo() {
      let currentBlockNumber = this.blockNumber;
      this.blockNumber = await trancodeGenericService.getBlockNumber();
      if (this.blockNumber != currentBlockNumber) {
        this.prevBlockNumber = currentBlockNumber;
      }

      this.timer = this.timer + 1;
    },
    runTimer() {
      setInterval(function () {
        vm.updateBlockInfo();
      }, 2000);
    },
    infoAction: function (input) {
      if (input == "0") {
        return "unstake";
      } else if (input == "1") {
        return "minting-sickness";
      } else if (input == "2") {
        return "active-stake";
      } else if (input == "3") {
        return "upgrading";
      } else if (input == "4") {
        return "end-upgrade";
      } else if (input == "101") {
        return "after-upgrade-train";
      } else {
        return "no-info";
      }
    },

    inquiryItemReady: function (trainBlockNumber) {
      // console.log("inquiryItemReady",parseInt(trainBlockNumber),this.blockNumber)
      if (parseInt(trainBlockNumber) > parseInt(this.blockNumber)) {
        let diff = trainBlockNumber - this.blockNumber;
        return "busy , diff " + diff + " block";
      } else {
        return "ready";
      }
    },

    inquiryItemReadyCargo: function (trainBlockNumber) {
      if (parseInt(trainBlockNumber) > parseInt(this.blockNumber)) {
        let diff = trainBlockNumber - this.blockNumber;
        return "busy , diff " + diff + " block";
      } else {
        return "ready";
      }
    },

    inquiryIsItemBusy: function (trainBlockNumber) {
      if (parseInt(trainBlockNumber) > this.blockNumber) {
        return true;
      } else {
        return false;

      }
    },

    mintCargo: async function (fragmentCode) {
      console.log("fragmentCode",fragmentCode)
      let input = prompt("How many?", "1");
      if (input == null || input == "") {
        console.log("skip")
      } else {
        let inputNumber = 0;
        inputNumber = parseInt(input);
        this.is_loading = true;
        await trancodeCargoService.mintCargo(this.address, fragmentCode,inputNumber);
        await this.reloadData();
        this.is_loading = false;
      }
    },
    mintCargoCoal: async function () {
      this.mintCargo(1);
    },
    mintCargoOil: async function () {
      this.mintCargo(2);
    },
    claimMoney: async function () {
      this.is_loading = true;
      await trancodeTrainService.claimMoney(this.address);
      await this.reloadData();
      this.is_loading = false;
    },
    mintingFreshTrain: async function () {
      this.is_loading = true;
      await trancodeTrainService.mintFreshTrain(this.address);
      await this.reloadData();
      this.is_loading = false;
    },
    mintingTrain: async function () {
      this.is_loading = true;
      await trancodeTrainService.mintTrain(this.address);
      await this.reloadData();
      this.is_loading = false;
    },
    minting: async function () {
      this.is_loading = true;
      await trancodeTrainService.mint(this.address);
      await this.reloadData();
      this.is_loading = false;
    },
    async upgradeStart(item) {
      this.is_loading = true;
      let n = parseInt(item.id);
      await trancodeTrainService.passiveStart(this.address, n);
      await this.reloadData();
      this.is_loading = false;
    },

    upgradeEnd: async function (item) {
      this.is_loading = true;
      let n = parseInt(item.id);
      await trancodeTrainService.passiveEnd(this.address, n);
      await this.reloadData();
      this.is_loading = false;
    },
    unstakeCargo: async function (item) {
      this.is_loading = true;
      let n = parseInt(item.id);
      await trancodeCargoService.unstake(this.address, n);
      await this.reloadData();
      this.is_loading = false;
    },
    stakeCargo: async function (item) {
      this.is_loading = true;
      let n = parseInt(item.id);
      await trancodeCargoService.stake(this.address, n);
      await this.reloadData();
      this.is_loading = false;
    },
    unstake: async function (item) {
      this.is_loading = true;
      let n = parseInt(item.id);
      await trancodeTrainService.unstake(this.address, n);
      await this.reloadData();
      this.is_loading = false;
    },
    combineCargo: async function (item) {
      // alert("combine cargo")

      let input = new PassingItemToModal();
      input.item_id = item.id;
      input.train = item;
      input.weaponTier = parseInt(item.weaponTier);
      input.currentBalanceBank = parseFloat(this.balanceBank);
      input.currentBalanceWallet = parseFloat(this.balanceWallet);
      input.cargo_ids = this.itemsCargo;
      window.vm_modal_combine.receiveDataFromMain(input);
      this.showModalCombine();
    },
    splitCargo: async function (item) {
      // alert("split cargo")
      this.showModalSplit();
      // let input = new PassingItemToModal();
      // input.item_id = item.id;
      // input.weaponTier = parseInt(item.weaponTier);
      // input.currentBalance = parseFloat(this.balanceBank);
      // input.cargo_ids = this.itemsCargo;
      //
      // window.vm_modal.receiveDataFromMain(input);
      // this.showModal();
    },
    activeStake: async function (item) {
      let input = new PassingItemToModal();
      input.item_id = item.id;
      input.weaponTier = parseInt(item.weaponTier);
      input.currentBalanceBank = parseFloat(this.balanceBank);
      input.currentBalanceWallet = parseFloat(this.balanceWallet);
      input.cargo_ids = this.itemsCargo;
      input.train = item;

      window.vm_modal.receiveDataFromMain(input);
      this.showModal();
    },
    upgradeWeapon: async function (item) {
      this.is_loading = true;
      let n = parseInt(item.id);
      let level = parseInt(this.map_id);
      await trancodeTrainService.upgradeWeapon(this.address, n);
      await this.reloadData();
      this.is_loading = false;
    },

    receiveMetamask: async function (address) {
      console.log("[dashboard] receive address", address);

      if (address == "") {
        this.is_ready = false;
        return;
      }
      this.current_address = address;
      this.address = address;
      this.is_ready = true;
      // console.log("debug3", "is_ready", this.is_ready);
      await this.reloadData();
    },

    convertImage(input) {
      // return "/assets/train1.jpeg";

      let input1 = Number.parseInt(input);
      let input2 = input1 % 6;
      let input3 = input2 + 1;

      if (isNaN(input3)) {
        input3 = 1;
      }

      return require("@/assets/train" + input3 + ".jpeg");
    },
    async reloadDataBalance() {
      // console.log("reload 1");
      this.blockNumber = await trancodeGenericService.getBlockNumber();
      // console.log("reload 2");
      this.balanceBank = await trancodeGenericService.inquiryBalanceBank(
          this.current_address
      );
      // console.log("reload 3");
      this.balanceWallet = await trancodeGenericService.inquiryBalanceWallet(
          this.current_address
      );
      // console.log("reload 4");
      this.balanceBank = parseFloat(this.balanceBank) / parseFloat(10 ** 18);
      this.balanceWallet = parseFloat(this.balanceWallet) / parseFloat(10 ** 18);
      // console.log("reload 5");
    },
    async reloadDataTrains(reload_id_local) {
      if (this.reload_id == reload_id_local) {
        this.items = [];
      }

      const itemsDistinctFilteredSorted = await trancodeTrainInquiryListService.inquiryListOrchestra(this.address);
      // console.log("reload data trains list", itemsDistinctFilteredSorted)

      for (let i = 0; i < itemsDistinctFilteredSorted.length; i++) {
        const index = itemsDistinctFilteredSorted[i];
        this.loading_counter = index;

        const isCastle = await trancodeTrainInquiryListService.functionInquiryCastlePosition(index);
        const ownerAddress = await trancodeTrainInquiryListService.checkOwner(index);

        let item = await trancodeTrainInquiryListService.inquiryItem(index);
        let trainCargos = await trancodeTrainService.functionInquiryCargo(index);


        let data2 = {
          timestamp: item.timestamp,
          action: item.action,
          body: item.race,
          level: item.level,
          weaponTier: item.weaponTier,
          ownerNft: item.owner,
          id: index,
          isOpenSea: !isCastle,
          ownerAddress: ownerAddress,
          trainCargos: trainCargos,
          trainCargoDesc: this.getTrainCargoDesc(trainCargos)
        };

        if (this.reload_id == reload_id_local) {
          this.items.push(data2);
        }
      }


    },

    async reloadDataCargos(reload_id_local) {

      let itemsCargosTemp = await trancodeCargoInquiryListService.inquiryCargo(this.address);
      // console.log("reload data cargo list", itemsCargosTemp)

      if (this.reload_id == reload_id_local) {
        this.itemsCargo = []
      }

      for (let i = 0; i < itemsCargosTemp.length; i++) {
        const index = itemsCargosTemp[i];

        let data2 = {
          id: i,
          name: this.infoCargo(i),
          quantity: index,
        };

        if (this.reload_id == reload_id_local) {
          this.itemsCargo.push(data2);
        }

      }

      this.itemsCargo = this.itemsCargo.filter(function (item) {
        return item.id != 0 && item.id <= 2;
      });
    },

    async reloadData() {
      this.reload_id = this.reload_id + 1;

      this.is_loading = true;

      await this.reloadDataBalance();
      this.totalSupply = await trancodeTrainService.totalSupply();
      this.totalSupplyCargo = await trancodeCargoService.totalSupplyCargo();


      console.log("reload_id", this.reload_id)
      let reload_id_local = this.reload_id;

      await this.reloadDataTrains(reload_id_local);
      await this.reloadDataCargos(reload_id_local);

      this.loading_counter = -1;

      this.is_loading = false;
    },
    getTrainCargoDesc(input) {
      let itemsCargo = input;
      return "[coal-" + itemsCargo[1] + "]|  [oil-" + itemsCargo[2] + "]";
    },
    infoCargo(id) {
      if (id == 1) {
        return "coal";
      } else if (id == 2) {
        return "oil";
      } else {
        return "no_data";
      }
    }
  },

  computed: {
    reversedMessage: function () {
      return this.message.split('').reverse().join('')
    }
  }
};
</script>
