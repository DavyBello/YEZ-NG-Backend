const keystone = require('keystone');

module.exports = async (event, payload) => {
  const Notification = keystone.list('Notification').model;
  const NotificationRecipient = keystone.list('NotificationRecipient').model;

  const pubsub = require('../pubsub');
  const {
    notification,
    userIds = [],
    channel = event.label,
    channels = [],
  } = await event.getNotification(payload);
  // const { notification, channel } = await event.getNotification(payload);
  const _notification = new Notification({
    ...notification,
    eventType: event.label,
  });

  if (userIds.length > 0) {
    await _notification.save();
    NotificationRecipient.insertMany(userIds.map(userId => ({
      notificationId: _notification._id,
      userId,
    })));

    if (Array.isArray(channels) && channels.length) {
      channels.map(c => pubsub.publish(c, _notification));
    } else {
      pubsub.publish(channel, _notification);
    }
  }
};
