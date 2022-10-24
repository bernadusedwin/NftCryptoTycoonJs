import abiService from "@/library/abi_service";
import global_param from "@/library/global_param";
import {RockInfo} from "./models";
import library_abi_service from "@/library/library_abi_service";

declare let window: any;


class trancodeGenericService {


    async inquiryBalanceBank(address: string) {
        const contract_address = abiService.getMainContract();
        const abi = library_abi_service.getAbi();
        const web3 = window.Web3Instance;
        const contract_executed = new web3.eth.Contract(abi, contract_address);
        const tx = await contract_executed.methods.bankBalances(address).call();
        return tx;
    }


    async getBlockNumber() {
        const contract_address = abiService.getMainContract();
        const abi = library_abi_service.getAbi();
        const web3 = window.Web3Instance;
        const contract_executed = new web3.eth.Contract(abi, contract_address);
        const tx = await contract_executed.methods.getCurrrentBlockTimeStamp().call();
        return tx;
    }

    async inquiryBalanceWallet(address: string) {
        const contract_address = abiService.getErc20Contract();
        const abi = library_abi_service.getErc20Abi();
        const web3 = window.Web3Instance;
        const contract_executed = new web3.eth.Contract(abi, contract_address);
        const tx = await contract_executed.methods.balanceOf(address).call();
        return tx;
    }

    async getTotalNft(address: string) {
        const contract_address = abiService.getMainContract();
        const abi = library_abi_service.getAbi();
        const web3 = window.Web3Instance;
        const contract_executed = new web3.eth.Contract(abi, contract_address);
        const data = await contract_executed.methods.balanceOf(address).call();
        return data;
    }


}

const g = new trancodeGenericService();
export default g;