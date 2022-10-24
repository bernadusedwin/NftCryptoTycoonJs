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


            <!--            <div class="text-white">-->
            <!--              <div>is_ready : {{ is_ready }}</div>-->
            <!--              <div>is_master_network : {{ is_master_network }}</div>-->
            <!--            </div>-->


            <button
                v-if="is_ready == true && is_master_network == true"
                class="text-white p-2 m-4 bg-blue-400"
                v-on:click="mintingItem()"
            >
              Mint
            </button>


            <br/>


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
                  <br/>

                  <table class="border-collapse border border-amber-600 w-full">
                    <thead>
                    <tr>
                      <th class="border border-amber-600 ...">TokenId</th>
                      <th class="border border-amber-600 ...">IsActive</th>
                      <th class="border border-amber-600 ...">Owner</th>
                      <th class="border border-amber-600 ...">Level</th>


                      <th class="border border-amber-600 ...">Button</th>


                    </tr>
                    </thead>
                    <tbody>
                    <template v-for="item in items" :key="item">
                      <tr class="text-center">
                        <td class="border border-amber-600 ...">{{ item.token_id }}</td>
                        <td class="border border-amber-600 ...">{{ item.is_active }}</td>
                        <td class="border border-amber-600 ...">{{ item.owner }}</td>
                        <td class="border border-amber-600 ...">{{ item.level }}</td>


                        <td class="border border-amber-600 ...">

                          <button
                              v-if="is_ready == true"
                              class="text-white p-2 bg-red-400"
                              v-on:click="upgradeItem(item)"
                          >
                            Upgrade
                          </button>

                        </td>


                      </tr>
                    </template>
                    </tbody>
                  </table>


                  <br/>
                  <br/>

                  <div>Non-Active Item List</div>
                  <br/>

                  <table class="border-collapse border border-amber-600 w-full">
                    <thead>
                    <tr>
                      <th class="border border-amber-600 ...">TokenId</th>
                      <th class="border border-amber-600 ...">IsActive</th>
                      <th class="border border-amber-600 ...">Owner</th>
                      <th class="border border-amber-600 ...">Level</th>


                      <th class="border border-amber-600 ...">Status</th>
                      <th class="border border-amber-600 ...">Button</th>


                    </tr>
                    </thead>
                    <tbody>
                    <template v-for="item in non_active_items" :key="item">
                      <tr class="text-center">
                        <td class="border border-amber-600 ...">{{ item.token_id }}</td>
                        <td class="border border-amber-600 ...">{{ item.is_active }}</td>
                        <td class="border border-amber-600 ...">{{ item.owner }}</td>
                        <td class="border border-amber-600 ...">{{ item.level }}</td>


                        <td class="border border-amber-600 ...">

                          {{ item.status }}

                        </td>

                        <td class="border border-amber-600 ...">

                          <button
                              v-if="is_ready == true"
                              class="text-white p-2 bg-red-400"
                              v-on:click="upgradeItem(item)"
                          >
                            Upgrade
                          </button>

                        </td>


                      </tr>
                    </template>
                    </tbody>
                  </table>


                  <br/>


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
        <!--        <ModalStacking-->
        <!--            v-bind:current_address="current_address"-->
        <!--            v-show="isModalVisible"-->
        <!--            @close="closeModal"-->
        <!--        />-->
        <!--        <ModalSplit-->
        <!--            v-bind:current_address="current_address"-->
        <!--            v-show="isModalSplitVisible"-->
        <!--            @close="closeModalSplit"-->
        <!--        />-->
        <!--        <ModalCombine-->
        <!--            v-bind:current_address="current_address"-->
        <!--            v-show="isModalCombineVisible"-->
        <!--            @close="closeModalCombine"-->
        <!--        />-->

      </div>
    </div>
  </div>


</template>


<script lang="ts">


import NavbarComponent from "../components/Navbar.vue";
import SidebarComponent from "../components/Sidebar.vue";
import AboutComponent from "../components/About.vue";
import LoginComponent from "../components/Login.vue";
import trancodeCombineService from "../library/trancode_combine_service";

import abi_service from "@/library/abi_service";
// import ModalStacking from './ModalStacking.vue';
// import ModalCombine from './ModalCombine.vue';
// import ModalSplit from './ModalSplit.vue';

import {defineComponent} from "vue";

import NewTrancodeMint from "../library/new_trancode_mint";
import NewTrancodeMintInquiry from "../library/new_trancode_mint_inquiry";
import {NftInquiryItem, NftInquiryItemWithStatus} from "@/library/models";
import wallet_service from "@/library/new_wallet_service";
import new_trancode_mint_inquiry from "../library/new_trancode_mint_inquiry";
import new_trancode_bridge_inquiry from "../library/new_trancode_bridge_inquiry";


let vm: any = null;

export default defineComponent({
  name: "nft2-page",
  components: {
    NavbarComponent,
    SidebarComponent,
    AboutComponent,
    LoginComponent,
    // ModalGeneric,
    // ModalSell,
    // ModalStacking,
    // ModalSplit,
    // ModalCombine,


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
      is_master_network: false,
      // totalNftFromPlayer: "no_data",
      balanceBank: -1,
      balanceWallet: -1,
      totalSupply: -1,
      totalSupplyCargo: -1,
      is_debug: false,
      gameService: null,
      trancodeService: null,
      // address: "",
      current_address: "",
      items: new Array<NftInquiryItem>(),
      non_active_items: new Array<NftInquiryItemWithStatus>(),

      prevBlockNumber: -1,
      blockNumber: -1,
      timer: 1,
      reload_id: 0,
    };
  },
  mounted: function () {
    this.is_debug = abi_service.isDevMode();
    // this.address = "info 1";
    this.contractErc20 = abi_service.getErc20Contract();
    this.contractMain = abi_service.getMainContract();
    this.contractCargo = abi_service.getCargoContract();

    vm = this;
    // window.vm = this;
    // this.runTimer();
    // }


    // console.log("set up chain changed")
    window.ethereum.on("chainChanged", function (chainId: number) {
      // console.log("chain changed detected")
      if (vm != null) {
        vm.reloadData();
      }

    });
  },
  methods: {
    receiveMetamask: async function (address: string) {
      console.log("[dashboard] receive address", address);

      if (address == "") {
        this.is_ready = false;
        return;
      }
      this.current_address = address;
      // this.address = address;
      this.is_ready = true;
      // console.log("debug3", "is_ready", this.is_ready);
      await this.reloadData();
    },

    async mintingItem() {
      // alert("minting")
      if (this.is_master_network) {
        await NewTrancodeMint.mintOnEth(this.current_address);
      } else {
        await NewTrancodeMint.mintOnMatic(this.current_address);
      }

      await this.reloadData();
    },


    async upgradeItem(input: NftInquiryItem) {
      // alert("minting")
      if (this.is_master_network) {
        await NewTrancodeMint.upgradeOnEth(this.current_address, input.token_id);
      } else {
        await NewTrancodeMint.upgradeOnMatic(this.current_address, input.token_id);
      }

      await this.reloadData();
    },


    async reloadData() {

      console.log("debug3", "start reload data")

      // let item1 = await new_trancode_mint_inquiry.inquiryItemOnMaticForceMode(1);
      // console.log("debug3","inquiryItemOnMaticForceMode",item1)
      //
      // let item2 = await new_trancode_mint_inquiry.inquiryItemOnEthForceMode(1);
      // console.log("debug3","inquiryItemOnEthForceMode",item2)

      this.reload_id = this.reload_id + 1;

      this.is_loading = true;


      let myWeb3 = window.Web3Instance;

      let masterChainIdSource = await wallet_service.getMasterChainId();
      let masterChainId = parseInt(masterChainIdSource);
      let resultChainId = await myWeb3.eth.getChainId();

      this.is_master_network = resultChainId == masterChainId;

      console.log("debug3", "start reload data - 2")
      if (this.is_master_network) {
        console.log("debug3", "start reload data - 2a")
        let v1: Array<NftInquiryItem> = await NewTrancodeMintInquiry.listOnEth();
        console.log("debug3", "start reload data - 2b")
        console.log("v1", v1)
        this.items = v1.filter(x => x.owner.toLowerCase() == this.current_address.toLowerCase());
        console.log("v1-1", this.items)
      } else {
        let v2: Array<NftInquiryItem> = await NewTrancodeMintInquiry.listOnMatic();
        console.log("v2", v2)
        this.items = v2.filter(x => x.owner.toLowerCase() == this.current_address.toLowerCase());
      }

      // this.non_active_items = this.items.filter(x => x.is_active == false);

      this.non_active_items = this.items
          .filter(x => x.is_active == false)
          .map((x) => {
            return {
              is_active: x.is_active,
              level: x.level,
              owner: x.owner,
              token_id: x.token_id,
              status: "loading ...."
            }
          });

      this.items = this.items.filter(x => x.is_active);
      for (const item of this.non_active_items) {
        item.status = "N/A"
      }
      for (const item of this.non_active_items) {
        item.status = await new_trancode_bridge_inquiry.inquiryStatusBridge(item.token_id);
      }


      console.log("debug3", "start reload data - 3")

      this.is_loading = false;
    },

  },

  computed: {
    // reversedMessage: function () {
    //   return this.message.split('').reverse().join('')
    // }
  }
});
</script>
