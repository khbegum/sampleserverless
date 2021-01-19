const awsMock = require("aws-sdk-mock")
const chai = require('chai');
const handler = require("../index");
const AWS = require("aws-sdk");
const should = chai.should();

const testData = require("./testData")

describe("Positive Tests", () => {

    AWS.config.update({ region: 'us-east-2' });
    it("Should Insert Data to database", () => {
        awsMock.setSDKInstance(AWS);
        awsMock.mock("DynamoDB.DocumentClient", "query", (_, callback) => {
            callback(null, {});
        });
        awsMock.mock("S3", "getObject", function (_, callback) {
            callback(testData.s3Data)
        });

        awsMock.mock("DynamoDB.DocumentClient", "put", function (_, callback) {
            callback(null, {});
        });

        awsMock.restore('S3', 'getObject')
        handler.handler(testData.event.orderData, {}, {}).then(result => {
            console.log("result ", result);
            should.exist(result.statusCode)
        }).catch(err => {
                console.log(err)
        });
        
    })
})

describe("Negative Tests", () => {
    describe("Validation Scenarios ", () => {
        it("Should throw Invalid Phone Number Details ", () => {
            handler.handler(testData.event.invalidPhoneData, {}).then(result => {
                console.log("response ", result)
                should.exist(result.statusCode);
                response.statusCode.should.equal(500);
            }).catch(err => {
                console.log(err)
            });
        })
    })

    describe("Validation Scenarios ", () => {
        it("Should throw Invalid Email Details ", () => {
            handler.handler(testData.event.invalidEmailData, {}).then(response => {
                console.log("response ", response)
                should.exist(response.statusCode);
                response.statusCode.should.equal(500);
            }).catch(err => {
                console.log(err)
            });
        })
    })

    describe("Order Duplication Scenario ", () => {
        it("Should throw Invalid Order Already Exist Data ", () => {
            awsMock.setSDKInstance(AWS);
            awsMock.mock("DynamoDB.DocumentClient", "query", (_, callback) => {
                callback(null, testData.event.dynamoDBData);
            });
            
            handler.handler(testData.event.orderData, {}).then(response => {
                console.log("response ", response)
                should.exist(response.statusCode);
                response.statusCode.should.equal(500);
            }).catch(err => {
                console.log(err)
            });
        })
    })

    describe("S3 Promo code error ", () => {
        it("Should throw Order Failed ", () => {
            awsMock.setSDKInstance(AWS);
            awsMock.mock("DynamoDB.DocumentClient", "query", (_, callback) => {
                callback(null, {});
            });
            awsMock.mock("S3", "getObject", function (_, callback) {
                callback(null, testData.s3Data)
            });
            handler.handler(testData.event.invalidPromoData, {}).then(response => {
                console.log("response ", response)
                should.exist(response.statusCode);
                response.statusCode.should.equal(500);
            }).catch(err => {
                console.log(err)
            });
        })
    })

    describe("Dynamo DB Insertion Error ", () => {
        it("Should throw Order Failed For Storing Data", () => {
            awsMock.setSDKInstance(AWS);
            awsMock.mock("DynamoDB.DocumentClient", "query", (_, callback) => {
                callback(null, {});
            });
            awsMock.mock("S3", "getObject", function (_, callback) {
                callback(null, testData.s3Data)
            });
    
            awsMock.mock("DynamoDB.DocumentClient", "put", function (_, callback) {
                callback(null, {});
            });
    
            handler.handler(testData.event.emptyData, {}).then(response => {
                console.log("response ", response)
                should.exist(response.statusCode);
                response.statusCode.should.equal(500);
            }).catch(err => {
                console.log(err)
            });
        })
    })

    describe("S3 Get Error ", () => {
        it("Should throw Order Failed For getting Data From S3", () => {
            awsMock.setSDKInstance(AWS);
            awsMock.mock("DynamoDB.DocumentClient", "query", (_, callback) => {
                callback(null, {});
            });
            awsMock.mock("S3", "getObject", function (_, callback) {
                callback(new Error("Error in getting s3 data from service: SyntaxError: Unexpected token u in JSON at position 0"))
            });
    
            // awsMock.mock("DynamoDB.DocumentClient", "put", function (_, callback) {
            //     callback(null, {});
            // });
    
            handler.handler(testData.event.orderData, {}).then(response => {
                console.log("response ", response)
                should.exist(response.statusCode);
                response.statusCode.should.equal(500);
            }).catch(err => {
                console.log(err)
            });
        })
    })
})


