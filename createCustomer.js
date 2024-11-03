'use strict';
const AWS = require('aws-sdk');

module.exports.createCustomer = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    const putParams = {
      TableName: process.env.DYNAMODB_CUSTOMER_TABLE,
      Item: {
        primary_key: body.name, // Ensure this matches the primary key expected by your table
        email: body.email
      }
    };
    await dynamoDb.put(putParams).promise();

    return {
      statusCode: 201,
      body: JSON.stringify({ message: "Customer created successfully" })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};  
