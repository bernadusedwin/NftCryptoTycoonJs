import abiService from "@/library/abi_service";
import global_param from "@/library/global_param";
import { RockInfo } from "./models";
import library_abi_service from "@/library/library_abi_service";

declare let window: any;


class trancodeCargoService {


    async stake(source_address: string, id: number) {
        const contract_address = abiService.getCargoContract();
        const abi = library_abi_service.getCargoAbi();
        const web3 = window.Web3Instance;
        const contract_executed = new web3.eth.Contract(abi, contract_address);
        const tx = await contract_executed.methods.stake([id]).send({
            from: source_address,
            value: 0
        })
        return tx;

    }

    async unstake(source_address: string, id: number) {
        const contract_address = abiService.getCargoContract();
        const abi = library_abi_service.getCargoAbi();
        const web3 = window.Web3Instance;
        const contract_executed = new web3.eth.Contract(abi, contract_address);
        const tx = await contract_executed.methods.unstake([id]).send({
            from: source_address,
            value: 0
        })
        return tx;

    }


    async mintCargo(source_address: string,fragment : number,amount : number) {
        const contract_address = abiService.getMainContract();
        const abi = library_abi_service.getAbi();
        const web3 = window.Web3Instance;
        const contract_executed = new web3.eth.Contract(abi, contract_address);
        const tx = await contract_executed.methods.mintCargo(fragment,amount).send({
            from: source_address,
            value: 0
        })

        // const contract_address = abiService.getCargoContract();
        // const abi = library_abi_service.getCargoAbi();
        // const web3 = window.Web3Instance;
        // const contract_executed = new web3.eth.Contract(abi, contract_address);
        // const tx = await contract_executed.methods.mintFragment(fragment,amount).send({
        //     from: source_address,
        //     value: 0
        // })

        return tx;

    }


    async totalSupplyCargo() {
        const contract_address = abiService.getCargoContract();
        const abi = library_abi_service.getCargoAbi();
        const web3 = window.Web3Instance;
        // console.log("totalSupplyCargo-get contract")
        const contract_executed = new web3.eth.Contract(abi, contract_address);
        // console.log("totalSupplyCargo-start")
        const tx = await contract_executed.methods.totalSupply(1).call();
        // console.log("totalSupplyCargo-end")
        return tx;
    }




}

const g = new trancodeCargoService();
export default g;