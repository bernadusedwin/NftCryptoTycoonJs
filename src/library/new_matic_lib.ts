import { POSClient,use } from "@maticnetwork/maticjs"
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'
// import HDWalletProvider from "@truffle/hdwallet-provider"
import new_web3_instance from "@/library/new_web3_instance";
import { ExitUtil, RootChain,  Web3SideChainClient } from "@maticnetwork/maticjs";

class newMaticLib {


    async test() {
        use(Web3ClientPlugin);

        // const privateKey = "4fffe182cd8dee1f7c68e0ec6b61293e87bf7faa28952ce55b58db8406a422a8";
        // const mainRPC = "https://goerli.infura.io/v3/605cc3bbb6b2412fa0399ee07e8bbb49";
        // const childRPC = "https://matic-mumbai.chainstacklabs.com";

        const fromAddress = "0x60197a641FFC76BDbb6d23cC1d251428E7502d24";


        const ethProvider = await new_web3_instance.getInstanceWeb3Eth()
        const maticProvider = await new_web3_instance.getInstanceWeb3Matic()
        const posClient = new POSClient();
        await posClient.init({
            network: 'testnet',
            version: 'mumbai',
            parent: {
                // provider: new HDWalletProvider(privateKey, mainRPC),
                provider: ethProvider,

                defaultConfig: {
                    from: fromAddress
                }
            },
            child: {
                // provider: new HDWalletProvider(privateKey, childRPC),
                provider: maticProvider,
                defaultConfig: {
                    from: fromAddress
                }
            }
        });

        const selfAddress = "0x60197a641FFC76BDbb6d23cC1d251428E7502d24";
        const erc20ParentToken = posClient.erc20("0x66ccf3fe1e7d327c51d5e619e57a7401c54159b8", true);
        const balance = await erc20ParentToken.getBalance(selfAddress)
        console.log('parent balance', balance)

        const hash = "0x27febdd056bcc0f00c028b937c8c6b9999bec2aef95fd5a2785bc099b62aac20";
        const signature = "0x4dfe1bbbcf077ddc3e01291eea2d5c70c2b422b415d95645b9adcfd678cb1d63";
        // const result = await posClient.exitUtil.buildPayloadForExit(hash,signature)


        // const result = await posClient.isCheckPointed('0x27febdd056bcc0f00c028b937c8c6b9999bec2aef95fd5a2785bc099b62aac20');
        const result = await posClient.isCheckPointed('0xdee3af8a0690d7da3bea88b5871e8d82c572c6577096bc908d3f4788167c0544');


        const info = await posClient.exitUtil.getChainBlockInfo(hash);
        console.log("info",info)
//         const client = posClient;
//         const rootChainAddress = "";
//         // create root chain instance
//         const rootChain = new RootChain(client, rootChainAddress);
//
// // create exitUtil Instance
//         const exitUtil = new ExitUtil(client, rootChain);
//
// // generate proof
//         const proof = await exitUtil.buildPayloadForExit(
//             <burn tx hash>,
//             <log event signature>,
//             <isFast>
//
//         console.log('get result', result)



        // const resultBuildPayload = await posClient.exitUtil.buildPayloadForExit(hash,0,signature,false)
        // console.log("resultBuildPayload",resultBuildPayload)

        // const resultBuildPayload = await posClient.exitUtil.buildMultiplePayloadsForExit(hash,signature,false);
        // console.log("resultBuildPayload",resultBuildPayload)

    }


    async checkPoint(trxHash : string){
        const posClient = await this.generateClient();
        const result = await posClient.isCheckPointed(trxHash);
        return result;
    }

    async checkDeposit(trxHash : string){
        const posClient = await this.generateClient();
        const result = await posClient.isDeposited(trxHash);
        return result;
    }

    async generateClient() {
        use(Web3ClientPlugin);
        const fromAddress = "";


        const ethProvider = await new_web3_instance.getInstanceWeb3Eth()
        const maticProvider = await new_web3_instance.getInstanceWeb3Matic()
        const posClient = new POSClient();
        await posClient.init({
            network: 'testnet',
            version: 'mumbai',
            parent: {
                provider: ethProvider,

                defaultConfig: {
                    from: fromAddress
                }
            },
            child: {
                provider: maticProvider,
                defaultConfig: {
                    from: fromAddress
                }
            }
        });

        return posClient;

    }
}

const v = new newMaticLib();
export default v;