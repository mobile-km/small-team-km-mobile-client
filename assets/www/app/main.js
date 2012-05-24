require.config({
  baseUrl: '',
  paths  : {
    'jquery'    : 'lib/jquery',
    'underscore': 'lib/underscore',
    'backbone'  : 'lib/backbone',
    'templates' : 'app/templates',
    'ht'        : 'lib/ht',
    'hogan'     : 'lib/hogan',
    'models'    : 'app/models',
    'router'    : 'app/router',
    'views'     : 'app/views',
    'auth'      : 'lib/auth',
    'app'       : 'app/app',
    'cookie'    : 'lib/jquery.cookie',
    'websql'    : 'lib/backbone-websql'
  }
})

require(
['backbone', 'router', 'app', 'websql', 'models'],
function(Backbone, router, App) {
  window.App = App;

  Backbone.history.start();
});
