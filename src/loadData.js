'use strict';
const AWS = require('aws-sdk');
const S3 = new AWS.S3()
const CSV = require('csvtojson');
const DynamoHelper = require('./lib/dynamoHelper');

//
// This is a standalone Lambda (not connected to any event) intended to be
// called directly. It loads a .csv from S3 into a Dynamo table.
//

module.exports.handler = event => {

  const bucket = process.env.DEPLOY_DATA_BUCKET;
  const key = process.env.DEPLOY_DATA_FILE;
  const table = process.env.TABLE_OFFENSE_CODES;

  if (bucket && key && table) {
      console.log(`Getting ${key} from s3://${bucket}`);
      console.log(`Using table ${table}`);

      const stream = S3.getObject({Bucket: bucket, Key: key}).createReadStream();

      CSV().fromStream(stream)
        .on('data', async (row) => {
          let jsonContent = JSON.parse(row);
          let item = {
              TableName: table,
              Item:{
                "OFFENSE_CODE": jsonContent["OFFENSE_CODE"],
                "OFFENSE_TYPE_ID": jsonContent["OFFENSE_TYPE_ID"],
                "OFFENSE_TYPE_NAME": jsonContent["OFFENSE_TYPE_NAME"],
                "OFFENSE_CATEGORY_ID": jsonContent["OFFENSE_CATEGORY_ID"],
                "OFFENSE_CATEGORY_NAME": jsonContent["OFFENSE_CATEGORY_NAME"],
                "LAST_UPDATE": new Date().toISOString()
              }
          };

          DynamoHelper.putItem(item);

       });
  } else {
    console.error("Unable to find environment variables.");
  }

};
