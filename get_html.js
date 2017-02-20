var system = require( "system" );
var page = require( "webpage" ).create();
var url = system.args[1];

page.open( url, function( status ) {
    var pageContent = page.evaluate(function() {
       return document;
       //return document.getElementsByTagName( "html" )[0].innerHTML;
    });
    //console.log( JSON.stringify(pageContent ));
    var title = page.evaluate(function (s) {
        return document.querySelector(s).innerHTML;
    }, 'title');
    var body = page.evaluate(function (s) {
        return document.querySelector(s).innerHTML;
    }, 'body');
    var innerhtml = "<title>" + title + "</title>" + "<body>" + body + "</body>";
    console.log(innerhtml);
    
    

    phantom.exit();

} );