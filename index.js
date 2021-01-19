const AWS = require("aws-sdk");
const postHandler = require("./service")

exports.handler = async (event, context, callback) => {
    try {
        console.log("stringify " + JSON.stringify(event))
        if (event.body) {
            var body = JSON.parse(event.body)

            console.log("Event body " + JSON.stringify(body))
            var insertResponse = await postHandler.postHandler(body);
            var responseBody = {
                "orderId": insertResponse,
                "orderStatus": "order successfull"
            }
            var response = {
                statusCode: 200,
                body: JSON.stringify(responseBody)
            };
            console.log("Successfull response", JSON.stringify(response));
            //return response;
            callback(null, response)   
        }
    } catch (e) {
        console.log("Error in postHandler " + e)
        var responseBodyError = {
            "orderStatus": "Order Failed"
        };
        var responseData = {
            "statusCode": 500,
            "body": JSON.stringify(responseBodyError)
        };
        if (e == "Error: Order Already Exist") {
            var duplicateOrderBody = {
                "orderStatus": "Order Already Exist"
            };
            var duplicateOrder = {
                "statusCode": 500,
                "body": JSON.stringify(duplicateOrderBody)
            };

            callback(null, duplicateOrder)
        }
        callback(null, responseData)
    }

}

