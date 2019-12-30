# vf-crime-stats
Demo of serverless framework using crime statistics from Denver, CO

# add diagram and use case explanation

# enumerate the functionality
- execute on deploy
- execute when s3 upload
- http get for a incident

# Todo
- write S3 bucket upload to new table
- remove http event from data load
- write status /get
- make diagram
- populate "areas for improvement/future improvements"
- add Denver xyz header/footer to template

# questions/things to do better
breakup IAM permissions by lambda
learn more about referencing things within serverless.yml
use sub-yml files
Dynamo field/column data types, more efficient hash/keys
html templates could probably be made into s3 files
more efficient string replaces in html templates

# Dependencies
Uses serverless-s3-deploy plugin found: https://github.com/funkybob/serverless-s3-deploy
USE csvtojson

npm install --save-dev serverless-s3-deploy

https://blogs.perficient.com/2018/12/21/populating-a-dynamodb-table-based-on-a-csv-file/



# invoke lambda from serverless
https://github.com/serverless/serverless/blob/master/lib/plugins/aws/invoke/index.js

Incident Ids:
2016229783
20166003953
201872530

aws lambda invoke --function-name vf-crime-stats-dev-load-data --payload '{ "name": "Bob" }' output.txt
aws lambda invoke --function-name vf-crime-stats-dev-load-data --payload '{ "bucket" : "vf-data-deploy-2608452", "key" : "offense_codes.csv" }' output.json


aws lambda invoke --function-name vf-crime-stats-dev-load-data  output.json
serverless invoke --function-name load-data

aws s3 cp ./data/sync/offense_codes.csv s3://vf-data-deploy-2608452/offense_codes.csv
aws s3 rm s3://vf-data-deploy-2608452/offense_codes.csv

aws s3 cp ./data/incidents_1.csv s3://vf-data-upload-2608452/incidents_1.csv



<iframe
  width="300"
  height="170"
  frameborder="0"
  scrolling="no"
  marginheight="0"
  marginwidth="0"
  src="https://maps.google.com/maps?q='+YOUR_LAT+','+YOUR_LON+'&hl=es&z=14&amp;output=embed"
 >
 </iframe>
 <br />
 <small>
   <a
    href="https://maps.google.com/maps?q='+data.lat+','+data.lon+'&hl=es;z=14&amp;output=embed"
    style="color:#0000FF;text-align:left"
    target="_blank"
   >
     See map bigger
   </a>
 </small>


<iframe src = "https://maps.google.com/maps?q=10.305385,77.923029&hl=es;z=14&amp;output=embed"></iframe>
