import {
    displayLinkList,
    EventUrlHistory,
} from './ui.js';


let db = null;

export const IDBinitialization = ( ) => {
    let objectStore = null
    let DBOpenReq = indexedDB.open( 'shortened-links-url-db', 1 )
    DBOpenReq.addEventListener( 'error', ( err ) => {
        console.warn( err )
    } )
    DBOpenReq.addEventListener( 'success', ( e ) => {
        db = e.target.result
        urlHistory( )
        document.querySelector( '.loader-section' ).style.display = "none"
    } )
    DBOpenReq.addEventListener( 'upgradeneeded', ( e ) => {
        db = e.target.result
        console.log( 'upgrad ', db )
        if ( !db.objectStoreNames.contains( 'linkShortStore' ) ) {
            objectStore = db.createObjectStore( 'linkShortStore', {
                keyPath: 'id'
            } )
        }
    } )
}


export const urlHistory = async ( ) => {
    let tx = db.transaction( 'linkShortStore', 'readonly' );
    let recordUrl = tx.objectStore( 'linkShortStore' );
    let getRequest = recordUrl.getAll( );
    getRequest.onsuccess = ( e ) => {

        if ( e.target.result.length === 0 ) {
            console.log( 'no data in database' )
            displayLinkList( e.target.result )
        } else {
            displayLinkList( e.target.result.reverse( ) )
            EventUrlHistory( )
        }

    }
}


export const addUrlHitory = async ( shortLink, originalLink ) => {
    let idUrl = 0;
    ( function generateUniqueID( ) {
        let tx = db.transaction( 'linkShortStore', 'readonly' );
        let recordUrl = tx.objectStore( 'linkShortStore' );
        let getRequest = recordUrl.getAll( );
        getRequest.onsuccess = ( e ) => {
            console.log( e.target.result.length )
            idUrl = e.target.result.length + 1
        }
    } )( )
    setTimeout( ( ) => {
        let url = {
            id: idUrl,
            urlShort: shortLink,
            urlOriginal: originalLink
        }
        let tx = db.transaction( 'linkShortStore', 'readwrite' );
        tx.onerror = ( err ) => {
            console.warn( err )
        }
        let store = tx.objectStore( 'linkShortStore' )
        let requestAdd = store.add( url )
        requestAdd.onsuccess = ( e ) => {
            urlHistory( )
        }
        requestAdd.onerror = ( err ) => {
            console.warn( err )
        }
    }, 100 )
}
