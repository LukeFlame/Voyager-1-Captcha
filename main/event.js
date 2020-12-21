const fs = require('fs')

module.exports = (client) => {
    // Reporta que os eventos estão carregando
    console.log('EVENTS - Carregando')

    // Armazena as pastas dos eventos na var c
    const c = local => {
        const events = fs.readdirSync(`./events/${local}/`).filter(x => x.endsWith('.js'))
        // Pra cada arquivo em cada pasta
        for (let file of events) {
            // Coleta o arquivo
            const l = require(`../events/${local}/${file}`);
            // Pega o nome sem o .js
            let nome = file.split('.')[0];
            // Executa de acordo com o nome, exemplo: 'message'
            client.on(nome, l.bind(null, client));
        }
    }

    // Define as pastas dos eventos
    ["client", "guild"].forEach(x => c(x))
    // Confirma que os eventos foram carregados
    console.log("EVENTS - Ligado")

}