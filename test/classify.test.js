// test/classify.test.js
import { test } from "node:test"
import assert from "node:assert/strict"
import { classify, classifyMany } from "../src/classify.js"

test("refund", () => assert.equal(classify("I want my money back"), "refund"))
test("shipping", () => assert.equal(classify("Where is my package?"), "shipping"))
test("other", () => assert.equal(classify("Hello"), "other"))
test("crushed mug", () => assert.equal(classify("The box showed up crushed and the mug inside is in pieces"), "shipping"))
test("damaged ticket requesting a refund", () => assert.equal(classify("The mug arrived broken and I want a refund"), "refund"))
test("late package requesting money back", () => assert.equal(classify("My package is late; I want my money back"), "refund"))

test("classifyMany empty input", () => assert.deepEqual(classifyMany([]), []))

test("classifyMany mixed input preserves order and input", () => {
  const tickets = [
    "Hello",
    "Where is my package?",
    "The mug arrived broken and I want a refund",
    "The box showed up crushed and the mug inside is in pieces"
  ]
  const originalTickets = [...tickets]

  assert.deepEqual(classifyMany(tickets), ["other", "shipping", "refund", "shipping"])
  assert.deepEqual(tickets, originalTickets)
})
