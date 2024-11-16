const admin = require('firebase-admin');

// Initialize Firebase Admin SDK (make sure it's initialized correctly somewhere in your app)
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const sendPushNotification = (user, message) => {
  const payload = {
    notification: {
      title: "New Open Call Created",
      body: message,
    },
  };

  // Assuming the user has a device token stored in user.pushToken
  admin.messaging().sendToDevice(user.pushToken, payload)
    .then((response) => {
      console.log('Successfully sent message:', response);
    })
    .catch((error) => {
      console.log('Error sending message:', error);
    });
};
