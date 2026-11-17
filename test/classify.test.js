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
    "shipping",
  ))
