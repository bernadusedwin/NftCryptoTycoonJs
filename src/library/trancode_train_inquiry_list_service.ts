import abiService from "@/library/abi_service";
import global_param from "@/library/global_param";
import { RockInfo } from "./models";
import library_abi_service from "@/library/library_abi_service";

declare let window: any;


class trancodeTrainInquiryListService {


    async checkOwner(id: number) {
        // console.log("[debug3] check owner start", id)
        const contract_address = abiService.getMainContract();
        const abi = library_abi_service.getAbi();
        const web3 = window.Web3Instance;
        const contract_executed = new web3.eth.Contract(abi, contract_address);
        const tx = await contract_executed.methods.ownerOf(id).call();
        // console.log("[debug3] check owner end", id,tx)
        return tx;
    }



    async functionInquiryCastlePosition(id: number) {
        const contract_address = abiService.getMainContract();
        const abi = library_abi_service.getAbi();
        const web3 = window.Web3Instance;
        const contract_executed = new web3.eth.Contract(abi, contract_address);
        const tx = await contract_executed.methods.inquiryCastlePosition(id).call();
        return tx;

    }




    async inquiryItem(id : number) {
        const contract_address = abiService.getMainContract();
        const abi = library_abi_service.getAbi();
        const web3 = window.Web3Instance;
        const contract_executed = new web3.eth.Contract(abi, contract_address);
        const tx = await contract_executed.methods.getTokenSentinel(id).call();
        return tx;
    }


    async inquiryListOnOpensea(address: string) {
        // console.log("[debug3] inquiry data", address)
        const contract_address = abiService.getMainContract();
        const abi = library_abi_service.getAbi();
        const web3 = window.Web3Instance;
        const contract_executed = new web3.eth.Contract(abi, contract_address);
        const tx = await contract_executed.methods.inquiryOwner(address).call();
        return tx;
    }

    async inquiryListOnCastle(address: string) {
        // console.log("[debug3] inquiry data", address)
        const contract_address = abiService.getMainContract();
        const abi = library_abi_service.getAbi();
        const web3 = window.Web3Instance;
        const contract_executed = new web3.eth.Contract(abi, contract_address);
        const tx = await contract_executed.methods.inquiryOwnerOnCastle(address).call();
        return tx;
    }


    async inquiryListOrchestra (address: string){

        const items1 = await this.inquiryListOnCastle(address);
        const items2 = await this.inquiryListOnOpensea(address);

        const itemsDistinct = items1.concat(items2);
        const itemsDistinctFiltered = itemsDistinct.filter(function (item : any) {
            return item > 0;
        });
        const itemsDistinctFilteredSorted = itemsDistinctFiltered.sort(function (a : any, b : any) {
            return a - b;
        });

        return itemsDistinctFilteredSorted;
    }

}

const g = new trancodeTrainInquiryListService();
export default g;


// async inquiryItemGlobal(id : number) {
//     const contract_address = abiService.getMainContract();
//     const item = await this.inquiryItem(id);
//     // console.log("inquiryItemGlobal",id,item)
//     if (item.owner == "0x0000000000000000000000000000000000000000" || item.owner == contract_address){
//         // console.log("inquiryItemGlobal-1",id,item)
//         const address = this.checkOwner(id);
//         return address;
//     }
//     else {
//         // console.log("inquiryItemGlobal-2",id,item)
//         return item.owner;
//     }
// }




// async inquiryData(id: number) {
//     console.log("[debug3] inquiry data", id)
//     const contract_address = abiService.getMainContract();
//     const abi = library_abi_service.getAbi();
//     const web3 = window.Web3Instance;
//     const contract_executed = new web3.eth.Contract(abi, contract_address);
//     const tx = await contract_executed.methods.getTrainObject(id).call();
//     return tx;
// }
//
// async inquiryActivity(id: number) {
//     console.log("[debug3] inquiry activity", id)
//     const contract_address = abiService.getMainContract();
//     const abi = library_abi_service.getAbi();
//     const web3 = window.Web3Instance;
//     const contract_executed = new web3.eth.Contract(abi, contract_address);
//     const tx = await contract_executed.methods.getActivity(id).call();
//     return tx;
// }

