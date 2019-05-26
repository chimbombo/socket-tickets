var socket = io()
var label = $('#lblNuevoTicket')

socket.on('connect', function() {
    console.log('conectado al servidor');
})

socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
})

$('button').on('click', function() {
    socket.emit('nextTicket', null, function(nextTicket) {
        label.text(nextTicket)
    });
})

socket.on('actualTicket', function(resp) {
    label.text(resp.actual)
})