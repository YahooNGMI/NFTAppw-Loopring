console.log("BUFFFFER")

import {
  UserAPI,
  generateKeyPair,
  ConnectorNames,
 

} from "@loopring-web/loopring-sdk";
import axios from "axios";
import Web3 from "web3";
import parseImageURL from "./parseImageURL";
import { NFTType, type NFT } from "../domain/nft";



async function fetchLoopringNfts(address: string): Promise<NFT[]> {
console.log("BUFFFFER")
  let domainNfts: NFT[] = [];
  console.log("dfsddffd")
  // (window as any).ethereum.selectedAddress = address;
  const userAPI = new UserAPI({
    chainId: 1,
  });

  const accountInfo = await axios.get(
    `https://api3.loopring.io/api/v3/account?owner=${address}`
  );
  // console.log("accountinfo:", accountInfo);
  // console.log("owner:", accountInfo.data.owner);
  const NFTowner = accountInfo.data.owner;
  const web3: Web3 = new Web3((window as any).ethereum);
  // console.log("web3",web3);
  // console.log("Window:",(window as any).ethereum.selectedAddress)
  // (window as any).ethereum
  try {
    const eddsaKey = await generateKeyPair({
      isMobile: false,
      address: address,
      walletType: ConnectorNames.Gamestop,
      chainId: 1,
      keySeed:
        "Sign this message to access Loopring Exchange: 0x0BABA1Ad5bE3a5C0a66E7ac838a129Bf948f1eA4 with key nonce: 0",
      web3: web3,
    });
  // console.log("eddsakey",eddsaKey)

    const apiKey = await userAPI.getUserApiKey(
      {
        accountId: accountInfo.data.accountId,
      },
      eddsaKey.sk);

      // console.log("apikey:",apiKey)
    const balances = await userAPI.getUserNFTBalances(
      {
        accountId: accountInfo.data.accountId,
        metadata: true,
      },
      apiKey.apiKey
    );

    // console.log("balnaces:", balances)
    // console.log("Id:", parseImageURL(balances.userNFTBalances[0].metadata.extra.animationUrl))
    
    console.log(balances.userNFTBalances)
    balances.userNFTBalances.forEach(function (nft,index) {
      
      
      const domainNft: NFT = {
        name: nft.metadata.base.name,
        imageURL: parseImageURL(nft.metadata.base.image),
        collection: "",
        description: nft.metadata.base.description,
        nftType: NFTType.Loopring,
        index: index,
        creator: nft.metadata.extra.minter,
        externalUrl: nft.metadata.extra.externalUrl,
        attributes: [{
          type:"",
          value:""
      }],
      };
      domainNfts.push(domainNft);
    });

 
  } catch (error) {
    alert("Error fetching your Loopring NFTs. Please set the desired wallet as the default in your wallet settings")
  }


  return domainNfts;

}

export default fetchLoopringNfts;