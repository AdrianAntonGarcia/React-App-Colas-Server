const TicketList = require('./ticket-list');

class Sockets {
  constructor(io) {
    this.io = io;

    // Crear la instancia de nuestro ticket list
    this.ticketList = new TicketList();
    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on('connection', (socket) => {
      console.log('Cliente conectado');

      /**
       * El primer argumento es la data que nos viene del frontend y
       * el segundo lo que queremos retornar
       */
      socket.on('solicitar-ticket', (data, callback) => {
        const nuevoTicket = this.ticketList.crearTicket();
        callback(nuevoTicket);
      });

      socket.on(
        'siguiente-ticket-trabajar',
        ({ agente, escritorio }, callback) => {
          const suTicket = this.ticketList.asignarTicket(agente, escritorio);
          callback(suTicket);
        }
      );
    });
  }
}

module.exports = Sockets;
