
//
// Helper lib to provide raw html content
//

const getHtmlTemplateItem = () => {
  let html = `
  <html>

  <head>
    <title>HTML from API Gateway/Lambda</title>
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.css"/>

  </head>

  <body>
    <br>
    <div class="container">
    <div class="row">
      <div class="two columns"></div>
      <div class="eight columns"> <h1 align="center">Incident Id: INCIDENT_ID </h1></div>
      <div class="two columns"></div>
    </div>
    </div>

    <br>
    <div class="container">

    <!-- columns should be the immediate child of a .row -->
    <div class="row">
      <div class="two columns"></div>
      <div class="eight columns">

        <table class="u-full-width">
          <tbody>
            <tr>
              <td><strong>Offense Id</strong></td>
              <td>OFFENSE_ID</td>
            </tr>
            <tr>
              <td><strong>Offense Code</strong></td>
              <td>OFFENSE_CODE</td>
            </tr>
            <tr>
              <td><strong>Reported Date</strong></td>
              <td>REPORTED_DATE</td>
            </tr>
            <tr>
              <td><strong>Incident Address</strong></td>
              <td>INCIDENT_ADDRESS</td>
            </tr>
            <tr>
              <td><strong>Neighborhood Id</strong></td>
              <td>NEIGHBORHOOD_ID</td>
            </tr>
            <tr>
              <td><strong>Latitude</strong></td>
              <td>GEO_LAT</td>
            </tr>
            <tr>
              <td><strong>Longitude</strong></td>
              <td>GEO_LON</td>
            </tr>
          </tbody>
        </table>

      </div>
      <div class="two columns"></div>

    </div>

  </div>

  </body>
  </html>
  `;
  return html.trim();
};

const getHtmlTemplateItemNotFound = () => {
  let html = `
  <html>
    <head>
      <title>Incident Not Found</title>
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.css"/>
    </head>

    <body>
      <br>
      <div class="container">
        <div class="row">
          <div class="two columns"></div>
          <div class="eight columns"> <h1 align="center">Incident INCIDENT_ID not found.</h1></div>
          <div class="two columns"></div>
        </div>
      </div>
    </body>
  </html>
  `;
  return html.trim();
};

const getHtmlTemplateBaseUrl = () => {
  let html = `
  <html>
    <head>
      <title>HTML from API Gateway/Lambda</title>
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.css"/>
    </head>

    <body>
      <br>
      <div class="container">
        <div class="row">
          <div class="two columns"></div>
          <div class="eight columns"> <h1 align="center">Please call url /incidents/{id} </h1></div>
          <div class="two columns"></div>
        </div>
      </div>
    </body>
  </html>
  `;
  return html.trim();
};

module.exports.getHtmlTemplateItem = getHtmlTemplateItem;
module.exports.getHtmlTemplateBaseUrl = getHtmlTemplateBaseUrl;
module.exports.getHtmlTemplateItemNotFound = getHtmlTemplateItemNotFound;
