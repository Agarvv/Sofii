
let handleWebSocket = (io) => {
    io.on('connection', (socket) => {
        console.log('Alguien se ha conectado')
        
    })
}

module.exports = {
    handleWebSocket
}