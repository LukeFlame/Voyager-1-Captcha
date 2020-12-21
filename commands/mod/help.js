const config = require('../../botconfig.json');
const custom = require('../../customizate.json');
const Discord = require('discord.js')

module.exports = {
    name: "help",
    aliases: ['ajuda', 'comandos'],
    description: 'Mostra informações do bot.',
    async run(client, message, args) {

        // Saída
        var helpEmbed = new Discord.MessageEmbed()
            .setAuthor('・AJUDA', 'https://cdn.discordapp.com/attachments/762728748649938945/790622448139239424/manuten.png')
            .setThumbnail(`${custom.avatar}`)
            .setDescription(`Olá **${message.author.username}**, o Voyager 1 Captcha é um bot de verificação de novos membros que utiliza operações simples criado por LukeFl_#2082.`)
            .addField('・Comandos', '\`config\` \`setauthchannel\` \`setrole\` \`setwelcomechannel\` \`setwelcomemessage\`')
            .setColor("BLUE")
			.setFooter(`Prefixo atual: ${config.prefix}`, custom.avatar)

        return message.channel.send(helpEmbed);
    }
}

