const SimpleYoutubeApi = require('simple-youtube-api');

const youtube = new SimpleYoutubeApi('API_KEY');

// Channel ID - UCaSM4GqhbaVmRT7fmmFmR1w

youtube.searchVideos('', 10, { channelID: 'UCaSM4GqhbaVmRT7fmmFmR1w' })
  .then((results) => {
    console.log(results);
  })
  .catch(console.error);
