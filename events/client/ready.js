// Exporta tudo pegando o client
module.exports = (client) => {
    
    // Status que irão revezar
    const status = [
        {name: 'dados para a SpaceX', type: 'PLAYING'},
        {name: 'ondas de rádio da Terra', type: 'LISTENING'},
        {name: 'a explosão de uma supernova', type: 'WATCHING'},
        {name: 'a poeira estelar', type: 'WATCHING'}
    ]

    // Função que randomizar os status e os faz aparecer
    function Presence() {
        const base = status[Math.floor(Math.random() * status.length)]
        client.user.setActivity(base)
    }
    
    // Execução da função acima uma primeira vez
    Presence();

    // Execução da mesma função porém com timer e infinito
    setInterval(() => Presence(), 30000)
}