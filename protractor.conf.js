'use strict';

const config = {
  allScriptsTimeout: 110000,
  baseUrl: 'http://localhost:' + (process.env.PORT || '9000'),
  capabilities: {
    'browserName': 'chrome',
    'build': process.env.TRAVIS_BUILD_NUMBER,
    'name': 'Fullstack E2E',
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER
  },
  exclude: [],
  framework: 'jasmine2',
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare: function() {
    require('babel-register');
    const mongoose = require('mongoose');
    const SpecReporter = require('jasmine-spec-reporter');
    const serverConfig = config.params.serverConfig;
    jasmine.getEnv().addReporter(new SpecReporter({ displayStacktrace: true }));
    mongoose.connect(serverConfig.mongo.uri, serverConfig.mongo.options);
  },
  params: {
    serverConfig: require('./server/config/environment')
  },
  sauceKey: process.env.SAUCE_ACCESS_KEY,
  sauceUser: process.env.SAUCE_USERNAME,
  specs: [
    'e2e/**/*.spec.js'
  ]
};

config.params.baseUrl = config.baseUrl;
exports.config = config;
