// import abiService from "@/library/abi_service";
// import global_param from "@/library/global_param";
// import { RockInfo } from "./models";
// import library_abi_service from "@/library/library_abi_service";
//
// declare let window: any;
//
//
// class trancodeService {
//
//
//     async mintCargo(source_address: string) {
//         const contract_address = abiService.getCargoContract();
//         const abi = library_abi_service.getCargoAbi();
//         const web3 = window.Web3Instance;
//         const contract_executed = new web3.eth.Contract(abi, contract_address);
//         const tx = await contract_executed.methods.mintCargo().send({
//             from: source_address,
//             value: 0
//         })
//         return tx;
//
//     }
//
//     async functionInquiryCastlePositionCargo(source_address: string) {
//         const contract_address = abiService.getCargoContract();
//         const abi = library_abi_service.getCargoAbi();
//         const web3 = window.Web3Instance;
//         const contract_executed = new web3.eth.Contract(abi, contract_address);
//         const tx = await contract_executed.methods.inquiryOwner(source_address).call();
//         return tx;
//
//     }
//
//
//
//     async claimMoney(source_address: string) {
//         const contract_address = abiService.getMainContract();
//         const abi = library_abi_service.getAbi();
//         const web3 = window.Web3Instance;
//         const contract_executed = new web3.eth.Contract(abi, contract_address);
//         const tx = await contract_executed.methods.withdrawTokenBalance().send({
//             from: source_address,
//             value: 0
//         })
//         return tx;
//
//     }
//
//     async upgradeWeapon(source_address: string, id: number) {
//         const contract_address = abiService.getMainContract();
//         const abi = library_abi_service.getAbi();
//         const web3 = window.Web3Instance;
//         const contract_executed = new web3.eth.Contract(abi, contract_address);
//         console.log("passive start",source_address,id)
//         const tx = await contract_executed.methods.upgradeWeapon(id).send({
//             from: source_address,
//             value: 0
//         })
//         return tx;
//
//     }
//
//     async passiveStart(source_address: string, id: number) {
//         const contract_address = abiService.getMainContract();
//         const abi = library_abi_service.getAbi();
//         const web3 = window.Web3Instance;
//         const contract_executed = new web3.eth.Contract(abi, contract_address);
//         console.log("passive start",source_address,id)
//         const tx = await contract_executed.methods.passive([id]).send({
//             from: source_address,
//             value: 0
//         })
//         return tx;
//
//     }
//
//     async unstake(source_address: string, id: number) {
//         const contract_address = abiService.getMainContract();
//         const abi = library_abi_service.getAbi();
//         const web3 = window.Web3Instance;
//         const contract_executed = new web3.eth.Contract(abi, contract_address);
//         const tx = await contract_executed.methods.unStake([id]).send({
//             from: source_address,
//             value: 0
//         })
//         return tx;
//
//     }
//
//
//     async functionSendCampaign(source_address: string, id: number,level:number) {
//         const contract_address = abiService.getMainContract();
//         const abi = library_abi_service.getAbi();
//         const web3 = window.Web3Instance;
//         const contract_executed = new web3.eth.Contract(abi, contract_address);
//         const tx = await contract_executed.methods.sendCampaign([id],level,1,false,false,false).send({
//             from: source_address,
//             value: 0
//         })
//         return tx;
//
//     }
//
//
//
//     async passiveEnd(source_address: string, id: number) {
//         const contract_address = abiService.getMainContract();
//         const abi = library_abi_service.getAbi();
//         const web3 = window.Web3Instance;
//         const contract_executed = new web3.eth.Contract(abi, contract_address);
//         const tx = await contract_executed.methods.returnPassive([id]).send({
//             from: source_address,
//             value: 0
//         })
//         return tx;
//
//     }
//
//
//
//     async functionInquiryCastlePosition(id: number) {
//         const contract_address = abiService.getMainContract();
//         const abi = library_abi_service.getAbi();
//         const web3 = window.Web3Instance;
//         const contract_executed = new web3.eth.Contract(abi, contract_address);
//         const tx = await contract_executed.methods.inquiryCastlePosition(id).call();
//         return tx;
//
//     }
//
//
//     async totalMintOfPlayer(source_address: string) {
//         const contract_address = abiService.getMainContract();
//         const abi = library_abi_service.getAbi();
//         const web3 = window.Web3Instance;
//         const contract_executed = new web3.eth.Contract(abi, contract_address);
//         const tx = await contract_executed.methods.balanceOf(source_address).call();
//         return tx;
//     }
//
//     async totalSupply() {
//         const contract_address = abiService.getMainContract();
//         const abi = library_abi_service.getAbi();
//         const web3 = window.Web3Instance;
//         const contract_executed = new web3.eth.Contract(abi, contract_address);
//         const tx = await contract_executed.methods.totalSupply().call();
//         return tx;
//     }
//
//     async totalSupplyCargo() {
//         const contract_address = abiService.getCargoContract();
//         const abi = library_abi_service.getCargoAbi();
//         const web3 = window.Web3Instance;
//         // console.log("totalSupplyCargo-get contract")
//         const contract_executed = new web3.eth.Contract(abi, contract_address);
//         // console.log("totalSupplyCargo-start")
//         const tx = await contract_executed.methods.totalSupply().call();
//         // console.log("totalSupplyCargo-end")
//         return tx;
//     }
//
//     async inquiryBalanceBank(address : string) {
//         const contract_address = abiService.getMainContract();
//         const abi = library_abi_service.getAbi();
//         const web3 = window.Web3Instance;
//         const contract_executed = new web3.eth.Contract(abi, contract_address);
//         const tx = await contract_executed.methods.bankBalances(address).call();
//         return tx;
//     }
//
//     async getBlockNumber() {
//         const contract_address = abiService.getMainContract();
//         const abi = library_abi_service.getAbi();
//         const web3 = window.Web3Instance;
//         const contract_executed = new web3.eth.Contract(abi, contract_address);
//         const tx = await contract_executed.methods.getCurrrentBlockTimeStamp().call();
//         return tx;
//     }
//
//     async inquiryBalanceWallet(address : string) {
//         const contract_address = abiService.getErc20Contract();
//         const abi = library_abi_service.getErc20Abi();
//         const web3 = window.Web3Instance;
//         const contract_executed = new web3.eth.Contract(abi, contract_address);
//         const tx = await contract_executed.methods.balanceOf(address).call();
//         return tx;
//     }
//
//     async inquiryItemGlobal(id : number) {
//         const contract_address = abiService.getMainContract();
//         const item = await this.inquiryItem(id);
//         // console.log("inquiryItemGlobal",id,item)
//         if (item.owner == "0x0000000000000000000000000000000000000000" || item.owner == contract_address){
//             // console.log("inquiryItemGlobal-1",id,item)
//             const address = this.checkOwner(id);
//             return address;
//         }
//         else {
//             // console.log("inquiryItemGlobal-2",id,item)
//             return item.owner;
//         }
//     }
//
//     async inquiryItem(id : number) {
//         const contract_address = abiService.getMainContract();
//         const abi = library_abi_service.getAbi();
//         const web3 = window.Web3Instance;
//         const contract_executed = new web3.eth.Contract(abi, contract_address);
//         const tx = await contract_executed.methods.getTokenSentinel(id).call();
//         return tx;
//     }
//
//     async inquiryItemCargo(id : number) {
//         const contract_address = abiService.getCargoContract();
//         const abi = library_abi_service.getCargoAbi();
//         const web3 = window.Web3Instance;
//         const contract_executed = new web3.eth.Contract(abi, contract_address);
//         const tx = await contract_executed.methods.cargos(id).call();
//         return tx;
//     }
//
//     async checkOwner(id: number) {
//         // console.log("[debug3] check owner start", id)
//         const contract_address = abiService.getMainContract();
//         const abi = library_abi_service.getAbi();
//         const web3 = window.Web3Instance;
//         const contract_executed = new web3.eth.Contract(abi, contract_address);
//         const tx = await contract_executed.methods.ownerOf(id).call();
//         // console.log("[debug3] check owner end", id)
//         return tx;
//     }
//
//
//
//     async updateData(source_address: string, input: string) {
//         const contract_address = abiService.getMainContract();
//         const abi = library_abi_service.getAbi();
//         const web3 = window.Web3Instance;
//         const contract_executed = new web3.eth.Contract(abi, contract_address);
//         const tx = await contract_executed.methods.setGreeting(input).send({
//             from: source_address,
//             value: 0
//         })
//         return tx;
//
//     }
//
//     async getData() {
//         const contract_address = abiService.getMainContract();
//         const abi = library_abi_service.getAbi();
//         const web3 = window.Web3Instance;
//         const contract_executed = new web3.eth.Contract(abi, contract_address);
//         const tx = await contract_executed.methods.greet().call();
//         return tx;
//     }
//
//
//     convertUrl(input: string) {
//         const input2 = input.replace("ipfs://", "");
//         const output = "https://ipfs.io/ipfs/" + input2;
//         return output;
//
//         // ipfs://QmZBZjHSEmcYgFvSNQCwzfNsXwZdUBcjn3PA9pRojpFJQi/0
//         // https://ipfs.io/ipfs/QmZBZjHSEmcYgFvSNQCwzfNsXwZdUBcjn3PA9pRojpFJQi/1
//     }
//
//
//     async inquiryList(address: string) {
//         // console.log("[debug3] inquiry data", address)
//         const contract_address = abiService.getMainContract();
//         const abi = library_abi_service.getAbi();
//         const web3 = window.Web3Instance;
//         const contract_executed = new web3.eth.Contract(abi, contract_address);
//         const tx = await contract_executed.methods.inquiryOwner(address).call();
//         return tx;
//     }
//
//     async inquiryListOnCastle(address: string) {
//         // console.log("[debug3] inquiry data", address)
//         const contract_address = abiService.getMainContract();
//         const abi = library_abi_service.getAbi();
//         const web3 = window.Web3Instance;
//         const contract_executed = new web3.eth.Contract(abi, contract_address);
//         const tx = await contract_executed.methods.inquiryOwnerOnCastle(address).call();
//         return tx;
//     }
//
//     async inquiryData(id: number) {
//         console.log("[debug3] inquiry data", id)
//         const contract_address = abiService.getMainContract();
//         const abi = library_abi_service.getAbi();
//         const web3 = window.Web3Instance;
//         const contract_executed = new web3.eth.Contract(abi, contract_address);
//         const tx = await contract_executed.methods.getTrainObject(id).call();
//         return tx;
//     }
//
//     async inquiryActivity(id: number) {
//         console.log("[debug3] inquiry activity", id)
//         const contract_address = abiService.getMainContract();
//         const abi = library_abi_service.getAbi();
//         const web3 = window.Web3Instance;
//         const contract_executed = new web3.eth.Contract(abi, contract_address);
//         const tx = await contract_executed.methods.getActivity(id).call();
//         return tx;
//     }
//
//
//     async mint(source_address: string) {
//
//         const contract_address = abiService.getMainContract();
//         const abi = library_abi_service.getAbi();
//         const web3 = window.Web3Instance;
//         // const amount = 0.069
//         const amount = 0;
//         const tokens = web3.utils.toWei(amount.toString(), 'ether')
//
//         const contract_executed = new web3.eth.Contract(abi, contract_address);
//         // const tx = await contract_executed.methods.publicMint(1).send({
//         //     from: source_address,
//         //     value: tokens
//         // })
//         const tx = await contract_executed.methods.mint().send({
//             from: source_address,
//             value: tokens
//         })
//
//         return tx;
//     }
//
//     async upgradeStart(source_address: string, id: number) {
//
//         const upgradeId = 2;
//         const contract_address = abiService.getMainContract();
//         const abi = library_abi_service.getAbi();
//         const web3 = window.Web3Instance;
//
//         const contract_executed = new web3.eth.Contract(abi, contract_address);
//         const tx = await contract_executed.methods.doAction(id, upgradeId).send({
//             from: source_address,
//             value: 0
//         })
//         return tx;
//     }
//
//     async upgradeEnd(source_address: string, id: number) {
//
//         const upgradeId = 0;
//         const contract_address = abiService.getMainContract();
//         const abi = library_abi_service.getAbi();
//         const web3 = window.Web3Instance;
//
//         const contract_executed = new web3.eth.Contract(abi, contract_address);
//         const tx = await contract_executed.methods.doAction(id, upgradeId).send({
//             from: source_address,
//             value: 0
//         })
//         return tx;
//
//     }
//
//
//     async mintFreshTrain(source_address: string) {
//
//         const contract_address = abiService.getMainContract();
//         const abi = library_abi_service.getAbi();
//         const web3 = window.Web3Instance;
//         const amount = 0.01
//         const tokens = web3.utils.toWei(amount.toString(), 'ether')
//
//         const contract_executed = new web3.eth.Contract(abi, contract_address);
//         const tx = await contract_executed.methods.freshMint().send({
//             from: source_address,
//             value: tokens
//             // value: 0
//         })
//
//         return tx;
//     }
//
//     async mintTrain(source_address: string) {
//
//         const contract_address = abiService.getMainContract();
//         const abi = library_abi_service.getAbi();
//         const web3 = window.Web3Instance;
//         // const amount = 0.069
//         // const tokens = web3.utils.toWei(amount.toString(), 'ether')
//
//         const contract_executed = new web3.eth.Contract(abi, contract_address);
//         const tx = await contract_executed.methods.mint().send({
//             from: source_address,
//             // value: tokens
//             value: 0
//         })
//
//         return tx;
//     }
//
//     async getTotalNft(address: string) {
//         const contract_address = abiService.getMainContract();
//         const abi = library_abi_service.getAbi();
//         const web3 = window.Web3Instance;
//         const contract_executed = new web3.eth.Contract(abi, contract_address);
//         const data = await contract_executed.methods.balanceOf(address).call();
//         return data;
//     }
//
//     generateItems() {
//         const output = new Array<RockInfo>();
//         let i = 0;
//         for (i = 0; i < global_param.getTotalItems(); i++) {
//             const item = new RockInfo();
//             item.id = i;
//             output.push(item);
//         }
//         return output;
//     }
//
//     showHistory(item: RockInfo) {
//         const id = item.id;
//         alert("showHstory-" + id);
//     }
//
//     showOwner(item: RockInfo) {
//         alert("showOwner-" + item.owner);
//     }
//
//     async getRockInfoPrice(input: number) {
//         const contract_address = abiService.getMainContract();
//         const abi = library_abi_service.getAbi();
//         const web3 = window.Web3Instance;
//         console.log("get list ", 1)
//         const contract_executed = new web3.eth.Contract(abi, contract_address);
//         console.log("get list ", 2, contract_address)
//         const data = await contract_executed.methods.getRockInfoPrice(input).call();
//         console.log("get list ", 3, data)
//
//
//         return data;
//     }
//
//
//     async buy(item: RockInfo, source_address: string) {
//         const id = item.id;
//
//         const contract_address = abiService.getMainContract();
//         const abi = library_abi_service.getAbi();
//         const web3 = window.Web3Instance;
//         const contract_executed = new web3.eth.Contract(abi, contract_address);
//         console.log("buy 1", item.id)
//         const tx = await contract_executed.methods.buyRock(id).send({
//             from: source_address,
//             value: item.price
//         })
//
//         return tx;
//     }
//
//     async stopSell(item: RockInfo, source_address: string) {
//         const id = item.id;
//         const contract_address = abiService.getMainContract();
//         const abi = library_abi_service.getAbi();
//         const web3 = window.Web3Instance;
//         const contract_executed = new web3.eth.Contract(abi, contract_address);
//         console.log("sell 300", item.id)
//         const tx = await contract_executed.methods.dontSellRock(id).send({
//             from: source_address,
//             value: 0
//         })
//
//         return tx;
//
//     }
//
//
//     async sell(item: RockInfo, price: number, source_address: string) {
//         console.log("sell 0", item.id, price)
//         const id = item.id;
//         console.log("sell 50", item.id)
//         const price2 = this.convertToWei(price);
//         console.log("sell 100", item.id)
//         const contract_address = abiService.getMainContract();
//         const abi = library_abi_service.getAbi();
//         console.log("sell 200", item.id)
//         const web3 = window.Web3Instance;
//         const contract_executed = new web3.eth.Contract(abi, contract_address);
//         console.log("sell 300", item.id)
//         const tx = await contract_executed.methods.sellRock(id, price2).send({
//             from: source_address,
//             value: 0
//         })
//
//         return tx;
//
//         // const id = item.id;
//         // alert("sell-" + id + " - " + price + " - " + source_address);
//     }
//
//     gift(item: RockInfo) {
//         const id = item.id;
//         alert("gift-" + id);
//     }
//
//     convertToEther(input: number) {
//         const web3 = window.Web3Instance;
//         const amount = input.toString();
//         const amount3 = web3.utils.fromWei(amount, 'ether');
//         return amount3;
//     }
//
//     convertToWei(input: number) {
//         console.log("convertToWei 0", input)
//         const web3 = window.Web3Instance;
//         console.log("convertToWei 50", input, web3)
//         // const amount = input.toString();
//         // console.log("convertToWei 100", amount)
//         try {
//             // console.log("convertToWei 150", amount)
//
//             // const amountToSend = input;
//             const weiAmount = input * 1e18;
//             // const weiAmount2 = web3.utils.toWei(weiAmout.toString());
//             const amount3 = weiAmount.toString();
//
//             // const amount3 = web3.utils.toWei(amount, 'wei');
//             console.log("convertToWei 200", amount3)
//             return amount3;
//         }
//         catch (e) {
//             console.log("convertToWei 250", e)
//         }
//
//     }
//
//
//     displayCoin(item: RockInfo) {
//         // `string text ${expression} string text`
//         // const output = "BUY (1000ETH)";
//         const price = this.convertToEther(item.price)
//         const output = `BUY (${price}ETH)`
//         return output;
//     }
//
//     async populateData(items: Array<RockInfo>, current_address: string) {
//         for (const input of items) {
//             const data = await this.getInfo(input.id);
//             input.currentlyForSale = data.currentlyForSale;
//             input.owner = data.owner;
//             input.price = data.price;
//             input.timesSold = data.timesSold;
//             input.hasData = true;
//             if (input.owner.toLowerCase() == current_address.toLowerCase()) {
//                 input.isOwnedByUser = true;
//             }
//         }
//     }
//
//     async getInfo(input: number): Promise<RockInfo> {
//         const contract_address = abiService.getMainContract();
//         const abi = library_abi_service.getAbi();
//         const web3 = window.Web3Instance;
//         // console.log("get list ", 1)
//         const contract_executed = new web3.eth.Contract(abi, contract_address);
//         // console.log("get list ", 2, contract_address)
//         const data = await contract_executed.methods.getRockInfo2(input).call();
//         // console.log("get list ", 3, data)
//         const output: RockInfo = data;
//         // console.log("get list ", 4, output.owner)
//
//         return output;
//     }
// }
//
// const g = new trancodeService();
// export default g;