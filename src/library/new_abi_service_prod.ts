class newAbiProdService {

    getMasterContractBridgeOnEth() {
        return "0x795dE0B33Cd3fE50b3F785017E0542c33Ec1E738";
    }

    getSlaveContractBridgeOnMatic() {
        return "0x8A93b8797421e6a54900031A4ee36a4FF32Fc5a7";
    }

    getNftContractOnEth() {
        return "0x90b7E70215A1577E6CD86c41Bdf4a0980c4dE6c2";
    }

    getNftContractOnMatic() {
        return "0x24484162765D24557707Fd4d0f6fd1876db03677";
    }


}

const v = new newAbiProdService();
export default v;