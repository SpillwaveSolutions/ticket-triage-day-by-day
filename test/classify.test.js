// test/classify.test.js
import { test } from "node:test"
import assert from "node:assert/strict"
import { classify } from "../src/classify.js"

test("refund", () => assert.equal(classify("I want my money back"), "refund"))
test("shipping", () => assert.equal(classify("Where is my package?"), "shipping"))
test("other", () => assert.equal(classify("Hello"), "other"))
test("damage goes to shipping", () =>
  assert.equal(classify("The box showed up crushed and the mug inside is in pieces"), "shipping"))
test("damage with money back goes to refund", () =>
  assert.equal(classify("The box showed up crushed and I want my money back"), "refund"))
test("delivery delay goes to shipping", () =>
  assert.equal(classify("Where is my delivery? It has been two weeks"), "shipping"))
test("tracking issue goes to shipping", () =>
  assert.equal(classify("Where is my parcel? The tracking page has not moved"), "shipping"))
test("dented lid", () => assert.equal(classify("The lid arrived dented"), "shipping"))
test("dented lid, money back", () => assert.equal(classify("The lid arrived dented and I want my money back"), "refund"))
test("shattered mug", () => assert.equal(classify("The mug arrived shattered"), "shipping"))
