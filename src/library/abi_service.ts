class abiService {
    isDevMode() {
        if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
            // const devMode = true;
            // return devMode;

            // return true;
            return false;
        } else {
            return false;
        }
    }

    inquiryChainId(){
        if (this.isDevMode()) {

            return ["80001","mumbai-matic"];
            // return ["31337","hardhat"];
            // return ["1337","ganache"];
        } else {
            // return ["0x3","ropsten"];
            return ["0x4","rinkeby"];
        }
    }
    getChainId() {
        return this.inquiryChainId()[0];
    }

    getChainIdDesc() {
        return this.inquiryChainId()[1];
    }

    getOwner() {
        if (this.isDevMode()) {
            return "";
        } else {
            return "";
        }
    }

    getMainContract() {
        if (this.isDevMode()) {
            return "0x5FbDB2315678afecb367f032d93F642f64180aa3";
        } else {
            return "0xED588036eA4873235BD633E64EC734cBc554792B";
        }
    }


    getErc20Contract() {
        if (this.isDevMode()) {
            return "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
        } else {
            return "0x4294E48209f37A3F2020d76D3b752aF73F732Df6";
        }
    }

    getCampaignContract() {
        if (this.isDevMode()) {
            return "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
        } else {
            return "0xd006E10f87F751eE02D6eDF706E4be518E880780";
        }
    }

    getCargoContract() {
        if (this.isDevMode()) {
            return "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
        } else {
            return "0xBB6DF88bB61103c903609F40723829F43354D984";
        }
    }

    getManagerCombineContract() {
        if (this.isDevMode()) {
            return "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
        } else {
            return "0xC6e4FbbBFa2810377fE5DDe8E3057988de905EFa";
        }
    }




}

const v = new abiService();
export default v;