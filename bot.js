const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
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
    } catch (e){
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
    } catch (e){
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
    } catch (e){
      reject(e);
    }
  });
};

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
    msg.reply('Aleyküm Selam ');
  }
  if (msg.content.toLowerCase() === 'akame') {
    msg.reply(' **```Hemen Geliyorum```** ');
  }
  if (msg.content.toLowerCase() === 'toygar') {
    msg.reply(' **```Hemen Geliyorum```** ');
  }
  if (msg.content.toLowerCase() === 'chatlaq') {
    msg.reply(' **Bana Değil Akameye Seslenin.** ');
  }
  if (msg.content.toLowerCase() === '!yetkililer') {
    msg.reply(' ``` Kurucu: SecoReis, Kurucu: Chatlaq, Admin: Akame ``` ');
  }
  if (msg.content.toLowerCase() === '!barkod') {
    msg.reply(' ``` SecoReis:4091340297546, Chatlaq:4091400121712, Akame:4092540310851 ``` ');
    }
  if (msg.content.toLowerCase() === '!ip') {
    msg.reply(' **Play.ShardOfCraft.com**  ');
  }
  client.on("message", msg => {


    const embedlul = new Discord.RichEmbed()
      .setColor(0x00AE86)
      .setDescription("" + msg.author + "❗❗**SOC Bot** Reklam Koruması Aktif! Sen Ne Yaptığını Zannediyorsun!:crown:")

const embedlulz = new Discord.RichEmbed()
    .setTitle("Sunucunda " + msg.author.tag + " **REKLAM YAPIYOR!**")
      .setColor(0x00AE86)
      .setDescription("!!uyar <kişi> komutu ile onu uyarabilir ya da !!kick <kişi> veya !!ban <kişi> komutlarını kullanarak onu sunucudan uzaklaştırabilirsin!")
    .addField("Kullanıcının mesajı:", "**" + msg.content + "**")

if (msg.content.toLowerCase().match(/(discord\.gg\/)|(discordapp\.com\/invite\/)/g) && msg.channel.type === "text" && msg.channel.permissionsFor(msg.guild.member(client.user)).has("MANAGE_MESSAGES")) {
    if(msg.member.hasPermission('BAN_MEMBERS')){
    return;
    } else {
    msg.delete(30).then(deletedMsg => {
     deletedMsg.channel.send(embedlul)
     msg.guild.owner.send(embedlulz).catch(e => {
            console.error(e);
          });
        }).catch(e => {
          console.error(e);
        });
      };
      };
    })
  if (msg.content.toLowerCase() === '!jail bilgi') {
    msg.reply(' ```Kontrole Gelme Süreniz 5 Dakikadır``` ');
    msg.reply(' ```Regedit 5 Üzeri Çıkması 1 Gün Jail Sebebidir.``` ');
    msg.reply(' ```Cheat Engine Bulundurmak 1 Gün Jail Sebebidir``` ');
    msg.reply(' ```Bilgisiyarınızda Eskiden Kalma Clicker Vs Bulundurmak 1 Gün Jail Sebebidir``` ');
    msg.reply(' ```Kontrolden Kaçmak 1 Gün Jail``` ');
    msg.reply(' ```Hile Kullanmak 1 Gün Jail``` ');
    msg.reply(' ```Blok Bugu 12 Saat Jail``` ');
  }
  if (msg.content.toLowerCase() === '!editfiyatları') {
    msg.reply(' **Kes9 Kılıç 25tl, Kes10 Kılıç 40tl, Kes11 Kılıç 50tl, Kes13 Kılıç 65tl, Kes15 Kılıç 100tl, Lahmacun Küreği 75tl(Süngere Tek Atar), V25 Kazma 50tl, V30 Kazma 85tl(Obsidyene Tek Atar.)**  ');
  }
  if (msg.content.toLowerCase() === 'sea') {
    msg.reply(' Aleyküm Selam  ');
};
  if (msg.content.toLowerCase() === 'soc!yardım') {
    msg.reply(' ```Jail Süreleri İçin !Jail Bilgi, Vip Fiyatları İçin !Vip Fiyatları, Edit Fiyatları İçin !EditFiyatları, Üye Ve Odadaki Kişi Sayısını Görmek İçin !üyeler, Serverımızın İp Si İçin !ip, Barkod İçin !Barkod, Birisinin Avatarını Görmek İçin !pp @etiket```  ');
    }
  if (msg.content.toLowerCase() === '!vip fiyatları') {
    msg.reply('**Vip 5tl, Vip+ 10tl, Svip 15tl, Svip+ 25tl, Uvip 35tl, Uvip+ 50tl, ShogunVip 100tl.** ');
  }
  });

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
