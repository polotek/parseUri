;(function(yam, undefined) {

// This is the yammer fork of parseuri.js.
// Any changes MUST BE IMMEDIATELY pushed back upstream, as this will be
// copy pasted over.
// To prevent jsmin from removing copyright, /*! */ is added.
// =============== BEGIN parseUri =========================

/*!
// a node.js module fork of
// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License
// see: http://blog.stevenlevithan.com/archives/parseuri
// see: http://stevenlevithan.com/demo/parseuri/js/
*/

function parseUri (str) {
  var	o   = parseUri.options,
  m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str||''),
  uri = {},
  i   = 14;

  while (i--) uri[o.key[i]] = m[i] || "";

  uri[o.q.name] = {};
  uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
    if ($1) uri[o.q.name][$1] = $2;
  });

  return uri;
};

parseUri.options = {
  strictMode: false,
  key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
  q:   {
    name:   "queryKey",
    parser: /(?:^|&)([^&=]*)=?([^&]*)/g
  },
  parser: {
    strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
    loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
  }
};

// =========== END parseUri ===========

yam.ns('yam.uri');

/**
 * Parse a URI string into an object with keys representing the relevant parts.
 * See parseUri
 * @param String The uri to parse
 */
yam.uri.parse = parseUri

/**
 * Join the parts of an object created by yam.uri.parse into a valid uri. This is
 * not guaranteed to work with custom objects. Also, if you have not modified the
 * parsed object, just use uriObj.source which contains the original string.
 * @param Object an object returned from yam.uri.parse
 */
yam.uri.stringify = function(uriObj) {
  var keys = parseUri.options.key
      uri = '';

  for(var i = 0, len = keys.length; i < len; i++) {
    // For the query, use the queryKey object because it may have been modified
    if(keys[i] === 'query') {
      uri += yam.paramify( uriObj['queryKey'] );
    } else {
      uri += uriObj[ keys[i] ];
    }
  }
}

})(yam);
