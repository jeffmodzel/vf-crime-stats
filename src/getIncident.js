'use strict';
const HtmlHelper = require('./lib/htmlHelper');
const DynamoHelper = require('./lib/dynamoHelper');

module.exports.handler = async event => {

  //console.log(JSON.stringify(event));

  let html = HtmlHelper.getHtmlTemplateBaseUrl();
  let requestId = "";

  if (event && event.pathParameters && event.pathParameters.id) {
    requestId = event.pathParameters.id;
  }
  console.log(`Incoming requested Id is ${requestId}`);

  if (requestId) {
      let item = await DynamoHelper.getIncident(requestId);

      if (item && item.Item) {
        html = HtmlHelper.getHtmlTemplateItem();
        // update values in html template
        html = html.replace(/INCIDENT_ID/g,item.Item.INCIDENT_ID.S);
        html = html.replace(/OFFENSE_ID/g,item.Item.OFFENSE_ID.S);
        html = html.replace(/OFFENSE_CODE/g,item.Item.OFFENSE_CODE.S);
        html = html.replace(/REPORTED_DATE/g,item.Item.REPORTED_DATE.S);
        html = html.replace(/INCIDENT_ADDRESS/g,item.Item.INCIDENT_ADDRESS.S);
        html = html.replace(/NEIGHBORHOOD_ID/g,item.Item.NEIGHBORHOOD_ID.S);
        html = html.replace(/GEO_LAT/g,item.Item.GEO_LAT.S);
        html = html.replace(/GEO_LON/g,item.Item.GEO_LON.S);
      } else {
        console.log(`Incident Id ${requestId} not found`);
        html = HtmlHelper.getHtmlTemplateItemNotFound();
        // update values in html template
        html = html.replace(/INCIDENT_ID/g,requestId);
      }
  }

  return {
    statusCode: 200,
    headers: {"content-type": "text/html"},
    body: html
  };

};
