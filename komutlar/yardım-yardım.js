const Discord = require('discord.js');
const botadi = "Palermo"
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = function(client, message) {
const embed = new Discord.RichEmbed()
.setColor("BLUE")
.setTitle(`${botadi} | Komut Grupları`)
.setTimestamp()
.addField('<:palermo:755436609062830152> __Eğlence Komutları__', `\n\n» ${ayarlar.prefix}eğlence`,true)
.addField('<:palermo:755436609062830152> __Kullanıcı Komutları__', `\n\n» ${ayarlar.prefix}kullanıcı`,true)
.addField('<:palermo:755436609062830152> __Moderatör Komutları__', `\n\n» ${ayarlar.prefix}moderasyon`,true)
.addField('<:palermo:755436609062830152> __Gelişmiş Sistemler__', `\n\n» ${ayarlar.prefix}sistemler`,true)
.addField('<:palermo:755436609062830152> __Nsfw | Gif  Komutları__', `\n\n» ${ayarlar.prefix}nsfw-gif`,true)
.addField(`__Bilgilendirme__`,` \`${prefix}davet\` | Palermo'yu Sunucunuza Davet Edersiniz\n \`${prefix}botbilgi\` | Botun İstatistiklerini Gösterir `)

.setFooter(`${botadi} | Komut Grupları`, client.user.avatarURL)
.setTimestamp()
.setThumbnail(client.user.avatarURL)
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: [''], 
  permLevel: 0 
};

exports.help = {
  name: 'yardım',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım'
};