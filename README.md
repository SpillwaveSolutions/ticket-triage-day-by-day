# Ticket Triage

Ticket Triage classifies support tickets as `refund`, `shipping`, or `other`.
Refund takes priority over shipping, including when a ticket describes damage.

## Examples

"My package is late; I want my money back" → `refund`.

## Batch classification

`classifyMany(tickets)` returns an array of categories for the ticket strings.
It preserves input order and leaves the input array unchanged. Empty input (`[]`)
returns `[]`.

Run the tests from the project directory:

```sh
npm test
```

| Ticket | Category |
| --- | --- |
| Hello | `other` |
| The box showed up crushed and the mug inside is in pieces | `shipping` |
| The mug arrived broken and I want a refund | `refund` |
