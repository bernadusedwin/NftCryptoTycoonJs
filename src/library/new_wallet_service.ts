import abi_service from "@/library/abi_service";

class walletService {

    inquiryMasterChainId(){
        if (abi_service.isDevMode()) {
            return ["31337","hardhat"];
            // return ["1337","ganache"];
        } else {
            // return ["0x3","ropsten"];
            // return ["0x4","rinkeby"];
            return ["0x5","goerli"];
        }
    }

    inquirySlaveChainId(){
        if (abi_service.isDevMode()) {
            return ["31337","hardhat"];
            // return ["1337","ganache"];
        } else {
            return ["80001","mumbai-matic"];
        }
    }

    async getMasterChainId() {
        return this.inquiryMasterChainId()[0];
    }

    async getSlaveChainId() {
        return this.inquirySlaveChainId()[0]
    }

    async getMasterChainDesc() {
        return this.inquiryMasterChainId()[1];
    }

    async getSlaveChainDesc() {
        return this.inquirySlaveChainId()[1]
    }



}

const v = new walletService();
export default v;