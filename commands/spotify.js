  // NOTE: This command requires discord version `master/v0.12` which can be installed by doing `npm i hydrabolt/discord.js`
const Discord = require('discord.js');
const moment = require('moment')

exports.run = function(client, message, args) {
  // First, we need to grab the user, if they are doing it for themselves or mentioning someone.
  let user = message.mentions.users.first() || message.author; // This checks if there is a mention, and takes the first one. Although, if there isn't a mention it uses the message author as a fallback.
  // Next, we need to verify that the specified user is listening to spotify.
  if (user.presence.activity !== null && user.presence.activity.type === 'LISTENING' && user.presence.activity.name === 'Spotify' && user.presence.activity.assets !== null) { // This checks all of these if statements, and if they are all true, it runs the following.
    
    // Variables - These are the variables we will be using in the embed
    let trackIMG = `https://i.scdn.co/image/${user.presence.activity.assets.largeImage.slice(8)}`; // This fetches a url image using the largeImage asset after slicing off the first 8 characters.
    let trackURL = `https://open.spotify.com/track/${user.presence.activity.syncID}`; // This grabs the syncID and adds it to the end of a spotify URL.
    let trackName = user.presence.activity.details; //parça adı
    let trackAuthor = user.presence.activity.state; //Sanatçı
    let trackAlbum = user.presence.activity.assets.largeText; // These all hold the info for the song, grabbed from the user's presence.



    //message.channel.send('user.presence.activity.name: ' + user.presence.activity.name + '\n' + 'user.presence.activity.type: ' + user.presence.activity.type + '\n' +
     //'user.presence.activity.details: ' + user.presence.activity.details + '\n' + 'user.presence.activity.state: ' + user.presence.activity.state + '\n' + 
     //'user.presence.activity.applicationID: ' + user.presence.activity.applicationID + '\n' + 'user.presence.activity.timestamps: ' + 'Start: ' + moment(user.presence.activity.timestamps.start).format('DD-MM-YYYY HH:mm:ss') + 'End: ' + moment(user.presence.activity.timestamps.end).format('DD-MM-YYYY HH:mm:ss') + '\n' + 
     //'user.presence.activity.party: ' + user.presence.activity.party.id + '\n' + 'user.presence.activity.syncID: ' + user.presence.activity.syncID + 
     //'\n\n\n _Assets_\n' + 
     //'user.presence.activity.assets.largeTex: ' + user.presence.activity.assets.largeTex + '\n' + 'user.presence.activity.assets.smallText: ' + user.presence.activity.assets.smallText + '\n' + 
     //'user.presence.activity.assets.largeImage: ' + user.presence.activity.assets.largeImage + '\n' + 'user.presence.activity.assets.smallImage: ' + user.presence.activity.assets.smallImage);
 
console.log(user.presence.activity);

    // Create embed object
    const embed = new Discord.MessageEmbed() // This will create the start of the embed, we will now add to it.
      .setAuthor('Spotify Parça Bilgisi', 'https://cdn.discordapp.com/emojis/408668371039682560.png') // This url will be in the description, it is setting the author & icon field for the embed.
      .setColor(0x1ED760) // This sets the color of the embed
      .setThumbnail(trackIMG) // This sets the thumbnail of the embed, using the variable from before.
      .addField('Parça İsmi', trackName, true) // These are fields, and can be added easily, the true signifies that they can be on the same line.
      .addField('Albüm', trackAlbum, true)
      .addField('Sanatçı', trackAuthor, true) // This signifies only two can be on the line above, the third will be on a new line
      .addField('Parça Dinlemek için:', `[${trackURL}](trackURL)`, true); // This here sets a clickable link, to the trackURL, while still showing the URL in ``.

    // Sending Embed
    message.channel.send(embed); // This sends the formed embed to the channel.

    // Now, we can test it.

  } else { // Although, if one of those conditions is false it will run this.

    message.channel.send('**Bu kullanıcı __"Spotify"__ dinlemiyor!**'); // This will notify in chat that the specified user isn't listening to Spotify.

  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'spotify',
  description: '__Spotify__ dinleyen birinin parça bilgilerini görüntüler',
  usage: 'spotify (@bahsetme)'
};
