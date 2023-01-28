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

class Point extends Struct({ x: Field, y: Field }) {
  static add(a: Point, b: Point) {
    return { x: a.x.add(b.x), y: a.y.add(b.y) };
  }
}

const point1 = { x: Field(10), y: Field(4) };
const point2 = { x: Field(1), y: Field(2) };

const pointSum = Point.add(point1, point2);

c(`pointSum Fields: ${Point.toFields(pointSum)}`);

class Points8 extends Struct({
  points: [Point, Point, Point, Point, Point, Point, Point, Point],
}) {}

const points = new Array(8)
  .fill(null)
  .map((_, i) => ({ x: Field(i), y: Field(i * 10) }));

const points8: Points8 = { points };

c(`points8 JSON: ${JSON.stringify(points8)}`);

const input1 = Int64.from(10);
const input2 = Int64.from(-15);

const inputSum = input1.add(input2);

const inputSumAbs = Circuit.if(
  inputSum.isPositive(),
  inputSum,
  inputSum.mul(Int64.minusOne)
);

c(`inputSum: ${inputSum.toString()}`);
c(`inputSumAbs: ${inputSumAbs.toString()}`);

const input3 = Int64.from(22);

const input1Largest = input1
  .sub(input2)
  .isPositive()
  .and(input1.sub(input3).isPositive());
const input2Largest = input2
  .sub(input1)
  .isPositive()
  .and(input2.sub(input3).isPositive());
const input3Largest = input3
  .sub(input2)
  .isPositive()
  .and(input3.sub(input1).isPositive());

const largest = Circuit.switch(
  [input1Largest, input2Largest, input3Largest],
  Int64,
  [input1, input2, input3]
);

c(`Largest: ${largest.toString()}`);

await shutdown();
