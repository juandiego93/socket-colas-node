//Establecer conecction server

var labelButton = $('#lblNuevoTicket')

var socket = io();

socket.on('connect', function () {
    console.log('Conectado al serv');
})

socket.on('disconnect', function () {
    console.log('Desconectado del servidor');
})

socket.on('estadoActual', function (respuesta) {
    labelButton.text(respuesta.actual)
})

$('button').on('click', function () {
    socket.emit('siguienteTicket', null, function (siguienteTicket) {
        labelButton.text(siguienteTicket)
    })
})