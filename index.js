require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const { status } = require('minecraft-server-util');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

const javaHost = 'OmscMc.aternos.me';
const javaPort = 25565;

client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  
  if (message.content.toLowerCase() === 'mc') {
    try {
      const result = await status(javaHost, javaPort);
      const embed = {
        color: 0x00ff00,
        title: '🎮 OmscMc',
        description: [
          '`Java IP:` `OmscMc.aternos.me`',
          '`Bedrock IP:` `OmscMc.aternos.me:30266`',
          '',
          '• OmscMc',
          '╰ 🟢 `Online`',
          `╰ 👥 \`${result.players.online}/${result.players.max}\``
        ].join('\n'),
        timestamp: new Date()
      };
      message.channel.send({ embeds: [embed] });
    } catch (err) {
      const embed = {
        color: 0xff0000,
        title: '🎮 OmscMc',
        description: [
          '`Java IP:` `OmscMc.aternos.me`',
          '`Bedrock IP:` `OmscMc.aternos.me:30266`',
          '',
          '• OmscMc',
          '╰ 🔴 `Offline`',
          '╰ 👥 `0/?`'
        ].join('\n'),
        timestamp: new Date()
      };
      message.channel.send({ embeds: [embed] });
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
