import {
  Mina,
  isReady,
  shutdown,
  UInt32,
  UInt64,
  Int64,
  Character,
  CircuitString,
  PrivateKey,
  Signature,
  Poseidon,
  Field,
  Circuit,
  MerkleWitness,
  MerkleTree,
  AccountUpdate,
  Struct,
  MerkleMap,
  Bool,
} from 'snarkyjs';

const c = console.log;

await isReady;

const num1 = UInt32.from(40);
const num2 = UInt64.from(40);

const num1EqualsNum2: Bool = num1.toUInt64().equals(num2);
c(`num1 === num2 ${num1EqualsNum2.toString()}`);
c(`Fields in num1:`, num1.toFields().length);

const signedNum1 = Int64.from(-3);
const signedNum2 = Int64.from(45);

const signedNumSum = signedNum1.add(signedNum2);
c(`Fields in signedNumSum:`, signedNumSum.toFields().length);

const char1 = Character.fromString('s');
const char2 = Character.fromString('g');

c(`Fields in char1: ${char1.toFields().length}`);

const str1 = CircuitString.fromString('abc...xyz');
c(`str1: ${str1}`);
c(`Fields in str1: ${str1.toFields().length}`); //128

const zkAppPrivateKey = PrivateKey.random();
const zkAppPublicKey = zkAppPrivateKey.toPublicKey();

const data1 = char2.toFields().concat(signedNumSum.toFields());
const data2 = char2.toFields().concat(str1.toFields());

const signature = Signature.create(zkAppPrivateKey, data2);

const verifiedData1 = signature.verify(zkAppPublicKey, data1).toString();
const verifiedData2 = signature.verify(zkAppPublicKey, data2).toString();

c(`Private key: ${zkAppPrivateKey.toBase58()}`);
c(`Public key: ${zkAppPublicKey.toBase58()}`);

c(`Fields in private key: ${zkAppPrivateKey.toFields().length}`);
c(`Fields in public key: ${zkAppPublicKey.toFields().length}`);

c(`Signature verified for data 1: ${verifiedData1}`);
c(`Signature verified for data 2: ${verifiedData2}`);

c(`Fields in signature: ${signature.toFields().length}`);

await shutdown();
