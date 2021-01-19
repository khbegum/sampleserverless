const AWS = require("aws-sdk");

exports.getS3data = async (orderData) => {

    var S3 = new AWS.S3();
    var paramsData = {
        Bucket: "imagebucket-testsusheel",
        Key: "promotion.json"
    };
    console.log("calling aws s3 service ", orderData.items);
    console.log("Order Data and items inside s3-dynamo db"+JSON.stringify(orderData));
    var responseS3 = await S3.getObject(paramsData).promise();
    return responseS3;
   
}