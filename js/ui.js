let inputTextCopy = document.createElement( 'input' )
inputTextCopy.setAttribute( 'type', 'text' )
inputTextCopy.setAttribute( 'id', 'inputCopy' )

const copyToClipboard = ( textElmentInput ) => {
    try {
        if ( textElmentInput.value.length > 0 ) {
            textElmentInput.select( );
            textElmentInput.setSelectionRange( 0, 99999 );
            navigator.clipboard.writeText( textElmentInput.value );
            window.navigator.vibrate( 300 );
            return true;
        } else {
            return false;
        }
    } catch {
        console.log( 'error on copy password to clipboard...' );
        return false;
    }
}

export const EventUrlHistory = ( ) => {
    //remove all event listener copy button
    document.querySelectorAll( '.btn-copy-link' ).forEach( btnCopy => {
        btnCopy.removeEventListener( 'click', ( ) => {
            inputTextCopy.value = btnCopy.parentNode.children[ 1 ].innerText
            copyToClipboard( inputTextCopy )
        } )
    } )
    //add  event listener copy button
    document.querySelectorAll( '.btn-copy-link' ).forEach( btnCopy => {
        btnCopy.addEventListener( 'click', ( ) => {
            inputTextCopy.value = btnCopy.parentNode.children[ 1 ].innerText
            if ( copyToClipboard( inputTextCopy ) ) {
                btnCopy.classList.add( 'btn-copied-link' );
                btnCopy.innerHTML = 'Copied !';
                let idTimer = setTimeout( ( ) => {
                    btnCopy.classList.remove( 'btn-copied-link' );
                    btnCopy.innerHTML = 'Copy';
                }, 2500 )
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
