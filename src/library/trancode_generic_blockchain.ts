import abiService from "@/library/abi_service";
import global_param from "@/library/global_param";
import {RockInfo} from "./models";
import library_abi_service from "@/library/library_abi_service";

declare let window: any;


class trancodeGenericService {

    async getLogs(){

        // let url = `string text ${expression} string text`
        const contractAddress = "0x4c1948F43b151a63fe422733E5C59999e0a77cC3";
        const fromBlock = 26000;
        const apiKey = "HC13PT73MT255EP8FWWG5SUTGF7E9WS63U";
        const url = `https://api-testnet.polygonscan.com/api?module=logs&action=getLogs&fromBlock=${fromBlock}&address=${contractAddress}&&apikey=${apiKey}`
        console.log("url",url)

        const response = await fetch(url);
        const data = await response.json();


        return data;

    }
    async getTopicFromTransactionReceipt(txnHash: string){
        const web3 = window.Web3Instance;
        try {
            const data = await web3.eth.getTransactionReceipt(txnHash);
            const item = data.logs[0];
            // console.log("item-log",item)
            const topic = item.topics[0];
            // console.log("topic",topic)
            return topic;
        }
        catch(e){
            console.log("error",e)
        }

    }
    async getTransactionReceipt(txnHash: string) {
        const web3 = window.Web3Instance;
        try {
            const result = await web3.eth.getTransactionReceipt(txnHash);
            return result;
        }
        catch(e){
            console.log("error",e)
        }
    }



}

const g = new trancodeGenericService();
export default g;