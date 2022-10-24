import abiService from "@/library/abi_service";
import global_param from "@/library/global_param";
import { RockInfo } from "./models";
import library_abi_service from "@/library/library_abi_service";
import new_abi_service from "@/library/new_abi_service";
import new_library_abi_service from "@/library/new_library_abi_service";
import new_wallet_service from "@/library/new_wallet_service";
import new_web3_instance from "@/library/new_web3_instance";

declare let window: any;
declare let Web3 : any;


class newTrancodeMintInquiry {



    async inquiryItemOnMaticForceMode(nftId : number) {
        const contract_address = new_abi_service.getNftContractOnMatic();
        const abi = new_library_abi_service.getNft20Abi();
        const web3a = await new_web3_instance.getInstanceWeb3Matic();

        const contract_executed = new web3a.eth.Contract(abi, contract_address);
        const tx = await contract_executed.methods.inquiryItem(nftId).call();
        return tx;
    }

    async inquiryItemOnEthForceMode(nftId : number) {
        const contract_address = new_abi_service.getNftContractOnEth();
        const abi = new_library_abi_service.getNft20Abi();

        const web3a = await new_web3_instance.getInstanceWeb3Eth();
        // const oldProvider = new Web3.providers.HttpProvider('https://goerli.infura.io/v3/605cc3bbb6b2412fa0399ee07e8bbb49')
        // const web3a = new Web3(oldProvider);

        const contract_executed = new web3a.eth.Contract(abi, contract_address);
        const tx = await contract_executed.methods.inquiryItem(nftId).call();
        return tx;
    }

    async listOnEth() {
        const contract_address = new_abi_service.getNftContractOnEth();
        const abi = new_library_abi_service.getNft20Abi();
        const web3 = window.Web3Instance;
        const contract_executed = new web3.eth.Contract(abi, contract_address);
        console.log("listOnEth","1",contract_address)
        const tx = await contract_executed.methods.inquiryAll().call();
        console.log("listOnEth","2")
        return tx;
    }

    async listOnMatic() {
        const contract_address = new_abi_service.getNftContractOnMatic();
        const abi = new_library_abi_service.getNft20Abi();
        const web3 = window.Web3Instance;
        const contract_executed = new web3.eth.Contract(abi, contract_address);
        const tx = await contract_executed.methods.inquiryAll().call();
        return tx;
    }



}

const g = new newTrancodeMintInquiry();
export default g;

