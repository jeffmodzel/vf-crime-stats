'use strict';
const HtmlHelper = require('./lib/htmlHelper');
const DynamoHelper = require('./lib/dynamoHelper');

//
// This Lambda responds to an HTTP request for a specific incident id
// and returns Html content.
//

module.exports.handler = async event => {

  //console.log(JSON.stringify(event));

  let html = HtmlHelper.getHtmlTemplateBaseUrl();
  let requestId = "";

  if (event && event.pathParameters && event.pathParameters.id) {
    requestId = event.pathParameters.id;
  }
  console.log(`Incoming requested Id is ${requestId}`);

  if (requestId) {
      let incident = await DynamoHelper.getIncident(requestId);

      if (incident && incident.Item) {
        html = HtmlHelper.getHtmlTemplateItem();

        // update values in html template
        html = html.replace(/INCIDENT_ID/g,incident.Item.INCIDENT_ID.S);
        html = html.replace(/OFFENSE_ID/g,incident.Item.OFFENSE_ID.S);
        html = html.replace(/OFFENSE_CODE/g,incident.Item.OFFENSE_CODE.S);
        html = html.replace(/REPORTED_DATE/g,incident.Item.REPORTED_DATE.S);
        html = html.replace(/INCIDENT_ADDRESS/g,incident.Item.INCIDENT_ADDRESS.S);
        html = html.replace(/NEIGHBORHOOD_ID/g,incident.Item.NEIGHBORHOOD_ID.S);
        html = html.replace(/GEO_LAT/g,incident.Item.GEO_LAT.S);
        html = html.replace(/GEO_LON/g,incident.Item.GEO_LON.S);

        // get map html
        let mapHtml = "";
        if (incident.Item.GEO_LAT && incident.Item.GEO_LON) {
          mapHtml = HtmlHelper.getHtmlMapSnippet(incident.Item.GEO_LAT.S,incident.Item.GEO_LON.S);
        }
        html = html.replace(/HTML_MAP_SNIPPET/g,mapHtml);

        // find offense metadata if available
        let desc = "";
        let offense = await DynamoHelper.getOffense(incident.Item.OFFENSE_CODE.S);
        if (offense && offense.Item) {
          desc = offense.Item.OFFENSE_CATEGORY_NAME.S + " - " + offense.Item.OFFENSE_TYPE_NAME.S;
        }
        html = html.replace(/OFFENSE_DESC/g,desc);
      } else {
        console.log(`Incident Id ${requestId} not found`);
        html = HtmlHelper.getHtmlTemplateItemNotFound();
        html = html.replace(/INCIDENT_ID/g,requestId);
      }
  }

  return {
    statusCode: 200,
    headers: {"content-type": "text/html"},
    body: html
  };

};
