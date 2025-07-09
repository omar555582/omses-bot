require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const { status } = require('minecraft-server-util');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

const javaHost = 'OmscMc.aternos.me';
const javaPort = 25565;

client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
  updateStatus();
  setInterval(updateStatus, 60 * 1000);
});

async function updateStatus() {
  client.guilds.cache.forEach(async (guild) => {
    const textChannels = guild.channels.cache.filter(
      (channel) =>
        channel.isTextBased() &&
        channel.permissionsFor(client.user).has('SendMessages')
    );

    try {
      const result = await status(javaHost, javaPort);

      const embed = {
        color: 0x00ff00,
        title: '🎮 OmscMc',
        description: [
          '`Java IP:` `OmscMc.aternos.me`',
          '`Bedrock IP:` `OmscMc.aternos.me:30266`',
          '',
          `• OmscMc`,
          `╰ 🟢 \`Online\``,
          `╰ 👥 \`${result.players.online}/${result.players.max}\``
        ].join('\n'),
        timestamp: new Date()
      };

      for (const [id, channel] of textChannels) {
        channel.send({ embeds: [embed] }).catch(() => {});
      }
    } catch (error) {
      const embed = {
        color: 0xff0000,
        title: '🎮 OmscMc',
        description: [
          '`Java IP:` `OmscMc.aternos.me`',
          '`Bedrock IP:` `OmscMc.aternos.me:30266`',
          '',
          `• OmscMc`,
          `╰ 🔴 \`Offline\``,
          `╰ 👥 \`0/?\``
        ].join('\n'),
        timestamp: new Date()
      };

      for (const [id, channel] of textChannels) {
        channel.send({ embeds: [embed] }).catch(() => {});
      }
    }
  });
}

client.login(process.env.DISCORD_TOKEN);
