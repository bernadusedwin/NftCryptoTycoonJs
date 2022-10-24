import abiService from "@/library/abi_service";
import global_param from "@/library/global_param";
import {DataInfoBridge, NftTxInfo, RockInfo} from "./models";
import library_abi_service from "@/library/library_abi_service";
import new_abi_service from "@/library/new_abi_service";
import new_library_abi_service from "@/library/new_library_abi_service";
import new_web3_instance from "@/library/new_web3_instance";

declare let window: any;


class newTrancodeBridge {

    generateUUID() { // Public Domain/MIT
        let d = new Date().getTime();//Timestamp
        let d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = Math.random() * 16;//random number between 0 and 16
            if(d > 0){//Use timestamp until depleted
                r = (d + r)%16 | 0;
                d = Math.floor(d/16);
            } else {//Use microseconds since page-load if supported
                r = (d2 + r)%16 | 0;
                d2 = Math.floor(d2/16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    async startBridgeOnEth(source_address : string,nftNumber : number) {
        const contract_address = new_abi_service.getMasterContractBridgeOnEth();
        const abi = new_library_abi_service.getMasterAbi();
        const web3 = window.Web3Instance;
        const contract_executed = new web3.eth.Contract(abi, contract_address);
        const guid = this.generateUUID();
        const tx = await contract_executed.methods.bridgeItem(nftNumber,guid).send({
            from: source_address,
            value: 0
        })
        return tx;
    }


    async startBridgeOnMatic(source_address : string,nftNumber : number) {
        const contract_address = new_abi_service.getSlaveContractBridgeOnMatic();
        const abi = new_library_abi_service.getSlaveAbi();
        const web3 = window.Web3Instance;
        const contract_executed = new web3.eth.Contract(abi, contract_address);
        const guid = this.generateUUID();
        const tx = await contract_executed.methods.bridgeItem(nftNumber,guid).send({
            from: source_address,
            value: 0
        })
        return tx;
    }


    async endBridgeOnEth(source_address : string,content : string) {
        const contract_address = new_abi_service.getMasterContractBridgeOnEth();
        const abi = new_library_abi_service.getMasterAbi();
        const web3 = window.Web3Instance;
        const contract_executed = new web3.eth.Contract(abi, contract_address);
        // const data = await this.inquiryDataBridgeFromTrx(trxId)
        // const content = data.msg;
        const tx = await contract_executed.methods.receiveMessage(content).send({
            from: source_address,
            value: 0
        })
        return tx;
    }

    async inquiryDataBridgeFromTrx(trxId : string) : Promise<DataInfoBridge>{
        const url = "https://bridge-eth-matic-two-1.vercel.app/info?id=" + trxId;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

}

const g = new newTrancodeBridge();
export default g;

