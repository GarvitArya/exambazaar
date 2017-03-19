
var exambazaar = angular.module('exambazaar', ['ui.router','ngMaterial','ngAria','material.svgAssetsCache','angular-loading-bar','vAccordion', 'ngAnimate','ngCookies','angularMoment','materialCalendar','ngSanitize','angularFileUpload','matchMedia','geolocation','ngGeolocation','ngMap','720kb.tooltips','ngHandsontable','duScroll','mgcrea.bootstrap.affix','ngFileUpload','youtube-embed']);
//,'ngHandsontable''ngHandsontable',
    (function() {
    'use strict';
    angular
    .module('exambazaar')
    .config(function($mdThemingProvider) {
        $mdThemingProvider
            .theme("default")
            .primaryPalette("teal");
    })
    .controller('streamController', streamController);
    function streamController(streamList,$scope,$window,$http,$state, $document,OTPService,$cookies,categories) {
        if($cookies.getObject('location')){
            $scope.location = $cookies.getObject('location'); 
        }
        $scope.streams = streamList.data;
        
        /*
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
            {name:"ntse", displayname:"NTSE",description:"NTSE is a National Level scholarship program to identify and nurture talented students. Close to 500,000 students appear in this scholarship exam every year, and 1000 scholarships are awarded"}
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
            {name:"ssc chsl", displayname:"SSC CHSL"},
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
        
    exambazaar.service('EmailService', ['$http', function($http) {
        this.send = function(email) {
            return $http.post('/api/emails/send', email);
        };
        this.sendGrid = function(email) {
            return $http.post('/api/emails/sendGrid', email);
        };
        
    }]);    
    
    exambazaar.service('ExamService', ['$http', function($http) {
        this.saveExam = function(exam) {
            return $http.post('/api/exams/save', exam);
        };
        this.getExam = function(examId) {
            return $http.get('/api/exams/edit/'+examId, {examId: examId});
        };
        this.getExams = function() {
            return $http.get('/api/exams');
        };
        this.getStreamExams = function(streamName) {
            //alert(streamName);
            return $http.get('/api/exams/stream/'+streamName, {streamName: streamName});
        };
        this.getExamByName = function(examName) {
            //alert(streamName);
            return $http.get('/api/exams/exam/'+examName, {examName: examName});
        };
        
    }]);
        
    exambazaar.service('SendGridService', ['$http', function($http) {
        this.saveSendGridCredential = function(SendGridCredential) {
            return $http.post('/api/sendGridCredentials/save', SendGridCredential);
        };
        
        this.getSendGridCredential = function(sendGridCredentialId) {
            return $http.get('/api/sendGridCredentials/edit/'+sendGridCredentialId, {sendGridCredentialId: sendGridCredentialId});
        };
        this.getOneSendGridCredential = function() {
            return $http.get('/api/sendGridCredentials/getOne');
        };
        this.getSendGridCredentials = function() {
            return $http.get('/api/sendGridCredentials');
        };
        
        
    }]); 
        
    exambazaar.service('AwsCredentialService', ['$http', function($http) {
        this.saveAwsCredential = function(awsCredential) {
            return $http.post('/api/awsCredentials/save', awsCredential);
        };
        
        this.getAwsCredential = function(awsCredentialId) {
            return $http.get('/api/awsCredentials/edit/'+awsCredentialId, {awsCredentialId: awsCredentialId});
        };
        this.getActiveAwsCredential = function() {
            return $http.get('/api/awsCredentials/getOne');
        };
        this.getAwsCredentials = function() {
            return $http.get('/api/awsCredentials');
        };
        
        
    }]);    
    
    exambazaar.service('MediaTagService', ['$http', function($http) {
       
        this.saveMediaTags = function(mediaTags) {
            return $http.post('/api/mediaTags/bulksave', mediaTags);
        };
        this.getMediaTag = function(mediaTagId) {
            return $http.get('/api/mediaTags/edit/'+mediaTagId, {mediaTagId: mediaTagId});
        };
        this.getMediaTagByType = function(mediaType) {
            return $http.get('/api/mediaTags/mediaType/'+mediaType, {mediaType: mediaType});
        };
        this.getMediaTags = function() {
            return $http.get('/api/mediaTags');
        };
        this.getMediaTypes = function() {
            return $http.get('/api/mediaTags/mediaTypes/');
        };
        
    }]);
    exambazaar.service('LocationService', ['$http', function($http) {
        this.saveLocation = function(location) {
            return $http.post('/api/locations/save', location);
        };
        this.saveLocations = function(newlocations) {
            return $http.post('/api/locations/bulksave', newlocations);
        };
        
        this.getLocation = function(examId) {
            return $http.get('/api/locations/edit/'+examId, {examId: examId});
        };
        this.getLocations = function() {
            return $http.get('/api/locations');
        };
        this.getCityLocations = function(cityName) {
            return $http.get('/api/locations/city/'+cityName, {cityName: cityName});
        };
        this.getCities = function() {
            return $http.get('/api/locations/cities/');
        };
        
    }]);
       
    exambazaar.service('ImageService', ['$http', function($http) {
        this.saveImage = function(image) {
            return $http.post('/api/images/save', image);
        };
        
        this.s3Credentials = function(fileInfo) {
            return $http.post('/api/images/s3Credentials', fileInfo);
        };
        
        this.saveImages = function(newlocations) {
            return $http.post('/api/images/bulksave', newlocations);
        };
        
        this.getImage = function(imageId) {
            return $http.get('/api/images/edit/'+imageId, {imageId: imageId});
        };
        this.getImages = function() {
            return $http.get('/api/images');
        };
        
        
        
    }]);
        
    exambazaar.service('StreamService', ['$http', function($http) {
        this.saveStream = function(stream) {
            return $http.post('/api/streams/save', stream);
        };
        this.getStream = function(streamId) {
            return $http.get('/api/streams/edit/'+streamId, {streamId: streamId});
        };
        this.getStreams = function() {
            return $http.get('/api/streams');
        };
        this.getStreamByName = function(streamName) {
            return $http.get('/api/streams/stream/'+streamName, {streamName: streamName});
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
        this.getProvidersWithAreas = function() {
            return $http.get('/api/targetStudyProviders/providersWithAreas');
        };
        
        this.addFaculty = function(newFacultyForm) {
            return $http.post('/api/targetStudyProviders/addFaculty',newFacultyForm);
        };
        
        this.addResult = function(newResultForm) {
            return $http.post('/api/targetStudyProviders/addResult',newResultForm);
        };
        
        this.addPhoto = function(newPhotoForm) {
            return $http.post('/api/targetStudyProviders/addPhoto',newPhotoForm);
        };
        this.addVideo = function(newVideoForm) {
            return $http.post('/api/targetStudyProviders/addVideo',newVideoForm);
        };
        this.changeProvidersStartingWith = function(startsWith) {
            return $http.get('/api/targetStudyProviders/changeProvidersStartingWith/'+startsWith, {startsWith: startsWith});
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
        this.getCityCount = function() {
            return $http.get('/api/targetStudyProviders/cityCount');
        };
        this.getCities = function() {
            return $http.get('/api/targetStudyProviders/cities');
        };
        this.getWebsites = function() {
            return $http.get('/api/targetStudyProviders/websites');
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
        this.logoService = function() {
            return $http.get('/api/targetStudyProviders/logoService');
        };
        this.UniqueLogoService = function() {
            return $http.get('/api/targetStudyProviders/UniqueLogoService');
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
        
        
    exambazaar.controller("signupController", 
        [ '$scope','$stateParams','$cookies','$state','OTPService','UserService', function($scope,$stateParams,$cookies,$state,OTPService,UserService){
        
        $scope.button1 = "Start";
        $scope.button2 = "Verify";
        $scope.button3 = "Finish";
        $scope.step1 = true;
        $scope.step2 = false;
        $scope.step3 = false;
        $scope.verifyPhone = function(){
            $scope.step1 = false;
            $scope.step2 = true;
            $scope.enterOTP = false;
            $scope.generateUserOTP();
            
        };
        $scope.verifyOTP = function(){
            if($scope.newUser.OTP == $scope.setOTP){
                $scope.step2 = false;
                $scope.step3 = true;
            }else{
                $scope.OTPmessage = 'The OTP you have entered is incorrect.';
            }
        };
        $scope.addUser = function(){
            $scope.newUser.userType = 'Student';
            $scope.newUser.verified = true;
            var saveUser = UserService.saveUser($scope.newUser).success(function (data, status, headers) {
                var userId = data;
                $state.go('main');
                
            })
            .error(function (data, status, header, config) {
                console.info('Error ' + data + ' ' + status);
            });
        };
        $scope.generateUserOTP = function(){
               
                var thisOTP = {
                    mobile:$scope.newUser.contact.mobile,
                    otp: generateOtp(),
                    reason : 'Signup'
                };
                OTPService.generateOTP(thisOTP).success(function (data, status, headers) {
                    $scope.enterOTP = true;
                    $scope.setOTP = data.otp;
                    console.info("OTP sent to mobile " + thisOTP.mobile);
                })
                .error(function (data, status, header, config) {
                    
                });
                $scope.OTPgenerated=true;
        };
            
    }]); 
    exambazaar.controller("categoryController", 
        [ '$scope','$stateParams','$cookies','$state','categories','$rootScope','examList', function($scope,$stateParams,$cookies,$state,categories,$rootScope,examList){
        
        $scope.exams = examList.data;
            $scope.categoryName = $stateParams.categoryName;
        if($scope.exams[0].stream){
            $scope.category = $scope.exams[0].stream;
        }
        
        
        /*//console.info(JSON.stringify(categories));
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
        }*/
        $rootScope.pageTitle = $scope.category.displayname + ' deals at Exam Bazaar';    
        /*$scope.goToCity = function(subcategory){ 
            $cookies.putObject('subcategory', subcategory);
            $state.go('city');
        };*/
            
    }]); 
    exambazaar.controller("landingController", 
        [ '$scope','$stateParams','$cookies','$state','categories','$rootScope', function($scope,$stateParams,$cookies,$state,categories,$rootScope){
        
        $scope.number = 24;
        $scope.getNumber = function(num) {
            //alert('Here');
            return new Array(num);   
        }    
            
        $scope.categoryName = $stateParams.categoryName;
        $scope.category = {};
        $scope.subcategory = [];
            
        
        $rootScope.pageTitle = 'Exam Bazaar';    
        $scope.goToCity = function(subcategory){ 
            $cookies.putObject('subcategory', subcategory);
            $state.go('city');
        };
            
    }]); 
    exambazaar.controller("cityController", 
        [ '$scope','$stateParams','$cookies','$state','cities','$rootScope','categories','$mdDialog','thisStream','thisExam', function($scope,$stateParams,$cookies,$state,cities,$rootScope,categories,$mdDialog,thisStream,thisExam){
        
        $scope.rankedCities = ["Delhi","Mumbai","New Delhi","Ahmedabad","Chennai","Kolkata","Hyderabad","Pune","Bangalore","Chandigarh","Jaipur","Agra","Ajmer","Allahabad","Alwar","Ambala","Amritsar","Bhilwara","Bhopal","Bikaner","Coimbatore","Dehradun","Ganganagar","Ghaziabad","Guwahati","Gwalior","Indore","Juhnjhunu","Kanpur","Kota","Kurukshetra","Lucknow","Ludhiana","Mathura","Meerut","Mohali","Mysore","Nasik","Noida","Patiala","Patna","Rajkot","Rohtak","Roorkee","Shimla","Sikar","Surat","Thrissur","Trivandrum","Vadodara","Vellore","Vishakhapatnam"];
        
        $scope.cities = cities;
        $scope.exam = thisExam.data;
        $scope.category = thisStream.data;
        $scope.categoryName = $stateParams.categoryName;
        $scope.subCategoryName = $stateParams.subCategoryName;
        
        $scope.subcategory = $scope.exam;
        
        $rootScope.pageTitle = $scope.subcategory.displayname + ' deals at Exam Bazaar'; 
            
        $scope.showCoaching = function(city){ 
            $cookies.putObject('city', city);
            $state.go('findCoaching', {cityName: city});
        };
        
        $scope.showPrerenderedDialog = function(ev) {
            $mdDialog.show({
              contentElement: '#myDialog',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true
            });
        };
        $scope.cancel = function() {
          $mdDialog.cancel();
        };    
            
    }]);    
    
    exambazaar.controller("coachingController", 
    [ '$scope','$rootScope', 'targetStudyProviderService','targetStudyProvidersList','cities','$state','$stateParams', '$cookies','thisStream','thisExam','streamExams', function($scope,$rootScope, targetStudyProviderService,targetStudyProvidersList,cities,$state,$stateParams, $cookies,thisStream,thisExam,streamExams){
       
        $scope.editable = false;
        if($cookies.getObject('sessionuser')){
            var user = $cookies.getObject('sessionuser');
            if(user.userType=='Master'){
                $scope.editable = true;
            }
        }
        
        $scope.categoryName = $stateParams.categoryName;
        $scope.subCategoryName = $stateParams.subCategoryName;
        $scope.city = $stateParams.cityName;
        
        $scope.category = thisStream.data;
        $scope.subcategory = thisExam.data;
        $scope.streamExams = streamExams.data.map(function(a) {return a.name;});
        
        $scope.providersList = targetStudyProvidersList.data;
        $scope.uniqueProviders = [];
        $scope.uniqueProviderInstitutes = [];
        $scope.providersList.forEach(function(thisProvider, providerIndex){
            var position = $scope.uniqueProviders.indexOf(thisProvider.name);
            if(position==-1){
                $scope.uniqueProviders.push(thisProvider.name);
                $scope.uniqueProviderInstitutes.push([thisProvider]);
            }else{
                $scope.uniqueProviderInstitutes[position].push(thisProvider);
            }
        });
        
        
        
        $scope.providersList.forEach(function(thisProvider, providerIndex){
            var positionIndex = $scope.uniqueProviders.indexOf(thisProvider.name);
            thisProvider.nCenters = $scope.uniqueProviderInstitutes[positionIndex].length;
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
    
    exambazaar.controller("claim2Controller", 
    [ '$scope','$rootScope', 'targetStudyProviderService', 'ImageService','LocationService','OTPService','Upload','thisProvider','imageMediaTagList','examList','streamList','$state','$stateParams', '$cookies','$mdDialog', function($scope,$rootScope, targetStudyProviderService, ImageService, LocationService, OTPService, Upload, thisProvider, imageMediaTagList,examList,streamList,  $state,$stateParams, $cookies,$mdDialog){
        $scope.imageTags = imageMediaTagList.data.mediaTypeTags;
        $scope.imageTypes = imageMediaTagList.data.distinctTypes;
        
        
        $scope.showHeaderLogin = function() {
            $rootScope.$emit("CallShowLogin", {});
        };
        $scope.verifyingOTP = false;
        $scope.verifyByOTP = function(){
            $scope.verifyingOTP = true;
            $scope.nMobiles = $scope.provider.mobile.length;
            $scope.verifyStep = 1;
        };
        $scope.newMobileMode = false;
        $scope.verifyStep = 0;
        $scope.addClaimMobile = function(){
            $scope.newMobileMode = true;
            $scope.verifyStep = 1;
        };
        $scope.selectMobile = function(mobile){
            $scope.OTPMobile = mobile;
        };
        
        
        $scope.sendOTP = function(mobile){
            //ABC
            $scope.verificationMobile = mobile;
            mobile ='9829685919';
            //alert(mobile);
            var thisOTP = {
                mobile:mobile,
                otp: generateOtp(),
                reason : 'Claiming ' + $scope.provider._id
            };
            //console.info(JSON.stringify(thisOTP));
            OTPService.generateOTP(thisOTP).success(function (data, status, headers) {
                $scope.serverOTP = data.otp;
                
            })
            .error(function (data, status, header, config) {
                console.info();
            });
            $scope.verifyStep = 2;
        };
        $scope.verifyOTP = function(){
            if($scope.serverOTP == $scope.userOTP){
                alert('Success');
            }else{
                alert('You have entered an incorrect OTP.');
            }
        };
        
        $scope.overviewIcons = [
            {
                icon:'images/icons/centre.png',
                text:'Centres',
                data: '1'
            },
            {
                icon:'images/icons/city.png',
                text:'Cities',
                data: '1'
            },
            {
                icon:'images/icons/students.png',
                text:'Students',
                data: '100'
            },
            {
                icon:'images/icons/faculty.png',
                text:'Faculty',
                data: '10'
            }
        ];
        $scope.components = [
            /*'Overview',*/
            'Contact',
            'Exams',
            'Results',
            'Courses',
            'Photos',
            'Videos',
            'Faculty',
            'Location'
        ];
        
        $scope.rankCategories = [
            'General',    
            'OBC-NCL',    
            'SC/ST',    
            'PwD'   
        ];
        $scope.resultYears = [
            '2017',    
            '2016',    
            '2015',    
            '2014',    
            '2013',    
            '2012',    
            '2011',    
            '2010',    
            '2009',    
            '2008',    
            '2007',    
            '2006',    
            '2005',    
            '2004',    
            '2003'    
        ];
        
        $scope.provider = thisProvider.data;
        
        $scope.showClaimDialog = function(ev) {
            $mdDialog.show({
              contentElement: '#claimDialog',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: false
            });
        };
        
        $scope.editable = false;
        $scope.verifiedUser = false;
        if($cookies.getObject('sessionuser')){
            $scope.user = $cookies.getObject('sessionuser');
            if($scope.user.userType=='Master'){
                $scope.editable = true;
                $scope.verifiedUser = true;
            }
            if($scope.user.userType=='Intern - Business Development'){
                $scope.editable = true;
                $scope.verifiedUser = true;
                //$scope.showClaimDialog();
            }
            if($scope.user.userType=='Provider'){
                
            }
        }else{
            //user is not allowed to access this page
            $scope.showClaimDialog();
        }
        
        var city =  $scope.provider.city;
        LocationService.getCityLocations(city).success(function (data, status, headers) {
            $scope.cityLocations = data;
            //console.info($scope.cityLocations);
        })
        .error(function (data, status, header, config) {
            console.info("Error ");
        });
        
        
        
        $scope.allExams = examList.data;
        $scope.allStreams = streamList.data;
        
        
        //console.info($scope.allStreams);
        
        
        
        $scope.streamIds=[];
        $scope.streams=[];
        $scope.provider.exams.forEach(function(thisExam, index){
            if($scope.streamIds.indexOf(thisExam.stream._id)==-1){
                $scope.streamIds.push(thisExam.stream._id);
                $scope.streams.push(thisExam.stream);
            }
        });
        $scope.providerExamIds = $scope.provider.exams.map(function(a) {return a._id;});
        
        
        
        $scope.addExam = function(exam){
            if($scope.provider.exams.indexOf(exam) == -1){
                $scope.provider.exams.push(exam);
                $scope.providerExamIds = $scope.provider.exams.map(function(a) {return a._id;});
                $scope.saveProvider();
            }
        };
        
        
        
        $scope.modes=[
            'Class Room',
            'Online Classes',
            'Test Series',
            'Distance Education',
            'Satellite Classes'
        ];
        $scope.durations=[
            '1 Year',
            '2 Year',
            '1 Month',
            '3 Months',
            '4 Months',
            '5 Months',
            '6 Months',
            '9 Months'
        ];
        
        $scope.editContact = false;
        $scope.editContacts= function(){
            $scope.editContact = true;
        };
        $scope.preAddPhoneLength = $scope.provider.phone.length;
        $scope.addPhone = function(){
            $scope.provider.phone.push('');
        };

        $scope.showDeletePhoneConfirm = function(ev) {
        var len = $scope.provider.phone.length;
            if(len > 0){
                var lastPhone = $scope.provider.phone[len-1];
                if(lastPhone == ''){
                    $scope.provider.phone.pop();
                }else{
                    var confirm = $mdDialog.confirm()
                        .title('Would you like to delete ' + lastPhone + '?')
                        .textContent('You will not be able to recover it after deleting!')
                        .ariaLabel('Lucky day')
                        .targetEvent(ev)
                        .clickOutsideToClose(true)
                        .ok('Confirm')
                        .cancel('Cancel');
                        $mdDialog.show(confirm).then(function() {
                          $scope.provider.phone.pop();
                        }, function() {
                          //nothing
                        });
                    }
                }
        };
        
        $scope.addMobile = function(){
            $scope.provider.mobile.push('');
        }; 
        $scope.showDeleteMobileConfirm = function(ev) {
        var len = $scope.provider.mobile.length;
            if(len > 0){
                var lastMobile = $scope.provider.mobile[len-1];
                if(lastMobile == ''){
                    $scope.provider.mobile.pop();
                }else{
                    var confirm = $mdDialog.confirm()
                        .title('Would you like to delete ' + lastMobile + '?')
                        .textContent('You will not be able to recover it after deleting!')
                        .ariaLabel('Lucky day')
                        .targetEvent(ev)
                        .clickOutsideToClose(true)
                        .ok('Confirm')
                        .cancel('Cancel');
                        $mdDialog.show(confirm).then(function() {
                          $scope.provider.mobile.pop();
                        }, function() {
                          //nothing
                        });
                    }
                }
        };
        $scope.addEmail = function(){
            $scope.provider.email.push('');
        };
        $scope.showDeleteEmailConfirm = function(ev) {
        var len = $scope.provider.email.length;
            if(len > 0){
                var lastEmail = $scope.provider.email[len-1];
                if(lastEmail == ''){
                    $scope.provider.email.pop();
                }else{
                    var confirm = $mdDialog.confirm()
                        .title('Would you like to delete ' + lastEmail + '?')
                        .textContent('You will not be able to recover it after deleting!')
                        .ariaLabel('Lucky day')
                        .targetEvent(ev)
                        .clickOutsideToClose(true)
                        .ok('Confirm')
                        .cancel('Cancel');
                        $mdDialog.show(confirm).then(function() {
                          $scope.provider.email.pop();
                        }, function() {
                          //nothing
                        });
                    }
                }
        };
        
        $scope.saveContacts= function(){
            $scope.saveProvider();
            $scope.editContact = false;
            
        };
        
        $scope.setLocation = function(location){
            $scope.provider.location = location;
        };
        
        $scope.addingCourse = false;
        $scope.preAddCourseLength = $scope.provider.course.length;
        $scope.setCourseDuration = function(course, duration){
            course.duration = duration;    
        };
        $scope.setCourseStudyMode = function(course, mode){
            course.mode = mode; 
        };
        
        $scope.deleteCourse = function(course){
            var spliceIndex = -1;
            $scope.provider.course.forEach(function(thisCourse, index){
                if(course._id == thisCourse._id){
                    spliceIndex = index;
                }
                if(course.name == thisCourse.name){
                    spliceIndex = index;
                }
            });
            if(spliceIndex != -1){
                $scope.provider.course.splice(spliceIndex, 1);
                $scope.saveProvider();  
            }
        };
        $scope.editCourse = false;
        $scope.editCourses= function(){
            $scope.editCourse = true;
        };
        
        
        
        $scope.addCourse = function(exam){
            $scope.preAddCourseLength = $scope.provider.course.length;
            var newCourse = {
                exam: exam._id,
                name:'',
                fees: '10000',
                mode: ''
            };
            $scope.provider.course.push(newCourse);
            console.info(JSON.stringify($scope.provider.course));
            
        };
        $scope.removeExam = function(exam){
            var examIndex = -1;
            $scope.provider.exams.forEach(function(thisExam, index){
                if(thisExam._id == exam._id){
                    examIndex = index;
                }
            });
            //alert(examIndex);
            if(examIndex != -1){
                $scope.provider.exams.splice(examIndex, 1);
                $scope.providerExamIds = $scope.provider.exams.map(function(a) {return a._id;});
                $scope.saveProvider();
            }
        };
        
        $scope.deleteFaculty = function(faculty){
            faculty.active = false;
            $scope.saveProvider();
        };
        
        $scope.deletePhoto = function(photo){
            photo.active = false;
            $scope.saveProvider();
        };
        $scope.saveProvider = function(){
            console.info($scope.provider);
            var saveProvider = {
                targetStudyProvider:$scope.provider,
                user: $scope.user.userId
            };
            targetStudyProviderService.saveProvider(saveProvider).success(function (data, status, headers) {
                $scope.showSavedDialog();
                $state.reload();
                console.info("Done");
            })
            .error(function (data, status, header, config) {
                console.info("Error ");
            });
        };
        $scope.provider.faculty.forEach(function(thisFaculty, facultyIndex){
            if(thisFaculty.name || thisFaculty.subject || thisFaculty.yearsExperience || thisFaculty.qualification || thisFaculty.description){
                thisFaculty.infoAvailable = 1;
            }else{
                thisFaculty.infoAvailable = 0;
            }
        });
        
        
        $scope.editResult = false;
        $scope.editResults= function(){
            $scope.editResult = true;
        };
        
        $scope.saveResults= function(){
            $scope.saveProvider();
            $scope.editResult = false;
            
        };
        
        $scope.preUploadResultLength = $scope.provider.results.length;
        
        $scope.prevResult = function(){
            var index = $scope.activeResultIndex - 1;
            $scope.changeResultImage(index, $scope.provider.results.length);
        };
         $scope.nextResult = function(){
            var index = $scope.activeResultIndex + 1;
            $scope.changeResultImage(index);
        };
        $scope.changeResultImage = function(index){
            var arrayLength = $scope.provider.results.length
            if(index >=0 && index < arrayLength){
                $scope.activeResultIndex = index;
                $scope.activeResult = $scope.provider.results[index];
                var indexPair = startEndIndex(index,$scope.provider.results.length);
                $scope.startResultIndex = indexPair.start;
                $scope.endResultIndex = indexPair.end;
            }
            
        };
        
        $scope.editVideo = false;
        $scope.preUploadVideoLength = $scope.provider.video.length;
        $scope.editVideos= function(){
            $scope.editVideo = true;
        };
        $scope.saveVideos= function(){
            $scope.saveProvider();
            $scope.editVideo = false;
            
        };
        
        $scope.addVideos = function(){
            var newVideo = {
                link: ''
            };
            $scope.provider.video.push(newVideo);
            $scope.editVideo = true;
        };
        $scope.restoreVideo = function(video){
            video.active = true;
            $scope.saveProvider();
        };
        $scope.deleteVideo = function(video){
            video.active = false;
            $scope.saveProvider();
        };
        $scope.editPhoto = false;
        $scope.preUploadPhotoLength = $scope.provider.photo.length;
        $scope.editPhotos= function(){
            $scope.editPhoto = true;
        };
        $scope.savePhotos= function(){
            $scope.saveProvider();
            $scope.editPhoto = false;
            
        };
        $scope.cancelChanges= function(){
            $state.reload();
        };
        
        
        $scope.editFaculty = false;
        $scope.editFaculties= function(){
            $scope.editFaculty = true;
        };
        
        $scope.saveFaculties= function(){
            $scope.saveProvider();
            $scope.editFaculty = false;
            
        };
        
        $scope.preUploadFacultyLength = $scope.provider.faculty.length;
        
        $scope.prevFaculty = function(){
            var index = $scope.activeFacultyIndex - 1;
            $scope.changeFacultyImage(index, $scope.provider.faculty.length);
        };
         $scope.nextFaculty = function(){
            var index = $scope.activeFacultyIndex + 1;
            $scope.changeFacultyImage(index);
        };
        $scope.changeFacultyImage = function(index){
            var arrayLength = $scope.provider.faculty.length
            if(index >=0 && index < arrayLength){
                $scope.activeFacultyIndex = index;
                $scope.activeFaculty = $scope.provider.faculty[index];
                var indexPair = startEndIndex(index,$scope.provider.faculty.length);
                $scope.startFacultyIndex = indexPair.start;
                $scope.endFacultyIndex = indexPair.end;
            }
            
        };
        function startEndIndex (index, arrayLength){
            
            var showLength = 6;
            var indexPair = {
                start: 0,
                end: arrayLength
            };
            
            if(index - showLength/2 <=0){
                indexPair.start = 0;
                indexPair.end = Math.min(indexPair.start + showLength, arrayLength);
            }else{
                if(index + showLength/2 >= arrayLength){
                    indexPair.end = arrayLength;
                    indexPair.start = Math.max(0, indexPair.end - showLength);
                    
                }else{
                    indexPair.start = index -showLength/2;
                    indexPair.end = Math.min(indexPair.start + showLength, arrayLength);
                }
                
            }
            return (indexPair);
        };
        
        $scope.prevPhoto = function(){
            var index = $scope.activePhotoIndex - 1;
            $scope.changePhotoImage(index, $scope.provider.faculty.length);
        };
         $scope.nextPhoto = function(){
            var index = $scope.activePhotoIndex + 1;
            $scope.changePhotoImage(index);
        };
        $scope.changePhotoImage = function(index){
            var arrayLength = $scope.provider.photo.length;
            if(index >=0 && index < arrayLength){
                $scope.activePhotoIndex = index;
                $scope.activePhoto = $scope.provider.photo[index];
                var indexPair = startEndIndex(index, $scope.provider.photo.length);
                //console.info(JSON.stringify(indexPair));
                $scope.startPhotoIndex = indexPair.start;
                $scope.endPhotoIndex = indexPair.end;
            }
            
        };
        
        $scope.editLocation = false;
        $scope.editLocations= function(){
            $scope.editLocation = true;
        };
        $scope.saveLocations = function(){
            $scope.saveProvider();
            $scope.editLocation = false;
        };
        
        $scope.addebNote = function(){
            $scope.preAddNotesLength = $scope.provider.ebNote.length;
            var newebNote = {
                note: '',
                user: $scope.user.userId
            };
            $scope.provider.ebNote.push(newebNote);
            console.info(JSON.stringify($scope.provider.ebNote));
            
        };
        
        $scope.saveEBNotes = function(){
            $scope.saveProvider();
            $scope.editLocation = false;
        };
        $scope.addPhotoTag = function(tag){
            //alert(JSON.stringify(tag));
            if($scope.tagThisPhoto.tags.indexOf(tag._id) == -1){
                $scope.tagThisPhoto.tags.push(tag._id);
            }
            
        };
        $scope.addFacultyTag = function(tag){
            //alert(JSON.stringify(tag));
            if($scope.tagThisFaculty.tags.indexOf(tag._id) == -1){
                $scope.tagThisFaculty.tags.push(tag._id);
            }
            
        };
        $scope.showFacultyTagDialog = function(ev, faculty) {
            $scope.tagThisFaculty = faculty;
            $mdDialog.show({
              contentElement: '#tagFacultyDialog',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true
            });
        };
        $scope.showFacultyExamDialog = function(ev, faculty) {
            $scope.tagThisFaculty = faculty;
            $scope.facultyExamIds = $scope.tagThisFaculty.exams.map(function(a) {return a._id;});
            
            $mdDialog.show({
              contentElement: '#examFacultyDialog',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true
            });
        };
        
        
        $scope.addFacultyExam = function(exam){
            if($scope.tagThisFaculty.exams.indexOf(exam) == -1){
                $scope.tagThisFaculty.exams.push(exam);
                $scope.facultyExamIds = $scope.tagThisFaculty.exams.map(function(a) {return a._id;});
            }
        };
        $scope.removeFacultyExam = function(exam){
            var examIndex = -1;
            $scope.tagThisFaculty.exams.forEach(function(thisExam, index){
                if(thisExam._id == exam._id){
                    examIndex = index;
                }
            });
            //alert(examIndex);
            if(examIndex != -1){
                $scope.tagThisFaculty.exams.splice(examIndex, 1);
                $scope.providerExamIds = $scope.facultyExamIds = $scope.tagThisFaculty.exams.map(function(a) {return a._id;});
            }
        };
        
        $scope.showResultExamDialog = function(ev, result) {
            $scope.tagThisResult = result;
            $mdDialog.show({
              contentElement: '#resultExamDialog',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true
            });
        };
        
        $scope.setResultExam = function(exam){
            if(exam._id){
                $scope.tagThisResult.exam = exam._id;
            }else{
                $scope.tagThisResult.exam = exam;
            }
            $scope.cancel();
        };
        $scope.setResultRankCategory = function(result,category){
            result.category = category;
        };
        $scope.setResultYear = function(result,year){
            result.year = year;
        };
        
        $scope.showPhotoTagDialog = function(ev, photo) {
            $scope.tagThisPhoto = photo;
            $mdDialog.show({
              contentElement: '#tagPhotoDialog',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true
            });
        };
        
        $scope.showSavedDialog = function(ev) {
            $mdDialog.show({
              contentElement: '#savedDialog',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true
            });
        };
        
        
        
        $scope.showMarkLocationDialog = function(ev) {
            $mdDialog.show({
              contentElement: '#markLocationDialog',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true
            });
        };
        $scope.showRemoveLastPhoneDialog = function(ev) {
            $mdDialog.show({
              contentElement: '#removeLastPhoneDialog',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true
            });
        };
        $scope.showPhotoDialog = function(ev,index) {
            $scope.activePhotoIndex = index;
            $scope.activePhoto = $scope.provider.photo[index];
            var indexPair = startEndIndex(index, $scope.provider.photo.length);
            $scope.startPhotoIndex = indexPair.start;
            $scope.endPhotoIndex = indexPair.end;
            
            $mdDialog.show({
              contentElement: '#photoDialog',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true
            });
        };
        $scope.showFacultyDialog = function(ev,index) {
            $scope.activeFacultyIndex = index;
            $scope.activeFaculty = $scope.provider.faculty[index];
            var indexPair = startEndIndex(index, $scope.provider.faculty.length);
            $scope.startFacultyIndex = indexPair.start;
            $scope.endFacultyIndex = indexPair.end;
            
            
            $mdDialog.show({
              contentElement: '#facultyDialog',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true
            });
        };
        
        $scope.showResultDialog = function(ev,index) {
            $scope.activeResultIndex = index;
            $scope.activeResult = $scope.provider.results[index];
            var indexPair = startEndIndex(index, $scope.provider.results.length);
            $scope.startResultIndex = indexPair.start;
            $scope.endResultIndex = indexPair.end;
            
            
            $mdDialog.show({
              contentElement: '#resultsDialog',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true
            });
        };
        
        $scope.cancel = function() {
          $mdDialog.cancel();
        };    
        
        if($scope.provider.pincode){
            $scope.provider.mapAddress = $scope.provider.name + ', ' + $scope.provider.address + ' ' +
            $scope.provider.city + ' ' +
            $scope.provider.pincode;
        }else{
            $scope.provider.mapAddress = $scope.provider.name + ', ' + $scope.provider.address + ' ' + $scope.provider.city;   
        }
        
        $scope.uploadPhotos = function (photos) {
            //var photos = $scope.photos;
            var nFiles = photos.length;
            $scope.showAddPhotosForm = false;
            var providerId = $scope.provider._id;
            var counter = 0;
            $scope.photoProgess = 0;
            if (photos && photos.length) {
            photos.forEach(function(thisFile, index){
                
            var fileInfo = {
                filename: thisFile.name,
                contentType: thisFile.type
            };
             ImageService.s3Credentials(fileInfo).success(function (data, status, headers) {
            var s3Request = {};
            var allParams = data.params;
            for (var key in allParams) {
              if (allParams.hasOwnProperty(key)) {
                s3Request[key] = allParams[key];
              }
            }
            s3Request.file = thisFile;
            Upload.upload({
                url: data.endpoint_url,
                data: s3Request
            }).then(function (resp) {
                console.info('Success ' + thisFile.name + 'uploaded. Response: ' + resp.data);
                thisFile.link = $(resp.data).find('Location').text();
                thisFile.newPhoto = {
                    image: thisFile.link
                };
                var newPhotoForm ={
                    photo: thisFile.newPhoto,
                    providerId: providerId
                }; targetStudyProviderService.addPhoto(newPhotoForm).success(function (data, status, headers) {
                    counter = counter + 1;
                    if(counter == nFiles){
                        $scope.showAddPhotosForm = true;
                        $scope.preUploadPhotoLength = $scope.provider.photo.length;
                        var refreshedProvider = targetStudyProviderService.getProvider(providerId).success(function (refreshedProvider, status, headers) {
                            $scope.provider = refreshedProvider;
                            $scope.editPhotos();
                        }).error(function (data, status, header, config) {
                            console.info("Error ");
                        });
                       
                        
                        
                    }
                })
                .error(function (data, status, header, config) {
                    console.info("Error ");
                });
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                }, function (evt) {
                    $scope.photoProgess = 0;
                    thisFile.uploadProgress = parseInt(100.0 * evt.loaded / evt.total);
                    photos.forEach(function(thisFile, index){
                        $scope.photoProgess += thisFile.uploadProgress;
                    });
                    $scope.photoProgess = $scope.photoProgess / nFiles;
                    //console.log('progress: ' + thisFile.uploadProgress + '% ' + thisFile.name);
                });

            })
            .error(function (data, status, header, config) {
                console.info("Error");
            });   
                 
            });
            }
         };
        
        
        
        
        
        
        $scope.uploadResults = function (results) {
            //var results = $scope.results;
            var nFiles = results.length;
            $scope.showAddResultsForm = false;
            var providerId = $scope.provider._id;
            var counter = 0;
            $scope.resultProgess = 0;
            if (results && results.length) {
            results.forEach(function(thisFile, index){
                
            var fileInfo = {
                filename: thisFile.name,
                contentType: thisFile.type
            };
            console.log(JSON.stringify(fileInfo)); ImageService.s3Credentials(fileInfo).success(function (data, status, headers) {
            var s3Request = {};
            var allParams = data.params;
            for (var key in allParams) {
              if (allParams.hasOwnProperty(key)) {
                s3Request[key] = allParams[key];
              }
            }
            s3Request.file = thisFile;
            Upload.upload({
                url: data.endpoint_url,
                data: s3Request
            }).then(function (resp) {
                console.info('Success ' + thisFile.name + 'uploaded. Response: ' + resp.data);
                thisFile.link = $(resp.data).find('Location').text();
                thisFile.newResult = {
                    image: thisFile.link
                };
                var newResultForm ={
                    result: thisFile.newResult,
                    providerId: providerId
                }; targetStudyProviderService.addResult(newResultForm).success(function (data, status, headers) {
                    counter = counter + 1;
                    if(counter == nFiles){
                        $scope.showAddResultsForm = true;
                        $scope.preUploadResultLength = $scope.provider.results.length;
                        var refreshedProvider = targetStudyProviderService.getProvider(providerId).success(function (refreshedProvider, status, headers) {
                            $scope.provider = refreshedProvider;
                            $scope.editResults();
                        }).error(function (data, status, header, config) {
                            console.info("Error ");
                        });
                    }
                })
                .error(function (data, status, header, config) {
                    console.info("Error ");
                });
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                }, function (evt) {
                    $scope.resultProgess = 0;
                    thisFile.uploadProgress = parseInt(100.0 * evt.loaded / evt.total);
                    results.forEach(function(thisFile, index){
                        $scope.resultProgess += thisFile.uploadProgress;
                    });
                    $scope.resultProgess = $scope.resultProgess / nFiles;
                    
                });

            })
            .error(function (data, status, header, config) {
                console.info("Error");
            });   
                 
            });
            }
         };
        
        
        
        
        
            
        $scope.uploadFaculties = function (faculties) {
            //var faculties = $scope.faculties;
            var nFiles = faculties.length;
            $scope.showAddFacultiesForm = false;
            var providerId = $scope.provider._id;
            var counter = 0;
            $scope.facultyProgess = 0;
            if (faculties && faculties.length) {
            faculties.forEach(function(thisFile, index){
                
            var fileInfo = {
                filename: thisFile.name,
                contentType: thisFile.type
            };
            console.log(JSON.stringify(fileInfo)); ImageService.s3Credentials(fileInfo).success(function (data, status, headers) {
            var s3Request = {};
            var allParams = data.params;
            for (var key in allParams) {
              if (allParams.hasOwnProperty(key)) {
                s3Request[key] = allParams[key];
              }
            }
            s3Request.file = thisFile;
            Upload.upload({
                url: data.endpoint_url,
                data: s3Request
            }).then(function (resp) {
                console.info('Success ' + thisFile.name + 'uploaded. Response: ' + resp.data);
                thisFile.link = $(resp.data).find('Location').text();
                thisFile.newFaculty = {
                    image: thisFile.link
                };
                var newFacultyForm ={
                    faculty: thisFile.newFaculty,
                    providerId: providerId
                }; targetStudyProviderService.addFaculty(newFacultyForm).success(function (data, status, headers) {
                    counter = counter + 1;
                    if(counter == nFiles){
                        $scope.showAddFacultysForm = true;
                        $scope.preUploadFacultyLength = $scope.provider.faculty.length;
                        var refreshedProvider = targetStudyProviderService.getProvider(providerId).success(function (refreshedProvider, status, headers) {
                            $scope.provider = refreshedProvider;
                            $scope.editFaculties();
                        }).error(function (data, status, header, config) {
                            console.info("Error ");
                        });
                       
                        
                        
                    }
                })
                .error(function (data, status, header, config) {
                    console.info("Error ");
                });
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                }, function (evt) {
                    $scope.facultyProgess = 0;
                    thisFile.uploadProgress = parseInt(100.0 * evt.loaded / evt.total);
                    faculties.forEach(function(thisFile, index){
                        $scope.facultyProgess += thisFile.uploadProgress;
                    });
                    $scope.facultyProgess = $scope.facultyProgess / nFiles;
                    
                });

            })
            .error(function (data, status, header, config) {
                console.info("Error");
            });   
                 
            });
            }
         };
        
        $rootScope.pageTitle = $scope.provider.name;
        
        
    }]); 
    
    
    exambazaar.controller("claimController", 
    [ '$scope','$rootScope', 'targetStudyProviderService','thisProvider','$state','$stateParams', '$cookies','$mdDialog', function($scope,$rootScope, targetStudyProviderService,thisProvider,$state,$stateParams, $cookies,$mdDialog){
        
        $scope.editable = false;
        $scope.verifiedUser = false;
        if($cookies.getObject('sessionuser')){
            var user = $cookies.getObject('sessionuser');
            if(user.userType=='Master'){
                $scope.editable = true;
                $scope.verifiedUser = true;
            }
        }
        
        $scope.started = false;
        $scope.getStarted = function(){
            $scope.started = true;
        };
        
        $scope.showMap = false;
        $scope.flipMap = function(){
              $scope.showMap = !$scope.showMap;
        };
        $scope.provider = thisProvider.data;
        
        /*$scope.showClaimDialog = function(ev) {
            $scope.currProvider = $scope.provider;
            $mdDialog.show({
              contentElement: '#claimDialog',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true
            });
        };*/
        $scope.cancel = function() {
            $mdDialog.cancel();
            $scope.started = false;
        };
        
        if($scope.provider.pincode){
            $scope.provider.mapAddress = $scope.provider.name + ', ' + $scope.provider.address + ' ' +
            $scope.provider.city + ' ' +
            $scope.provider.pincode;
        }else{
            $scope.provider.mapAddress = $scope.provider.name + ', ' + $scope.provider.address + ' ' + $scope.provider.city;   
        }
        
        
        $rootScope.pageTitle = $scope.provider.name;
        
        
    }]); 
    
    exambazaar.controller("showCoachingController", 
    [ '$scope','$rootScope', 'targetStudyProviderService','thisProvider','$state','$stateParams', '$cookies','thisStream','thisExam', '$document', function($scope,$rootScope, targetStudyProviderService,thisProvider,$state,$stateParams, $cookies,thisStream,thisExam,$document){
        $scope.category = thisStream.data;
        $scope.subcategory = thisExam.data;
        $scope.city = $stateParams.cityName;
        $scope.editable = false;
        if($cookies.getObject('sessionuser')){
            var user = $cookies.getObject('sessionuser');
            if(user.userType=='Master'){
                $scope.editable = true;
            }
        }
        $scope.components = [
            /*'Overview',*/
            'Contact',
            'Results',
            'Courses',
            'Photos',
            'Videos',
            'Faculty',
            'Location'
        ];
        $scope.provider = thisProvider.data;
        
        if($scope.provider.pincode){
            $scope.provider.mapAddress = $scope.provider.name + ', ' + $scope.provider.address + ' ' +
            $scope.provider.city + ' ' +
            $scope.provider.pincode;
        }else{
            $scope.provider.mapAddress = $scope.provider.name + ', ' + $scope.provider.address + ' ' + $scope.provider.city;   
        }
        $scope.exams = $scope.provider.exams;
        
        $scope.streamIds=[];
        $scope.streams=[];
        $scope.exams.forEach(function(thisExam, index){
            if($scope.streamIds.indexOf(thisExam.stream._id)==-1){
                $scope.streamIds.push(thisExam.stream._id);
                $scope.streams.push(thisExam.stream);
            }
        });
        console.info($scope.streams);
        
        
        
        
        $scope.overviewIcons = [
            {
                icon:'images/icons/centre.png',
                text:'Centres',
                data: '1'
            },
            {
                icon:'images/icons/city.png',
                text:'Cities',
                data: '1'
            },
            {
                icon:'images/icons/students.png',
                text:'Students',
                data: '100'
            },
            {
                icon:'images/icons/faculty.png',
                text:'Faculty',
                data: '10'
            }
        ];
        
        $scope.showMap = false;
        $scope.flipMap = function(){
              $scope.showMap = !$scope.showMap;
        };
        
        
        
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
            
        $scope.showLogin = false;
        $scope.showLoginForm = function(){
            //alert('Here');
            $scope.showLogin = !$scope.showLogin;
        };
            
        $rootScope.$on("CallShowLogin", function(){
           $scope.showLoginForm();
        });

        /*if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position){
                alert(JSON.stringify(position));
                $scope.position = position;
              
            });
        }*/
        //geolocation.getLocation().then(function(data){
        /*geolocation.getLocation().then(function(data){
            $scope.coords = {lat:data.coords.latitude, long:data.coords.longitude, accuracy:data.coords.accuracy};
            //alert(data.coords.accuracy);
            $cookies.putObject('location', $scope.coords);
        });*/
            
            
            
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
                    //console.log(user.verified);
                    if(user.verified===true){
                        console.info('User type is: ' + user.userType);
                        
                        sessionuser = {
                            userId: fulluser._id,
                            masterId: fulluser._id,
                            userType: fulluser.userType,
                            basic: fulluser.basic,
                            mobile: fulluser.mobile,
                            email: fulluser.email,
                            nLogins: fulluser.logins.length
                        };
                        //console.info(JSON.stringify(sessionuser));
                        $cookies.putObject('sessionuser', sessionuser);
                        //alert($state.current.name);
                        
                        if($state.current.name == 'main'){
                            if(sessionuser.userType =='Master'){
                                $state.go('master-dashboard', {masterId: sessionuser.masterId});
                            }
                            if(sessionuser.userType =='Intern - Business Development'){
                                 $state.go('targetStudyProviders', {city: 'Jaipur'});
                            }
                            
                        }else{
                            $state.reload();
                        }
                        
                        
                    }else{
                        //alert("User id is: " + user._id);
                        $state.go('verify', {userId: user._id});
                    }
                    
                })
                .error(function (data, status, header, config) {
                console.info('Error');
                })
            
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
        };
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
                'Building partnerships & collating further information about education providers',
                'Assisting in the preparation, distribution and delivery of marketing material',
                'Growing the business through social media and traditional expansion means',
                'Receiving feedback from users and developing techniques to improve the service consequently'
            ];
            $scope.requirements = [
                'Excellent verbal and written communication skills, with extensive knowledge of social media',
                'Proficient in Microsoft PowerPoint, Word and Excel',
                'Good organizational and execution skills, focus on detail',
                'Strong team player who can work independently'
            ];
    }]);
    exambazaar.controller("accountController", 
        [ '$scope','$rootScope', 'Upload','ImageService',function($scope,$rootScope,Upload,ImageService){
            
        
         $scope.uploadFiles = function () {
            var files = $scope.files;
            if (files && files.length) {
                files.forEach(function(thisFile, index){
                var fileInfo = {
                    filename: thisFile.name,
                    contentType: thisFile.type
                };
                console.info(fileInfo);
                ImageService.s3Credentials(fileInfo).success(function (data, status, headers) {
                var s3Request = {};
                var allParams = data.params;
                for (var key in allParams) {
                  if (allParams.hasOwnProperty(key)) {
                    s3Request[key] = allParams[key];
                  }
                }
                s3Request.file = thisFile;
                    
                Upload.upload({
                    url: data.endpoint_url,
                    data: s3Request
                }).then(function (resp) {
                    console.log('Success ' + thisFile.name + 'uploaded. Response: ' + resp.data);
                    thisFile.link = $(resp.data).find('Location').text();
                    //alert(thisFile.link);
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                }, function (evt) {
                    thisFile.uploadProgress = parseInt(100.0 * evt.loaded / evt.total);
                    //console.log('progress: ' + thisFile.uploadProgress + '% ' + thisFile.name);
                });
                
            })
            .error(function (data, status, header, config) {
                console.info("Error ");
            });    
                    
            });
            }
         };
            
            
        $scope.submit = function() {
          if ($scope.form.file.$valid && $scope.file) {
            //alert($scope.file.name);
            var fileInfo = {
                filename: $scope.file.name,
                contentType: $scope.file.type
            };
            console.info(JSON.stringify(fileInfo));
            ImageService.s3Credentials(fileInfo).success(function (data, status, headers) {
                //console.info(data);
                var s3Request = {
                };
                var allParams = data.params;
                for (var key in allParams) {
                  if (allParams.hasOwnProperty(key)) {
                    //console.log(key + " -> " + allParams[key]);
                    s3Request[key] = allParams[key];
                  }
                }
                s3Request.file = $scope.file;
                
                Upload.upload({
                    url: data.endpoint_url,
                    data: s3Request
                }).then(function (resp) {
                    console.log('Success ' + $scope.file.name + 'uploaded. Response: ' + resp.data);
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                }, function (evt) {
                    $scope.file.uploadProgress = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + $scope.file.uploadProgress + '% ' + $scope.file.name);
                });
                
                $scope.upload(s3Request,data.endpoint_url);
            })
            .error(function (data, status, header, config) {
                console.info("Error ");
            });
            
          }else{
              alert('Error');
          }
        };

        // upload on file select or drop
        $scope.upload = function (s3Request,url) {
            console.info(s3Request,url);
            Upload.upload({
                url: url,
                data: s3Request
            }).then(function (resp) {
                console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            }, function (resp) {
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + s3Request.file.name);
            });
        };
        // for multiple files:
        /*$scope.uploadFiles = function (files) {
          if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
              Upload.upload({..., data: {file: files[i]}, ...});
            }
            // or send them all together for HTML5 browsers:
            Upload.upload({..., data: {file: files}, ...})...;
          }
        };*/
            
            

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
    
     
     exambazaar.controller("providersWithAreasController", 
    [ '$scope', 'targetStudyProviderService','targetStudyProvidersList','$state','$stateParams', '$cookies', function($scope, targetStudyProviderService,targetStudyProvidersList,$state,$stateParams, $cookies){
        
        $scope.providersList = targetStudyProvidersList.data;
        
        $scope.startsWithProviders = function(){
           
           if($scope.startsWith != ''){
               targetStudyProviderService.changeProvidersStartingWith($scope.startsWith).success(function (data, status, headers) {
                console.info("Done");
               $scope.clear();
            })
            .error(function (data, status, header, config) {
                console.info("Error ");
            });
           }
            
        };
        $scope.setStartsWith = function(name){
            var splitPoint = name.indexOf('-');
            var newName = name.substring(0,splitPoint).trim();
            $scope.startsWith = newName;
            $scope.startsWithProviders();
        };
        $scope.clear = function(){
            $scope.startsWith = '';
        };
    }]); 
    exambazaar.controller("getTargetStudyCoachingController", 
    [ '$scope', 'targetStudyProviderService','targetStudyProvidersList','targetStudyCities','$timeout','$state','$stateParams', '$cookies','$mdDialog','locationsList','$window', function($scope, targetStudyProviderService,targetStudyProvidersList,targetStudyCities,$timeout,$state,$stateParams, $cookies,$mdDialog,locationsList,$window){
        $scope.providersList = targetStudyProvidersList.data;
        //alert($scope.providersList);
        $scope.cities = targetStudyCities.data;
        $scope.city = $stateParams.city;
        
        if($cookies.getObject('location')){
            $scope.location = $cookies.getObject('location');
        }
        
        $scope.showLevel = 0;
        
        if($cookies.getObject('sessionuser')){
            
            $scope.user = $cookies.getObject('sessionuser');
            if($scope.user.userType=='Master'){
                $scope.showLevel = 10;
            }
            if($scope.user.userType=='Intern - Business Development'){
                
                if($scope.city != 'Jaipur'){
                    $scope.showLevel = 0;
                }else{
                    $scope.showLevel = 1; 
                }
                
            }
            
        }
        
        
        $scope.addEmail = function(provider){
            $window.open(provider.targetStudyWebsite, '_newhtml');
            //$window.open('https://targetstudy.com/tools/ge.php', '_newhtml2');
        };
        
        $scope.locations = locationsList.data;
        $scope.currProvider = {};
        $scope.showLocationDialog = function(ev,provider) {
            $scope.currProvider = provider;
            $mdDialog.show({
              contentElement: '#myDialog',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true
            });
        };
        $scope.cancel = function() {
          $mdDialog.cancel();
        };
        $scope.saveLocation = function(thisLocation){
            
            $scope.currProvider.location = thisLocation._id;
            var saveProvider = {
                targetStudyProvider:$scope.currProvider
            };
            targetStudyProviderService.saveProvider(saveProvider).success(function (data, status, headers) {
                $scope.cancel();
                
                console.info("Done");
            })
            .error(function (data, status, header, config) {
                console.info("Error ");
            });
            
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
            //alert('Here');
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
        
        $scope.getWebsites = function(){
            alert('Starting');
            targetStudyProviderService.getWebsites().success(function (data, status, headers) {
                console.info("Done");
            })
            .error(function (data, status, header, config) {
                console.info("Error ");
            });
        };
        
        $scope.getCityCount = function(){
            targetStudyProviderService.getCityCount().success(function (data, status, headers) {
                console.info("Done");
            })
            .error(function (data, status, header, config) {
                console.info("Error ");
            });
        };
        
        $scope.logoService = function(){
            targetStudyProviderService.logoService().success(function (data, status, headers) {
                console.info("Done");
            })
            .error(function (data, status, header, config) {
                console.info("Error ");
            });
        };
        $scope.UniqueLogoService = function(){
            
            $scope.showlogos = true;
            targetStudyProviderService.UniqueLogoService().success(function (data, status, headers) {
                $scope.uniquelogos = data;
            })
            .error(function (data, status, header, config) {
                console.info("Error ");
            });
        };
        $scope.allCourses = false;
        $scope.getAllCourses = function(){
            targetStudyProviderService.getAllCourses().success(function (data, status, headers) {
                console.info("Done");
                $scope.allCourses = true;
                $scope.courses = data;
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
    
    exambazaar.filter('bytes', function() {
        return function(bytes, precision) {
            if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) return '-';
            if (typeof precision === 'undefined') precision = 1;
            var units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'],
                number = Math.floor(Math.log(bytes) / Math.log(1024));
            return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) +  ' ' + units[number];
        }
    });
    exambazaar.controller("editTargetStudyCoachingController", 
    [ '$scope','FileUploader', 'targetStudyProviderService','LocationService','thisTargetStudyProvider','$state','$stateParams', '$cookies','ImageService','Upload','imageMediaTagList', function($scope,FileUploader, targetStudyProviderService,LocationService,thisTargetStudyProvider,$state,$stateParams, $cookies,ImageService,Upload,imageMediaTagList){
        console.info(imageMediaTagList.data);
        $scope.provider = thisTargetStudyProvider.data;
        $scope.imageTags = imageMediaTagList.data.mediaTypeTags;
        $scope.imageTypes = imageMediaTagList.data.distinctTypes;
        
        
        $scope.locations = [];
        $scope.showButton = true;
        $scope.getLocations = function(){
            var city =  $scope.provider.city;
            LocationService.getCityLocations(city).success(function (data, status, headers) {
                $scope.showButton = false;
                $scope.locations = data;
                console.info("Done");
            })
            .error(function (data, status, header, config) {
                console.info("Error ");
            });
        };
        $scope.suggestedLeft = [
            'contact',
            'info',
            'support',
            'admin',
        ];
        
        $scope.suggestedEmails = [];
        if($scope.provider){
            $scope.suggestedLeft.push($scope.provider.city.toLowerCase());
            $scope.suggestedLeft.push($scope.provider.state.toLowerCase());
            var url = $scope.provider.website;
            url = url.replace('www.','');
            url = url.replace('http://','');
            url = url.replace('https://','');
            var rightChar = url.substring(url.length-1, url.length);
            
            var pivot1 = url.indexOf('/');
            if(pivot1 != -1)
                url = url.substring(0, pivot1);
            //alert(url);
            $scope.suggestedLeft.forEach(function(thisLeft, index){
                var newEmail = thisLeft + '@' + url;
                $scope.suggestedEmails.push(newEmail);
            });
            var pName = $scope.provider.name;
            pName = pName.replace(/ /g,'').toLowerCase();

            
            $scope.suggestedEmails.push(pName + '@gmail.com');
            $scope.suggestedEmails.push(pName + '@yahoo.com');
        }
        
        $scope.uploadPhotos = function () {
            var photos = $scope.photos;
            var nFiles = photos.length;
            $scope.showAddPhotosForm = false;
            var providerId = $scope.provider._id;
            var counter = 0;
            if (photos && photos.length) {
            photos.forEach(function(thisFile, index){
                
            var fileInfo = {
                filename: thisFile.name,
                contentType: thisFile.type
            };
            //console.info(JSON.stringify(fileInfo));
            ImageService.s3Credentials(fileInfo).success(function (data, status, headers) {
            var s3Request = {};
            var allParams = data.params;
            for (var key in allParams) {
              if (allParams.hasOwnProperty(key)) {
                s3Request[key] = allParams[key];
              }
            }
            s3Request.file = thisFile;
            Upload.upload({
                url: data.endpoint_url,
                data: s3Request
            }).then(function (resp) {
                console.info('Success ' + thisFile.name + 'uploaded. Response: ' + resp.data);
                thisFile.link = $(resp.data).find('Location').text();
                thisFile.newPhoto = {
                    image: thisFile.link
                };
                var newPhotoForm ={
                    photo: thisFile.newPhoto,
                    providerId: providerId
                }; targetStudyProviderService.addPhoto(newPhotoForm).success(function (data, status, headers) {
                    counter = counter + 1;
                    if(counter == nFiles){
                        $scope.showAddPhotosForm = true;
                    }
                })
                .error(function (data, status, header, config) {
                    console.info("Error ");
                });
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                }, function (evt) {
                    thisFile.uploadProgress = parseInt(100.0 * evt.loaded / evt.total);
                    //console.log('progress: ' + thisFile.uploadProgress + '% ' + thisFile.name);
                });

            })
            .error(function (data, status, header, config) {
                console.info("Error");
            });   
                 
            });
            }
         };
        
        
        $scope.uploadFaculties = function () {
            alert('Here');
            var faculties = $scope.faculties;
            var nFiles = faculties.length;
            $scope.showAddFacultiesForm = false;
            var providerId = $scope.provider._id;
            var counter = 0;
            if (faculties && faculties.length) {
            faculties.forEach(function(thisFile, index){
                
            var fileInfo = {
                filename: thisFile.name,
                contentType: thisFile.type
            };
            console.info(JSON.stringify(fileInfo));
            ImageService.s3Credentials(fileInfo).success(function (data, status, headers) {
            var s3Request = {};
            var allParams = data.params;
            for (var key in allParams) {
              if (allParams.hasOwnProperty(key)) {
                s3Request[key] = allParams[key];
              }
            }
            s3Request.file = thisFile;
            Upload.upload({
                url: data.endpoint_url,
                data: s3Request
            }).then(function (resp) {
                console.info('Success ' + thisFile.name + 'uploaded. Response: ' + resp.data);
                thisFile.link = $(resp.data).find('Location').text();
                thisFile.newFaculty = {
                    name: '',
                    image: thisFile.link,
                    subject: '',
                    yearsExperience: '',
                    qualification: '',
                    description: ''
                };
                var newFacultyForm ={
                    faculty: thisFile.newFaculty,
                    providerId: providerId
                }; targetStudyProviderService.addFaculty(newFacultyForm).success(function (data, status, headers) {
                    counter = counter + 1;
                    //console.info('Counter is: ' + counter);
                    //console.info("Faculty added to database " + thisFile.newFaculty.image);
                    if(counter == nFiles){
                        $scope.showAddFacultiesForm = true;
                        $scope.preUploadFacultyLength = $scope.provider.faculty.length;
                        var refreshedProvider = targetStudyProviderService.getProvider(providerId).success(function (refreshedProvider, status, headers) {
                            $scope.provider = refreshedProvider;
                            $scope.editPhotos();
                        }).error(function (data, status, header, config) {
                            console.info("Error ");
                        });
                        
                    }
                })
                .error(function (data, status, header, config) {
                    console.info("Error ");
                });
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                }, function (evt) {
                    thisFile.uploadProgress = parseInt(100.0 * evt.loaded / evt.total);
                    //console.log('progress: ' + thisFile.uploadProgress + '% ' + thisFile.name);
                });

            })
            .error(function (data, status, header, config) {
                console.info("Error");
            });   
                 
            });
            }
         };
        $scope.setEmail = function(suggestedEmail){
            if($scope.provider.email){
                $scope.provider.email += ', ' +suggestedEmail;
            }else{
                $scope.provider.email = suggestedEmail;
            }
            
        };
        
        $scope.setLocation = function(location){
            $scope.provider.location = location._id;
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
        
        $scope.data = '';
        $scope.add = function(){
            var f = document.getElementById('file').faculties[0],
            r = new FileReader();
            r.onloadend = function(e){
                $scope.Imagedata = e.target.result;
                
                //$scope.Imagedata = 'data:image/png;base64,'+$scope.Imagedata;
                $scope.newImage = {
                    data: $scope.Imagedata,
                    contentType: 'image/png'
                };
                console.info(JSON.stringify($scope.newImage));
                ImageService.saveImage($scope.newImage).success(function (data, status, headers) {
                   console.info('Done'); 
                })
                .error(function (data, status, header, config) {
                    console.info(data);
                });
                
            }
            r.readAsBinaryString(f);
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
                alert("Provider Saved");
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
        
    
    exambazaar.controller("addSendGridController", 
        [ '$scope',  'sendGridCredentialList','SendGridService','$http','$state', function($scope, sendGridCredentialList, SendGridService,$http,$state){
        $scope.sendGridCredentials = sendGridCredentialList.data;
        
        $scope.sendGridCredential = {
            apiKey:'',
            active: true
        };
        $scope.removeEmailTemplate = function(template){
           /* ABC
            $scope.sendGridCredential.emailTemplate.forEach(function(thisTemplate, templateIndex){
                if(thisTemplate.name == template.name && ){
                    
                }
                
            });*/
        };
        $scope.addEmailTemplate = function(){
            var newTemplate = {
                name: '',
                templateKey:''
            };
            $scope.sendGridCredential.emailTemplate.push(newTemplate);
        };
        $scope.addSendGridCredential = function () {
            var saveSendGridCredential = SendGridService.saveSendGridCredential($scope.sendGridCredential).success(function (data, status, headers) {
               
                alert("SendGrid Credential saved: " + $scope.sendGridCredential.apiKey);
            })
            .error(function (data, status, header, config) {
                console.info('Error ' + data + ' ' + status);
            });
        };
            
        
        $scope.setSendGridCredential = function(sendGridCredential){
            $scope.sendGridCredential = sendGridCredential;
        };
    }]);
    
    exambazaar.controller("addAwsCredentialController", 
        [ '$scope',  'awsCredentialList','AwsCredentialService','$http','$state', function($scope, awsCredentialList, AwsCredentialService,$http,$state){
        $scope.awsCredentials = awsCredentialList.data;
        
        $scope.addAwsCredential = function () {
            var saveAwsCredential = AwsCredentialService.saveAwsCredential($scope.awsCredential).success(function (data, status, headers) {
               
                alert("AWS Credential saved: " + $scope.awsCredential.accessKey);
            })
            .error(function (data, status, header, config) {
                console.info('Error ' + data + ' ' + status);
            });
        };
            
        
        $scope.setAwsCredential = function(awsCredential){
            $scope.awsCredential = awsCredential;
        };
    }]);
     
    exambazaar.controller("addMediaTagController", 
        [ '$scope',  'mediaTagList','mediaTypeList','MediaTagService','$http','$state', function($scope, mediaTagList,mediaTypeList, MediaTagService,$http,$state){
            
        $scope.mediaTags = mediaTagList.data;
        $scope.mediaTypes = mediaTypeList.data;
        $scope.newmediaTags = [
            {
                media: 'Image',
                type: 'External',
                subType: 'Institute Logo'
            }
        ];
        $scope.bulkAddMode = false;
        $scope.setBulkAddMode = function(){
            $scope.bulkAddMode = !$scope.bulkAddMode;
        };
         
        $scope.addMediaTag = function () {
            //alert('Here');
            var saveMediaTag = MediaTagService.saveMediaTags([$scope.mediaTag]).success(function (data, status, headers) {
               
                alert("Media Tag saved: " + $scope.mediaTag.media + ' > ' + $scope.mediaTag.type + ' > ' + $scope.mediaTag.subType);
            })
            .error(function (data, status, header, config) {
                console.info('Error ' + data + ' ' + status);
            });
        };
            
        $scope.addMediaTags = function(){
            $scope.newmediaTags.pop();
            $scope.newmediaTags.pop();
            $scope.newmediaTags.pop();
            $scope.newmediaTags.pop();
            $scope.newmediaTags.pop();
            
            MediaTagService.saveMediaTags($scope.newmediaTags).success(function (data, status, headers) {
                alert('MediaTags Saved!');
                })
                .error(function (data, status, header, config) {
                    console.info('Error: ' + data);
                });      
        };
        $scope.setMediaTag = function(mediaTag){
            $scope.mediaTag = mediaTag;
        };
    }]); 
     
    exambazaar.controller("addLocationController", 
        [ '$scope',  'locationList','cityList','LocationService','$http','$state', function($scope, locationList,cityList, LocationService,$http,$state){
        $scope.locations = locationList.data;
        $scope.cities = cityList.data;
        $scope.bulkAddMode = false;
        $scope.setBulkAddMode = function(){
            $scope.bulkAddMode = !$scope.bulkAddMode;
        };
        $scope.newlocations = [
            {
                city:'Jaipur',
                area:'Malviya Nagar'
            }
        ];
        $scope.addLocation = function () {
            var saveLocation = LocationService.saveLocation($scope.location).success(function (data, status, headers) {
               
                alert("Location saved: " + $scope.location.area);
            })
            .error(function (data, status, header, config) {
                console.info('Error ' + data + ' ' + status);
            });
        };
            
        $scope.addLocations = function(){
            $scope.newlocations.pop();
            $scope.newlocations.pop();
            $scope.newlocations.pop();
            $scope.newlocations.pop();
            $scope.newlocations.pop();
            
            LocationService.saveLocations($scope.newlocations).success(function (data, status, headers) {
                alert('Locations Saved!');
                })
                .error(function (data, status, header, config) {
                    console.info('Error: ' + data);
                });      
        };
        $scope.setLocation = function(location){
            $scope.location = location;
        };
    }]);
    exambazaar.controller("addExamController", 
        [ '$scope',  'examList','streamList','ExamService','$http','$state', function($scope, examList,streamList, ExamService,$http,$state){
        $scope.exams = examList.data;
            
        
        $scope.streams = streamList.data;
        //console.info(examList.data);
        $scope.addExam = function () {
            var saveExam = ExamService.saveExam($scope.exam).success(function (data, status, headers) {
               //$state.go('master-dashboard', {masterId: masterId});
                alert("Exam saved: " + $scope.exam.displayname);
            })
            .error(function (data, status, header, config) {
                console.info('Error ' + data + ' ' + status);
            });
        };
        $scope.setExam = function(exam){
            $scope.exam = exam;
        };
    }]);
    exambazaar.controller("addStreamController", 
        [ '$scope',  'streamList','StreamService','$http','$state', function($scope, streamList, StreamService,$http,$state){
        $scope.streams = streamList.data;
        console.info(streamList.data);
        $scope.addStream = function () {
            var saveStream = StreamService.saveStream($scope.stream).success(function (data, status, headers) {
               //$state.go('master-dashboard', {masterId: masterId});
            
            })
            .error(function (data, status, header, config) {
                console.info('Error ' + data + ' ' + status);
            });
        };
        $scope.setStream = function(stream){
            $scope.stream = stream;
        };
    }]);
            
    exambazaar.controller("addInternController", 
        [ '$scope', 'UserService','$http','$state', function($scope, UserService,$http,$state){
        $scope.genders = ["Female", "Male"];
        $scope.intern = {
            userType: 'Intern',
            password: '',
            basic: {
                name: 'Gaurav Parashar',
                gender: 'Male',
                //dob: new Date("April 29, 1989")
            },
            contact: {
                mobile: '9829685919',
                email: 'gauravparashar294@gmail.com'
            }
        };
            
        $scope.internTypes =[
            'Intern - Business Development',
            'Intern - Content'
        ];    
        
        $scope.addIntern = function () {
            var saveIntern = UserService.saveUser($scope.intern).success(function (data, status, headers) {
                var internId = data;
            //$scope.formmessage = "Intern " + $scope.intern.basic.firstName + " " + $scope.intern.basic.lastName + " saved!";
            
            alert('Done');    
                //$state.go('intern-dashboard', {internId: internId});
                
            })
            .error(function (data, status, header, config) {
                console.info('Error ' + data + ' ' + status);
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
        $scope.urlpart1 = 'http://www.exambazaar.com/#!/main/';
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
        
        
    exambazaar.controller("sendEmailController", 
        [ '$scope','$http','$state','EmailService', function($scope,$http,$state,EmailService){
            $scope.email = {
                to: 'gauravparashar294@gmail.com',
                name: 'Gaurav Parashar',
                from: 'gaurav@exambazaar.com',
                subject: 'Give 2 minutes to REVOLUTIONIZE Test Preparation in India',
                html: "Winning this Amazon Gift Card is a lot easier than any exam you have ever written! Fill this 2 minute survey about your test preparation experience to participate in the contest.<br/><br/>"
            };
            
            $scope.sendEmail = function() {
                EmailService.sendGrid($scope.email).success(function (data, status, headers) {
                    alert('Done');
                })
                .error(function (data, status, header, config) {
                    console.info('Error ' + data + ' ' + status);
                });  
            };
            
        }]);  
    
    exambazaar.config(function($mdDateLocaleProvider) {
    $mdDateLocaleProvider.formatDate = function(date) {
       return moment(date).format('MMM DD YYYY');
        };
    });
        
    exambazaar.config(['tooltipsConfProvider', function configConf(tooltipsConfProvider) {
      tooltipsConfProvider.configure({
        'tooltip-append-to-body': true,
        'smart':true,
        'size':'large',
        'speed': 'slow',
        'tooltipTemplateUrlCache': true
        //etc...
      });
    }])
        
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
    $urlRouterProvider.otherwise('/getStarted');
    $stateProvider
        //landing page
    
        .state('landing', {
            url: '/getStarted',
            views: {
                'header':{
                    templateUrl: 'header2.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'landing.html',
                    controller: 'landingController'
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            }
        })
        .state('main', {
            url: '/main',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'stream.html',
                    controller: 'streamController'
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                streamList: ['StreamService',
                    function(StreamService){
                    return StreamService.getStreams();
                }],
                stream: function() { return {}; }
            }
        })
        .state('signup', {
                url: '/signup',
                views: {
                    'header':{
                        templateUrl: 'header.html',
                        controller: 'headerController'
                    },
                    'body':{
                        templateUrl: 'signup.html',
                        controller: 'signupController'
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
            },
            resolve: {
                examList: ['ExamService','$stateParams',
                    function(ExamService,$stateParams){
                    return ExamService.getStreamExams($stateParams.categoryName);
                }],
                exam: function() { return {}; }
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
            },
            resolve: {
                thisStream: ['StreamService','$stateParams',
                    function(StreamService,$stateParams){
                    return StreamService.getStreamByName($stateParams.categoryName);
                }],
                thisExam: ['ExamService','$stateParams',
                    function(ExamService,$stateParams){
                    return ExamService.getExamByName($stateParams.subCategoryName);
                }],
                exam: function() { return {}; }
            }
        
        
        })
        .state('findCoaching', {
            url: '/main/:categoryName/:subCategoryName/:cityName', //masterId?
            views: {
                'header':{
                    templateUrl: 'header1.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'coaching.html',
                    controller: 'coachingController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                thisStream: ['StreamService','$stateParams',
                    function(StreamService,$stateParams){
                    return StreamService.getStreamByName($stateParams.categoryName);
                }],
                thisExam: ['ExamService','$stateParams',
                    function(ExamService,$stateParams){
                    return ExamService.getExamByName($stateParams.subCategoryName);
                }],
                streamExams: ['ExamService','$stateParams',
                    function(ExamService,$stateParams){
                    return ExamService.getStreamExams($stateParams.categoryName);
                }],
                
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
                    templateUrl: 'header1.html',
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
                thisStream: ['StreamService','$stateParams',
                    function(StreamService,$stateParams){
                    return StreamService.getStreamByName($stateParams.categoryName);
                }],
                thisExam: ['ExamService','$stateParams',
                    function(ExamService,$stateParams){
                    return ExamService.getExamByName($stateParams.subCategoryName);
                }],
                thisProvider: ['targetStudyProviderService','$stateParams',
                    function(targetStudyProviderService,$stateParams) {  
                    return targetStudyProviderService.getProvider($stateParams.coachingId);
                }],
                provider: function() { return {}; }
                
            }
        })
        .state('claim', {
            url: '/claim/:coachingId', //masterId?
            views: {
                'header':{
                    templateUrl: 'header1.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'claim.html',
                    controller: 'claimController',
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
        .state('claim2', {
            url: '/claim2/:coachingId', //masterId?
            views: {
                'header':{
                    templateUrl: 'header1.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'claim2.html',
                    controller: 'claim2Controller',
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
                imageMediaTagList:['MediaTagService','$stateParams',
                    function(MediaTagService) {  
                    return MediaTagService.getMediaTagByType('Image');
                }],
                videoMediaTagList:['MediaTagService','$stateParams',
                    function(MediaTagService) {  
                    return MediaTagService.getMediaTagByType('Video');
                }],
                examList: ['ExamService',
                    function(ExamService){
                    return ExamService.getExams();
                }],
                streamList: ['StreamService',
                    function(StreamService){
                    return StreamService.getStreams();
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
    
        .state('sendEmail', {
            url: '/master/:masterId/sendEmail',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'sendEmail.html',
                    controller: 'sendEmailController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
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
        .state('account', {
            url: '/account', //masterId?
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'account.html',
                    controller: 'accountController',
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
                imageMediaTagList:['MediaTagService','$stateParams',
                    function(MediaTagService) {  
                    return MediaTagService.getMediaTagByType('Image');
                }],
                provider: function() { return {}; }
                
            }
        })
        .state('providersWithAreas', {
            url: '/coaching/providersWithAreas', //masterId?
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'providersWithAreas.html',
                    controller: 'providersWithAreasController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                targetStudyProvidersList: ['targetStudyProviderService','$stateParams',
                    function(targetStudyProviderService,$stateParams) {
                    //alert($stateParams.city);    
                    return targetStudyProviderService.getProvidersWithAreas();
                }],
                provider: function() { return {}; }
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
                locationsList: ['LocationService','$stateParams',
                    function(LocationService,$stateParams) {
                    return LocationService.getCityLocations($stateParams.city);
                }],
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
                    controller: 'streamController'
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
        .state('addStream', {
            url: '/addStream',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'addStream.html',
                    controller: 'addStreamController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                streamList: ['StreamService',
                    function(StreamService){
                    return StreamService.getStreams();
                }],
                stream: function() { return {}; }
            }
        })
    
        .state('addLocation', {
            url: '/addLocation',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'addLocation.html',
                    controller: 'addLocationController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                locationList: ['LocationService',
                    function(LocationService){
                    return LocationService.getLocations();
                }],
                cityList: ['LocationService',
                    function(LocationService){
                    return LocationService.getCities();
                }],
                exam: function() { return {}; }
            }
        })
        .state('addMediaTag', {
            url: '/addMediaTag',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'addMediaTag.html',
                    controller: 'addMediaTagController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                mediaTagList: ['MediaTagService',
                    function(MediaTagService){
                    return MediaTagService.getMediaTags();
                }],
                mediaTypeList: ['MediaTagService',
                    function(MediaTagService){
                    return MediaTagService.getMediaTypes();
                }],
                mediaTag: function() { return {}; }
            }
        })
        .state('addSendGridCredential', {
            url: '/addAwsCredential',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'addSendGrid.html',
                    controller: 'addSendGridController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                sendGridCredentialList: ['SendGridService',
                    function(SendGridService){
                    return SendGridService.getSendGridCredentials();
                }],
                sendGridCredential: function() { return {}; }
            }
        })
        .state('addAwsCredential', {
            url: '/addAwsCredential',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'addAwsCredential.html',
                    controller: 'addAwsCredentialController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                awsCredentialList: ['AwsCredentialService',
                    function(AwsCredentialService){
                    return AwsCredentialService.getAwsCredentials();
                }],
                awsCredential: function() { return {}; }
            }
        })
        .state('addExam', {
            url: '/addExam',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'addExam.html',
                    controller: 'addExamController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                examList: ['ExamService',
                    function(ExamService){
                    return ExamService.getExams();
                }],
                streamList: ['StreamService',
                    function(StreamService){
                    return StreamService.getStreams();
                }],
                exam: function() { return {}; }
            }
        })
        .state('addMaster', {
            url: '/master/:masterId/addMaster',
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
        .state('addIntern', {
            url: '/master/:masterId/addIntern',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'addIntern.html',
                    controller: 'addInternController',
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
            $locationProvider.hashPrefix("!");
        });
        
    })();

exambazaar.run(function($rootScope,$mdDialog) {
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
    $rootScope.$on('$stateChangeSuccess', function() {
       document.body.scrollTop = document.documentElement.scrollTop = 0;
        $mdDialog.hide();
    });
});

function generateOtp(min, max) {
    min = 1000;
    max = 9999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

exambazaar.directive('focusMe', ['$timeout', '$parse', function ($timeout, $parse) {
    return {
        //scope: true,   // optionally create a child scope
        link: function (scope, element, attrs) {
            var model = $parse(attrs.focusMe);
            scope.$watch(model, function (value) {
                //console.log('value=', value);
                if (value === true) {
                    $timeout(function () {
                        element[0].focus();
                    });
                }
            });
            // to address @blesh's comment, set attribute value to 'false'
            // on blur event:
            element.bind('blur', function () {
                //console.log('blur');
                /*scope.$apply(model.assign(scope, false));*/
            });
        }
    };
}]);
