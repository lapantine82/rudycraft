const Discord = require('discord.js');
const botadi = "Palermo"
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = function(client, message) {
const embed = new Discord.RichEmbed()
.setColor("BLUE")
.setTitle(`${botadi} | Kullanıcı Komutları`)
.setTimestamp()
.addField('<:palermo:755436609062830152> __Banner__', `» Yazdığınız Yazıya Banner Yapar.\nKullanım: **${ayarlar.prefix}banner <yazı>**`,true)
.addField('<:palermo:755436609062830152> __Uğurlu Sayı__', `**»** Uğurlu Burç Sayınıcı Söyler.\nKullanım: **${ayarlar.prefix}burç <burcunuz>**`,true)
.addField('<:palermo:755436609062830152> __Davet Oluştur__', `**»** Sunucu Daveti Oluşturur.\nKullanım: **${ayarlar.prefix}davetoluştur**`,true)
.addField('<:palermo:755436609062830152> __Emoji Yükle__', `**»** Emoji Yüklersiniz.\nKulanım: **${ayarlar.prefix}emoji-yükle <link> <isim>**`,true)
.addField('<:palermo:755436609062830152> __Havadurumu__', `**»** Havadurumunu Gösterir.\nKullanım: **${ayarlar.prefix}havadurumu <şehir>**`,true)
.addField('<:palermo:755436609062830152> __İnstagram__', `**»** İnstagram Bilgilerini Görüntüler.\nKullanım: **${ayarlar.prefix}instagram <k.adı>**`,true)
.addField('<:palermo:755436609062830152> __Profil__', `**»** Discord profilini Gösterir.\nKullanım: **${ayarlar.prefix}profil <@etiket>**`,true)
.addField('<:palermo:755436609062830152> __Spotify__', `**»**  Spotify Bilgilerini Görüntüler.\nKullanım: **${ayarlar.prefix}spotify <@etiket>**`,true)
.addField('<:palermo:755436609062830152> __Tekerleme__', `**»** Rastgele Tekerleme Atar.\nKulanım: **${ayarlar.prefix}tekerleme**`,true)
.setFooter(`${botadi} | Kullanıcı Komutları`, client.user.avatarURL)
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
  name: 'kullanıcı',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım'
};