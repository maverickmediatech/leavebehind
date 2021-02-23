/**
 *
 *
 * @author Jerry Bendy <jerry@icewingcc.com>
 * @licence MIT
 *
 */

(function(self) {
    'use strict';

    var nativeURLSearchParams = (function() {
            // #41 Fix issue in RN
            try {
                if (self.URLSearchParams && (new self.URLSearchParams('foo=bar')).get('foo') === 'bar') {
                    return self.URLSearchParams;
                }
            } catch (e) {}
            return null;
        })(),
        isSupportObjectConstructor = nativeURLSearchParams && (new nativeURLSearchParams({a: 1})).toString() === 'a=1',
        // There is a bug in safari 10.1 (and earlier) that incorrectly decodes `%2B` as an empty space and not a plus.
        decodesPlusesCorrectly = nativeURLSearchParams && (new nativeURLSearchParams('s=%2B').get('s') === '+'),
        __URLSearchParams__ = "__URLSearchParams__",
        // Fix bug in Edge which cannot encode ' &' correctly
        encodesAmpersandsCorrectly = nativeURLSearchParams ? (function() {
            var ampersandTest = new nativeURLSearchParams();
            ampersandTest.append('s', ' &');
            return ampersandTest.toString() === 's=+%26';
        })() : true,
        prototype = URLSearchParamsPolyfill.prototype,
        iterable = !!(self.Symbol && self.Symbol.iterator);

    if (nativeURLSearchParams && isSupportObjectConstructor && decodesPlusesCorrectly && encodesAmpersandsCorrectly) {
        return;
    }


    /**
     * Make a URLSearchParams instance
     *
     * @param {object|string|URLSearchParams} search
     * @constructor
     */
    function URLSearchParamsPolyfill(search) {
        search = search || "";

        // support construct object with another URLSearchParams instance
        if (search instanceof URLSearchParams || search instanceof URLSearchParamsPolyfill) {
            search = search.toString();
        }
        this [__URLSearchParams__] = parseToDict(search);
    }


    /**
     * Appends a specified key/value pair as a new search parameter.
     *
     * @param {string} name
     * @param {string} value
     */
    prototype.append = function(name, value) {
        appendTo(this [__URLSearchParams__], name, value);
    };

    /**
     * Deletes the given search parameter, and its associated value,
     * from the list of all search parameters.
     *
     * @param {string} name
     */
    prototype['delete'] = function(name) {
        delete this [__URLSearchParams__] [name];
    };

    /**
     * Returns the first value associated to the given search parameter.
     *
     * @param {string} name
     * @returns {string|null}
     */
    prototype.get = function(name) {
        var dict = this [__URLSearchParams__];
        return this.has(name) ? dict[name][0] : null;
    };

    /**
     * Returns all the values association with a given search parameter.
     *
     * @param {string} name
     * @returns {Array}
     */
    prototype.getAll = function(name) {
        var dict = this [__URLSearchParams__];
        return this.has(name) ? dict [name].slice(0) : [];
    };

    /**
     * Returns a Boolean indicating if such a search parameter exists.
     *
     * @param {string} name
     * @returns {boolean}
     */
    prototype.has = function(name) {
        return hasOwnProperty(this [__URLSearchParams__], name);
    };

    /**
     * Sets the value associated to a given search parameter to
     * the given value. If there were several values, delete the
     * others.
     *
     * @param {string} name
     * @param {string} value
     */
    prototype.set = function set(name, value) {
        this [__URLSearchParams__][name] = ['' + value];
    };

    /**
     * Returns a string containg a query string suitable for use in a URL.
     *
     * @returns {string}
     */
    prototype.toString = function() {
        var dict = this[__URLSearchParams__], query = [], i, key, name, value;
        for (key in dict) {
            name = encode(key);
            for (i = 0, value = dict[key]; i < value.length; i++) {
                query.push(name + '=' + encode(value[i]));
            }
        }
        return query.join('&');
    };

    // There is a bug in Safari 10.1 and `Proxy`ing it is not enough.
    var forSureUsePolyfill = !decodesPlusesCorrectly;
    var useProxy = (!forSureUsePolyfill && nativeURLSearchParams && !isSupportObjectConstructor && self.Proxy);
    /*
     * Apply polifill to global object and append other prototype into it
     */
    Object.defineProperty(self, 'URLSearchParams', {
        value: (useProxy ?
            // Safari 10.0 doesn't support Proxy, so it won't extend URLSearchParams on safari 10.0
            new Proxy(nativeURLSearchParams, {
                construct: function(target, args) {
                    return new target((new URLSearchParamsPolyfill(args[0]).toString()));
                }
            }) :
            URLSearchParamsPolyfill)
    });

    var USPProto = self.URLSearchParams.prototype;

    USPProto.polyfill = true;

    /**
     *
     * @param {function} callback
     * @param {object} thisArg
     */
    USPProto.forEach = USPProto.forEach || function(callback, thisArg) {
        var dict = parseToDict(this.toString());
        Object.getOwnPropertyNames(dict).forEach(function(name) {
            dict[name].forEach(function(value) {
                callback.call(thisArg, value, name, this);
            }, this);
        }, this);
    };

    /**
     * Sort all name-value pairs
     */
    USPProto.sort = USPProto.sort || function() {
        var dict = parseToDict(this.toString()), keys = [], k, i, j;
        for (k in dict) {
            keys.push(k);
        }
        keys.sort();

        for (i = 0; i < keys.length; i++) {
            this['delete'](keys[i]);
        }
        for (i = 0; i < keys.length; i++) {
            var key = keys[i], values = dict[key];
            for (j = 0; j < values.length; j++) {
                this.append(key, values[j]);
            }
        }
    };

    /**
     * Returns an iterator allowing to go through all keys of
     * the key/value pairs contained in this object.
     *
     * @returns {function}
     */
    USPProto.keys = USPProto.keys || function() {
        var items = [];
        this.forEach(function(item, name) {
            items.push(name);
        });
        return makeIterator(items);
    };

    /**
     * Returns an iterator allowing to go through all values of
     * the key/value pairs contained in this object.
     *
     * @returns {function}
     */
    USPProto.values = USPProto.values || function() {
        var items = [];
        this.forEach(function(item) {
            items.push(item);
        });
        return makeIterator(items);
    };

    /**
     * Returns an iterator allowing to go through all key/value
     * pairs contained in this object.
     *
     * @returns {function}
     */
    USPProto.entries = USPProto.entries || function() {
        var items = [];
        this.forEach(function(item, name) {
            items.push([name, item]);
        });
        return makeIterator(items);
    };


    if (iterable) {
        USPProto[self.Symbol.iterator] = USPProto[self.Symbol.iterator] || USPProto.entries;
    }


    function encode(str) {
        var replace = {
            '!': '%21',
            "'": '%27',
            '(': '%28',
            ')': '%29',
            '~': '%7E',
            '%20': '+',
            '%00': '\x00'
        };
        return encodeURIComponent(str).replace(/[!'\(\)~]|%20|%00/g, function(match) {
            return replace[match];
        });
    }

    function decode(str) {
        return str
            .replace(/[ +]/g, '%20')
            .replace(/(%[a-f0-9]{2})+/ig, function(match) {
                return decodeURIComponent(match);
            });
    }

    function makeIterator(arr) {
        var iterator = {
            next: function() {
                var value = arr.shift();
                return {done: value === undefined, value: value};
            }
        };

        if (iterable) {
            iterator[self.Symbol.iterator] = function() {
                return iterator;
            };
        }

        return iterator;
    }

    function parseToDict(search) {
        var dict = {};

        if (typeof search === "object") {
            // if `search` is an array, treat it as a sequence
            if (isArray(search)) {
                for (var i = 0; i < search.length; i++) {
                    var item = search[i];
                    if (isArray(item) && item.length === 2) {
                        appendTo(dict, item[0], item[1]);
                    } else {
                        throw new TypeError("Failed to construct 'URLSearchParams': Sequence initializer must only contain pair elements");
                    }
                }

            } else {
                for (var key in search) {
                    if (search.hasOwnProperty(key)) {
                        appendTo(dict, key, search[key]);
                    }
                }
            }

        } else {
            // remove first '?'
            if (search.indexOf("?") === 0) {
                search = search.slice(1);
            }

            var pairs = search.split("&");
            for (var j = 0; j < pairs.length; j++) {
                var value = pairs [j],
                    index = value.indexOf('=');

                if (-1 < index) {
                    appendTo(dict, decode(value.slice(0, index)), decode(value.slice(index + 1)));

                } else {
                    if (value) {
                        appendTo(dict, decode(value), '');
                    }
                }
            }
        }

        return dict;
    }

    function appendTo(dict, name, value) {
        var val = typeof value === 'string' ? value : (
            value !== null && value !== undefined && typeof value.toString === 'function' ? value.toString() : JSON.stringify(value)
        );

        // #47 Prevent using `hasOwnProperty` as a property name
        if (hasOwnProperty(dict, name)) {
            dict[name].push(val);
        } else {
            dict[name] = [val];
        }
    }

    function isArray(val) {
        return !!val && '[object Array]' === Object.prototype.toString.call(val);
    }

    function hasOwnProperty(obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
    }

})(typeof global !== 'undefined' ? global : (typeof window !== 'undefined' ? window : this));


/*Medianet default settings*/
window._mNHandle = window._mNHandle || {};
window._mNHandle.queue = window._mNHandle.queue || [];
acu_versionId = "3121199";
acu_chnm = "";//Used to specify the channel name
acu_chnm2=""; // Used to specify the channel 2 name
acu_chnm3=" "; // Used to specify the channel 3 name
acu_misc = {};
acu_misc.query = ';
acu_misc.zip= '<zip>'; //Used to specify the zip
acu_misc.score='<credit score>'; //Used to specify the credit score/rating


(function(window){
  // You can enable the strict mode commenting the following line
  // 'use strict';

  // This function will contain all our code
  function lb(){
    var _lb = {};


    // Just create a property to our library object.

    _lb.load = function (settings){
      window.onload  = function(){
        var div_id = typeof settings.acu_id !== 'undefined' ?  settings.acu_id.toString() : 421804821;
        var size = typeof settings.size !== 'undefined' ?  settings.size.toString()  : "800x600";
        var cssclass = typeof settings.lbh_class !== 'undefined' ?  settings.lbh_class.toString()  : "lbh";
        var tracklink = typeof settings.tracklink !== 'undefeined' ? settings.tracklink : "https://financejournal.club/view/nGAFW7l4ZoyXsULpihQsULpnFPdoNDBjJ7kpOkrW7xOsITHHY?c=36380&tid=";
        var queryString = window.location.search;
        var hostDomain  = window.location.hostname;

        _lb.checkSiteMode(queryString,function(showads){
            if(showads){
              _lb.hideSiteContents();
              _lb.loadAds(div_id, size);
            }else{
              _lb.replaceClickEvent(cssclass, hostDomain,queryString, tracklink);
            }
        });
      }
    }

    _lb.updateQueryStringParameter = function(uri, key, value){
      var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
       var separator = uri.indexOf('?') !== -1 ? "&" : "?";
       if (uri.match(re)) {
         return uri.replace(re, '$1' + key + "=" + value + '$2');
       }
       else {
         return uri + separator + key + "=" + value;
       }
    }

    _lb.redirectToTracklink = function(tracklink){
      setTimeout(function(){
          window.location.href = tracklink;
      },100);

    }

    _lb.replaceClickEvent = function(cssclass, host, query, tracklink){

      var body = document.getElementsByTagName('body')[0];
      var links = body.getElementsByClassName(cssclass);
      for(var i = 0 ; i < links.length; i++){
      	var link = links[i];
      	var target_link_uri = link.getAttribute("href");
      	var reload_link_uri =  _lb.updateQueryStringParameter(query, 'ss','1');
      	link.setAttribute("target","_blank");
      	link.addEventListener("click",function(event){
      	var targetElement = event.target || event.srcElement;
      	//	_lb.fireLeaveBehind(reload_link_uri);
        _lb.redirectToTracklink(tracklink);
      	});
      }
    }

    _lb.fireLeaveBehind = function(reloaduri){
      setTimeout(function(){
          window.location.replace(reloaduri);
      },100);
    }

    /*hides all divs or html tags within the body with the exception of ours.*/
    _lb.hideSiteContents = function(){
        var body = document.getElementsByTagName('body')[0];
        var divs = body.getElementsByTagName('div');
	      var sections = body.getElementsByTagName('sections');
  	    var footers = document.getElementsByTagName('footer');
	      var headers = document.getElementsByTagName('header');

        for (var i = 0; i <headers.length; i += 1) {
          headers[i].style.display = "none";
        }


	for (var i = 0; i < sections.length; i += 1) {
          sections[i].style.display = "none";
        }

        for (var i = 0; i < divs.length; i += 1) {
          divs[i].style.display = "none";
        }
        console.log('Hide site contents');
    }

    _lb.checkSiteMode = function (urlstring, callback){

      var params = new URLSearchParams(urlstring);
      var showads = params.has('ss');
      if(callback)
        callback(showads);
    }

    _lb.loadAds = function(div_id, size){


      var div = document.createElement("div");
      div.style.cssText='position:absolute;';
      div.id= div_id;
      document.body.appendChild(div);


      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src  = 'https://csearchtopics101.akamaized.net/dacu.js?cid=8CU37R3V6';
      script.async = false;
      script.id ="lbhind";
      script.onload = function(){
             try {
                  window._mNHandle.queue.push(function () {
                    window._mNDetails.loadTag(div_id, "800x600", div_id);
                  });
              }
              catch (error) {
                      console.log(error);
              }
      }
      document.getElementsByTagName('head')[0].appendChild(script);
        return ;
    };

    return _lb;
  }

  // We need that our library is globally accesible, then we save in the window
  if(typeof(window.lbh) === 'undefined'){
    window.lbh = lb();
  }

})(window);
