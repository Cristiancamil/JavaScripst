import _  from 'underscore'

import { crearDeck, perdirCarta, valorCarta , turnoComputadora, crearCartaHTML } from './useCases';


(() => {

  let deck         = [];
  const tipos      = ['C','D','H','S'];
  const especiales = ['A','J','Q','K'];

  let puntosJugador = 0;

  const btnNuevo = document.querySelector('#btnNuevo'),
        btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener');

  const divCartasJugador = document.querySelector('#jugador-cartas');
  const divCartasComputadora = document.querySelector('#computadora-cartas');
  
  const puntosHTML = document.querySelectorAll('small'); 
  
  deck = crearDeck(tipos, especiales);
  
  

  btnPedir.addEventListener('click', () => {
      const carta = perdirCarta( deck );     
      puntosJugador = puntosJugador + valorCarta( carta )
      puntosHTML[0].innerText = puntosJugador

      const imgCarta = crearCartaHTML( carta );
      divCartasJugador.append( imgCarta );
      
      if (puntosJugador > 21) {
          btnPedir.disabled = true;
          btnDetener.disabled = true;
          turnoComputadora( puntosJugador, puntosHTML, divCartasComputadora, deck );

      } else if (puntosJugador === 21) {
          btnPedir.disabled = true;
          btnDetener.disabled = true;
          turnoComputadora( puntosJugador, puntosHTML, divCartasComputadora, deck );
      }
  });

  btnDetener.addEventListener('click', () => {
      btnPedir.disabled = true;
      btnDetener.disabled = true;

      turnoComputadora( puntosJugador, puntosHTML, divCartasComputadora, deck );
  });

  btnNuevo.addEventListener('click', () => {

    deck = [];
    deck = crearDeck( tipos, especiales );

    puntosJugador     = 0;
    puntosComputadora = 0;
    
    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';

    btnPedir.disabled   = false;
    btnDetener.disabled = false;
  });

})()