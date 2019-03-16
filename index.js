const Discord = require('discord.js');
const fs = require('fs')
const client = new Discord.Client();
const warns = JSON.parse(fs.readFileSync('./warns.json'))
var prefix = ".";



client.on('ready', () => {
  console.log(`Connexion du  ${client.user.tag}!`);
});
/*Bienvenue et départ*/

/*Bienvenue*/
client.on("guildMemberAdd", member =>{
  const channel = member.guild.channels.find("id", "554839004709781519");
  const role = member.guild.roles.find("id", "553771739084095500");
  if(!channel) return;
  channel.send(`Bienvenue ${member} sur le discord de la ${member.guild.name} ! :flag_fr: `);
  channel.send(`Nous somme desormais **` + member.guild.memberCount + "**")
  member.addRole(role)
});

/*Bienvenue-mp*/
client.on("guildMemberAdd", member =>{
  member.createDM().then(channel => {
    return channel.send("Bienvenue sur le discord de la Famille Andrews ! Pour rentrer dans la famille tu peut faire une candidature sur le channel approprié ! Pour voir les salons veuillez accepté le règlements en ajoutant une réaction !")
  })
});

/*Départ*/
client.on("guildMemberRemove", member =>{
  const channel = member.guild.channels.find("id", "554839004709781519");
  if(!channel) return;
  channel.send(`${member} a quitté le discord de la ${member.guild.name} ! :flag_fr: `);
});

/*Commande*/

//
client.on("message", message => {
  if (!message.guild) return
  let args = message.content.trim().split(/ +/g)

  if (args[0].toLowerCase() === prefix + "warn") {


/*cmr*/

/*cmd*/

/*cpt*/

/*ltn*/

/*bgm*/

/*brg*/

/*grd*/

/*baf*/

/*forma-police*/

/*forma-raid*/

/*help*/


/*Moderation*/

/*candid-accept*/

/*candid-refuse*/

/*reunion*/

/*Mute*/

/*Demute*/


/*Kick*/
client.on('message',message =>{
  if (!message.guild) return
  let args = message.content.trim().split(/ +/g)

  if (args[0].toLocaleLowerCase() === prefix + 'kick'){
     if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande !")
     let member = message.mentions.members.first()
     if (!member) return message.channel.send("Veuillez mentionner un utilisateur !")
     if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas kick cet utilisateur !")
     if (!member.kickable) return message.channel.send("Je ne peux pas exclure cet utilisateur ")
     member.kick()
     message.channel.send("**"+member.user.username + '** a été exclu :white_check_mark:')
  }
});

/*Ban*/
client.on('message',message =>{
  if (!message.guild) return
  let args = message.content.trim().split(/ +/g)

  if (args[0].toLocaleLowerCase() === prefix + 'ban'){
     if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande !")
     let member = message.mentions.members.first()
     if (!member) return message.channel.send("Veuillez mentionner un utilisateur !")
     if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas bannir cet utilisateur !")
     if (!member.bannable) return message.channel.send("Je ne peux pas bannir cet utilisateur ")
     message.guild.ban(member, {days: 7})
     message.channel.send("**"+member.user.username + '** a été banni :white_check_mark:')
  }
});

/*Clear*/
client.on('message', message => {
  if (!message.guild) return
  let args = message.content.trim().split(/ +/g)

  if (args[0].toLowerCase() === prefix + 'clear') {
      if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande !")
      let count = args[1]
      if (!count) return message.channel.send("Veuillez indiquer un nombre de messages à supprimer")
      if (isNaN(count)) return message.channel.send("Veuillez indiquer un nombre valide")
      if (count < 1 || count > 1000) return message.channel.send("Veuillez indiquer un nombre entre 1 et 100")
      message.channel.bulkDelete(parseInt(count) + 1)
  }
});

/*Warn*/
client.on("message", message => {
  if (!message.guild) return
  let args = message.content.trim().split(/ +/g)

  if (args[0].toLowerCase() === prefix + "warn") {
      if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
      let member = message.mentions.members.first()
      if (!member) return message.channel.send("Veuillez mentionner un membre")
      if (member.highestRole.comparePositionTo(message.member.highestRole) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas warn ce membre")
      let reason = args.slice(2).join(' ')
      if (!reason) return message.channel.send("Veuillez indiquer une raison")
      if (!warns[member.id]) {
          warns[member.id] = []
      }
      warns[member.id].unshift({
          reason: reason,
          date: Date.now(),
          mod: message.author.id
      })
      fs.writeFileSync('./warns.json', JSON.stringify(warns))
      message.channel.send(member + " a été warn pour " + reason + " :white_check_mark:")
  }

/*Infractions*/
  if (args[0].toLowerCase() === prefix + "infractions") {
      if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
      let member = message.mentions.members.first()
      if (!member) return message.channel.send("Veuillez mentionner un membre")
      let embed = new Discord.RichEmbed()
          .setAuthor(member.user.username, member.user.displayAvatarURL)
          .addField('10 derniers warns', ((warns[member.id]) ? warns[member.id].slice(0, 10).map(e => e.reason) : "Ce membre n'a aucun warns"))
          .setTimestamp()
      message.channel.send(embed)
  }
});



client.login('NTU1MjQxODczNTI3MDEzMzk2.D2unLA.Db9vZfgbouh-XqN_roEfKVEZ6Pg');
