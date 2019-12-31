'use strict';

//
// This Serverless plugin will execute a Lambda function after the stack has deployed.
//

class ExecuteLambdaPlugin {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options || {};
    this.options.functionObj = this.serverless.service.getFunction(this.serverless.service.custom.project.functionToExecuteAfterDeploy);
    this.options.debug = false;
    this.provider = this.serverless.getProvider('aws');

    this.commands = {
      executelambda : {
        usage: 'Only for testing - will excute lambda defined in custom->project->functionToExecuteAfterDeploy',
        lifecycleEvents: ['test'],
      }
    };

    this.hooks = {
      'after:deploy:finalize': this.afterDeployFinalize.bind(this),
      'after:executelambda:test': this.afterTest.bind(this),
    };
  }

  afterTest() {
    this.options.debug = true;
    this.invokeLambda();
  }

  afterDeployFinalize() {
    this.invokeLambda();
  }

  invokeLambda() {
    try {
      this.serverless.cli.log(`Invoking labda ${this.options.functionObj.name}`);

      const params = {
        FunctionName: this.options.functionObj.name,
        InvocationType: 'RequestResponse',
        LogType: this.options.log,
        Payload: null
      };

      if (this.options.debug) {
        this.serverless.cli.log(JSON.stringify(params));
      }

      this.provider.request('Lambda', 'invoke', params);

    } catch (err) {
      this.serverless.cli.log("Error occured in invokeLambda()");
      this.serverless.cli.log(err);
    }
  }

}

module.exports = ExecuteLambdaPlugin;
