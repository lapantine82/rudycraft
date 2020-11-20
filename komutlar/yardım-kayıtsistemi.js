const Discord = require('discord.js');
const botadi = "Palermo"
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = function(client, message) {
const embed = new Discord.RichEmbed()
.setColor("BLUE")
.setTitle(`${botadi} | Kayıt Sistemi`)
.setTimestamp()
.addField('<:palermo:755436609062830152> Üye Kayıt', `Üyeleri Kayıt Yaparsınız.\nKullanım: **${ayarlar.prefix}üye <@Kişi> <İsim> <Yaş>**`)
.addField('<:palermo:755436609062830152> Bayan Kayıt', `Bayanları Kayıt Yaparsınız.\nKullanım: **${ayarlar.prefix}bayan <@Kişi> <İsim> <Yaş>**`)
.addField('<:palermo:755436609062830152> Kayıtsız Rol Ayarla', `Kayıtsız Rolünu Ayarlarsınız.\nKullanım: **${ayarlar.prefix}kayıtsız-rol <@rol>**`)
.addField('<:palermo:755436609062830152> Kayıtlı Rol Ayarla', `Kayıt Edildikten Sonra Verilen Rolü Ayarlarsınız.\nKulanım: **${ayarlar.prefix}kayıtlı-rol <@rol>**`)
.addField('<:palermo:755436609062830152> Yetkili Rol Ayarla', `Kayıtı Yapan Rolu Belirler.\nKullanım: **${ayarlar.prefix}yetkili-rol <@rol>**`)
.setFooter(`${botadi} | Kayıt Sistemi`, client.user.avatarURL)
.setTimestamp()
.setThumbnail(client.user.avatarURL)
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ['kayıtsistemi', 'kayıt-yardım'], 
  permLevel: 0 
};

exports.help = {
  name: 'kayıt-sistemi',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım'
};