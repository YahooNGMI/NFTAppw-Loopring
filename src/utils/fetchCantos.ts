import axios from "axios";
import { BigNumber, ethers, Signer } from "ethers";
import NFT_ABI from "../abi/NFT_ABI";
import Nft from "../components/NFT.svelte";
import type { NFT } from "../domain/nft";
import { NFTType } from "../domain/nft";

export default async function fetchCantos(signer: Signer): Promise<NFT[]> {
  // console.log(signer)
  const contract = new ethers.Contract(

    import.meta.env.VITE_CONTRACT_URL,
    NFT_ABI,
    signer
  );

  const tokenIds: BigNumber[] = await contract.walletOfOwner(
    await signer.getAddress()
  );

console.log("tokenids",tokenIds)
  return await Promise.all(
    (tokenIds || []).map(async (tokenId: BigNumber) => {
      const uri = await contract.tokenURI(tokenId);
      const md = await axios.get(uri);
      const nft: NFT = {
        // image: md.data.image,
        attributes: md.data.attributes,
        name: "#" + md.data.edition,
        nftType: NFTType.Cantos,
      };
      return nft;
    })
  );
  
}

