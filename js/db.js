//pembuatan database
var dbPromised = idb.open("football", 1, function(upgradeDb) {
	var articlesObjectStore = upgradeDb.createObjectStore("teams", {
		keyPath: "id"
	});
	articlesObjectStore.createIndex("id", "id", { unique: false });
});

//save new team
function saveForLater(team) {
  dbPromised
    .then(function(db) {
      let tx = db.transaction("teams", "readwrite");
      let store = tx.objectStore("teams");
      console.log(team);
			store.add(team);
			// store.put(team);
			console.log("Team berhasil di simpan.");
      return tx.complete;
    })
		.catch((err) => {
      console.error("Team gagal disimpan", err);
    });
}

// get all teams
function getAll() {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        let tx = db.transaction("teams", "readonly");
        let store = tx.objectStore("teams");
        return store.getAll();
      })
      .then(function(teams) {
        resolve(teams);
      });
  });
}

// get team by id
function getById(id) {
	return new Promise(function(resolve, reject) {
	  dbPromised
		.then(function(db) {
		  let tx = db.transaction("teams", "readonly");
		  let store = tx.objectStore("teams");
		  return store.get(id);
		})
		.then(function(team) {
		  resolve(team);
		});
	});
}