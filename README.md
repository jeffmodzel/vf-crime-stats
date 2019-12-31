# vf-crime-stats
Demo of serverless framework using crime statistics from Denver, CO

# Use Case
The purpose of this project is to demonstrate the use of the serverless framework to build an AWS deployment that
creates Lambda functions, S3 buckets, and Dynamo DB tables. As well as a serverless plugin that invokes a Lambda after the deployment, extracts data from a file in S3 and inserts that data into DynamoDB. In addition, there is an API Gateway endpoint deployed to retrieve HTML representation of the data.

In this particular project, we'll use crime reporting data from the city of Denver, CO. More information about the data used in this project can be found [here](data/readme.md) 


link servless framework
Using crime stats, blah balh
link to other data.md

`
sdfgsdf
`
#diagram
# enumerate the functionality
- execute on deploy
- execute when s3 upload
- http get for a incident

# Todo
- make diagram
- populate "areas for improvement/future improvements"
- add Denver xyz header/footer to template
- create 3rd data file
- remove template html and all other non-essential files
- review all code for final cleanup and comments
- review yml file

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
