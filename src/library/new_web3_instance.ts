import abiService from "@/library/abi_service";
import global_param from "@/library/global_param";
import { RockInfo } from "./models";
import library_abi_service from "@/library/library_abi_service";
import new_abi_service from "@/library/new_abi_service";
import new_library_abi_service from "@/library/new_library_abi_service";
import new_wallet_service from "@/library/new_wallet_service";

declare let window: any;
declare let Web3 : any;


class newWeb3Instance {


    async getInstanceWeb3Matic(){
        const web3 = window.Web3Instance;
        const resultChainId = await web3.eth.getChainId();
        const maticChainId = await new_wallet_service.getSlaveChainId()
        // console.log("getInstanceWeb3Matic","resultChainId",resultChainId)
        // console.log("getInstanceWeb3Matic","maticChainId",maticChainId)
        if (resultChainId == maticChainId){
            // console.log("getInstanceWeb3Matic","logic1","from metamask")
            const web3 = window.Web3Instance;
            return web3;
        }
        else {
            // console.log("getInstanceWeb3Matic","logic2","self init")
            const oldProvider = new Web3.providers.HttpProvider('https://polygon-mumbai.infura.io/v3/605cc3bbb6b2412fa0399ee07e8bbb49')
            const myWeb3 = new Web3(oldProvider);

            // const resultChainId = await myWeb3.eth.getChainId();
            // console.log("getInstanceWeb3Matic","resultChainId",resultChainId)
            return myWeb3;
        }
    }


    async getInstanceWeb3Eth(){
        const web3 = window.Web3Instance;
        const resultChainId = await web3.eth.getChainId();
        const ethChainId = await new_wallet_service.getMasterChainId()
        // console.log("getInstanceWeb3Eth","resultChainId",resultChainId)
        // console.log("getInstanceWeb3Eth","maticChainId",ethChainId)
        if (resultChainId == ethChainId){
            // console.log("getInstanceWeb3Eth","logic1","from metamask")
            const web3 = window.Web3Instance;
            return web3;
        }
        else {
            // console.log("getInstanceWeb3Eth","logic2","self init")
            const oldProvider = new Web3.providers.HttpProvider('https://goerli.infura.io/v3/605cc3bbb6b2412fa0399ee07e8bbb49')
            const myWeb3 = new Web3(oldProvider);


            // const resultChainId = await myWeb3.eth.getChainId();
            // console.log("getInstanceWeb3Eth","resultChainId",resultChainId)
            return myWeb3;
        }
    }



}

const g = new newWeb3Instance();
export default g;

