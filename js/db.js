const dbPromised = idb.open("footballdb", 1, function(upgradeDb) {
    const teamsObjectStore = upgradeDb.createObjectStore("teams", {keyPath: "id"});
    teamsObjectStore.createIndex("name", "name", {unique: false});
});

function saveTeam(data) {
    dbPromised
        .then(function(db) {
            const tx = db.transaction("teams", "readwrite");
            const store = tx.objectStore("teams");
            console.log(data);
            store.put(data);
            return tx.complete;
        })
        .then(function() {
            M.toast({html: 'Team berhasil disimpan!', classes: 'rounded'});
        });
}

function getAll() {
    return new Promise(function(resolve, reject) {
        dbPromised
            .then(function(db) {
                const tx = db.transaction("teams", "readonly");
                const store = tx.objectStore("teams");
                return store.getAll();
            })
            .then(function(data) {
                resolve(data);
            });
    });
  }

function getTeamById(idParam) {
    return new Promise(function(resolve, reject) {
        dbPromised
            .then(function(db) {
                const tx = db.transaction("teams", "readonly");
                const store = tx.objectStore("teams");
                return store.get(parseInt(idParam));
            })
            .then(function(data) {
                resolve(data);
            });
    });
}

function deleteTeam(idParam) {
    dbPromised
        .then(function(db) {
            const tx = db.transaction("teams", "readwrite");
            const store = tx.objectStore("teams");
            store.delete(parseInt(idParam));
            return tx.complete;
        })
        .then(function() {
            M.toast({html: 'Team berhasil dihapus!', classes: 'rounded'});
        })
}