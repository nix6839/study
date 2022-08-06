import * as fs from 'node:fs';
import * as nodePath from 'node:path';
// @ts-ignore
import solc from 'solc';

export default function compileSolidity(path: string, contractName: string) {
  const source = fs.readFileSync(path, 'utf-8');
  const fileName = nodePath.basename(path);

  const input = {
    language: 'Solidity',
    sources: {
      [fileName]: {
        content: source,
      },
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*'],
        },
      },
    },
  };

  const output = JSON.parse(solc.compile(JSON.stringify(input)));

  const contract = output.contracts[fileName][contractName];
  const byte = contract.evm.bytecode.object;
  const abi = contract.abi;

  return { byte, abi };
}
