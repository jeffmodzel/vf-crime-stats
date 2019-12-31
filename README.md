# vf-crime-stats
Demo of serverless framework using crime statistics from Denver, CO

# Use Case
The purpose of this project is to demonstrate the use of the [serverless framework](https://serverless.com/) to build an AWS deployment that
creates Lambda functions, S3 buckets, and Dynamo DB tables. As well as a serverless plugin that invokes a Lambda after the deployment, extracts data from a file in S3 and inserts that data into DynamoDB. In addition, there is an API Gateway endpoint to retrieve an HTML representation of the data and an S3 bucket that will accept new data and upload it to a DynamoDB table.

In this particular project, we'll use crime reporting data from the city of Denver, CO. More information about the data used in this project can be found here: [data/readme.md](data/readme.md).

# Design
![](diagrams/vf-crime-stats.png)
*Diagram omits IAM and CloudFormation, along with any other assets created automatically by serverless.*

The serverless framework will create the following AWS service infrastructure:

- Three Lambda functions (load-data, file-upload and  get-incident)
- Two DynamoDB tables (INCIDENTS and OFFENSES)
- Two S3 buckets (data-deploy and data-upload)
- API Gateway endpoint(s) (/incidents and /incidents/{id})
- IAM and CloudFormation assets automatically created by serverless

Note - the actual names of the deployed infrastructure can change depending on blah blah.


# Functionality
Upon a `serverless deploy` the following will happen:
- serverless will deploy all the defined assets to AWS. This particular deployment is set to deploy to us-east-2 region.
- After deployment, serverless will use the external plugin `serverless-s3-deploy` to copy all the .csv files in the `data/sync` folder to S3 bucket data-deploy. For this project that is only offense_codes.csv.
- Next, serverless will execute the custom plugin `execute-lambda-plugin` (written for this project). This plugin executes the load-data Lambda function which reads the offense_codes.csv from the S3 bucket and loads the DynamoDB table OFFENSES.

After the project has been deployed, incident data files need to be manually uploaded to the S3 bucket data-upload. This can be done in the AWS console or with the AWS CLI (aws s3 cp ./data/sync/offense_codes.csv s3://data-deploy/offense_codes.csv). When a new data file is uploaded to that bucket, the Lambda file-upload will automatically execute and load the DynamoDB table INCIDENTS.

After incident files are uploaded, a user may browse to http://{base_url}/incidents or http://{base_url}/incidents/{id}. This will display an HTML page with details of the specific incident including a Google Map (based upon the latitude and longitude of the specific incident).
Note the base url will change with every deploy, so check the output from serverless.

![](diagrams/screenshot.png)


# Todo
- make diagram
- populate "areas for improvement/future improvements"
- add Denver xyz header/footer to template
- create 3rd data file
- remove template html and all other non-essential files
- review all code for final cleanup and comments
- review yml file

# Future Improvements
This was my first attempt at a serverless project and there are likely some areas of improvement:

- breakup IAM permissions by lambda

learn more about referencing things within serverless.yml
use sub-yml files
Dynamo field/column data types, more efficient hash/keys
html templates could probably be made into s3 files
more efficient string replaces in html templates
implement a "get all" for the root

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
