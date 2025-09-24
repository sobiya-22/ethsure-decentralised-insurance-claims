import { ethers } from "ethers";

export const getWalletAddress = async (web3Auth) => {
  if (web3Auth?.provider) {
    const provider = new ethers.BrowserProvider(web3Auth.provider); 
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    console.log("Wallet Address:", address);
    return address;
  }
};
