import { ethers } from "ethers";
import { EthrDID } from "ethr-did";

export const getWalletAddress = async (web3Auth) => {
  if (web3Auth?.provider) {
    const provider = new ethers.BrowserProvider(web3Auth.provider); 
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    console.log("Wallet Address:", address);
    return address;
  }
};


export async function createEthrDID(web3Auth) {
  const ethersProvider = new ethers.BrowserProvider(web3Auth.provider);
  const signer = await ethersProvider.getSigner();
  const address = await signer.getAddress();

  const network = await ethersProvider.getNetwork();
  const chainId = network.chainId;

  const ethrDid = new EthrDID({
    identifier: address,
    provider: ethersProvider,
    chainNameOrId: chainId,
  });

  console.log("DID:", ethrDid.did);
  return ethrDid.did;
}

