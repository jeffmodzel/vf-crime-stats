'use strict';
const AWS = require('aws-sdk');
const CSV = require('csvtojson');

module.exports.handler = async event => {
  console.log('in loadData.js handler...')

  let bucket = process.env.DEPLOY_DATA_BUCKET
  let key = process.env.DEPLOY_DATA_FILE

  const S3 = new AWS.S3()

  if (bucket && key) {
      console.log(`Getting ${key} from s3://${bucket}`)

      // let data = await S3.getObject({
      //   Bucket: bucket,
      //   Key: key,
      // }).promise();
      //
      // console.log("Raw CSV data:");
      // console.log(data.Body.toString('utf-8'));

      const stream = S3.getObject({Bucket: bucket, Key: key}).createReadStream()
      csv().fromStream(s3Stream)
           .on('data', (row) => {
             let jsonContent = JSON.parse(row);
             console.log(JSON.stringify(jsonContent));
           });

  } else {
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: 'Unable to find environment variables'
        },
        null,
        2
      ),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
