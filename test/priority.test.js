import { test } from "node:test"
import assert from "node:assert/strict"
import { priority } from "../src/priority.js"
import { classify } from "../src/classify.js"

test("urgent", () => assert.equal(priority("This is urgent"), "high"))
test("asap", () => assert.equal(priority("Please reply asap"), "high"))
test("immediately", () => assert.equal(priority("Fix this immediately"), "high"))
test('mixed-case "Immediately"', () => assert.equal(priority("Cancel my order Immediately."), "high"))
test("normal", () => assert.equal(priority("Where is my package?"), "normal"))
test("uppercase", () => assert.equal(priority("URGENT: box crushed"), "high"))
test("mixed case", () => assert.equal(priority("Need it ASAP"), "high"))
test("urgently (substring)", () => assert.equal(priority("I urgently need help"), "high"))
test("asap with punctuation", () => assert.equal(priority("Please answer ASAP!!"), "high"))
test("empty string", () => assert.equal(priority(""), "normal"))
test("independent of category", () => {
  assert.equal(classify("Refund me immediately"), "refund")
  assert.equal(priority("Refund me immediately"), "high")
})
