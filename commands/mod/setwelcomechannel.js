const config = require('../../botconfig.json');
const Discord = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: "setwelcomechannel",
    aliases: ['setwelcomecanal', 'setarwelcomechannel'],
    description: 'Seta o canal de boas vindas.',
    async run(client, message, args) {

        // Verificação da permissão
        var noPermission = new Discord.MessageEmbed()
            .setAuthor('・SEM PERMISSÃO', 'https://cdn.discordapp.com/attachments/783101389185482782/783895176694857768/No.gif')
            .setDescription(`<:1A_error:772982542944829460> | **${message.author.username}**, você não tem permissão para executar este comando!`)
            .setColor("RED")
			.setFooter(`Copyright © 2020 ${message.guild.name}. All Rights Reserved.`, message.guild.iconURL())

        if (message.guild.members.cache.find(a => a.id == message.author.id).hasPermission('ADMINISTRATOR') == false) return message.channel.send(noPermission);
        
        // Caso digitar só o comando, dar instruções
        var comando = new Discord.MessageEmbed()
            .setAuthor('・SETAR CANAL DE BOAS VINDAS', 'https://cdn.discordapp.com/attachments/783101389185482782/783895176694857768/No.gif')
            .setDescription(`<:1A_error:772982542944829460> | **${message.author.username}**, para setar o canal de boas vindas, use *${config.prefix}setwelcomechannel [canal]*.`)
            .setColor("RED")
			.setFooter(`Copyright © 2020 ${message.guild.name}. All Rights Reserved.`, message.guild.iconURL())

        if (!args[0]) return message.channel.send(comando);

        // Coleta o canal
        var canal = args[0];
        if (canal.startsWith('<#')) canal = canal.split('#')[1].slice(0, -1);
        if (!canal.startsWith('<#') && isNaN(canal)) return message.channel.send(comando);

        // Seta a configuração
        await db.set(`info_${message.guild.id}.welcomeChannel`, canal);

        // Saída
        var succesEmbed = new Discord.MessageEmbed()
            .setAuthor('・SETAR CANAL DE BOAS VINDAS', 'https://cdn.discordapp.com/attachments/723331447720509440/789221369773686824/Staff.png')
            .setDescription(`<a:tickgreen:762533876429619222> | **${message.author.username}**, canal setado com sucesso.`)
            .setColor("BLUE")
			.setFooter(`Copyright © 2020 ${message.guild.name}. All Rights Reserved.`, message.guild.iconURL())

        message.channel.send(succesEmbed)
    }
}

