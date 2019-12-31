'use strict';
const AWS = require('aws-sdk');
const S3 = new AWS.S3()
const CSV = require('csvtojson');
const DynamoHelper = require('./lib/dynamoHelper');

//
// This Lambda function waits for .csv files to be uploaded to an S3 bucket
// and then puts the .csv data in a DynamoDB table
//

module.exports.handler = event => {

  if (event && event.Records && event.Records.length > 0) {
    processEvent(event);
  } else {
    console.error("There were no event records to process.");
  }

};

const processEvent = (event) => {
  console.log('processEvent()');
  console.log(JSON.stringify(event));

  event.Records.forEach( (item) => {
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
          let item = {
            TableName: process.env.TABLE_INCIDENTS,
              Item:{
                "INCIDENT_ID": jsonContent["INCIDENT_ID"],
                "OFFENSE_ID": jsonContent["OFFENSE_ID"],
                "OFFENSE_CODE": jsonContent["OFFENSE_CODE"],
                "OFFENSE_TYPE_ID": jsonContent["OFFENSE_TYPE_ID"],
                "FIRST_OCCURRENCE_DATE": jsonContent["FIRST_OCCURRENCE_DATE"] || "missing",
                "REPORTED_DATE": jsonContent["REPORTED_DATE"] || "missing",
                "INCIDENT_ADDRESS": jsonContent["INCIDENT_ADDRESS"] || "missing",
                "GEO_LON": jsonContent["GEO_LON"] || "missing",
                "GEO_LAT": jsonContent["GEO_LAT"] || "missing",
                "DISTRICT_ID": jsonContent["DISTRICT_ID"] || "missing",
                "PRECINCT_ID": jsonContent["PRECINCT_ID"] || "missing",
                "NEIGHBORHOOD_ID": jsonContent["NEIGHBORHOOD_ID"] || "missing",
                "LAST_UPDATE": new Date().toISOString()
              }
          };

          DynamoHelper.putItem(item);

        });

  });
};
