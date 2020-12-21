// Exporta tudo pegando esses 4 parâmetros
module.exports = (client, guild, message, args) => {
    // Seleciona o canal que é para enviar (servidor privado)
    const canal = client.channels.cache.get("745809839229501461")

    // Envia a mensagem de quando o bot é adicionado
    canal.send(`${guild.name} - Me adicionou\n\n**Sobre**\nID: ${guild.id}\nUsuários: ${guild.memberCount}\nDono: ${guild.owner.user.tag}\nRegião: ${guild.region}`)
}