import type {NFT, NFTType } from "../domain/nft";
import nfts from "../store/nfts";

let containsValue: boolean;
async function filterNFTsByType(collection: NFT[], nftType: NFTType): Promise<NFT[]> {
    // containsvalue find if any NFT in the collection contains an nft witha specific name at all, and if so returns true
    var containsValue = collection.filter(obj => obj.nftType == nftType).length >0;
// console.log(nftType);
// console.log("collection",collection[0].nftType)
// console.log("contains:",containsValue);
    // while containsValue is true, cycle through the collection and remove nfts one by one
    while (containsValue === true) {
        let index = collection.findIndex(obj => obj.nftType === nftType);
        if (index !== -1) {
            collection.splice(index, 1);
        }
        containsValue = collection.filter(obj => obj.nftType === nftType).length > 0;
     
    }

    console.log("collection",collection)
     console.log("filtered nfts:",nfts)
   var data:NFT[] = collection;
   return data;
    
  
}
export default filterNFTsByType

