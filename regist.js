// Register service worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function(){
      navigator.serviceWorker
      .register("/service-worker.js")
      .then(function(){
          console.log("Pendaftaran ServiceWorker berasil");
      })
      .catch(function () {
          console.log("Pendaftaran ServiceWorker gagal");
      });
    });
} else {
    console.log("ServiceWorker belum didukung browser ini")
}

document.addEventListener("DOMContentLoaded", function() {
    getMatches();
});