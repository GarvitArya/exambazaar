/******************************************************* Module **********************************************************************/
/* 
* Angular Js Module - angular-google-auth2 
* Defines a module as 'angular-google-auth2'
*/

var angularGoogleAuth2 = angular.module("angular-google-auth2", []);

/* 
* Angular Js Controller - S_SignInController 
* Initializes the google auth2 'init' options. 
* On 'Sign In' click, auth2 click handler is called and if the login is successful, it provides 'googleUser' object that conatins basic user details along with token. 
* Checks if the user has used 'emailvalidate' attribute. If so, then this attribute allows to validate the login where 'emailvalidate' contains a list of user emails that must be allowed to login.
* Stores the basic user details in localStorage and redirects to the specified page.
*/

/******************************************************* Controllers **********************************************************************/

angularGoogleAuth2.controller("S_SignInController", ["$scope","S_PersonalData","S_GeneralData","$location", function($scope, S_PersonalData, S_GeneralData, $location){
    $scope.s_allowLogin = 0;
	  var googleUser = {};
      var s_startApp = function() {
        gapi.load('auth2', function(){
          auth2 = gapi.auth2.init({
            client_id: $scope.s_client_id,
            cookiepolicy: 'single_host_origin',
            scope: 'profile email',
            hd: $scope.s_hosted_domain
          });
          if(S_PersonalData.s_getPersonalData().isLogin === "no"){
            attachSignin(document.getElementById('s_customBtn'));
          }
        });
      };
      function attachSignin(element) {
        auth2.attachClickHandler(element, {},
            function(googleUser) {
                S_GeneralData.s_setGeneralData($scope.s_third_party);
                $scope.s_getToken = googleUser.getAuthResponse().access_token;
                $scope.s_getName = googleUser.getBasicProfile().getName();
                $scope.s_getEmail = googleUser.getBasicProfile().getEmail();
                $scope.s_getProfilePic = googleUser.getBasicProfile().getImageUrl();
                if($scope.emailvalidate == undefined){
                  $scope.s_allowLogin = 1;
                }else{
                  for(var i = 0; i < $scope.emailvalidate.length; i++){
                      if($scope.emailvalidate[i].email === $scope.s_getEmail){
                          $scope.s_allowLogin = 1;
                          break;
                      }
                  }
                }
                if($scope.s_allowLogin == 1){
                   $scope.s_personalData = {
                        'isLogin' : 'yes',
                        'token' : $scope.s_getToken,
                        'name' : $scope.s_getName,
                        'email' : $scope.s_getEmail,
                        'profile' : $scope.s_getProfilePic,
                        'thirdparty' : $scope.s_third_party
                  };
                  localStorage.setItem("s_google_login", JSON.stringify($scope.s_personalData));
                  $location.path("/" + $scope.s_redirect);
                  $scope.$apply();
                }else{
                  alert("This user has no access to the app!!! Please Sign In with valid credentials");
                  googleUser.disconnect();
                }
            }, function(error) {
                alert(JSON.stringify(error, undefined, 2));
            });
      }
      $scope.s_init = function(){
        s_startApp();
      };
      $scope.s_init();
}]);

/* 
* Angular Js Controller - S_SignOutController 
* On 'Sign out' click, sign outs the user by deleting the localStorage objects 's_google_login' and 's_google_login_third_party' using the 's_flush()' of 'S_GeneralData' service
*/

angularGoogleAuth2.controller("S_SignOutController", ["$scope","S_PersonalData","S_GeneralData","$location", function($scope, S_PersonalData, S_GeneralData, $location){
    $scope.s_logOut = function(){
      if(S_GeneralData.s_getGeneralData().isThirdParty == "no"){
        if(S_PersonalData.s_getPersonalData().isLogin == 'yes'){
          S_GeneralData.s_flush();
          $location.path("/");
          location.reload();
        }
      }
    };
}]);

/******************************************************* Services **********************************************************************/

/* 
* Angular Js Service - S_PersonalData 
* Returns the localStorage object 's_google_login' which contains personal data of signed in user
* this.s_personalData == null : Checks if the there is no personal data present. If so, reset the localStorage object so that user gets signed out.
* this.s_personalData.isLogin == 'no' && this.s_personalData.name != null : Checks if the 'isLogin' is altered to 'no' but still 'name' exists. If so, reset the localStorage object so that user gets signed out.
* this.s_personalData.isLogin != 'no' && this.s_personalData.isLogin != 'yes' : Checks if the 'isLogin' contains any other value than 'no' or 'yes'. If so, reset the localStorage object so that user gets signed out.
* this.s_personalData.isLogin == 'yes' && this.s_personalData.name == null : Checks if the 'isLogin' is yes but the 'name' does not exist. If so, reset the localStorage object so that user gets signed out.
*/

angularGoogleAuth2.service("S_PersonalData", function(){
  this.s_getPersonalData = function(){
    this.s_personalData = JSON.parse(localStorage.getItem("s_google_login"));
    if(this.s_personalData == null || (this.s_personalData.isLogin == 'no' && this.s_personalData.name != null)  || (this.s_personalData.isLogin != 'no' && this.s_personalData.isLogin != 'yes') || (this.s_personalData.isLogin == 'yes' && this.s_personalData.name == null)){
      this.s_isLogin = {
        'isLogin' : 'no'
      };
      localStorage.setItem("s_google_login", JSON.stringify(this.s_isLogin));
    }
    return JSON.parse(localStorage.getItem("s_google_login"));
  };
});

/* 
* Angular Js Service - S_GeneralData
* Creates a 'google_login_in_third_party' object in localStorage and also returns the same when 's_getGeneralData()' is called
* 's_setGeneralData' sets the 'google_login_in_third_party' object in localStorage
* 's_getGeneralData' returns the 'google_login_in_third_party' objct from localStorage
* 's_flush' deletes the 's_google_login' and 's_google_login_third_party' objects
*/

angularGoogleAuth2.service("S_GeneralData", function(){
  this.s_setGeneralData = function(thirdparty){
    this.s_third_party = thirdparty;
    if(this.s_third_party == undefined || this.s_third_party == null){
      this.s_third_party = "no";
    }
    this.s_thirdParty = {
      'isThirdParty' : this.s_third_party
    };
    localStorage.setItem("s_google_login_third_party", JSON.stringify(this.s_thirdParty));
  };
  this.s_getGeneralData = function(){
    return JSON.parse(localStorage.getItem("s_google_login_third_party"));
  };
  this.s_flush = function(){
    localStorage.removeItem("s_google_login");
    localStorage.removeItem("s_google_login_third_party");
  };
});

/******************************************************* Directives **********************************************************************/

/* 
* Angular Js Directive - sSignIn 
* Sign-In directive which fetches the attribute values and assigns it to the controller scope variables.
* Restrict is initialized as 'Attribute' and templateUrl as 'GoogleAuth2Plugin/loginButton.html'
* Scope is defined as '=' to get the value of 'emailvalidate' into the S_SignInController
*/

angularGoogleAuth2.directive("sSignIn", function(){
	return{
    restrict : 'A',
    scope : {
      emailvalidate : '='
    },
		templateUrl : "angular-google-auth2/build/html/sloginButton.html",
    link : function(scope, el, attrs){
      scope.s_client_id = attrs.client;
      scope.s_redirect = attrs.redirect;
      scope.s_third_party = attrs.thirdparty;
      scope.s_hd = attrs.hd.split(',');
      scope.s_hosted_domain = scope.s_hd;
    }
	};
});

/* 
* Angular Js Directive - sSignOut 
* Sign-Out directive contains 'restrict' initialized as 'Attribute' and templateUrl as 'GoogleAuth2Plugin/logoutButton.html'
*/

angularGoogleAuth2.directive("sSignOut", function(){
  return{
    restrict : 'A',
    templateUrl : "angular-google-auth2/build/html/slogoutButton.html"
  };
});