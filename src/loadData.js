'use strict';
const AWS = require('aws-sdk');

module.exports.handler = event => {

  const bucket = process.env.DEPLOY_DATA_BUCKET;
  const key = process.env.DEPLOY_DATA_FILE;
  const table = process.env.TABLE_OFFENSE_CODES;

  if (bucket && key && table) {
      console.log(`Getting ${key} from s3://${bucket}`);
      console.log(`Using table ${table}`);

      const S3 = new AWS.S3()
      const DYNAMODB_CLIENT = new AWS.DynamoDB.DocumentClient();
      const csv = require('csvtojson');
      const stream = S3.getObject({Bucket: bucket, Key: key}).createReadStream();

      csv().fromStream(stream)
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

          DYNAMODB_CLIENT.put(item, function(err, data) {
            if (err) {
              console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            }
          });
       });
  } else {
    return {
      statusCode: 500,
      body: JSON.stringify({message: "Unable to find environment variables."})
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({message: "Load table data lambda executed successfully."})
  };

};
