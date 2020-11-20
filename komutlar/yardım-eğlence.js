const Discord = require('discord.js');
const botadi = "Palermo"
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = function(client, message) {
const embed = new Discord.RichEmbed()
.setColor("BLUE")
.setTitle(`${botadi} | Eğlence Komutları`)
.setTimestamp()
.addField('<:palermo:755436609062830152> 8ball', `» Sihirli 8ball sorularınızı cevaplar.\nKullanım: **${ayarlar.prefix}8ball <soru>**`)
.addField('<:palermo:755436609062830152> Afewlater', `**»** 5 Dakika Sonra Efekt'i Verir.\nKullanım: **${ayarlar.prefix}afewlater**`)
.addField('<:palermo:755436609062830152> Ateş Et', `**»** Kişiye Ateş Edersiniz.\nKullanım: **${ayarlar.prefix}ateşet**`)
.addField('<:palermo:755436609062830152> Ambulans Ara', `**»** Ambulans'ı Ararsınız.\nKulanım: **${ayarlar.prefix}ara112**`)
.addField('<:palermo:755436609062830152> Polis Ara', `**»** Polis'i Ararsınız.\nKullanım: **${ayarlar.prefix}ara155**`)
.addField('<:palermo:755436609062830152> Azgınlık Ölçerl', `**»** Azgınlık Seviyenizi Ölçer.\nKullanım: **${ayarlar.prefix}azgınlığım**`)
.addField('<:palermo:755436609062830152> Aşk Ölçer', `**»** Kişi İle Aranızdaki Aşkı Ölçer.\nKullanım: **${ayarlar.prefix}aşkçlöer <@kişi>**`)
.addField('<:palermo:755436609062830152> Efkar Ölçer', `**»**  Efkarınızı Ölçer.\nKullanım: **${ayarlar.prefix}efkarölçer**`)
.addField('<:palermo:755436609062830152> Boks Makinası', `**»** Boks makinesine vurur.\nKulanım: **${ayarlar.prefix}yumrukat**`)
.addField('<:palermo:755436609062830152> Balıktut', `**»** Rastgele Balık Tutarsınız.\nKullanım: **${ayarlar.prefix}balıktut**`)
.setFooter(`${botadi} | Eğlence Komutları`, client.user.avatarURL)
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
  name: 'eğlence',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım'
};