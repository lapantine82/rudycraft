
const Discord = require("discord.js");
const { Client, Util } = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const ayarlar = require("./ayarlar.json");
const { promisify } = require("util");
const chalk = require("chalk");
require("./util/eventLoader")(client);
const moment = require("moment");
const db = require("quick.db");
const ms = require("parse-ms");


const log = message => {
  console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Komut - ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};



client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);


///// MESAJ LOG /////


//SA - AS ////

client.on('message', async (msg, member, guild) => {
  let i = await  db.fetch(`saas_${msg.guild.id}`)
      if(i === 'açık') {
        if (msg.content.toLowerCase() === 'sa') {
        msg.reply('Aleyküm Selam Hoşgeldin');      
      } 
      }
    }); 


// SA - AS ///

// ANTİ SPAM // 

// ANTİ SPAM //

// Level Sistem //

// Level Sistem //

// GİRİŞ ÇIKIŞ // 

// GİRİŞ ÇIKIŞ //


//ÇEKİLİŞLER ///


//ÇEKİLİŞLER ///

//----------------------------------Özel oda sistemi Son--------------------------


///////////////////////////////////REKLAMENLGEL


client.on('message', async message => {
let aktif = await db.fetch(`reklamEngelPirate_${message.channel.id}`)
if (!aktif) return 
let reklamlar = ["discord.app", "discord.gg" ,"discordapp","discordgg", ".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az", ".cf", ".me", ".in"]
let kelimeler = message.content.slice(" ").split(/ +/g)
if (reklamlar.some(word => message.content.toLowerCase().includes(word))) {
if (message.member.hasPermission("BAN_MEMBERS")) return;
message.delete()
message.reply('<a:protec:756393266550800454> **Hey Dostum Bu Sunucuda Reklam Yasak**').then(msg => msg.delete(7000)) 
}
});
//Pirate Code
client.on("messageUpdate", async (oldMsg, newMsg) => {
let aktif = await db.fetch(`reklamEngelPirate_${oldMsg.channel.id}`)
if(!aktif) return
let reklamlar = ["discord.app", "discord.gg","discordapp","discordgg", ".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az", ".cf", ".me", ".in"]
let kelimeler = newMsg.content.slice(" ").split(/ +/g)
if (reklamlar.some(word => newMsg.content.toLowerCase().includes(word))) {
if (newMsg.member.hasPermission("BAN_MEMBERS")) return;
newMsg.delete()
oldMsg.reply('<a:protec:756393266550800454> **Hey Dostum Bu Sunucuda Reklam Yasak**').then(msg => msg.delete(7000)) 
}
});

////////////////////REKLAMENGEL



  client.on("guildMemberAdd", async(member) => {
    let sunucupaneli = await db.fetch(`sunucupanel_${member.guild.id}`)
    if(sunucupaneli) {
      let rekoronline = await db.fetch(`panelrekor_${member.guild.id}`)
      let toplamuye = member.guild.channels.find(x =>(x.name).startsWith("Toplam Üye •"))
      let toplamaktif = member.guild.channels.find(x =>(x.name).startsWith("Aktif Üye •"))
      let botlar = member.guild.channels.find(x =>(x.name).startsWith("Botlar •"))
      let rekoraktif = member.guild.channels.find(x =>(x.name).startsWith("Rekor Aktiflik •"))
      
      if(member.guild.members.filter(off => off.presence.status !== 'offline').size > rekoronline) {
        db.set(`panelrekor_${member.guild.id}`, member.guild.members.filter(off => off.presence.status !== 'offline').size)
      }
      try{
        toplamuye.setName(`Toplam Üye • ${member.guild.members.size}`)
        toplamaktif.setName(`Aktif Üye • ${member.guild.members.filter(off => off.presence.status !== 'offline').size}`)
        botlar.setName(`Botlar • ${member.guild.members.filter(m => m.user.bot).size}`)
        rekoraktif.setName(`Rekor Aktiflik • ${rekoronline}`)
     } catch(e) { }
    }
  })
  
  client.on("guildMemberRemove", async(member) => {
    let sunucupaneli = await db.fetch(`sunucupanel_${member.guild.id}`)
    if(sunucupaneli) {
      let rekoronline = await db.fetch(`panelrekor_${member.guild.id}`)
      let toplamuye = member.guild.channels.find(x =>(x.name).startsWith("Toplam Üye •"))
      let toplamaktif = member.guild.channels.find(x =>(x.name).startsWith("Aktif Üye •"))
      let botlar = member.guild.channels.find(x =>(x.name).startsWith("Botlar •"))
      let rekoraktif = member.guild.channels.
      find(x =>(x.name).startsWith("Rekor Aktiflik •"))
      
      if(member.guild.members.filter(off => off.presence.status !== 'offline').size > rekoronline) {
        db.set(`panelrekor_${member.guild.id}`, member.guild.members.filter(off => off.presence.status !== 'offline').size)
      }
      try{
        toplamuye.setName(`Toplam Üye • ${member.guild.members.size}`)
        toplamaktif.setName(`Aktif Üye • ${member.guild.members.filter(off => off.presence.status !== 'offline').size}`)
        botlar.setName(`Botlar • ${member.guild.members.filter(m => m.user.bot).size}`)
        rekoraktif.setName(`Rekor Aktiflik • ${rekoronline}`)
     } catch(e) { }
    }
  })





//////////////////////////////////////////REKLAMKİCK

 client.on("message", async message => {
      let uyarisayisi = await db.fetch(`reklamuyari_${message.author.id}`);
      let reklamkick = await db.fetch(`reklamkick_${message.guild.id}`)
      let kullanici = message.member;
      if (reklamkick == 'kapali') return;
      if (reklamkick == 'acik') {
          const reklam = ["discord.app", "discord.gg", "invite", "discordapp", "discordgg", ".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az",];
          if (reklam.some(word => message.content.toLowerCase().includes(word))) {
              if (!message.member.hasPermission("ADMINISTRATOR")) {
                  message.delete();
                  db.add(`reklamuyari_${message.author.id}`, 1) //uyarı puanı ekleme
                  if (uyarisayisi === null) {
                      let uyari = new Discord.RichEmbed()
                          .setColor("#ffd100")
                          .setFooter('Palermo BOT', client.user.avatarURL)
                          .setDescription(`<a:protec:756393266550800454> **<@${message.author.id}> Reklam Kick Sistemine Yakalandın! Reklam Yapmaya Devam Edersen Kickleniceksin (1/3)**`)
                          .setTimestamp()
                      message.channel.send(uyari)                
  }
                  if (uyarisayisi === 1) {
                      let uyari = new Discord.RichEmbed()
                          .setColor("#ffd100")
                          .setFooter('Palermo BOT ', client.user.avatarURL)
                          .setDescription(`<a:protec:756393266550800454> **<@${message.author.id}> Reklam Kick Sistemine Yakalandın! Reklam Yapmaya Devam Edersen Kickleniceksin (2/3)**`)
                          .setTimestamp()
                      message.channel.send(uyari)
                  }
                  if (uyarisayisi === 2) {
                      message.delete();
                      await kullanici.kick({
                          reason: `Reklam kick sistemi`,
                      })
                      let uyari = new Discord.RichEmbed()
                          .setColor("#ffd100")
                          .setFooter('Palermo BOT', client.user.avatarURL)
                          .setDescription(`<a:protec:756393266550800454> **<@${message.author.id}> 3 Adet Reklam Uyarısı Aldığı İçin Kicklendi. Bir Kez Daha Yaparsa Banlanacak**`)
                          .setTimestamp()
                      message.channel.send(uyari)
                  }
                  if (uyarisayisi === 3) {
                      message.delete();
                      await kullanici.ban({
                          reason: `Pirate Reklam Kick Sistemi`,
                      })
                      db.delete(`reklamuyari_${message.author.id}`)
                      let uyari = new Discord.RichEmbed()
                          .setColor("#ffd100")
                          .setFooter('Palermo BOT', client.user.avatarURL)
                          .setDescription(`<a:protec:756393266550800454>  **<@${message.author.id}> Kick Yedikten Sonra Tekrar Devam Ettiği İçin Banlandı.**`)
                          .setTimestamp()
                      message.channel.send(uyari)
                  }

              }
          }
      }
  });


///////////////////////reklamkick


//Kayıtsız Rol Ayarlama

client.on('guildMemberAdd', async member => {
 let kayıtszrol = await db.fetch(`kayıtsızrol_${member.guild.id}`)
 if (!kayıtszrol) return;
  member.addRole(member.guild.roles.get(kayıtszrol))

});

//Kayıtsız Rol Ayarlama Son
client.on("message", async message => {
  const a = message.content.toLowerCase();
  if (
    a === "slam" ||
    a === "sa" ||
    a === "selamun aleyküm" ||
    a === "selamın aleyküm" ||
    a === "selam" ||
    a === "slm"
  ) {
    let i = await db.fetch(`saas_${message.guild.id}`);
    if (i === "acik") {
      const embed = new Discord.RichEmbed()
        .setColor("BLUE")
        .setDescription(
          `:wave: **Aleyküm Selam, Hoşgeldin Dostum! ^-^**`
        )

      message.channel.send(embed).then(msg => msg.delete(5000));
    }
  }
});


const invites = {};

const wait = require("util").promisify(setTimeout);

client.on("ready", () => {
  wait(1000);

  client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});



//////////////////////////////////////////////////////////////////////////////
client.on("guildMemberAdd", async member => {
  let rol = await db.fetch(`otorol_${member.guild.id}`);
  let kanal = await db.fetch(`otokanal_${member.guild.id}`);
  let msj = await db.fetch(`otorolmsj_${member.guild.id}`);
  if (!rol) return;
  if (!kanal) return;

  member.addRole(rol);
  if (!msj) {
    const embed = new Discord.RichEmbed()
      .setColor("BLUE")
      .setDescription(
        `- <:tik:743171858160943220>  :loudspeaker: **@${member.user.tag}** adlı şahsa rolü verildi! :inbox_tray:`
      )
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.get(kanal).send(embed);
    return;
  } else {
    var msj2 = msj
      .replace(`-sunucu-`, `${member.guild.name}`)
      .replace(`-uye-`, `${member.user.tag}`)
      .replace(`-uyetag-`, `<@${member.user.id}>`)
      .replace(`-rol-`, `${member.guild.roles.get(rol).name}`);
    const embed = new Discord.RichEmbed()
      .setColor("BLUE")
      .setDescription(msj2)
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.get(kanal).send(embed);
    return;
  }
});
//////////////////////////////////////////////////////////////////////////////

client.on("guildMemberAdd", async member => {
  let rol = await db.fetch(`sayaçhedef_${member.guild.id}`);
  let kanal = await db.fetch(`sayaçkanal_${member.guild.id}`);
  let msj = await db.fetch(`sayaçmsjhg_${member.guild.id}`);
  if (!rol) return;
  if (!kanal) return;

  if (rol == member.guild.memberCount) {
    const embed = new Discord.RichEmbed()
      .setColor("BLUE")
      .setDescription(`<a:gifmoon_gift10:690487223573020694> Tebrikler! başarılı bir şekilde ${rol} kişi olduk!`)
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.get(kanal).send(embed);
    db.delete(`sayaçhedef_${member.guild.id}`);
    db.delete(`sayaçkanal_${member.guild.id}`);
    db.delete(`sayaçmsjhg_${member.guild.id}`);
    db.delete(`sayaçmsjbb_${member.guild.id}`);
    return;
  }
  if (rol < member.guild.memberCount) {
    const embed = new Discord.RichEmbed()
      .setColor("BLUE")
      .setDescription(`<a:gifmoon_gift10:690487223573020694> Tebrikler! başarılı bir şekilde ${rol} kişi olduk!`)
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.get(kanal).send(embed);
    db.delete(`sayaçhedef_${member.guild.id}`);
    db.delete(`sayaçkanal_${member.guild.id}`);
    db.delete(`sayaçmsjhg_${member.guild.id}`);
    db.delete(`sayaçmsjbb_${member.guild.id}`);
    return;
  }
  if (!msj) {
    const embed = new Discord.RichEmbed()
      .setColor("BLUE")
      .setDescription(
        `- <a:brav:742624573798744095> **@${
          member.user.tag
        }** adlı şahsa aramıza katıldı! ${rol} kişi olmamıza ${rol -
          member.guild.memberCount} kişi kaldı! :inbox_tray:`
      )
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.get(kanal).send(embed);
    return;
  } else {
    var msj2 = msj
      .replace(`-sunucu-`, `${member.guild.name}`)
      .replace(`-uye-`, `${member.user.tag}`)
      .replace(`-uyetag-`, `<@${member.user.id}>`)
      .replace(`-hedef-`, `${rol}`)
      .replace(`-hedefkalan-`, `${rol - member.guild.memberCount}`);
    const embed = new Discord.RichEmbed()
      .setColor("BLUE")
      .setDescription(msj2)
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.get(kanal).send(embed);
    return;
  }
});

///////////////////////////////////////

client.on("guildMemberAdd", async member => {
  let rol = await db.fetch(`ototag_${member.guild.id}`);
  let kanal = await db.fetch(`ototagk_${member.guild.id}`);
  let msj = await db.fetch(`ototagmsj_${member.guild.id}`);
  if (!rol) return;
  if (!kanal) return;

  if (!msj) {
    member.setNickname(`${rol} | ${member.user.username}`);
    const embed = new Discord.RichEmbed()
      .setColor("BLUE")
      .setDescription(
        `<a:gifmoon_blueverifed:690487232204898324> **@${member.user.tag}** adlı şahsa tag verildi!`
      )
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.get(kanal).send(embed);
    return;
  } else {
    var msj2 = msj
      .replace(`-uye-`, `${member.user.username}`)
      .replace(`-tag-`, `${rol}`);
    member.setNickname(msj2);
    const embed = new Discord.RichEmbed()
      .setColor("BLUE")
      .setDescription(
        `<a:gifmoon_blueverifed:690487232204898324> **@${member.user.tag}** adlı şahsa tag verildi!`
      )
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.get(kanal).send(embed);
    return;
  }
});
//////////////////////////////////////////////////////////////////////////////
client.on("message", async message => {
  let ever = await db.fetch(`ever_${message.guild.id}`);
  let sayı = await db.fetch(`sayi_${message.author.id}`);
  if (ever === "acik") {
    const a = message.content;
    if (a === "@everyone" || a === "@here") {
      if (message.member.hasPermission("BAN_MEMBERS")) return;
      db.add(`sayi_${message.author.id}`, 1);
      if (sayı == null) {
        const embed = new Discord.RichEmbed()
          .setColor("BLUE")
          .setDescription(
            "Bu 1. uyarın! Lütfen tekrarlama! Aksi taktirde atılacaksın!\n(1/3)"
          )
          .setFooter(client.user.username, client.user.avatarURL);
        message.channel.send(embed);
        message.delete();
        return;
      }
      if (sayı === 1) {
        const embed = new Discord.RichEmbed()
          .setColor("BLUE")
          .setDescription(
            "Bu 2. uyarın! Lütfen tekrarlama! Aksi taktirde atılacaksın!\n(2/3)"
          )
          .setFooter(client.user.username, client.user.avatarURL);
        message.channel.send(embed);
        message.delete();
        return;
      }
      if (sayı > 2) {
        message.delete();
        const embed = new Discord.RichEmbed()
          .setColor("BLUE")
          .setDescription("Sunucudan atılıyorsun!")
          .setFooter(client.user.username, client.user.avatarURL);
        message.channel.send(embed);
        db.delete(`sayi_${message.author.id}`);
        message.member.kick();
        return;
      }
    }
  } else {
    return;
  }
});

client.on("guildMemberRemove", async member => {
  let rol = await db.fetch(`sayaçhedef_${member.guild.id}`);
  let kanal = await db.fetch(`sayaçkanal_${member.guild.id}`);
  let msj = await db.fetch(`sayaçmsjbb_${member.guild.id}`);
  if (!rol) return;
  if (!kanal) return;

  if (!msj) {
    const embed = new Discord.RichEmbed()
      .setColor("BLUE")
      .setDescription(
        `- <:x_:743171857997365330>  **@${
          member.user.tag
        }** adlı şahsa aramızdan ayrıldı! ${rol} kişi olmamıza ${rol -
          member.guild.memberCount} kişi kaldı! :inbox_tray:`
      )
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.get(kanal).send(embed);
    return;
  } else {
    var msj2 = msj
      .replace(`-sunucu-`, `${member.guild.name}`)
      .replace(`-uye-`, `${member.user.tag}`)
      .replace(`-uyetag-`, `<@${member.user.id}>`)
      .replace(`-hedef-`, `${rol}`)
      .replace(`-hedefkalan-`, `${rol - member.guild.memberCount}`);
    const embed = new Discord.RichEmbed()
      .setColor("BLUE")
      .setDescription(msj2)
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.get(kanal).send(embed);
    return;
  }
});

//////////////////////////MODLOG///////////////////
client.on('messageDelete', async message   => { // mod-log
      let modlogs = db.get(`log_${message.guild.id}`)
    const modlogkanal = message.guild.channels.find(kanal => kanal.id === modlogs);    
if (!modlogkanal) return;
  const embed = new Discord.RichEmbed()
  .setColor("#ffd100")
  .setTitle("MESAJ SİLİNDİ")
.setDescription(`<:log:756386372994203718> <@!${message.author.id}> adlı kullanıcı tarafından <#${message.channel.id}> kanalına gönderilen mesaj silindi!\n\nSilinen Mesaj: **${message.content}**`)
  .setFooter("Palermo Bot | Log Sistemi")
  modlogkanal.sendEmbed(embed);
  })

client.on('guildBanAdd', async message  => {
      let modlogs = db.get(`log_${message.guild.id}`)
    const modlogkanal = message.guild.channels.find(kanal => kanal.id === modlogs);    
if (!modlogkanal) return;
  const embed = new Discord.RichEmbed()
  .setColor("#ffd100")

    .setDescription(`<<:log:756386372994203718> Üye Sunucudan Yasaklandı! \n<@!${message.user.id}>, ${message.user.tag}`)
        .setThumbnail(message.user.avatarURL)
  .setFooter("Palermo Bot | Log Sistemi")
  modlogkanal.sendEmbed(embed);
  })
client.on('channelCreate', async channel  => {
      let modlogs = db.get(`log_${channel.guild.id}`)
    const modlogkanal = channel.guild.channels.find(kanal => kanal.id === modlogs);    
if (!modlogkanal) return;
    if (channel.type === "text") {
                let embed = new Discord.RichEmbed()
                    .setColor('#ffd100')
                .setDescription(`<:log:756386372994203718> ${channel.name} adlı metin kanalı oluşturuldu.`)
                .setFooter(`Palermo Bot | Log Sistemi Kanal ID: ${channel.id}`)
                modlogkanal.send({embed});
            };
            if (channel.type === "voice") {
                let embed = new Discord.RichEmbed()
                .setColor('#ffd100')
.setTitle("SES KANALI OLUŞTURULDU")
                .setDescription(`<:log:756386372994203718> ${channel.name} adlı ses kanalı oluşturuldu!`)
                .setFooter(`Palermo Bot | Log Sistemi Kanal ID: ${channel.id}`)

                modlogkanal.send({embed});
            }
        
    })
client.on('channelDelete', async channel  => {
      let modlogs = db.get(`log_${channel.guild.id}`)
    const modlogkanal = channel.guild.channels.find(kanal => kanal.id === modlogs);    
if (!modlogkanal) return;
    if (channel.type === "text") {
                let embed = new Discord.RichEmbed()
                    .setColor('#ffd100')
                .setDescription(`<:log:756386372994203718> ${channel.name} adlı metin kanalı silini!`)
                .setFooter(`Palermo Bot | Log Sistemi Kanal ID: ${channel.id}`)
                modlogkanal.send({embed});
            };
            if (channel.type === "voice") {
                let embed = new Discord.RichEmbed()
                .setColor('#ffd100')
.setTitle("SES KANALI SİLİNDİ")
                .setDescription(`<:log:756386372994203718> ${channel.name} adlı ses kanalı silindi`)
            .setFooter(`Palermo Bot | Log Sistemi  Kanal ID: ${channel.id}`)
                modlogkanal.send({embed});
            }
    })
client.on("messageUpdate", async (oldMsg, newMsg) => {
  if (oldMsg.author.bot) return;
  var user = oldMsg.author;
  if (db.has(`log_${oldMsg.guild.id}`) === false) return;
  var kanal = oldMsg.guild.channels.get(db.fetch(`log_${oldMsg.guild.id}`).replace("<#", "").replace(">", ""))
  if (!kanal) return;
  const embed = new Discord.RichEmbed()
  .setColor("#ffd100")
  .addField("Kullanıcı", oldMsg.author.tag, true)
  .addField("Eski Mesaj",`  ${oldMsg.content}  `)
  .addField("Yeni Mesaj", `${newMsg.content}`)
  .setThumbnail(oldMsg.author.avatarURL)
  kanal.send(embed);  
        
    })

client.on("guildCreate", async function(guild) {
    const owner = client.users.get(guild.ownerID)
    const kanal = "757091670063054859" //Eklendim mesajının atılacağı kanal ID'sini giriniz.
    const darkcode = new Discord.RichEmbed()
    .setTitle(`Yeni bir sunucuya eklendim`)
    .setColor("BLACK")
    .addField(`Sunucu Adı`, guild.name)
    .addField(`Sunucu Sahibi`, owner.username + "#" +owner.discriminator)
    .addField(`Sunucu Üye Sayısı`, guild.memberCount)
    client.channels.get(kanal).send({embed: darkcode}).catch(err => console.log("Kanala mesaj atamıyorum!"))
    })
    //
      //Darkcode
    //Atıldım
    client.on("guildDelete", async function(guild) {
    const owner = client.users.get(guild.ownerID)
    const kanal = "757091670063054859" //Atıldım mesajının atılacağı kanal ID'sini giriniz.
    const darkcode = new Discord.RichEmbed()
    .setTitle(`Bir sunucudan atıldım`)
    .setColor("BLACK")
    .addField(`Sunucu Adı`, guild.name)
    .addField(`Sunucu Sahibi`, owner.username + "#" + owner.discriminator)
    .addField(`Sunucu Üye Sayısı`, guild.memberCount)
    client.channels.get(kanal).send({embed: darkcode}).catch(err => console.log("Kanala mesaj atamıyorum!"))
    })
    
//////////////////////////////MODLOG///////////////////////////






client.login(ayarlar.token);