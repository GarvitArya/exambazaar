/**
 * ngTweet - Angular directives for better Twitter integration.
 *
 * @license
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Aru Sahni, http://arusahni.net
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */
!function(){"use strict";angular.module("ngtweet",[]).value("ngTweetLogVerbose",!0).value("twitterWidgetURL","https://platform.twitter.com/widgets.js")}(),function(){"use strict";function e(e,t){var n=function(){},i=function(e){return t===!0?e:n};return{log:i(e.log),debug:i(e.debug),info:i(e.info),warn:e.warn,error:e.error}}e.$inject=["$log","ngTweetLogVerbose"],angular.module("ngtweet").factory("ngTweetLogger",e)}(),function(){"use strict";function e(e,t){function n(e,t){this.timelineType=e,this.message=t}function i(e){function t(e){return 1===e.length?'"'+e+'"':'("'+e.join('" AND "')+'")'}return e.map(t).join(" OR ")}function r(e){var t={sourceType:e.sourceType};if(!u.hasOwnProperty(e.sourceType))throw new n(e.sourceType,"unknown type");for(var r=u[e.sourceType],o=!1,c=0,a=r.length;a>c;c++){for(var d=r[c],g={},l=0,s=d.length;s>l;l++)e[d[l]]&&(g[d[l]]=e[d[l]]);if(Object.keys(g).length===s){angular.merge(t,g),o=!0;break}}if(!o)throw new n(e.sourceType,"args: "+i(r));return t}function o(n,i,o){e.debug("Linking",n,i,o),n.id&&!angular.isString(n.id)&&e.warn("twitterTimelineId should probably be a string due to loss of precision.");try{n.twitterTimelineOptions=JSON.parse(o.twitterTimelineOptions)}catch(u){n.$watch(function(){return n.$parent.$eval(o.twitterTimelineOptions)},function(e,t){n.twitterTimelineOptions=e})}if(angular.isUndefined(n.twitterTimelineOptions)&&(n.twitterTimelineOptions={}),n.sourceType){var c;try{c=r(n)}catch(u){return void e.error('Could not create new timeline: bad args for type "'+u.timelineType+'". Reason: '+u.message)}t.createTimelineNew(c,i[0],n.twitterTimelineOptions).then(function(t){e.debug("New Timeline Success!!!")})["catch"](function(t){e.error("Could not create new timeline: ",t,i)})}else!angular.isUndefined(n.id)||angular.isString(n.screenName)?t.createTimeline(n.id,n.screenName,i[0],n.twitterTimelineOptions).then(function(t){e.debug("Timeline Success!!!")})["catch"](function(t){e.error("Could not create timeline: ",t,i)}):t.load(i[0])}var u={profile:[["screenName"],["userId"]],likes:[["screenName"],["userId"]],collection:[["id"]],widget:[["id"]],list:[["id"],["ownerScreenName","slug"]],url:[["url"]]};return{restrict:"E",replace:!0,transclude:!0,scope:{id:"=?twitterTimelineId",screenName:"=?twitterTimelineScreenName",sourceType:"@?twitterTimelineType",userId:"=?twitterTimelineUserId",ownerScreenName:"=?twitterTimelineOwnerScreenName",slug:"=?twitterTimelineSlug",url:"=?twitterTimelineUrl"},template:'<div class="ngtweet-wrapper" ng-transclude></div>',link:o}}e.$inject=["ngTweetLogger","TwitterWidgetFactory"],angular.module("ngtweet").directive("twitterTimeline",e)}(),function(){"use strict";function e(e,t){return{restrict:"E",replace:!0,transclude:!0,scope:{twitterWidgetId:"=",twitterWidgetOnRendered:"&",twitterWidgetOptions:"@"},template:'<div class="ngtweet-wrapper" ng-transclude></div>',link:function(n,i,r){n.$watch("twitterWidgetId",function(o,u){e.debug("Linking",i,r);var c=n.$eval(r.twitterWidgetOptions);void 0!==u&&o!==u&&angular.element(i[0]).empty(),angular.isUndefined(n.twitterWidgetId)?t.load(i[0]):(angular.isString(n.twitterWidgetId)||e.warn("twitterWidgetId should probably be a string due to loss of precision."),t.createTweet(n.twitterWidgetId,i[0],c).then(function(t){e.debug("Created tweet widget: ",n.twitterWidgetId,i),n.twitterWidgetOnRendered()})["catch"](function(t){e.error("Could not create widget: ",t,i)}))})}}}e.$inject=["ngTweetLogger","TwitterWidgetFactory"],angular.module("ngtweet").directive("twitterWidget",e)}(),function(){"use strict";function e(e,t,n,i,r,o){function u(){o.twttr=function(e,t,n){var r,u=e.getElementsByTagName(t)[0],c=o.twttr||{};if(!e.getElementById(n))return r=e.createElement(t),r.id=n,r.src=i,u.parentNode.insertBefore(r,u),c._e=[],c.ready=function(e){c._e.push(e)},c}(e[0],"script","twitter-wjs")}function c(){return angular.isUndefined(w)?(w=r.defer(),u(),o.twttr.ready(function(e){n.debug("Twitter script ready"),e.events.bind("rendered",a),w.resolve(e)}),w.promise):w.promise}function a(e){n.debug("Tweet rendered",e.target.parentElement.attributes)}function d(e,t,i){return c().then(function(o){return n.debug("Creating Tweet",o,e,t,i),r.when(o.widgets.createTweet(e,t,i))})}function g(e,t,i,o){return c().then(function(u){return n.debug("Creating Timeline",e,t,o,i),angular.isString(t)&&t.length>0&&(o.screenName=t),r.when(u.widgets.createTimeline(e,i,o))})}function l(e,t,i){return c().then(function(o){return n.debug("Creating new Timeline",e,i,t),r.when(o.widgets.createTimeline(e,t,i))})}function s(e){c().then(function(t){n.debug("Wrapping",t,e),t.widgets.load(e)})["catch"](function(t){n.error("Could not wrap element: ",t,e)})}var w;return{createTweet:d,createTimeline:g,createTimelineNew:l,initialize:c,load:s}}e.$inject=["$document","$http","ngTweetLogger","twitterWidgetURL","$q","$window"],angular.module("ngtweet").factory("TwitterWidgetFactory",e)}(),function(){"use strict";function e(e,t){return{restrict:"A",replace:!1,scope:!1,link:function(n,i,r){e.debug("Initializing"),t.initialize()}}}e.$inject=["ngTweetLogger","TwitterWidgetFactory"],angular.module("ngtweet").directive("twitterWidgetInitialize",e)}(),function(){"use strict";function e(e){e.decorator("ngTweetLogVerbose",["$delegate",function(e){return!1}])}e.$inject=["$provide"],angular.module("ngtweet").config(e)}();
/**
 * Angular Facebook service
 * ---------------------------
 *
 * Authored by  AlmogBaku (GoDisco)
 *              almog@GoDisco.net
 *              http://www.GoDisco.net/
 *
 * 9/8/13 10:25 PM
 */

angular.module('ngFacebook', [])
  .provider('$facebook', function() {
    var config = {
      permissions:    'email',
      appId:          null,
      version:        'v1.0',
      customInit:     {}
    };

    this.setAppId = function(appId) {
      config.appId=appId;
      return this;
    };
    this.getAppId = function() {
      return config.appId;
    };
    this.setVersion = function(version) {
      config.version=version;
      return this;
    };
    this.getVersion = function() {
      return config.version;
    };
    this.setPermissions = function(permissions) {
      if(permissions instanceof Array) {
        permissions.join(',');
      }
      config.permissions=permissions;
      return this;
    };
    this.getPermissions = function() {
      return config.permissions;
    };
    this.setCustomInit = function(customInit) {
      if(angular.isDefined(customInit.appId)) {
        this.setAppId(customInit.appId);
      }
      config.customInit=customInit;
      return this;
    };
    this.getCustomInit = function() {
      return config.customInit;
    };

    this.$get = ['$q', '$rootScope', '$window', function($q, $rootScope, $window) {
      var $facebook=$q.defer();
      $facebook.config = function(property) {
        return config[property];
      };

      //Initialization
      $facebook.init = function() {
        if($facebook.config('appId')==null)
          throw "$facebookProvider: `appId` cannot be null";

        $window.FB.init(
          angular.extend({ appId: $facebook.config('appId'), version: $facebook.config('version') }, $facebook.config("customInit"))
        );
        //$window.FB.AppEvents.logPageView();
        $rootScope.$broadcast("fb.load", $window.FB);
      };

      $rootScope.$on("fb.load", function(e, FB) {
        $facebook.resolve(FB);

        //Define action events
        angular.forEach([
          'auth.login', 'auth.logout', 'auth.prompt',
          'auth.sessionChange', 'auth.statusChange', 'auth.authResponseChange',
          'xfbml.render', 'edge.create', 'edge.remove', 'comment.create',
          'comment.remove', 'message.send'
        ],function(event) {
          FB.Event.subscribe(event, function(response) {
            $rootScope.$broadcast("fb."+event, response, FB);
            if(!$rootScope.$$phase) $rootScope.$apply();
          });
        });

        // Make sure 'fb.auth.authResponseChange' fires even if the user is not logged in.
        $facebook.getLoginStatus();
      });

      /**
       * Internal cache
       */
      $facebook._cache={};
      $facebook.setCache = function(attr,val) {
        $facebook._cache[attr]=val;
      };
      $facebook.getCache = function(attr) {
        if(angular.isUndefined($facebook._cache[attr])) return false;
        return $facebook._cache[attr];
      };
      $facebook.clearCache = function() {
        $facebook._cache = {};
      };

      /**
       * Authentication
       */

      var firstAuthResp=$q.defer();
      var firstAuthRespReceived=false;
      function resolveFirstAuthResp(FB) {
        if (!firstAuthRespReceived) {
          firstAuthRespReceived=true;
          firstAuthResp.resolve(FB);
        }
      }

      $facebook.setCache("connected", null);
      $facebook.isConnected = function() {
        return $facebook.getCache("connected");
      };
      $rootScope.$on("fb.auth.authResponseChange", function(event, response, FB) {
        $facebook.clearCache();

        if(response.status=="connected") {
          $facebook.setCache("connected", true);
        } else {
          $facebook.setCache("connected", false);
        }
        resolveFirstAuthResp(FB);
      });

      $facebook.getAuthResponse = function () {
        return FB.getAuthResponse();
      };
      $facebook.getLoginStatus = function (force) {
        var deferred=$q.defer();

        return $facebook.promise.then(function(FB) {
          FB.getLoginStatus(function(response) {
            if(response.error)  deferred.reject(response.error);
            else {
                deferred.resolve(response);
                if($facebook.isConnected()==null)
                    $rootScope.$broadcast("fb.auth.authResponseChange", response, FB);
            }
            if(!$rootScope.$$phase) $rootScope.$apply();
          }, force);
          return deferred.promise;
        });
      };
      $facebook.login = function (permissions, rerequest) {
        if(permissions==undefined) permissions=$facebook.config("permissions");
        var deferred=$q.defer();

        var loginOptions = { scope: permissions };
        if (rerequest) {
          loginOptions.auth_type = 'rerequest';
        }

        return $facebook.promise.then(function(FB) {
          FB.login(function(response) {
            if(response.error)  deferred.reject(response.error);
            else                deferred.resolve(response);
            if(!$rootScope.$$phase) $rootScope.$apply();
          }, loginOptions);
          return deferred.promise;
        });
      };
      $facebook.logout = function () {
        var deferred=$q.defer();

        return $facebook.promise.then(function(FB) {
          FB.logout(function(response) {
            if(response.error)  deferred.reject(response.error);
            else                deferred.resolve(response);
            if(!$rootScope.$$phase) $rootScope.$apply();
          });
          return deferred.promise;
        });
      };
      $facebook.ui = function (params) {
        var deferred=$q.defer();

        return $facebook.promise.then(function(FB) {
          FB.ui(params, function(response) {
            if(response && response.error_code) {
              deferred.reject(response.error_message);
            } else {
              deferred.resolve(response);
            }
            if(!$rootScope.$$phase) $rootScope.$apply();
          });
          return deferred.promise;
        });
      };
      $facebook.api = function () {
        var deferred=$q.defer();
        var args=arguments;
        args[args.length++] = function(response) {
          if(response.error)        deferred.reject(response.error);
          if(response.error_msg)    deferred.reject(response);
          else                      deferred.resolve(response);
          if(!$rootScope.$$phase) $rootScope.$apply();
        };

        return firstAuthResp.promise.then(function(FB) {
          FB.api.apply(FB, args);
          return deferred.promise;
        });
      };

      /**
       * API cached request - cached request api with promise
       *
       * @param path
       * @returns $q.defer.promise
       */
      $facebook.cachedApi = function() {
        if(typeof arguments[0] !== 'string')
          throw "$facebook.cacheApi can works only with graph requests!";

        var promise = $facebook.getCache(arguments[0]);
        if(promise) return promise;

        var result = $facebook.api.apply($facebook, arguments);
        $facebook.setCache(arguments[0], result);

        return result;
      };

      return $facebook;
    }];
  })
  .run(['$rootScope', '$window', '$facebook', function($rootScope, $window, $facebook) {
    $window.fbAsyncInit = function() {
      $facebook.init();
      if(!$rootScope.$$phase) $rootScope.$apply();
    };
  }])
;
