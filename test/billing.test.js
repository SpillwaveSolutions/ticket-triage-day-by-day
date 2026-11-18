import { test } from "node:test"
import assert from "node:assert/strict"
import { classify } from "../src/classify.js"

test("billing", () => {
  assert.equal(classify("I was charged twice"), "billing")
})

test("invoice", () => {
  assert.equal(classify("My invoice shows the wrong amount"), "billing")
})

test("billing loses to older rules", () => {
  assert.equal(classify("I was charged for a crushed box"), "damaged")
})
