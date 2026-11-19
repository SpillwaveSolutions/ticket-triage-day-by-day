// test/classify.test.js
import { test } from "node:test"
import assert from "node:assert/strict"
import { classify } from "../src/classify.js"

test("refund", () => assert.equal(classify("I want my money back"), "refund"))
test("shipping", () => assert.equal(classify("Where is my package?"), "shipping"))
test("other", () => assert.equal(classify("Hello"), "other"))
test("shipping crushed mug", () =>
  assert.equal(
    classify("The box showed up crushed and the mug inside is in pieces"),
    "damaged",
  ))
test("damaged with refund request is refund", () =>
  assert.equal(
    classify("The mug arrived crushed and I want my money back"),
    "refund",
  ))
test("shipping parcel", () =>
  assert.equal(classify("My parcel never came"), "shipping"))
test("dented", () =>
  assert.equal(classify("The can arrived dented"), "damaged"))
test("chipped", () =>
  assert.equal(classify("The plate arrived chipped"), "damaged"))
test("cracked", () =>
  assert.equal(classify("The vase arrived cracked"), "damaged"))
test("shattered", () =>
  assert.equal(classify("The glass arrived shattered"), "damaged"))
test("smashed", () =>
  assert.equal(classify("The box arrived smashed"), "damaged"))
test("squashed", () =>
  assert.equal(classify("The box arrived squashed"), "damaged"))
test("bent", () =>
  assert.equal(classify("The frame arrived bent"), "damaged"))
test("ripped", () =>
  assert.equal(classify("The bag arrived ripped"), "damaged"))
