// Requirejs Configuration Options
require.config({
  // to set the default folder
  baseUrl: '../src',
  // paths: maps ids with paths (no extension)
  paths: {
    jasmine: ['../tests/lib/jasmine'],
    'jasmine-html': ['../tests/lib/jasmine-html'],
    'jasmine-boot': ['../tests/lib/boot'],
    jquery: '../libs/jquery',
    jszip: '../libs/jszip.min',
    'kendo.all.min': '../libs/kendo.all.min'
  },
  // shim: makes external libraries compatible with requirejs (AMD)
  shim: {
    'jasmine-html': {
      deps: ['jasmine']
    },
    'jasmine-boot': {
      deps: ['jasmine', 'jasmine-html']
    }
  }
});

require(['jasmine-boot'], function() {
  require(['index.spec', 'form/form.model.spec', 'validation/tdd.spec'], function() {
    //trigger Jasmine
    window.onload();
  });
});
