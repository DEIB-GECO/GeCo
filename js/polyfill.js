'use strict';

// Modernizr.localstorage = false;
// Modernizr.promises = false; 
// Modernizr.fetch = false;
// Load missing features

var scripts = Promise.resolve();

// LocalStorage
if( !Modernizr.localstorage ) {
  scripts = scripts
  .then( function() {
    return $.getScript( 'lib/350433/gistfile1.js' ).promise();
  } );
}

// Promises
if( !Modernizr.promises ) {
  scripts = scripts
  .then( function() {
    return $.getScript( 'lib/es6-promise/es6-promise.min.js' ).promise();
  } );
}

// Fetch
if( !Modernizr.fetch ) {
  scripts = scripts
  .then( function() {
    return $.getScript( 'lib/fetch/fetch.js' ).promise();
  } );
}