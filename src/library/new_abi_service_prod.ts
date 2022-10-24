class newAbiProdService {

    getMasterContractBridgeOnEth() {
        return "0xf853DBC2C192730FA67304E33d1Ef2EDaf163Efe";
    }

    getSlaveContractBridgeOnMatic() {
        return "0xD13Adf9486ccCd3D9d881611c4ca9Ffb7621103A";
    }

    getNftContractOnEth() {
        return "0x6f660A2452bCdaAC718Df4e4a5d62fA023167F8D";
    }

    getNftContractOnMatic() {
        return "0x781E322723E6fE7EE4c2566C8b9441A8ecE930d7";
    }


}

const v = new newAbiProdService();
export default v;