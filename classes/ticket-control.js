const { timeStamp } = require('console')
const fs = require('fs')

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero
        this.escritorio = escritorio
    }
}

class TicketControl {

    constructor() {
        this.ultimo = 0
        this.hoy = new Date().getDate()
        this.tickets = []
        this.ultimosCuatroTicekts = []
        let data = require('../data/data.json')
        if (this.hoy == data.hoy) {
            this.ultimo = data.ultimo
            this.tickets = data.tickets
            this.ultimosCuatroTicekts = data.ultimosCuatroTicekts
        } else {
            this.reiniciarConteo()
        }
    }

    siguiente() {
        this.ultimo += 1
        let newTicket = new Ticket(this.ultimo, null)
        this.tickets.push(newTicket)
        this.grabarArchivo()
        return `Ticket: ${this.ultimo}`
    }

    getUltimoTicket() {
        return `Ticket: ${this.ultimo}`
    }

    getUltimosCuatro() {
        return this.ultimosCuatroTicekts
    }


    atenderTicket(escritorio) {
        if (this.tickets.length === 0) {
            return `No hay tickets`
        } else {
            let numeroTicket = this.tickets[0].numero
            this.tickets.shift()
            let atenderTicket = new Ticket(numeroTicket, escritorio)
            this.ultimosCuatroTicekts.unshift(atenderTicket)
            if (this.ultimosCuatroTicekts.length > 4) {
                this.ultimosCuatroTicekts.splice(-1, 1)
            }
            this.grabarArchivo()
            return atenderTicket
        }
    }

    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimosCuatroTicekts: this.ultimosCuatroTicekts
        }
        let jsonDataString = JSON.stringify(jsonData)
        fs.writeFileSync('./data/data.json', jsonDataString)
    }

    reiniciarConteo() {
        this.ultimo = 0
        this.tickets = []
        console.log('Se ha reiniciado el sistema')
        this.grabarArchivo()
    }
}

module.exports = { TicketControl }
