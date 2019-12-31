
//
// Helper lib to provide raw html content
//

const getHtmlTemplateItem = () => {
  let html = `
  <html>

  <head>
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.css"/>
  </head>

  <body>
    <br>

    <div class="container">

    <div class="row">
      <div class="two columns"></div>
      <div class="eight columns"><h2 align="center">Denver Police Department </h2>
    <h4 align="center">City and County of Denver, CO</h4>
      </div>
      <div class="two columns"></div>
    </div>

    <div class="row">
      <div class="two columns"></div>
      <div class="eight columns"><hr/></div>
      <div class="two columns"></div>
    </div>

    <div class="row">
      <div class="two columns"></div>
      <div class="eight columns"><h1 align="center">Incident Id: INCIDENT_ID</h1></div>
      <div class="two columns"></div>
    </div>

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
              <td><strong>Offense Description</strong></td>
              <td>OFFENSE_DESC</td>
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

    HTML_MAP_SNIPPET

  </div>

  <br><br>

  </body>
  </html>
  `;
  return html.trim();
};

const getHtmlTemplateItemNotFound = () => {
  let html = `
  <html>
    <head>
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.css"/>
    </head>

    <body>
      <br>
      <div class="container">

      <div class="row">
        <div class="two columns"></div>
        <div class="eight columns"><h2 align="center">Denver Police Department </h2>
      <h4 align="center">City and County of Denver, CO</h4>
        </div>
        <div class="two columns"></div>
      </div>

      <div class="row">
        <div class="two columns"></div>
        <div class="eight columns"><hr/></div>
        <div class="two columns"></div>
      </div>

        <div class="row">
          <div class="two columns"></div>
          <div class="eight columns"><h1 align="center">Incident INCIDENT_ID not found.</h1></div>
          <div class="two columns"></div>
        </div>
      </div>
    </body>
  </html>
  `;
  return html.trim();
};

const getHtmlTemplateDefault = () => {
  let html = `
  <html>
    <head>
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.css"/>
    </head>

    <body>
      <br>
      <div class="container">

      <div class="row">
        <div class="two columns"></div>
        <div class="eight columns"><h2 align="center">Denver Police Department </h2>
      <h4 align="center">City and County of Denver, CO</h4>
        </div>
        <div class="two columns"></div>
      </div>

      <div class="row">
        <div class="two columns"></div>
        <div class="eight columns"> <hr/></div>
        <div class="two columns"></div>
      </div>

        <div class="row">
          <div class="two columns"></div>
          <div class="eight columns"><h1 align="center">Please call url /incidents/{id}</h1></div>
          <div class="two columns"></div>
        </div>

        <div class="row">
          <div class="two columns"></div>
          <div class="eight columns"><hr/></div>
          <div class="two columns"></div>
        </div>

          <div class="row">
            <div class="two columns"></div>
            <div class="eight columns"><h2 align="center">No incidents available</h2></div>
            <div class="two columns"></div>
          </div>

      </div>
    </body>
  </html>
  `;
  return html.trim();
};

const getHtmlMapSnippet = (latitude, longitude) => {
  console.log(`getHtmlMapSnippet() ${latitude} ${longitude}`);

  let html = `
  <div class="row">
    <div class="two columns"></div>
    <div class="eight columns">
      <br>
      <h2>Incident Location</h2>
      <iframe width="700" height="700" src = "https://maps.google.com/maps?q=LATITUDE,LONGITUDE&hl=en;z=14&amp;output=embed"></iframe>
    </div>
    <div class="two columns"></div>
  </div>
  `;
  html = html.replace(/LATITUDE/g,latitude);
  html = html.replace(/LONGITUDE/g,longitude);
  return html.trim();
};

const getHtmlRowSnippet = (id,reported,address,url) => {
  console.log(`getHtmlRowSnippet() ${id} ${reported} ${address} ${url}`);

  let link = '<a href="URL" target="_blank">ID</a>';
  link = link.replace(/ID/g,id);
  link = link.replace(/URL/g,url + "/" + id);

  let html = `
  <tr>
    <td>ID</td>
    <td>REPORTED</td>
    <td>ADDRESS</td>
  </tr>
  `;
  html = html.replace(/ID/g,link);
  html = html.replace(/REPORTED/g,reported);
  html = html.replace(/ADDRESS/g,address);
  return html.trim();
};

const getHtmlTemplateNItems = () => {
  let html = `
  <html>
    <head>
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.css"/>
    </head>

    <body>
      <br>
      <div class="container">

      <div class="row">
        <div class="two columns"></div>
        <div class="eight columns"><h2 align="center">Denver Police Department </h2>
      <h4 align="center">City and County of Denver, CO</h4>
        </div>
        <div class="two columns"></div>
      </div>

      <div class="row">
        <div class="two columns"></div>
        <div class="eight columns"><hr/></div>
        <div class="two columns"></div>
      </div>

      <div class="row">
        <div class="two columns"></div>
        <div class="eight columns">

          <table class="u-full-width">
            <thead>
              <tr>
                <th>Incident Id</th>
                <th>Reported Date</th>
                <th>Address</th>
              </tr>

            <tbody>

              TABLEROWS

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

module.exports.getHtmlTemplateItem = getHtmlTemplateItem;
module.exports.getHtmlTemplateDefault = getHtmlTemplateDefault;
module.exports.getHtmlTemplateItemNotFound = getHtmlTemplateItemNotFound;
module.exports.getHtmlMapSnippet = getHtmlMapSnippet;
module.exports.getHtmlRowSnippet = getHtmlRowSnippet;
module.exports.getHtmlTemplateNItems = getHtmlTemplateNItems;
