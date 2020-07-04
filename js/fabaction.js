document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const isFromSaved = urlParams.get("saved");
    const saveFab = document.getElementById("save");
    const deleteFab = document.getElementById("delete");
    const idParam = urlParams.get("id");
    
    if(isFromSaved) {
        saveFab.style.display = "none";
        getSavedTeamById();
        deleteFab.onclick = function() {
            console.log("Tombol DeleteFAB di klik.");
            deleteTeam(idParam);
        };
    } else {
        deleteFab.style.display = "none";
        const item = getTeamDetail();
        saveFab.onclick = function() {
            console.log("Tombol SaveFAB di klik.");
            item.then(function(data) {
            saveTeam(data)
        });
    }
    }
});