const Discord = require('discord.js');

exports.run = (client, message) => {
      const random = Math.floor(Math.random() * 100) + 1
      message.channel.send(`Azgınlık seviyeniz %${random} Azgınlık `)
   } 
 
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: [],
 permLevel: 0
}

exports.help = {
 name: 'azgınlıgım',
 description: 'Azgınlık ölç',
 usage: 'efkar Ölç'
};