import {
    shorteningLink,
} from './api.js';

import {
    IDBinitialization,
} from './database.js';


const checkUrl = ( string ) => {
    let givenURL;
    try {
        givenURL = new URL( string );
    } catch ( error ) {
        console.log( "error is", error );
        return false;
    }
    console.warn( givenURL )
    return true;
}


const menuMobile = ( ) => {
    document.querySelector( '.btn-mobile' ).addEventListener( 'click', ( ) => {
        document.querySelector( '.btn-mobile' ).classList.toggle( 'active' )
        document.querySelector( '.btn-mobile' ).classList.toggle( 'not-active' )
        document.querySelector( '.menu-mobile ' ).classList.toggle( 'menu-mobile-active' )
    } )
}

const inputFocusEvent = ( ) => {
    document.querySelector( 'input' ).addEventListener( 'input', ( e ) => {
        if ( e.target.value !== "" ) {
            document.querySelector( 'input' ).classList.remove( 'invalid-input' );
            document.querySelector( '.error-msg' ).style.opacity = "0";
        }
    } )
}

const shortenLinkEvent = ( ) => {
    document.querySelector( '#btn-shortenLink' ).addEventListener( 'click', ( ) => {
        if ( document.querySelector( 'input' ).value === "" ) {
            document.querySelector( 'input' ).classList.add( 'invalid-input' );
            document.querySelector( '.error-msg' ).innerHTML = "Please add a link";
            document.querySelector( '.error-msg' ).style.opacity = "1.0";
        } else {
            document.querySelector( 'input' ).blur( );
            if ( checkUrl( document.querySelector( 'input' ).value ) ) {
                document.querySelector( 'input' ).blur( );
                document.querySelector( '#btn-shortenLink' ).blur( );
                shorteningLink( document.querySelector( 'input' ).value );
            } else {
                document.querySelector( 'input' ).focus( );
                document.querySelector( 'input' ).classList.add( 'invalid-input' );
                document.querySelector( '.error-msg' ).innerHTML = "Please add a valid url";
                document.querySelector( '.error-msg' ).style.opacity = "1.0";
            }
        }

    } )
}

window.addEventListener( 'load', ( ) => {
    IDBinitialization( )
    menuMobile( )
    shortenLinkEvent( )
    inputFocusEvent( )
} )
