const config = require('../../botconfig.json');
const Discord = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: "setrole",
    aliases: ['setcargo', 'setarcargo'],
    description: 'Seta o cargo de verificação.',
    async run(client, message, args) {

        // Verificação de permissão
        var noPermission = new Discord.MessageEmbed()
            .setAuthor('・SEM PERMISSÃO', 'https://cdn.discordapp.com/attachments/783101389185482782/783895176694857768/No.gif')
            .setDescription(`<:1A_error:772982542944829460> | **${message.author.username}**, você não tem permissão para executar este comando!`)
            .setColor("RED")
			.setFooter(`Copyright © 2020 ${message.guild.name}. All Rights Reserved.`, message.guild.iconURL())

        if (message.guild.members.cache.find(a => a.id == message.author.id).hasPermission('ADMINISTRATOR') == false) return message.channel.send(noPermission);
        
        // Caso digitar só o comando, dar instruções
        var comando = new Discord.MessageEmbed()
            .setAuthor('・SETAR CARGO DE VERIFICAÇÃO', 'https://cdn.discordapp.com/attachments/783101389185482782/783895176694857768/No.gif')
            .setDescription(`<:1A_error:772982542944829460> | **${message.author.username}**, para setar o cargo de verificação, use *${config.prefix}setrole [cargo]*.`)
            .setColor("RED")
			.setFooter(`Copyright © 2020 ${message.guild.name}. All Rights Reserved.`, message.guild.iconURL())

        if (!args[0]) return message.channel.send(comando);

        // Coleta do cargo
        var cargo = args[0];
        if (cargo.startsWith('<@&')) cargo = cargo.split('&')[1].slice(0, -1);
        if (!cargo.startsWith('<@&') && isNaN(cargo)) return message.channel.send(comando);

        // Testa se o cargo é válido assim como a permissão do bot em gerencia-lo
        try {
            let cargoteste = message.guild.roles.cache.get(cargo);
            if (message.guild.members.cache.find(a => a.id == message.author.id).roles.cache.has(cargo)) {
                await message.guild.members.cache.find(a => a.id == message.author.id).roles.remove(cargoteste);
                await message.guild.members.cache.find(a => a.id == message.author.id).roles.add(cargoteste);
            } else {
                await message.guild.members.cache.find(a => a.id == message.author.id).roles.add(cargoteste);
                await message.guild.members.cache.find(a => a.id == message.author.id).roles.remove(cargoteste);
            }
        } catch (error) {
            var missingPerms = new Discord.MessageEmbed()
                .setAuthor('・SETAR CARGO DE VERIFICAÇÃO', 'https://cdn.discordapp.com/attachments/783101389185482782/783895176694857768/No.gif')
                .setDescription(`<:1A_error:772982542944829460> | **${message.author.username}**, o bot não tem permissão para isso. Confira se deu permissão de gerenciar cargos e que o cargo do bot está acima do cargo de verificação.`)
                .setColor("RED")
                .setFooter(`Copyright © 2020 ${message.guild.name}. All Rights Reserved.`, message.guild.iconURL())

            message.channel.send(missingPerms)
            return
        }

        // Seta a configuração
        await db.set(`info_${message.guild.id}.role`, cargo);

        // Saída
        var succesEmbed = new Discord.MessageEmbed()
            .setAuthor('・SETAR CARGO DE VERIFICAÇÃO', 'https://cdn.discordapp.com/attachments/723331447720509440/789221369773686824/Staff.png')
            .setDescription(`<a:tickgreen:762533876429619222> | **${message.author.username}**, cargo setado com sucesso.`)
            .setColor("BLUE")
			.setFooter(`Copyright © 2020 ${message.guild.name}. All Rights Reserved.`, message.guild.iconURL())

        message.channel.send(succesEmbed)
    }
}

