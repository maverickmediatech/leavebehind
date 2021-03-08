
function getUrlVars(){
   var vars = [], hash;
   var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
   console.log(hashes);
   for(var i = 0; i < hashes.length; i++)
   {
           hash = hashes[i].split('=');
           //vars[hash[0]] = hash[1];
           vars.push({"name":hash[0], "value":hash[1]});
   }
   return vars;
}


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

        _lb.addParams(tracklink, function(newtracklink){

          _lb.checkSiteMode(queryString,function(showads){
              if(showads){
                _lb.hideSiteContents();
                _lb.loadAds(div_id, size);
              }else{
              //  console.log(newtracklink);
                _lb.replaceClickEvent(cssclass, hostDomain,queryString, newtracklink);
              }
          });
        });
      }
    }



    /*
     Add current existing params to the received URL
     */
    _lb.addParams = function(url_i,  callback){

        const _url = new URLSearchParams(window.location.search);

        var chnm1  = _url.get('chnm');
        var chnm2  = _url.get('chnm2');
        var chnm3  = _url.get('chnm3');

        var url = new URL(url_i);

        url.searchParams.set('chnm',chnm1);
        url.searchParams.set('chnm2',chnm2);
        url.searchParams.set('chnm3',chnm3);

        if(callback)
          callback(url.toString());
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
          window.location = tracklink;
      },100);
    }

    _lb.forwardParameters = function(uri, callback){
      var new_uri = false;

      const urlParams = new URLSearchParams(window.location.search);

      if(callback)
        callback(newuri);

    }

    _lb.replaceClickEvent = function(cssclass, host, query, tracklink){

      var body = document.getElementsByTagName('body')[0];
      var links = body.getElementsByClassName(cssclass);
      for(var i = 0 ; i < links.length; i++){
      	var link = links[i];
      	var target_link_uri = link.getAttribute("href");
        //this is not needed, since the add will always be shown in another page, there's no need to show it on the current page.
      	//var reload_link_uri =  _lb.updateQueryStringParameter(query, 'ss','1');
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
                  //    console.log(error);
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
