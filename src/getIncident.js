'use strict';
const AWS = require('aws-sdk');
const DYNAMODB = new AWS.DynamoDB();

module.exports.handler = async event => {

  console.log(JSON.stringify(event));
  console.log(JSON.stringify(event.pathParameters));

  let html = getBaseTemplate();
  let requestId = "";

  if (event && event.pathParameters && event.pathParameters.id) {
    requestId = event.pathParameters.id;
  }
  console.log(`Incoming requested Id is ${requestId}`);

  if (requestId) {
      html = getHtmlTemplate();
      let item = await getItemFromDynamo(requestId);
      if (item) {
          let incident_id = item.Item.INCIDENT_ID;
          console.log(incident_id);
          console.log(item.Item.INCIDENT_ADDRESS);
          // update values in html template
          html = html.replace(/INCIDENT_ID/g,item.Item.INCIDENT_ID.S);
      }
  }

  return {
    statusCode: 200,
    headers: {"content-type": "text/html"},
    body: html
  };


};

function getHtmlTemplate() {
  let html = `
      <html>

      <head>
        <title>HTML from API Gateway/Lambda</title>
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.css"/>

      </head>

      <body><h1>Incident Id: INCIDENT_ID </h1></body>

      INCIDENT_ID
      </html>
  `;
  return html.trim();

}

function getBaseTemplate() {
  let html = `
      <html>

      <head>
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.css"/>
      </head>

      <body><h1>
      Missing request id
      </h1></body>

      </html>
  `;
  return html.trim();

}

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
