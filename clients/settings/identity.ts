import fs from 'fs';
import path from 'path';
import { Secp256k1KeyIdentity } from '@dfinity/identity';
import bip39 from 'bip39';
import BIP32Factory from 'bip32';
import { BIP32Interface } from 'bip32';
import ecc from 'tiny-secp256k1';
import { SignIdentity } from '@dfinity/agent';

export function fromHexString(hexString: string): ArrayBuffer {
  return new Uint8Array(
    (hexString.match(/.{1,2}/g) ?? []).map(byte => parseInt(byte, 16)),
  ).buffer;
}

export const toHexString = (bytes: Uint8Array) =>
  bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');

export function getIdentityFromPhrase(phrase: string): SignIdentity {
  const seed = bip39.mnemonicToSeedSync(phrase);

  const ICP_PATH = "m/44'/223'/0'";
  const path = `${ICP_PATH}/0/0`;

  const bip32 = (BIP32Factory as any).default(ecc);

  let node: BIP32Interface = bip32.fromSeed(seed);

  let child: BIP32Interface = node.derivePath(path);

  return Secp256k1KeyIdentity.fromSecretKey(child.privateKey!);
  // return seed;
}

const seedPhrase = fs
  .readFileSync(path.join(process.cwd(), '/credentials', '/internal.txt'), {
    encoding: 'utf8',
  })
  .toString();

const identity = getIdentityFromPhrase(seedPhrase);

export { identity };
