const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

let botid = ('702922751962382449') //bu yere botun id'sini yapıştırın.
//eğer botunuz dbl(discord bot list) de yoksa Bota Oy Ver (Vote) olmucaktır.

exports.run = (client, message, args) => {
    const embed = new Discord.RichEmbed()
        .setAuthor(`${client.user.username} `, client.user.avatarURL)
        .setColor('BLUE')
        .setTitle(`${client.user.username} - Otorol Komutları Listesi`)
        .setDescription(` • | **${ayarlar.prefix}otorol** : Sunucuya Yeni Katılan Kullanıcılara Verilecek Rolü Ayarlarsınız.\n • | **${ayarlar.prefix}otorol-sıfırla** : Ayarlanmış Otorol Sistemini Sıfırlarsınız.\n • | **${ayarlar.prefix}otorol-mesaj** : Otorol Uygulandığında Gönderilecek Mesajı Oluşturursunuz.\n • | **${ayarlar.prefix}otorol-mesaj-sıfırla** : Otorol Mesajını Sıfırlarsınız.`)  
.addField(`» Linkler`, `[Bot Davet Linki](https://discord.com/api/oauth2/authorize?client_id=710305040698572851&permissions=8&scope=bot) **|** [Destek Sunucusu](https://discord.gg/invite/ej2dG4M)`)      .setFooter(`Palermo | Bot Sürümü : v0.2 | Varsayılan Prefix : p!`, client.user.avatarURL)
    return message.channel.sendEmbed(embed);
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['otomatikrol','otorol-sistemi','otorolsistemi'],
  permLevel: 0,
};

exports.help = {
  name: 'otorolsistemi',
  description: '',
  usage: ''
};