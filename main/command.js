const fs = require('fs')
const ascii = require('ascii-table')
let table = new ascii('Commands')
table.setHeading('Comando', "Status do Carregamento")

module.exports = (client) => {
    // Reporta no console que os comandos estão carregando
    console.log(`CMDS - Carregando`)

    // Lê cada arquivo da pasta commands
    fs.readdirSync("./commands/").forEach(local => {
        // Armazena os comandos pegando os arquivos .js
        const comandos = fs.readdirSync(`./commands/${local}/`).filter(arquivo => arquivo.endsWith(".js"))

        // Pra cada comando na pasta
        for (let file of comandos) {
            // Coleta o arquivo .js
            let puxar = require(`../commands/${local}/${file}`)

            // Se ter nome, confirma que está ok, senão não
            if (puxar.name) {
                client.commands.set(puxar.name, puxar) 
                table.addRow(file, 'Correto')
            } else {
                table.addRow(file, 'Incorreto')
                continue;
            }

            // Coleta os aliases do comando
            if (puxar.aliases && Array.isArray(puxar.aliases)) {
                puxar.aliases.forEach(x => client.aliases.set(x, puxar.name))
            }
        }
    })

    // Confirma que os comandos foram ligados
    console.log("CMDS - Ligado")
}