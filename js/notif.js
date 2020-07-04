function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
};

if ("Notification" in window) {
    requestPermission();
} else {
    console.log("Browser tidak mendukung");
}

function requestPermission() {
    Notification.requestPermission().then(function (result) {
        if(result === "denied") {
            console.log("gaboleh")
            return;
        } else if (result === "default") {
            console.error("dialog ditutup")
            return;
        }

    console.log("boleh");

    if (("PushManager" in window)) {
        navigator.serviceWorker.getRegistration().then(function(reg) {
            reg.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array("BBeomLTg8idH-vGN6z0USv8LKVrK23bhHN3zf_qBemJ9TEkUudDonuSG42iLTUoU9ROvUGLX3ST40FDhQCSX4yw")
            }).then(function(subscribe) {
                console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
                console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                    null, new Uint8Array(subscribe.getKey('p256dh')))));
                console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                    null, new Uint8Array(subscribe.getKey('auth')))));
            }).catch(function(e) {
                console.log("Tidak dapat melakukan subscribe ", e.message);
                });
            });
        }
    });
}