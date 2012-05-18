(function(w) {

  DB = {
    database: createDatabase(),
    executeSql: executeSql,
    createTable: createTable,
    createNote: createNote,
    updateNote: updateNote,
    getNote: getNote,
    getNotes: getNotes
  };

  w.DB = DB;

  function createDatabase() {
   return  w.openDatabase('note', '1.0', 'note', 1024*1024);
  }

  function executeSql(query, args, success_callback) {
    this.database.transaction(function(tx) {
      tx.executeSql(query, args,
                    success_callback,
                    function(tx, error) {console.log(query, error)});
    });
  }

  function createTable() {
    this.executeSql(['CREATE TABLE IF NOT EXISTS notes(',
                     'id INTEGER PRIMARY KEY,',
                     'content TEXT NOT NULL,',
                     'created_at INTEGER NOT NULL,',
                     'updated_at INTEGER',
                     ')'].join(''), []);
  }

  function createNote(content, success_callback) {
    this.executeSql('INSERT INTO notes(content, created_at) VALUES (?, ?)', [content, Date.now()], success_callback);
  }

  function updateNote(id, content, success_callback) {
    this.executeSql(['UPDATE notes',
                     'SET content = ?, updated_at = ?',
                     'WHERE id = ?'
                    ].join(' '), [content, Date.now(), ~~id], success_callback);
  }

  function getNote(id, success_callback) {
    this.executeSql('SELECT * FROM notes WHERE id=?',
                    [id], success_callback);
  }

  function getNotes(success_callback) {
    this.executeSql('SELECT * FROM notes', [], success_callback)
  }

})(window);
