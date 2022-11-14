<template>
  <div>
    <sidebar-component></sidebar-component>
    <div class="relative md:ml-64 bg-blueGray-100">
      <navbar-component></navbar-component>
      <!-- Header - Start -->
      <div class="relative bg-blue-600 md:pt-32 pb-32 pt-12">
        <div class="px-4 md:px-10 mx-auto w-full">
          <div>
<!--            <login-component-->
<!--                title="hello world"-->
<!--                :callbackMetamask="receiveMetamask"-->
<!--            ></login-component>-->


            <div class="text-white">
              <!--              <div>is_ready : {{ is_ready }}</div>-->
              <!--              <div>is_master_network : {{ is_master_network }}</div>-->
            </div>


            <!--            <button-->
            <!--                v-if="is_ready == true && is_master_network == true"-->
            <!--                class="text-white p-2 m-4 bg-blue-400"-->
            <!--                v-on:click="mintingItem()"-->
            <!--            >-->
            <!--              BRIDGE1-->
            <!--            </button>-->


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
                    v-if="is_ready"
                >


                  <div>Crypto Tycoon</div>
                  <br/>
                  <div>Demo NFT P2E inspired from</div>
                  <div>
                    <a href="http://www.google.com" style="color:red">etherorc </a>
                    or
                    <a href="http://www.google.com" style="color:red">ethernalelves </a>
                  </div>
                  <br/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <about-component></about-component>


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
import new_trancode_bridge from "../library/new_trancode_bridge";
import new_trancode_bridge_inquiry from "../library/new_trancode_bridge_inquiry";
import abi_service from "@/library/abi_service";

// import ModalStacking from './ModalStacking.vue';
// import ModalCombine from './ModalCombine.vue';
// import ModalSplit from './ModalSplit.vue';

import {defineComponent} from "vue";

import NewTrancodeMint from "../library/new_trancode_mint";
import NewTrancodeMintInquiry from "../library/new_trancode_mint_inquiry";
import {NftInquiryItem, NftTxInfo} from "@/library/models";
import wallet_service from "@/library/new_wallet_service";


let vm: any = null;

export default defineComponent({
  name: "nft2-page",
  components: {
    NavbarComponent,
    SidebarComponent,
    AboutComponent,
    // LoginComponent,
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
      is_ready: true,
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
      items_departure: new Array<NftTxInfo>(),
      items_arrival: new Array<NftTxInfo>(),

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

    // window.ethereum.on("chainChanged", function (chainId: number) {
    //   if (vm != null) {
    //     vm.reloadData();
    //   }
    // });
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
      await NewTrancodeMint.mintOnEth(this.current_address);
      await this.reloadData();
    },
    async bridgeItem(input: NftInquiryItem) {
      // alert("minting")
      await new_trancode_bridge.startBridgeOnEth(this.current_address, input.token_id);
      await this.reloadData();
    },


    async reloadData() {

      this.reload_id = this.reload_id + 1;

      this.is_loading = true;

      let myWeb3 = window.Web3Instance;
      let masterChainIdSource = await wallet_service.getMasterChainId();
      let masterChainId = parseInt(masterChainIdSource);
      let resultChainId = await myWeb3.eth.getChainId();
      this.is_master_network = resultChainId == masterChainId;

      if(this.is_master_network){
        let v1 : any[] = await NewTrancodeMintInquiry.listOnEth();
        console.log("v1", v1)
        this.items = v1;
        this.items = v1.filter(x => x.owner.toLowerCase() == this.current_address.toLowerCase());
      }
      else {
        this.items = []
      }


      let items2 = await new_trancode_bridge_inquiry.getLogsDepartureEth(this.current_address)
      console.log("items2", items2)
      this.items_departure = items2;

      let items3 = await new_trancode_bridge_inquiry.getLogsArrivalOnMatic(this.current_address)
      console.log("items3", items3)
      this.items_arrival = items3;


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
