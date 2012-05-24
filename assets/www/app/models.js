define(
['backbone', 'app', 'websql'],
function(Backbone, App) {
  App.db = openDatabase('notes', '1.0', 'notes', 1024*1024);
  var Note = Backbone.Model.extend({
    validate: function(attrs) {
      if (!attrs.content) {
        this.trigger('error');
        throw 'content should not be empty!';
      }
    }
  });

  Note.prototype.on('error', function(note, err) {
    console.log('aaaaa!');
    jQuery('.error').show();
  });

  var Notes = Backbone.Collection.extend({
    model: Note,
    store: new App.WebSQLStore(App.db, 'notes')
  });

  App.models = {};
  App.collections = {};
  App.models.Note = Note;
  App.collections.Notes = Notes;
});
