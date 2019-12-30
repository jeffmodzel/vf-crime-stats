# vf-crime-stats
Demo of serverless framework using crime statistics from Denver, CO


# Todo
- write S3 bucket upload to new table
- remove http event from data load
- write status /get

# questions/things to do better
breakup IAM permissions by lambda
learn more about referencing things within serverless.yml
use sub-yml files
Dynamo field/column data types, more efficient hash/keys

# Dependencies
Uses serverless-s3-deploy plugin found: https://github.com/funkybob/serverless-s3-deploy
USE csvtojson

npm install --save-dev serverless-s3-deploy

https://blogs.perficient.com/2018/12/21/populating-a-dynamodb-table-based-on-a-csv-file/



# invoke lambda from serverless
https://github.com/serverless/serverless/blob/master/lib/plugins/aws/invoke/index.js


aws lambda invoke --function-name vf-crime-stats-dev-load-data --payload '{ "name": "Bob" }' output.txt
aws lambda invoke --function-name vf-crime-stats-dev-load-data --payload '{ "bucket" : "vf-data-deploy-2608452", "key" : "offense_codes.csv" }' output.json


aws lambda invoke --function-name vf-crime-stats-dev-load-data  output.json
serverless invoke --function-name load-data

aws s3 cp ./data/sync/offense_codes.csv s3://vf-data-deploy-2608452/offense_codes.csv
aws s3 rm s3://vf-data-deploy-2608452/offense_codes.csv

aws s3 cp ./data/incidents_1.csv s3://vf-data-upload-2608452/incidents_1.csv
