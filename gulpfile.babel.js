'use strict';

import _ from 'lodash';
import del from 'del';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import http from 'http';
import lazypipe from 'lazypipe';
import nodemon from 'nodemon';
import open from 'open';
import path from 'path';
import runSequence from 'run-sequence';

import { Instrumenter } from 'isparta';
import { protractor, webdriver_update } from 'gulp-protractor';
import { Server as KarmaServer } from 'karma';
import { stream as wiredep } from 'wiredep';

var config;
const clientPath = require('./bower.json').appPath || 'client';
const plugins = gulpLoadPlugins();
const serverPath = 'server';

const paths = {
  client: {
    assets: `${clientPath}/assets/**/*`,
    bower: `${clientPath}/bower_components/`,
    e2e: [
      'e2e/**/*.spec.js'
    ],
    images: `${clientPath}/assets/images/**/*`,
    mainStyle: `${clientPath}/app/app.scss`,
    mainView: `${clientPath}/index.html`,
    scripts: [
      `${clientPath}/**/!(*.spec|*.mock).js`,
      `!${clientPath}/bower_components/**/*`
    ],
    styles: [
      `${clientPath}/{app,components}/**/*.scss`
    ],
    test: [
      `${clientPath}/{app,components}/**/*.{spec,mock}.js`
    ],
    views: `${clientPath}/{app,components}/**/*.html`
  },
  dist: 'dist',
  server: {
    json: [
      `${serverPath}/**/*.json`
    ],
    scripts: [
      `${serverPath}/**/!(*.spec|*.integration).js`,
      `!${serverPath}/config/local.env.sample.js`
    ],
    test: {
      integration: [
        `${serverPath}/**/*.integration.js`,
        'mocha.global.js'
      ],
      unit: [
        `${serverPath}/**/*.spec.js`,
        'mocha.global.js'
      ]
    }
  },
  karma: 'karma.conf.js'
};

function checkAppReady(cb) {
  let options = {
    host: 'localhost',
    port: config.port
  };
  http.get(options, () => cb(true)).on('error', () => cb(false));
}

function onServerLog(log) {
  console.log(plugins.util.colors.white('[') +
    plugins.util.colors.yellow('nodemon') +
    plugins.util.colors.white('] ') +
    log.message);
}

function sortModulesFirst(a, b) {
  const module = /\.module\.js$/;
  const aMod = module.test(a.path);
  const bMod = module.test(b.path);
  if (aMod === bMod) {
    if (a.path < b.path) {
      return -1;
    }
    if (a.path > b.path) {
      return 1;
    }
    return 0;
  }
  return (aMod ? -1 : 1);
}

function whenServerReady(cb) {
  let serverReady = false;
  const appReadyInterval = setInterval(() =>
    checkAppReady((ready) => {
      if (!ready || serverReady) {
        return;
      }
      clearInterval(appReadyInterval);
      serverReady = true;
      cb();
    }),
  100);
}

let istanbul = lazypipe()
  .pipe(plugins.istanbul.writeReports)
  .pipe(plugins.istanbulEnforcer, {
    coverageDirectory: './coverage',
    rootDirectory : '',
    thresholds: {
      global: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80
      }
    }
  });

let lintClientScripts = lazypipe()
  .pipe(plugins.jshint, `${clientPath}/.jshintrc`)
  .pipe(plugins.jshint.reporter, 'jshint-stylish');

let lintServerScripts = lazypipe()
  .pipe(plugins.jshint, `${serverPath}/.jshintrc`)
  .pipe(plugins.jshint.reporter, 'jshint-stylish');

let lintServerTestScripts = lazypipe()
  .pipe(plugins.jshint, `${serverPath}/.jshintrc-spec`)
  .pipe(plugins.jshint.reporter, 'jshint-stylish');

let mocha = lazypipe()
  .pipe(plugins.mocha, {
    reporter: 'spec',
    require: [
      './mocha.conf'
    ],
    timeout: 5000
  });

let transpileClient = lazypipe()
  .pipe(plugins.sourcemaps.init)
  .pipe(plugins.babel)
  .pipe(plugins.sourcemaps.write, '.');

let transpileServer = lazypipe()
  .pipe(plugins.sourcemaps.init)
  .pipe(plugins.babel, {
    plugins: [
      'transform-class-properties',
      'transform-runtime'
    ]
  })
  .pipe(plugins.sourcemaps.write, '.');

let styles = lazypipe()
  .pipe(plugins.sourcemaps.init)
  .pipe(plugins.sass)
  .pipe(plugins.autoprefixer, {
    browsers: ['last 1 version']
  })
  .pipe(plugins.sourcemaps.write, '.');






gulp.task('build', (cb) => {
  runSequence(
    [
      'clean:dist',
      'clean:tmp'
    ],
    'inject',
    'wiredep:client',
    [
      'build:images',
      'copy:extras',
      'copy:fonts',
      'copy:assets',
      'copy:server',
      'transpile:server',
      'build:client'
    ],
    cb);
});

gulp.task('build:client', [
  'transpile:client',
  'styles',
  'html',
  'constant'
], () => {
  const appFilter = plugins.filter('**/app.js', { restore: true });
  const cssFilter = plugins.filter('**/*.css', { restore: true });
  const jsFilter = plugins.filter('**/*.js', { restore: true });
  const htmlBlock = plugins.filter(['**/*.!(html)'], { restore: true });
  const manifest = gulp.src(`${paths.dist}/${clientPath}/assets/rev-manifest.json`);
  return gulp.src(paths.client.mainView)
    .pipe(plugins.useref())
    .pipe(appFilter)
    .pipe(plugins.addSrc.append('.tmp/templates.js'))
    .pipe(plugins.concat('app/app.js'))
    .pipe(appFilter.restore)
    .pipe(jsFilter)
    .pipe(plugins.ngAnnotate())
    .pipe(plugins.uglify())
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    .pipe(plugins.minifyCss({
      cache: true,
      processImportFrom: ['!fonts.googleapis.com']
    }))
    .pipe(cssFilter.restore)
    .pipe(htmlBlock)
    .pipe(plugins.rev())
    .pipe(htmlBlock.restore)
    .pipe(plugins.revReplace({manifest}))
    .pipe(gulp.dest(`${paths.dist}/${clientPath}`));
});

gulp.task('build:images', () => {
  return gulp.src(paths.client.images)
    .pipe(plugins.imagemin({
      interlaced: true,
      optimizationLevel: 5,
      progressive: true
    }))
    .pipe(plugins.rev())
    .pipe(gulp.dest(`${paths.dist}/${clientPath}/assets/images`))
    .pipe(plugins.rev.manifest(`${paths.dist}/${clientPath}/assets/rev-manifest.json`, {
      base: `${paths.dist}/${clientPath}/assets`,
      merge: true
    }))
    .pipe(gulp.dest(`${paths.dist}/${clientPath}/assets`));
});

gulp.task('clean:tmp', () => del(
  [
    '.tmp/**/*'
  ], { dot: true })
);

gulp.task('clean:dist', () => del(
  [
    `${paths.dist}/!(.git*|.openshift|Procfile)**`
  ], { dot: true })
);

gulp.task('constant', function() {
  const sharedConfig = require(`./${serverPath}/config/environment/shared`);
  return plugins.ngConstant({
      constants: { appConfig: sharedConfig },
      deps: [],
      name: 'projectRecacoApp.constants',
      stream: true,
      wrap: true
    })
    .pipe(plugins.rename({
      basename: 'app.constant'
    }))
    .pipe(gulp.dest(`${clientPath}/app/`))
});

gulp.task('copy:assets', () => {
  return gulp.src([paths.client.assets, '!' + paths.client.images])
    .pipe(gulp.dest(`${paths.dist}/${clientPath}/assets`));
});

gulp.task('copy:extras', () => {
  return gulp.src([
    `${clientPath}/favicon.ico`,
    `${clientPath}/robots.txt`,
    `${clientPath}/.htaccess`
  ], { dot: true })
    .pipe(gulp.dest(`${paths.dist}/${clientPath}`));
});

gulp.task('copy:fonts', () => {
  return gulp.src(`${clientPath}/bower_components/font-awesome/fonts/**/*`, { dot: true })
    .pipe(gulp.dest(`${paths.dist}/${clientPath}/bower_components`));
});

gulp.task('copy:server', () => {
  return gulp.src([
    'package.json',
    'bower.json',
    '.bowerrc'
  ], {cwdbase: true})
    .pipe(gulp.dest(paths.dist));
});

gulp.task('coverage:integration', () => {
  return gulp.src(paths.server.test.integration)
    .pipe(mocha())
    .pipe(istanbul())
});

gulp.task('coverage:pre', () => {
  return gulp.src(paths.server.scripts)
    .pipe(plugins.istanbul({
      includeUntested: true,
      instrumenter: Instrumenter
    }))
    .pipe(plugins.istanbul.hookRequire());
});

gulp.task('coverage:unit', () => {
  return gulp.src(paths.server.test.unit)
    .pipe(mocha())
    .pipe(istanbul());
});

gulp.task('env:all', () => {
  let localConfig;
  try {
    localConfig = require(`./${serverPath}/config/local.env`);
  } catch (e) {
    localConfig = {};
  }
  plugins.env({
    vars: localConfig
  });
});

gulp.task('env:prod', () => {
  plugins.env({
    vars: { NODE_ENV: 'production' }
  });
});

gulp.task('env:test', () => {
  plugins.env({
    vars: { NODE_ENV: 'test' }
  });
});

gulp.task('html', function() {
  return gulp.src(`${clientPath}/{app,components}/**/*.html`)
    .pipe(plugins.angularTemplatecache({
      module: 'projectRecacoApp'
    }))
    .pipe(gulp.dest('.tmp'));
});

gulp.task('inject', (cb) => {
  runSequence([
    'inject:js',
    'inject:css',
    'inject:scss'
  ], cb);
});

gulp.task('inject:css', () => {
  return gulp.src(paths.client.mainView)
    .pipe(plugins.inject(
      gulp.src(`/${clientPath}/{app,components}/**/*.css`, { read: false })
        .pipe(plugins.sort()), {
          endtag: '<!-- endinjector -->',
          starttag: '<!-- injector:css -->',
          transform: (filepath) => '<link rel="stylesheet" href="' + filepath.replace(`/${clientPath}/`, '').replace('/.tmp/', '') + '">'
        }
    ))
    .pipe(gulp.dest(clientPath));
});

gulp.task('inject:js', () => {
  return gulp.src(paths.client.mainView)
    .pipe(plugins.inject(
      gulp.src(_.union(paths.client.scripts, [
        `!${clientPath}/**/*.{spec,mock}.js`,
        `!${clientPath}/app/app.js`
      ]), { read: false })
        .pipe(plugins.sort(sortModulesFirst)), {
          endtag: '<!-- endinjector -->',
          starttag: '<!-- injector:js -->',
          transform: (filepath) => '<script src="' + filepath.replace(`/${clientPath}/`, '') + '"></script>'
        }
    ))
    .pipe(gulp.dest(clientPath));
});

gulp.task('inject:scss', () => {
  return gulp.src(paths.client.mainStyle)
    .pipe(plugins.inject(
      gulp.src(_.union(paths.client.styles, [
        '!' + paths.client.mainStyle
      ]), { read: false })
        .pipe(plugins.sort()), {
          transform: (filepath) => {
            let newPath = filepath
              .replace(`/${clientPath}/app/`, '')
              .replace(`/${clientPath}/components/`, '../components/')
              .replace(/_(.*).scss/, (match, p1, offset, string) => p1)
              .replace('.scss', '');
            return `@import '${newPath}';`;
          }
        }
    ))
    .pipe(gulp.dest(`${clientPath}/app`));
});

gulp.task('jscs', () => {
  return gulp.src(_.union(paths.client.scripts, paths.server.scripts))
    .pipe(plugins.jscs())
    .pipe(plugins.jscs.reporter());
});

gulp.task('lint:scripts', (cb) => runSequence([
  'lint:scripts:client',
  'lint:scripts:server'
], cb));

gulp.task('lint:scripts:client', () => {
  return gulp.src(_.union(
    paths.client.scripts,
    _.map(paths.client.test, blob => '!' + blob), [
      `!${clientPath}/app/app.constant.js`
    ]))
    .pipe(lintClientScripts());
});

gulp.task('lint:scripts:clientTest', () => {
  return gulp.src(paths.client.test)
    .pipe(lintClientScripts());
});

gulp.task('lint:scripts:server', () => {
  return gulp.src(_.union(paths.server.scripts, _.map(paths.server.test, blob => '!' + blob)))
    .pipe(lintServerScripts());
});

gulp.task('lint:scripts:serverTest', () => {
  return gulp.src(paths.server.test)
    .pipe(lintServerTestScripts());
});

gulp.task('mocha:coverage', cb => {
  runSequence('coverage:pre',
    'env:all',
    'env:test',
    'coverage:unit',
    'coverage:integration',
    cb);
});

gulp.task('mocha:integration', () => {
  return gulp.src(paths.server.test.integration)
    .pipe(mocha());
});

gulp.task('mocha:unit', () => {
  return gulp.src(paths.server.test.unit)
    .pipe(mocha());
});

gulp.task('serve', (cb) => {
  runSequence([
      'clean:tmp',
      'constant'
    ], [
      'lint:scripts',
      'inject'
    ], [
      'wiredep:client'
    ], [
      'transpile:client',
      'styles'
    ], [
      'start:server',
      'start:client'
    ],
    'watch', cb);
});

gulp.task('serve:dist', (cb) => {
  runSequence(
    'build',
    'env:all',
    'env:prod',
    [
      'start:server:prod',
      'start:client'
    ],
    cb);
});

gulp.task('start:client', (cb) => {
  whenServerReady(() => {
    open('http://localhost:' + config.port);
    cb();
  });
});

gulp.task('start:server', () => {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  config = require(`./${serverPath}/config/environment`);
  nodemon(`-w ${serverPath} ${serverPath}`)
    .on('log', onServerLog);
});

gulp.task('start:server:prod', () => {
  process.env.NODE_ENV = process.env.NODE_ENV || 'production';
  config = require(`./${paths.dist}/${serverPath}/config/environment`);
  nodemon(`-w ${paths.dist}/${serverPath} ${paths.dist}/${serverPath}`)
    .on('log', onServerLog);
});

gulp.task('styles', () => {
  return gulp.src(paths.client.mainStyle)
    .pipe(styles())
    .pipe(gulp.dest('.tmp/app'));
});

gulp.task('test', (cb) => {
  return runSequence('test:server', 'test:client', cb);
});

gulp.task('test:client', [
  'wiredep:test', 'constant'
], (done) => {
  new KarmaServer({
    configFile: `${__dirname}/${paths.karma}`,
    singleRun: true
  }, done).start();
});

gulp.task('test:e2e', [
  'env:all',
  'env:test',
  'start:server',
  'webdriver_update'
], (cb) => {
  gulp.src(paths.client.e2e)
    .pipe(protractor({ configFile: 'protractor.conf.js' }))
    .on('error', err => { console.log(err); })
    .on('end', () => {
      process.exit();
    });
});

gulp.task('test:server', (cb) => {
  runSequence(
    'env:all',
    'env:test',
    'mocha:unit',
    'mocha:integration',
    'mocha:coverage',
    cb);
});

gulp.task('transpile:client', () => {
  return gulp.src(paths.client.scripts)
    .pipe(transpileClient())
    .pipe(gulp.dest('.tmp'));
});

gulp.task('transpile:server', () => {
  return gulp.src(_.union(paths.server.scripts, paths.server.json))
    .pipe(transpileServer())
    .pipe(gulp.dest(`${paths.dist}/${serverPath}`));
});

gulp.task('watch', () => {
  var testFiles = _.union(paths.client.test, paths.server.test.unit, paths.server.test.integration);
  plugins.livereload.listen();
  plugins.watch(paths.client.styles, () => {
    gulp.src(paths.client.mainStyle)
      .pipe(plugins.plumber())
      .pipe(styles())
      .pipe(gulp.dest('.tmp/app'))
      .pipe(plugins.livereload());
  });
  plugins.watch(paths.client.views)
    .pipe(plugins.plumber())
    .pipe(plugins.livereload());
  plugins.watch(paths.client.scripts)
    .pipe(plugins.plumber())
    .pipe(transpileClient())
    .pipe(gulp.dest('.tmp'))
    .pipe(plugins.livereload());
  plugins.watch(_.union(paths.server.scripts, testFiles))
    .pipe(plugins.plumber())
    .pipe(lintServerScripts())
    .pipe(plugins.livereload());
  gulp.watch('bower.json', [
    'wiredep:client'
  ]);
});

gulp.task('webdriver_update', webdriver_update);

gulp.task('wiredep:client', () => {
  return gulp.src(paths.client.mainView)
    .pipe(wiredep({
      exclude: [
        /bootstrap.css/,
        /bootstrap.js/,
        /bootstrap-sass-official/,
        /es5-shim/,
        /font-awesome.css/,
        /json3/
      ],
      ignorePath: clientPath
    }))
    .pipe(gulp.dest(`${clientPath}/`));
});

gulp.task('wiredep:test', () => {
  return gulp.src(paths.karma)
    .pipe(wiredep({
      devDependencies: true,
      exclude: [
        /bootstrap.css/,
        /bootstrap.js/,
        /bootstrap-sass-official/,
        '/es5-shim/',
        /font-awesome.css/,
        '/json3/'
      ]
    }))
    .pipe(gulp.dest('./'));
});
