import {
    shorteningLink,
} from './api.js';


const menuMobile = ( ) => {
    document.querySelector( '.btn-mobile' ).addEventListener( 'click', ( ) => {
        document.querySelector( '.btn-mobile' ).classList.toggle( 'active' )
        document.querySelector( '.btn-mobile' ).classList.toggle( 'not-active' )
        document.querySelector( '.menu-mobile ' ).classList.toggle( 'menu-mobile-active' )
    } )
}

window.addEventListener( 'load', ( ) => {
    menuMobile( )
    shorteningLink( "http://localhost:3000/index.html" );
} )
