var socket = io()

var searchParams = new URLSearchParams(window.location.search)
console.log(searchParams);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var desk = searchParams.get('escritorio')
var label = $('small')

console.log(desk);
$('h1').text('Escritorio ' + desk)

$('button').on('click', function() {
    socket.emit('ticketAttend', { desk: desk }, function(resp) {
        if (resp === 'No hay tickets') {
            label.text(resp)
            alert(resp)
            return
        }
        label.text('Ticket' + resp.number)
    })
})