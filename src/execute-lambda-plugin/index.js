'use strict';

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

    // this.commands = {
    //   deploy: {
    //     lifecycleEvents: ['resources', 'functions'],
    //   },
    // };

    this.hooks = {
      'after:deploy:resources': this.afterDeployResources.bind(this),
      'after:deploy:finalize': this.afterDeployFinalize.bind(this),
      'after:executelambda:test': this.afterTest.bind(this),
    };
  }

  afterTest() {
    this.options.debug = true;
    this.serverless.cli.log(`Invoking labda ${this.options.functionObj.name}`);
    this.invokeLambda();
  }

  invokeLambda() {
    try {
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

  afterDeployResources() {
    this.serverless.cli.log(' -- WE HAVE DEPLOYED RESOURCES --');
  }

  afterDeployFinalize() {
    this.serverless.cli.log(' -- WE HAVE DEPLOYED Finalize --');
  }
}

module.exports = ExecuteLambdaPlugin;
