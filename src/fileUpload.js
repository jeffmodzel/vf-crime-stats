'use strict';
const AWS = require('aws-sdk');

//
// This Lambda function waits for .csv files to be uploaded to an S3 bucket
// and then puts the .csv data in a DynamoDB table
//

module.exports.handler = event => {

  console.log("in fileUpload.js");
  console.log(JSON.stringify(event));

  if (event && event.Records && event.Records.length > 0) {
    processEvent(event);
  } else {
    console.error("There were no event records to process.");
  }

  // const bucket = process.env.DEPLOY_DATA_BUCKET;
  // const key = process.env.DEPLOY_DATA_FILE;
  // const table = process.env.TABLE_OFFENSE_CODES;
  //
  // if (bucket && key && table) {
  //     console.log(`Getting ${key} from s3://${bucket}`);
  //     console.log(`Using table ${table}`);
  //
  //     const S3 = new AWS.S3()
  //     const DYNAMODB_CLIENT = new AWS.DynamoDB.DocumentClient();
  //     const csv = require('csvtojson');
  //     const stream = S3.getObject({Bucket: bucket, Key: key}).createReadStream();
  //
  //     csv().fromStream(stream)
  //       .on('data', async (row) => {
  //         let jsonContent = JSON.parse(row);
  //         let item = {
  //             TableName: table,
  //             Item:{
  //               "OFFENSE_CODE": jsonContent["OFFENSE_CODE"],
  //               "OFFENSE_TYPE_ID": jsonContent["OFFENSE_TYPE_ID"],
  //               "OFFENSE_TYPE_NAME": jsonContent["OFFENSE_TYPE_NAME"],
  //               "OFFENSE_CATEGORY_ID": jsonContent["OFFENSE_CATEGORY_ID"],
  //               "OFFENSE_CATEGORY_NAME": jsonContent["OFFENSE_CATEGORY_NAME"],
  //               "LAST_UPDATE": new Date().toISOString()
  //             }
  //         };
  //
  //         DYNAMODB_CLIENT.put(item, function(err, data) {
  //           if (err) {
  //             console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
  //           }
  //         });
  //      });
  // } else {
  //   return {
  //     statusCode: 500,
  //     body: JSON.stringify({message: "Unable to find environment variables."})
  //   };
  // }

};

function processEvent(event) {
  console.log('Processing event');
  console.log(JSON.stringify(event));

  const S3 = new AWS.S3()
  const DYNAMODB_CLIENT = new AWS.DynamoDB.DocumentClient();
  const CSV = require('csvtojson');
  const table = process.env.TABLE_INCIDENTS;

  event.Records.forEach( (item) => {
      console.log("in forEach");
      console.log(item);
      let bucket = item.s3.bucket.name;
      let key = item.s3.object.key;

      // Only process .csv files
      if (key.match(/\.csv$/) === null) {
        console.log(`Key ${key} is not a .csv match.`);
        return;
      }

      console.log(`Getting ${key} from s3://${bucket}`)
      const stream = S3.getObject({Bucket: bucket, Key: key}).createReadStream();
      CSV().fromStream(stream)
        .on('data', async (row) => {
          let jsonContent = JSON.parse(row);
          console.log(JSON.stringify(jsonContent));
          let item = {
            TableName: table,
              Item:{
                "INCIDENT_ID": jsonContent["INCIDENT_ID"],
                "OFFENSE_ID": jsonContent["OFFENSE_ID"],
                "OFFENSE_CODE": jsonContent["OFFENSE_CODE"],
                "LAST_UPDATE": new Date().toISOString()
              }
          };
          console.log(item);

          DYNAMODB_CLIENT.put(item, function(err, data) {
            if (err) {
              console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            }
          });

        });


  });

}
