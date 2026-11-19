// test/classify.test.js
import { test } from "node:test"
import assert from "node:assert/strict"
import { classify } from "../src/classify.js"

test("refund", () => assert.equal(classify("I want my money back"), "refund"))
test("shipping", () => assert.equal(classify("Where is my package?"), "shipping"))
test("other", () => assert.equal(classify("Hello"), "other"))
test("damage is shipping", () => assert.equal(classify("The box showed up crushed and the mug inside is in pieces"), "shipping"))
test("damage with money back is refund", () => assert.equal(classify("The mug arrived broken and I want my money back"), "refund"))
test("smashed is shipping", () => assert.equal(classify("The lamp arrived smashed"), "shipping"))
test("dented is shipping", () => assert.equal(classify("The kettle arrived dented"), "shipping"))
