const { Client, MessageEmbed } = require('discord.js');
const { Permissions } = require('discord.js');
const config = require('./config');
const commands = require('./help');

let bot = new Client({
  fetchAllMembers: true, // Remove this if the bot is in large guilds.
  presence: {
    status: 'mobile',
    activity: {
      name: `Panonimus`,
      type: 'WATCHING'
    }
  }
});

bot.on('ready', () => console.log(`Logged in as ${bot.user.tag}.`));

bot.on('guildMemberAdd', (guildMember) => {
   guildMember.addRole(guildMember.guild.roles.cache.find(role => role.name === "CLANOVI"));
});

bot.on('message', async message => {
  // Check for command
  if (message.content.startsWith(config.prefix)) {
    let args = message.content.slice(config.prefix.length).split(' ');
    let command = args.shift().toLowerCase();

    switch (command) {

      

      case 'ping':
        let msg = await message.reply('Pinging...');
        await msg.edit(`PONG! Message round-trip took ${Date.now() - msg.createdTimestamp}ms.`)
        break;

      case 'say':
      case 'repeat':
        if (args.length > 0){
          message.channel.send(args.join(' '));
          message.delete();}
        else
          message.reply('You did not send a message to repeat, cancelling command.')
        break

      /* Unless you know what you're doing, don't change this command. */
      case 'help':
        let embed =  new MessageEmbed()
          .setTitle('HELP MENU')
          .setColor('GREEN')
          .setFooter(`Requested by: ${message.member ? message.member.displayName : message.author.username}`, message.author.displayAvatarURL())
          .setThumbnail(bot.user.displayAvatarURL());
        if (!args[0])
          embed
            .setDescription(Object.keys(commands).map(command => `\`${command.padEnd(Object.keys(commands).reduce((a, b) => b.length > a.length ? b : a, '').length)}\` :: ${commands[command].description}`).join('\n'));
        else {
          if (Object.keys(commands).includes(args[0].toLowerCase()) || Object.keys(commands).map(c => commands[c].aliases || []).flat().includes(args[0].toLowerCase())) {
            let command = Object.keys(commands).includes(args[0].toLowerCase())? args[0].toLowerCase() : Object.keys(commands).find(c => commands[c].aliases && commands[c].aliases.includes(args[0].toLowerCase()));
            embed
              .setTitle(`COMMAND - ${command}`)

            if (commands[command].aliases)
              embed.addField('Command aliases', `\`${commands[command].aliases.join('`, `')}\``);
            embed
              .addField('DESCRIPTION', commands[command].description)
              .addField('FORMAT', `\`\`\`${config.prefix}${commands[command].format}\`\`\``);
          } else {
            embed
              .setColor('RED')
              .setDescription('This command does not exist. Please use the help command without specifying any commands to list them all.');
          }
        }
        message.channel.send(embed);
        break;
    }
  }
  const zabrana = ["fuks", "strklja", "borongaj", "??trklja", "jaksic", "jak??i??", "fuxa", "brkic", "brki??", "brki??"]
  for (var i = 0; i < zabrana.length; i++) {
  if (message.content.toLowerCase().includes(zabrana[i])) {
    // message.content contains a forbidden word;
    // delete message, log, etc.
    message.delete();
    break;
  }
}
});
bot.login("OTE1MjA2OTM5NjE1NTc2MDc1.YaYO4g.A5CZTwD35Qwq0ld6vWrdNrhoC4o");
