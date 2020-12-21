const Discord = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: "config",
    aliases: ['configurate', 'configurar'],
    description: 'Mostra configuração do bot.',
    async run(client, message, args) {

        // Verificação de permissão
        var noPermission = new Discord.MessageEmbed()
            .setAuthor('・SEM PERMISSÃO', 'https://cdn.discordapp.com/attachments/783101389185482782/783895176694857768/No.gif')
            .setDescription(`<:1A_error:772982542944829460> | **${message.author.username}**, você não tem permissão para executar este comando!`)
            .setColor("RED")
			.setFooter(`Copyright © 2020 ${message.guild.name}. All Rights Reserved.`, message.guild.iconURL())

        if (message.guild.members.cache.find(a => a.id == message.author.id).hasPermission('ADMINISTRATOR') == false) return message.channel.send(noPermission);

        // Coleta das configurações no db
        const welcomeMsgId = db.fetch(`info_${message.guild.id}.welcomeChannel`)
        var welcomeChannel = message.guild.channels.cache.find(a => a.id == welcomeMsgId);
        if (!welcomeChannel) welcomeChannel = '-'

        const authChannelId = db.fetch(`info_${message.guild.id}.authChannel`)
        var authChannel = message.guild.channels.cache.find(a => a.id == authChannelId);
        if (!authChannel) authChannel = '-'

        const cargoId = db.fetch(`info_${message.guild.id}.role`);
        var cargo = message.guild.roles.cache.find(a => a.id == cargoId);
        if (!cargo) cargo = '-'

        const welcomeMessage = db.fetch(`info_${message.guild.id}.message`);
        var mensagem = welcomeMessage;
        if (!mensagem) mensagem = '-'

        // Verificação de status de acordo com as configurações
        if (welcomeChannel == '-' || authChannel == '-' || cargo == '-' || mensagem == '-') {
            var status = '🔴 *Complete as configurações para ligar a verificação.*'
        } else {
            var status = '🟢 *Verificação de membros ativada.*'
        }

        // Saída
        var configEmbed = new Discord.MessageEmbed()
            .setAuthor('・CONFIG', 'https://cdn.discordapp.com/attachments/723331447720509440/789221369773686824/Staff.png')
            .setDescription(`**${message.author.username}**, estas são as configurações atuais:\n\n・**Cargo de Verificação**: ${cargo}\n・**Canal de Verificação**: ${authChannel}\n・**Canal de Boas Vindas**: ${welcomeChannel}\n・**Mensagem de Boas Vindas**: ${mensagem}\n\n・**Status**: ${status}`)
            .setColor("BLUE")
			.setFooter(`Copyright © 2020 ${message.guild.name}. All Rights Reserved.`, message.guild.iconURL())

        message.channel.send(configEmbed)
    }
}

