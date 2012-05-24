define(
['backbone', 'app', 'auth', 'jquery', 'cookie', 'views'],
function(Backbone, App, auth, jQuery) {


  var Router = Backbone.Router.extend({
    routes: {
      ''        : 'root',
      'login'   : 'login',
      'profile' : 'profile',
      'new_text': 'new_text'
    },

    root: function() {
      console.log('entering root....');
      var loading_page = new App.views.LoadingPage;
      loading_page.render_view();

      if (jQuery.cookie('_cookie')) {
        var self = this;
        auth.ajax_auth(function() {
          self.navigate('profile', {trigger: true});
        }, function() {
          self.navigate('login', {trigger: true});
        });
      } else {
        this.navigate('login', {trigger: true});
      }
    },

    login: function() {
      var login_page = new App.views.LoginPage;
      login_page.render_view();
    },

    profile: function() {
      var profile_page = new App.views.ProfilePage;
      profile_page.render_view();
    },

    new_text: function() {
      var new_text_page = new App.views.NewTextPage;
      new_text_page.render_view();
    }







  });

  App.router = new Router;
})

