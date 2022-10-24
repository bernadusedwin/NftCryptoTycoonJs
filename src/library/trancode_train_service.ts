import abiService from "@/library/abi_service";
import global_param from "@/library/global_param";
import { RockInfo } from "./models";
import library_abi_service from "@/library/library_abi_service";

declare let window: any;


class trancodeTrainService {

    async functionCalcCampaign(map_id : number,weapon_tier : number,list_cargo : Array<number>) {
        // console.log("functionCalcCampaign",list_cargo)
        const contract_address = abiService.getCampaignContract();
        const abi = library_abi_service.getCampaignAbi();
        const web3 = window.Web3Instance;
        const contract_executed = new web3.eth.Contract(abi, contract_address);
        const tx = await contract_executed.methods.calc(map_id,weapon_tier,list_cargo).call();
        return tx;
    }

    async functionInquiryCargo(train_id : number) {
        const contract_address = abiService.getMainContract();
        const abi = library_abi_service.getAbi();
        const web3 = window.Web3Instance;
        const contract_executed = new web3.eth.Contract(abi, contract_address);
        const tx = await contract_executed.methods.inquiryCargo(train_id).call();
        return tx;
    }


    async functionCombineCargo(source_address: string,train_id : number, type_id : number , qty : number) {
        const contract_address = abiService.getMainContract();
        const abi = library_abi_service.getAbi();
        const web3 = window.Web3Instance;
        const contract_executed = new web3.eth.Contract(abi, contract_address);
        const tx = await contract_executed.methods.combineCargo(train_id,type_id,qty).send({
            from: source_address,
            value: 0
        })
        return tx;

    }


    async claimMoney(source_address: string) {
        const contract_address = abiService.getMainContract();
        const abi = library_abi_service.getAbi();
        const web3 = window.Web3Instance;
        const contract_executed = new web3.eth.Contract(abi, contract_address);
        const tx = await contract_executed.methods.withdrawTokenBalance().send({
            from: source_address,
            value: 0
        })
        return tx;

    }

    async upgradeWeapon(source_address: string, id: number) {
        const contract_address = abiService.getMainContract();
        const abi = library_abi_service.getAbi();
        const web3 = window.Web3Instance;
        const contract_executed = new web3.eth.Contract(abi, contract_address);
        console.log("passive start",source_address,id)
        const tx = await contract_executed.methods.upgradeWeapon(id).send({
            from: source_address,
            value: 0
        })
        return tx;

    }

    async passiveStart(source_address: string, id: number) {
        const contract_address = abiService.getMainContract();
        const abi = library_abi_service.getAbi();
        const web3 = window.Web3Instance;
        const contract_executed = new web3.eth.Contract(abi, contract_address);
        console.log("passive start",source_address,id)
        const tx = await contract_executed.methods.passive([id]).send({
            from: source_address,
            value: 0
        })
        return tx;

    }

    async unstake(source_address: string, id: number) {
        const contract_address = abiService.getMainContract();
        const abi = library_abi_service.getAbi();
        const web3 = window.Web3Instance;
        const contract_executed = new web3.eth.Contract(abi, contract_address);
        const tx = await contract_executed.methods.unStake([id]).send({
            from: source_address,
            value: 0
        })
        return tx;

    }


    async functionSendCampaign(source_address: string, id: number,level:number) {
        const contract_address = abiService.getMainContract();
        const abi = library_abi_service.getAbi();
        const web3 = window.Web3Instance;
        const contract_executed = new web3.eth.Contract(abi, contract_address);
        const tx = await contract_executed.methods.sendCampaign([id],level).send({
            from: source_address,
            value: 0
        })
        return tx;

    }



    async passiveEnd(source_address: string, id: number) {
        const contract_address = abiService.getMainContract();
        const abi = library_abi_service.getAbi();
        const web3 = window.Web3Instance;
        const contract_executed = new web3.eth.Contract(abi, contract_address);
        const tx = await contract_executed.methods.returnPassive([id]).send({
            from: source_address,
            value: 0
        })
        return tx;

    }




    // async totalMintOfPlayer(source_address: string) {
    //     const contract_address = abiService.getMainContract();
    //     const abi = library_abi_service.getAbi();
    //     const web3 = window.Web3Instance;
    //     const contract_executed = new web3.eth.Contract(abi, contract_address);
    //     const tx = await contract_executed.methods.balanceOf(source_address).call();
    //     return tx;
    // }

    async totalSupply() {
        const contract_address = abiService.getMainContract();
        const abi = library_abi_service.getAbi();
        const web3 = window.Web3Instance;
        const contract_executed = new web3.eth.Contract(abi, contract_address);
        const tx = await contract_executed.methods.totalSupply().call();
        return tx;
    }



    convertUrl(input: string) {
        const input2 = input.replace("ipfs://", "");
        const output = "https://ipfs.io/ipfs/" + input2;
        return output;

        // ipfs://QmZBZjHSEmcYgFvSNQCwzfNsXwZdUBcjn3PA9pRojpFJQi/0
        // https://ipfs.io/ipfs/QmZBZjHSEmcYgFvSNQCwzfNsXwZdUBcjn3PA9pRojpFJQi/1
    }




    async mint(source_address: string) {

        const contract_address = abiService.getMainContract();
        const abi = library_abi_service.getAbi();
        const web3 = window.Web3Instance;
        // const amount = 0.069
        const amount = 0;
        const tokens = web3.utils.toWei(amount.toString(), 'ether')

        const contract_executed = new web3.eth.Contract(abi, contract_address);
        // const tx = await contract_executed.methods.publicMint(1).send({
        //     from: source_address,
        //     value: tokens
        // })
        const tx = await contract_executed.methods.mint().send({
            from: source_address,
            value: tokens
        })

        return tx;
    }



    async mintFreshTrain(source_address: string) {

        const contract_address = abiService.getMainContract();
        const abi = library_abi_service.getAbi();
        const web3 = window.Web3Instance;
        const amount = 0.01
        const tokens = web3.utils.toWei(amount.toString(), 'ether')

        const contract_executed = new web3.eth.Contract(abi, contract_address);
        const tx = await contract_executed.methods.freshMint().send({
            from: source_address,
            value: tokens
            // value: 0
        })

        return tx;
    }

    async mintTrain(source_address: string) {

        const contract_address = abiService.getMainContract();
        const abi = library_abi_service.getAbi();
        const web3 = window.Web3Instance;
        // const amount = 0.069
        // const tokens = web3.utils.toWei(amount.toString(), 'ether')

        const contract_executed = new web3.eth.Contract(abi, contract_address);

        // const tx = await contract_executed.methods.mintWithoutSickness().send({
        //     from: source_address,
        //     value: 0
        // })

        const tx = await contract_executed.methods.mintWithCountdown().send({
            from: source_address,
            // value: tokens
            value: 0
        })

        return tx;
    }



}

const g = new trancodeTrainService();
export default g;



// async upgradeStart(source_address: string, id: number) {
//
//     const upgradeId = 2;
//     const contract_address = abiService.getMainContract();
//     const abi = library_abi_service.getAbi();
//     const web3 = window.Web3Instance;
//
//     const contract_executed = new web3.eth.Contract(abi, contract_address);
//     const tx = await contract_executed.methods.doAction(id, upgradeId).send({
//         from: source_address,
//         value: 0
//     })
//     return tx;
// }
//
// async upgradeEnd(source_address: string, id: number) {
//
//     const upgradeId = 0;
//     const contract_address = abiService.getMainContract();
//     const abi = library_abi_service.getAbi();
//     const web3 = window.Web3Instance;
//
//     const contract_executed = new web3.eth.Contract(abi, contract_address);
//     const tx = await contract_executed.methods.doAction(id, upgradeId).send({
//         from: source_address,
//         value: 0
//     })
//     return tx;
//
// }


//
// async updateData(source_address: string, input: string) {
//     const contract_address = abiService.getMainContract();
//     const abi = library_abi_service.getAbi();
//     const web3 = window.Web3Instance;
//     const contract_executed = new web3.eth.Contract(abi, contract_address);
//     const tx = await contract_executed.methods.setGreeting(input).send({
//         from: source_address,
//         value: 0
//     })
//     return tx;
//
// }