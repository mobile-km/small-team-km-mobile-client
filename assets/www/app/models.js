define(
['backbone', 'app', 'websql'],
function(Backbone, App) {
  App.db = openDatabase('notes', '1.0', 'notes', 1024*1024);
  var Note = Backbone.Model.extend({});
  var Notes = Backbone.Collection.extend({
    model: Note,
    store: new App.WebSQLStore(App.db, 'notes')
  });

  App.models = {};
  App.collections = {};
  App.models.Note = Note;
  App.collections.Notes = Notes;
});
