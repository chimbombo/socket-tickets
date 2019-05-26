const fs = require('fs')

class Ticket {
    constructor(number, desk) {
        this.number = number
        this.desk = desk
    }
}

class TicketControl {
    constructor() {
        this.last = 0
        this.toDay = new Date().getDate()
        this.tickets = []
        this.last4 = []

        let data = require('../data/data.json')

        if (data.toDay === this.toDay) {
            this.last = data.last
            this.tickets = data.tickets
            this.last4 = data.last4
        } else {
            this.restartCount()
        }
    }

    next() {
        this.last += 1
        let ticket = new Ticket(this.last, null)
        this.tickets.push(ticket)
        this.saveFile()

        return `Ticket ${ this.last}`
    }

    getLastTicket() {
        return `Ticket ${this.last}`
    }

    getLast4() {
        return this.last4
    }

    saveFile() {
        let jsonData = {
            last: this.last,
            toDay: this.toDay,
            tickets: this.tickets,
            last4: this.last4
        }

        let jsonDataString = JSON.stringify(jsonData)

        fs.writeFileSync('./server/data/data.json', jsonDataString)
    }

    restartCount() {
        this.last = 0
        this.tickets = []
        this.last4 = []
    }

    ticketAttend(desk) {
        if (this.tickets.length === 0) {
            return 'No hay tickets'
        }

        let ticketNumber = this.tickets[0].number;
        this.tickets.shift();

        let ticketAttend = new Ticket(ticketNumber, desk)
        this.last4.unshift(ticketAttend);

        if (this.last4.length > 4) {
            this.last4.splice(-1, 1); //borra el último
        }

        console.log('ultmos 4');
        console.log(this.last4);

        this.saveFile()

        return ticketAttend
    }

}



module.exports = {
    TicketControl
}