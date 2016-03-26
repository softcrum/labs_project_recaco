module.exports = function(config) {
  config.set({
    autoWatch: false,
    babelPreprocessor: {
      filename: function(file) {
        return file.originalPath.replace(/\.js$/, '.es5.js');
      },
      options: {
        sourceMap: 'inline'
      },
      sourceFileName: function(file) {
        return file.originalPath;
      }
    },
    basePath: '',
    browsers: [
      'Chrome',
      'ChromeCanary',
      'Firefox',
      'IE',
      'Opera',
      'PhantomJS',
      'Safari'
    ],
    exclude: [],
    files: [
      'client/app/app.js',
      'client/{app,components}/**/*.html',
      'client/{app,components}/**/*.js',
      'client/{app,components}/**/*.module.js',
      'node_modules/socket.io-client/socket.io.js'
    ],
    frameworks: [
      'jasmine'
    ],
    logLevel: config.LOG_INFO,
    ngHtml2JsPreprocessor: {
      stripPrefix: 'client/'
    },
    port: 8080,
    preprocessors: {
      '**/*.html': 'ng-html2js',
      'client/{app,components}/**/*.js': 'babel'
    },
    reporters: [
      'spec'
    ],
    singleRun: false
  });
};
