import abi_service from "@/library/abi_service";
import newAbiProdService from "./new_abi_service_prod";
class newAbiService {



    getMasterContractBridgeOnEth() {
        if (abi_service.isDevMode()) {
            return "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
        } else {
            return newAbiProdService.getMasterContractBridgeOnEth();
            // "0x9686376D590560e9b1838cfdEe33D930D5B7B9eB";
        }
    }

    getSlaveContractBridgeOnMatic() {
        if (abi_service.isDevMode()) {
            return "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
        } else {
            return newAbiProdService.getSlaveContractBridgeOnMatic();
            // return "0x2a56325dB75049B0BF92D7c2292B0e9Dd3FaD86b";
        }
    }


    getNftContractOnEth() {
        if (abi_service.isDevMode()) {
            return "0x5FbDB2315678afecb367f032d93F642f64180aa3";
        } else {
            return newAbiProdService.getNftContractOnEth();
            // return "0xC3206F5Da261897d5C2338d49a25b335e978ca5d";
        }
    }

    getNftContractOnMatic() {
        if (abi_service.isDevMode()) {
            return "0x5FbDB2315678afecb367f032d93F642f64180aa3";
        } else {
            return newAbiProdService.getNftContractOnMatic();
            // return "0xDD482FDB4243763340d82Bac0f5742cd4876Ebbf";
        }
    }





}

const v = new newAbiService();
export default v;