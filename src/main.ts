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

await isReady;

const num1 = UInt32.from(40);
const num2 = UInt64.from(40);

const num1EqualsNum2: Bool = num1.toUInt64().equals(num2);
console.log(`num1 === num2 ${num1EqualsNum2.toString()}`);
console.log(`Fields in num1:`, num1.toFields().length);

const signedNum1 = Int64.from(-3);
const signedNum2 = Int64.from(45);

const signedNumSum = signedNum1.add(signedNum2);
console.log(`Fields in signedNumSum:`, signedNumSum.toFields().length);

const char1 = Character.fromString('s');

console.log(`Fields in char1: ${char1.toFields().length}`);
