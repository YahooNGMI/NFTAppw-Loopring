// ToDo: Refactor code within connect wallet button components. 

import nfts from "../store/nfts";


function pushNFTsToCollection(collection, NFTs) {
    // chainAccount = ethereumAccount;
    // console.log($nfts)
   
    console.log("collection",nfts)
    if (collection && collection.length) {
        collection = collection.concat(NFTs);
        collection.forEach(function (collection, index) {
            collection.index = index;
        })
        return collection;
    } else {
       collection.set(NFTs);
        collection.forEach(function (collection, index) {
            collection.index = index;
        })
        return collection
    }
}

export default pushNFTsToCollection

