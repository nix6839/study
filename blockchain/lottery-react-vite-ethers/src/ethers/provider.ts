import { ethers } from 'ethers';

await (window as any).ethereum.request({
  method: 'eth_requestAccounts',
});

const provider = new ethers.providers.Web3Provider((window as any).ethereum);

export default provider;
