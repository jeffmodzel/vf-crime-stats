'use strict';
const AWS = require('aws-sdk');
const DYNAMODB = new AWS.DynamoDB();
const HtmlHelper = require('./lib/htmlHelpers');

module.exports.handler = async event => {

  console.log(JSON.stringify(event));
  console.log(JSON.stringify(event.pathParameters));

  let html = HtmlHelper.getHtmlTemplateBaseUrl();
  let requestId = "";

  if (event && event.pathParameters && event.pathParameters.id) {
    requestId = event.pathParameters.id;
  }
  console.log(`Incoming requested Id is ${requestId}`);

  if (requestId) {
      html = HtmlHelper.getHtmlTemplateItem();
      let item = await getItemFromDynamo(requestId);
      if (item) {
          // update values in html template
          html = html.replace(/INCIDENT_ID/g,item.Item.INCIDENT_ID.S);
          html = html.replace(/OFFENSE_ID/g,item.Item.OFFENSE_ID.S);
          html = html.replace(/OFFENSE_CODE/g,item.Item.OFFENSE_CODE.S);
          html = html.replace(/REPORTED_DATE/g,item.Item.REPORTED_DATE.S);
          html = html.replace(/INCIDENT_ADDRESS/g,item.Item.INCIDENT_ADDRESS.S);
          html = html.replace(/NEIGHBORHOOD_ID/g,item.Item.NEIGHBORHOOD_ID.S);
          html = html.replace(/GEO_LAT/g,item.Item.GEO_LAT.S);
          html = html.replace(/GEO_LON/g,item.Item.GEO_LON.S);
      }
  }

  return {
    statusCode: 200,
    headers: {"content-type": "text/html"},
    body: html
  };


};

async function getItemFromDynamo(id) {
  //return "getting this id: " + id;
  return await new Promise((resolve, reject) => {
    const params = {
      Key: {
        "INCIDENT_ID": {
          S: id
        }
      },
      TableName: "INCIDENTS"
    };

    DYNAMODB.getItem(params, (error, data) => {
      if (error) {
        console.log("Error in getItem()");
        console.error(JSON.stringify(error));
        resolve({});
      } else {
        console.log("Success from getItem()");
        console.log(JSON.stringify(data));
        resolve(data);
      }
    });
});


}
