'use strict';
const HtmlHelper = require('./lib/htmlHelper');
const DynamoHelper = require('./lib/dynamoHelper');

//
// This Lambda responds to an HTTP request for all incidents or
// a specific incident id and returns Html content.
//

module.exports.handler = async event => {
  //console.log(JSON.stringify(event));

  let html = HtmlHelper.getHtmlTemplateDefault();
  let requestId = "";

  if (event && event.pathParameters && event.pathParameters.id) {
    requestId = event.pathParameters.id;
  }

  if (requestId) {
      console.log(`Incoming requested Id is ${requestId}`);

      let incident = await DynamoHelper.getIncident(requestId);

      if (incident && incident.Item) {
        html = await buildIncidentHtml(incident);
      } else {
        console.log(`Incident Id ${requestId} not found`);
        html = HtmlHelper.getHtmlTemplateItemNotFound();
        html = html.replace(/INCIDENT_ID/g,requestId);
      }

  } else {
    // Get first N items, no id specified
    let results = await DynamoHelper.getFirstNIncidents(15);
    if (results && results.Items && results.Items.length > 0) {
      let baseUrl = getBaseUrl(event);
      html = buildNIncidentsHtml(results,baseUrl);
    } else {
      // No results found, no action, use default html
      console.log("No results found");
    }

  }

  return {
    statusCode: 200,
    headers: {"content-type": "text/html"},
    body: html
  };

};

//
// Figure out base url from event metadata
//
const getBaseUrl = (event) => {
  let url = "";
  if (event && event.requestContext && event.requestContext.path && event.requestContext.domainName) {
    url = "https://" + event.requestContext.domainName + event.requestContext.path;
  }
  return url;
};

//
// Build html page for a set of incidents
//
const buildNIncidentsHtml = (results,baseUrl) => {
  console.log(`buildNIncidentsHtml() ${baseUrl}`);
  //console.log(JSON.stringify(results));

  let tempHtml = HtmlHelper.getHtmlTemplateNItems();
  let rowHtml = "";

  results.Items.forEach((item) => {
    let row = HtmlHelper.getHtmlRowSnippet(item.INCIDENT_ID.S,item.REPORTED_DATE.S,item.INCIDENT_ADDRESS.S,baseUrl);
    rowHtml += row;
  });

  tempHtml = tempHtml.replace(/TABLEROWS/g,rowHtml);
  return tempHtml;
};

//
// Build html page for a single incident
//
const buildIncidentHtml = async (incident) => {
  let html = HtmlHelper.getHtmlTemplateItem();

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

  return html;
};
