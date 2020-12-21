const Discord = require('discord.js')
const db = require('quick.db')

// Exporta tudo pegando esses 4 parametros
module.exports = async (client, member, guild) => {
	// Coleta infos do usuário e servidor
	var sv = member.guild;
	var user = sv.members.cache.find(a => a.id == member.id);

	// Pega informações das configurações (caso falte alguma, cancela tudo)
	const welcomeMsgId = db.fetch(`info_${sv.id}.welcomeChannel`)
	if (!welcomeMsgId) return
	const welcomeChannel = sv.channels.cache.find(a => a.id == welcomeMsgId);
	if (!welcomeChannel) return

	const authChannelId = db.fetch(`info_${sv.id}.authChannel`)
	if (!authChannelId) return
	const authChannel = sv.channels.cache.find(a => a.id == authChannelId);
	if (!authChannel) return

	const cargoId = db.fetch(`info_${sv.id}.role`);
	if (!cargoId) return
	const cargo = sv.roles.cache.find(a => a.id == cargoId);
	if (!cargo) return

	const welcomeMessage = db.fetch(`info_${sv.id}.message`);
	if (!welcomeMessage) return

	async function verification() {
		// Alguns emojis
		const alert = client.emojis.cache.get("762518137861439518");
		const verify = client.emojis.cache.get("762533876429619222");
		const verify1 = client.emojis.cache.get("762912147189006336");

		// Define os valores da operação
		var x = Math.floor(Math.random() * 10) + 2;
		var y = Math.floor(Math.random() * 10);

		if (x < y) y = x - 1;

		// Define o operador
		conta = [
			`+`,
			`-`,
			`+`,
			`-`,
			`+`
		]

		var operador = conta[Math.floor(Math.random() * conta.length)];

		// Define o resultado da operação
		if (operador == '+') {
			var resultado = x + y
		}

		if (operador == '-') {
			var resultado = x - y
		}

		// Todas embed possíveis de aparecer na verificação
		const embed = new Discord.MessageEmbed()
			.setTitle(`${verify1}・Verificação`)
			.setDescription(`:loudspeaker: - *Resultado da seguinte operação* »\n\nㅤㅤㅤ>ㅤㅤㅤ**${x} ${operador} ${y}**ㅤㅤㅤ<\nㅤ\n`)
			.setColor('#36393F')
			.setFooter(`Captcha para ${member.user.username}`, `${member.user.avatarURL()}`)

		const embed1T = new Discord.MessageEmbed()
			.setTitle(`${verify1}・Verificação`)
			.setDescription(`${alert} **Você errou uma vez, restam 2 tentativas.**\n\n:loudspeaker: - *Resultado da seguinte operação* »\n\nㅤㅤㅤ>ㅤㅤㅤ**${x} ${operador} ${y}**ㅤㅤㅤ<\nㅤ\n`)
			.setColor('#36393F')
			.setFooter(`Captcha para ${member.user.username}`, `${member.user.avatarURL()}`)

		const embed2T = new Discord.MessageEmbed()
			.setTitle(`${verify1}・Verificação`)
			.setDescription(`${alert} **Você errou duas vezes, resta 1 tentativa.**\n\n:loudspeaker: - *Resultado da seguinte operação* »\n\nㅤㅤㅤ>ㅤㅤㅤ**${x} ${operador} ${y}**ㅤㅤㅤ<\nㅤ\n`)
			.setColor('#36393F')
			.setFooter(`Captcha para ${member.user.username}`, `${member.user.avatarURL()}`)

		// Envia a embed
		var curPage = await authChannel.send(user, embed)
		
		// Cores legais da embed de boas vindas randomizadas
		colors = [
			`#00FF00`,
			`#ff0000`,
			`#0000FF`,
			`#FFFF00`,
			`#A020F0`
		]

		var colorS = colors[Math.floor(Math.random() * colors.length)];

		// Criação da embed de boas vindas
		const wellEmbed = new Discord.MessageEmbed()
			.setTitle(`${verify}・${member.user.tag}, entrou no servidor!`)
			.setThumbnail(`${member.user.avatarURL()}`)
			.setDescription(`Seja bem-vindo(a) ao **${sv.name}**, divirta-se no servidor!\n\n${welcomeMessage}`)
			.setColor(colorS)
			.setFooter(`Copyright © 2020 ${sv.name}. All Rights Reserved.`, sv.iconURL())

		// Tempo limite de 10 minutos
		const timeout = '300000';
		var contador = 1;
		var status = 'a';

		// Coletor da resposta do usuário (máximo de 3 respostas com 10 minutos de tempo limite)
		let cp = await authChannel.createMessageCollector(x => x.author.id === user.id, { max: 3, time: timeout })
			.on('collect', async c => {
				const resposta = c.content
				c.delete();

				// Se for a resposta certa, dá o cargo e envia a mensagem de boas vindas.
				// Senão, atualiza a embed até o terceiro erro, que ocasiona em kick.
				if (resposta == resultado) {
					await user.roles.add(cargo)
					status = 'aceito'
					cp.stop()
					return welcomeChannel.send(user, wellEmbed)
				} else {
					if (contador == 1) curPage.edit(embed1T);
					if (contador == 2) curPage.edit(embed2T);
					if (contador == 3) {
						return user.kick("Falhou na Captcha 3 vezes.");
					}
					contador++
				}
			})
			// Quando acabar, verifica se já foi aceito, senão, kika por tempo limite
			.on('end', async b => {
				if (status != 'aceito') {
					await curPage.delete();
					user.kick("Tempo limite da Captcha excedido.");
				} else {
					await curPage.delete();
				}
				cp.stop()
			})
	}

	// Faz o sistema de verificação
	verification();
}
