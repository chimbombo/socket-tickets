const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control')

const ticketControl = new TicketControl();


io.on('connection', (client) => {
    client.on('nextTicket', (data, callback) => {
        let nextTicket = ticketControl.next();
        console.log(nextTicket);
        callback(nextTicket)
    })

    client.emit('actualTicket', {
        actual: ticketControl.getLastTicket(),
        last4: ticketControl.getLast4()
    })

    client.on('ticketAttend', (data, callback) => {
        if (!data.desk) {
            return callback({
                err: true,
                message: 'El escritorio es necesario'
            })
        }

        let ticketAttend = ticketControl.ticketAttend(data.desk);
        callback(ticketAttend);

        client.broadcast.emit('last4', {
            last4: ticketAttend.getLast4()
        })
    })
});