import { NFTType, type NFT } from "../domain/nft";
import { Connection } from "@metaplex/js";
import { programs } from "@metaplex/js";

async function fetchSolanaNfts(solanaAddressInput: string): Promise<NFT[]> {
  const connection = new Connection("mainnet-beta");
  const ownerPublickey = solanaAddressInput;
  const domainNfts: NFT[] = [];

  const tokenMetadata = await programs.metadata.Metadata.findDataByOwner(
    connection,
    ownerPublickey
  );
  let title;
  let external_url:string;
  let i=0;
  await Promise.all(
    tokenMetadata.map(async function (solNft, index) {
      const n = await fetch(solNft.data.uri);
      const metadata = await n.json();
      

      console.log(metadata)
      if (metadata.collection) {
        title = metadata.collection.family
      } else {
        title = metadata.symbol
      }
      if (metadata.external_url) {
        external_url = metadata.external_url
      } else {
        external_url = ""
      }
      const nft: NFT = {
        name: metadata.name,
        description: metadata.description,

        collection: title,
        imageURL: metadata.image,
        nftType: NFTType.Solana,
        index: i,
        creator: "",
        externalUrl: external_url,
        attributes: metadata.attributes
      };
      i=i+1;
     
      domainNfts.push(nft);
      
    })

        
      
  );

  
  return domainNfts;
}

export default fetchSolanaNfts;
