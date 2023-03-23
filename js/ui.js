const copyToClipboard = async ( textElmentInput ) => {
    let r = await navigator.clipboard.writeText( textElmentInput ).then(
        ( ) => {
            /* clipboard successfully set */
            alert( "valide" )
            return true
        },
        ( error ) => {
            /* clipboard write failed */
            alert( 'error on copy link to clipboard...' + error )
            return false
        }
    );
    return r
}

export const EventUrlHistory = ( ) => {
    //remove all event listener copy button
    document.querySelectorAll( '.btn-copy-link' ).forEach( btnCopy => {
        btnCopy.removeEventListener( 'click', ( ) => {
            inputTextCopy.value = btnCopy.parentNode.children[ 1 ].innerText
            copyToClipboard( btnCopy.parentNode.children[ 1 ].innerText )
        } )
    } )
    //add  event listener copy button
    document.querySelectorAll( '.btn-copy-link' ).forEach( btnCopy => {
        btnCopy.addEventListener( 'click', async ( ) => {
            alert( "Hello !!" );
            let result = await copyToClipboard( btnCopy.parentNode.children[ 1 ].innerText );
            if ( result ) {
                btnCopy.classList.add( 'btn-copied-link' );
                btnCopy.innerHTML = 'Copied !';
                let idTimer = setTimeout( ( ) => {
                    btnCopy.classList.remove( 'btn-copied-link' );
                    btnCopy.innerHTML = 'Copy';
                }, 2500 )
            } else {
                alert( "error on copy link to clipboard..." );
            }
        } )
    } )
}

export const displayLinkList = async ( links ) => {
    const containerSection = document.querySelector( '.shorten-history' );
    containerSection.innerHTML = "";
    if ( links.length > 0 ) {
        links.forEach( link => {
            containerSection.innerHTML += `<div class="link-short">
                        <a href="${link.urlOriginal}" class="link-no-shorten" target="_blank">${link.urlOriginal}</a>
                        <a href="${link.urlShort}" class="link-shorted" target="_blank">${link.urlShort}</a>
                        <button class="btn-copy-link">Copy</button>
                    </div>`

        } );
    }

}
