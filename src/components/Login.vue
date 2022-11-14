<template>
  <div class="px-4">
    <div class="text-white">current chain id: {{ current_chain_id_display }}</div>
    <button
        v-on:click="buttonInitCalled()"
        class="bg-orange-200 font-bold py-2 px-4 rounded"
    >
      <!-- Connect - {{ title }} - {{ name }} -->
      {{ status }}
    </button>

    <button
        v-if="status != defaultButton()"
        v-on:click="logOffDialog()"
        class="bg-red-400 font-bold py-2 px-4 rounded m-3"
    >
      Log Off
    </button>


    <button
        v-if="is_visible_change_to_eth"
        v-on:click="switchNetworkToEth()"
        class="bg-gray-900  py-2 px-4 rounded m-3 text-red-300"
    >
      Switch Network to ETH
    </button>


    <button
        v-if="is_visible_change_to_matic"
        v-on:click="switchNetworkToMatic()"
        class="bg-gray-900  py-2 px-4 rounded m-3 text-white"
    >
      Switch Network to MATIC
    </button>
    <div class="text-white">
      {{current_version}}
    </div>

    <h5 v-if="debugMode">
      <br/>
      <br/>
      <div class="text-white">{{ content1 }}</div>
      <br/>
      <div class="text-white">{{ content2 }}</div>
    </h5>
    <div class="text-white">{{ err_msg }}</div>
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
      <!-- <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
        <div class="flex flex-wrap items-center">
          <div class="relative w-full max-w-full flex-grow flex-1">
            <h6 class="uppercase mb-1 text-xs font-semibold" v-on:click="one()">
              Connect
            </h6>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>


<script lang="ts">
import {defineComponent} from "vue";
// declare var Web3 : any;
declare var Web3: any;
const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
const Fortmatic = window.Fortmatic;
import abiService from "../library/abi_service";
import wallet_service from "@/library/new_wallet_service";
import global_param from "@/library/global_param";

export default defineComponent({
  props: {
    callbackMetamask: Function,
    title: String,
    debugMode: Boolean,
  },
  data() {
    return {
      current_version : "no_data",
      current_chain_id: "-1",
      current_chain_id_display: "-1",
      // status: "Connect",
      status: this.defaultButton(),
      // chainId : "0x61",
      // chainId: "0x1",
      // chainId: abiService.getChainId,
      // chainId: "",
      // chainIdDesc : "",
      content1: "content1",
      content2: "content2",
      err_msg: "",
      // is_wrong_network : false,
      is_visible_change_to_eth: false,
      is_visible_change_to_matic: false,

      name: "one",
    };
  },
  mounted: async function () {

    this.current_version = global_param.getVersion();

    window.ethereum.on("accountsChanged", function (accounts: any) {
      let loginVue = window.loginVue;
      if (accounts[0] == null) {
        loginVue.logOffMetamask();
      } else {
        // loginVue.initMetamask();
        loginVue.logOffMetamask();
      }
    });
    window.ethereum.on("chainChanged", function (chainId: number) {
      let loginVue = window.loginVue;

      if (chainId != loginVue.current_chain_id) {
        // console.log("loginVue.current_chain_id",loginVue.current_chain_id,chainId)
        loginVue.logOffMetamask();
      }
    });

    window.loginVue = this;


    let key1 = "WEB3_CONNECT_CACHED_PROVIDER";
    const storage1 = localStorage.getItem(key1);
    if (storage1 != null) {
      await this.buttonInitCalled();
    }


  },
  methods: {

    async updateVisibleButtonChangeToMatic() {
      const myWeb3 = window.Web3Instance;
      let resultChainId = await myWeb3.eth.getChainId();
      let maticChainId = await wallet_service.getSlaveChainId();
      if (resultChainId != maticChainId) {
        this.is_visible_change_to_matic = true;

      } else {
        this.is_visible_change_to_matic = false;
      }
    },
    async updateVisibleButtonChangeToEth() {
      const myWeb3 = window.Web3Instance;
      let resultChainId = await myWeb3.eth.getChainId();
      let ethChainId = await wallet_service.getMasterChainId();
      if (resultChainId != ethChainId) {
        this.is_visible_change_to_eth = true;

      } else {
        this.is_visible_change_to_eth = false;
      }
    },
    async setOwner() {
      let owner = await abiService.getOwner();
      this.content1 = "owner: " + owner;
    },
    async validationCurrentAsOwner(currentAddress: string) {
      let owner = await abiService.getOwner();
      let owner2 = owner.toString().toLowerCase();
      if (owner2 == currentAddress) {
        this.content2 = "owner are same";
      } else {
        this.content2 = "owner is different";
      }
    },
    defaultButton() {
      return "Connect";
    },
    logOffDialog() {
      let text;
      if (confirm("Are u sure want to log off ?") == true) {
        this.logOffMetamask()
      }
    },
    // async switchNetwork() {
    //   await this.switchNetworkLogic();
    //   // this.is_wrong_network = false;
    //   this.err_msg = "";
    // },
    async switchNetworkToMatic() {

      const myWeb3 = window.Web3Instance;

      // let loginVue = window.loginVue;
      // const chainId = loginVue.chainId;

      let chainId = await wallet_service.getSlaveChainId();

      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{chainId: myWeb3.utils.toHex(chainId)}]
        });
        // await this.updateVisibleButton();
        await this.initMetamask();
      } catch (err: any) {
        // This error code indicates that the chain has not been added to MetaMask
        if (err.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainName: 'Polygon Mainnet',
                chainId: myWeb3.utils.toHex(chainId),
                nativeCurrency: {name: 'MATIC', decimals: 18, symbol: 'MATIC'},
                rpcUrls: ['https://polygon-rpc.com/']
              }
            ]
          });
        }
      }
    },
    async switchNetworkToEth() {

      const myWeb3 = window.Web3Instance;

      // let loginVue = window.loginVue;
      // const chainId = loginVue.chainId;
      let chainId = await wallet_service.getMasterChainId();
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{chainId: myWeb3.utils.toHex(chainId)}]
        });
        // await this.updateVisibleButton();
        await this.initMetamask();
      } catch (err: any) {
        console.log("err", err)
      }
    },
    async buttonInitCalled() {
      // this.is_wrong_network = false;
      const providerOptions = {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId: "605cc3bbb6b2412fa0399ee07e8bbb49" // required
          }
          // options: {
          //   rpc: {
          //     137: "https://rpc-mainnet.maticvigil.com/",
          //   },
          //   network: "matic",
          // },
        },

        fortmatic: {
          package: Fortmatic,
          options: {
            // Mikko's TESTNET api key
            key: "pk_test_391E26A3B43A3350"
          }
        }

      };


      const web3Modal = new Web3Modal({
        network: "mainnet", // optional
        cacheProvider: true, // optional
        disableInjectedProvider: false,
        providerOptions // required
      });


      const provider = await web3Modal.connect();

      window.Web3Instance = new Web3(provider)
      window.web3Modal = web3Modal;

      await this.initMetamask();

    },
    initMetamask: async function () {
      this.err_msg = "";
      let ethereum = window.ethereum;

      let accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      let address = accounts[0];
      if (address == null) {
        this.logOffMetamask();
        return;
      }


      console.log("init metamask found address", address);
      let myWeb3 = window.Web3Instance;

      let resultChainId = await myWeb3.eth.getChainId();
      let masterChainId = await wallet_service.getMasterChainId();
      let slaveChainId = await wallet_service.getSlaveChainId()

      let masterChainDesc = await wallet_service.getMasterChainDesc();
      let slaveChainDesc = await wallet_service.getSlaveChainDesc()


      this.current_chain_id = resultChainId;
      this.current_chain_id_display = resultChainId;
      if (this.current_chain_id == masterChainId) {
        this.current_chain_id_display = masterChainId + " [" + masterChainDesc + "]";
      }
      else if (this.current_chain_id == slaveChainId) {
        this.current_chain_id_display = slaveChainId + " [" + slaveChainDesc + "]";
      }


      if (resultChainId != masterChainId && resultChainId != slaveChainId) {

        console.log("resultChainId", resultChainId)
        let msg = "chain id must " + masterChainDesc + " or " + slaveChainDesc;
        this.err_msg = msg;
        if (this.callbackMetamask != null) {
          this.callbackMetamask("");
        }

        await this.updateVisibleButton();
        return;
      }


      await this.updateVisibleButton();

      this.status = address;
      if (this.callbackMetamask != null) {
        this.callbackMetamask(address);

      }

      await this.setOwner();
      await this.validationCurrentAsOwner(address);

    },
    async updateVisibleButton() {
      await this.updateVisibleButtonChangeToMatic();
      await this.updateVisibleButtonChangeToEth();
    },
    logOffMetamask: function () {
      this.status = this.defaultButton();
      if (this.callbackMetamask != null) {
        this.callbackMetamask("");
        // this.gwei = -1;
      }
    },
    two: function () {
      this.name = "two";
      // this.props.title = "woot"
      // console.log("props callback", this.callback1);
      if (this.callbackMetamask != null) {
        let callbackMetamask = this.callbackMetamask("z123");
      }
      // alert("hello 123");
    },
  },
});
</script>
