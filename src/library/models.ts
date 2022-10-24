export class RockInfo {
    owner = "";
    currentlyForSale = true;
    price = 0;
    timesSold = 0;
    hasData = false;
    id = 0;
    isOwnedByUser = false;
}

export class PassingItemToModal {
    // train_id = -1;
    item_id = -1;
    cargo_ids = [];
    weaponTier = -1;
    currentBalance = -1;
    train : any;
}

export class InputCargoUpgrade {
    cargo_id = -1;
    amount = -1;
}


export class ListInputCombine {
    id = -1;
    name = [];
    quantity = -1;
    current_qty = -1;
    min_qty = -1;
    max_qty = -1;
    diff = 0;

}

export class NftTxInfo {
    transactionHash = "";
    // timeStamp = -1;
    timeStamp = "";
    sender = "";
    guid = "";
    token_id = -1;
    is_checked = -1;
}

export class DataInfoBridge {
    hash_input = "";
    is_error = false;
    msg = "";
}



export class NftInquiryItem {
    is_active = false;
    level = -1;
    owner = "";
    token_id = -1;
}


export class NftInquiryItemWithStatus {
    is_active = false;
    level = -1;
    owner = "";
    token_id = -1;
    status = "";
}

declare global {
    interface Window {
        open(a : any,b : any) : any,
        Web3Instance : any;
        web3Modal : any;
        loginVue: any;
        ethereum: any;
        Web3Modal: any;
        WalletConnectProvider: any;
        Fortmatic : any;

    }
}