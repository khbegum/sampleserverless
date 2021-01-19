const getS3Data = require("./awsS3");
const AWS = require("aws-sdk");
const insert = require("./awsDynamoDB");
var S3 = new AWS.S3();

exports.postHandler = async (orderData) => {

    console.log("Order Data and items IN SERVICE.JS " + orderData);

    //Call to phone details validator function to validate phone details
    if ((phoneDetailsValidator(orderData.phoneNumber)) == false) {
        throw new Error("Invalid Phone Details supplied");
    }

    //Call to email details validator function to validate email details
    if ((emailValidator(orderData.emailId)) == false) {
        throw new Error("Invalid Email Details supplied");
    }

    var Data;
    await insert.checkorderexist(orderData).then(data => {
        console.log("Data " + data.Count)
        Data = data;
    })
    console.log("outside Data " + Data.Count, JSON.stringify(Data))
    if (Data.Count >= 1) {
        throw new Error("Order Already Exist");
    }

    try {
        await getS3Data.getS3data(orderData).then(data => {
            console.log("S3 data " + JSON.stringify(data))
            var jsonData = JSON.parse(data.Body)
            try {
                jsonData[orderData.promotionCode].discount;
            } catch (e) {
                throw new Error("Error in parsing promotion data from s3 and the error is: " + e);
            }
        });

        try {
            orderData.orderId = orderData.userId + Date.now()
            var dynamoDBResponse = await insert.insertIntoDynamoDB(orderData);
            console.log("Dynamo DB response " + JSON.stringify(dynamoDBResponse));
            return orderData.orderId;
        } catch (e) {
            console.log("error in storing dynamodb " + e);
            throw new Error("Error in inserting data in dynamodb and the error is: " + e);
        }
    } catch (e) {
        throw new Error("Error in getting s3 data from service: " + e);
    }
};

//function phone details validator
function phoneDetailsValidator(inputtxt) {
    //regex to metch phone number
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    console.log("Phone valid " + phoneno.test(inputtxt));
    if (phoneno.test(inputtxt)) {
        return true;
    } else {
        return false;
    }
}

//function email details validator
function emailValidator(inputtxt) {
    //regex to match email
    var email = /(.+)@(.+){2,}\.(.+){2,}/;
    if (email.test(inputtxt)) {
        return true;
    } else {
        return false;
    }
}