const AWS = require('aws-sdk');
const DYNAMODB = new AWS.DynamoDB();
const DYNAMODB_CLIENT = new AWS.DynamoDB.DocumentClient();

//
// Helper lib of DynamoDB functions
//
const putItem = (item) => {

  DYNAMODB_CLIENT.put(item, function(err, data) {
    if (err) {
      console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    }
  });

};

const getIncident = async (id) => {

  return await new Promise((resolve, reject) => {

    const params = {
      Key: {
        "INCIDENT_ID": {
          S: id
        }
      },
      TableName: process.env.TABLE_INCIDENTS
    };

    console.log(JSON.stringify(params));

    DYNAMODB.getItem(params, (error, data) => {
      if (error) {
        console.log("Error in getIncident()");
        console.error(JSON.stringify(error));
        resolve({});
      } else {
        resolve(data);
      }
    });

  });

};

const getOffense = async (code) => {

  return await new Promise((resolve, reject) => {

    const params = {
      Key: {
        "OFFENSE_CODE": {
          S: code
        }
      },
      TableName: process.env.TABLE_OFFENSE_CODES
    };

    console.log(JSON.stringify(params));

    DYNAMODB.getItem(params, (error, data) => {
      if (error) {
        console.log("Error in getOffense()");
        console.error(JSON.stringify(error));
        resolve({});
      } else {
        resolve(data);
      }
    });

  });

};

const getFirstNIncidents = async (n) => {
  return await new Promise((resolve, reject) => {

    const params = {
      ProjectionExpression: 'INCIDENT_ID, REPORTED_DATE, INCIDENT_ADDRESS',
      TableName: process.env.TABLE_INCIDENTS,
      Limit: n
    };

    console.log(JSON.stringify(params));

    DYNAMODB.scan(params, (error, data) => {
      if (error) {
        console.log("Error in getFirstNIncidents()");
        console.error(JSON.stringify(error));
        resolve({});
      } else {
        resolve(data);
      }
    });

  });
}

module.exports.getIncident = getIncident;
module.exports.getOffense = getOffense;
module.exports.getFirstNIncidents = getFirstNIncidents;
module.exports.putItem = putItem;
