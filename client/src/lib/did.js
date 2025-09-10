// import { EthrDID } from 'ethr-did';
// import { ethers } from 'ethers';


// export const generateDID = async (address,privateKey) => {
//       const ethrDid = new EthrDID({
//         identifier: address,
//         privateKey: privateKey,
//         chainNameOrId: 'sepolia',
//         provider: new ethers.JsonRpcProvider(import.meta.env.RPC_URL)
//       });

//       console.log("Generated DID:", ethrDid.did);
// };


import { EthrDID } from "ethr-did";

export const generateDID = async (privateKey) => {
  const did = new EthrDID({
    identifier: "0x" + new ethers.Wallet(privateKey).address,
    privateKey,
    provider: new ethers.JsonRpcProvider(import.meta.env.RPC_URL),
  });

  console.log("✅ DID:", did.did);
  return did;
};
