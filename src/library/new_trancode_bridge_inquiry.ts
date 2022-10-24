import abiService from "@/library/abi_service";
import global_param from "@/library/global_param";
import {NftTxInfo, RockInfo} from "./models";
import library_abi_service from "@/library/library_abi_service";
import new_abi_service from "@/library/new_abi_service";
import new_library_abi_service from "@/library/new_library_abi_service";
import new_web3_instance from "@/library/new_web3_instance";

declare let window: any;
declare let moment : any;

class newTrancodeBridgeInquiry {

    async inquiryStatusBridge(tokenId: number) {

        // get versions on eth
        // get versions on matic

        const ethVersion = await this.inquiryVersionOnEthForceMode(tokenId);
        const maticVersion = await this.inquiryVersionOnMaticForceMode(tokenId);


        // if versions eth higher , bridging eth to matic
        // if versions matic higher , bridging matic to eth
        // else on different layer

        console.log("ethVersion",ethVersion,tokenId)
        console.log("maticVersion",maticVersion,tokenId)
        if (ethVersion > maticVersion) {
            return "bridging eth to matic";
        } else if (ethVersion < maticVersion) {
            return "bridging matic to eth";
        } else {
            return "on different layer";
        }


    }


    async inquiryVersionOnMaticForceMode(nftId: number) {
        const contract_address = new_abi_service.getSlaveContractBridgeOnMatic();
        const abi = new_library_abi_service.getSlaveAbi();
        const web3a = await new_web3_instance.getInstanceWeb3Matic();

        const contract_executed = new web3a.eth.Contract(abi, contract_address);
        const tx = await contract_executed.methods.getVersion(nftId).call();
        return tx;
    }

    async inquiryVersionOnEthForceMode(nftId: number) {
        const contract_address = new_abi_service.getMasterContractBridgeOnEth();
        const abi = new_library_abi_service.getMasterAbi();
        const web3a = await new_web3_instance.getInstanceWeb3Eth();

        const contract_executed = new web3a.eth.Contract(abi, contract_address);
        const tx = await contract_executed.methods.getVersion(nftId).call();
        return tx;
    }


    formatAddress(address: string) {
        const output = address.slice(2);
        const output2 = "0x" + "000000000000000000000000" + output;
        return output2;
    }

    formatDateFromUnixHexa(x:string){
        const number = this.convertHexToNumber(x);
        const unix = moment.unix(number);
        const timeStamp = unix.format('MM-DD-YYYY HH:mm:ss');
        const info = unix.fromNow();
        return timeStamp + " - " + info;
    }

    convertHexToNumber(x: string){
        const yourNumber = parseInt(x, 16);
        return yourNumber;
    }

    async getLogsDepartureEth(address: string) {
        const contractAddress = new_abi_service.getMasterContractBridgeOnEth();

        const apiKey = "18Z9NSI1CPS1VHZKHYZG6EKG5ZAAK5ZQVY";
        const topic0 = "0x349567782f0395eee4e1a7072e3a51b4af44956cdcd0173b9888e37b5f5a3d44";

        const address2 = this.formatAddress(address);
        const topic1 = address2;
        const url = `https://api-goerli.etherscan.io/api?module=logs&action=getLogs&address=${contractAddress}&&apikey=${apiKey}&topic0=${topic0}&topic1=${topic1}`
        console.log("url", url)

        const response = await fetch(url);
        const data = await response.json();
        const data2: any[] = data.result;

        const result: NftTxInfo[] = data2.map(x => {
            const item = {
                transactionHash: x.transactionHash,
                timeStamp: this.formatDateFromUnixHexa(x.timeStamp),
                sender : x.topics[1],
                guid : x.topics[3],
                token_id : this.convertHexToNumber(x.topics[2]),
                is_checked : -1
            }
            return item;
        })

        return result;

    }


    async getLogsArrivalOnMatic(address: string) {

        const contractAddress = new_abi_service.getSlaveContractBridgeOnMatic();

        const apiKey = "18Z9NSI1CPS1VHZKHYZG6EKG5ZAAK5ZQVY";
        const topic0 = "0x8620daddceb6ce4b0cfec859d07a4e1a52f764b84e57ffc13c8167b75b113e50";


        const address2 = this.formatAddress(address);
        const topic1 = address2;
        // const url = `https://api-testnet.polygonscan.com/api?module=logs&action=getLogs&address=${contractAddress}&&apikey=${apiKey}&topic0=${topic0}&topic1=${topic1}`
        const url = `https://api-testnet.polygonscan.com/api?module=logs&action=getLogs&address=${contractAddress}&&apikey=${apiKey}&topic0=${topic0}`
        console.log("url", url)

        const response = await fetch(url);
        const data = await response.json();
        const data2: any[] = data.result;

        const result: NftTxInfo[] = data2.map(x => {
            const item = {
                transactionHash: x.transactionHash,
                timeStamp: this.formatDateFromUnixHexa(x.timeStamp),
                sender : x.topics[1],
                guid : x.topics[3],
                token_id : this.convertHexToNumber(x.topics[2]),
                is_checked : -1
            }
            return item;
        })

        return result;

    }

    //------------


    async getLogsDepartureMatic(address: string) {
        const contractAddress = new_abi_service.getSlaveContractBridgeOnMatic();

        const apiKey = "18Z9NSI1CPS1VHZKHYZG6EKG5ZAAK5ZQVY";
        // const topic0 = "0x69d1a1dbb1d45122254ea3ea896f02d346cfd83e09decb7910eb9adc1e360983";
        // const topic0 = "0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036";
        const topic0 = "0x349567782f0395eee4e1a7072e3a51b4af44956cdcd0173b9888e37b5f5a3d44";

        const address2 = this.formatAddress(address);
        const topic1 = address2;

        // const url = `https://api-testnet.polygonscan.com/api?module=logs&action=getLogs&address=${contractAddress}&&apikey=${apiKey}&topic0=${topic0}`
        const url = `https://api-testnet.polygonscan.com/api?module=logs&action=getLogs&address=${contractAddress}&&apikey=${apiKey}&topic0=${topic0}&topic1=${topic1}`
        // const url = `https://api-testnet.polygonscan.com/api?module=logs&action=getLogs&address=${contractAddress}&&apikey=${apiKey}`
        console.log("url", url)

        const response = await fetch(url);
        const data = await response.json();
        const data2: any[] = data.result;

        const result: NftTxInfo[] = data2.map(x => {
            const item = {
                transactionHash: x.transactionHash,
                timeStamp: this.formatDateFromUnixHexa(x.timeStamp),
                sender : x.topics[1],
                guid : x.topics[3],
                token_id : this.convertHexToNumber(x.topics[2]),
                is_checked : -1
            }
            return item;
        })

        return result;

    }


    async getLogsArrivalOnEth(address: string) {

        const contractAddress = new_abi_service.getMasterContractBridgeOnEth();

        const apiKey = "18Z9NSI1CPS1VHZKHYZG6EKG5ZAAK5ZQVY";
        const topic0 = "0x8620daddceb6ce4b0cfec859d07a4e1a52f764b84e57ffc13c8167b75b113e50";

        const address2 = this.formatAddress(address);
        const topic1 = address2;

        // const url = `https://api-goerli.etherscan.io/api?module=logs&action=getLogs&address=${contractAddress}&&apikey=${apiKey}`
        // const url = `https://api-goerli.etherscan.io/api?module=logs&action=getLogs&address=${contractAddress}&&apikey=${apiKey}&topic0=${topic0}`
        const url = `https://api-goerli.etherscan.io/api?module=logs&action=getLogs&address=${contractAddress}&&apikey=${apiKey}&topic0=${topic0}&topic1=${topic1}`
        // const url = `https://api-testnet.polygonscan.com/api?module=logs&action=getLogs&address=${contractAddress}&&apikey=${apiKey}&topic0=${topic0}`
        console.log("url", url)

        const response = await fetch(url);
        const data = await response.json();
        const data2: any[] = data.result;

        const result: NftTxInfo[] = data2.map(x => {
            const item = {
                transactionHash: x.transactionHash,
                timeStamp: this.formatDateFromUnixHexa(x.timeStamp),
                sender : x.topics[1],
                guid : x.topics[3],
                token_id : this.convertHexToNumber(x.topics[2]),
                is_checked : -1
            }
            return item;
        })

        return result;

    }


}

const g = new newTrancodeBridgeInquiry();
export default g;

