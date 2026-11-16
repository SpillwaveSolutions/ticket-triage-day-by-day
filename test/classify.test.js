import { test } from "node:test"
import assert from "node:assert/strict"
import { classify } from "../src/classify.js"

test("refund", () => assert.equal(classify("I want my money back"), "refund"))
test("shipping", () => assert.equal(classify("Where is my package?"), "shipping"))
test("other", () => assert.equal(classify("Hello"), "other"))
test("damaged", () => assert.equal(classify("My package arrived crushed"), "damaged"))
test("water damage", () => assert.equal(classify("The box has water damage"), "damaged"))
test("cancel", () => assert.equal(classify("Please cancel my order"), "cancel"))
test("cancel loses to older rules", () => assert.equal(classify("Cancel my order and refund me"), "refund"))
