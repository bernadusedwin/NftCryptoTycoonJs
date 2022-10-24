class priceParam {

    inquiryFreshMintPrice(){
        return "0.01 ETH";
    }

    inquiryUpgradePrice(){
        return "1.5 TRAIN";
    }

    inquiryMintFromCoinPrice(){
        // return "0.01 TRAIN";
        return "0.5 TRAIN";
    }

    inquiryMintCargoPrice(){
        return "10 TRAIN";
    }



}

const v = new priceParam();
export default v;