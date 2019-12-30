const AWS = require('aws-sdk');
const DYNAMODB = new AWS.DynamoDB();

//
// Helper lib of DynamoDB functions
//

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

module.exports.getIncident = getIncident;
