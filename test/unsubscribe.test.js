import { test } from "node:test"
import assert from "node:assert/strict"
import { classify } from "../src/classify.js"

test("unsubscribe", () => {
  assert.equal(classify("Please unsubscribe me"), "cancel")
})

test("unsubscribe is case-insensitive", () => {
  assert.equal(classify("UNSUBSCRIBE"), "cancel")
})

test("unsubscribe loses to older rules", () => {
  assert.equal(classify("Unsubscribe me and refund my last order"), "refund")
})
