define(
['backbone', 'app', 'auth',
 'ht!templates/loading.html',
 'ht!templates/login.html',
 'ht!templates/profile.html',
 'ht!templates/new_text.html',
 'ht!templates/edit_text.html',
 'models'],
function(
  Backbone, App, auth, 
  LoadingTemplate, LoginTemplate, ProfileTemplate,
  NewTextTemplate, EditTextTemplate) {


  App.MainView = Backbone.View.extend({
    render_view: function() {
      if (App.current_view) {
        App.current_view.off();
        App.current_view.remove();
        App.current_view.on_close &&
        App.current_view.on_close();
      }

      App.current_view = this;
      jQuery('#content').append(this.render().el);
    }

  });

  var views = {




    LoadingPage: App.MainView.extend({
      tagName: 'div',

      template: LoadingTemplate,

      render: function() {
        this.$el.html(this.template.render());
        console.log('>>>>>>>loading', this);
        return this;
      }
    }),

    LoginPage: App.MainView.extend({
      events: {
        'click .submit': 'click_submit'
      },

      template: LoginTemplate,

      render: function() {
        this.$el.html(this.template.render());
        return this;
      },

      click_submit: function() {
        console.log('ayayayayay');
        var formdata = jQuery('.login-form').serialize();
        jQuery('.login-form .errors').hide();
        jQuery('form :input').val('');
        auth.ajax_login(formdata, function() {
          App.router.navigate('profile', {trigger: true})
        },function(){
	  jQuery('.login-form .errors').show();
	  jQuery('form :input').val('');
        });
      }
    }),

    ProfilePage: App.MainView.extend( {
      events: {
        'click #new-text': 'click_new_text',
        'click .note'    : 'click_edit_text'
      },

      initialize: function() {
        this.notes = new App.collections.Notes;
      },

      template: ProfileTemplate,

      render: function() {
        var self = this;
        this.notes.fetch({
          success: function() {
            var notes = self.notes.map(function(model){
              return model.toJSON();
            });
            
            self.$el.html(self.template.render({notes: notes}));
          }
        });

        return this;
      },

      click_new_text: function() {
        console.log('也猜猜我吧new_')
        App.router.navigate('new_text', {trigger: true});
      },

      click_edit_text: function(e) {
        var _id = $(e.currentTarget).data('id');
        App.router.navigate('edit_text/' + _id, {trigger: true});
      },

      add_all: function() {
        console.log(this.notes.models)
        this.render();
      }

    }),

    NewTextPage: App.MainView.extend({
      events: {
        'click #submit-text': 'click_submit_text',
        'click #cancel-text': 'click_cancel_text'
      },

      template: NewTextTemplate,

      render: function() {
        this.$el.html(this.template.render());
        return this;
      },

      click_submit_text: function() {
        console.log('猜猜我运行了几次');
        var content = jQuery('textarea').val();
        var notes = new App.collections.Notes;
        var note = notes.create({content:content});
        App.router.navigate('profile', {trigger: true});
      },

      click_cancel_text: function() {
        App.router.navigate('profile', {trigger: true});
      }
    }),

    EditTextPage: App.MainView.extend({
      events: {
        'click #submit-text': 'click_submit_text',
        'click #cancel-text': 'click_cancel_text'
      },

      template: EditTextTemplate,

      initialize: function(options) {
        this.note_id = options.note_id;
        this.note = new App.models.Note({id: this.note_id});
        this.note.fetch();
        console.log(this.note);
      },

      render: function() {
        var self = this;
        var note = new App.models.Note({id: this.note_id});
        note.fetch({
          silent: true,
          success: function() {
            self.$el.html(self.template.render(note.toJSON()));
          }
        });
        return this;
      },

      click_submit_text: function() {
        console.log('猜猜我运行了几次');
        var content = jQuery('textarea').val();
        var note = note.save({content:content});
        App.router.navigate('profile', {trigger: true});
      },

      click_cancel_text: function() {
        App.router.navigate('profile', {trigger: true});
      }
    })







  }

  App.views = views;
})
