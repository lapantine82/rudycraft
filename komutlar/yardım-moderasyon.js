const db = require("quick.db");
const Discord = require('discord.js');
const fynx = require("../ayarlar.json");
exports.run = async (client, message, args) => { 
let prefix = await db.fetch(`prefix.${message.guild.id}`) || fynx.prefix 
let eklenti = new Discord.RichEmbed()  
.setAuthor(`Pirate Moderasyon Komutları`, client.user.avatarURL)
.setColor('#ffd100')
.setDescription(` Palermo botumuzu eklemek için \`${prefix}davet\` yazabilirsiniz.`)  
.addField(`__Reklam Engel__`,` \`${prefix}reklam-engel\` Sunucunzuda Reklamları Engeller`,true)
.addField(`__Reklam Kick__`,` \`${prefix}reklam-kick\` Sunucunuzda Reklam Yapanları 3 Uyarıda Kickler`,true)
.addField(`__Ban__`,` \`${prefix}ban\`  Sunucunuzda Belirtiğiniz Kişiyi Banlar`,true)
.addField(`__Kick__`,` \`${prefix}kick\` Sunucunuzda Belirtiğiniz Kişiyi Kickler `,true)
.addField(`__Unban__`,` \`${prefix}unban\`  Sunucunuzda Belirtiğiniz İD'nin Banını Açar`,true)
.addField(`__Mod Log__`,` \`${prefix}modlog\` Sunucunuzda Moderasyon Kayıtlarını Tuttar`,true)
.addField(`__Ban Say__`,` \`${prefix}bansay \` Sunucunuzdan Kimlerin Banlandığını Görebilirsiniz`,true)
.addField(`__Banaffı__`,` \`${prefix}banaffı \` Sunucunuzdan Banlanan Herkesin Banını Açar `,true)
.addField(`__Yavaş Mod__`,` \`${prefix}yavaşmod \` Sunucunuzda Berirlenen Sohbete Yazma Delayı Koyabilirsiniz `,true)
.addField(`__Bilgilendirme__`,` \`${prefix}davet\` | Palermo'yu Sunucunuza Davet Edersiniz\n \`${prefix}botbilgi\` | Botun İstatistiklerini Gösterir `)
 message.channel.send(eklenti) 
  };
  exports.conf = {
    enabled: true,  
    guildOnly: false, 
    aliases: ["moderasyon","ayarlar"], 
    permLevel: 0
  };
  exports.help = {
    name: 'moderasyon'
  }; 
  