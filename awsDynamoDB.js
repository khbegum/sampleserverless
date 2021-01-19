const AWS = require("aws-sdk");

exports.insertIntoDynamoDB = async (orderData) => {
    
    //Varaiable declarations
    var itemId, quantity, description;
    var items = [];
    var itemsData = orderData.items;
    console.log("itemsData "+JSON.stringify(itemsData))


    //Processing of item data
    itemsData.forEach(
        a => {
            var data = { itemId, quantity, description };
            data.itemId = a.itemId;
            data.quantity = a.quantity;
            data.description = a.descriptions;
            items.push(data);
        });

    console.log("Calling dynamodb "+orderData);
    const docClient = new AWS.DynamoDB.DocumentClient();
    var params = {
        Item: {
            "orderId": orderData.orderId,
            "address": orderData.address,
            "userId": orderData.userId,
            "phoneNumber": orderData.phoneNumber,
            "emailId": orderData.emailId,
            "promotionCode": orderData.promotionCode,
            "items": items,
            "timestamp": Date.now()
        },

        TableName: process.env.DYNAMODB_TABLE
    }

    var responseData = docClient.put(params).promise();
    return responseData;
}

exports.checkorderexist = async (orderData) => {
    
    console.log("check order exist ", orderData.orderId)
    var params = {
        TableName : process.env.DYNAMODB_TABLE,
        KeyConditionExpression : "orderId = :orderId_val",
        ExpressionAttributeValues: {
            ":orderId_val" : `${orderData.orderId}`
        }
    };
    
    const docClient = new AWS.DynamoDB.DocumentClient();
    
    var resp = await docClient.query(params).promise();
    return resp;
};