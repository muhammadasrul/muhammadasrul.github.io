const webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BBeomLTg8idH-vGN6z0USv8LKVrK23bhHN3zf_qBemJ9TEkUudDonuSG42iLTUoU9ROvUGLX3ST40FDhQCSX4yw",
   "privateKey": "COz28WzLst3BKKHmJFhtebe859ii4Dq_NVSIaw8YBZU"
};
 
 
webPush.setVapidDetails(
   'mailto:asrulajipangestu@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
const pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/d1HBbnYXlqc:APA91bHWoSDFDVhlhOtZu_zuz5LzYL2VDY0cctYWmw698QKXcuWZ7AOifyrw1Z8Vma4FURk8QzAPON_1vHUGjOWAHF3cTUqZo8cGbhHhTm-YJ7-ym0PyCyykM-vWEddnP38yduHNpdnE",
   "keys": {
       "p256dh": "BAnp4zXQgtM+o0OXz0Z+bvU7aPb0wFxKjdO1VAAyFOtKLCAuAcNbQByQoW1iaKLOMl1UBbF2B/WrFGTmHq4njcE=",
       "auth": "2DvaIEpDgMitsM7pk8sLzA=="
   }
};
const payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
const options = {
   gcmAPIKey: '573241659860',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);