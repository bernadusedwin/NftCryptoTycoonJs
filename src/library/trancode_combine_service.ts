import abiService from "@/library/abi_service";
import global_param from "@/library/global_param";
import {InputCargoUpgrade, RockInfo} from "./models";
import library_abi_service from "@/library/library_abi_service";

declare let window: any;


class trancodeCombineService {


    async functionCombineCargo(source_address: string,train_id : number, inputs : Array<InputCargoUpgrade>) {
        const contract_address = abiService.getManagerCombineContract();
        const abi = library_abi_service.getManagerCombineAbi();
        const web3 = window.Web3Instance;
        const contract_executed = new web3.eth.Contract(abi, contract_address);

        const dataInput = new Array<number>();
        for (const item of inputs) {
            dataInput.push(item.cargo_id);
            dataInput.push(item.amount);
        }



        const tx = await contract_executed.methods.combineCargoBatch(train_id,dataInput).send({
            from: source_address,
            value: 0
        })
        return tx;

    }



}

const g = new trancodeCombineService();
export default g;


