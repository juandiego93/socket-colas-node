const { io } = require('../server');
const { TicketControl } = require('../../classes/ticket-control')

const ticketControl = new TicketControl()

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguiente()
        console.log(siguiente);
        callback(siguiente)
    })

    //Estado actual
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimosCuatro()
    })

    client.on('atenderTicket', (data, callback) => {


        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'Escritorio necesario'
            })
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio)

        callback(atenderTicket)


        client.broadcast.emit('ultimosCuatro', {
            ultimos4: ticketControl.getUltimosCuatro()
        })
        

    })

});