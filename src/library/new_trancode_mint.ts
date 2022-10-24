import abiService from "@/library/abi_service";
import global_param from "@/library/global_param";
import { RockInfo } from "./models";
import library_abi_service from "@/library/library_abi_service";
import new_abi_service from "@/library/new_abi_service";
import new_library_abi_service from "@/library/new_library_abi_service";

declare let window: any;


class newTrancodeMint {

    async mintOnEth(source_address : string) {
        const contract_address = new_abi_service.getNftContractOnEth();
        const abi = new_library_abi_service.getNft20Abi();
        const web3 = window.Web3Instance;
        const contract_executed = new web3.eth.Contract(abi, contract_address);
        const tx = await contract_executed.methods.mint().send({
            from: source_address,
            value: 0
        })
        return tx;
    }

    async mintOnMatic(source_address : string) {
        const contract_address = new_abi_service.getNftContractOnMatic();
        const abi = new_library_abi_service.getNft20Abi();
        const web3 = window.Web3Instance;
        const contract_executed = new web3.eth.Contract(abi, contract_address);
        const tx = await contract_executed.methods.mint().send({
            from: source_address,
            value: 0
        })
        return tx;
    }

    async upgradeOnEth(source_address : string,tokenId : number) {
        const contract_address = new_abi_service.getNftContractOnEth();
        const abi = new_library_abi_service.getNft20Abi();
        const web3 = window.Web3Instance;
        const contract_executed = new web3.eth.Contract(abi, contract_address);
        const tx = await contract_executed.methods.updateLevel(tokenId).send({
            from: source_address,
            value: 0
        })
        return tx;
    }

    async upgradeOnMatic(source_address : string,tokenId : number) {
        const contract_address = new_abi_service.getNftContractOnMatic();
        const abi = new_library_abi_service.getNft20Abi();
        const web3 = window.Web3Instance;
        const contract_executed = new web3.eth.Contract(abi, contract_address);
        const tx = await contract_executed.methods.updateLevel(tokenId).send({
            from: source_address,
            value: 0
        })
        return tx;
    }



}

const g = new newTrancodeMint();
export default g;

