'use strict';

var viewBaseUrl = 'views/';
var version = '1';

var cache = {};

function getPageId( name ) {
  return name+'-'+version;
}
function loadPage( name ) {
  var key = getPageId( name );
  var page = cache[ name ] || null;
  // var page = localStorage.getItem( key );
  
  if( page!==null ) {
    return Promise.resolve( page );
  } else {
    return fetch( viewBaseUrl + name + '.htm' )
    .then( function( response ) {
      if( !response.ok ) throw new Error( 'Cannot get page' );
      return response.text();
    } )
    .then( function( html ) {
      cache[ name ] = html;
      // localStorage.setItem( name, html );
      
      return html;
    } );
  }
}

function initAll() {
  $( '.bs-tab a' ).click(function (e) {
    e.preventDefault()
    var $this = $( this );

    $this.siblings( '.dropdown-item' ).removeClass( 'active' );
    $this.tab( 'show' );
  } );
}


function updateState( page ) {
  if( page!=='home' )  {
    var $link = $( 'a.nav-link[href="?'+page+'"]' );
    $link.parent().siblings( '.nav-item' ).removeClass( 'active' );
    $link.parent().addClass( 'active' );
  } else {
    var $link = $( '#collapsible-navbar' );
    $link.find( '.nav-item' ).removeClass( 'active' );
  }
  
  var $dest = $( '#page' );
  

  loadPage( page )
  .then( function( html ) {
    $dest.html( html );
    document.body.scrollIntoView();

    initAll();
  } )
  .catch( function( err ) {
    console.error( err );
  } );
}

$( '[data-target="#page"]' ).click( function( e ) {
  var $this = $( this );
  var url = $this.attr( 'href' );
  var page = url.slice(1);
  
  history.pushState( page, page, url );

  updateState( page );
  e.preventDefault();
} );


// Revert to a previously saved state
$( window ).on( 'popstate', function( e ) {
  var stateEvent = e.originalEvent;
  var page = location.search.slice(1);
  if( !page ) {
    page = 'home';
  }
  var url = '?'+page;

  history.pushState( page, page, url );
  updateState( page );
} );


$( window ).on( 'load', function( e ) {
  $( window ).trigger( 'popstate' );
} );