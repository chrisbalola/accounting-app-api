export default {
  "config": {
    "name": "accounting-app-api",
    "version": {
      "name": "1.0.0",
      "code": 1
    },
    "author": {
      "email": "christianmugisho17@gmail.com",
      "name": "Christian Balola",
      "website": "https://chrisbalola.com"
    },
  },
  "entities": {
    "users": {
      "id": "number", // Auto-incremented and unique
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "password": "string",
      "lastSeenAt": "string", // Last time the user did a request
      "updatedAt": "string", // latest update of the record
      "createdAt": "string", // date of creation of the record
    },
    "transactions": {
      "id": "string", // UUID string. Read about UUIDs at: https://en.wikipedia.org/wiki/Universally_unique_identifier
      "type": "enum", // [input, output]
      "category": "enum", // [revenue, expense, grant, loss, loan, loanPayment, debt, debtPayment]
      "amount": "number", // Assuming there's only one currency for now. Lets use USD as an example.
      "reason": "string", // The reason for the transaction to be made. NULLABLE.
      "date": "datetime", // Date and time when the transaction happened => editable. Defaults to createdAt.
      "user": "User", // Who owns the transaction
      "updatedAt": "datetime", // latest update of the record
      "createdAt": "datetime", // date of creation of the record
    }
  }
};