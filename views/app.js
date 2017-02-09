var exambazaar = angular.module('exambazaar', ['ui.router','ngMaterial','ngAria','material.svgAssetsCache','angular-loading-bar', 'ngAnimate','ngCookies','angularMoment','materialCalendar','ngSanitize','angularFileUpload','matchMedia','geolocation','ngGeolocation','angular.vertilize','ngMap']);
//,'ngHandsontable''ngHandsontable',
    (function() {
    'use strict';
    angular
    .module('exambazaar')
    .config(function($mdThemingProvider) {
        $mdThemingProvider
            .theme("default")
            .primaryPalette("red");
    })
    .controller('landingController', landingController);
    function landingController($scope,$window,$http,$state, $document,OTPService,$cookies,categories) {
        if($cookies.getObject('location')){
            $scope.location = $cookies.getObject('location'); 
        }

        $scope.showSubCategories = 0;
        $scope.category = '';
        $scope.setCategory = function(category){
            $scope.showSubCategories = 1;
            $scope.category = category;
        };
        $scope.unsetCategory = function(){
            $scope.showSubCategories = 0;
            $scope.category = '';
        };
        $scope.goToCategory = function(category){
            
            $cookies.putObject('category', category);
            $state.go('category', {categoryName: category.name});
        };
        $scope.categories = categories;
        /*
            
            {
            name: "Educational",
            sub: "UGC NET, SET, CTET, B.Ed. Entrance, ARS NET and more"
            },
        */
    };
    exambazaar.constant('cities',['Jaipur','Hyderabad','Noida','Ajmer','Alwar','Kota','Bikaner','Ganganagar','Sikar','Bhilwara','Juhnjhunu','New Delhi','Delhi','Lucknow','Indore','Bhopal','Roorkee','Thrissur','Mohali','Patiala','Ahmedabad','Vadodara','Surat','Rajkot','Ghaziabad','Agra','Dehradun','Meerut','Allahabad','Amritsar','Bangalore','Guwahati','Kolkata','Gwalior','Pune','Trivandrum','Mumbai','Rohtak','Nasik','Kurukshetra','Shimla','Kanpur','Ludhiana','Coimbatore','Ambala','Mathura','Patna','Mysore','Chandigarh','Chennai','Vishakhapatnam','Vellore']);
    
    exambazaar.constant('categories',[
        
        {
        displayname: "Engineering",
        name: "engineering",
        sub: "JEE Main, JEE Advanced, BITSAT, NATA, GATE and more",
        subcategory:[
            {name:"jee", displayname:"JEE Main & Advanced"},
            {name:"bitsat", displayname:"BITSAT"},
            {name:"nata", displayname:"NATA"},
            {name:"gate", displayname:"GATE"}
            ]
        },
        {
        displayname: "Medical",
        name: "medical",
        sub: "AIIMS, NEET UG, JIPMER, AFMC, PGIMER and more",
        subcategory:[
            {name:"aipmt", displayname:"NEET UG"},
            {name:"aiims", displayname:"AIIMS"},
            {name:"afmc", displayname:"AFMC"}
            //"NEET UG","AIIMS","AFMC","Manipal PMT","GPAT"
            ] //"JIPMER","PGIMER"

        },
        {
        displayname: "CA & CS",
        name: "cacs",
        sub: "CA CPT, CA IPCC, CA Final, CS Foundation Exam and more",
        subcategory:[
            {name:"ca cpt", displayname:"CA CPT"},
            {name:"cs foundation exam", displayname:"CS Foundation Exam"}
            ]//"CA IPCC","CA Final",
        },
        {
        displayname: "School",
        name: "school",
        sub: "NTSE, NSE, KVPY, IMO, NSO and more",
        subcategory:[
            {name:"ntse", displayname:"NTSE"}
            ] // "NSE", "KVPY", "IMO", "NSO"
        },
        {
        displayname: "MBA",
        name: "mba",
        sub: "CAT, XAT, CMAT, SNAP and more",
        subcategory:[
            {name:"cat", displayname:"CAT"},
            /*{name:"cmat", displayname:"CMAT"},*/
            {name:"xat", displayname:"XAT"},
            {name:"snap", displayname:"SNAP"}
            ]//"CAT", "XAT", "CMAT", "SNAP"
        },
        {
        displayname: "Law",
        name: "law",
        sub: "CLAT, AILET, LSAT, CBS and more",
        subcategory:[
            {name:"clat", displayname:"CLAT"},
            {name:"ailet", displayname:"AILET"},
            {name:"lsat", displayname:"LSAT"}
            ]//"CBS"
        },
        {
        displayname: "Foreign Education",
        name: "foreigneducation",
        sub: "IELTS, GRE, GMAT, SAT, TOEFL and more",
        subcategory:[
            {name:"sat", displayname:"SAT"},
            {name:"gmat", displayname:"GMAT"},
            {name:"gre", displayname:"GRE"},
            {name:"ielts", displayname:"IELTS"},
            {name:"toefl", displayname:"TOEFL"}
            ]
        },
        {
        displayname: "Civil Services",
        name: "civilservices",
        sub: "CSE, IPS Ltd. Competitive Exam, UPSC CAPF Exam, IES/ISS Exam, IFS Exam, SCRA and more",
        subcategory:[
            {name:"Civil Services Exam", displayname:"Civil Services Exam"},
            {name:"ies/iss exam", displayname:"IES/ISS Exam"},
            {name:"ifs exam", displayname:"IFS Exam"}
            ]
        },
        {
        displayname: "SSC",
        name: "ssc",
        sub: "SSC CPO (S.I) Exam, SSC CGLE, SSC JE, SSC CHSL Exam, SSC CMLE and more",
        subcategory:[
            {name:"ssc cpo", displayname:"SSC CPO (S.I) Exam"},
            {name:"ssc cgle", displayname:"SSC CGLE"},
            {name:"ssc je", displayname:"SSC JE"},
            {name:"ssc chsl", displayname:"SSC CHSL Exam"},
            {name:"ssc cmle", displayname:"SSC CMLE"}
            ]
        },
        {
        displayname: "Bank",
        name: "bank",
        sub: "Bank Clerical Exam, Bank PO Exam, RBI Exam, SBI PO Exam, IBPS Clerk CWE and more",
        subcategory:[
            {name:"Bank Clerical Exam", displayname:"Bank Clerical Exam"},
            {name:"Bank PO Exam", displayname:"Bank PO Exam"},
            {name:"RBI Exam", displayname:"RBI Exam"},
            {name:"SBI PO Exam", displayname:"SBI PO Exam"},
            {name:"IBPS Clerk CWE", displayname:"IBPS Clerk CWE"}
            ]
        },
        {
        displayname: "Defense",
        name: "defense",
        sub: "CDS Exam, NDA Exam, AFCAT, I.A.F. Exam, I.N.A Exam and more",
        subcategory:[
            {name:"cds exam", displayname:"CDS Exam"},
            {name:"nda exam", displayname:"NDA Exam"},
            {name:"afcat", displayname:"AFCAT"},
            {name:"i.a.f. exam", displayname:"I.A.F. Exam"},
            {name:"i.n.a exam", displayname:"I.N.A Exam"}
            ]
        },
        {
        displayname: "Insurance",
        name: "insurance",
        sub: "IRDA Exam, G.I.C Exam, LIC, L.I.C D.O and more",
        subcategory:[
            {name:"IRDA Exam", displayname:"IRDA Exam"},
            {name:"G.I.C Exam", displayname:"G.I.C Exam"},
            {name:"LIC", displayname:"LIC"},
            {name:"L.I.C D.O", displayname:"L.I.C D.O"}
            ]
        }
        ]
       );
        
    exambazaar.service('UserService', ['$http', function($http) {
        this.saveUser = function(user) {
            return $http.post('/api/users/save', user);
        };
        this.getUser = function(userId) {
            return $http.get('/api/users/edit/'+userId, {userId: userId});
        };
        this.markLogin = function(userId) {
            return $http.get('/api/users/markLogin/'+userId, {userId: userId});
        };
        this.getUsers = function() {
            return $http.get('/api/users');
        };
        this.getUsersCount = function() {
            return $http.get('/api/users/count');
        };
        this.getVerfiedUsersCount = function() {
            return $http.get('/api/users/verfiedCount');
        };
        this.updatePassword = function(userPassword) {
            return $http.post('/api/users/updatePassword',userPassword);
        };
    }]);
    
    exambazaar.service('ProviderService', ['$http', function($http) {
        this.getProviders = function(city) {
            //alert(city);
            return $http.get('/api/providers/'+city, {city: city});
        };
        this.removeDuplicates = function(city) {
            return $http.get('/api/providers/edit/removeDuplicates/'+city, {city: city});
        };
    }]);    
    exambazaar.service('targetStudyProviderService', ['$http', function($http) {
        this.getProviders = function(city) {
            //alert(city);
            return $http.get('/api/targetStudyProviders/city/'+city, {city: city});
        };
        this.getCourseProviders = function(cityCourse) {
            //alert(JSON.stringify(cityCourse));
            return $http.post('/api/targetStudyProviders/cityCourse',cityCourse);
        };
        this.getProvider = function(coachingId) {
            return $http.get('/api/targetStudyProviders/coaching/'+coachingId, {coachingId: coachingId});
        };
        this.saveProvider = function(provider) {
            return $http.post('/api/targetStudyProviders/savecoaching',provider);
        };
        this.getCount = function() {
            return $http.get('/api/targetStudyProviders/count');
        };
        this.getCities = function() {
            return $http.get('/api/targetStudyProviders/cities');
        };
        this.uprank = function(targetStudyProviderId) {
            return $http.get('/api/targetStudyProviders/uprank/'+targetStudyProviderId, {targetStudyProviderId: targetStudyProviderId});
        };
        this.downrank = function(targetStudyProviderId) {
            return $http.get('/api/targetStudyProviders/downrank/'+targetStudyProviderId, {targetStudyProviderId: targetStudyProviderId});
        };
        this.cleanTargetstudyurls = function() {
            return $http.get('/api/targetStudyProviders/cleanTargetstudyurls');
        };
        this.rank0 = function() {
            return $http.get('/api/targetStudyProviders/setRank0');
        };
        this.getAllCourses = function() {
            return $http.get('/api/targetStudyProviders/getAllCourses');
        };
        this.removeDuplicates = function(city) {
            return $http.get('/api/targetStudyProviders/edit/removeDuplicates/'+city, {city: city});
        };
    }]);      
     
    exambazaar.service('NotificationService', ['$http', function($http) {
        this.markRead = function(notification) {
            return $http.post('/api/notifications/markRead', notification);
        };
    }]);
    
    exambazaar.service('MasterService', ['$http', function($http) {
        
        this.addIntern = function(intern) {
            return $http.post('/api/masters/addIntern/',intern);
        };
        
    }]);    
        
    exambazaar.service('StudentService', ['$http', function($http) {
        this.saveStudent = function(student) {
            return $http.post('/api/students/save', student);
        };
        this.saveStudents = function(students) {
            return $http.post('/api/students/bulksave', students);
        };
        
        this.getStudent = function(studentId) {
            return $http.get('/api/students/edit/'+studentId, {studentId: studentId});
        };
        this.getStudentAttendance = function(studentId) {
            return $http.get('/api/students/attendance/'+studentId, {studentId: studentId});
        };
        this.getStudentNotification = function(studentId) {
            return $http.get('/api/students/notification/'+studentId, {studentId: studentId});
        };
        
        this.getStudents = function() {
            return $http.get('/api/students');
        };
        this.getStudentsCount = function() {
            return $http.get('/api/students/count');
        };
    }]);
    
    exambazaar.service('SMSService', ['$http', function($http) {
        this.sendSMS = function(sms) {
            return $http.post('/api/smss/send', sms);
        };
    }]);
    exambazaar.service('OTPService', ['$http', function($http) {
        this.generateOTP= function(otp) {
            return $http.post('/api/otps/generate', otp);
        };
    }]);
    exambazaar.service('ProfilePicService', ['$http', function($http) {
        this.saveProfilePic = function(profilePic) {
            
            return $http.post('/api/profilePics/add', profilePic);
        };
    }]); 
    exambazaar.controller("categoryController", 
        [ '$scope','$stateParams','$cookies','$state','categories','$rootScope', function($scope,$stateParams,$cookies,$state,categories,$rootScope){
        
        //console.info(JSON.stringify(categories));
        $scope.categoryName = $stateParams.categoryName;
        $scope.category = {};
        $scope.subcategory = [];
            
        if($cookies.getObject('category')){
            $scope.category = $cookies.getObject('category');
            console.info('Found Cookie');
        }else{
            categories.forEach(function(thisCategory, categoryIndex){
            if(thisCategory.name == $scope.categoryName){
                $scope.category = thisCategory;
                //$cookies.putObject('category', thisCategory);
            }
            });
        }
        $rootScope.pageTitle = $scope.category.displayname + ' deals at Exam Bazaar';    
        $scope.goToCity = function(subcategory){ 
            $cookies.putObject('subcategory', subcategory);
            $state.go('city');
        };
            
    }]); 
        
    exambazaar.controller("cityController", 
        [ '$scope','$stateParams','$cookies','$state','cities','$rootScope','categories', function($scope,$stateParams,$cookies,$state,cities,$rootScope,categories){
        
        $scope.cities = cities;
        $scope.category = {};
        $scope.categoryName = $stateParams.categoryName;
        $scope.subCategoryName = $stateParams.subCategoryName;
            
        $scope.subcategory = [];
            
        if($cookies.getObject('category')){
            $scope.category = $cookies.getObject('category');
            
            if($cookies.getObject('subcategory')){
                $scope.subcategory = $cookies.getObject('subcategory');
                //console.info($scope.subcategory);
            }else{
                //alert(JSON.stringify($scope.category));
                $state.go('category', {categoryName: $scope.category.name});
            }
            
        }else{
            categories.forEach(function(thisCategory, categoryIndex){
            if(thisCategory.name == $scope.categoryName){
                $scope.category = thisCategory;
            }
            });
            $scope.category.subcategory.forEach(function(thisSubCategory, SubCategoryIndex){
            if(thisSubCategory.name == $scope.subCategoryName){
                $scope.subcategory = thisSubCategory;
            }
            });
            
            if(!$scope.category){
                $state.go('main');
            }
            if(!$scope.subcategory){
                $state.go('main');
            }
            //$state.go('main');
        }
            
        $rootScope.pageTitle = $scope.subcategory.displayname + ' deals at Exam Bazaar'; 
            
        $scope.showCoaching = function(city){ 
            $cookies.putObject('city', city);
            $state.go('findCoaching', {cityName: city});
        };
            
    }]);    
    
    exambazaar.controller("findCoachingController", 
    [ '$scope','$rootScope', 'targetStudyProviderService','targetStudyProvidersList','cities','$state','$stateParams', '$cookies','categories', function($scope,$rootScope, targetStudyProviderService,targetStudyProvidersList,cities,$state,$stateParams, $cookies,categories){
       
        
        
        $scope.categoryName = $stateParams.categoryName;
        $scope.subCategoryName = $stateParams.subCategoryName;
        $scope.city = $stateParams.cityName;
        
        categories.forEach(function(thisCategory, categoryIndex){
            if(thisCategory.name == $scope.categoryName){
                $scope.category = thisCategory;
            }
        });
        $scope.category.subcategory.forEach(function(thisSubCategory, SubCategoryIndex){
        if(thisSubCategory.name == $scope.subCategoryName){
            $scope.subcategory = thisSubCategory;
            $scope.searchText = $scope.subcategory.name;
            $scope.filterText = $scope.subcategory.name;
        }
        });
        
        $scope.providersList = targetStudyProvidersList.data;
        
        $scope.providersList.forEach(function(thisProvider, providerIndex){
            thisProvider.mapAddress = thisProvider.name + ', ' + thisProvider.address + ', ' + thisProvider.city + ' ' + thisProvider.pincode;
            thisProvider.showDetails = false;
            if(providerIndex==0){
                //alert(thisProvider.name);
                thisProvider.showDetails = true;
            }
        });
        
        $scope.showCoaching = function(provider){
            $scope.providersList.forEach(function(thisProvider, providerIndex){
                thisProvider.showDetails = false;
            });
            provider.showDetails = true;
        };
        $scope.cities = cities;
        $rootScope.pageTitle = $scope.city + ": " + $scope.subcategory.displayname + " institutes around you";
        
        $scope.setFilter = function(text){
            $scope.searchText = text;
        };
        $scope.clearFilter = function(text){
            $scope.searchText = '';
        };
        
        
    }]); 
    
    exambazaar.controller("showCoachingController", 
    [ '$scope','$rootScope', 'targetStudyProviderService','thisProvider','$state','$stateParams', '$cookies','categories', function($scope,$rootScope, targetStudyProviderService,thisProvider,$state,$stateParams, $cookies,categories){
        $scope.categoryName = $stateParams.categoryName;
        $scope.subCategoryName = $stateParams.subCategoryName;
        $scope.city = $stateParams.cityName;
        $scope.editable = false;
        if($cookies.getObject('sessionuser')){
            var user = $cookies.getObject('sessionuser');
            if(user.userType=='Master'){
                $scope.editable = true;
                //alert(JSON.stringify(user));
            }
            
            //console.info($scope.subcategory);
        }
        
        
        categories.forEach(function(thisCategory, categoryIndex){
            if(thisCategory.name == $scope.categoryName){
                $scope.category = thisCategory;
            }
        });
        $scope.showMap = false;
        $scope.flipMap = function(){
              $scope.showMap = !$scope.showMap;
        };
        $scope.category.subcategory.forEach(function(thisSubCategory, SubCategoryIndex){
        if(thisSubCategory.name == $scope.subCategoryName){
            $scope.subcategory = thisSubCategory;
        }
        });
        
        $scope.provider = thisProvider.data;
        
        if($scope.provider.pincode){
            $scope.provider.mapAddress = $scope.provider.name + ', ' + $scope.provider.city + ' ' + $scope.provider.pincode;
        }else{
            $scope.provider.mapAddress = $scope.provider.name + ', ' + $scope.provider.address + ' ' + $scope.provider.city;   
        }
        
        
        $rootScope.pageTitle = $scope.provider.name + ": " + $scope.subcategory.displayname + " preparation in " + $scope.city;
        
        
    }]);    
        
    exambazaar.controller("masterDashboardController", 
        [ '$scope','usersCount','verifiedUsersCount','coachingCount', function($scope, usersCount,verifiedUsersCount,coachingCount){
            
            $scope.usersCount = usersCount.data;
            $scope.coachingCount = coachingCount.data;
            $scope.verifiedUsersCount = verifiedUsersCount.data;
    }]);
    
    exambazaar.controller("seocontroller", ['$rootScope', function($rootScope){
        $rootScope.pageTitle = "Exambazaar: Exclusive Deals and Videos for test preparation";
    }]);
        
    exambazaar.controller("headerController", 
        [ '$scope','$rootScope','$state','$cookies','$http','UserService','NotificationService','StudentService','geolocation','$geolocation', function($scope,$rootScope,$state,$cookies,$http,UserService,NotificationService,StudentService,geolocation,$geolocation){
        /*if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position){
                alert(JSON.stringify(position));
                $scope.position = position;
              
            });
        }*/
        //geolocation.getLocation().then(function(data){
        geolocation.getLocation().then(function(data){
            $scope.coords = {lat:data.coords.latitude, long:data.coords.longitude, accuracy:data.coords.accuracy};
            //alert(data.coords.accuracy);
            $cookies.putObject('location', $scope.coords);
        });
            
            
            
        if(typeof($cookies.getObject('sessionuser'))!= 'undefined'){
            $scope.sessionuser = $cookies.getObject('sessionuser');
        }
        $scope.notification = {
            read: [],
            unread: []
        };
           
        if($scope.sessionuser != null){
            
           if($scope.sessionuser.studentId != null){
               StudentService.getStudentNotification($scope.sessionuser.studentId).success(function (data, status, headers) {
                    
               $scope.$evalAsync(
                    function( $scope ) {
                        $scope.notification = data;
                        //alert(JSON.stringify(data));
                    }
                ); 
                   
                })
                .error(function (data, status, header, config) {
                    alert(status + " " + data);
                });
            }    
        }
        $scope.markRead = function(thisnotification){
            var readNotification = {
                studentId:$scope.sessionuser.studentId,
                teacherId:$scope.sessionuser.teacherId,
                notificationId:thisnotification._id
            };
            NotificationService.markRead(readNotification).success(function (data, status, headers) {
                //alert("Done");
                
            })
            .error(function (data, status, header, config) {
                $scope.ServerResponse =  htmlDecode("Data: " + data +
                    "\n\n\n\nstatus: " + status +
                    "\n\n\n\nheaders: " + header +
                    "\n\n\n\nconfig: " + config);
            });
        };    
            
        
            
        $scope.login = function(){
            $http.post('/login', {
              mobile: $scope.login.mobile,
              password: $scope.login.password,
            })
            .success(function(user){
                UserService.markLogin(user._id).success(function (data, status, headers) {
                    console.info('Login marked');
                })
                .error(function (data, status, header, config) {
                    alert(status + " " + data);    
                });
                
                
                UserService.getUser(user._id).success(function (data, status, headers) {
                    var fulluser = data;
                    var sessionuser;
                    //user.verified="true";
                    if(user.verified=="true"){
                        console.info('User type: ' + user.userType);
                        
                        sessionuser = {
                            userId: fulluser._id,
                            masterId: fulluser._id,
                            userType: fulluser.userType,
                            basic: fulluser.basic,
                            mobile: fulluser.mobile,
                            email: fulluser.email,
                            nLogins: fulluser.logins.length
                        };
                        console.info(JSON.stringify(sessionuser));
                        $cookies.putObject('sessionuser', sessionuser);
                        //alert($state.current.name);
                        
                        if($state.current.name == 'main'){
                            $state.go('master-dashboard', {masterId: sessionuser.masterId});
                        }else{
                            $state.reload();
                        }
                        
                        
                    }else{
                        //alert("User id is: " + user._id);
                        $state.go('verify', {userId: user._id});
                    }
                    
                })
                .error(function (data, status, header, config) {
                $scope.ServerResponse =  htmlDecode("Data: " + data +
                    "\n\n\n\nstatus: " + status +
                    "\n\n\n\nheaders: " + header +
                    "\n\n\n\nconfig: " + config);
                });
            
            
            })
            .error(function(){
              // Error: authentication failed
              $scope.login.password="";
              $rootScope.message = 'Incorrect mobile or password';
              $state.go('main');
            });
        };//login ends
        $scope.logout = function(){
            $cookies.remove('sessionuser');
            $http.post('/logout');
            $state.reload();
            //$state.go("main", {}, {reload: true});
        };
            
    }]); 
    
    exambazaar.controller("UserController", 
        [ '$scope','$state', 'thisuser','UserService','StudentService','TeacherService','$http', function($scope,$state, thisuser,UserService,StudentService,TeacherService,$http){
            $scope.thisuser = thisuser.data;
            if($scope.thisuser.userType=='Student'){
                alert($scope.thisuser._student._id);
                //$state.go('institute', {instituteId: $scope.thisuser._institute._id});
                $state.go('student', {studentId: $scope.thisuser._student[0]._id});
            }
            if($scope.thisuser.userType=='Teacher'){
                //alert($scope.thisuser._teacher._id);
                //$state.go('institute', {instituteId: $scope.thisuser._institute._id});
                $state.go('teacher', {teacherId: $scope.thisuser._teacher[0]._id});
            }
    }]);
      
    
    exambazaar.controller("verifyController", 
    [ '$scope','thisuser','OTPService','UserService','$rootScope','$state','$cookies', function($scope,thisuser,OTPService,UserService,$rootScope,$state,$cookies){
        $scope.user = thisuser.data;
        //alert(JSON.stringify($scope.user));
        $scope.sessionuser = $cookies.getObject('sessionuser');
        
        $scope.enterOTP=false;
        $scope.setOTP;
        $scope.next=false;
        $scope.privacyPolicy=false;
        $scope.OTPgenerated=false;
        $scope.acceptPrivacyPolicy=false;
        
        
        var thisOTP = {
            _user:$scope.user._id,
            firstName:$scope.user.firstName,
            mobile:$scope.user.mobile,
            otp: generateOtp(),
            reason : 'Verification'
        };
        
        $scope.generateUserOTP = function(){
            //alert(JSON.stringify(thisOTP));
            OTPService.generateOTP(thisOTP).success(function (data, status, headers) {
            $scope.acknowledgement = data;
            $scope.enterOTP = true;
            $scope.setOTP = data.otp;
            $rootScope.message="OTP sent to mobile " + thisOTP.mobile;
            })
            .error(function (data, status, header, config) {
                $scope.ServerResponse =  htmlDecode("Data: " + data +
                    "\n\n\n\nstatus: " + status +
                    "\n\n\n\nheaders: " + header +
                    "\n\n\n\nconfig: " + config);
            });
            $scope.OTPgenerated=true;
        };
        
        $scope.checkOTP = function(){
            if($scope.inputOTP ==$scope.setOTP){
                $scope.privacyPolicy=true;
                $scope.acceptPrivacyPolicy=true;
            }else{
                $scope.privacyPolicy=false;
                $scope.acceptPrivacyPolicy=true;
            }
        }
        $scope.setNewPassword = function(){
            //alert($scope.password);
           var userPassword = {
               userId: $scope.user._id,
               newPassword: $scope.password
           };
            UserService.updatePassword(userPassword).success(function (data, status, headers) {
                //alert("all done");
                $rootScope.message = 'User verified & password updated! Please login again.';
                $scope.logout();
                //$state.go('main');
            })
            .error(function (data, status, header, config) {
                $scope.ServerResponse =  htmlDecode("Data: " + data +
                    "\n\n\n\nstatus: " + status +
                    "\n\n\n\nheaders: " + header +
                    "\n\n\n\nconfig: " + config);
            });
            
        }
        $scope.logout = function(){
            
                $cookies.remove('sessionuser');
                //$http.post('/logout');
            //alert("Logging out now");
                $state.reload();
                //$state.go("main", {}, {reload: true});
            };
    }]);
    
    exambazaar.controller("internshipController", 
        [ '$scope','$rootScope', 'FileUploader','MasterService',function($scope,$rootScope,FileUploader,MasterService){
            $scope.submitted = 0;
            $rootScope.pageTitle = 'Internships at Exam Bazaar'; 
            
            var uploader = $scope.uploader = new FileUploader({
            url: 'https://file.io',
            /*alias: 'image',
            headers: {
                Authorization: 'Client-ID a1dc6fb18b097c6',
            },*/
            autoUpload: true
            });
            uploader.onSuccessItem = function(fileItem, response, status, headers) {
                //console.info('onSuccessItem', fileItem, response, status, headers);
                var link = response.link;
                //alert(JSON.stringify(response.link));
                console.info('Resume added');
                if(link){
                    $scope.applicant.resume = link;
                }
            };
            
            $scope.submit = function(){
                if($scope.applicant.resume){
                    console.info("Ready to add to database");
                    MasterService.addIntern($scope.applicant).success(function (data, status, headers) {
                        console.info("Done");
                        //alert("Thank you, your application has been submitted");
                        $scope.submitted = 1;
                    })
                    .error(function (data, status, header, config) {
                        console.info("Error!!!");
                        alert("Something went wrong. Instead email you candidacy to gaurav@educhronicle.com");
                    });
                }else{
                    alert('Add Resume or wait for it to upload before submitting');
                }
            };
            
            $scope.responsibilities = [
                'Assist in building partnership with education providers and pitching our product over phone',
                'Organizing and attending meetings with external parties to discuss strategic collaboration',
                'Perform analysis of marketing and sales data and effectiveness of business develop efforts',
                'Assist in the distribution and delivery of marketing material',
                'Prepare presentations (pitch and marketing material)',
                'Generate leads for the business to grow',
                'If required, visit education providers on field and present company marketing material',
                'Maintain tracking report of public relations activity'
            ];
            $scope.requirements = [
                'Excellent verbal and written communication skills, with extensive knowledge of social media',
                'Proficient in Microsoft PowerPoint, Word and Excel',
                'Good organizational and execution skills, focus on detail',
                'Strong team player who can work independently'
            ];
    }]);

    exambazaar.controller("masterController", 
    [ '$scope', 'thismaster', function($scope, thismaster){
        $scope.master = thismaster.data; 
        $scope.filterText = '';
        $scope.setFilter = function(text){
            $scope.searchText = text;
        };
        $scope.clearFilter = function(text){
            $scope.searchText = '';
        };
        var tempFilterText = '',
            filterTextTimeout;
        $scope.$watch('searchText', function (val) {
            if (filterTextTimeout) $timeout.cancel(filterTextTimeout);

            tempFilterText = val;
            filterTextTimeout = $timeout(function() {
                $scope.filterText = tempFilterText;
            }, 250); // delay 250 ms
        });
    }]);
    
     
    exambazaar.controller("getTargetStudyCoachingController", 
    [ '$scope', 'targetStudyProviderService','targetStudyProvidersList','targetStudyCities','$timeout','$state','$stateParams', '$cookies', function($scope, targetStudyProviderService,targetStudyProvidersList,targetStudyCities,$timeout,$state,$stateParams, $cookies){
        if($cookies.getObject('location')){
            $scope.location = $cookies.getObject('location');
            //alert($scope.location);
            /*var latlon = $scope.location.lat + "," + $scope.location.long;
            $scope.img_url = "https://maps.googleapis.com/maps/api/staticmap?center="+latlon+"&zoom=14&size=400x300&sensor=false";*/
        }
        
        
        $scope.providersList = targetStudyProvidersList.data;
        //alert($scope.providersList);
        $scope.cities = targetStudyCities.data;
        $scope.city = $stateParams.city;
        $scope.filterText = '';
        $scope.setFilter = function(text){
            $scope.searchText = text;
        };
        $scope.clearFilter = function(text){
            $scope.searchText = '';
        };
        
        $scope.uprank = function(provider){
            targetStudyProviderService.uprank(provider._id).success(function (data, status, headers) {
                //alert("Done");
                console.info("Done");
            })
            .error(function (data, status, header, config) {
                console.info("Error ");
            });
        };
        $scope.downrank = function(provider){
            targetStudyProviderService.downrank(provider._id).success(function (data, status, headers) {
                //alert("Done");
                console.info("Done");
            })
            .error(function (data, status, header, config) {
                console.info("Error ");
            });
        };
        var tempFilterText = '',
            filterTextTimeout;
        $scope.$watch('searchText', function (val) {
            if (filterTextTimeout) $timeout.cancel(filterTextTimeout);

            tempFilterText = val;
            filterTextTimeout = $timeout(function() {
                $scope.filterText = tempFilterText;
            }, 250); // delay 250 ms
        });
        
        $scope.removeDuplicates = function(){
            targetStudyProviderService.removeDuplicates($scope.city).success(function (data, status, headers) {
                console.info("Done");
            })
            .error(function (data, status, header, config) {
                console.info("Error ");
            });
        };
        $scope.rank0 = function(){
            targetStudyProviderService.rank0().success(function (data, status, headers) {
                console.info("Done");
            })
            .error(function (data, status, header, config) {
                console.info("Error ");
            });
        };
        $scope.getAllCourses = function(){
            targetStudyProviderService.getAllCourses().success(function (data, status, headers) {
                console.info("Done");
            })
            .error(function (data, status, header, config) {
                console.info("Error ");
            });
        };
        
        $scope.cleanTargetstudyurls = function(){
            targetStudyProviderService.cleanTargetstudyurls().success(function (data, status, headers) {
                console.info("Done");
            })
            .error(function (data, status, header, config) {
                console.info("Error ");
            });
        };
        
    }]); 
    
    exambazaar.controller("editTargetStudyCoachingController", 
    [ '$scope', 'targetStudyProviderService','thisTargetStudyProvider','$state','$stateParams', '$cookies', function($scope, targetStudyProviderService,thisTargetStudyProvider,$state,$stateParams, $cookies){
        
        $scope.provider = thisTargetStudyProvider.data;
        
        $scope.uprank = function(provider){
            targetStudyProviderService.uprank(provider._id).success(function (data, status, headers) {
                //alert("Done");
                console.info("Done");
            })
            .error(function (data, status, header, config) {
                console.info("Error ");
            });
        };
        $scope.downrank = function(provider){
            targetStudyProviderService.downrank(provider._id).success(function (data, status, headers) {
                //alert("Done");
                console.info("Done");
            })
            .error(function (data, status, header, config) {
                console.info("Error ");
            });
        };
        $scope.saveCoaching = function(){
            
           var provider = {
               targetStudyProvider: $scope.provider
           }; targetStudyProviderService.saveProvider(provider).success(function (data, status, headers) {
                //alert("Done");
                console.info("Done");
            })
            .error(function (data, status, header, config) {
                console.info("Error ");
            });
        };
        
    }]); 
            
        
    exambazaar.controller("mastergetCoachingController", 
    [ '$scope', 'ProviderService','providersList','$timeout','$state','$stateParams', function($scope, ProviderService,providersList,$timeout,$state,$stateParams){
        //alert("Here");
        //$scope.master = thismaster.data;
        $scope.cities = ['Agra','Ahmedabad','Akola','Aligarh','Allahabad','Amravati','Amritsar','Aurangabad','Bareilly','Belgaum','Bengaluru','Bhavnagar','Bhilai','Bhopal','Bhubaneswar','Bikaner','Bokaro','Chandigarh','Chennai','Cochin','Coimbatore','Cuttack','Dehradun','Delhi','Dhanbad','Durgapur','Gorakhpur','Guwahati','Gwalior','Hyderabad','Indore','Jaipur','Jalandhar','Jalgaon','Jammu','Jamnagar','Jamshedpur','Jhansi','Kanpur','Kolhapur','Kolkata','Kota','Kozhikode','Lucknow','Ludhiana','Madurai','Meerut','Moradabad','Mumbai','Mysore','Nagpur','Nanded','Nashik','Nellore','Patiala','Patna','Pune','Raipur','Rajkot','Ranchi','Salem','Solapur','Surat','Tirupur','Trichy','Trivandrum','Udaipur','Ujjain','Vadodara','Varanasi','Vijayawada','Visakhapatnam'];
        $scope.city = $stateParams.city;
        $scope.providersList = providersList.data;
        $scope.urls = [];
        $scope.filterText = '';
        $scope.setFilter = function(text){
            $scope.searchText = text;
        };
        $scope.clearFilter = function(text){
            $scope.searchText = '';
        };
        var tempFilterText = '',
            filterTextTimeout;
        $scope.$watch('searchText', function (val) {
            if (filterTextTimeout) $timeout.cancel(filterTextTimeout);

            tempFilterText = val;
            filterTextTimeout = $timeout(function() {
                $scope.filterText = tempFilterText;
            }, 250); // delay 250 ms
        });
        
        $scope.removeDuplicates = function(){
            ProviderService.removeDuplicates($scope.city).success(function (data, status, headers) {
                console.info("Done");
            })
            .error(function (data, status, header, config) {
                console.info("Error ");
            });
        };
        
        
        
        
    }]); 
        
    exambazaar.controller("addStudentController", 
        [ '$scope', 'thisinstitute','InstituteService','StudentService','ParentService','$http','$state', function($scope, thisinstitute,InstituteService,StudentService,ParentService,$http,$state){
        $scope.salutations = ["Mr", "Mrs","Miss","Dr"];
        $scope.genders = ["Female", "Male"];
        $scope.sameAddress = true;
        $scope.parentRoles = ["Father", "Mother","Guardian"];
        $scope.student = {
            basic: {
                gender: 'Male',
                dob: new Date("April 29, 1989")
            },
            contact: {
                mobile: '9602241098',
                email: 'gauravparashar294@gmail.com'
            },
            address: {
            street: 'A 12 Model Town A, Jagatpura Road, Malviya Nagar',
            city: 'Jaipur',
            pincode: '302017'  
            },
            parent: {
                basic: {
                    role: 'Father',  
                    firstName: 'Abhay',  
                    lastName: 'Parashar',  
                    gender: 'Male',  
                    dob: new Date("July 25, 1957")
                },
                contact: {
                mobile: '9414061498',
                email: 'abhayparashar27@gmail.com'
                }
            }
        };
        //$scope.student.basic.dob = new Date();
        $scope.institute = thisinstitute.data;
        $scope.student.institute = thisinstitute;
        $scope.setStudent = function(student){
            $scope.student = student;
        };
        $scope.updateProfilePic = function(imageUrl){
            alert(imageUrl);
            $scope.profilePic = imageUrl;
        };
        $scope.addStudent = function () {
            alert($scope.profilePic);
            $scope.student.parent.mobile = $scope.student.contact.mobile;
            $scope.student.parent.email = $scope.student.contact.email;
            //alert("here");
            if($scope.profilePic != ""){
                $scope.student.account = {
                    imageUrl: $scope.profilePic
                };
            }
            var saveStudent = StudentService.saveStudent($scope.student).success(function (data, status, headers) {
            var studentId = data;
            $scope.formmessage = "Student " + $scope.student.basic.firstName + " " + $scope.student.basic.lastName + " saved!";
            
            //alert("Student saved with id:" + studentId);
            var newparent = $scope.student.parent;
            newparent.studentId = studentId;
            var saveParent = ParentService.saveParent(newparent).success(function (data, status, headers) {
                var parentId = data;
                $state.go('institute', {instituteId: $scope.institute._id});
                //alert("Parent saved with id:" +parentId);
            })
            .error(function (data, status, header, config) {
                $scope.ServerResponse =  alert("Data: " + data +
                    "\n\n\n\nstatus: " + status +
                    "\n\n\n\nheaders: " + header +
                    "\n\n\n\nconfig: " + config);
            });
            
            
            })
            .error(function (data, status, header, config) {
                $scope.ServerResponse =  htmlDecode("Data: " + data +
                    "\n\n\n\nstatus: " + status +
                    "\n\n\n\nheaders: " + header +
                    "\n\n\n\nconfig: " + config);
            });
            };
        }]);
    
    exambazaar.controller("addMasterController", 
        [ '$scope', 'UserService','$http','$state', function($scope, UserService,$http,$state){
        $scope.genders = ["Female", "Male"];
        $scope.master = {
            userType: 'Master',
            password: '',
            basic: {
                name: 'Gaurav Parashar',
                gender: 'Male',
                dob: new Date("April 29, 1989")
            },
            contact: {
                mobile: '9829685919',
                email: 'gauravparashar294@gmail.com'
            }
        };
        
        $scope.addMaster = function () {
            var saveMaster = UserService.saveUser($scope.master).success(function (data, status, headers) {
                var masterId = data;
            $scope.formmessage = "Master " + $scope.master.basic.firstName + " " + $scope.master.basic.lastName + " saved!";
            $state.go('master-dashboard', {masterId: masterId});
                
            })
            .error(function (data, status, header, config) {
                console.info('Error ' + data + ' ' + status);
            });
            };
    }]);        
    exambazaar.controller("sitemapController", 
        [ '$scope','$http','$state','cities', function($scope,$http,$state,cities){
        $scope.urlpart1 = 'http://www.exambazaar.com/#/main/';
        $scope.urlpart2 = [
            'engineering/jee/',
            'engineering/bitsat/',
            'engineering/nata/',
            'engineering/gate/',
            'medical/aipmt/',
            'medical/aiims/',
            'medical/afmc/',
            'cacs/ca%20cpt/',
            'cacs/cs%20foundation%20exam/',
            'school/ntse/',
            'mba/cat/',
            'mba/xat/',
            'mba/snap/',
            'law/clat/',
            'law/ailet/',
            'law/lsat/',
            'foreigneducation/sat/',
            'foreigneducation/gmat/',
            'foreigneducation/gre/',
            'foreigneducation/ielts/',
            'foreigneducation/toefl/',
            'ssc/ssc%20cpo/',
            'ssc/ssc%20cgle/',
            'ssc/ssc%20je/',
            'ssc/ssc%20chsl/',
            'ssc/ssc%20cmle/',
            'bank/Bank%20Clerical%20Exam/',
            'bank/Bank%20PO%20Exam/',
            'bank/RBI%20Exam/',
            'bank/SBI%20PO%20Exam/',
            'bank/IBPS%20Clerk%20CWE/',
            'defense/cds%20exam/',
            'defense/nda%20exam/',
            'defense/afcat/',
            'defense/i.a.f.%20exam/',
            'defense/i.n.a%20exam/',
            'insurance/IRDA%20Exam/',
            'insurance/G.I.C%20Exam/',
            'insurance/LIC/',
            'insurance/L.I.C%20D.O/'
        ];
        $scope.urls = [];
        
        $scope.urlpart2.forEach(function(thisurl, urlIndex){
            var newUrl = '<url><loc>' + $scope.urlpart1 + thisurl+'</loc><changefreq>daily</changefreq><priority>1.0</priority></url>';
            $scope.urls.push(newUrl);
        });
        cities.forEach(function(thisCity, cityIndex){
            $scope.urlpart2.forEach(function(thisurl, urlIndex){
                var newUrl = '<url><loc>' + $scope.urlpart1 + thisurl + thisCity+'</loc><changefreq>daily</changefreq><priority>0.7</priority></url>';
                $scope.urls.push(newUrl);
            });
            
        });
            
        
        
        $scope.generateSitemap = function () {
           
        };
    }]);       
        
        
    exambazaar.controller("emailController", 
        [ '$scope','$http','$state','thisstudent', function($scope,$http,$state,thisstudent){
            $scope.student = thisstudent.data;
            $scope.parent = $scope.student.parents[0];
            $scope.institute = $scope.student._institute;
            $scope.batch = $scope.student.batch;
            //alert(JSON.stringify);
            if($scope.parent.basic.gender=="Male"){
                $scope.saluation = "Mr.";
                
            }else{
                $scope.saluation = "Mrs.";
                
            }
            if($scope.student.basic.gender=="Male"){
                $scope.hisher = "his";
                $scope.thenext = "the next Amitabh Bachhan? Or Sachin Tendulkar? Or Vishwanathan Anand?";
            }else{
                $scope.hisher = "her";
                $scope.thenext = "the next Aishwarya Rai? Or Sania Mirza? Or Kalpana Chawla?";
            }
            //alert(JSON.stringify(thisstudent));
        }]);  
    
    exambazaar.config(function($mdDateLocaleProvider) {
    $mdDateLocaleProvider.formatDate = function(date) {
       return moment(date).format('MMM DD YYYY');
        };
    });
        
    //exambazaar.constant('moment', require('moment-timezone'));
    /*exambazaar.value('angularMomentConfig', {
        timezone: 'Asia/Calcutta|Asia/Kolkata' // e.g. 'Europe/London'
    });*/   
    
    exambazaar.config(function ($httpProvider) {
        $httpProvider.interceptors.push(function($q, $location) {
          return {
            response: function(response) {
              // do something on success
                //alert("User logged in!");
                return response;
            },
            responseError: function(response) {
              if (response.status === 401)
                $location.url('/login');
              return $q.reject(response);
            }
          };
        });
    });

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user){
        // Authenticated
        if (user !== '0'){
          deferred.resolve();
        }
        // Not Authenticated
        else {
          $rootScope.message = 'You need to log in.';
          deferred.reject();
          $location.url('/login');
        }
      });
      return deferred.promise;
    };
    exambazaar.config(function($stateProvider, $urlRouterProvider,$locationProvider) {
    $urlRouterProvider.otherwise('/main');
    $stateProvider
        //landing page
        .state('main', {
            url: '/main',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'landing1.html',
                    controller: 'landingController'
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            }
        })
        .state('category', {
            url: '/main/:categoryName',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'category.html',
                    controller: 'categoryController'
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            }
        })
        .state('city', {
            url: '/main/:categoryName/:subCategoryName/',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'city.html',
                    controller: 'cityController'
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            }
        })
        .state('findCoaching', {
            url: '/main/:categoryName/:subCategoryName/:cityName', //masterId?
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'coaching.html',
                    controller: 'findCoachingController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                targetStudyProvidersList: ['targetStudyProviderService','$stateParams',
                    function(targetStudyProviderService,$stateParams) {
                    var cityCourse = {
                        city: $stateParams.cityName,
                        course: $stateParams.subCategoryName
                    };
                        
                    return targetStudyProviderService.getCourseProviders(cityCourse);
                       
                }],
                provider: function() { return {}; }
                
            }
        })
        .state('showCoaching', {
            url: '/main/:categoryName/:subCategoryName/:cityName/:coachingId', //masterId?
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'showCoaching.html',
                    controller: 'showCoachingController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                thisProvider: ['targetStudyProviderService','$stateParams',
                    function(targetStudyProviderService,$stateParams) {  
                    return targetStudyProviderService.getProvider($stateParams.coachingId);
                }],
                provider: function() { return {}; }
                
            }
        })
        .state('privacy', {
            url: '/privacy',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'privacyPolicy.html',
                    controller: 'headerController'
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            }
        })
        .state('about', {
            url: '/about',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'aboutus.html',
                    controller: 'headerController'
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            }
        })
        .state('calendar', {
            url: '/calendar',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'calendar.html',
                    controller: 'calendarCtrl'
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            }
        })
        .state('bulkAddStudents', {
            url: '/:instituteId/bulkAddStudents',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'bulkaddStudents.html',
                    controller: 'bulkAddStudentsCtrl'
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                thisinstitute: ['InstituteService', '$stateParams',
                    function(InstituteService,$stateParams) {
                    return InstituteService.getInstitute($stateParams.instituteId);
                        
                }],
                institute: function() { return {}; }
            }
        })
        .state('bulkAddTeachers', {
            url: '/:instituteId/bulkAddTeachers',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'bulkAddTeachers.html',
                    controller: 'bulkAddTeachersCtrl'
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                thisinstitute: ['InstituteService', '$stateParams',
                    function(InstituteService,$stateParams) {
                    return InstituteService.getInstitute($stateParams.instituteId);
                        
                }],
                institute: function() { return {}; }
            }
        })
        .state('bulkAddBatches', {
            url: '/:instituteId/bulkAddBatches',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'bulkAddBatches.html',
                    controller: 'bulkAddBatchesCtrl'
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                thisinstitute: ['InstituteService', '$stateParams',
                    function(InstituteService,$stateParams) {
                    return InstituteService.getInstitute($stateParams.instituteId);
                        
                }],
                institute: function() { return {}; }
            }
        })
        
        .state('instituteCalendar', {
            url: '/:instituteId/instituteCalendar',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'instituteCalendar.html',
                    controller: 'calendarCtrl'
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                thisinstitute: ['InstituteService', '$stateParams',
                    function(InstituteService,$stateParams) {
                    return InstituteService.getInstitute($stateParams.instituteId);
                        
                }],
                institute: function() { return {}; }
            }
        })
        .state('batchCalendar', {
            url: '/:batchId/batchCalendar',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'batchCalendar.html',
                    controller: 'batchCalendarCtrl'
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
            thisbatch: ['BatchService', '$stateParams',
                function(BatchService,$stateParams) {
                return BatchService.getBatch($stateParams.batchId);

            }],
            batch: function() { return {}; }
            }
            
        })
        .state('admin', {
            url: '/admin/:adminId/main',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'admin.html',
                    controller: 'adminController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                thisadmin: ['AdminService', '$stateParams',
                    function(AdminService,$stateParams){
                    return AdminService.getAdmin($stateParams.adminId);
                }],
                admin: function() { return {}; }
            }
        })
    
        .state('master', {
            url: '/master/:masterId/main',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'master.html',
                    controller: 'masterController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                
                thismaster: ['MasterService', '$stateParams',
                    function(MasterService,$stateParams){
                    return MasterService.getMaster($stateParams.masterId);
                }],
                master: function() { return {}; }
            }
        })
        .state('providers', {
            url: '/coaching/cAdda/:city', //masterId?
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'getCoaching.html',
                    controller: 'mastergetCoachingController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                
                /*thismaster: ['MasterService', '$stateParams',
                    function(MasterService,$stateParams){
                    return MasterService.getMaster($stateParams.masterId);
                }],
                master: function() { return {}; },*/
                providersList: ['ProviderService','$stateParams',
                    function(ProviderService,$stateParams) {
                    //alert($stateParams.city);    
                    return ProviderService.getProviders($stateParams.city);
                }],
                provider: function() { return {}; }
            }   
        })
        .state('internship', {
            url: '/internship', //masterId?
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'internship.html',
                    controller: 'internshipController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            }
        })
        
        .state('editTargetStudyProvider', {
            url: '/edit/tStudy/:coachingId', //masterId?
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'editTargetStudyCoaching.html',
                    controller: 'editTargetStudyCoachingController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                thisTargetStudyProvider: ['targetStudyProviderService','$stateParams',
                    function(targetStudyProviderService,$stateParams) {
                    //alert($stateParams.city);    
                    return targetStudyProviderService.getProvider($stateParams.coachingId);
                }],
                provider: function() { return {}; },
                targetStudyCities: ['targetStudyProviderService','$stateParams',
                    function(targetStudyProviderService) {
                    return targetStudyProviderService.getCities();
                }]
                
            }
        })
        .state('targetStudyProviders', {
            url: '/coaching/tStudy/:city', //masterId?
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'getTargetStudyCoaching.html',
                    controller: 'getTargetStudyCoachingController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                targetStudyProvidersList: ['targetStudyProviderService','$stateParams',
                    function(targetStudyProviderService,$stateParams) {
                    //alert($stateParams.city);    
                    return targetStudyProviderService.getProviders($stateParams.city);
                }],
                provider: function() { return {}; },
                targetStudyCities: ['targetStudyProviderService','$stateParams',
                    function(targetStudyProviderService) {
                    return targetStudyProviderService.getCities();
                }]
                
            }
        })
        .state('master-analytics', {
            url: '/master/:masterId/analytics',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'analytics.html',
                    controller: 'analyticsController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                
                /*institutesList: ['InstituteService',
                    function(InstituteService) {
                    return InstituteService.getInstitutes();
                }],
                institute: function() { return {}; }*/
            }
        })
        .state('master-institutes', {
            url: '/master/:masterId/institutes',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'institutes.html',
                    controller: 'InstitutesController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                
                institutesList: ['InstituteService',
                    function(InstituteService) {
                    return InstituteService.getInstitutes();
                }],
                institute: function() { return {}; }
            }
        })
        .state('master-dashboard', {
            url: '/master/:masterId/dashboard',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'master-dashboard.html',
                    controller: 'masterDashboardController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                usersCount: ['UserService',
                    function(UserService) {
                    return UserService.getUsersCount();
                }],
                verifiedUsersCount: ['UserService',
                    function(UserService) {
                    return UserService.getVerfiedUsersCount();
                }],
                coachingCount: ['targetStudyProviderService',
                    function(targetStudyProviderService) {
                    return targetStudyProviderService.getCount();
                }]
            }
        })
        .state('master-manageBatchStudents', {
            url: '/master/:masterId/manageBatchStudents',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'manageBatchStudents.html',
                    controller: 'manageBatchStudentsController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            }
        })
        .state('master-manageInstituteStudents', {
            url: '/master/:masterId/manageInstituteStudents',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'manageInstituteStudents.html',
                    controller: 'manageInstituteStudentsController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            }
        })
        .state('master-addInstitute', {
            url: '/master/:masterId/addInstitute',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'addInstitute.html',
                    controller: 'landingController'
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            }
        })
        .state('master-addGlobalSubject', {
            url: '/master/:masterId/addGlobalSubject',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'addGlobalSubject.html',
                    controller: 'addGlobalSubjectController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                thisglobalSubjects: ['globalSubjectService', '$stateParams',
                    function(globalSubjectService,$stateParams){
                    return globalSubjectService.getglobalSubjects();
                }],
                globalSubject: function() { return {}; }
            }
        })
        .state('invalidusers', {
            url: '/master/:masterId/invalidusers',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'invalidusers.html',
                    controller: 'invalidusersController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                invalidUsers: ['UserService', '$stateParams',
                    function(UserService,$stateParams){
                    return UserService.getInvalidUsers();
                }],
                user: function() { return {}; }
            }
        })
        .state('master-addGlobalFeeItem', {
            url: '/master/:masterId/addGlobalFeeItem',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'addGlobalFeeItem.html',
                    controller: 'addGlobalFeeItemController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                thisglobalFeeItems: ['globalFeeItemService',
                    function(globalFeeItemService){
                    return globalFeeItemService.getglobalFeeItems();
                }],
                globalFeeItem: function() { return {}; }
            }
        })
        .state('mergeUsers', {
            url: '/master/:masterId/mergeUsers',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'mergeUsers.html',
                    controller: 'mergeUsersController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                
            }
        })
        .state('invalidParents', {
            url: '/master/:masterId/invalidParents',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'invalidParents.html',
                    controller: 'invalidParentsController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                
            }
        })
        .state('invalidTeachers', {
            url: '/master/:masterId/invalidTeachers',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'invalidTeachers.html',
                    controller: 'invalidTeachersController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                
            }
        })
        .state('institute', {
            url: '/institute/:instituteId',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'institute.html',
                    controller: 'instituteController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                
                thisinstitute: ['InstituteService', '$stateParams',
                    function(InstituteService,$stateParams) {
                    return InstituteService.getInstitute($stateParams.instituteId);
                        
                }],
                institute: function() { return {}; }
            }
        })
        .state('institute-batches', {
            url: '/institute-batches/:instituteId',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'institute-batches.html',
                    controller: 'instituteBatchesController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                
                thisinstitute: ['InstituteService', '$stateParams',
                    function(InstituteService,$stateParams) {
                    return InstituteService.getBatchInstitute($stateParams.instituteId);
                        
                }],
                institute: function() { return {}; }
            }
        })
        .state('institute-teachers', {
            url: '/institute-teachers/:instituteId',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'institute-teachers.html',
                    controller: 'instituteTeachersController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                
                thisinstitute: ['InstituteService', '$stateParams',
                    function(InstituteService,$stateParams) {
                    return InstituteService.getTeacherInstitute($stateParams.instituteId);
                        
                }],
                institute: function() { return {}; }
            }
        })
        .state('institute-students', {
            url: '/institute-students/:instituteId',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'institute-students.html',
                    controller: 'instituteStudentsController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                
                thisinstitute: ['InstituteService', '$stateParams',
                    function(InstituteService,$stateParams) {
                    return InstituteService.getStudentInstitute($stateParams.instituteId);
                        
                }],
                institute: function() { return {}; },
                batchNames: ['InstituteService', '$stateParams',
                    function(InstituteService,$stateParams) {
                    return InstituteService.getBatchNames($stateParams.instituteId);
                        
                }]
                
            }
        })
    
//all student states start
        .state('student', {
            url: '/student/:studentId/main',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'student.html',
                    controller: 'studentController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                thisstudent: ['StudentService', '$stateParams',
                    function(StudentService,$stateParams){
                    return StudentService.getStudent($stateParams.studentId);
                }],
                student: function() { return {}; },
                thisattendance: ['StudentService', '$stateParams',
                    function(StudentService,$stateParams){
                    return StudentService.getStudentAttendance($stateParams.studentId);
                }]
                /*thisnotification: ['StudentService', '$stateParams',
                    function(StudentService,$stateParams){
                    return StudentService.getStudentNotification($stateParams.studentId);
                }]*/
            }
        })
    
        .state('student-attendance', {
            url: '/student/:studentId/attendance',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'student-attendance.html',
                    controller: 'studentAttendanceController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                thisstudent: ['StudentService', '$stateParams',
                    function(StudentService,$stateParams){
                    return StudentService.getStudent($stateParams.studentId);
                }],
                student: function() { return {}; },
                thisattendance: ['StudentService', '$stateParams',
                    function(StudentService,$stateParams){
                    return StudentService.getStudentAttendance($stateParams.studentId);
                }]
            }
        })
        .state('student-class', {
            url: '/student/:studentId/class',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'student-class.html',
                    controller: 'studentController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                thisstudent: ['StudentService', '$stateParams',
                    function(StudentService,$stateParams){
                    return StudentService.getStudent($stateParams.studentId);
                }],
                student: function() { return {}; }
            }
        })
        
        .state('student-profile', {
            url: '/student/:studentId/profile',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'student-profile.html',
                    controller: 'studentProfileController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                thisstudent: ['StudentService', '$stateParams',
                    function(StudentService,$stateParams){
                    return StudentService.getStudent($stateParams.studentId);
                }],
                student: function() { return {}; }
            }
        })
        .state('student-subjects', {
            url: '/student/:studentId/subjects',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'student-subjects.html',
                    controller: 'studentController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                thisstudent: ['StudentService', '$stateParams',
                    function(StudentService,$stateParams){
                    return StudentService.getStudent($stateParams.studentId);
                }],
                student: function() { return {}; }
            }
        })
//all student states end
        
        .state('addTeacher', {
            url: '/:instituteId/addTeacher',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'addTeacher.html',
                    controller: 'addTeacherController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                thisinstitute: ['InstituteService', '$stateParams',
                    function(InstituteService,$stateParams){
                    return InstituteService.getInstitute($stateParams.instituteId);
                }],
                institute: function() { return {}; },
                thisglobalSubjects: ['globalSubjectService', '$stateParams',
                    function(globalSubjectService,$stateParams){
                    return globalSubjectService.getglobalSubjects();
                }],
                globalSubject: function() { return {}; }
            }
        })
        .state('addAdmin', {
            url: '/:instituteId/addAdmin',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'addAdmin.html',
                    controller: 'addAdminController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                thisinstitute: ['InstituteService', '$stateParams',
                    function(InstituteService,$stateParams){
                    return InstituteService.getInstitute($stateParams.instituteId);
                }],
                institute: function() { return {}; }
            }
        })
        .state('addMaster', {
            url: '/addMaster',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'addMaster.html',
                    controller: 'addMasterController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
            }
        })
        .state('sitemap', {
            url: '/sitemap',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'generateSitemap.html',
                    controller: 'sitemapController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
            }
        })
        .state('addStudent', {
            url: '/:instituteId/addStudent',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'addStudent.html',
                    controller: 'addStudentController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            
            resolve: {
                thisinstitute: ['InstituteService', '$stateParams',
                    function(InstituteService,$stateParams){
                    return InstituteService.getInstitute($stateParams.instituteId);
                }],
                institute: function() { return {}; }
            }
        })
        .state('addTransportVehicle', {
            url: '/:instituteId/addTransportVehicle',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'addTransportVehicle.html',
                    controller: 'addTransportVehicleController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                thisinstitute: ['InstituteService', '$stateParams',
                    function(InstituteService,$stateParams){
                    return InstituteService.getInstitute($stateParams.instituteId);
                }],
                institute: function() { return {}; }
            }
        })
        .state('addBatch', {
            url: '/:instituteId/addBatch',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'addBatch.html',
                    controller: 'addBatchController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                thisinstitute: ['InstituteService', '$stateParams',
                    function(InstituteService,$stateParams){
                    return InstituteService.getInstitute($stateParams.instituteId);
                }],
                institute: function() { return {}; },
                thisglobalSubjects: ['globalSubjectService', '$stateParams',
                    function(globalSubjectService,$stateParams){
                    return globalSubjectService.getglobalSubjects();
                }],
                globalSubject: function() { return {}; }
            }
        })
        .state('feeStructure', {
            url: '/:instituteId/feeStructure',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'feeStructure.html',
                    controller: 'feeStructureController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                thisinstitute: ['InstituteService', '$stateParams',
                    function(InstituteService,$stateParams){
                    return InstituteService.getInstitute($stateParams.instituteId);
                }],
                institute: function() { return {}; },
                thisglobalFeeItems: ['globalFeeItemService',
                    function(globalFeeItemService){
                    return globalFeeItemService.getglobalFeeItems();
                }],
                globalFeeItem: function() { return {}; }
            }
        })
        
        .state('email', {
            url: '/student/:studentId/email',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'email-welcome.html',
                    controller: 'emailController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                thisstudent: ['StudentService', '$stateParams',
                    function(StudentService,$stateParams){
                    return StudentService.getStudent($stateParams.studentId);
                }],
                student: function() { return {}; }
            }
        })
    
        .state('verify', {
            url: '/verify/:userId/',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'verify.html',
                    controller: 'verifyController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                thisuser: ['UserService', '$stateParams',
                    function(UserService,$stateParams){
                    return UserService.getUser($stateParams.userId);
                }],
                user: function() { return {}; }
            }
        })
        .state('chooselogin', {
            url: '/chooselogin/:userId/',
            views: {
                
                'body':{
                    templateUrl: 'chooselogin.html',
                    controller: 'chooseloginController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                thisuser: ['UserService', '$stateParams',
                    function(UserService,$stateParams){
                    return UserService.getUser($stateParams.userId);
                }],
                user: function() { return {}; }
            }
        })
        .state('subject', {
            url: '/subject/:subjectId',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'subject.html',
                    controller: 'subjectController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                thissubject: ['SubjectService', '$stateParams',
                    function(SubjectService,$stateParams) {
                    return SubjectService.getSubject($stateParams.subjectId);
                        
                }],
                subject: function() { return {}; }
            }
        })
        .state('eval', {
            url: '/eval/:evalId',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'eval.html',
                    controller: 'evalController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                allEvals: ['EvalService', '$stateParams',
                    function(EvalService,$stateParams) {
                    return EvalService.getEvalAnalytics($stateParams.evalId);    
                }],
                eval: function() { return {}; }
            }
        })
        .state('exam', {
            url: '/exam/:examId',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'exam.html',
                    controller: 'examController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                thisexam: ['ExamService', '$stateParams',
                    function(ExamService,$stateParams) {
                    return ExamService.getExam($stateParams.examId);
                        
                }],
                thisevals: ['EvalService', '$stateParams',
                    function(EvalService,$stateParams) {
                    return EvalService.getEvals($stateParams.examId);
                        
                }],
                
                exam: function() { return {}; }
            }
        })
        .state('batch', {
            url: '/batch/:batchId',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'batch.html',
                    controller: 'batchController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                thisbatch: ['BatchService', '$stateParams',
                    function(BatchService,$stateParams) {
                    return BatchService.getBatch($stateParams.batchId);
                        
                }],
                batch: function() { return {}; },
                batchCalendar: ['BatchService', '$stateParams',
                    function(BatchService,$stateParams) {
                    return BatchService.getCalendar($stateParams.batchId);
                        
                }],
            }
        })
        .state('batch-attendance', {
            url: '/batch/:batchId/attendance',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'batch-attendance.html',
                    controller: 'batchController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                thisbatch: ['BatchService', '$stateParams',
                    function(BatchService,$stateParams) {
                    return BatchService.getBatch($stateParams.batchId);
                        
                }],
                batch: function() { return {}; },
                batchCalendar: ['BatchService', '$stateParams',
                    function(BatchService,$stateParams) {
                    return BatchService.getCalendar($stateParams.batchId);
                        
                }],
                batchAttendanceDays: ['BatchService', '$stateParams',
                    function(BatchService,$stateParams) {
                    return BatchService.getBatchAttendanceDays($stateParams.batchId);
                        
                }]
                
                
                
            }
        });
            //$locationProvider.html5Mode(true).hashPrefix('#');
            //$locationProvider.html5Mode(true);
            //$locationProvider.hashPrefix("!");
        });
        
    })();

exambazaar.run(function($rootScope) {
    $rootScope.navBarTitle = 'Exambazaar: Exclusive Deals and Videos for test preparation';
    $rootScope.message = '';
    $rootScope.imageUrl = '';
    //moment.tz.link("Asia/Calcutta|Asia/Kolkata");
    $rootScope.today = moment().toDate();
    moment.tz.add("Asia/Calcutta|HMT BURT IST IST|-5R.k -6u -5u -6u|01232|-18LFR.k 1unn.k HB0 7zX0");
    moment.tz.link("Asia/Calcutta|Asia/Kolkata");
    // Logout function is available in any pages
    $rootScope.logout = function(){
      //$rootScope.message = 'Logged out.';
      $http.post('/logout');
    };
});

function generateOtp(min, max) {
    min = 1000;
    max = 9999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}