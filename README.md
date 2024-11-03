# Serverless DynamoDB API
This project is a Serverless API built with AWS Lambda, API Gateway, and DynamoDB. It provides functionality to create and retrieve customer records. The goal of this project is to demonstrate how to build and deploy a serverless application using modern cloud technologies.
The API includes the following features:
Create Customer: A POST endpoint to add new customer data to DynamoDB.
Get Customers: A GET endpoint to retrieve all customer records from DynamoDB.
This project is ideal for learning how to handle serverless infrastructure and integrate various AWS services seamlessly.
## Features

- **Create Customer**: Adds a new customer to the DynamoDB table.
- **Get Customers**: Retrieves all customers from the DynamoDB table.

## Prerequisites

- Node.js (v20.x or later)
- Serverless Framework
- AWS Account

## Setup
Install Dependencies:

bash
npm install
Configure AWS Credentials: Ensure your AWS CLI is configured with your credentials:

bash
aws configure
Deploy the Service:

bash
serverless deploy --aws-profile Ataba
Endpoints

Create Customer endpoint
Method: POST

URL: https://b1adwwc45b.execute-api.us-east-1.amazonaws.com/

Request Body:

json
{
  "name": "Emmanuel Ataba",
  "email": "atabazele@outlook.com"
}
Response: 201 Created

Get Customers
Method: GET

URL: https://b1adwwc45b.execute-api.us-east-1.amazonaws.com/

Response:

json
{
  "total": 1,
  "items": [
    {
      "name": "Emmanuel Ataba",
      "email": "atabazele@outlook.com"
    }
  ]
}
Handler Functions

createCustomer.js code
'use strict';
const AWS = require('aws-sdk');

module.exports.createCustomer = async (event) => {
  const body = JSON.parse(event.body);
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const putParams = {
    TableName: process.env.DYNAMODB_CUSTOMER_TABLE,
    Item: {
      primary_key: body.name,
      email: body.email
    }
  };
  await dynamoDb.put(putParams).promise();

  return {
    statusCode: 201,
    body: JSON.stringify({ message: "Customer created successfully" })
  };
};

getCustomer.js code
'use strict';
const AWS = require('aws-sdk');

module.exports.getCustomer = async (event) => {
  const scanParams = {
    TableName: process.env.DYNAMODB_CUSTOMER_TABLE
  };
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const result = await dynamoDb.scan(scanParams).promise();

  if (result.Count === 0) {
    return {
      statusCode: 404
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      total: result.Count,
      items: result.Items.map(customer => ({
        name: customer.primary_key,
        email: customer.email
      }))
    })
  };
};

License
This project is licensed under the MIT License.
