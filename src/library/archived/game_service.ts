// import {RockInfo} from "./models";

// class gameService {

    
    

//     visibleStopSell(rockInfo: RockInfo): boolean {
//         if (rockInfo.isOwnedByUser) {
//             if (rockInfo.currentlyForSale) {
//                 return true;
//             }
//         }
//         return false;
//     }

//     visibleBuy(rockInfo: RockInfo): boolean {
//         if (rockInfo.isOwnedByUser) {
//             return false;
//         }
//         if (rockInfo.currentlyForSale) {
//             return true;
//         }
//         return false;
//     }

//     visibleSell(rockInfo: RockInfo): boolean {
//         if (rockInfo.isOwnedByUser) {
//             if (rockInfo.currentlyForSale == false) {
//                 return true;
//             }
//         }
//         return false;
//     }

//     visibleNotForSell(rockInfo: RockInfo): boolean {
//         if (rockInfo.isOwnedByUser) {
//             return false;
//         }
//         const output = this.visibleBuy(rockInfo);
//         return !output;
//     }

//     showHistory(item: RockInfo) {
//         const id = item.id;
//         alert("showHstory-" + id);
//     }
// }

// const g = new gameService();
// export default g;