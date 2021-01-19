var event = {};

event.orderData = {
    "body": `{\r\n    \"orderId\": 1234,\r\n    \"address\": \"Chandigarh\",\r\n    \"userId\":\"658\",\r\n    
    \"phoneNumber\": 8123456789,\r\n    \"emailId\":\"test@gmail.com\",\r\n    \"promotionCode\":\"1111\",\r\n    
    \"items\":[\r\n        {\r\n            \"itemId\":\"104\",\r\n            \"quantity\":5,\r\n            
    \"descriptions\":\"Origamy\"\r\n        },\r\n        {\r\n            \"itemId\":\"195\",\r\n            
    \"quantity\":6,\r\n            \"descriptions\":\"Mc Vegiee\"\r\n        },\r\n        {\r\n            
        \"itemId\":\"256\",\r\n            \"quantity\":6,\r\n            \"descriptions\":\"Fanta fruit\"\r\n        }
        \r\n    ]\r\n}`,
}

event.invalidPhoneData = {
    "body": `{\r\n    \"orderId\": 1234,\r\n    \"address\": \"Chandigarh\",\r\n    \"userId\":\"658\",\r\n    
    \"phoneNumber\": 812345678912345,\r\n    \"emailId\":\"test@gmail.com\",\r\n    \"promotionCode\":\"1111\",\r\n    
    \"items\":[\r\n        {\r\n            \"itemId\":\"104\",\r\n            \"quantity\":5,\r\n            
    \"descriptions\":\"Origamy\"\r\n        },\r\n        {\r\n            \"itemId\":\"195\",\r\n            
    \"quantity\":6,\r\n            \"descriptions\":\"Mc Vegiee\"\r\n        },\r\n        {\r\n            
    \"itemId\":\"256\",\r\n            \"quantity\":6,\r\n            \"descriptions\":\"Fanta fruit\"\r\n        }
    \r\n    ]\r\n}`,
}

event.invalidEmailData = {
    "body": `{\r\n    \"orderId\": 1234,\r\n    \"address\": \"Chandigarh\",\r\n    \"userId\":\"658\",\r\n    
    \"phoneNumber\": 8123456789,\r\n    \"emailId\":\"somethinginvalidemail\",\r\n    \"promotionCode\":\"1111\",\r\n    
    \"items\":[\r\n        {\r\n            \"itemId\":\"104\",\r\n            \"quantity\":5,\r\n            
    \"descriptions\":\"Origamy\"\r\n        },\r\n        {\r\n            \"itemId\":\"195\",\r\n            
    \"quantity\":6,\r\n            \"descriptions\":\"Mc Vegiee\"\r\n        },\r\n        {\r\n            
        \"itemId\":\"256\",\r\n            \"quantity\":6,\r\n            \"descriptions\":\"Fanta fruit\"\r\n        }
        \r\n    ]\r\n}`,
}


event.invalidPromoData = {
    "body": `{\r\n    \"orderId\": 1234,\r\n    \"address\": \"Chandigarh\",\r\n    \"userId\":\"658\",\r\n    
    \"phoneNumber\": 8123456789,\r\n    \"emailId\":\"test@gmail.com\",\r\n    \"promotionCode\":\"1000000\",\r\n    
    \"items\":[\r\n        {\r\n            \"itemId\":\"104\",\r\n            \"quantity\":5,\r\n            
    \"descriptions\":\"Origamy\"\r\n        },\r\n        {\r\n            \"itemId\":\"195\",\r\n            
    \"quantity\":6,\r\n            \"descriptions\":\"Mc Vegiee\"\r\n        },\r\n        {\r\n            
        \"itemId\":\"256\",\r\n            \"quantity\":6,\r\n            \"descriptions\":\"Fanta fruit\"\r\n        }
        \r\n    ]\r\n}`,
}

event.dynamoDBData = {
    "Item": [
        {
            "phoneNumber": 8123456789,
            "orderId": "1234",
            "userId": "658",
            "timestamp": 1594027344728,
            "emailId": "dayasagara@gmail.com",
            "promotionCode": "1111",
            "address": "Chandigarh",
            "items": [
                {
                    "itemId": "104",
                    "description": "Origamy",
                    "quantity": 5
                },
                {
                    "itemId": "195",
                    "description": "Mc Vegiee",
                    "quantity": 6
                },
                {
                    "itemId": "256",
                    "description": "Fanta fruit",
                    "quantity": 6
                }
            ]
        }
    ],
    "Count": 1,
    "ScannedCount": 1
}

var invalidData = {
    "orderId": 1,
    "phoneNumber": 9876543210,
    "emailId": "saraswathi631@gmail.com",
    "promotionCode": "1111",
    "items": [
        {
            "itemId": "123",
            "quantity": 4,
            "descriptions": "some description"
        },
        {
            "itemId": "128",
            "quantity": 8,
            "descriptions": "some description4445"
        }
    ]
}

event.emptyData = {}

var s3Data = `{
    "1111": {
            "description" : "test description-1",
            "discount": 4
    },
    "1112": {
            "description" : "test description-2",
            "discount": 5
    }
}   `

module.exports = { event, s3Data, invalidData }