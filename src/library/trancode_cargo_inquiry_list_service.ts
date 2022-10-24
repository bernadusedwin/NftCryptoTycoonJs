import abiService from "@/library/abi_service";
import global_param from "@/library/global_param";
import { RockInfo } from "./models";
import library_abi_service from "@/library/library_abi_service";

declare let window: any;


class trancodeCargoInquiryListService {



    async inquiryCargo(address : string){
        const contract_address = abiService.getCargoContract();
        const abi = library_abi_service.getCargoAbi();
        const web3 = window.Web3Instance;
        const contract_executed = new web3.eth.Contract(abi, contract_address);
        const tx = await contract_executed.methods.inquiryOwnerCargo(address).call();
        return tx;

    }

    async functionInquiryCastlePosition(id: number) {
        const contract_address = abiService.getCargoContract();
        const abi = library_abi_service.getCargoAbi();
        const web3 = window.Web3Instance;
        const contract_executed = new web3.eth.Contract(abi, contract_address);
        const tx = await contract_executed.methods.inquiryCastlePosition(id).call();
        return tx;

    }

    async checkOwner(id: number) {
        // console.log("[debug3] check owner start", id)
        const contract_address = abiService.getCargoContract();
        const abi = library_abi_service.getCargoAbi();
        const web3 = window.Web3Instance;
        const contract_executed = new web3.eth.Contract(abi, contract_address);
        const tx = await contract_executed.methods.ownerOf(id).call();
        // console.log("[debug3] check owner end", id)
        return tx;
    }


    async inquiryListOnOpenseaCargo(source_address: string) {
        const contract_address = abiService.getCargoContract();
        const abi = library_abi_service.getCargoAbi();
        const web3 = window.Web3Instance;
        const contract_executed = new web3.eth.Contract(abi, contract_address);
        const tx = await contract_executed.methods.inquiryOwner(source_address).call();
        return tx;

    }


    async inquiryListOnCastleCargo(address: string) {
        // console.log("[debug3] inquiry data", address)
        const contract_address = abiService.getCargoContract();
        const abi = library_abi_service.getCargoAbi();
        const web3 = window.Web3Instance;
        const contract_executed = new web3.eth.Contract(abi, contract_address);
        const tx = await contract_executed.methods.inquiryOwnerOnCastle(address).call();
        return tx;
    }



    async inquiryListOrchestra (address: string){

        const items1 = await this.inquiryListOnCastleCargo(address);
        const items2 = await this.inquiryListOnOpenseaCargo(address);

        const itemsDistinct = items1.concat(items2);
        // const itemsDistinct = items1;
        const itemsDistinctFiltered = itemsDistinct.filter(function (item : any) {
            return item > 0;
        });
        const itemsDistinctFilteredSorted = itemsDistinctFiltered.sort(function (a : any, b : any) {
            return a - b;
        });

        return itemsDistinctFilteredSorted;
    }



    async inquiryItemCargo(id : number) {
        const contract_address = abiService.getCargoContract();
        const abi = library_abi_service.getCargoAbi();
        const web3 = window.Web3Instance;
        const contract_executed = new web3.eth.Contract(abi, contract_address);
        const tx = await contract_executed.methods.cargos(id).call();
        return tx;
    }






}

const g = new trancodeCargoInquiryListService();
export default g;