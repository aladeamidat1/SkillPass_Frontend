import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";

const keyPair = new Ed25519Keypair();

const publicKey = keyPair.getPublicKey().toSuiAddress();
const privateKey = keyPair.getSecretKey();

console.log({ publicKey, privateKey });
