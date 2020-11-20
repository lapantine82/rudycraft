const Discord = require("discord.js");
const moment = require("moment");
const os = require('os');
require("moment-duration-format");
exports.run = async (bot, message, args) => {
   const seksizaman = moment.duration(bot.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
   const istatistikler = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setFooter('Palermo \'Buyur benim istatistiklerim', bot.user.avatarURL)
  .addField("»  **Geliştirici** ","<@653851272625258509>")
  .addField("<:ram:754238039756111883> **Bellek kullanımı**", (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + ' MB', true)  
  .addField("<:alma:754238039668162570> **Çalışma süresi**", seksizaman)
  .addField("<:kullanc:754238040112758876> **Kullanıcılar**" , bot.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString(), true)
  .addField("<:sunucu:754238040066752542> **Sunucular**", bot.guilds.size.toLocaleString(), true)
  .addField("<:kanallar:754238040268079224> **Kanallar**", bot.channels.size.toLocaleString(), true)
  .addField("<:dc:754238039781408818> **Discord.JS sürüm**", "v"+Discord.version, true)
  .addField("<:node:754238039856775260> **Node.JS sürüm**", `${process.version}`, true)
  .addField("<:ping:754238040292982844> **Ping**", bot.ping+" ms", true)
  .addField("<:cpu:754238039147937813> **CPU**", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
  .addField("<:bit:754238039529881682> **Bit**", `\`${os.arch()}\``, true)
  .addField("<:iletim:754238040372936784> **İşletim Sistemi**", `\`\`${os.platform()}\`\``) 
  .addField("⚔️ **Bot Davet**", " [Davet Et](https://discord.com/api/oauth2/authorize?client_id=710305040698572851&permissions=8&scope=bot)", )
  .addField("<:destek:754238039584276521> ** Destek Sunucusu**", " [Sunucumuza Katıl](https://discord.gg/9kXmAWD)", )
  .addField("<a:dbl:754238039726751744> **Voteleme sayfası**", " [Botu votele](https://top.gg/bot/710305040698572851/vote)", )
 return message.channel.send(istatistikler);
  };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [ 'i'],
  permLevel: 0
};

exports.help = {
  name: "istatistik",
  description: "Bot i",
  usage: "istatistik"
};
