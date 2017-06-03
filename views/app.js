
var exambazaar = angular.module('exambazaar', ['ui.router','ngMaterial','ngAria','material.svgAssetsCache','angular-loading-bar','vAccordion', 'ngAnimate','ngCookies','angularMoment','materialCalendar','ngSanitize','angularFileUpload','matchMedia','geolocation','ngGeolocation','ngMap','720kb.tooltips','ngHandsontable','duScroll','mgcrea.bootstrap.affix','ngFileUpload','youtube-embed', 'ngMeta', 'ngtweet','ngFacebook']);
//,'ngHandsontable''ngHandsontable',,'ng','seo'
    (function() {
    'use strict';
    angular
    .module('exambazaar')
    .config(function($mdThemingProvider, $facebookProvider) {
        $mdThemingProvider
            .theme("default")
            .primaryPalette("teal");
        $facebookProvider.setAppId('1236747093103286');
        $facebookProvider.setPermissions("public_profile,email"); //, user_education_history, publish_actions
        
        
    })
    .controller('streamController', streamController);
    function streamController(streamList,$scope,$window,$http,$state, $document,OTPService,$cookies,categories, $rootScope, ngMeta, $location) {
        if($cookies.getObject('location')){
            $scope.location = $cookies.getObject('location'); 
        }
        $scope.streams = streamList.data;
        /*$rootScope.pageTitle = "Exambazaar: Select the stream you want to study";
        $rootScope.pageTitle = "Exambazaar is India’s biggest and largest education discovery platform and is the fastest way to discover best coaching institutes in your city. Our easy-to-use website shows you all the coaching institutes based on study streams, along with courses, photos, vidoes and results. Exambazaar also provides comprehensive information for test prep for entrance exams in India, colleges, courses, universities and career options. You can find information about more than 50 exams and coaching institutes to succeed";*/
        $rootScope.pageTitle = 'Exambazaar: Select your Exam Stream';
        
        
        $rootScope.pageDescription = "Select your exam stream from Engineering, Medical, CA & CS, School, Mba, Law, Foreign Education, Civil Services, SSC, Bank, Defence, Insurance, Financial Certification";
        
        $rootScope.pageKeywords = "Exambazaar, Best Coaching India, Coaching Reviews, Engineering Coaching, Medical Coaching, CA & CS Coaching, NTSE Coaching, CAT Coaching, CLAT Coaching, SAT GMAT Coaching, IAS Coaching, SSC Coaching, Bank PO Coaching, Defence Coaching";
        /*
        var streamNames = '';
        $scope.streams.forEach(function(thisStream, sIndex){
            if(true){
                streamNames += thisStream.displayname 
                if(sIndex != $scope.streams.length - 1){
                    streamNames += ', ';
                }    
                    
            }
            
        });
        var pageTitle = "Choose your Study Stream for over 50 Exams in India"
        var pageDescription = "Search over 20,000 coaching institutes in India to study across " + streamNames + ' at Exambazaar | Exambazaar - results, fees, faculty, photos, vidoes, reviews of Coaching Institutes in India';
        $rootScope.pageDescription = pageDescription;
        ngMeta.setTitle(pageTitle);
        ngMeta.setTag('description', pageDescription);
        */
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
        this.fbSave = function(user) {
            
            return $http.post('/api/users/fbSave', user);
        };
        this.getUser = function(userId) {
            return $http.get('/api/users/edit/'+userId, {userId: userId});
        };
        this.getEmails = function(userId) {
            return $http.get('/api/users/emails/'+userId, {userId: userId});
        };
        this.getPartner = function(userId) {
            return $http.get('/api/users/editPartner/'+userId, {userId: userId});
        };
        this.getUserBasic = function(userId) {
            return $http.get('/api/users/editBasic/'+userId, {userId: userId});
        };
        this.getUserShortlisted = function(userId) {
            return $http.get('/api/users/editShortlist/'+userId, {userId: userId});
        };
        this.getUsers = function() {
            return $http.get('/api/users');
        };
        this.getInterns = function() {
            return $http.get('/api/users/interns');
        };
        this.getUserFilled = function(userId) {
            
            return $http.get('/api/users/editFilled/'+userId, {userId: userId});
        };
        this.userexists = function(mobile) {
            return $http.get('/api/users/userexists/'+mobile, {mobile: mobile});
        };
        this.markLogin = function(loginForm) {
            
            return $http.post('/api/users/markLogin',loginForm);
        };
        this.markLatLng = function(positionForm) {
            
            return $http.post('/api/users/markLatLng',positionForm);
        };
        this.shortlistInstitute = function(shortListForm) {
            return $http.post('/api/users/shortlistInstitute', shortListForm);
        };
        this.addPic = function(newPicForm) {
            return $http.post('/api/users/addPic', newPicForm);
        };
        
        this.getUsersCount = function() {
            return $http.get('/api/users/count');
        };
        this.getVerfiedUsersCount = function() {
            return $http.get('/api/users/verfiedCount');
        };
        this.getStudentCount = function() {
            return $http.get('/api/users/studentcount');
        };
        this.updatePassword = function(userPassword) {
            return $http.post('/api/users/updatePassword',userPassword);
        };
    }]);
        
    exambazaar.service('EmailService', ['$http', function($http) {
        this.getEmails = function() {
            return $http.get('/api/emails');
        };
        this.send = function(email) {
            return $http.post('/api/emails/send', email);
        };
        this.sendGrid = function(email) {
            return $http.post('/api/emails/sendGrid', email);
        };
        
    }]);    
    
    exambazaar.service('EligibilityService', ['$http', function($http) {
        this.bulksaveEligibility = function(eligibility) {
            return $http.post('/api/eligibilitys/bulksave', eligibility);
        };
        this.getEligibility = function(eligibilityId) {
            return $http.get('/api/eligibilitys/edit/'+eligibilityId, {eligibilityId: eligibilityId});
        };
        this.getEligibilities = function() {
            return $http.get('/api/eligibilitys');
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
            return $http.get('/api/exams/stream/'+streamName, {streamName: streamName});
        };
        this.getExamByName = function(examName) {
            return $http.get('/api/exams/exam/'+examName, {examName: examName});
        };
        this.addLogo = function(newLogoForm) {
            return $http.post('/api/exams/addLogo',newLogoForm);
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
    
    exambazaar.service('GroupService', ['$http', function($http) {
       
        this.saveGroups = function(groups) {
            return $http.post('/api/groups/bulksave', groups);
        };
        this.getGroup = function(groupId) {
            return $http.get('/api/groups/edit/'+groupId, {groupId: groupId});
        };
        this.getGroups = function() {
            return $http.get('/api/groups');
        };
        
    }]);    
        
    exambazaar.service('cisavedService', ['$http', function($http) {
       
        this.savecisaved = function(cisavedForm) {
            return $http.post('/api/cisaveds/save', cisavedForm);
        };
        this.institutesSaved = function() {
            return $http.get('/api/cisaveds/institutesSaved');
        };
        this.savedCount = function() {
            return $http.get('/api/cisaveds/savedCount');
        };
        this.getcisaved = function(cisavedId) {
            return $http.get('/api/cisaveds/edit/'+cisavedId, {cisavedId: cisavedId});
        };
        this.getcisaveds = function() {
            return $http.get('/api/cisaveds');
        };
        
    }]);
        
        
    exambazaar.service('ipService', ['$http', function($http) {
        this.getip = function() {
            return $http.get('http://ip-api.com/json');
        };
        
    }]);
    exambazaar.service('viewService', ['$http', function($http) {
       
        this.saveview = function(viewForm) {
            return $http.post('/api/views/save', viewForm);
        };
        this.masterViewSummary = function() {
            return $http.get('/api/views/masterViewSummary');
        };
        this.getview = function(viewId) {
            return $http.get('/api/views/edit/'+viewId, {viewId: viewId});
        };
        this.getviews = function() {
            return $http.get('/api/views');
        };
        this.getuserviews = function(userId) {
            return $http.get('/api/views/user/'+userId, {userId: userId});
        };
        this.getinstituteviews = function(instituteId) {
            return $http.get('/api/views/institute/'+instituteId, {instituteId: instituteId});
        };
    }]);
    exambazaar.service('tofillciService', ['$http', function($http) {
       
        this.sendEmails = function() {
            return $http.get('/api/tofillcis/sendEmails');
        };
        this.savetofillci = function(tofillciForm) {
            return $http.post('/api/tofillcis/save', tofillciForm);
        };
        
        this.markDone = function(tofillciForm) {
            return $http.post('/api/tofillcis/markDone', tofillciForm);
        };
        this.filledCount = function() {
            return $http.get('/api/tofillcis/filledCount');
        };
        this.institutesFilled = function() {
            return $http.get('/api/tofillcis/institutesFilled');
        };
        this.gettofillci = function(tofillciId) {
            return $http.get('/api/tofillcis/edit/'+tofillciId, {tofillciId: tofillciId});
        };
        this.prevFilled = function(groupName) {
            return $http.get('/api/tofillcis/prevFilled/'+groupName, {groupName: groupName});
        };
        this.removeAssigned = function(tofillciId){
            $http.get('/api/tofillcis/remove/'+tofillciId, {tofillciId: tofillciId});
        };
        this.gettofillcis = function() {
            return $http.get('/api/tofillcis');
        };
        this.getusertofillcis = function(userId) {
            return $http.get('/api/tofillcis/user/'+userId, {userId: userId});
        };
    }]);
    exambazaar.service('addContactInfoService', ['$http', function($http) {
       
        this.saveaddContactInfo = function(addContactInfoForm) {
            return $http.post('/api/addContactInfos/save', addContactInfoForm);
        };
        
        this.markDone = function(addContactInfoForm) {
            return $http.post('/api/addContactInfos/markDone', addContactInfoForm);
        };
        this.changeUser = function() {
            return $http.get('/api/addContactInfos/changeUser');
        };
        this.verifiedCount = function() {
            return $http.get('/api/addContactInfos/verifiedCount');
        };
        this.institutesFilled = function() {
            return $http.get('/api/addContactInfos/institutesFilled');
        };
        this.getaddContactInfo = function(addContactInfoId) {
            return $http.get('/api/addContactInfos/edit/'+addContactInfoId, {addContactInfoId: addContactInfoId});
        };
        this.removeAssigned = function(addContactInfoId){
            $http.get('/api/addContactInfos/remove/'+addContactInfoId, {addContactInfoId: addContactInfoId});
        };
        this.getaddContactInfos = function() {
            return $http.get('/api/addContactInfos');
        };
        this.getuseraddContactInfos = function(userId) {
            return $http.get('/api/addContactInfos/user/'+userId, {userId: userId});
        };
    }]);    
        
    exambazaar.service('toverifyciService', ['$http', function($http) {
       
        this.savetoverifyci = function(toverifyciForm) {
            return $http.post('/api/toverifycis/save', toverifyciForm);
        };
        
        this.markDone = function(toverifyciForm) {
            return $http.post('/api/toverifycis/markDone', toverifyciForm);
        };
        this.changeUser = function() {
            return $http.get('/api/toverifycis/changeUser');
        };
        this.verifiedCount = function() {
            return $http.get('/api/toverifycis/verifiedCount');
        };
        this.institutesFilled = function() {
            return $http.get('/api/toverifycis/institutesFilled');
        };
        this.gettoverifyci = function(toverifyciId) {
            return $http.get('/api/toverifycis/edit/'+toverifyciId, {toverifyciId: toverifyciId});
        };
        this.removeAssigned = function(toverifyciId){
            $http.get('/api/toverifycis/remove/'+toverifyciId, {toverifyciId: toverifyciId});
        };
        this.gettoverifycis = function() {
            return $http.get('/api/toverifycis');
        };
        this.getusertoverifycis = function(userId) {
            return $http.get('/api/toverifycis/user/'+userId, {userId: userId});
        };
    }]);
    
        
    exambazaar.service('suggestCoachingService', ['$http', function($http) {
       
        this.savesuggestCoaching = function(suggestCoachingForm) {
            return $http.post('/api/suggestCoachings/save', suggestCoachingForm);
        };
        
        this.markDone = function(suggestCoachingForm) {
            return $http.post('/api/suggestCoachings/markDone', suggestCoachingForm);
        };
        this.getsuggestCoaching = function(suggestCoachingId) {
            return $http.get('/api/suggestCoachings/edit/'+suggestCoachingId, {suggestCoachingId: suggestCoachingId});
        };
        
        this.getsuggestCoachings = function() {
            return $http.get('/api/suggestCoachings');
        };
        this.getusersuggestCoachings = function(userId) {
            return $http.get('/api/suggestCoachings/user/'+userId, {userId: userId});
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
            return $http.get('/api/providers/'+city, {city: city});
        };
        this.removeDuplicates = function(city) {
            return $http.get('/api/providers/edit/removeDuplicates/'+city, {city: city});
        };
    }]);    
    exambazaar.service('targetStudyProviderService', ['$http', function($http) {
        this.getProviders = function(city) {
            return $http.get('/api/targetStudyProviders/city/'+city, {city: city});
        };
        this.getProvidersWithAreas = function() {
            return $http.get('/api/targetStudyProviders/providersWithAreas');
        };
        this.coachingAddressService = function() {
            return $http.get('/api/targetStudyProviders/coachingAddressService');
        };
        this.searchProviders = function(query) {
            return $http.get('/api/targetStudyProviders/query/'+query, {query: query});
        };
        this.searchCoachingGroupProviders = function(query) {
            return $http.get('/api/targetStudyProviders/coachingGroupQuery/'+query, {query: query});
        };
        
        this.searchCityProviders = function(cityQueryForm) {
            return $http.post('/api/targetStudyProviders/cityQuery',cityQueryForm);
        };
        this.bulkSaveLatLng = function(LatLngForm) {
            return $http.post('/api/targetStudyProviders/bulkSaveLatLng',LatLngForm);
        };
        this.checkLogo = function(pageNumber) {
            return $http.get('/api/targetStudyProviders/checkLogo/'+pageNumber, {pageNumber: pageNumber});
        };
        this.bulkCheckLogos = function(checkLogoForm) {
            return $http.post('/api/targetStudyProviders/bulkCheckLogos',checkLogoForm);
        };
        this.bulkDisableProviders = function(disableForm) {
            return $http.post('/api/targetStudyProviders/bulkDisableProviders',disableForm);
        };
        
        this.groupProviders = function(query) {
            return $http.get('/api/targetStudyProviders/group/'+query, {query: query});
        };
        this.addFaculty = function(newFacultyForm) {
            return $http.post('/api/targetStudyProviders/addFaculty',newFacultyForm);
        };
        this.addManagement = function(newManagementForm) {
            return $http.post('/api/targetStudyProviders/addManagement',newManagementForm);
        };
        this.removeManagement = function(newManagementForm) {
            return $http.post('/api/targetStudyProviders/removeManagement',newManagementForm);
        };
        
        this.addPrimaryManagement = function(newManagementForm) {
            return $http.post('/api/targetStudyProviders/addPrimaryManagement',newManagementForm);
        };
        this.addResult = function(newResultForm) {
            return $http.post('/api/targetStudyProviders/addResult',newResultForm);
        };
        this.bulkAddResult = function(bulkResult) {
            return $http.post('/api/targetStudyProviders/bulkAddResult',bulkResult);
        };
        
        
        
        this.addPhoto = function(newPhotoForm) {
            return $http.post('/api/targetStudyProviders/addPhoto',newPhotoForm);
        };
        
        this.addLogo = function(newLogoForm) {
            return $http.post('/api/targetStudyProviders/addLogo',newLogoForm);
        };
        this.addResultPic = function(newResultPicForm) {
            return $http.post('/api/targetStudyProviders/addResultPic',newResultPicForm);
        };
        
        this.addVideo = function(newVideoForm) {
            return $http.post('/api/targetStudyProviders/addVideo',newVideoForm);
        };
        this.changeProvidersStartingWith = function(startsWith) {
            return $http.get('/api/targetStudyProviders/changeProvidersStartingWith/'+startsWith, {startsWith: startsWith});
        };
        this.getCourseProviders = function(cityCourse) {
            return $http.post('/api/targetStudyProviders/cityCourse',cityCourse);
        };
        this.getProvider = function(coachingId) {
            return $http.get('/api/targetStudyProviders/coaching/'+coachingId, {coachingId: coachingId});
        };
        this.getProviderReview = function(coachingId) {
            return $http.get('/api/targetStudyProviders/coachingreview/'+coachingId, {coachingId: coachingId});
        };
        this.getGroupInfo = function(coachingId) {
            return $http.get('/api/targetStudyProviders/getGroupInfo/'+coachingId, {coachingId: coachingId});
        };
        this.getGroupCity = function(groupCity) {
            return $http.post('/api/targetStudyProviders/coachingGroup/',groupCity);
        };
        this.getProviderBasic = function(coachingId) {
            return $http.get('/api/targetStudyProviders/basiccoaching/'+coachingId, {coachingId: coachingId});
        };
        this.getGroupName = function(coachingId) {
            return $http.get('/api/targetStudyProviders/getGroupName/'+coachingId, {coachingId: coachingId});
        };
        this.getProviderFillSummary = function(coachingId) {
            return $http.get('/api/targetStudyProviders/fillSummary/'+coachingId, {coachingId: coachingId});
        };
        this.cisavedUsers = function(coachingId) {
            return $http.get('/api/targetStudyProviders/cisavedUsers/'+coachingId, {coachingId: coachingId});
        };
        this.setEBVerifyState = function(verifyForm) {
            return $http.post('/api/targetStudyProviders/setEBVerifyState',verifyForm);
        };
        this.setEBContactInfoState = function(verifyForm) {
            return $http.post('/api/targetStudyProviders/setEBContactInfoState',verifyForm);
        };
        this.saveProvider = function(provider) {
            return $http.post('/api/targetStudyProviders/savecoaching',provider);
        };
        this.bulkSaveProviders = function(providers) {
            return $http.post('/api/targetStudyProviders/bulksavecoaching',providers);
        };
        this.getCount = function() {
            return $http.get('/api/targetStudyProviders/count');
        };
        this.getCityCount = function() {
            return $http.get('/api/targetStudyProviders/cityCount');
        };
        this.getCityProviderCount = function(city) {
            return $http.get('/api/targetStudyProviders/cityProviderCount/'+city, {city: city});
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
        this.databaseService = function() {
            return $http.get('/api/targetStudyProviders/databaseService');
        };
        this.sandbox2Service = function(city) {
            return $http.get('/api/targetStudyProviders/sandbox2Service/'+city, {city: city});
        };
        this.UniqueLogoService = function() {
            return $http.get('/api/targetStudyProviders/UniqueLogoService');
        };
        this.allDistinct = function() {
            return $http.get('/api/targetStudyProviders/allDistinct');
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
        [ '$scope','$stateParams','$cookies','$state','OTPService','UserService', '$mdDialog', function($scope,$stateParams,$cookies,$state,OTPService,UserService, $mdDialog){
        $mdDialog.hide();
            
        $scope.button1 = "Start";
        $scope.button2 = "Verify";
        $scope.button3 = "Finish";
        $scope.step1 = true;
        $scope.step2 = false;
        $scope.step3 = false;
        $scope.verifyPhone = function(){
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
                var fulluser = data;
                
                var sessionuser = {
                    userId: fulluser._id,
                    masterId: fulluser._id,
                    facebookId: fulluser.facebookId,
                    userType: fulluser.userType,
                    basic: fulluser.basic,
                    image: fulluser.image,
                    mobile: fulluser.mobile,
                    email: fulluser.email,
                    
                };
                $cookies.putObject('sessionuser', sessionuser);
                
                $state.go('main');
                
            })
            .error(function (data, status, header, config) {
                console.info('Error ' + data + ' ' + status);
            });
        };
        $scope.generateUserOTP = function(){
                UserService.userexists($scope.newUser.contact.mobile).success(function (data, status, headers) {
                    var userExists = data;
                    console.info(userExists);
                    if(userExists){
                        $scope.userExistMessage = "User with mobile " + $scope.newUser.contact.mobile + ' already exists!';    
                    }else{
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
                        $scope.step1 = false;
                        $scope.step2 = true;
                        $scope.enterOTP = false;
                    }
                    //$state.go('main');

                })
                .error(function (data, status, header, config) {
                    console.info('Error ' + data + ' ' + status);
                });
            
        };
            
    }]); 
    exambazaar.controller("categoryController", 
        [ '$scope','$stateParams','$cookies','$state','categories','$rootScope','examList', 'ngMeta', function($scope,$stateParams,$cookies,$state,categories,$rootScope,examList, ngMeta){
        
        $scope.exams = examList.data;
            $scope.categoryName = $stateParams.categoryName;
        if($scope.exams[0].stream){
            $scope.category = $scope.exams[0].stream;
        }
        var examNames = '';
        var examNamesCoaching = '';
        $scope.exams.forEach(function(thisExam, examIndex){
            examNames += thisExam.displayname;
            examNamesCoaching += thisExam.displayname + ' Coaching';
            if(examIndex < $scope.exams.length - 1){
                examNames += ', ';
                examNamesCoaching += ', ';
            }
        });
        
        /*var pageTitle = "Choose the exam you are preparing for within " + $scope.category.displayname;
        var pageDescription = "Study for " + examNames + " at the best coaching institutes across 90 cities of India | Exambazaar - results, fees, faculty, photos, vidoes, reviews of Coaching Institutes in India";
        $rootScope.pageDescription = pageDescription;
        ngMeta.setTitle(pageTitle);
        ngMeta.setTag('description', pageDescription);*/
        
        $rootScope.pageTitle = "Choose exam within " + $scope.category.displayname + " Stream";
        $rootScope.pageDescription = "Study for " + examNames + " at the best coaching institutes across 90 cities of India | Exambazaar - results, fees, faculty, photos, vidoes, reviews of Coaching Institutes in India";
        var streamKeywords = "Exambazaar " + $scope.category.displayname + " Coaching, "+ "Best " + $scope.category.displayname + " Coaching Institutes, " + "Top " + $scope.category.displayname + " Coaching Centre, " + $scope.category.displayname + " Coaching in India, ";
        $rootScope.pageKeywords = "Exambazaar, " + streamKeywords + examNamesCoaching;
            
    }]); 
    exambazaar.controller("landingController", 
        [ '$scope','$stateParams','$cookies','$state','categories','$rootScope','metaService', function($scope,$stateParams,$cookies,$state,categories,$rootScope,metaService){
        
        $scope.number = 24;
        $scope.getNumber = function(num) {
            return new Array(num);   
        }    
            
        $scope.categoryName = $stateParams.categoryName;
        $scope.category = {};
        $scope.subcategory = [];
            
        
        $rootScope.pageTitle = 'Exambazaar: Find best coaching institutes in your city for more than 50 exams';
        $rootScope.pageDescription = "Search and apply to the best coaching institutes and get the education that you deserve. Browse through courses, photos, videos and results for 26000+ institutes in 90+ cities";
        $rootScope.pageKeywords = "Exambazaar, Best Coaching Institutes, Top Coaching Centre, Coaching Reviews, Engineering Coaching, Medical Coaching, CA & CS Coaching, NTSE Coaching, CAT Coaching, CLAT Coaching, SAT GMAT Coaching, IAS Coaching, SSC Coaching, Bank PO Coaching, Defence Coaching";
        
        $scope.goToCity = function(subcategory){ 
            $cookies.putObject('subcategory', subcategory);
            $state.go('city');
        };
            
    }]); 
    exambazaar.controller("cityController", 
        [ '$scope','$stateParams','$cookies','$state','cities','$rootScope','categories','$mdDialog','thisStream','thisExam', 'ngMeta', function($scope,$stateParams,$cookies,$state,cities,$rootScope,categories,$mdDialog,thisStream,thisExam, ngMeta){
        
        $scope.rankedCities = ["Delhi","Mumbai","New Delhi","Ahmedabad","Chennai","Kolkata","Hyderabad","Pune","Bangalore","Chandigarh","Jaipur","Agra","Ajmer","Allahabad","Alwar","Ambala","Amritsar","Bhilwara","Bhopal","Bikaner","Coimbatore","Dehradun","Ganganagar","Ghaziabad","Guwahati","Gwalior","Indore","Juhnjhunu","Kanpur","Kota","Kurukshetra","Lucknow","Ludhiana","Mathura","Meerut","Mohali","Mysore","Nasik","Noida","Patiala","Patna","Rajkot","Rohtak","Roorkee","Shimla","Sikar","Surat","Thrissur","Trivandrum","Vadodara","Vellore","Vishakhapatnam"];
        
        $scope.cities = cities;
        $scope.exam = thisExam.data;
        $scope.category = thisStream.data;
        $scope.categoryName = $stateParams.categoryName;
        $scope.subCategoryName = $stateParams.subCategoryName;
        
        $scope.subcategory = $scope.exam;
        
        
            
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
            
        var cityNames = '';
        var cityNamesCoaching = '';
        $scope.rankedCities.forEach(function(thisCity, cityIndex){
            
            if(cityIndex < 11){
                cityNames += thisCity;
                cityNamesCoaching += "Best " + $scope.subcategory.displayname + " Coaching in " + thisCity;
                if(cityIndex < 10){
                cityNames += ', ';
                cityNamesCoaching += ', ';
                }
            }
        });
        
          
        
        $rootScope.pageTitle = $scope.subcategory.displayname + ": Select city to study";
        $rootScope.pageDescription = "Search for " + $scope.subcategory.displayname + " coaching institutes in " + cityNames + " and 90 other cities in India | Exambazaar - results, fees, faculty, photos, vidoes, reviews of Coaching Institutes in India";
        
        var examKeywords = "Exambazaar " + $scope.subcategory.displayname + " Coaching, "+ "Best " + $scope.subcategory.displayname + " Coaching Institutes, " + "Top " + $scope.subcategory.displayname + " Coaching Centre, " + $scope.subcategory.displayname + " Coaching in India, ";
        $rootScope.pageKeywords = "Exambazaar, " + examKeywords + cityNamesCoaching;
            
    }]);    
    
    exambazaar.controller("coachingController", 
    [ '$scope','$rootScope', 'targetStudyProviderService','targetStudyProvidersList','cities','$state','$stateParams', '$cookies','thisStream','thisExam','streamExams', 'ngMeta','$mdDialog', function($scope,$rootScope, targetStudyProviderService,targetStudyProvidersList,cities,$state,$stateParams, $cookies,thisStream,thisExam,streamExams, ngMeta, $mdDialog){
       
        $mdDialog.hide();
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
        //console.log($scope.subcategory);
        $scope.streamExams = streamExams.data.map(function(a) {return a.name;});
        
        $scope.providersList = targetStudyProvidersList.data;
        $scope.uniqueProviders = [];
        $scope.uniqueInstitutes = [];
        $scope.providersList.forEach(function(thisProvider, providerIndex){
            var position = $scope.uniqueProviders.indexOf(thisProvider.name);
            if(position==-1){
                $scope.uniqueProviders.push(thisProvider.name);
                var newUniqueInstitute = {
                    institutes: [thisProvider],
                    logo: thisProvider.logo,
                    groupName: thisProvider.groupName
                };
                $scope.uniqueInstitutes.push(newUniqueInstitute);
            }else{
                $scope.uniqueInstitutes[position].institutes.push(thisProvider);
            }
        });
        var coursesOffered;
        var groupResults;
        var thisProviderCourses;
        var thisProviderResults;
        
        
        $scope.uniqueInstitutes.forEach(function(thisGroup, index){
            coursesOffered = [];
            groupResults = [];
            thisGroup.institutes.forEach(function(thisProvider, pIndex){
                thisProviderCourses = thisProvider.coursesOffered;
                thisProviderResults = thisProvider.results;
                thisProviderCourses.forEach(function(thisCourse, cIndex){
                    if(coursesOffered.indexOf(thisCourse) == -1){
                        coursesOffered.push(thisCourse);
                    }
                });
                /*if(thisProviderResults){
                    groupResults = groupResults.concat(thisProviderResults);
                }*/
                thisProviderResults.forEach(function(thisResult, rIndex){
                    if(thisResult.exam == $scope.subcategory._id){
                        groupResults.push(thisResult);
                    }
                });
               
                //console.info(coursesOffered);
            });
            thisGroup.coursesOffered = coursesOffered;
            thisGroup.groupResults = groupResults;
        });
        /*$scope.providersList.forEach(function(thisProvider, providerIndex){
            var positionIndex = $scope.uniqueProviders.indexOf(thisProvider.name);
            thisProvider.nCenters = $scope.uniqueInstitutes[positionIndex].length;
            thisProvider.mapAddress = thisProvider.name + ', ' + thisProvider.address + ', ' + thisProvider.city + ' ' + thisProvider.pincode;
            thisProvider.showDetails = false;
            if(providerIndex==0){
                thisProvider.showDetails = true;
            }
        });*/
        //console.log($scope.subcategory);
        $scope.showCoaching = function(provider){
            $scope.providersList.forEach(function(thisProvider, providerIndex){
                thisProvider.showDetails = false;
            });
            provider.showDetails = true;
        };
        $scope.cities = cities;
        
        var coachingGroupNames = '';
        var coachingGroupNamesCity = '';
        var howmany = 25;
        var howmany2 = 10;
        $scope.uniqueProviders.forEach(function(thisProvider, pIndex){
            if(pIndex < howmany){
                coachingGroupNames += thisProvider;
                if(pIndex < howmany - 1){
                    coachingGroupNames += ", ";
                }
            }
            if(pIndex < howmany2){
                coachingGroupNamesCity += thisProvider + " " + $scope.city;
                if(pIndex < howmany2 - 1){
                    coachingGroupNamesCity += ", ";
                }
            }
        });
        
        $scope.setFilter = function(text){
            $scope.searchText = text;
        };
        $scope.clearFilter = function(text){
            $scope.searchText = '';
        };
        
        
        $rootScope.pageTitle = $scope.subcategory.displayname + " Coaching in " + $scope.city;
        $rootScope.pageDescription = "Select from top " + $scope.uniqueInstitutes.length + " " +   $scope.subcategory.displayname + " Coaching Institutes in " + $scope.city + ". Choose from "+ coachingGroupNames + " and " + " many more!" + " | Exambazaar - results, fees, faculty, photos, vidoes, reviews of Coaching Institutes in India";
        
        var coachingKeywords = "Best " + $scope.subcategory.displayname + " Coaching Institutes in " + $scope.city + ", " + "Top " + $scope.uniqueInstitutes.length + " " + $scope.subcategory.displayname + " Coaching Centres in " +$scope.city + ", ";
        $rootScope.pageKeywords = coachingKeywords + coachingGroupNamesCity;
    }]); 
    
    
    
    exambazaar.controller("oldClaimController", 
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
    
        
    
    exambazaar.controller("verifyClaimController", 
    [ '$scope', '$rootScope', 'targetStudyProviderService',  'OTPService','UserService', 'thisProvider', '$state', '$stateParams', '$cookies', '$mdDialog', '$timeout', function($scope, $rootScope, targetStudyProviderService, OTPService, UserService, thisProvider , $state, $stateParams, $cookies, $mdDialog, $timeout){
        $scope.provider = thisProvider.data;
        $scope.currStep = 1;
        if($scope.provider.mobile.length > 0)
            $scope.verifyMobile = $scope.provider.mobile[0];
        $scope.update = function(mobile){
            $scope.verifyMobile = mobile;
            $scope.currStep = 1;
        };
        $scope.enterOTP = [];
        $scope.userPassword ='';
        $scope.verifyPassword ='';
        $scope.sendOTP = function(){
            //var mobile = $scope.verifyMobile;
            var thisOTP = {
                mobile: $scope.verifyMobile,
                otp: generateOtp(),
                reason : 'Claiming ' + $scope.provider._id
            };
            //console.info(JSON.stringify(thisOTP));
            
            OTPService.generateOTP(thisOTP).success(function (data, status, headers) {
                $scope.serverOTP = data.otp;
                $scope.currStep = 2;
            })
            .error(function (data, status, header, config) {
                console.info();
            });
        };
        $scope.incorrectOTP = false;
        $scope.verifyOTP = function(){
            
            
            
            if($scope.enterOTP[0] && $scope.enterOTP[1] && $scope.enterOTP[2] && $scope.enterOTP[3]){
                var enterOTP = $scope.enterOTP[0].toString() + $scope.enterOTP[1].toString() + $scope.enterOTP[2].toString() + $scope.enterOTP[3].toString();
                if(enterOTP == $scope.serverOTP){
                    $scope.currStep = 3;
                    $scope.incorrectOTP = false;
                    console.info('OTP verified');
                }else{
                    $scope.incorrectOTP = true;
                    console.info('OTP incorrect');
                    $scope.currStep = 2;
                }
            }
        };
        $scope.updateUserPassword = function(userPassword){
            $scope.userPassword = userPassword;
        };
        $scope.updateVerifyPassword = function(verifyPassword){
            $scope.verifyPassword = verifyPassword;
        };
        $scope.createProvider = function(){
            
            var instituteId = $scope.provider._id;
            var mobile = $scope.verifyMobile;
            var userPassword = $scope.userPassword;
            var verifyPassword = $scope.verifyPassword;
            
            if(userPassword == verifyPassword){
                $scope.newUser = {
                    partner: $scope.provider._id,
                    userType: 'Partner',
                    verified: true,
                    contact: {
                        mobile: mobile,
                    },
                    password: $scope.userPassword
                };
                var saveUser = UserService.saveUser($scope.newUser).success(function (data, status, headers) {
                    var fulluser = data;
                    
                    var sessionuser = {
                        userId: fulluser._id,
                        masterId: fulluser._id,
                        facebookId: fulluser.facebookId,
                        userType: fulluser.userType,
                        basic: fulluser.basic,
                        image: fulluser.image,
                        mobile: fulluser.mobile,
                        email: fulluser.email,
                        
                    };
                    if(sessionuser.userType == 'Partner'){
                        sessionuser.partner = fulluser.partner;
                    }
                    $cookies.putObject('sessionuser', sessionuser);
                    
                    $state.go('partner-dashboard', {userId: sessionuser.userId});

                })
                .error(function (data, status, header, config) {
                    console.info('Error ' + data + ' ' + status);
                });
            }
            
        };
        
        $scope.$watch('enterOTP[3]', function (newValue, oldValue, scope) {
            //Do anything with $scope.letters
            if(newValue != null){
                $scope.verifyOTP();
            }
            
        }, true);
    }]);  
    
   
    exambazaar.controller("showGroupController", 
    [ '$scope','$rootScope', 'targetStudyProviderService', 'thisGroup', 'thisStream', 'thisExam', 'streamList', 'examList', '$state','$stateParams', '$cookies', 'UserService', '$mdDialog', 'ngMeta', 'viewService', function($scope,$rootScope, targetStudyProviderService,thisGroup, thisStream, thisExam, streamList, examList,$state,$stateParams, $cookies, UserService, $mdDialog, ngMeta, viewService){
        $scope.exam = thisExam.data;
        $scope.category = thisStream.data;
        $scope.categoryName = $stateParams.categoryName;
        $scope.subCategoryName = $stateParams.subCategoryName;
        $scope.subcategory = $scope.exam;
        $scope.city = $stateParams.cityName; 
        $scope.allExams = examList.data;
        $scope.allStreams = streamList.data;
        $scope.playerVars = {
            controls: 1,
            showinfo: 0
        };
        //console.log($scope.allExams);
        if($cookies.getObject('sessionuser')){
            $scope.user = $cookies.getObject('sessionuser');
            /*var viewForm = {
                institute: $scope.provider._id,
                user: $scope.user.userId,
                claim: true
            };
            if($cookies.getObject('ip')){
                var ip = $cookies.getObject('ip');
                viewForm.ip = ip;
            }
            viewService.saveview(viewForm).success(function (data, status, headers) {
                //console.info('View Marked');
            })
            .error(function (data, status, header, config) {
                console.info();
            });*/
            UserService.getUserShortlisted($scope.user.userId).success(function (data, status, headers) {
                var shortlistedIds = data.map(function(a) {return a._id;});
                if(shortlistedIds.indexOf($scope.provider._id) != -1){
                    $scope.shortlisted = true;
                }
                //console.info(data);
            })
            .error(function (data, status, header, config) {
                console.info('Shortlist Error' + status + " " + data);    
            }); 
            
            /*if($scope.user.userType=='Master'){
                $scope.editable = true;
                $scope.verifiedUser = true;
                $scope.ebuser = true;
            }
            if($scope.user.userType=='Intern - Business Development'){
                $scope.editable = true;
                $scope.verifiedUser = true;
                $scope.ebuser = true;
                //$scope.showClaimDialog();
            }
            if($scope.user.userType=='Partner'){
                $scope.verifiedUser = true;
                $scope.ebuser = false;
                if($scope.user.partner.indexOf($scope.provider._id) != -1){
                    if(!$scope.provider.primaryManagement || $scope.provider.primaryManagement.name =='' || $scope.provider.primaryManagement.mobile ==''){
                        
                        $scope.editable = false;
                        $scope.showAddPrimaryManagement();
                    }else{
                        $scope.editable = true;
                    }
                    
                    
                    
                }else{
                    $scope.editable = false;
                    $scope.showUnauthorizedAccess();
                    
                }
                
            }*/
        }else{
            
            $scope.signupNeeded = true;
            //user is not allowed to access this page
            /*var viewForm = {
                institute: $scope.provider._id,
                claim: true
            };
            if($cookies.getObject('ip')){
                var ip = $cookies.getObject('ip');
                viewForm.ip = ip;
            }
            viewService.saveview(viewForm).success(function (data, status, headers) {
                console.info('View Marked');
            })
            .error(function (data, status, header, config) {
                console.info();
            });*/
        }
        
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
            'GENERAL',    
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
        
        
        $scope.group = thisGroup.data;
        var groupDisabled = $scope.group.map(function(a) {return a.disabled;});
        console.log(groupDisabled);
        $scope.provider = {
            name: $stateParams.groupName,
            city: $stateParams.cityName
        };
        $scope.groupExams = [];
        $scope.groupStreams = [];
        $scope.groupPhotos = [];
        $scope.groupVideos = [];
        $scope.groupResults = [];
        $scope.groupCourses = [];
        $scope.groupFaculties = [];
        var groupExamIds = [];
        var groupStreamIds = [];
        var examTitle = ' for ';       
        $scope.group.forEach(function(thisGroup, index){
            if(thisGroup.latlng){
                thisGroup.mapAddress = [thisGroup.latlng.lat, thisGroup.latlng.lng];
                //console.log(thisGroup.mapAddress);
            }
            if(thisGroup.logo){
                $scope.provider.logo = thisGroup.logo;
            }
            var thisGroupExams = thisGroup.exams;
            thisGroupExams.forEach(function(thisExam, index){
                groupExamIds = $scope.groupExams.map(function(a) {return a.exam._id;});
                var eIndex = groupExamIds.indexOf(thisExam._id);
                
                if(eIndex == -1){
                    var newGroupExam = {
                        exam: thisExam,
                        centre: [thisGroup]
                    };
                    var thisStream = thisExam.stream;
                    groupStreamIds = $scope.groupStreams.map(function(a) {return a._id;});
                    if(groupStreamIds.indexOf(thisStream._id) == -1){ $scope.groupStreams.push(thisStream);
                    }
                    $scope.groupExams.push(newGroupExam);
                }else{
                    var groupExam = $scope.groupExams[eIndex];
                    groupExam.centre.push(thisGroup);
                }
            });
            var thisGroupPhoto = thisGroup.photo;
            var thisGroupResults = thisGroup.results;
            var thisGroupVideo = thisGroup.video;
            var thisGroupFaculty = thisGroup.faculty;
            var thisGroupCourse = thisGroup.course;
            $scope.groupPhotos = $scope.groupPhotos.concat(thisGroupPhoto);
            $scope.groupVideos = $scope.groupVideos.concat(thisGroupVideo);
            $scope.groupFaculties = $scope.groupFaculties.concat(thisGroupFaculty);
            $scope.groupResults = $scope.groupResults.concat(thisGroupResults);
            $scope.groupCourses = $scope.groupCourses.concat(thisGroupCourse);
        });
        
        $scope.groupExamsOnly = $scope.groupExams.map(function(a) {return a.exam;});
        //console.info($scope.groupResults);
        
        $scope.showPhotoDialog = function(ev,index) {
            $scope.activePhotoIndex = index;
            $scope.activePhoto = $scope.groupPhotos[index];
            var indexPair = startEndIndex(index, $scope.groupPhotos.length);
            $scope.startPhotoIndex = indexPair.start;
            $scope.endPhotoIndex = indexPair.end;
            
            $mdDialog.show({
              contentElement: '#photoDialog',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true
            });
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
            $scope.changePhotoImage(index);
        };
         $scope.nextPhoto = function(){
            var index = $scope.activePhotoIndex + 1;
            $scope.changePhotoImage(index);
        };
        $scope.changePhotoImage = function(index){
            var arrayLength = $scope.groupPhotos.length;
            if(index >=0 && index < arrayLength){
                $scope.activePhotoIndex = index;
                $scope.activePhoto = $scope.groupPhotos[index];
                var indexPair = startEndIndex(index, $scope.groupPhotos.length);
                //console.info(JSON.stringify(indexPair));
                $scope.startPhotoIndex = indexPair.start;
                $scope.endPhotoIndex = indexPair.end;
            }
            
        };
        $scope.showFacultyDialog = function(ev,index) {
            $scope.activeFacultyIndex = index;
            $scope.activeFaculty = $scope.groupFaculties[index];
            var indexPair = startEndIndex(index, $scope.groupFaculties.length);
            $scope.startFacultyIndex = indexPair.start;
            $scope.endFacultyIndex = indexPair.end;
            
            $mdDialog.show({
              contentElement: '#facultyDialog',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true
            });
        };
        $scope.prevFaculty = function(){
            var index = $scope.activeFacultyIndex - 1;
            $scope.changeFacultyImage(index);
        };
         $scope.nextFaculty = function(){
            var index = $scope.activeFacultyIndex + 1;
            $scope.changeFacultyImage(index);
        };
        $scope.changeFacultyImage = function(index){
            var arrayLength = $scope.groupFaculties.length;
            if(index >=0 && index < arrayLength){
                $scope.activeFacultyIndex = index;
                $scope.activeFaculty = $scope.groupFaculties[index];
                var indexPair = startEndIndex(index,$scope.groupFaculties.length);
                $scope.startFacultyIndex = indexPair.start;
                $scope.endFacultyIndex = indexPair.end;
            }
            
        };
        
        $scope.showResultDialog = function(ev, index, examResult) {
            $scope.activeResultIndex = index;
            $scope.activeResult = $scope.groupResults[index];
            var indexPair = startEndIndex(index, $scope.groupResults.length);
            
            $scope.startResultIndex = indexPair.start;
            $scope.endResultIndex = indexPair.end;
            $scope.dialogExamResult = examResult;
            
            $mdDialog.show({
              contentElement: '#resultsDialog',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true
            });
        };
        
        $scope.prevResult = function(){
            var index = $scope.activeResultIndex - 1;
            $scope.changeResultImage(index);
        };
         $scope.nextResult = function(){
            var index = $scope.activeResultIndex + 1;
            $scope.changeResultImage(index);
        };
        $scope.changeResultImage = function(index){
            var arrayLength = $scope.groupResults.length
            if(index >=0 && index < arrayLength){
                $scope.activeResultIndex = index;
                $scope.activeResult = $scope.groupResults[index];
                var indexPair = startEndIndex(index,$scope.groupResults.length);
                $scope.startResultIndex = indexPair.start;
                $scope.endResultIndex = indexPair.end;
            }
        };
        
        
        var instituteIds = $scope.group.map(function(a) {return a._id;});
        console.log(instituteIds);
        $scope.user = $cookies.getObject('sessionuser');
        var viewForm = {
            institutes: instituteIds,
            //user: $scope.user.userId,
            claim: false
        };
        if($scope.user && $scope.user.userId){
            viewForm.user = $scope.user.userId
        }
        //console.log(JSON.stringify(viewForm));
        if($cookies.getObject('ip')){
            var ip = $cookies.getObject('ip');
            viewForm.ip = ip;
        }
        viewService.saveview(viewForm).success(function (data, status, headers) {
            //console.info('View Marked');
        })
        .error(function (data, status, header, config) {
            console.info();
        });
        
        
        
        var examNamesKeywords = "";
        
        $scope.groupExams.forEach(function(thisExam, index){
            
            examNamesKeywords += $stateParams.groupName + " " + $stateParams.cityName + " for " + thisExam.exam.displayname;
            if(index < $scope.groupExams.length - 1){
                examNamesKeywords += ", ";
            }
        });
        
        $rootScope.pageTitle = $stateParams.groupName + ' in ' + $stateParams.cityName + ' for ' + $stateParams.subCategoryName;
        $rootScope.pageDescription = $stateParams.groupName + ", " +$scope.city +  " has " + $scope.group.length + " " +   $scope.subcategory.displayname + " Coaching Centers in " + $scope.city + ". | Exambazaar - results, fees, faculty, photos, vidoes, reviews of " + $stateParams.groupName;
        
        var groupKeywords = "Top " + $stateParams.subCategoryName + " Coaching in " + $stateParams.cityName + ", " + $stateParams.groupName + ' in ' + $stateParams.cityName + ' for ' + $stateParams.subCategoryName + ", " + $scope.group.length + " " + $stateParams.groupName + " Centers in " + $scope.city + ", ";
        $rootScope.pageKeywords = groupKeywords + examNamesKeywords;
    }]);    
           
   
    exambazaar.controller("claimController", 
    [ '$scope', '$rootScope', 'targetStudyProviderService', 'ImageService', 'LocationService', 'OTPService','UserService', 'cisavedService', 'tofillciService', 'viewService', 'ipService', 'Upload', 'thisProvider', 'imageMediaTagList', 'videoMediaTagList', 'examList', 'streamList', 'cisavedUsersList' , '$state', '$stateParams', '$cookies', '$mdDialog', '$timeout', 'toverifyciService', 'ngMeta', 'thisGroupInfo', 'addContactInfoService', function($scope,$rootScope, targetStudyProviderService, ImageService, LocationService, OTPService, UserService, cisavedService, tofillciService, viewService, ipService, Upload, thisProvider, imageMediaTagList, videoMediaTagList,  examList,streamList, cisavedUsersList , $state,$stateParams, $cookies,$mdDialog, $timeout, toverifyciService, ngMeta, thisGroupInfo, addContactInfoService){
        $scope.imageTags = imageMediaTagList.data.mediaTypeTags;
        $scope.imageTypes = imageMediaTagList.data.distinctTypes;
        $scope.videoTags = videoMediaTagList.data.mediaTypeTags;
        $scope.videoTypes = videoMediaTagList.data.distinctTypes;
        
        
        
        /*console.info($scope.videoTags);
        console.info($scope.videoTypes);*/
        
        $scope.resultSet = [
        ];
        $scope.showHeaderLogin = function() {
            $rootScope.$emit("CallShowLogin", {});
        };
        //OTP Related Functions
        
        
        
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
            $scope.verificationMobile = mobile;
            //mobile ='9829685919';
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
                $scope.createUserBool = true;
                $scope.verifyStep = 3;
                
            }else{
                alert('You have entered an incorrect OTP.');
            }
        };
        
        
        $scope.$watch('[provider.address, provider.city]', function (newValue, oldValue, scope) {
            if(newValue != null && newValue[0] != '' && newValue[1] != ''){
                //console.info(newValue);
                var address = newValue[0];
                var city = newValue[0];
                
                $timeout(function() {
                    
                    GMaps.geocode({
                    address: address + ", " + city,
                    callback: function(results, status) {

                        if (status == 'OK') {
                           
                            var latlng = {
                                lat: results[0].geometry.location.lat(),
                                lng: results[0].geometry.location.lng()
                            };
                            
                            if(!$scope.provider.latlng || $scope.provider.latlng.lat != latlng.lat || $scope.provider.latlng.lng != latlng.lng){
                                $scope.editLocation = true; 
                                $scope.provider.latlng = latlng;
                                console.log($scope.provider.latlng);
                            }
                            
                            
                        }else{
                            //console.log(status + ' ' + $scope.provider._id);

                            if(status == 'ZERO_RESULTS'){
                            $scope.provider.latlngna = true; 
                            }
                        }

                    }
                });  
                    
                    
                    
                }, 250);
            }

            }, true);
        
        $scope.markLatlng = function(){
            GMaps.geocode({
                address: $scope.provider.address + ", " + $scope.provider.city,
                callback: function(results, status) {
                    
                    if (status == 'OK') {
                        console.log(results[0].geometry.location.lat());
                        $scope.provider.latlng = {
                            lat: results[0].geometry.location.lat(),
                            lng: results[0].geometry.location.lng()
                        };
                        $scope.showLatLngDialog();
                        //console.log($scope.provider.latlng);
                    }else{
                        console.log(status + ' ' + $scope.provider._id);
                        $scope.showNoLatLngDialog();
                        if(status == 'ZERO_RESULTS'){
                        $scope.provider.latlngna = true; 
                        
                        }
                    }

                }
            });  
            
        };
        
        /*$scope.createUser = function(){
            $scope.newUser = {
                userType: 'Partner',
                verified: true,
                contact: {
                    mobile: $scope.verificationMobile,
                    email: $scope.claimemail
                },
                basic: {
                    name: $scope.claimName,
                },
                password: $scope.password
            };
            $scope.newUser.userType = 'Partner';
            $scope.newUser.verified = true;
            var saveUser = UserService.saveUser($scope.newUser).success(function (data, status, headers) {
                var fulluser = data;

                var sessionuser = {
                    userId: fulluser._id,
                    masterId: fulluser._id,
                    userType: fulluser.userType,
                    basic: fulluser.basic,
                    image: fulluser.image,
                    mobile: fulluser.mobile,
                    email: fulluser.email,
                    
                };
                $cookies.putObject('sessionuser', sessionuser);

                $state.go('main');

            })
            .error(function (data, status, header, config) {
                console.info('Error ' + data + ' ' + status);
            });
            
        };*/
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
            'GENERAL',    
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
        $scope.ebVerifyStates = ["Verified", "No Response", "Does not Exist", "Not Verified"];
        
        $scope.provider = thisProvider.data;
        $scope.thisGroupInfo = thisGroupInfo.data;
        //console.log($scope.thisGroupInfo);
        $scope.verifyClaim = function(){
            
            $state.go('verifyClaim', {coachingId: $scope.provider._id});
        };
        $scope.cisavedUsersList = cisavedUsersList.data;
        //console.log($scope.cisavedUsersList);
        $scope.showClaimDialog = function(ev) {
            $mdDialog.show({
              contentElement: '#claimDialog',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: false
            });
        };
        
        $scope.shortlisted = false;
        
        $scope.showDisabled = function(ev) {
            $mdDialog.show({
              contentElement: '#disabledDialog',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: false
            });
        };
        
        
        $scope.disabled = $scope.provider.disabled;
        
        if($scope.disabled){
            $scope.showDisabled();
        }
        
        $scope.editable = false;
        $scope.verifiedUser = false;
        $scope.ebuser = false;
        $scope.masteruser = false;
        $scope.showAddPrimaryManagement = function(ev) {
            $mdDialog.show({
              contentElement: '#addPrimaryManagementDialog',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: false
            });
        };
        $scope.showUnauthorizedAccess = function(ev) {
            $mdDialog.show({
              contentElement: '#unauthorizedAccessDialog',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: false
            });
        };
        
        if($cookies.getObject('sessionuser')){
            $scope.user = $cookies.getObject('sessionuser');
            var viewForm = {
                institutes: [$scope.provider._id],
                user: $scope.user.userId,
                claim: true
            };
            if($cookies.getObject('ip')){
                var ip = $cookies.getObject('ip');
                viewForm.ip = ip;
            }
            viewService.saveview(viewForm).success(function (data, status, headers) {
                //console.info('View Marked');
            })
            .error(function (data, status, header, config) {
                console.info();
            });
            UserService.getUserShortlisted($scope.user.userId).success(function (data, status, headers) {
                var shortlistedIds = data.map(function(a) {return a._id;});
                if(shortlistedIds.indexOf($scope.provider._id) != -1){
                    $scope.shortlisted = true;
                }
                //console.info(data);
            })
            .error(function (data, status, header, config) {
                console.info('Shortlist Error' + status + " " + data);    
            }); 
            
            if($scope.user.userType=='Master'){
                $scope.editable = true;
                $scope.verifiedUser = true;
                $scope.ebuser = true;
                $scope.masteruser = true;
            }
            if($scope.user.userType=='Intern - Business Development'){
                $scope.editable = true;
                $scope.verifiedUser = true;
                $scope.ebuser = true;
                //$scope.showClaimDialog();
            }
            if($scope.user.userType=='Partner'){
                $scope.verifiedUser = true;
                $scope.ebuser = false;
                if($scope.user.partner.indexOf($scope.provider._id) != -1){
                    if(!$scope.provider.primaryManagement || $scope.provider.primaryManagement.name =='' || $scope.provider.primaryManagement.mobile ==''){
                        
                        $scope.editable = false;
                        $scope.showAddPrimaryManagement();
                    }else{
                        $scope.editable = true;
                    }
                    
                    
                    
                }else{
                    $scope.editable = false;
                    $scope.showUnauthorizedAccess();
                    
                }
                
            }
        }else{
            //user is not allowed to access this page
            var viewForm = {
                institutes: [$scope.provider._id],
                claim: true
            };
            if($cookies.getObject('ip')){
                var ip = $cookies.getObject('ip');
                viewForm.ip = ip;
            }
            viewService.saveview(viewForm).success(function (data, status, headers) {
                console.info('View Marked');
            })
            .error(function (data, status, header, config) {
                console.info();
            });
            $scope.showClaimDialog();
        }
        
        
        $scope.markPrimaryManagement = function(){
            $state.go('partner-dashboard', {userId: $scope.user.userId});
        };
        
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
        $scope.streamIds=[];
        $scope.streams=[];
        $scope.provider.exams.forEach(function(thisExam, index){
            if($scope.streamIds.indexOf(thisExam.stream._id)==-1){
                $scope.streamIds.push(thisExam.stream._id);
                $scope.streams.push(thisExam.stream);
            }
        });
        $scope.providerExamIds = $scope.provider.exams.map(function(a) {return a._id;});
        $scope.editExam = false;
        
        $scope.setEBVerifyState = function(verifyState){
            //$scope.editExam = true;
            if($scope.editable){
                $scope.provider.ebVerifyState = verifyState;
                var ebVerfiyForm = {
                    provider: $scope.provider._id,
                    state: verifyState,
                    user: $scope.user.userId
                };
                //console.info(ebVerfiyForm);
                targetStudyProviderService.setEBVerifyState(ebVerfiyForm).success(function (data, status, headers) {
                    
                    var toverifyciForm = {
                        institute: $scope.provider._id
                    };
                    //GHI
                    $scope.verifiedStateMarked = verifyState;
                    console.log(toverifyciForm);
                    toverifyciService.markDone(toverifyciForm)
                    .success( function (data, status, headers) {
                        $scope.showVerifiedDoneDialog();
                        $state.reload();
                    })
                    .error(function (data, status, header, config) {
                        console.info("Error ");
                    });
                    
                })
                .error(function (data, status, header, config) {
                    console.info("Error");
                });
            }else{
                alert('Cannot Edit without logging in or verifying identity');
                $scope.showClaimDialog();
            }
        };
        
        $scope.contactInfoStates = ["Found & Added", "Website not found"];
        $scope.setEBContactInfoState = function(contactInfoState){
            //$scope.editExam = true;
            if($scope.editable){
                $scope.provider.addContactInfoDone = true;
                var contactInfoForm = {
                    provider: $scope.provider._id,
                    contactInfoState: contactInfoState,
                    user: $scope.user.userId
                };
                console.info(contactInfoForm);
                targetStudyProviderService.setEBContactInfoState(contactInfoForm).success(function (data, status, headers) {
                    
                    var addContactInfoForm = {
                        institute: $scope.provider._id
                    };
                    addContactInfoService.markDone(addContactInfoForm)
                    .success( function (data, status, headers) {
                        $scope.showContactInfoAddedDialog();
                        $state.reload();
                    })
                    .error(function (data, status, header, config) {
                        console.info("Error ");
                    });
                    
                })
                .error(function (data, status, header, config) {
                    console.info("Error");
                });
            }else{
                alert('Cannot Edit without logging in or verifying identity');
                $scope.showClaimDialog();
            }
        };
        
        $scope.showDisableConfirm = function(provider, ev) {
        
            var confirm = $mdDialog.confirm()
                .title('Would you like to diable ' + provider.name + '?')
                .textContent('Address: ' + provider.address + ', ' + provider.city + '!')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .clickOutsideToClose(true)
                .ok('Confirm')
                .cancel('Cancel');
                $mdDialog.show(confirm).then(function() {
                    $scope.disableProvider(provider);
                    $state.reload();
                }, function() {
                  //nothing
                });
            
        };
        
        $scope.disableProvider = function(provider){
            if(provider._id){
                var instituteIds = [provider._id];
                var disableForm = {
                    instituteIds: instituteIds,
                    user: $scope.user.userId
                };
                targetStudyProviderService.bulkDisableProviders(disableForm).success(function (data, status, headers) {
                    $scope.showSavedDialog();
                })
                .error(function (data, status, header, config) {
                    console.info("Error ");
                });
            }
        };
        
        $scope.addExam = function(exam){
            //$scope.editExam = true;
            if($scope.editable){
            if($scope.provider.exams.indexOf(exam) == -1){
                $scope.provider.exams.push(exam);
                $scope.providerExamIds = $scope.provider.exams.map(function(a) {return a._id;});
                $scope.saveProvider();
            }
            }else{
                alert('Cannot Edit without logging in or verifying identity');
                $scope.showClaimDialog();
            }
        };
        $scope.modes=[
            'Class Room', 'Online Classes', 'Test Series', 'Distance Education', 'Satellite Classes', 'Weekend Classroom'
        ];
        $scope.durations=[
            '1 Month','2 Months','3 Months', '4 Months', '5 Months', '6 Months', '9 Months', '1 Year', '2 Year','3 Year', '4 Year'  
        ];
        $scope.feeTypes = [
            'In Lumpsum',    
            'In Installments',        
        ];
        $scope.editContact = false;
        $scope.editContacts= function(){
            $scope.editContact = true;
        };
        $scope.preAddPhoneLength = $scope.provider.phone.length;
        $scope.addPhone = function(){
            $scope.provider.phone.push('');
        };
        
        $scope.shortlistInstitute = function(){
            if($scope.user.userId){
                var shortListForm = {
                    userId: $scope.user.userId,
                    instituteId: $scope.provider._id
                };
                UserService.shortlistInstitute(shortListForm).success(function (data, status, headers) {
                    console.info('Institute Shortlisted');
                    $state.reload();
                })
                .error(function (data, status, header, config) {
                    console.log('Shortlist error: ' + status + " " + data);    
                });  
            }
              
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
        
        $scope.showSpreadsheetConfirm = function(ev) {
            var spreadSheetEdited = false;
            $scope.examPivotResults.forEach(function(thisExamResult, index){
                
                if(thisExamResult.pivot !='null'){
                    //console.info(JSON.stringify(thisExamResult));
                    //console.info('--' + thisExamResult.result.length + ' ' + thisExamResult.initialLength);
                    if(thisExamResult.result.length != thisExamResult.initialLength + 1){
                        spreadSheetEdited = true;
                    }
                }
            }); 
            if(spreadSheetEdited){ 
                var confirm = $mdDialog.confirm()
                .title('Do you not want to save the changes in Results?')
                .textContent('You will not be able to recover the changes you have made!')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .clickOutsideToClose(true)
                .ok('I will do it later!')
                .cancel('Cancel');
                $mdDialog.show(confirm).then(function() {
                  $scope.editResult = false;
                }, function() {
                  //nothing
                }); 
            }else{
                $scope.editResult = false;
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
        $scope.addEmailSuggestion = function(emailId){
            var emailExists = false;
            $scope.provider.email.forEach(function(thisEmail, eindex){
                if(thisEmail == emailId){
                    emailExists = true;
                }
            });
            if(!emailExists){
                $scope.provider.email.push(emailId);
            }else{
                console.log('Email Exists');
            }
            
        };
        $scope.addWebsiteSuggestion = function(website){
            var websiteExists = false;
            $scope.provider.website.forEach(function(thisWebsite, eindex){
                if(thisWebsite == website){
                    websiteExists = true;
                }
            });
            if(!websiteExists){
                $scope.provider.website.push(website);
            }else{
                console.log('Website Exists');
            }
            
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
        
        $scope.addWebsite = function(){
            $scope.provider.website.push('');
        };
        $scope.showDeleteWebsiteConfirm = function(ev) {
        var len = $scope.provider.website.length;
            if(len > 0){
                var lastWebsite = $scope.provider.website[len-1];
                if(lastWebsite == ''){
                    $scope.provider.website.pop();
                }else{
                    var confirm = $mdDialog.confirm()
                        .title('Would you like to delete ' + lastWebsite + '?')
                        .textContent('You will not be able to recover it after deleting!')
                        .ariaLabel('Lucky day')
                        .targetEvent(ev)
                        .clickOutsideToClose(true)
                        .ok('Confirm')
                        .cancel('Cancel');
                        $mdDialog.show(confirm).then(function() {
                          $scope.provider.website.pop();
                        }, function() {
                          //nothing
                        });
                    }
                }
        };
        /*if(!$scope.provider.otherlistings){
            $scope.provider.otherlistings=[];
            $scope.provider.otherlistings.push('');
        }*/
        
        $scope.addOtherListings = function(){
            if(!$scope.provider.otherlistings){
                $scope.provider.otherlistings=[];
            }
            $scope.provider.otherlistings.push('');
        };
        $scope.showDeleteOtherListingsConfirm = function(ev) {
        var len = $scope.provider.otherlistings.length;
            if(len > 0){
                var lastOtherlistings = $scope.provider.otherlistings[len-1];
                if(lastOtherlistings == ''){
                    $scope.provider.otherlistings.pop();
                }else{
                    var confirm = $mdDialog.confirm()
                        .title('Would you like to delete ' + lastOtherlistings + '?')
                        .textContent('You will not be able to recover it after deleting!')
                        .ariaLabel('Lucky day')
                        .targetEvent(ev)
                        .clickOutsideToClose(true)
                        .ok('Confirm')
                        .cancel('Cancel');
                        $mdDialog.show(confirm).then(function() {
                          $scope.provider.otherlistings.pop();
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
        $scope.setFeeType = function(course, feeType){
            course.feeType = feeType;    
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
                if(!course._id && course.name == thisCourse.name){
                    spliceIndex = index;
                }
            });
            if(spliceIndex != -1){
                $scope.provider.course.splice(spliceIndex, 1);
                //$scope.saveProvider();  
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
                fees: '',
                idealFor:'',
                mode: ''
            };
            $scope.provider.course.push(newCourse);
            console.info(JSON.stringify($scope.provider.course));
            
        };
        $scope.removeExam = function(exam){
            //$scope.editExam = true;
            if($scope.editable){
                var examIndex = -1;
                $scope.provider.exams.forEach(function(thisExam, index){
                    if(thisExam._id == exam._id){
                        examIndex = index;
                    }
                });
                if(examIndex != -1){
                    $scope.provider.exams.splice(examIndex, 1);
                    $scope.providerExamIds = $scope.provider.exams.map(function(a) {return a._id;});
                    $scope.saveProvider();
                }
            }else{
                alert('Cannot Edit without logging in or verifying identity');
                $scope.showClaimDialog();
            }
            
        };
        
        $scope.deleteFaculty = function(faculty){
            faculty.active = false;
            $scope.provider.faculty.forEach( function(thisFaculty, index){
                if(thisFaculty._id == faculty._id){
                    $scope.provider.faculty.splice(index, 1);
                }
            });
            //$scope.saveProvider();
        };
        $scope.playerVars = {
            controls: 1,
            showinfo: 0
        };
        $scope.deleteVideo = function(video){
            video.active = false;
            $scope.provider.video.forEach( function(thisVideo, index){
                if(thisVideo._id == video._id){
                    $scope.provider.video.splice(index, 1);
                }
            });
            //$scope.saveProvider();
        };
        
        $scope.deletePhoto = function(photo){
            photo.active = false;
            
            $scope.provider.photo.forEach( function(thisPhoto, index){
                if(thisPhoto._id == photo._id){
                    $scope.provider.photo.splice(index, 1);
                }
            });
            //$scope.saveProvider();
        };
        $scope.deleteResultPhoto = function(examResult, photo){
            
            examResult.newresultphotos.forEach( function(thisPhoto, index){
                if(thisPhoto.link == photo.link){
                    examResult.newresultphotos.splice(index, 1);
                }
            });
            //$scope.saveProvider();
        };
        $scope.saveProvider = function(){
            //console.info($scope.provider);
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
        
        $scope.provider.results.forEach(function(thisResult, resultIndex){
            
        });
        
        $scope.provider.results.forEach(function(thisResult, resultIndex){
            
            var addPic = "<button class='btn-primary editFont' ng-controller='claimController' ng-click='popHi()' >Add Pic</button>";
            //thisResult.imageShow = "<img src='" + thisResult.image + "' width='100'>" + addPic;
            thisResult.imageShow = addPic;
            
            //ngf-select='uploadResultPic(newResultPic, examResult.result)' ng-model='newResultPic' ngf-accept=''image/*''
            
            
                                
            
        });
        
        $scope.editResult = false;
        $scope.editResults= function(){
            $scope.editResult = true;
        };
        $scope.unEditResults= function(){
            $scope.examPivotResults.forEach(function(thisExamResult, index){
                 
                if(thisExamResult.result.lenth != thisExamResult.initialLength){
                    spreadSheetEdited = true;
                    
                }
            });
            
            $scope.editResult = false;
        };
        $scope.resultHelper = function(pivot, pivotValPreset){
            var lenPivotVal = pivotValPreset.length;
            var counter = 0;
            var nLength = $scope.provider.results.length;
            var pivotVals = pivotValPreset;
            pivotVals.push('null');
            var pivotResult = [];
            pivotVals.forEach(function(thisPivotVal, pivotValIndex){
                var newpivotResult = {
                    pivot: thisPivotVal,
                    result: []
                };
                
                if(pivot =='exam'){
                    var eIndex = $scope.providerExamIds.indexOf(thisPivotVal);
                    //console.log(eIndex);
                    if(eIndex !=-1){
                        newpivotResult.exam = $scope.provider.exams[eIndex];
                    }
                    
                }
                pivotResult.push(newpivotResult);
            });
            
            $scope.provider.results.forEach(function(thisResult, resultIndex){
                
                var pivotIndex = pivotVals.indexOf(thisResult[pivot]._id);
                if(thisResult[pivot] && pivotIndex == -1){
                    pivotVals.push(thisResult[pivot]);
                    var newpivotResult = {
                        pivot: thisResult[pivot],
                        result: [thisResult]
                    };
                    pivotResult.push(newpivotResult);
                }else{
                    if(!thisResult[pivot]){
                        console.info('Pivot not set');
                        pivotResult[lenPivotVal].result.push(thisResult);
                    }else{                              
                        pivotResult[pivotIndex].result.push(thisResult);
                    }    
                }
                counter = counter + 1;
                if(counter == nLength){
                    pivotResult.forEach(function(thisPivotResult, pivotIndex){
                        thisPivotResult.initialLength = thisPivotResult.result.length;
                    });
                    $scope.pivotResult = pivotResult;
                }
            });
            if(nLength == 0){
                    pivotResult.forEach(function(thisPivotResult, pivotIndex){
                        thisPivotResult.initialLength = 0;
                    });
                    $scope.pivotResult = pivotResult;
            }
        };
        $scope.resultPicHelper = function(){
            var counter = 0;
            var nResults = $scope.provider.results.length;
            var resultWithImages = [];
            var examArray = [];
            $scope.provider.results.forEach( function (thisResult, resultIndex){
                var exam;
                counter = counter + 1;
                if(thisResult.exam){
                    exam = thisResult.exam._id || thisResult.exam;
                    if(thisResult.image){
                        var examIndex = examArray.indexOf(exam);
                        if(examIndex == -1){
                            examArray.push(exam);
                            var newResultExamPair = {
                                exam: exam,
                                result: [thisResult]
                            }
                            resultWithImages.push(newResultExamPair);
                        }else{
                            resultWithImages[examIndex].result.push(thisResult);
                            
                        }
                    
                    }else{
                        //No image. Ignore this.
                    }
                    
                    
                }else{
                    exam='';
                }
                if(counter == nResults){
                    
                    $scope.resultWithImages = resultWithImages;
                    //console.info(resultWithImages);
                }
            });  
        };
        
        $scope.resultPicHelper();
        $scope.examWiseResult = [];
        $scope.resultSortExamYear = function(){
            var counter = 0;
            var nLength = $scope.provider.results.length;
            var examPivot = $scope.provider.exams;
            var yearPivot = $scope.resultYears;
            var examWiseResult = [];
            examPivot.forEach(function(thisExam, examIndex){
                var thisExamResult = {
                    exam: thisExam._id,
                    yearResult: []
                };
                yearPivot.forEach(function(thisYear, yearIndex){
                    var newResultSet = {
                        year: thisYear,
                        result: []
                    };
                    thisExamResult.yearResult.push(newResultSet);
                });
                examWiseResult.push(thisExamResult);
                //console.log('Here ' + JSON.stringify(examWiseResult));
            });
            $scope.provider.results.forEach(function(thisResult, resultIndex){
                var year = thisResult.year;
                var exam;
                if(thisResult.exam){
                    exam = thisResult.exam._id || thisResult.exam;   
                }else{
                    exam='';
                }
                 
                counter = counter + 1;
                var yearResult=[];
                examWiseResult.forEach(function(thisExamResult, examResultIndex){
                    if(thisExamResult.exam == exam){
                     yearResult = thisExamResult.yearResult;
                    //console.info(yearResult);
                    yearResult.forEach(function(thisYearResult, yearResultIndex){
                        if(thisYearResult.year == year){
                            thisYearResult.result.push(thisResult);
                        }
                    });
                    }
                });
                if(counter == nLength){
                    $scope.examWiseResult = examWiseResult;
                    //console.info($scope.examWiseResult);
                }
            });
            if(nLength ==0){
                $scope.examWiseResult = examWiseResult;
            }
        };
        
        $scope.resultHelper('exam',$scope.providerExamIds);
        $scope.examPivotResults =$scope.pivotResult;
        //console.info($scope.examPivotResults);
        $scope.resultSortExamYear();
        //console.info($scope.examWiseResult);
        
        $scope.yearWiseResult = [];
        $scope.resultSortYearExam = function(){
            var counter = 0;
            var nLength = $scope.provider.results.length;
            var yearPivot = $scope.resultYears;
            var examPivot = $scope.provider.exams;
            
            var yearWiseResult =[];
            yearPivot.forEach(function(thisYear, yearIndex){
                var thisYearResult = {
                    year: thisYear,
                    examResult: []
                };
                examPivot.forEach(function(thisExam, examIndex){
                    var newExamResult = {
                        exam: thisExam._id,
                        result: []
                    };
                    thisYearResult.examResult.push(newExamResult);
                });
                yearWiseResult.push(thisYearResult);
                
            });
            
            $scope.provider.results.forEach(function(thisResult, resultIndex){
                var year = thisResult.year;
                var exam = thisResult.exam._id || thisResult.exam;
                counter = counter + 1;
                var yearResult=[];
                yearWiseResult.forEach(function(thisYearResult, yearResultIndex){
                    if(thisYearResult.year == year){
                     yearResult = thisYearResult.examResult;
                    //console.info(yearResult);
                    yearResult.forEach(function(thisYearResult, yearResultIndex){
                        if(thisYearResult.exam == exam){
                            thisYearResult.result.push(thisResult);
                        }
                    });
                    }
                });
                
                
                
                //console.info(year + ' ' + exam);
                if(counter == nLength){
                    //console.info(pivotResult);
                    $scope.yearWiseResult = yearWiseResult;
                }
            });
        };
       
        $scope.markasdone = function(){
            
            
            var cisavedForm = {
                institute: $scope.provider._id,
                user: $scope.user.userId
            };
            console.info(cisavedForm);
            cisavedService.savecisaved(cisavedForm).success(function (data, status, headers) {
                tofillciService.markDone(cisavedForm)
                .success( function (data, status, headers) {
                    $scope.showMarkedDialog();
                    $state.reload();
                })
                .error(function (data, status, header, config) {
                    console.info("Error ");
                });
                
            })
            .error(function (data, status, header, config) {
                console.info("Error ");
            });
        };
        $scope.updateResultPhoto = function(result, photo, examResult, ev){
            //console.log(examResult.result);
            
            
            if(result.image && result.image != ''){
                
                var confirm = $mdDialog.confirm()
                .title('Do you not want to change image for ' + result.name + '?')
                .textContent('There is already an image set, you will not be able to recover the old image!')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .clickOutsideToClose(true)
                .ok('Confirm')
                .cancel('Cancel');
                $mdDialog.show(confirm).then(function() {
                    examResult.result.forEach(function(thisResult, index){
                
                        if(thisResult.image == photo.link){
                            thisResult.image = '';
                        }
                    });
                    result.image = photo.link;
                }, function() {
                  //nothing
                }); 
            }else{
                examResult.result.forEach(function(thisResult, index){
                
                    if(thisResult.image == photo.link){
                        thisResult.image = '';
                    }
                });
                result.image = photo.link;
            }
            
            
        };
        
        $scope.saveProvider = function(){
                console.info($scope.provider);
                var saveProvider = {
                    targetStudyProvider:$scope.provider,
                    user: $scope.user.userId
                };
                targetStudyProviderService.saveProvider(saveProvider).success(function (data, status, headers) {
                    //console.log($scope.editResult + ' ' + $scope.editResult);
                    if($scope.editResult || $scope.editResult){
                        $scope.addExamResult();
                    }else{
                        $scope.showSavedDialog();
                        $state.reload();
                        console.info("Done");
                    }
                    
                })
                .error(function (data, status, header, config) {
                    console.info("Error ");
                });
            };
        
        
        $scope.addExamResult = function(){
            var providerId = $scope.provider._id;
            var finalExamResult = {
                providerId: providerId,
                examResults: [],
                
            };
            var properties = [
                /*'year',*/
                'name',
                
            ];
            /*'rank',
                'category'*/
            $scope.examPivotResults.forEach(function(examResult, index){
                var newExamResult = {
                    exam: examResult.pivot,
                    result: []
                };
                if(examResult.pivot != "null"){
                    finalExamResult.examResults.push(newExamResult);
                }
                  
            });
            var examResultIds =  finalExamResult.examResults.map(function(a) {return a.exam;});
            $scope.examPivotResults.forEach(function(examResult, index){
                var eIndex = examResultIds.indexOf(examResult.pivot);
                examResult.result.forEach(function(thisExamResult, examResultIndex){
                    var valid = true;
                    properties.forEach(function(thisProperty, propertyIndex){
                        if(thisExamResult[thisProperty] == null){
                            if(!thisExamResult._id){
                                valid = false;
                            }

                        }
                    });   
                    if(valid && eIndex != -1){
                        finalExamResult.examResults[eIndex].result.push(thisExamResult);
                        
                        //finalExamResult.result.push(thisExamResult);
                    }
                });
                
            }); targetStudyProviderService.bulkAddResult(finalExamResult).success(function (data, status, headers) {
                console.info("Done");
                if(data == 'Done'){
                    var refreshedProvider = targetStudyProviderService.getProvider(providerId).success(function (refreshedProvider, status, headers) {
                    $scope.provider = refreshedProvider;
                     $scope.resultHelper('exam',$scope.providerExamIds);
                    $scope.examPivotResults =$scope.pivotResult;
                    //console.info(JSON.stringify($scope.examPivotResults));
                    $scope.resultSortExamYear();
                    $scope.editResult = false;

                    }).error(function (data, status, header, config) {
                        console.info("Error ");
                    });
                    
                    
                    $scope.showSavedDialog();
                    $state.reload();
                }
            })
            .error(function (data, status, header, config) {
                console.info("Error ");
            });
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
            /*if($scope.provider.video.length == 0){
                $scope.addVideos();
            }*/
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
        
        $scope.editPhoto = false;
        $scope.preUploadPhotoLength = $scope.provider.photo.length;
        $scope.editPhotos= function(){
            $scope.editPhoto = true;
        };
        $scope.editResultPhotos= function(){
            $scope.editResultPhoto = true;
        };
        $scope.savePhotos= function(){
            $scope.saveProvider();
            $scope.editPhoto = false;
            
        };
        $scope.dontsaveChanges= function(){
            $state.reload();
        };
        $scope.cancelChanges = function(){
            $scope.cancel();
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
            var arrayLength = $scope.provider.faculty.length;
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
        $scope.editEBnote = false;
        $scope.addebNote = function(){
            $scope.editEBnote = true;
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
            if($scope.tagThisPhoto.tags.indexOf(tag._id) == -1){
                $scope.tagThisPhoto.tags.push(tag._id);
            }
            
        };
        $scope.addVideoTag = function(tag){
            //console.info(JSON.stringify($scope.tagThisVideo));
            if($scope.tagThisVideo.tags.indexOf(tag._id) == -1){
                $scope.tagThisVideo.tags.push(tag._id);
            }
            
        };
        
        $scope.removeVideoTag = function(tag){
            //console.info(JSON.stringify($scope.tagThisVideo));
            var vIndex = $scope.tagThisVideo.tags.indexOf(tag._id);
            if(vIndex != -1){
                
                $scope.tagThisVideo.tags.splice(vIndex, 1);
            }
            
        };
        
        $scope.addFacultyTag = function(tag){
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
        $scope.showAddResultDialog = function(ev, exam) {
            $scope.resultExam = exam;
            $mdDialog.show({
              contentElement: '#addResultDialog',
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
        $scope.setExamForResult = function(exam, result){
            if(exam._id){
                result.exam = exam._id;
            }else{
                result.exam = exam;
            }
            
            $scope.editResult2 = true;
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
        //JHI
        $scope.showVideoTagDialog = function(ev, video) {
            $scope.tagThisVideo = video;
            $mdDialog.show({
              contentElement: '#tagVideoDialog',
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
            $timeout(function(){
                $mdDialog.cancel();
            },1000)
        };
        $scope.showLatLngDialog = function(ev) {
            $mdDialog.show({
              contentElement: '#latlngDialog',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true
            });
            $timeout(function(){
                $mdDialog.cancel();
            },1000)
        };
        $scope.showNoLatLngDialog = function(ev) {
            $mdDialog.show({
              contentElement: '#nolatlngDialog',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true
            });
            $timeout(function(){
                $mdDialog.cancel();
            },3000)
        };
        $scope.showMarkedDialog = function(ev) {
            $mdDialog.show({
              contentElement: '#markedDialog',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true
            });
            $timeout(function(){
                $mdDialog.cancel();
            },1000)
        };
        $scope.showVerifiedDoneDialog = function(ev) {
            $mdDialog.show({
              contentElement: '#verifiedDoneDialog',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true
            });
            $timeout(function(){
                $mdDialog.cancel();
            },1000)
        };
        $scope.showContactInfoAddedDialog = function(ev) {
            $mdDialog.show({
              contentElement: '#contactInfoAddedDialog',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true
            });
            $timeout(function(){
                $mdDialog.cancel();
            },1000)
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
        
        $scope.showResultDialog = function(ev, index, examResult) {
            $scope.activeResultIndex = index;
            $scope.activeResult = examResult.result[index];
            var indexPair = startEndIndex(index, examResult.result.length);
            console.info(index + ' ' + examResult.result.length); 
            console.info(JSON.stringify(indexPair));
            $scope.startResultIndex = indexPair.start;
            $scope.endResultIndex = indexPair.end;
            $scope.dialogExamResult = examResult;
            
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
        
        
        if($scope.provider.latlng){
            $scope.provider.mapAddress = [$scope.provider.latlng.lat, $scope.provider.latlng.lng];
        }else{
            if($scope.provider.pincode){
                $scope.provider.mapAddress = $scope.provider.name + ', ' + $scope.provider.address + ' ' +
                $scope.provider.city + ' ' +
                $scope.provider.pincode;
            }else{
                $scope.provider.mapAddress = $scope.provider.name + ', ' + $scope.provider.address + ' ' + $scope.provider.city;   
            }
        }
        /*if($scope.provider.pincode){
            $scope.provider.mapAddress = $scope.provider.name + ', ' + $scope.provider.address + ' ' +
            $scope.provider.city + ' ' +
            $scope.provider.pincode;
        }else{
            $scope.provider.mapAddress = $scope.provider.name + ', ' + $scope.provider.address + ' ' + $scope.provider.city;   
        }*/
        
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
                    photos.forEach(function(thisPhoto, index){
                        console.log(index + ' ' + thisPhoto.uploadProgress + ' ' + nFiles);
                        if(!thisPhoto.uploadProgress){
                            thisPhoto.uploadProgress = 0;
                        }
                        $scope.photoProgess += thisPhoto.uploadProgress;
                        //console.log($scope.photoProgess);
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
        
        $scope.uploadResultPhotos = function (newresultphotos, examResult) {
            console.log(examResult.newresultphotos);
            //var newresultphotos = $scope.newresultphotos;
            var nFiles = newresultphotos.length;
            var providerId = $scope.provider._id;
            var counter = 0;
            console.log(nFiles);
            $scope.ResultPhotoProgess = 0;
            if (newresultphotos && newresultphotos.length) {
            newresultphotos.forEach(function(thisFile, index){
                
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
                
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                }, function (evt) {
                    /*$scope.ResultPhotoProgess = 0;
                    thisFile.uploadProgress = parseInt(100.0 * evt.loaded / evt.total);
                    newresultphotos.forEach(function(thisPhoto, index){
                        //console.log(index + ' ' + thisPhoto.uploadProgress + ' ' + nFiles);
                        if(!thisPhoto.uploadProgress){
                            thisPhoto.uploadProgress = 0;
                        }
                        $scope.ResultPhotoProgess += thisPhoto.uploadProgress;
                        //console.log($scope.photoProgess);
                    });
                    $scope.ResultPhotoProgess = $scope.ResultPhotoProgess / nFiles;
                    //console.log('progress: ' + thisFile.uploadProgress + '% ' + thisFile.name);*/
                });

            })
            .error(function (data, status, header, config) {
                console.info("Error");
            });   
                 
            });
            }
         };
        
        
        $scope.uploadResultPic = function (newresultpic,result) {
            //var logo = $scope.newlogo;
            //alert('Hi');
            var logo = [newresultpic];
            var nFiles = logo.length;
            
            var counter = 0;
            var providerId = $scope.provider._id;
            var resultId = result._id;
            if (logo && logo.length) {
            
            logo.forEach(function(thisFile, index){
            var fileInfo = {
                filename: thisFile.name,
                contentType: thisFile.type
            }; ImageService.s3Credentials(fileInfo).success(function (data, status, headers) {
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
                var logoLink = $(resp.data).find('Location').text();
                
                var newResultPicForm ={
                    image: logoLink,
                    resultId: resultId,
                    providerId: providerId
                }; targetStudyProviderService.addResultPic(newResultPicForm).success(function (data, status, headers) {
                    counter = counter + 1;
                    if(counter == nFiles){
                        
                        var refreshedProvider = targetStudyProviderService.getProvider(providerId).success(function (refreshedProvider, status, headers) {
                            $scope.provider = refreshedProvider;
                            $scope.provider = refreshedProvider;
                            $scope.resultHelper('exam',$scope.providerExamIds);
                            $scope.examPivotResults =$scope.pivotResult;
                            //console.info(JSON.stringify($scope.examPivotResults));
                            $scope.resultSortExamYear();
                            $scope.editResult = false;
                            
                            
                            $scope.showSavedDialog();
                            //$state.reload();
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
                    
                });

            })
            .error(function (data, status, header, config) {
                console.info("Error");
            });   
                 
            });
            }
         };
        
        $scope.uploadLogo = function (newlogo) {
            //var logo = $scope.newlogo;
            var logo = [newlogo];
            var nFiles = logo.length;
            
            var counter = 0;
            var providerId = $scope.provider._id;
            if (logo && logo.length) {
            
            logo.forEach(function(thisFile, index){
            var fileInfo = {
                filename: thisFile.name,
                contentType: thisFile.type
            }; ImageService.s3Credentials(fileInfo).success(function (data, status, headers) {
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
                var logoLink = $(resp.data).find('Location').text();
                
                var newLogoForm ={
                    logo: logoLink,
                    providerId: providerId
                }; targetStudyProviderService.addLogo(newLogoForm).success(function (data, status, headers) {
                    counter = counter + 1;
                    if(counter == nFiles){
                        
                        var refreshedProvider = targetStudyProviderService.getProvider(providerId).success(function (refreshedProvider, status, headers) {
                            $scope.showSavedDialog();
                            $scope.provider = refreshedProvider;
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
                        if(!thisFile.uploadProgress){
                            thisFile.uploadProgress = 0;
                        }
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
        var pageTitle = $scope.provider.name + ' listing in ' + $scope.provider.city + ' - Claim Now';
        
        var examNames = '';
        $scope.provider.exams.forEach(function(thisExam, examIndex){
            examNames += thisExam.displayname;
            if(examIndex < $scope.provider.exams.length - 1){
                examNames += ', ';
            }
        });
        
        var pageDescription = "Study at " + $scope.provider.name + ", " +$scope.city +  " for " + examNames+ ". | Exambazaar - results, fees, faculty, photos, vidoes, reviews of " + $stateParams.groupName;
        $rootScope.pageDescription = pageDescription;
        ngMeta.setTitle(pageTitle);
        //console.info(pageDescription);
        
        ngMeta.setTag('description', pageDescription);
        
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
        
        
        
    exambazaar.controller("partnerDashboardController", 
        [ '$scope', '$state','thisPartner', 'targetStudyProviderService', '$mdDialog','$timeout', function($scope, $state, thisPartner, targetStudyProviderService, $mdDialog, $timeout){
            $scope.partner = thisPartner.data;
            $scope.listing = $scope.partner.partner[0];
            $scope.editManagement = false;
            $scope.management = $scope.listing.management;
            $scope.primaryManagement = $scope.listing.primaryManagement;
            
            $scope.addPrimaryManagement = false;
            $scope.showOtherManagement = false;
            if(!$scope.primaryManagement || $scope.primaryManagement.mobile =='' || $scope.primaryManagement.name ==''){
                $scope.addPrimaryManagement = true;
                $scope.primaryManagement ={
                    name: '',
                    mobile: '',
                    role: '',
                    email: '',
                }
            }
            $scope.showOthers = function(){
                $scope.showOtherManagement = true;
            };
            $scope.unShowOthers = function(){
                $scope.showOtherManagement = false;
            };
            $scope.editAll = function(){
                $scope.editManagement = true;
                $scope.management.forEach( function(thisPerson, index){
                    thisPerson.editable = true;
                });
            }
            $scope.editPrimaryManagement = function(){
                $scope.addPrimaryManagement = true;
                $scope.showOthers();
                $scope.editAll();
            };
            if(!$scope.management){
                $scope.management = [];
            }
            var newManagement = {
                name: '',
                mobile: '',
                role: '',
                email: '',
                editable: true
            };
            $scope.addNewManagement = function(){
                $scope.management.push(newManagement);
            };
            $scope.removeManagement = function(thisManagement, index){
                
                if(!thisManagement._id){
                    $scope.management.splice(index, 1);
                }else{
                    var managementIds = $scope.management.map(function(a) {return a._id;});
                    var mIndex = managementIds.indexOf(thisManagement._id);
                    if(mIndex != -1){
                        var newManagementForm ={
                            management: thisManagement,
                            providerId: $scope.listing._id
                        };
                         targetStudyProviderService.removeManagement(newManagementForm).success(function (data, status, headers) {
                            $scope.showSavedDialog();
                            $state.reload();
                            console.info("Done");
                        })
                        .error(function (data, status, header, config) {
                            console.info("Error ");
                        });
                        
                    }else{
                        $scope.management.splice(index, 1);
                    }
                }
            };
            
            
            $scope.savePrimaryManagement = function(){
                var thisManagement = $scope.primaryManagement;
                var newMobile = thisManagement.mobile;
                var newName = thisManagement.name;
                var managementMobiles = $scope.management.map(function(a) {return a.mobile;});
                if(newMobile !='' && newName != ''){
                    var mIndex = managementMobiles.indexOf(newMobile);
                    
                    if(mIndex == -1){
                        var newManagementForm ={
                            management: thisManagement,
                            providerId: $scope.listing._id
                        };
                         targetStudyProviderService.addPrimaryManagement(newManagementForm).success(function (data, status, headers) {
                            $scope.showSavedDialog();
                            $state.reload();
                            console.info("Done");
                        })
                        .error(function (data, status, header, config) {
                            console.info("Error ");
                        });
                    }else{
                        $scope.existingManagement = $scope.management[mIndex];
                        $scope.showMobileExistDialog();
                        //alert('Cant add two management people with same mobile');
                    }
                }else{
                    $scope.showErrorDialog();
                }
                
            };
            
            $scope.editManagementFunc = function(thisManagement){
                thisManagement.editable = true;
            };
            
            
            $scope.saveManagement = function(thisManagement){
                var newMobile = thisManagement.mobile;
                var newName = thisManagement.name;
                var managementMobiles = $scope.management.map(function(a) {
                    if(a.editable){
                        return null;
                    }else{
                        return a.mobile;
                    }
                    
                });
                if(newMobile !='' && newName != ''){
                    var mIndex = managementMobiles.indexOf(newMobile);
                    
                    if(mIndex == -1){
                        var newManagementForm ={
                            management: thisManagement,
                            providerId: $scope.listing._id
                        };
                         targetStudyProviderService.addManagement(newManagementForm).success(function (data, status, headers) {
                            $scope.showSavedDialog();
                            $state.reload();
                            console.info("Done");
                        })
                        .error(function (data, status, header, config) {
                            console.info("Error ");
                        });
                    }else{
                        $scope.existingManagement = $scope.management[mIndex];
                        $scope.showMobileExistDialog();
                        //alert('Cant add two management people with same mobile');
                    }
                }else{
                    $scope.showErrorDialog();
                }
                
            };
            
            
            $scope.dontsaveChanges= function(){
                $state.reload();
            };
            $scope.showSavedDialog = function(ev) {
                $mdDialog.show({
                  contentElement: '#savedDialog',
                  parent: angular.element(document.body),
                  targetEvent: ev,
                  clickOutsideToClose: true
                });
                $timeout(function(){
                    $mdDialog.cancel();
                },1000)
            };
            
            
            
            
            
            $scope.showMobileExistDialog = function(ev) {
                $mdDialog.show({
                  contentElement: '#mobileExistDialog',
                  parent: angular.element(document.body),
                  targetEvent: ev,
                  clickOutsideToClose: true
                });
                $timeout(function(){
                    $mdDialog.cancel();
                },5000)
            };
            $scope.showErrorDialog = function(ev) {
                $mdDialog.show({
                  contentElement: '#errorDialog',
                  parent: angular.element(document.body),
                  targetEvent: ev,
                  clickOutsideToClose: true
                });
                $timeout(function(){
                    $mdDialog.cancel();
                },5000)
            };
            $scope.edit = function(){
                $state.go('claim', {coachingId: $scope.listing._id});
            };
           
            
    }]);    
        
    exambazaar.controller("masterDashboardController", 
        [ '$scope', 'usersCount', 'verifiedUsersCount', 'studentCount', 'coachingCount', 'internList', 'tofillciList', 'tofillciService', 'viewService', '$state', 'masterViewSummary','coachingSavedCount', 'filledCount', '$mdDialog', 'toverifyciService', 'toverifyciList', 'verifiedCount', '$rootScope', 'targetStudyProviderService', '$timeout', 'addContactInfoService', 'addContactInfoList', function($scope, usersCount, verifiedUsersCount, studentCount, coachingCount, internList, tofillciList, tofillciService,viewService, $state, masterViewSummary, coachingSavedCount , filledCount, $mdDialog, toverifyciService, toverifyciList, verifiedCount, $rootScope, targetStudyProviderService, $timeout, addContactInfoService, addContactInfoList){
            
            $scope.today = moment();
            var startOfWeek = moment().startOf('week').subtract(3, "days");
            var endOfWeek = moment().endOf('week').add(1, 'w');

            $scope.days = [];
            var day = startOfWeek;

            while (day <= endOfWeek) {
                $scope.days.push(day.toDate());
                day = day.clone().add(1, 'd');
            }
            
            $scope.daysTask = function(task, day){
                var comp = $scope.compareDates(task._deadline, day);
                console.info(task._deadline + ' ' + day + ' ' + comp);
                if(comp == 0){
                    return true;
                }else{
                    return false;
                }
            };
            $scope.compareDates = function(dateTimeA, dateTimeB) {
                dateTimeA = new Date(dateTimeA);
                var momentA = moment(dateTimeA,"DD/MM/YYYY");
                var momentB = moment(dateTimeB,"DD/MM/YYYY");
                if (momentA > momentB) return 1;
                else if (momentA < momentB) return -1;
                else return 0;
            };
            
            $scope.usersCount = usersCount.data;
            $scope.studentCount = studentCount.data;
            $scope.coachingCount = coachingCount.data;
            $scope.coachingSavedCount = coachingSavedCount.data;
            $scope.internList = internList.data;
            $scope.activeInternList = [];
            //console.info($scope.internList);
            $scope.internList.forEach( function(thisIntern, index){
                if(thisIntern.active){
                    $scope.activeInternList.push(thisIntern);    
                }
            });
            
            $scope.showSavedDialog = function(ev) {
                $mdDialog.show({
                  contentElement: '#savedDialog',
                  parent: angular.element(document.body),
                  targetEvent: ev,
                  clickOutsideToClose: true
                });
                $timeout(function(){
                    $mdDialog.cancel();
                },1000)
            };
            $scope.showFillDialog = function(ev) {
                $mdDialog.show({
                  contentElement: '#fillDialog',
                  parent: angular.element(document.body),
                  targetEvent: ev,
                  clickOutsideToClose: true
                });
                
            };
            $scope.showInternAssignedDialog = function(ev) {
                $mdDialog.show({
                  contentElement: '#internAssignedDialog',
                  parent: angular.element(document.body),
                  targetEvent: ev,
                  clickOutsideToClose: true
                });
                
            };
            
            $scope.changeUser = function(){
                toverifyciService.changeUser().success(function (data, status, headers) {
                    $scope.showSavedDialog();
                    $state.reload();
                })
                .error(function (data, status, header, config) {
                    console.info(status + " " + data);
                });
            };
            $scope.filledCount = filledCount.data;
            $scope.tofillciList = tofillciList.data;
            
            var tofillGroupNames = $scope.tofillciList.map(function(a) {return a.institute.groupName;});
            $scope.toverifyciList = toverifyciList.data;
            $scope.addContactInfoList = addContactInfoList.data;
            //console.log($scope.addContactInfoList);
            
            $scope.verifiedCount = verifiedCount.data;
            $scope.masterViewSummary = masterViewSummary.data;
            
            $scope.internDueList = [];
            $scope.yesterdayTasks = [];
            $scope.fillsDue = 0;
            $scope.fillsAssigned = 0;
            var internIds = $scope.internList.map(function(a) {return a._id;});
            $scope.internList.forEach( function(thisIntern, index){
                var internDue = {
                    intern: thisIntern,
                    done: 0,
                    due: 0,
                    assigned: 0,
                    taskList: [],
                };
                $scope.internDueList.push(internDue);
            });
            
            var yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            yesterday.setHours(0,0,0,0);
            $scope.yesterday = yesterday;
            
            var rightNow = new Date();
            
            $scope.tofillciList.forEach( function(thisTask, index){
               
                //console.log(JSON.stringify(thisTask.institute));
                var iIndex = internIds.indexOf(thisTask.user._id);
                
                if($scope.compareDates(thisTask._deadline, $scope.days[0]) == 1){
                    $scope.internDueList[iIndex].taskList.push(thisTask);
                }
                
                
                if(thisTask.active){
                    $scope.fillsAssigned += 1;
                    var internIndex = internIds.indexOf(thisTask.user._id);
                    //console.info(internIndex);
                    $scope.internDueList[internIndex].assigned += 1;
                    
                    //console.info(thisTask._deadline + ' ' + rightNow + ' ' + compare(rightNow, new Date(thisTask._deadline)));
                    if(compare(rightNow, new Date(thisTask._deadline)) == 1){
                        $scope.internDueList[internIndex].due += 1;
                        
                        
                        $scope.fillsDue += 1;
                    }
                }else{
                    var thisEmail = thisTask.institute.email;
                    if(!thisEmail || thisEmail.length == 0){
                        thisTask.noEmail = true;
                    }else{
                        thisTask.noEmail = false;
                    }
                    var internIndex = internIds.indexOf(thisTask.user._id);
                    $scope.internDueList[internIndex].done += 1;
                    if(compare(new Date(thisTask._finished), yesterday) == 1){
                        $scope.yesterdayTasks.push(thisTask);
                    }
                    
                }
                
            });
            //console.log($scope.internDueList);
            $scope.verifiedUsersCount = verifiedUsersCount.data;
            $scope.ciDeadline = new Date();
            $scope.ciDeadline.setDate( $scope.ciDeadline.getDate() + 1);
            $scope.assignCIFill = function(){
                var intern = $scope.ciIntern;
                var coaching = $scope.instituteInput;
                var ciDeadline = $scope.ciDeadline;
                ciDeadline.setHours(23,59,59);
                var res = coaching.split("/");
                var coaching = res[res.length-1];
                if(coaching.length < 15 || !ciDeadline){
                    alert('Check Coaching Id or URL and deadline date');
                }else{
                    //ABC
                    var tofillciForm = {
                        institute: coaching,
                        user: intern,
                        _deadline: ciDeadline,
                    };
                    console.log(JSON.stringify(tofillciForm));
                    tofillciService.savetofillci(tofillciForm).success(function (data, status, headers) {
                        $scope.showSavedDialog();
                        $state.reload();
                    })
                    .error(function (data, status, header, config) {
                        console.info(status + " " + data);
                    });
                }
            };
            
            
            $scope.getInternAssigned = function(due){
                var internId = due.intern._id;
                var internIndex = internIds.indexOf(internId);
                
                $scope.activeIntern = $scope.internDueList[internIndex];
                
                

                
                $scope.showInternAssignedDialog();
                
            };
            
            $scope.getSummary = function(tofillci){
                var instituteId = tofillci.institute._id;
                
                targetStudyProviderService.getProviderFillSummary(instituteId).success(function (data, status, headers) {
                    $scope.fillProvider = data;
                    $scope.fillUser = tofillci.user;
                    $scope.showFillDialog();
                    console.info(JSON.stringify(data));
                })
                .error(function (data, status, header, config) {
                    console.info("Error ");
                });
            };
            
            
            $scope.rankedCities = ["Jaipur", "Delhi", "Mumbai", "New Delhi", "Gurgaon", "Kota"];
            /*"Delhi","Mumbai","New Delhi","Ahmedabad","Chennai","Kolkata","Hyderabad","Pune","Bangalore","Chandigarh","Jaipur","Agra","Ajmer","Allahabad","Alwar","Ambala","Amritsar","Bhilwara","Bhopal","Bikaner","Coimbatore","Dehradun","Ganganagar","Ghaziabad","Guwahati","Gwalior","Indore","Juhnjhunu","Kanpur","Kota","Kurukshetra","Lucknow","Ludhiana","Mathura","Meerut","Mohali","Mysore","Nasik","Noida","Patiala","Patna","Rajkot","Rohtak","Roorkee","Shimla","Sikar","Surat","Thrissur","Trivandrum","Vadodara","Vellore","Vishakhapatnam"*/
            
            $scope.ciVerifyDeadline = new Date();
            $scope.ciVerifyDeadline.setDate( $scope.ciVerifyDeadline.getDate() + 1);
            
            
            $scope.instituteVerifyCount = 1;
            $scope.ciVerifyIntern = $scope.internList[$scope.internList.length-1];
            $scope.verifyCity = 'Jaipur';
            $scope.assignCIVerify = function(){
                var intern = $scope.ciVerifyIntern;
                var instituteVerifyCount = $scope.instituteVerifyCount;
                var ciVerifyDeadline = $scope.ciVerifyDeadline;
                var verifyCity = $scope.verifyCity;
                ciVerifyDeadline.setHours(23,59,59);
                //var res = coaching.split("/");
                //var coaching = res[res.length-1];
                if(instituteVerifyCount == '' || !ciVerifyDeadline){
                    alert('Check Count or URL and deadline date');
                }else{
                    //ABC
                    var toverifyciForm = {
                        verifyCity: verifyCity,
                        instituteVerifyCount: instituteVerifyCount,
                        user: intern,
                        _deadline: ciVerifyDeadline,
                    };
                   console.info(toverifyciForm); toverifyciService.savetoverifyci(toverifyciForm).success(function (data, status, headers) {
                        console.info('Done');
                        $state.reload();
                    })
                    .error(function (data, status, header, config) {
                        console.info(status + " " + data);
                    });
                }
            };
            
            $scope.addContactInfoDeadline = new Date();
            $scope.addContactInfoDeadline.setDate( $scope.addContactInfoDeadline.getDate() + 1);
            $scope.assignAddContactInfo = function(){
                var intern = $scope.addContactInfoIntern;
                var addContactInfoCount = $scope.addContactInfoCount;
                var addContactInfoDeadline = $scope.addContactInfoDeadline;
                var addContactInfoCity = $scope.addContactInfoCity;
                addContactInfoDeadline.setHours(23,59,59);
                //var res = coaching.split("/");
                //var coaching = res[res.length-1];
                if(addContactInfoCount == '' || !addContactInfoDeadline){
                    alert('Check Count or URL and deadline date');
                }else{
                    var addContactInfoForm = {
                        addContactInfoCity: addContactInfoCity,
                        addContactInfoCount: addContactInfoCount,
                        user: intern,
                        _deadline: addContactInfoDeadline,
                    };
                   console.info(addContactInfoForm); addContactInfoService.saveaddContactInfo(addContactInfoForm).success(function (data, status, headers) {
                        console.info('Done');
                        $state.reload();
                    })
                    .error(function (data, status, header, config) {
                        console.info(status + " " + data);
                    });
                }
            };
            
            
            
            $scope.showRemoveConfirm = function(tofillci, ev) {
                //console.log(JSON.stringify(tofillci.user));
                var confirm = $mdDialog.confirm()
                    .title('Would you like to remove ' + tofillci.institute.name + ' for ' +  tofillci.user.basic.name + '?')
                    .textContent('Assigned on: ' + moment(tofillci._created).format('DD-MMM HH:mm') + ', Deadline: ' + moment(tofillci._deadline).format('DD-MMM HH:mm') + '!')
                    .ariaLabel('Lucky day')
                    .targetEvent(ev)
                    .clickOutsideToClose(true)
                    .ok('Confirm')
                    .cancel('Cancel');
                    $mdDialog.show(confirm).then(function() {
                      $scope.removeAssigned(tofillci);
                    }, function() {
                      //nothing
                    });

            };
            
            
            $scope.removeAssigned = function(tofillci){
                console.log(tofillci);
                tofillciService.removeAssigned(tofillci._id);
                $state.reload();
            };
            
            $rootScope.pageTitle = 'Master Dashboard';
            $scope.fetching = false;
            $scope.$watch('instituteInput', function (newValue, oldValue, scope) {
            if(newValue != null && newValue != ''){
                //console.info(newValue);
                //DEF
                var newValueArr = newValue.split("/");
                newValue = newValueArr[newValueArr.length-1];
                //$scope.email.instituteId = newValue;
                //console.info(newValue);
                if(newValue.length > 5){
                    $scope.fetching = true;
                    $scope.assignError = false;
                    console.log(newValue);
                    targetStudyProviderService.getGroupName(newValue).success(function (data, status, headers) {
                        console.log(data);
                        if(data){
                            $scope.assignGroup = data;
                            if(tofillGroupNames.indexOf(data) == -1){
                                $scope.prevFilledLength = 0;
                            }else{
                                $scope.prevFilledLength = 1;
                            }
                        }else{
                            $scope.assignError = true;
                        }
                        
                        $scope.fetching = false;
                    }).error(function (data, status, header, config) {
                        console.info("Error ");
                    });
                    
                    //tofillGroupNames
                    //Gaurav 
                    /*tofillciService.prevFilled(newValue).success(function (prevfilleddata, status, headers) {
                        $scope.prevFilledLength = prevfilleddata;
                        
                        $scope.fetching = false;
                    })
                    .error(function (data, status, header, config) {
                        console.info(status + " " + data);
                    });*/
                    
                    
                    
                    
                }

            }

            }, true);
            
            
    }]);
    
    /*    
    exambazaar.controller("masterToFillController", 
        [ '$scope', 'internList', 'tofillciList', 'tofillciService', '$state', 'filledCount', '$mdDialog', function($scope, internList, tofillciList, tofillciService, $state , filledCount, $mdDialog){
            
            $scope.internList = internList.data;
            $scope.activeInternList = [];
            //console.info($scope.internList);
            $scope.internList.forEach( function(thisIntern, index){
                if(thisIntern.active){
                    $scope.activeInternList.push(thisIntern);    
                }
            });
            
            $scope.filledCount = filledCount.data;
            $scope.tofillciList = tofillciList.data;
            
            $scope.internDueList = [];
            $scope.yesterdayTasks = [];
            $scope.fillsDue = 0;
            $scope.fillsAssigned = 0;
            var internIds = $scope.internList.map(function(a) {return a._id;});
            $scope.internList.forEach( function(thisIntern, index){
                var internDue = {
                    intern: thisIntern,
                    done: 0,
                    due: 0,
                    assigned: 0
                };
                $scope.internDueList.push(internDue);
            });
            
            var yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            yesterday.setHours(0,0,0,0);
            $scope.yesterday = yesterday;
            
            var rightNow = new Date();
            
            $scope.tofillciList.forEach( function(thisTask, index){
               
                
                //console.log(JSON.stringify(thisTask.institute));
                if(thisTask.active){
                    $scope.fillsAssigned += 1;
                    var internIndex = internIds.indexOf(thisTask.user._id);
                    //console.info(internIndex);
                    $scope.internDueList[internIndex].assigned += 1;
                    
                    //console.info(thisTask._deadline + ' ' + rightNow + ' ' + compare(rightNow, new Date(thisTask._deadline)));
                    if(compare(rightNow, new Date(thisTask._deadline)) == 1){
                        $scope.internDueList[internIndex].due += 1;
                        $scope.fillsDue += 1;
                    }
                }else{
                    var thisEmail = thisTask.institute.email;
                    if(!thisEmail || thisEmail.length == 0){
                        thisTask.noEmail = true;
                    }else{
                        thisTask.noEmail = false;
                    }
                    var internIndex = internIds.indexOf(thisTask.user._id);
                    $scope.internDueList[internIndex].done += 1;
                    if(compare(new Date(thisTask._finished), yesterday) == 1){
                        $scope.yesterdayTasks.push(thisTask);
                    }
                    
                }
            });
            $scope.ciDeadline = new Date();
            $scope.ciDeadline.setDate( $scope.ciDeadline.getDate() + 1);
            $scope.assignCIFill = function(){
                var intern = $scope.ciIntern;
                var coaching = $scope.instituteInput;
                var ciDeadline = $scope.ciDeadline;
                ciDeadline.setHours(23,59,59);
                var res = coaching.split("/");
                var coaching = res[res.length-1];
                if(coaching.length < 15 || !ciDeadline){
                    alert('Check Coaching Id or URL and deadline date');
                }else{
                    //ABC
                    var tofillciForm = {
                        institute: coaching,
                        user: intern,
                        _deadline: ciDeadline,
                    };
                    console.log(JSON.stringify(tofillciForm));
                    tofillciService.savetofillci(tofillciForm).success(function (data, status, headers) {
                        alert('Done');
                        $state.reload();
                    })
                    .error(function (data, status, header, config) {
                        console.info(status + " " + data);
                    });
                }
            };
            
            $scope.showRemoveConfirm = function(tofillci, ev) {
                console.info(JSON.stringify(tofillci.institute));
                console.info(JSON.stringify(tofillci.user));
                
                var confirm = $mdDialog.confirm()
                    .title('Would you like to remove ' + tofillci.institute.name + ' for ' +  tofillci.user.name + '?')
                    .textContent('Assigned on: ' + moment(tofillci._created).format('DD-MMM HH:mm') + ', Deadline: ' + moment(tofillci._deadline).format('DD-MMM HH:mm') + '!')
                    .ariaLabel('Lucky day')
                    .targetEvent(ev)
                    .clickOutsideToClose(true)
                    .ok('Confirm')
                    .cancel('Cancel');
                    $mdDialog.show(confirm).then(function() {
                      $scope.removeAssigned(tofillci);
                    }, function() {
                      //nothing
                    });
            };
            
            
            $scope.removeAssigned = function(tofillci){
                console.log(tofillci);
                tofillciService.removeAssigned(tofillci._id);
                $state.reload();
            };
            
    }]);    */
        
    exambazaar.controller("seocontroller", ['$rootScope', function($rootScope){
        $rootScope.pageTitle = "Exambazaar: Exclusive Deals and Videos for test preparation";
    }]);
    
    
    exambazaar.controller("loginController", 
        [ '$scope','$rootScope','$state','$cookies','$http','UserService', function($scope,$rootScope,$state,$cookies,$http,UserService){
        $scope.login = {
            mobile: '',
            password: ''
        }
        if(typeof($cookies.getObject('sessionuser'))!= 'undefined'){
            $scope.sessionuser = $cookies.getObject('sessionuser');
        }
         
        if($scope.sessionuser != null){
           if($scope.sessionuser.studentId != null){
               StudentService.getStudentNotification($scope.sessionuser.studentId).success(function (data, status, headers) {
                    
               $scope.$evalAsync(
                    function( $scope ) {
                        $scope.notification = data;
                    }
                ); 
                   
                })
                .error(function (data, status, header, config) {
                    console.info(status + " " + data);
                });
            }    
        } 
            
        $scope.login = function(){
            $http.post('/login', {
              mobile: $scope.login.mobile,
              password: $scope.login.password,
            })
            .success(function(user){
                
                
                var loginForm = {
                    userId: user._id
                };
                if($cookies.getObject('ip')){
                    var ip = $cookies.getObject('ip');
                    loginForm.ip = ip;
                }
                console.info(JSON.stringify(loginForm));
                UserService.markLogin(loginForm).success(function (data, status, headers) {
                    console.info('Login marked');
                })
                .error(function (data, status, header, config) {
                    console.info(status + " " + data);    
                });
                UserService.getUser(user._id).success(function (data, status, headers) {
                    var fulluser = data;
                    var sessionuser;
                    if(user.verified===true){
                        console.info('User type is: ' + user.userType);
                        
                        sessionuser = {
                            userId: fulluser._id,
                            masterId: fulluser._id,
                            facebookId: fulluser.facebookId,
                            userType: fulluser.userType,
                            basic: fulluser.basic,
                            image: fulluser.image,
                            mobile: fulluser.mobile,
                            email: fulluser.email,
                            
                        };
                        
                            
                        
                        $cookies.putObject('sessionuser', sessionuser);
                        if($state.current.name == 'main' || $state.current.name == 'landing' || $state.current.name == 'login'){
                            if(sessionuser.userType =='Master'){
                                $state.go('master-dashboard', {masterId: sessionuser.masterId});
                                
                                
                            }
                            if(sessionuser.userType =='Intern - Business Development'){ $state.go('assigned', {userId: sessionuser.userId});
                            }
                            if(sessionuser.userType =='Student'){
                                $state.reload();
                            }
                            
                        }else{
                            $state.reload();
                        }
                        
                        
                    }else{
                        
                        $state.go('verify', {userId: user._id});
                    }
                    
                })
                .error(function (data, status, header, config) {
                console.info('Error');
                })
            
            })
            .error(function (data, status, header, config){
              
              $scope.login.password="";
              $scope.message = 'Incorrect Mobile or Password';
                
            });
        };//login ends
        $scope.logout = function(){
            $cookies.remove('sessionuser');
            $http.post('/logout');
            $state.reload();
            //$state.go("main", {}, {reload: true});
        };
            
    }]);
    
    exambazaar.controller("headerController", 
        [ '$scope','$rootScope','$state','$cookies','$http','UserService','NotificationService','ipService','geolocation','$geolocation', '$facebook', '$mdDialog', function($scope,$rootScope,$state,$cookies,$http,UserService,NotificationService,ipService,geolocation,$geolocation, $facebook, $mdDialog){
                
        
        $scope.showLoginDialog = function(ev) {
            $mdDialog.show({
              contentElement: '#loginDialog',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true,
              openFrom: {
                  top: -50,
                  width: 30,
                  height: 80
                },
             closeTo: {
              left: 1500
            }
            });
        };    
            
        
        ipService.getip()
        .success(function (data, status, headers) {
            //console.info(data);
            var ip = {
                city: data.city,
                country: data.country,
                lat: data.lat,
                lng: data.lon,
                zip: data.zip,
                org: data.org,
                as: data.as,
                isp: data.isp,
                query: data.query,
            };
            $cookies.putObject('ip', ip);
        })
        .error(function (data, status, header, config) {
            console.info();
        });    
            
        $scope.showLogin = false;
        $scope.showLoginForm = function(){
            //$scope.showLogin = !$scope.showLogin;
            $scope.showLoginDialog();
        };
            
        $rootScope.$on("CallShowLogin", function(){
           $scope.showLoginForm();
        });

        /*if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position){
                
                $scope.position = position;
              
            });
        }*/
        //geolocation.getLocation().then(function(data){
        /*geolocation.getLocation().then(function(data){
            $scope.coords = {lat:data.coords.latitude, long:data.coords.longitude, accuracy:data.coords.accuracy};
            
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
               
            }    
        }
        $scope.markRead = function(thisnotification){
            var readNotification = {
                studentId:$scope.sessionuser.studentId,
                teacherId:$scope.sessionuser.teacherId,
                notificationId:thisnotification._id
            };
            NotificationService.markRead(readNotification).success(function (data, status, headers) {
                
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
                var loginForm = {
                    userId: user._id
                };
                if($cookies.getObject('ip')){
                    var ip = $cookies.getObject('ip');
                    loginForm.ip = ip;
                }
                console.info(JSON.stringify(loginForm));
                UserService.markLogin(loginForm).success(function (data, status, headers) {
                    console.info('Login marked');
                })
                .error(function (data, status, header, config) {
                    console.info(status + " " + data);    
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
                            facebookId: fulluser.facebookId,
                            userType: fulluser.userType,
                            basic: fulluser.basic,
                            image: fulluser.image,
                            mobile: fulluser.mobile,
                            email: fulluser.email,
                        };
                        
                        if(user.userType == 'Partner'){
                            sessionuser.partner = user.partner;
                        }
                        $cookies.putObject('sessionuser', sessionuser);
                        console.info(sessionuser);
                        if(sessionuser.userType =='Partner'){
                        //ABC
                        /*UserService.getPartner(fulluser._id).success(function (data, status, headers) {
                            $scope.partnerList = data;
                            console.info('Partners Loaded');
                        })
                        .error(function (data, status, header, config) {
                            console.log('Error ' + JSON.stringify(data));
                        });*/
                            console.info(JSON.stringify(sessionuser));
                        }
                        if($state.current.name == 'main' || $state.current.name == 'landing'){
                            if(sessionuser.userType =='Master'){
                                
                                $state.go('master-dashboard', {masterId: sessionuser.masterId});
                                
                                
                            }
                            if(sessionuser.userType =='Intern - Business Development'){
                                 $state.go('assigned', {userId: sessionuser.userId});
                            }
                            if(sessionuser.userType =='Student'){
                                $state.reload();
                            }
                            if(sessionuser.userType =='Partner'){
                                $state.go('partner-dashboard', {userId: sessionuser.userId});
                            }
                        }else{
                            $state.reload();
                        }
                        
                        
                    }else{
                        
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
              $state.go('login');
            });
        };//login ends
        $scope.logout = function(){
            $cookies.remove('sessionuser');
            $http.post('/logout');
            $state.reload();
            //$state.go("main", {}, {reload: true});
        };
           
            
        $facebook.getLoginStatus().then(function(response) {
            $scope.fbLoginStatus = response;
        });
        if($scope.user && $scope.user.userId){
            $scope.loggedIn = true; 
            refresh();
        }else{
            $scope.loggedIn = false;
        }

        $scope.fblogin = function() {
            //console.log('Loggin into fb');
            $facebook.login().then(function(response) {
                $scope.fbLoginStatus = response;
                refresh();
            });   
        };
            
        function refresh() {
                $facebook.api("/me", {fields: 'id, name, age_range, link, gender, picture, email'}).then(
                    function(response) {
                        //console.log($scope.user);
                        
                        if($scope.user && $scope.user.userId){
                            //link the user's fb id to the current user
                            $scope.user.fbuser = {
                                name: response.name,
                                gender: response.gender,
                                image: response.picture.data.url,
                                email: response.email,
                                facebook: {
                                    link: response.link,
                                    id: response.id,
                                }
                            };
                            
                            
                        }else{
                            $scope.user = {};
                            $scope.user.fbuser = {
                                name: response.name,
                                gender: response.gender,
                                image: response.picture.data.url,
                                email: response.email,
                                facebook: {
                                    link: response.link,
                                    id: response.id,
                                }
                            };
                            //add a new user with facebook id
                        }
                        
                    },
                    function(err) {
                        $scope.welcomeMsg = "Please log in";
                        $scope.isLoggedIn = false;
                });
                $facebook.api("/me/permissions").then(
                    function(response) {
                        //console.log(response);
                        $scope.permissions = response;
                    },
                    function(err) {
                    $scope.welcomeMsg = "Permissions Error";
                });
                
            };

            //console.info($scope.user);
            
            $scope.$watch('[fbLoginStatus.status, user.fbuser.facebook.id]', function (newValue, oldValue, scope) {
                //console.log(newValue);
            if(newValue[0] == 'connected' && newValue[1]){
                $scope.fbUser = true;
                $scope.user.fbuser.facebook.accessToken = $scope.fbLoginStatus.authResponse.accessToken;
                if(!$scope.user.facebookId){
                    UserService.fbSave($scope.user).success(function (data, status, headers) {
                        
                        var fulluser = data;
                        console.log(fulluser);
                        var sessionuser = {
                            userId: fulluser._id,
                            facebookId: fulluser.facebookId,
                            userType: fulluser.userType,
                            basic: fulluser.basic,
                            image: fulluser.image,
                            mobile: fulluser.mobile,
                            email: fulluser.email,

                        };
                        $cookies.putObject('sessionuser', sessionuser);
                        $scope.user = sessionuser;
                        $mdDialog.hide();
                        console.log(sessionuser.userType);
                        
                        if(sessionuser.userType =='Master'){  
                            $state.go('master-dashboard', {masterId: sessionuser.userId});
                        }
                        if(sessionuser.userType =='Intern - Business Development'){
                             $state.go('assigned', {userId: sessionuser.userId});
                        }
                        if(sessionuser.userType =='Student'){
                            $state.reload();
                        }
                        if(sessionuser.userType =='Partner'){
                            $state.go('partner-dashboard', {userId: sessionuser.userId});
                        }
                        
                        
                        //$state.reload();
                    })
                    .error(function (data, status, header, config) {
                        console.info("Error ");
                    });
                }
                
                
                
                
            }

            }, true);    
            
            
    }]); 
    
      
    
    exambazaar.controller("verifyController", 
    [ '$scope','thisuser','OTPService','UserService','$rootScope','$state','$cookies', function($scope,thisuser,OTPService,UserService,$rootScope,$state,$cookies){
        $scope.user = thisuser.data;
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
           var userPassword = {
               userId: $scope.user._id,
               newPassword: $scope.password
           };
            UserService.updatePassword(userPassword).success(function (data, status, headers) {
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
              console.info('Error');
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
            console.info(val);
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
        
    exambazaar.controller("groupController", 
    [ '$scope', 'targetStudyProviderService','$timeout','$state','$stateParams', '$cookies','$mdDialog','$window', function($scope, targetStudyProviderService,$timeout,$state,$stateParams, $cookies,$mdDialog,$window){
        //$scope.providersList = targetStudyProvidersList.data;
        $scope.findPartners = function (query){
            targetStudyProviderService.groupProviders(query).success(function (data, status, headers) {
                $scope.providersList = data;
                console.info("Done");
            })
            .error(function (data, status, header, config) {
                console.info("Error ");
            });
            
            
        };
        
        if($cookies.getObject('sessionuser')){
            
            $scope.user = $cookies.getObject('sessionuser');
            if($scope.user.userType=='Master'){
                $scope.showLevel = 10;
            }
            if($scope.user.userType=='Intern - Business Development'){
                $scope.showLevel = 1; 
                
            }
            
        }
        $scope.saveChanges = function(providerId){
            var saveProvider = {
                targetStudyProvider: providerId
            };
            targetStudyProviderService.saveProvider(saveProvider).success(function (data, status, headers) {
                $scope.cancel();
                
                console.info("Done");
            })
            .error(function (data, status, header, config) {
                console.info("Error ");
            });
        };
        
        $scope.searchText = '';
        $scope.filterText = '';
        $scope.setFilter = function(text){
            if(text && text !=''){
                $scope.searchText = text;
                $scope.filterText = text;
            }else{
                $scope.filterText = $scope.searchText;
            }
            
            
        };
        $scope.clearFilter = function(){
            $scope.searchText = '';
            $scope.filterText = '';
        };
        
    }]); 
    
    exambazaar.controller("getTargetStudyCoachingController", 
    [ '$scope', 'targetStudyProviderService','targetStudyProvidersList','targetStudyCities', '$timeout','$state','$stateParams', '$cookies','$mdDialog','locationsList','$window', 'institutesSavedList', 'institutesFilledList', 'emailList', function($scope, targetStudyProviderService,targetStudyProvidersList,targetStudyCities,$timeout,$state,$stateParams, $cookies,$mdDialog, locationsList,$window, institutesSavedList, institutesFilledList, emailList){
        $scope.providersList = targetStudyProvidersList.data;
        $scope.emailsList = emailList.data;
        var providersListIds = $scope.providersList.map(function(a) {return a._id;});
        var institutesSaved = institutesSavedList.data;
        var institutesFilled = institutesFilledList.data;
        //console.info(institutesFilled);
        
        
        $scope.filledCounter = 0;
        $scope.verifiedCounter = 0;
        $scope.doesnotexistCounter = 0;
        $scope.noresponseCounter = 0;
        $scope.noMapCounter = 0;
        $scope.noEmailCounter = 0;
        
        $scope.emailSentCount = 0;
        $scope.emailsList.forEach(function(thisEmail, index){
            var pIndex = providersListIds.indexOf(thisEmail.institute);
            if(pIndex != -1){
                $scope.providersList[pIndex].emailSent = true;
                $scope.emailSentCount += 1;
            }
        });
        
        $scope.showDisableConfirm = function(provider, ev) {
        
            var confirm = $mdDialog.confirm()
                .title('Would you like to diable ' + provider.name + '?')
                .textContent('Address: ' + provider.address + ', ' + provider.city + '!')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .clickOutsideToClose(true)
                .ok('Confirm')
                .cancel('Cancel');
                $mdDialog.show(confirm).then(function() {
                  $scope.disableProvider(provider);
                }, function() {
                  //nothing
                });
            
        };
        
        $scope.showSavedDialog = function(ev) {
            $mdDialog.show({
              contentElement: '#savedDialog',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true
            });
            $timeout(function(){
                $mdDialog.cancel();
            },1000)
        };
        $scope.providersList.forEach(function(thisProvider, index){
            if(!thisProvider.email || thisProvider.email.length ==0){
                thisProvider.noEmail = true;
                //$scope.noEmailCounter += 1;
            }else{
                thisProvider.noEmail = false;
            }
            
            
            if(!thisProvider.latlng){
                $scope.noMapCounter += 1;
            }
            if(institutesSaved.indexOf(thisProvider._id) != -1){
                thisProvider.cisaved = true;
            }else{
                thisProvider.cisaved = false;
            }
            
            //console.log(thisProvider.groupName);
            //console.log(institutesFilled.indexOf(thisProvider.groupName));
            if(institutesFilled.indexOf(thisProvider.groupName) != -1){
                thisProvider.cifilled = true;
                //$scope.filledCounter += 1;
            }else{
                thisProvider.cifilled = false;
            }
        });
        
        $scope.providersList.forEach(function(thisProvider, index){
            if(thisProvider.cifilled){
                $scope.filledCounter += 1;
               /* $scope.providersList.forEach(function(otherProvider, otherIndex){
                    if(otherProvider.name == thisProvider.name){
                        otherProvider.cifilled = true;
                        $scope.filledCounter += 1;
                    }
                });*/
            }
            if(!thisProvider.noEmail){
                $scope.providersList.forEach(function(otherProvider, otherIndex){
                    if(otherProvider.name == thisProvider.name){
                        otherProvider.noEmail = false;
                        //$scope.noEmailCounter -= 1;
                    }
                });
            }
            if(thisProvider.ebVerifyState && thisProvider.ebVerifyState !='' ){
                $scope.verifiedCounter += 1;
                if(thisProvider.ebVerifyState == 'Does not Exist'){
                    $scope.doesnotexistCounter += 1;
                }
                if(thisProvider.ebVerifyState == 'No Response'){
                    $scope.noresponseCounter += 1;
                }
            }
        });
        
        $scope.providersList.forEach(function(thisProvider, index){
            if(thisProvider.noEmail){
                $scope.noEmailCounter += 1;
            }
        });
        
        $scope.cityStates = targetStudyCities.data.map(function(a) {return a._id;});;
        
        var repStates = $scope.cityStates.map(function(a) {return a.state;});
        $scope.states = [];
        repStates.forEach(function(thisState, index){
            if($scope.states.indexOf(thisState) == -1){
                $scope.states.push(thisState);
            }
        });
        
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
                
                if($scope.city != 'Jaipur' && $scope.city != 'New Delhi'){
                    $scope.showLevel = 0;
                }else{
                    $scope.showLevel = 1; 
                }
                
            }
            
        }
        
        $scope.disableProvider = function(provider){
            if(provider._id){
                var instituteIds = [provider._id];
                var disableForm = {
                    instituteIds: instituteIds,
                    user: $scope.user.userId
                };
                targetStudyProviderService.bulkDisableProviders(disableForm).success(function (data, status, headers) {
                    $scope.showSavedDialog();
                })
                .error(function (data, status, header, config) {
                    console.info("Error ");
                });
            }
        };
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
                console.info("Done");
            })
            .error(function (data, status, header, config) {
                console.info("Error ");
            });
        };
        $scope.downrank = function(provider){
            targetStudyProviderService.downrank(provider._id).success(function (data, status, headers) {
                console.info("Done");
            })
            .error(function (data, status, header, config) {
                console.info("Error ");
            });
        };
        
        $scope.searchText = '';
        $scope.filterText = '';
        $scope.setFilter = function(text){
            if(text && text !=''){
                $scope.searchText = text;
                $scope.filterText = text;
            }else{
                $scope.filterText = $scope.searchText;
            }
            
            
        };
        $scope.clearFilter = function(){
            $scope.searchText = '';
            $scope.filterText = '';
        };
        //var tempFilterText = '',
        //    filterTextTimeout;
        //ABC
        /*$scope.$watch('searchText', function (newValue, oldValue, scope) {
            if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
            
            tempFilterText = newValue;
            filterTextTimeout = $timeout(function() {
                $scope.filterText = tempFilterText;
            }, 250); // delay 250 ms
        });*/
        
        
        
        
        
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
        $scope.databaseService = function(){
            targetStudyProviderService.databaseService().success(function (data, status, headers) {
                $scope.distinctStates = data;
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
        
        $scope.allDistinct = function(){
            $scope.allDistinctBool = false;
            targetStudyProviderService.allDistinct().success(function (data, status, headers) {
                alert('Done');
                //$scope.allProviderNames = data;
                //$scope.allDistinctBool = true;
                //console.info(JSON.stringify(data));
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
            
            
            var url = $scope.provider.website[0] || [];
            url = url.replace('www.','');
            url = url.replace('http://','');
            url = url.replace('https://','');
            var rightChar = url.substring(url.length-1, url.length);
            
            var pivot1 = url.indexOf('/');
            if(pivot1 != -1)
                url = url.substring(0, pivot1);
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
                console.info("Done");
            })
            .error(function (data, status, header, config) {
                console.info("Error ");
            });
        };
        
    }]); 
            
        
    exambazaar.controller("mastergetCoachingController", 
    [ '$scope', 'ProviderService','providersList','$timeout','$state','$stateParams', function($scope, ProviderService,providersList,$timeout,$state,$stateParams){
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
            $scope.profilePic = imageUrl;
        };
        $scope.addStudent = function () {
            $scope.student.parent.mobile = $scope.student.contact.mobile;
            $scope.student.parent.email = $scope.student.contact.email;
            if($scope.profilePic != ""){
                $scope.student.account = {
                    imageUrl: $scope.profilePic
                };
            }
            var saveStudent = StudentService.saveStudent($scope.student).success(function (data, status, headers) {
            var studentId = data;
            $scope.formmessage = "Student " + $scope.student.basic.firstName + " " + $scope.student.basic.lastName + " saved!";
            var newparent = $scope.student.parent;
            newparent.studentId = studentId;
            var saveParent = ParentService.saveParent(newparent).success(function (data, status, headers) {
                var parentId = data;
                $state.go('institute', {instituteId: $scope.institute._id});
            })
            .error(function (data, status, header, config) {
                console.info("Data: " + data +
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
           /* 
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
        
    exambazaar.controller("autocompleteController2", 
        [ '$scope', '$http','$state','$rootScope', 'targetStudyProviderService', function($scope, $http, $state, $rootScope, targetStudyProviderService){
        
        this.selectedItemChange = selectedItemChange;
        function selectedItemChange(item) {
            console.info('Item changed to ' + JSON.stringify(item));
            //$state.go('claim', {coachingId: item._id});
            $rootScope.reviewInstitute = item;
        };
        this.querySearch = function(query){
            if(query.length > 2){
                var cityQueryForm = {
                    query: query,
                    city: $rootScope.city
                };
                
                return targetStudyProviderService.searchCityProviders(cityQueryForm).then(function(response){
                    //console.info(response.data);
                    return response.data;
                });
            }
            
            /*return $http.get("https://api.github.com/search/users", {params: {q: query}})
            .then(function(response){
              return response.data.items;
            })*/
        };
            $rootScope.title ='Sandbox';
    }]);
    
    exambazaar.controller("coachingGroupAutocompleteController", 
        [ '$scope', '$http','$state','$rootScope', 'targetStudyProviderService', function($scope, $http, $state, $rootScope, targetStudyProviderService){
            
        this.selectedItemChange = selectedItemChange;
        function selectedItemChange(item) {
            console.info('Item changed to ' + JSON.stringify(item));
            $rootScope.coachingGroup = item;
            
            var items = $rootScope.coachingGroupItems;
            console.log(items.length);
            var coachingGroupItems = [];
            items.forEach(function(thisItem, index){
                if(thisItem.groupName == item.groupName){
                    coachingGroupItems.push(thisItem);
                }else{
                    console.log(thisItem);
                }
                
            });
            $rootScope.coachingGroupItems = coachingGroupItems;
            console.log(coachingGroupItems.length);
        };
        this.querySearch = function(query){
            if(query.length > 2){
                return targetStudyProviderService.searchCoachingGroupProviders(query).then(function(response){
                    //console.info(response.data);
                    
                    $rootScope.coachingGroupItems = response.data;
                    return response.data;
                });
            }
            
            /*return $http.get("https://api.github.com/search/users", {params: {q: query}})
            .then(function(response){
              return response.data.items;
            })*/
        };
            $rootScope.title ='Sandbox';
    }]);    
        
    exambazaar.controller("autocompleteController", 
        [ '$scope', '$http','$state','$rootScope', 'targetStudyProviderService', function($scope, $http, $state, $rootScope, targetStudyProviderService){
            
        this.selectedItemChange = selectedItemChange;
        function selectedItemChange(item) {
            console.info('Item changed to ' + JSON.stringify(item));
            $state.go('claim', {coachingId: item._id});
            
        };
        this.querySearch = function(query){
            if(query.length > 2){
                return targetStudyProviderService.searchProviders(query).then(function(response){
                    //console.info(response.data);
                    return response.data;
                });
            }
            
            /*return $http.get("https://api.github.com/search/users", {params: {q: query}})
            .then(function(response){
              return response.data.items;
            })*/
        };
            $rootScope.title ='Sandbox';
    }]);
    
    exambazaar.controller("resultAutocompleteController", 
        [ '$scope', '$http','$state', 'targetStudyProviderService', function($scope, $http, $state, targetStudyProviderService){
            
        this.selectedItemChange = selectedItemChange;
        function selectedItemChange(item) {
            console.info('Item changed to ' + JSON.stringify(item));
            $state.go('claim', {coachingId: item._id});
            
        };
        this.querySearch = function(query){
            if(query.length > 2){
                return targetStudyProviderService.searchProviders(query).then(function(response){
                    //console.info(response.data);
                    return response.data;
                });
            }
        };
    }]);
        
    exambazaar.controller("sandbox2Controller", 
        [ '$scope', '$http','$state','$rootScope','NgMap','targetStudyProviderService','targetStudyProvidersList', '$stateParams', 'targetStudyCities', 'cityProviderCount', function($scope, $http, $state, $rootScope,NgMap, targetStudyProviderService, targetStudyProvidersList, $stateParams, targetStudyCities, cityProviderCount){
            $scope.providers = targetStudyProvidersList.data;
            //$scope.filterText = 'Career Launcher';
            $scope.city = $stateParams.cityName;
            $scope.cityProviderCount = cityProviderCount.data;
            $scope.masterId = $stateParams.masterId;
            $scope.cityStates = targetStudyCities.data.map(function(a) {return a._id;});
            var repStates = $scope.cityStates.map(function(a) {return a.state;});
            $scope.states = [];
            repStates.forEach(function(thisState, index){
                if($scope.states.indexOf(thisState) == -1){
                    $scope.states.push(thisState);
                }
            });
            $scope.providers.forEach(function(thisProvider, index){
                thisProvider.mapLatLng = [thisProvider.latlng.lat, thisProvider.latlng.lng]
            });
            $scope.showProvider = function(event, provider){
                $scope.activeProvider = provider;
                if(!provider.logo || provider.logo == ''){
                    $scope.activeProvider.logo = '';
                }
                
            };
            $rootScope.title ='Sandbox 2';
    }]); 
    
    exambazaar.controller("reviewedController", 
        [ '$scope', '$http','$state','$rootScope','targetStudyProviderService', '$location', function($scope, $http, $state, $rootScope, targetStudyProviderService, $location){
            
            $rootScope.pageTitle ='Review your coaching institute';
            
            var currURL = $location.absUrl();
            $rootScope.pageURL = currURL;
            $rootScope.pageImage = 'http://www.exambazaar.com/images/logo/eblogo.png';
    }]);
        
    exambazaar.controller("reviewController", 
        [ '$scope', '$http','$state','$rootScope','targetStudyProviderService', 'allcities', '$location', function($scope, $http, $state, $rootScope, targetStudyProviderService, allcities, $location){
            
            $scope.cities = allcities.data;
            /*$scope.rankedCities = ["Delhi","Mumbai","New Delhi","Ahmedabad","Chennai","Kolkata","Hyderabad","Pune","Bangalore","Chandigarh","Jaipur","Agra","Ajmer","Allahabad","Alwar","Ambala","Amritsar","Bhilwara","Bhopal","Bikaner","Coimbatore","Dehradun","Ganganagar","Ghaziabad","Guwahati","Gwalior","Indore","Juhnjhunu","Kanpur","Kota","Kurukshetra","Lucknow","Ludhiana","Mathura","Meerut","Mohali","Mysore","Nasik","Noida","Patiala","Patna","Rajkot","Rohtak","Roorkee","Shimla","Sikar","Surat","Thrissur","Trivandrum","Vadodara","Vellore","Vishakhapatnam"];*/
            $scope.rankedCities = ["Jaipur","Kota"];
            $scope.update = function(city){
                //alert(city);
                $rootScope.city = city;
            }
            $rootScope.pageTitle ='Review your coaching institute';
            
            var currURL = $location.absUrl();
            $rootScope.pageURL = currURL;
            $rootScope.pageImage = 'http://www.exambazaar.com/images/logo/eblogo.png';
    }]);
        
    exambazaar.controller("reviewCenterController", 
    [ '$scope', '$rootScope', 'thisProvider','$location', function($scope,$rootScope, thisProvider, $location){
        $scope.provider = thisProvider.data;
        var minRating = 1;
        var maxRating = 5;
        var step = 0.5;
        $scope.ratings = [1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0];
        $scope.ratingsClasses = ["rating1","rating2","rating3","rating4","rating5","rating6","rating7","rating8","rating9"];
        $scope.minCommentLength = 140;
        
        $scope.ratingParams = [
            {name: "faculty", displayname:"Faculty", hoverVal: -1},
            {name: "peerinteraction", displayname:"Peer Interaction", hoverVal: -1},
            {name: "qualityofmaterial", displayname:"Quality of material", hoverVal: -1},
            {name: "infrastructure", displayname:"Infrastructure", hoverVal: -1},
              
        ];
        
        $scope.placeholder = "Tip: A great review covers information about Faculty, Peer Interaction, Quality of material and Infrastructure. Got recommendations for your favorite faculty and employees, or something everyone should know about " + $scope.provider.name +", " + $scope.provider.city + "? Include that too! And remember, your review needs to be atleast " + $scope.minCommentLength + " characters long :)";
        
        var paramNames = $scope.ratingParams.map(function(a) {return a.name;});
        $scope.getBackgroundColour = function(ratingParam,  paramIndex){
            var pIndex = paramNames.indexOf(ratingParam.name);
            var className = "norating";
            
            var propName = $scope.ratingParams[pIndex].name;
            var rating = $scope.userRating[propName];
            
            if(rating){
                var rIndex = $scope.ratings.indexOf(rating);
                //console.log(rIndex);
                if(paramIndex <= rIndex){
                    var rIndex2 = rIndex + 1;
                    className = "rating" + rIndex2;    
                }
                
            }
            
            if($scope.ratingParams[pIndex].hoverVal >= 0){
                className = "norating";
            };
            
            if($scope.ratingParams[pIndex].hoverVal >= paramIndex){
                
                var paramIndex2 = paramIndex + 1;
                className = "rating" + paramIndex2;
            }
            
            
            return className;
        };
        
        $scope.logMouseEvent = function(ratingParam,  paramIndex) {
            switch (event.type) {
              case "mouseenter":
                    console.log("Hey Mouse Entered");
                    break;
              case "mouseover":{
                    var pIndex = paramNames.indexOf(ratingParam.name);
                    $scope.ratingParams[pIndex].hoverVal = paramIndex;
                    break;
              }
              case "mouseout":{
                    var pIndex = paramNames.indexOf(ratingParam.name);
                    $scope.ratingParams[pIndex].hoverVal = -1;
                    break;
              }
                    
              case "mouseleave":
                console.log("Mouse Gone");
                break;

              default:
                console.log(event.type);
                break;
            };
        };
        $scope.checkRating = function(ratingParam, rateVal) {
            
            if($scope.userRating[ratingParam.name] >=rateVal){
                return true;
            }else{
                return false;
            }
        }
        $scope.userRating = {
            institute: thisProvider._id,
            comment: ''
        };
        $scope.ratingParams.forEach(function(thisParam, index){
            $scope.userRating[thisParam.name] = null;
        });
        
        $scope.setRating = function(param, value){
            $scope.userRating[param] = value;
            //console.log($scope.userRating);
        };
        $scope.invalidSubmit = function(){
            var invalid = false;
            
            $scope.ratingParams.forEach(function(thisParam, index){
                if(!$scope.userRating[thisParam.name]){
                    invalid = true;
                }
            });
            $scope.userRating.comment = $scope.userRating.comment.trim();
            $scope.userRating.comment = $scope.userRating.comment.replace(/\s+/g, " ");
            
            
            
            var commentLength = $scope.userRating.comment.length;
            //console.log(commentLength);
            if(commentLength < $scope.minCommentLength){
                invalid = true;
            }
            
            return invalid;
        };
        
        $rootScope.pageTitle = "Review " + $scope.provider.name + " " + $scope.provider.city;
        
        var currURL = $location.absUrl();
        $rootScope.pageURL = currURL;
        $rootScope.pageImage = 'http://www.exambazaar.com/images/logo/eblogo.png';
        
    }]);    
    
    exambazaar.controller("coachingGroupController", 
        [ '$scope', '$http','$state','$rootScope','targetStudyProviderService', function($scope, $http, $state, $rootScope, targetStudyProviderService){
            
            $rootScope.title ='Sandbox';
    }]);
        
    exambazaar.controller("suggestCoachingController", 
        [ '$scope', '$http','$state','$rootScope','suggestCoachingService','suggestedList', '$mdDialog', '$timeout', 'thisuser', function($scope, $http, $state, $rootScope, suggestCoachingService, suggestedList, $mdDialog, $timeout, thisuser){
            
            $scope.showSuggestions = true;
            $scope.flipMode = function(){
                $scope.showSuggestions = !$scope.showSuggestions;
            };
            $scope.suggestions = suggestedList.data;
            $scope.user = thisuser.data;
            $scope.suggestion ={
                coachingName: '',
                website: '',
                nCenters: '',
                newCoachingGroup: true,
                
            };
            
            
            
            $scope.saveSuggestion = function(){
                var suggestCoachingForm = {
                    user: $scope.user._id,
                    coachingName: $scope.suggestion.coachingName,
                    website: $scope.suggestion.website,
                    nCenters: $scope.suggestion.nCenters,
                };
                
                suggestCoachingService.savesuggestCoaching(suggestCoachingForm).success(function (data, status, headers) {
                    console.log('Done');
                    $scope.showSavedDialog();
                    $state.reload();
                })
                .error(function (data, status, header, config) {
                    console.info('Error ' + data + ' ' + status);
                });       
                
            };
            
            $scope.showSavedDialog = function(ev) {
                $mdDialog.show({
                  contentElement: '#savedDialog',
                  parent: angular.element(document.body),
                  targetEvent: ev,
                  clickOutsideToClose: true
                });
                $timeout(function(){
                    $mdDialog.cancel();
                },1000)
            };
            $rootScope.pageTitle ='Search & Review Coaching Institutes';
            
    }]); 
    
    exambazaar.controller("socialLoginController", 
        [ '$scope', '$http','$state','$rootScope', '$facebook', '$location', '$cookies', 'UserService', function($scope, $http, $state, $rootScope, $facebook, $location, $cookies, UserService){
            
            
            $rootScope.pageTitle ='Search & Review Coaching Institutes';
            
            $scope.fbLoginStatus = {};
            $scope.user = $cookies.getObject( 'sessionuser');
            $scope.loggedIn = false;
            
            $facebook.getLoginStatus().then(function(response) {
                $scope.fbLoginStatus = response;
            });
            if($scope.user && $scope.user.userId){
                $scope.loggedIn = true; 
                refresh();
            }else{
                $scope.loggedIn = false;
            }
            
            $scope.fblogin = function() {
                //console.log('Loggin into fb');
                $facebook.login().then(function(response) {
                    $scope.fbLoginStatus = response;
                    refresh();
                });   
            };
            var currURL = $location.absUrl();
            currURL = currURL.replace("localhost:8000", "exambazaar.com");
            currURL = "www.exambazaar.com/review";
            //console.log(currURL);
            $scope.fbshare = function() {
                $facebook.ui(
                     {
                      method: 'share',
                      href: currURL,
                      redirect_uri: 'http://www.exambazaar.com/', 
                      hashtag: '#exambazaar',
                      quote: 'Exambazaar: Find best coaching institutes in your city for more than 50 exams',
                      display: 'iframe',
                      mobile_iframe: true
                    }, function(response){
                        console.log("Response is: " + response);
                        if(response){
                            alert('Done');
                        }else{
                            alert('Error');
                        }
                    });
            };
            $scope.fbshare2 = function() {
                $http.get('https://www.facebook.com/dialog/share?app_id=1236747093103286&display=popup&href=http%3A%2F%2Fwww.exambazaar.com/review%2F&redirect_uri=http%3A%2F%2Fwww.exambazaar.com/reviewed')
                .success(function(data) {
                    console.log(data)
                })
                .error(function(data) {
                    alert(data);
                    console.log('Error: ' + data);
                });
            };
            $scope.fbfeed = function() {
                $facebook.ui(
                     {
                      method: 'feed',
                      link: 'http://www.exambazaar.com',
                      //redirect_uri: 'http://www.exambazaar.com/review', 
                      source: 'http://www.exambazaar.com/images/logo/eblogo.png',
                      //display: 'iframe',
                      //mobile_iframe: true
                    }, function(response){
                        alert(response);
                        console.log("Response is: ");
                        console.log(response);
                        if(response){
                            alert('Done');
                        }else{
                            alert('Error');
                        }
                    });
            };
            $scope.fbInvite = function(){
                
                
                $facebook.ui({
                    method: 'send',
                    name: 'Review your coaching institute at Exambazaar.com',
                    description: 'Be heard and help others by reviewing your coaching institute! As a goodie, unlock discounts from Exambazaar.com',
                    display: 'popup',
                    link: currURL
                },function(response) {
                    if (response) {
                        alert('Successfully Invited');
                    } else {
                        alert('Failed To Invite');
                    }
                });
            };
            
            function refresh() {
                $facebook.api("/me", {fields: 'id, name, age_range, link, gender, picture, email'}).then(
                    function(response) {
                        //console.log($scope.user);
                        
                        if($scope.user && $scope.user.userId){
                            //link the user's fb id to the current user
                            $scope.user.fbuser = {
                                name: response.name,
                                gender: response.gender,
                                image: response.picture.data.url,
                                email: response.email,
                                facebook: {
                                    link: response.link,
                                    id: response.id,
                                }
                            };
                            
                            
                        }else{
                            $scope.user = {};
                            $scope.user.fbuser = {
                                name: response.name,
                                gender: response.gender,
                                image: response.picture.data.url,
                                email: response.email,
                                facebook: {
                                    link: response.link,
                                    id: response.id,
                                }
                            };
                            //add a new user with facebook id
                        }
                        
                    },
                    function(err) {
                        $scope.welcomeMsg = "Please log in";
                        $scope.isLoggedIn = false;
                });
                $facebook.api("/me/permissions").then(
                    function(response) {
                        //console.log(response);
                        $scope.permissions = response;
                    },
                    function(err) {
                    $scope.welcomeMsg = "Permissions Error";
                });
                
            };

            //console.info($scope.user);
            
            $scope.$watch('[fbLoginStatus.status, user.fbuser.facebook.id]', function (newValue, oldValue, scope) {
                //console.log(newValue);
            if(newValue[0] == 'connected' && newValue[1]){
                $scope.fbUser = true;
                $scope.user.fbuser.facebook.accessToken = $scope.fbLoginStatus.authResponse.accessToken;
                if(!$scope.user.facebookId){
                    UserService.fbSave($scope.user).success(function (data, status, headers) {
                        
                        var fulluser = data;
                        console.log(fulluser);
                        var sessionuser = {
                            userId: fulluser._id,
                            facebookId: fulluser.facebookId,
                            userType: fulluser.userType,
                            basic: fulluser.basic,
                            image: fulluser.image,
                            mobile: fulluser.mobile,
                            email: fulluser.email,

                        };
                        $cookies.putObject('sessionuser', sessionuser);
                        $scope.user = sessionuser;
                        
                        console.log(sessionuser.userType);
                        
                        if(sessionuser.userType =='Master'){  
                            $state.go('master-dashboard', {masterId: sessionuser.userId});
                        }
                        if(sessionuser.userType =='Intern - Business Development'){
                             $state.go('assigned', {userId: sessionuser.userId});
                        }
                        if(sessionuser.userType =='Student'){
                            $state.reload();
                        }
                        if(sessionuser.userType =='Partner'){
                            $state.go('partner-dashboard', {userId: sessionuser.userId});
                        }
                        
                        
                        //$state.reload();
                    })
                    .error(function (data, status, header, config) {
                        console.info("Error ");
                    });
                }
                
                
                
                
            }

            }, true);
            
            
            
            
    }]);     
        
    exambazaar.controller("searchController", 
        [ '$scope', '$http','$state','$rootScope','NgMap','targetStudyProviderService','targetStudyProvidersList', '$facebook', '$location', function($scope, $http, $state, $rootScope,NgMap, targetStudyProviderService, targetStudyProvidersList, $facebook, $location){
            
            
            $rootScope.pageTitle ='Search & Review Coaching Institutes';
            
            
    }]); 
    
function getLatLng(thisData) {
    //console.log(thisData);
    GMaps.geocode({
        address: thisData.address,
        callback: function(results, status) {
            if (status == 'OK') {
                console.log(results[0].geometry.location.lat());
                thisData.lat = results[0].geometry.location.lat();
                thisData.lng = results[0].geometry.location.lng();
            }else{
                console.log(thisData + ' ' + status);
                thisData.na = true;
            }
        }
    });
};    
      
     exambazaar.controller("assignedToAddContactInfoController", 
        [ '$scope', 'thisuser' , 'thisuserAssignedToAddContactInfo',  '$http','$state','$rootScope', function($scope, thisuser, thisuserAssignedToAddContactInfo, $http, $state, $rootScope){
        $scope.user = thisuser.data;
        $scope.assigned = thisuserAssignedToAddContactInfo.data;
        $scope.assignedCount = 0;
        if($scope.user.userType =='Master' || $scope.user.userType =='Intern - Business Development'){
            $scope.authorized = true;
        }
        $scope.assigned.forEach(function(thisAssigned, index){
            
            if(thisAssigned.active){
                $scope.assignedCount += 1;
            }
        });
        //console.log($scope.assignedCount);
        $rootScope.title =$scope.user.basic.name;
    }]);    
        
    exambazaar.controller("assignedToVerifyController", 
        [ '$scope', 'thisuser' , 'thisuserAssignedToVerify',  '$http','$state','$rootScope', function($scope, thisuser, thisuserAssignedToVerify, $http, $state, $rootScope){
        $scope.user = thisuser.data;
        $scope.assigned = thisuserAssignedToVerify.data;
        console.log($scope.assigned);
        $scope.assignedCount = 0;
        if($scope.user.userType =='Master' || $scope.user.userType =='Intern - Business Development'){
            $scope.authorized = true;
        }
        $scope.assigned.forEach(function(thisAssigned, index){
            
            if(thisAssigned.active){
                $scope.assignedCount += 1;
            }
        });
        //console.log($scope.assignedCount);
        $rootScope.title =$scope.user.basic.name;
    }]);  
      
    exambazaar.controller("assignedController", 
        [ '$scope', 'thisuser' , 'thisuserAssigned',  '$http','$state','$rootScope', function($scope, thisuser, thisuserAssigned, $http, $state, $rootScope){
        $scope.user = thisuser.data;
        $scope.assigned = thisuserAssigned.data;
        $scope.assignedCount = 0;
        if($scope.user.userType =='Master' || $scope.user.userType =='Intern - Business Development'){
            $scope.authorized = true;
        }
        $scope.assigned.forEach(function(thisAssigned, index){
            
            if(thisAssigned.active){
                $scope.assignedCount += 1;
            }
        });
        //console.log($scope.assignedCount);
        $rootScope.title =$scope.user.basic.name;
    }]);  
    
    exambazaar.controller("filledCIController", 
        [ '$scope', 'thisuser' , 'thisuserFilled',  '$http','$state','$rootScope', function($scope, thisuser, thisuserFilled, $http, $state, $rootScope){
        $scope.user = thisuser.data;
        $scope.authorized = true;
        if($state.current.name == 'filledAll' ){
            if($scope.user.userType !='Master'){
                $scope.authorized = false;
                if($scope.user._id){
                    $state.go('filled', {userId: $scope.user._id});
                }
            }
        }
            
        $scope.filterText = '';
        $scope.setUser = function(name){
            $scope.filterText = name;
        };
        $scope.clear = function(){
            $scope.filterText = '';
        };
        $scope.filled = thisuserFilled.data;
        $scope.uniqueUsers = [];
        $scope.uniqueInstitutes = [];
        $scope.filled.forEach(function(thisFill, index){
            if($scope.uniqueUsers.indexOf(thisFill.userName) == -1){
                $scope.uniqueUsers.push(thisFill.userName);
            }
        });
        $rootScope.title =$scope.user.basic.name;
    }]);    
    exambazaar.controller("shortlistedController", 
        [ '$scope', 'thisuser' , 'thisuserShortlisted',  '$http','$state','$rootScope', function($scope, thisuser, thisuserShortlisted, $http, $state, $rootScope){
        $scope.user = thisuser.data;
        $scope.shortlisted = thisuserShortlisted.data;
        
        $rootScope.title =$scope.user.basic.name;
    }]);    
    exambazaar.controller("viewedController", 
        [ '$scope', 'thisuser' , 'thisuserViewed',  '$http','$state','$rootScope', function($scope, thisuser, thisuserViewed, $http, $state, $rootScope){
        $scope.user = thisuser.data;
        $scope.viewed = thisuserViewed.data;
        
        $rootScope.title =$scope.user.basic.name;
    }]);     
        
    exambazaar.controller("checkLogoController", 
        [ '$scope', 'thisuser','logoList' , '$http','$state', '$rootScope', '$cookies', 'UserService', 'targetStudyProviderService', function($scope, thisuser, logoList, $http,$state,$rootScope, $cookies, UserService, targetStudyProviderService){
        $scope.user = thisuser.data;
        $scope.logoList = logoList.data;
        if($scope.user.userType =='Master'){
            $scope.showLevel = 10;
        }
        $scope.logoList.forEach(function(thisLogo, index){
            //if(index >= 24)
            thisLogo.mark = true;
        });
        $scope.markChecked = function(){
            var ids = [];
            $scope.logoList.forEach(function(thisLogo, index){
                if(thisLogo.mark){
                    ids.push(thisLogo._id);
                }
            });
            var checkLogoForm = {
                ids: ids    
            };
            targetStudyProviderService.bulkCheckLogos(checkLogoForm).success(function (data, status, headers) {
               
                alert('Marked');
            })
            .error(function (data, status, header, config) {
                console.info('Error ' + data + ' ' + status);
            });
        };
            
        if($scope.user.basic)
            $rootScope.title =$scope.user.basic.name;
    }]);       
        
    exambazaar.controller("profileController", 
        [ '$scope', 'thisuser' , '$http','$state', '$rootScope', '$cookies', 'Upload', 'ImageService', 'UserService', 'ipService', '$facebook', function($scope, thisuser,$http,$state,$rootScope, $cookies, Upload, ImageService, UserService, ipService, $facebook){
        $scope.user = thisuser.data;
        if($cookies.getObject('sessionuser')){
            var sessionuser = $cookies.getObject( 'sessionuser');
        }
        
        //console.log($scope.user);    
           
            
        $scope.uploadPic = function (newPic) {
            //var pic = $scope.newPic;
            var pic = [newPic];
            var nFiles = pic.length;
            
            var counter = 0;
            console.log(JSON.stringify($scope.user));
            var userId = $scope.user._id;
            if (pic && pic.length) {
            
            pic.forEach(function(thisFile, index){
            var fileInfo = {
                filename: thisFile.name,
                contentType: thisFile.type
            }; ImageService.s3Credentials(fileInfo).success(function (data, status, headers) {
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
                var picLink = $(resp.data).find('Location').text();
                
                var newPicForm ={
                    image: picLink,
                    userId: userId
                };
                
                UserService.addPic(newPicForm).success(function (data, status, headers) {
                    counter = counter + 1;
                    if(counter == nFiles){
                    
                        
                    if($cookies.getObject('sessionuser')){
                        var sessionuser = $cookies.getObject( 'sessionuser');
                        sessionuser.image = picLink;
                        $cookies.putObject('sessionuser', sessionuser);
                    }

                    $state.reload();
                    }
                })
                .error(function (data, status, header, config) {
                    console.info("Error ");
                });
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                }, function (evt) {
                    
                });

            })
            .error(function (data, status, header, config) {
                console.info("Error");
            });   
                 
            });
            }
         };
        
        GMaps.geolocate({
          success: function(position) {
            map.setCenter(position.coords.latitude, position.coords.longitude);
          },
          error: function(error) {
            alert('Geolocation failed: '+error.message);
          },
          not_supported: function() {
            alert("Your browser does not support geolocation");
          },
          always: function() {
            alert("Done!");
          }
        });    
            
        $scope.$on('mapInitialized', function(evt, evtMap) {
            $scope.map = evtMap;
            
            var latlng = {
                lat: $scope.map.markers[0].getPosition().lat(),
                lng: $scope.map.markers[0].getPosition().lng()
            };
            console.info(latlng);
            if(latlng.lat && latlng.lng && latlng.lat !='' && latlng.lng !=''){
                
                //console.info('Hi');
                //console.info($scope.user);
                var positionForm = {
                    userId: $scope.user._id,
                    latlng: latlng
                };
                
                UserService.markLatLng(positionForm).success(function (data, status, headers) {
                    console.info('Position marked: ' + JSON.stringify(latlng));
                })
                .error(function (data, status, header, config) {
                    console.info(status + " " + data);    
                });
            }
        });

            
        if($scope.user.basic)
            $rootScope.title =$scope.user.basic.name;
            
        $facebook.getLoginStatus().then(function(response) {
            $scope.fbLoginStatus = response;
        });
        if($scope.user && $scope.user.userId){
            $scope.loggedIn = true; 
            refresh();
        }else{
            $scope.loggedIn = false;
        }

        $scope.fblogin = function() {
            //console.log('Loggin into fb');
            $facebook.login().then(function(response) {
                $scope.fbLoginStatus = response;
                refresh();
            });   
        };
            
        function refresh() {
                $facebook.api("/me", {fields: 'id, name, age_range, link, gender, picture, email'}).then(
                    function(response) {
                        //console.log($scope.user);
                        
                        if($scope.user && $scope.user.userId){
                            //link the user's fb id to the current user
                            $scope.user.fbuser = {
                                name: response.name,
                                gender: response.gender,
                                image: response.picture.data.url,
                                email: response.email,
                                facebook: {
                                    link: response.link,
                                    id: response.id,
                                }
                            };
                            
                            
                        }else{
                            $scope.user = {};
                            $scope.user.fbuser = {
                                name: response.name,
                                gender: response.gender,
                                image: response.picture.data.url,
                                email: response.email,
                                facebook: {
                                    link: response.link,
                                    id: response.id,
                                }
                            };
                            //add a new user with facebook id
                        }
                        
                    },
                    function(err) {
                        $scope.welcomeMsg = "Please log in";
                        $scope.isLoggedIn = false;
                });
                $facebook.api("/me/permissions").then(
                    function(response) {
                        //console.log(response);
                        $scope.permissions = response;
                    },
                    function(err) {
                    $scope.welcomeMsg = "Permissions Error";
                });
                
            };

            //console.info($scope.user);
            
            $scope.$watch('[fbLoginStatus.status, user.fbuser.facebook.id]', function (newValue, oldValue, scope) {
                //console.log(newValue);
            if(newValue[0] == 'connected' && newValue[1]){
                $scope.fbUser = true;
                $scope.user.fbuser.facebook.accessToken = $scope.fbLoginStatus.authResponse.accessToken;
                if(!$scope.user.facebookId){
                    UserService.fbSave($scope.user).success(function (data, status, headers) {
                        
                        var fulluser = data;
                        console.log(fulluser);
                        var sessionuser = {
                            userId: fulluser._id,
                            facebookId: fulluser.facebookId,
                            userType: fulluser.userType,
                            basic: fulluser.basic,
                            image: fulluser.image,
                            mobile: fulluser.mobile,
                            email: fulluser.email,

                        };
                        $cookies.putObject('sessionuser', sessionuser);
                        $scope.user = sessionuser;
                        
                        console.log(sessionuser.userType);
                        
                        if(sessionuser.userType =='Master'){  
                            $state.go('master-dashboard', {masterId: sessionuser.userId});
                        }
                        if(sessionuser.userType =='Intern - Business Development'){
                             $state.go('assigned', {userId: sessionuser.userId});
                        }
                        if(sessionuser.userType =='Student'){
                            $state.reload();
                        }
                        if(sessionuser.userType =='Partner'){
                            $state.go('partner-dashboard', {userId: sessionuser.userId});
                        }
                        
                        
                        //$state.reload();
                    })
                    .error(function (data, status, header, config) {
                        console.info("Error ");
                    });
                }
                
                
                
                
            }

            }, true);
                
            
            
            
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
    exambazaar.controller("addGroupController", 
        [ '$scope',  'groupList','GroupService','$http','$state', function($scope, groupList, GroupService,$http,$state){
            
        $scope.groups = groupList.data;
        $scope.newgroups = [
            {
                group: 'Jamboree'
            }
        ];
        $scope.bulkAddMode = true;
        $scope.setBulkAddMode = function(){
            $scope.bulkAddMode = !$scope.bulkAddMode;
        };
         
        $scope.addGroup = function () {
            var saveGroup = GroupService.saveGroups([$scope.group]).success(function (data, status, headers) {
               
                alert("Group saved: " + $scope.group.media + ' > ' + $scope.group.type + ' > ' + $scope.group.subType);
            })
            .error(function (data, status, header, config) {
                console.info('Error ' + data + ' ' + status);
            });
        };
            
        $scope.addGroups = function(){
            $scope.newgroups.pop();
            $scope.newgroups.pop();
            $scope.newgroups.pop();
            $scope.newgroups.pop();
            $scope.newgroups.pop();
            
            GroupService.saveGroups($scope.newgroups).success(function (data, status, headers) {
                alert('Groups Saved!');
                })
                .error(function (data, status, header, config) {
                    console.info('Error: ' + data);
                });      
        };
        $scope.setGroup = function(group){
            $scope.group = group;
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
    
    exambazaar.controller("eligibilityController", 
        [ '$scope',  'examList','streamList','EligibilityService','$http','$state', 'eligibilityList', '$mdDialog', function($scope, examList,streamList, EligibilityService,$http,$state, eligibilityList, $mdDialog){
        $scope.examNames = '';    
        $scope.exams = examList.data;
        
        $scope.eligibilityList = eligibilityList.data;
        $scope.elgVerified = false;
        $scope.activeExamEligibility = null;
        
        $scope.showExamEligibility = function(examElig){
            $scope.activeExamEligibility = examElig;
            $scope.showExamEligDialog();
        };
        $scope.showExamEligDialog = function(ev) {
            $mdDialog.show({
              contentElement: '#examEligDialog',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true
            });
        };
            
        var examNameHelper = $scope.exams.map(function(a) {return a.displayname;});
        var examIdHelper = $scope.exams.map(function(a) {return a._id;});
        $scope.eligibilityList.forEach(function(thisEligibility, index){
            
            var examName = thisEligibility.exam.displayname;
            thisEligibility.examName = examName;
        });
            
        $scope.exams.forEach(function(thisExam, eIndex){
            $scope.examNames += thisExam.displayname+',';
        });
        //console.info($scope.examNames);    
        $scope.streams = streamList.data;
        $scope.categoryOptions = ["general","sc","st","obc"];
        $scope.educationLevels = [
            {
                level: 0,
                name: "I-X"
            },
            {
                level: 2,
                name: "XI / XII / After XII"
            },
            /*{
                level: 2,
                name: "After XII (Drop Year)"
            },*/
            {
                level: 3,
                name: "In UG or equivalent"
            },
            {
                level: 4,
                name: "During or After Final Year of UG"
            },
            {
                level: 5,
                name: "During or After Final Year of PG"
            },
        ];
        $scope.class12Subjects = [
            {
                name: "english",
                displayname: "English"
            },
            {
                name: "physics",
                displayname: "Physics"
            },
            {
                name: "chemistry",
                displayname: "Chemistry"
            },
            {
                name: "mathematics",
                displayname: "Mathematics"
            },
            {
                name: "biology",
                displayname: "Biology"
            },
            {
                name: "biotechnology",
                displayname: "Biotechnology"
            },
            {
                name: "others",
                displayname: "Others"
            },
        ];
        $scope.undergradMajors = [
            {
                name: "btech",
                displayname: "B.Tech."
            },
            {
                name: "be",
                displayname: "B.E."
            },
            {
                name: "mbbs",
                displayname: "M.B.B.S."
            },
            {
                name: "bds",
                displayname: "B.D.S."
            },
            {
                name: "bsc",
                displayname: "B.Sc."
            },
            {
                name: "ba",
                displayname: "B.A."
            },
            {
                name: "bftech",
                displayname: "NIFT B.F.Tech."
            },
            {
                name: "bcom",
                displayname: "B.Com."
            },	
            {
                name: "barch",
                displayname: "B. Arch."
            },
            {
                name: "llb",
                displayname: "LL.B."
            },
            {
                name: "others",
                displayname: "Others"
            },
            {
                name: "fiveyearballb",
                displayname: "Five Year B.A. LL.B."
            },
            {
                name: "fiveyearintegratedllb",
                displayname: "Five Year Integrated LL.B. (Hons.)"
            },
            
            {
                name: "lawdegreeequivalenttollb",
                displayname: "Law Degree equivalent to LL.B."
            },
            {
                name: "professionalcourseequivalenttobtech",
                displayname: "Professional Courses equivalent to B.E. / B.Tech."
            },

        ];
        $scope.postgradMajors = [
            {
                name: "mba",
                displayname: "M.B.A."
            },
            {
                name: "ms",
                displayname: "M.S."
            },
            {
                name: "mtech",
                displayname: "M.Tech."
            },
            {
                name: "mcom",
                displayname: "M.Com."
            },
            {
                name: "msc",
                displayname: "M.Sc."
            },
            {
                name: "ma",
                displayname: "M.A."
            },
            {
                name: "mca",
                displayname: "M.C.A."
            },
            {
                name: "llm",
                displayname: "LL.M."
            },
            {
                name: "others",
                displayname: "Others"
            },

        ];
            
        $scope.setCategory = function(categoryName){
            $scope.categoryOptions.forEach(function(thisCategory, index){
                $scope.elgInput.category[thisCategory] = false;
            });
            $scope.elgInput.category[categoryName] = true;
            
        };
        $scope.setEducationLevel = function(educationLevel){
            $scope.elgInput.educationLevel = educationLevel;
        };
        $scope.setPWD = function(truefalse){
            $scope.elgInput.category.pwd = truefalse;
        };
        $scope.setClass12Subjects = function(class12Subject){
            $scope.elgInput.class12Subjects[class12Subject] = true;
        };
        $scope.unsetClass12Subjects = function(class12Subject){
            $scope.elgInput.class12Subjects[class12Subject] = false;
        };
        $scope.setUndergradMajor = function(undergradMajor){
            $scope.undergradMajors.forEach(function(thisUndergrad, index){
                $scope.elgInput.undergradMajor[thisUndergrad.name] = false;
            });
            $scope.elgInput.undergradMajor[undergradMajor] = true;
        };
        $scope.setPostgradMajor = function(postgradMajor){
            $scope.postgradMajors.forEach(function(thisPostgrad, index){
                $scope.elgInput.postgradMajor[thisPostgrad.name] = false;
            });
            $scope.elgInput.postgradMajor[postgradMajor] = true;
        };
        $scope.elgInput = {
            category: {
                general: true,
                sc: false,
                st: false,
                obc: false,
                pwd: false,
            },
            age: null,
            educationLevel:{
                level: null,
                name: null
            },
            class12Subjects:{
                biology: false,
                chemistry: false,
                biotechnology: false,
                physics: false,
                mathematics: false,
                english: false,
                others: false
            },
            class12Percentage: null,
            undergradMajor:{
                mbbs: false,
                bds: false,
                bsc: false,
                bftech: false,
                be: false,
                btech: false,
                bcom: false,
                ba: false,
                barch: false,
                llb: false,
                fiveyearintegratedllb: false,
                fiveyearballb: false,
                lawdegreeequivalenttollb: false,
                others: false,
            },
            undergradPercentage: null,
            postgradMajor:{
                mcom: false,
                msc: false,
                ma: false,
                mca: false,
                mtech: false,
                mba: false,
                ms: false,
                llm: false,
                others: false,
            },
            postgradPercentage: null,
            
        };
            
        $scope.elgInput = {
            category: {
                general: true,
                sc: false,
                st: false,
                obc: false,
                pwd: false,
            },
            age: 18,
            educationLevel:{
                level: null,
                name: null
            },
            class12Subjects:{
                biology: false,
                chemistry: true,
                biotechnology: false,
                physics: true,
                mathematics: true,
                english: true,
                others: false
            },
            class12Percentage: 90,
            undergradMajor:{
                mbbs: false,
                bds: false,
                bsc: false,
                bftech: false,
                be: false,
                btech: false,
                bcom: false,
                ba: false,
                barch: false,
                llb: false,
                fiveyearintegratedllb: false,
                fiveyearballb: false,
                lawdegreeequivalenttollb: false,
                others: false,
            },
            undergradPercentage: null,
            postgradMajor:{
                mcom: false,
                msc: false,
                ma: false,
                mca: false,
                mtech: false,
                mba: false,
                ms: false,
                llm: false,
                others: false,
            },
            postgradPercentage: null,
            
        };
        $scope.editQualifications = function(){
            $scope.elgVerified = false;
        };
        $scope.scrollTop = function(){
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        };
        $scope.checkEligibility = function(){
            console.info($scope.elgInput);
            
            $scope.error = false;
            var error = false;
            var errorClass12Subjects = true;
            var errorUnderGradMajor = true;
            var errorPostGradMajor = true;
            var errorMessages = [];
            
            if(!$scope.elgInput.age){
                error = true;
                errorMessages.push("Please select your age");
            }
            
            if($scope.elgInput.educationLevel.level == null){
                error = true;
                errorMessages.push("Please select your current education level");
            }
           
            
            if($scope.elgInput.educationLevel.level && $scope.elgInput.educationLevel.level>=1){
                
                $scope.class12Subjects.forEach(function(thisSubject, index){
                    if($scope.elgInput.class12Subjects[thisSubject.name]){
                        errorClass12Subjects = false;
                    }
                    
                });
            }
            
            if($scope.elgInput.educationLevel.level && $scope.elgInput.educationLevel.level>=1 && errorClass12Subjects){
                error = true;
                errorMessages.push("Please select your Class XII Subjects");
            }
            
            if($scope.elgInput.educationLevel.level && $scope.elgInput.educationLevel.level>=3){
                if(!$scope.elgInput.class12Percentage){
                    error = true;
                    errorMessages.push("Please select your Class XII Percentage");
                }
            }
            
            if($scope.elgInput.educationLevel.level && $scope.elgInput.educationLevel.level>=3){
                $scope.undergradMajors.forEach(function(thisMajor, index){
                    if($scope.elgInput.undergradMajor[thisMajor.name]){
                        errorUnderGradMajor = false;
                    }
                    if(index == $scope.undergradMajors.length - 1 && errorUnderGradMajor){
                        error = errorUnderGradMajor;
                        errorMessages.push("Please select your Undergraduate Major");
                    }
                });
            }
            if($scope.elgInput.educationLevel.level && $scope.elgInput.educationLevel.level>=4){
                if(!$scope.elgInput.undergradPercentage){
                    error = true;
                    errorMessages.push("Please select your Undergraduate Percentage (or equivalent CGPA)");
                }
            }
            
            if($scope.elgInput.educationLevel.level && $scope.elgInput.educationLevel.level>=5){
                $scope.postgradMajors.forEach(function(thisMajor, index){
                    if($scope.elgInput.postgradMajor[thisMajor.name]){
                        errorPostGradMajor = false;
                    }
                    if(index == $scope.postgradMajors.length - 1 && errorPostGradMajor){
                        error = errorPostGradMajor;
                        errorMessages.push("Please select your Postgraduate Major");
                    }
                });
            }
            if($scope.elgInput.educationLevel.level && $scope.elgInput.educationLevel.level>=5){
                if(!$scope.elgInput.postgradPercentage){
                    error = true;
                    errorMessages.push("Please select your achieved or expected Postgraduate Percentage (or equivalent CGPA)");
                }
            }
            
            
            if(error){
                $scope.error = true;
                $scope.errorMessages = errorMessages;
            }else{
            
            $scope.elgVerified = true;    
            $scope.validEligibilities = [];    
            $scope.uniqueValidEligibilities = [];
            var checkExamIds = ['58cedb079eef5e0011c17e91'];
            $scope.eligibilityList.forEach(function(thisEligibility, index){
                
            var checkCategory = thisEligibility.category.applicable;
            var checkAge = thisEligibility.age.applicable;
            var checkClass12Subjects = thisEligibility.class12Subjects.applicable;
            var checkClass12Percentage = thisEligibility.class12Percentage.applicable;
            var checkUndergradMajor = thisEligibility.undergradMajor.applicable;
            var checkUndergradPercentage = thisEligibility.undergradPercentage.applicable;
            var checkPostgradMajor = thisEligibility.postgradMajor.applicable;
            var checkPostgradPercentage = thisEligibility.postgradPercentage.applicable;
            var valid = true;
            if(checkCategory){
                var categoryBool = false;
                $scope.categoryOptions.forEach(function(thisItem, itemIndex){
                    if(thisEligibility.category[thisItem] && $scope.elgInput.category[thisItem]){
                        categoryBool = true;
                        //console.info(index + " " + valid + " " + thisItem + " " + thisEligibility._id);
                    }
                });
                if(!categoryBool){
                    valid = false;
                        /*if(checkExamIds.indexOf(thisEligibility.exam._id) != -1){
                            console.info(index + " " + valid + " " + thisItem + " " + thisEligibility._id);
                        }*/
                }
                
            }
            if(checkAge){
                if($scope.elgInput.age < thisEligibility.age.minage || $scope.elgInput.age > thisEligibility.age.maxage){
                    valid = false;
                    if(checkExamIds.indexOf(thisEligibility.exam._id) != -1){
                        console.info(index + " " + valid + " " + thisEligibility._id);
                    }
                    //console.info(index + " " + valid + " " + thisEligibility._id);
                }
            }
            if(checkClass12Subjects){
                
                if($scope.elgInput.educationLevel.level < 1){
                    valid = false;
                }
                $scope.class12Subjects.forEach(function(thisItem, itemIndex){
                    if(thisEligibility.class12Subjects[thisItem.name] && !$scope.elgInput.class12Subjects[thisItem.name]){
                        valid = false;
                        if(checkExamIds.indexOf(thisEligibility.exam._id) != -1){
                            console.info(index + " " + valid + " " + thisItem.name + " " + thisEligibility._id);
                        }
                        //console.info(index + " " + valid + " " + thisItem.name + " " + thisEligibility._id);
                    }
                });
            }    
            if(checkClass12Percentage){
                if(thisEligibility.class12Percentage.minPercentage && $scope.elgInput.class12Percentage < thisEligibility.class12Percentage.minPercentage){
                    valid = false;
                    //console.info(index + " " + valid + " " + thisEligibility._id);
                }
                if($scope.elgInput.class12Percentage == null || $scope.elgInput.class12Percentage == 0){
                    valid = false;
                }
            }    
            if(checkUndergradMajor){
                var undergradBool = false;
                if($scope.elgInput.educationLevel.level < 3){
                    valid = false;
                }
                $scope.undergradMajors.forEach(function(thisItem, itemIndex){
                    if(thisEligibility.undergradMajor[thisItem.name] && $scope.elgInput.undergradMajor[thisItem.name]){
                        undergradBool = true;
                        //console.info(index + " " + valid + " " + thisItem.name + " "+ thisEligibility._id);
                    }
                });
                if(!undergradBool){
                    valid = false;
                    //console.info(index + " " + valid + " " + thisEligibility._id);
               }
            }
            if(checkUndergradPercentage){
                if(thisEligibility.undergradPercentage.minPercentage && $scope.elgInput.undergradPercentage < thisEligibility.undergradPercentage.minPercentage){
                    valid = false;
                    //console.info(index + " " + valid + " " + thisEligibility._id);
                }
                if($scope.elgInput.undergradPercentage == null || $scope.elgInput.undergradPercentage == 0){
                    valid = false;
                }
            }    
            if(checkPostgradMajor){
                var postgradBool = false;
                if($scope.elgInput.educationLevel.level < 5){
                    valid = false;
                }
                $scope.postgradMajors.forEach(function(thisItem, itemIndex){
                    if(thisEligibility.postgradMajor[thisItem.name] && $scope.elgInput.postgradMajor[thisItem.name]){
                        postgradBool = true;
                    }
                });
                if(!postgradBool){
                    valid = false;
                    //console.info(index + " " + valid + " " + thisEligibility._id);
               }
            }    
            if(checkPostgradPercentage){
                if(thisEligibility.postgradPercentage.minPercentage && $scope.elgInput.postgradPercentage < thisEligibility.postgradPercentage.minPercentage){
                    valid = false;
                    //console.info(index + " " + valid + " " + thisEligibility._id);
                }
                if($scope.elgInput.postgradPercentage == null || $scope.elgInput.postgradPercentage == 0){
                    valid = false;
                }
            } 
                
            if(valid){
                //console.info(thisEligibility.level + " " + $scope.elgInput.educationLevel.level);
                if(thisEligibility.level >= $scope.elgInput.educationLevel.level){
                    $scope.validEligibilities.push(thisEligibility);
                }
                
            }
                
            });
            
            $scope.validStreamExams = [];
            var uniqueStreamIds = [];
            var uniqueExamIds = [];
            
            $scope.validEligibilities.forEach(function(thisEligibility, eligIndex){
                var streamId = thisEligibility.exam.stream._id;
                var examId = thisEligibility.exam._id;
                
                var sIndex = uniqueStreamIds.indexOf(streamId);
                if(sIndex == -1){
                    uniqueStreamIds.push(streamId);
                    var streamexam = {
                        stream: thisEligibility.exam.stream,
                        examEligs: []
                    };
                    var newExamElig = {
                        exam: thisEligibility.exam,
                        eligibilitys: [thisEligibility]
                    };
                    streamexam.examEligs.push(newExamElig);
                    $scope.validStreamExams.push(streamexam);
                }else{
                    
                    var thisStreamExam = $scope.validStreamExams[sIndex];
                    var eIndex = -1;
                    thisStreamExam.examEligs.forEach(function(thisExamElig, examEligIndex){
                        if(thisExamElig.exam._id == examId){
                            eIndex = examEligIndex;
                        }
                    });
                    
                    if(eIndex != -1){
                        thisStreamExam.examEligs[eIndex].eligibilitys.push(thisEligibility);
                    }else{
                        var newExamElig = {
                            exam: thisEligibility.exam,
                            eligibilitys: [thisEligibility]
                        };
                        thisStreamExam.examEligs.push(newExamElig);
                    }
                    
                }
            });
                
            console.log($scope.validStreamExams);
            $scope.scrollTop();    
            /*var uniqueValidExamIds = [];
            $scope.validEligibilities.forEach(function(thisEligibility, examIndex){
                //console.log(thisEligibility);
                var eIndex = uniqueValidExamIds.indexOf(thisEligibility.exam._id);
                if(eIndex == -1){
                    $scope.uniqueValidEligibilities.push(thisEligibility);
                    uniqueValidExamIds.push(thisEligibility.exam._id);
                }else{
                    
                }
            });*/
                
                
            
            
            }
            
        };
            
    }]); 
    exambazaar.controller("addEligibilityController", 
        [ '$scope',  'examList','streamList','EligibilityService','$http','$state', 'eligibilityList', function($scope, examList,streamList, EligibilityService,$http,$state, eligibilityList){
        $scope.examNames = '';    
        $scope.exams = examList.data;
        
        $scope.newEligibility = eligibilityList.data;
        if(!$scope.newEligibility){
            $scope.newEligibility = [];
        }
        
        var examNameHelper = $scope.exams.map(function(a) {return a.displayname;});
        var examIdHelper = $scope.exams.map(function(a) {return a._id;});
        $scope.newEligibility.forEach(function(thisEligibility, index){
            
            var examName = thisEligibility.exam.displayname;
            thisEligibility.examName = examName;
        });
            
        $scope.exams.forEach(function(thisExam, eIndex){
            $scope.examNames += thisExam.displayname+',';
        });
        //console.info($scope.examNames);    
        $scope.streams = streamList.data;
        
        $scope.addEligibility = function () {
            var eligibilitys = [];
            $scope.newEligibility.forEach(function(thisEligibility, index){
                var eIndex = examNameHelper.indexOf(thisEligibility.examName);
               
                var exam = null;
                if(eIndex != -1){
                    exam = $scope.exams[eIndex]._id;
                    thisEligibility.exam = exam;
                }
                if(exam){
                    eligibilitys.push(thisEligibility);
                }else{
                    if(thisEligibility.examName){
                        console.info("Please check exam name: " + thisEligibility.examName +". You need to match it exactly.");
                    }
                    
                }
                
            });
            
            var saveEligibility = EligibilityService.bulksaveEligibility(eligibilitys).success(function (data, status, headers) {
                alert("Eligibilities saved!");
            })
            .error(function (data, status, header, config) {
                console.info('Error ' + data + ' ' + status);
            });
        };
        $scope.setExam = function(exam){
            $scope.exam = exam;
        };
    }]);    
    exambazaar.controller("addExamController", 
        [ '$scope',  'examList','streamList','ExamService','$http','$state', '$mdDialog', 'ImageService', 'Upload', '$timeout', function($scope, examList,streamList, ExamService,$http,$state, $mdDialog, ImageService, Upload, $timeout){
        $scope.exams = examList.data;
            
        
        $scope.streams = streamList.data;
        $scope.resultFormats = [
            "Rank",
            "Percentile",
            "Percentage",
            "Marks",
            "Pass/Fail",

        ];
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
            if(!$scope.exam.logo){
                $scope.exam.logo = '';
            }
            
        };
        $scope.showSavedDialog = function(ev) {
            $mdDialog.show({
              contentElement: '#savedDialog',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true
            });
            $timeout(function(){
                $mdDialog.cancel();
            },1000)
        };
        $scope.saveExamFirstDialog = function(ev) {
            $mdDialog.show({
              contentElement: '#saveExamFirstDialog',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true
            });
            $timeout(function(){
                $mdDialog.cancel();
            },1000)
        }; 
            
        $scope.uploadLogo = function (newlogo) {
            var logo = [newlogo];
            var nFiles = logo.length;
            
            var counter = 0;
            if (logo && logo.length) {
            
            logo.forEach(function(thisFile, index){
            var fileInfo = {
                filename: thisFile.name,
                contentType: thisFile.type
            }; ImageService.s3Credentials(fileInfo).success(function (data, status, headers) {
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
                var logoLink = $(resp.data).find('Location').text();
                
                var newLogoForm ={
                    logo: logoLink,
                    examId: $scope.exam._id
                };
                console.info(newLogoForm);
                
                if(newLogoForm.examId){
                    ExamService.addLogo(newLogoForm).success(function (data, status, headers) {
                        counter = counter + 1;
                        $scope.showSavedDialog();
                        $state.reload();
                    })
                    .error(function (data, status, header, config) {
                        console.info("Error ");
                    });
                }else{
                    $scope.saveExamFirstDialog();
                }
                
                
                
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                }, function (evt) {
                    
                });

            })
            .error(function (data, status, header, config) {
                console.info("Error");
            });   
                 
            });
            }
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
                name: 'Lakshana Gopi',
                gender: 'Female',
                //dob: new Date("April 29, 1989")
            },
            contact: {
                mobile: '9940179709',
                email: 'lakiilaksh28@gmail.com'
            }
        };
            
        $scope.internTypes =[
            'Intern - Business Development',
            'Intern - Content'
        ];    
        
        $scope.addIntern = function () {
            console.info(JSON.stringify($scope.intern));
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
        
        
    exambazaar.controller("bulkDisableController", 
        [ '$scope', 'UserService', '$http', '$state', 'thisuser', 'targetStudyProviderService', function($scope, UserService,$http,$state, thisuser, targetStudyProviderService){
        $scope.user = thisuser.data;
        if($scope.user.userType =='Master'){
            $scope.showLevel = 10;
        }
        if($scope.user._id == '5922d8dbe20d000011b025e5'){
            $scope.showLevel = 10;
        }
        $scope.disableinstitutes =[];
        $scope.disableinstitute = {
            _id: ''
        };
        
        $scope.disableInstitutes = function(){
            var institutes = [];
            $scope.disableinstitutes.forEach(function(thisinstitute, iIndex){
                if(thisinstitute._id){
                    //console.log(thisinstitute._id);
                    institutes.push(thisinstitute);
                }
            });
            
            var disableForm = {
                user: $scope.user._id,
                instituteIds: institutes
            };
            $scope.disabledIds = institutes;
            console.log(institutes.length);
            targetStudyProviderService.bulkDisableProviders(disableForm).success(function (data, status, headers) {
                //$scope.disabledIds = data;
                console.info("Done");
            })
            .error(function (data, status, header, config) {
                console.info("Error ");
            });
        };
        $scope.claimInstitute = function(){
            if($scope.addedInstituteId){
                $state.go('claim', {coachingId: $scope.addedInstituteId});
            }
        };
    }]);        
        
    exambazaar.controller("addInstituteController", 
        [ '$scope', 'UserService', '$http', '$state', 'thisuser', 'targetStudyProviderService', function($scope, UserService,$http,$state, thisuser, targetStudyProviderService){
        $scope.user = thisuser.data;
        console.log($scope.user);
        if($scope.user.userType =='Master'){
            $scope.showLevel = 10;
        }
        if($scope.user._id == '5922d8dbe20d000011b025e5'){
            $scope.showLevel = 10;
        }
            
        $scope.newinstitutes =[];
        $scope.newInstitute = {
            name:'',
            groupName:'',
            address:'',
            city:'',
            state:'',
            pincode:'',
        };
        $scope.addInstitute = function(){
            //DEF
            $scope.newInstitute.groupName = $scope.newInstitute.name;
             var saveProvider = {
                targetStudyProvider:$scope.newInstitute,
                user: $scope.user.userId
            };
            targetStudyProviderService.saveProvider(saveProvider).success(function (data, status, headers) {
                $scope.addedInstituteId = data;
                console.info("Done");
            })
            .error(function (data, status, header, config) {
                console.info("Error ");
            });
        };
        
        $scope.addInstitutes = function(){
            var institutes = [];
            $scope.newinstitutes.forEach(function(thisinstitute, iIndex){
                if(thisinstitute.name && thisinstitute.name != ''){
                    thisinstitute.groupName = thisinstitute.name;
                    var saveProvider = {
                        targetStudyProvider:thisinstitute,
                        user: $scope.user._id
                    };
                    
                    institutes.push(saveProvider);
                }
            });
            console.log(institutes);
            targetStudyProviderService.bulkSaveProviders(institutes).success(function (data, status, headers) {
                $scope.addedInstituteIds = data;
                console.info("Done");
            })
            .error(function (data, status, header, config) {
                console.info("Error ");
            });
        };
        $scope.claimInstitute = function(){
            if($scope.addedInstituteId){
                $state.go('claim', {coachingId: $scope.addedInstituteId});
            }
        };
    }]);    
        
        
    exambazaar.controller("sitemapController", 
        [ '$scope','$http','$state','cities', function($scope,$http,$state,cities){
        /*$scope.urlpart1 = 'http://www.exambazaar.com/stream/';
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
            
        });*/
            
        
        var part1 = ["http://www.exambazaar.com/stream/engineering/JEE%20Advanced/","http://www.exambazaar.com/stream/engineering/BITSAT/","http://www.exambazaar.com/stream/engineering/GATE/","http://www.exambazaar.com/stream/engineering/NATA/","http://www.exambazaar.com/stream/medical/AIPMT/","http://www.exambazaar.com/stream/medical/AIIMS/","http://www.exambazaar.com/stream/medical/AFMC/","http://www.exambazaar.com/stream/cacs/CA%20CPT/","http://www.exambazaar.com/stream/cacs/CS%20Foundation%20Exam/","http://www.exambazaar.com/stream/school/NTSE%20Exam/","http://www.exambazaar.com/stream/school/KVPY/","http://www.exambazaar.com/stream/mba/CAT/","http://www.exambazaar.com/stream/mba/XAT/","http://www.exambazaar.com/stream/mba/SNAP/","http://www.exambazaar.com/stream/law/CLAT/","http://www.exambazaar.com/stream/law/LSAT/","http://www.exambazaar.com/stream/law/AILET/","http://www.exambazaar.com/stream/foreigneducation/SAT/","http://www.exambazaar.com/stream/foreigneducation/GMAT/","http://www.exambazaar.com/stream/foreigneducation/GRE/","http://www.exambazaar.com/stream/foreigneducation/IELTS/","http://www.exambazaar.com/stream/foreigneducation/TOEFL/","http://www.exambazaar.com/stream/civilservices/Civil%20Services%20Exam/","http://www.exambazaar.com/stream/civilservices/IFS%20Exam/","http://www.exambazaar.com/stream/civilservices/IES~2FISS%20Exam/","http://www.exambazaar.com/stream/ssc/SSC%20CGLE/","http://www.exambazaar.com/stream/ssc/SSC%20CHSL%20Exam/","http://www.exambazaar.com/stream/ssc/SSC%20CMLE/","http://www.exambazaar.com/stream/ssc/SSC%20CPO%20(S.I)%20Exam/","http://www.exambazaar.com/stream/ssc/SSC%20JE/","http://www.exambazaar.com/stream/bank/SBI%20PO%20Exam/","http://www.exambazaar.com/stream/bank/IBPS%20PO%20CWE/","http://www.exambazaar.com/stream/bank/IBPS%20Clerk%20CWE/","http://www.exambazaar.com/stream/bank/RBI%20Assistant%20Exam/","http://www.exambazaar.com/stream/defence/NDA%20Exam/","http://www.exambazaar.com/stream/defence/CDS%20Exam/","http://www.exambazaar.com/stream/defence/I.A.F.%20Exam/","http://www.exambazaar.com/stream/defence/I.N.A%20Exam/","http://www.exambazaar.com/stream/defence/AFCAT/","http://www.exambazaar.com/stream/insurance/IRDA%20Exam/","http://www.exambazaar.com/stream/insurance/LIC%20AAO%20Exam/","http://www.exambazaar.com/stream/insurance/L.I.C%20D.O/","http://www.exambazaar.com/stream/insurance/G.I.C%20Exam/"];    
        var part2 = ["Delhi","Mumbai","New%20Delhi","Ahmedabad","Chennai","Kolkata","Hyderabad","Pune","Bangalore","Chandigarh","Jaipur","Agra","Ajmer","Allahabad","Alwar","Ambala","Amritsar","Bhilwara","Bhopal","Bikaner","Coimbatore","Dehradun","Ganganagar","Ghaziabad","Guwahati","Gwalior","Indore","Juhnjhunu","Kanpur","Kota","Kurukshetra","Lucknow","Ludhiana","Mathura","Meerut","Mohali","Mysore","Nasik","Noida","Patiala","Patna","Rajkot","Rohtak","Roorkee","Shimla","Sikar","Surat","Thrissur","Trivandrum","Vadodara","Vellore","Vishakhapatnam"];
        var urls = [];
        $scope.urls = [];
        part1.forEach(function(thispart1, p1Index){
            part2.forEach(function(thispart2, p2Index){
                var newUrl = '<url><loc>' + thispart1 + thispart2+'</loc><changefreq>daily</changefreq><priority>1.0</priority></url>';
                urls.push(newUrl);
            });
        });
        $scope.urls = urls;
            
    }]);       
        
        
    exambazaar.controller("sendEmailController", 
        [ '$scope','$http','$state','EmailService', 'targetStudyProviderService', 'thisuser','$mdDialog', '$timeout', 'thisuserEmails', 'tofillciService', function($scope,$http,$state,EmailService, targetStudyProviderService, thisuser,$mdDialog, $timeout, thisuserEmails, tofillciService){
            $scope.fetchEmails = function(){
                tofillciService.sendEmails().success(function (data, status, headers) {
                    var response = data;
                    var uniqueIds = [];
                    
                    response.forEach(function(thisId, pIndex){
                        if(uniqueIds.indexOf(thisId) == -1){
                            uniqueIds.push(thisId);
                        }
                    });
                    
                    $scope.bulkEmails = uniqueIds;
                    console.info(JSON.stringify(uniqueIds.length));
                    
                })
                .error(function (data, status, header, config) {
                    console.info('Error ' + data + ' ' + status);
                });  
            };
            //$scope.fetchEmails();
            $scope.setBulkProvider = function(bulkEmailProviderId){
                $scope.email.instituteId = bulkEmailProviderId;
            };
            $scope.user = thisuser.data;
            $scope.userEmails = thisuserEmails.data;
            $scope.sendingMode = true;
            $scope.flipSendingMode = function(){
                $scope.sendingMode = !$scope.sendingMode;
            };
            $scope.email = {
                to: '',
                templateName: 'Claim CI Email - 5thApril2017',
                sender: '',
                senderId: '',
                from: '',
                subject: '',
                html: "",
                instituteName:'',
                instituteAddress:'',
                institutePhoneMobile:'',
                instituteId:'',
                logo:''
            };
            $scope.instituteIds =[
                "5870d1271a807f0011545809",
                "587139ba5f53bc1f94b0210a",
                "5870f6dab2a1c11da8740271",
                "5870f236b2a1c11da8740236",
                "5870ff60b2a1c11da87402df",
                "5870f7cdb2a1c11da874027d",
                "5870f7d5b2a1c11da874027e",
                "5870fcadb2a1c11da87402be",
                "58e3707a76035205d401c22f",
                "587138cf5f53bc1f94b020ff",
                "5870d1271a807f001154580b",
                "58713a045f53bc1f94b0210c",
                "5870ce8d1131e4320865fc81",
                "5870ef6280ea0e069889091c",
                "5870f328b2a1c11da8740242",
                "5870f6efb2a1c11da8740273",
                "5870f787b2a1c11da874027c",
                "587138b25f53bc1f94b020fc",
                "587139275f53bc1f94b02101",
                "587139495f53bc1f94b02103",
                "5870d1271a807f0011545806",
                "5870f86bb2a1c11da8740287",
                "587126eb72dbba182cb4a644",
                "587137ad5f53bc1f94b020ee",
                "5870d1271a807f0011545807",
                "58f5ed043d592300f42b5c72"
            ];
            $scope.update = function(instituteId){
                $scope.email.instituteId = instituteId;
            };
            $scope.setEmail = function(email){
                $scope.email.to = email;
            };
            
            $scope.showSentDialog = function(ev) {
            $mdDialog.show({
                  contentElement: '#sentDialog',
                  parent: angular.element(document.body),
                  targetEvent: ev,
                  clickOutsideToClose: true
                });
                $timeout(function(){
                    $mdDialog.cancel();
                },8000)
            };
            
            $scope.showErrorDialog = function(ev) {
            $mdDialog.show({
                  contentElement: '#errorDialog',
                  parent: angular.element(document.body),
                  targetEvent: ev,
                  clickOutsideToClose: true
                });
                $timeout(function(){
                    $mdDialog.cancel();
                },9000)
            };
            $scope.templateNames = [
                /*'Survey Email - 11March2017',*/
                'Claim CI Email - 5thApril2017',
                'Follow Up 1 to CIs',
            ];
            $scope.showLevel = 0;
            
            if($scope.user.userType=='Master'){
                $scope.showLevel = 10;
                $scope.email.from = $scope.user.email;
                $scope.email.sender = $scope.user.basic.name;
                $scope.email.senderId = $scope.user._id;
            }else{
                if($scope.user.userType=='Intern - Business Development'){
                    if($scope.user._id == '58c8e895bbaebf3560545f19' || $scope.user._id == '59085f0fc7289d0011d6ea8c' || $scope.user._id == '58e5fdd86c9be422e4820d7e'){
                        $scope.showLevel = 10;
                        $scope.email.from = 'always@exambazaar.com';
                        $scope.email.sender = 'Exambazaar';
                        $scope.email.senderId = $scope.user._id;
                    }
                }
            }
            $scope.$watch('email.instituteId', function (newValue, oldValue, scope) {
            if(newValue != null && newValue != ''){
                //console.info(newValue);
                //DEF
                var newValueArr = newValue.split("/");
                newValue = newValueArr[newValueArr.length-1];
                //$scope.email.instituteId = newValue;
                //console.info(newValue);
                if(newValue.length > 5){
                //alert($scope.email.instituteId);
                 targetStudyProviderService.getProviderBasic(newValue).success(function (data, status, headers) {
                if(data){
                    //console.info(data);
                    var refreshedProvider = data.provider;
                    
                    if(data.emailSent){
                        $scope.emailSent = data.emailSent;
                        $scope.emailSent.forEach(function(thisEmail, eIndex){
                            thisEmail.fromNow = moment(thisEmail._date).fromNow();;
                        });
                    }
                    
                    $scope.provider = refreshedProvider;
                    //console.log(emailSent);
                    $scope.email.to ='';
                    $scope.email.instituteName = $scope.provider.name;
                    $scope.email.instituteAddress = $scope.provider.address + ', ' + $scope.provider.city;
                    if($scope.provider.pincode){
                        $scope.email.instituteAddress += $scope.provider.pincode;
                    }
                    
                    $scope.email.institutePhoneMobile = '';
                    
                    $scope.provider.mobile.forEach(function(thisMobile, mIndex){
                        if(mIndex == 0){
                           $scope.email.institutePhoneMobile += 'Mobile: ';
                        }
                        
                        $scope.email.institutePhoneMobile += thisMobile;
                        if(mIndex != $scope.provider.mobile.length - 1){
                            $scope.email.institutePhoneMobile += ', ';
                        }
                    });

                    $scope.provider.phone.forEach(function(thisPhone, pIndex){
                        if(pIndex == 0){
                           $scope.email.institutePhoneMobile += ' Phone: ';
                        }
                        
                        $scope.email.institutePhoneMobile += thisPhone;
                        if(pIndex != $scope.provider.phone.length - 1){
                        $scope.email.institutePhoneMobile += ', ';
                        }
                    });
                    //console.log($scope.email.institutePhoneMobile);
                    
                    $scope.email.instituteId = $scope.provider._id;
                    $scope.email.logo = $scope.provider.logo;
                    $scope.email.subject = $scope.provider.name + " - Don't Wait! Claim Your Free Exambazaar Listing Now";
                }
                }).error(function (data, status, header, config) {
                    console.info("Error ");
                });
                }




            }

            }, true);
            
            $scope.sendEmail = function() {
                //
                EmailService.sendGrid($scope.email).success(function (data, status, headers) {
                    var response = data;
                    console.info(JSON.stringify(response));
                    if(response.statusCode == '202'){
                        $scope.showSentDialog();
                    }else{
                        $scope.showErrorDialog();
                    }
                    //alert(JSON.stringify(data));
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
        
    exambazaar.factory('metaService', function () {
        var title = 'Exambazaar: Select the stream you want to study',
        description = 'Exambazaar is India’s biggest and largest education discovery platform and is the fastest way to discover best coaching institutes in your city. Our easy-to-use website shows you all the coaching institutes based on study streams, along with courses, photos, vidoes and results. Exambazaar also provides comprehensive information for test prep for entrance exams in India, colleges, courses, universities and career options. You can find information about more than 50 exams and coaching institutes to succeed',
        service = {
            title: getTitle,
            setTitle: setTitle,
            description: getDescription,
            setDescription: setDescription
        };
        return service;
        function getTitle() {
            return title;
        }
        function setTitle(newTitle) {
            //alert(newTitle);
            title = newTitle;
        }
        function getDescription() {
            return description;
        }
        function setDescription(newDescription) {
            description = newDescription;
        }
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
    }]);
        
    exambazaar.config(['ngMetaProvider', function configConf(ngMetaProvider) {
        ngMetaProvider.useTitleSuffix(true);
        ngMetaProvider.setDefaultTitle('Search, Compare and Apply for Exam Preparation');
        ngMetaProvider.setDefaultTitleSuffix(' | Exambazaar - results, fees, faculty, photos, vidoes, reviews of Coaching Institutes in India');
        ngMetaProvider.setDefaultTag('description', 'Exambazaar is India’s biggest and largest education discovery platform and is the fastest way to discover best coaching institutes in your city. Our easy-to-use website shows you all the coaching institutes based on study streams, along with courses, photos, vidoes and results. Exambazaar also provides comprehensive information for test prep for entrance exams in India, colleges, courses, universities and career options. You can find information about more than 50 exams and coaching institutes to succeed | Exambazaar - results, fees, faculty, photos, vidoes, reviews of Coaching Institutes in India');
        ngMetaProvider.setDefaultTag('author', 'Gaurav Parashar');
    }]);    
    //exambazaar.constant('moment', require('moment-timezone'));
    /*exambazaar.value('angularMomentConfig', {
        timezone: 'Asia/Calcutta|Asia/Kolkata' // e.g. 'Europe/London'
    });*/   
    
    exambazaar.config(function ($httpProvider) {
        $httpProvider.interceptors.push(function($q, $location) {
          return {
            response: function(response) {
              // do something on success
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
    $urlRouterProvider.otherwise('/');
    $stateProvider
        //landing page
    
        .state('landing', {
            url: '/',
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
            },
            resolve: {
                 data: function($rootScope) {
                    $rootScope.pageTitle = 'Exambazaar: Find best coaching institutes in your city for 50+ Indian exams';
                    $rootScope.pageDescription = "Exambazaar:find best coaching institutes in your city. Browse courses, photos, vidoes and results for over 50 entrance exams in India";
                 }
            }
        })
        .state('login', {
            url: '/login',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'login.html',
                    controller: 'loginController'
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            }
        })
        .state('main', {
            url: '/stream',
            views: {
                'header':{
                    templateUrl: 'header2.html',
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
            url: '/stream/:categoryName',
            views: {
                'header':{
                    templateUrl: 'header2.html',
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
            url: '/stream/:categoryName/:subCategoryName/',
            views: {
                'header':{
                    templateUrl: 'header2.html',
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
            url: '/stream/:categoryName/:subCategoryName/:cityName', //masterId?
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
            url: '/stream/:categoryName/:subCategoryName/:cityName/:coachingId', //masterId?
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
        .state('showGroup', {
            url: '/group/:categoryName/:subCategoryName/:cityName/:groupName', //masterId?
            views: {
                'header':{
                    templateUrl: 'header1.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'showGroup.html',
                    controller: 'showGroupController',
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
                examList: ['ExamService',
                    function(ExamService){
                    return ExamService.getExams();
                }],
                streamList: ['StreamService',
                    function(StreamService){
                    return StreamService.getStreams();
                }],
                thisGroup: ['targetStudyProviderService','$stateParams',
                    function(targetStudyProviderService,$stateParams) {
                    var groupCity = {
                        groupName: $stateParams.groupName,
                        cityName: $stateParams.cityName
                        
                    };
                    return targetStudyProviderService.getGroupCity(groupCity);
                }],
                provider: function() { return {}; }
                
            }
        })
        .state('oldclaim', {
            url: '/oldclaim/:coachingId', //masterId?
            views: {
                'header':{
                    templateUrl: 'header1.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'oldclaim.html',
                    controller: 'oldClaimController',
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
                thisGroupInfo: ['targetStudyProviderService','$stateParams',
                    function(targetStudyProviderService,$stateParams) {  
                    return targetStudyProviderService.getGroupInfo($stateParams.coachingId);
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
                cisavedUsersList: ['targetStudyProviderService', '$stateParams',
                    function(targetStudyProviderService,$stateParams) {  
                    return targetStudyProviderService.cisavedUsers($stateParams.coachingId);
                }],
                
                provider: function() { return {}; }
                
            }
        })
        .state('verifyClaim', {
            url: '/verifyClaim/:coachingId', //masterId?
            views: {
                'header':{
                    templateUrl: 'header1.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'verifyClaim.html',
                    controller: 'verifyClaimController',
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
        
        .state('socialLogin', {
            url: '/socialLogin', //masterId?
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'socialLogin.html',
                    controller: 'socialLoginController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                provider: function() { return {}; }
                
            }
        })
    
        .state('search', {
            url: '/search', //masterId?
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'search.html',
                    controller: 'searchController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                targetStudyProvidersList: ['targetStudyProviderService','$stateParams',
                    function(targetStudyProviderService) {   
                    return targetStudyProviderService.coachingAddressService();
                }],
                provider: function() { return {}; }
                
            }
        })
        .state('suggestCoaching', {
            url: '/user/:userId/suggestCoaching', //masterId?
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'suggestCoaching.html',
                    controller: 'suggestCoachingController',
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
                
                suggestedList: ['suggestCoachingService','$stateParams',
                    function(suggestCoachingService) {   
                    return suggestCoachingService.getsuggestCoachings();
                }],
                provider: function() { return {}; }
                
            }
        })
        .state('coachingGroup', {
            url: '/user/:userId/coachingGroup', //masterId?
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'coachingGroup.html',
                    controller: 'coachingGroupController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                provider: function() { return {}; }
                
            }
        })
        .state('review', {
            url: '/review', //masterId?
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'review.html',
                    controller: 'reviewController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                allcities: ['targetStudyProviderService','$stateParams',
                    function(targetStudyProviderService) {
                    return targetStudyProviderService.getCities();
                }],
                provider: function() { return {}; }
                
            }
        })
        .state('reviewed', {
            url: '/reviewed', //masterId?
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'reviewed.html',
                    controller: 'reviewedController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                thisProvider: ['targetStudyProviderService','$stateParams',
                    function(targetStudyProviderService,$stateParams) {  
                    return targetStudyProviderService.getProviderReview($stateParams.coachingId);
                }],
                provider: function() { return {}; }
                
            }
        })
        .state('reviewCenter', {
            url: '/reviewcenter/:coachingId', //masterId?
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'reviewCenter.html',
                    controller: 'reviewCenterController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                thisProvider: ['targetStudyProviderService','$stateParams',
                    function(targetStudyProviderService,$stateParams) {  
                    return targetStudyProviderService.getProviderReview($stateParams.coachingId);
                }],
                allcities: ['targetStudyProviderService','$stateParams',
                    function(targetStudyProviderService) {
                    return targetStudyProviderService.getCities();
                }],
                provider: function() { return {}; }
                
            }
        })
        .state('sandbox2', {
            url: '/master/:masterId/sandbox2/:cityName', //masterId?
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'sandbox2.html',
                    controller: 'sandbox2Controller',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                targetStudyProvidersList: ['targetStudyProviderService','$stateParams',
                    function(targetStudyProviderService,$stateParams) {
                    return targetStudyProviderService.sandbox2Service($stateParams.cityName);
                }],
                cityProviderCount: ['targetStudyProviderService','$stateParams',
                    function(targetStudyProviderService,$stateParams) {
                    return targetStudyProviderService.getCityProviderCount($stateParams.cityName);
                }],
                targetStudyCities: ['targetStudyProviderService','$stateParams',
                    function(targetStudyProviderService) {
                    return targetStudyProviderService.getCities();
                }],
                provider: function() { return {}; }
                
            }
        })
        .state('eligibility', {
            url: '/user/:userId/eligibility', //masterId?
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'eligibility.html',
                    controller: 'eligibilityController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                eligibilityList: ['EligibilityService',
                    function(EligibilityService){
                    return EligibilityService.getEligibilities();
                }],
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
            url: '/user/:userId/sendEmail',
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
            },
            resolve: {
                
                thisuser: ['UserService', '$stateParams',
                    function(UserService,$stateParams){
                    return UserService.getUser($stateParams.userId);
                }],
                thisuserEmails: ['UserService', '$stateParams',
                    function(UserService,$stateParams){
                    return UserService.getEmails($stateParams.userId);
                }],
                user: function() { return {}; }
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
            url: '/coaching/database2/:city', //masterId?
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
            url: '/edit/database1/:coachingId', //masterId?
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
                    return targetStudyProviderService.getProvidersWithAreas();
                }],
                provider: function() { return {}; }
            }
        })
        
        
        .state('targetStudyProviders', {
            url: '/coaching/database1/:city', //masterId?
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
                    return targetStudyProviderService.getProviders($stateParams.city);
                }],
                institutesSavedList: ['cisavedService',
                    function(cisavedService) {   
                    return cisavedService.institutesSaved();
                }],
                institutesFilledList: ['tofillciService',
                    function(tofillciService) {   
                    return tofillciService.institutesFilled();
                }],
                emailList: ['EmailService',
                    function(EmailService) {   
                    return EmailService.getEmails();
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
                studentCount: ['UserService',
                    function(UserService) {
                    return UserService.getStudentCount();
                }],
                masterViewSummary: ['viewService',
                    function(viewService) {
                    return viewService.masterViewSummary();
                }],
                internList: ['UserService',
                    function(UserService) {
                    return UserService.getInterns();
                }],
                coachingCount: ['targetStudyProviderService',
                    function(targetStudyProviderService) {
                    return targetStudyProviderService.getCount();
                }],
                coachingSavedCount: ['cisavedService',
                    function(cisavedService) {
                    return cisavedService.savedCount();
                }],
                filledCount: ['tofillciService',
                    function(tofillciService) {
                    return tofillciService.filledCount();
                }],
                tofillciList: ['tofillciService',
                    function(tofillciService) {
                    return tofillciService.gettofillcis();
                }],
                toverifyciList: ['toverifyciService',
                    function(toverifyciService) {
                    return toverifyciService.gettoverifycis();
                }],
                addContactInfoList: ['addContactInfoService',
                    function(addContactInfoService) {
                    return addContactInfoService.getaddContactInfos();
                }],
                verifiedCount: ['toverifyciService',
                    function(toverifyciService) {
                    return toverifyciService.verifiedCount();
                }],
            }
        })
        /*.state('master-tofill', {
            url: '/master/:masterId/tofill',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'master-tofill.html',
                    controller: 'masterToFillController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                internList: ['UserService',
                    function(UserService) {
                    return UserService.getInterns();
                }],
                filledCount: ['tofillciService',
                    function(tofillciService) {
                    return tofillciService.filledCount();
                }],
                tofillciList: ['tofillciService',
                    function(tofillciService) {
                    return tofillciService.gettofillcis();
                }],
            }
        })*/
        .state('partner-dashboard', {
            url: '/partner/:userId/dashboard',
            views: {
                'header':{
                    templateUrl: 'header1.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'partner-dashboard.html',
                    controller: 'partnerDashboardController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                //DEF
                thisPartner: ['UserService','$stateParams',
                    function(UserService,$stateParams) {  
                    return UserService.getPartner($stateParams.userId);
                }],
                provider: function() { return {}; }
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
        .state('shortlisted', {
            url: '/user/:userId/shortlisted',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'shortlisted.html',
                    controller: 'shortlistedController',
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
                thisuserShortlisted: ['UserService', '$stateParams',
                    function(UserService,$stateParams){
                    return UserService.getUserShortlisted($stateParams.userId);
                }],
                
                user: function() { return {}; }
            }
        })
        .state('viewed', {
            url: '/user/:userId/viewed',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'viewed.html',
                    controller: 'viewedController',
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
                //DEF
                thisuserViewed: ['viewService', '$stateParams',
                    function(viewService,$stateParams){
                    return viewService.getuserviews($stateParams.userId);
                }],
                
                user: function() { return {}; }
            }
        })
        .state('filled', {
            url: '/user/:userId/filled',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'filled.html',
                    controller: 'filledCIController',
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
                thisuserFilled: ['UserService', '$stateParams',
                    function(UserService,$stateParams){
                    return UserService.getUserFilled($stateParams.userId);
                }],
                
                user: function() { return {}; }
            }
        })
        .state('assigned', {
            url: '/user/:userId/assigned',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'assigned.html',
                    controller: 'assignedController',
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
                thisuserAssigned: ['tofillciService', '$stateParams',
                    function(tofillciService,$stateParams){
                    return tofillciService.getusertofillcis($stateParams.userId);
                        //ABC
                }],
                
                user: function() { return {}; }
            }
        })
        .state('assignedToVerify', {
            url: '/user/:userId/assignedToVerify',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'assignedToVerify.html',
                    controller: 'assignedToVerifyController',
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
                thisuserAssignedToVerify: ['toverifyciService', '$stateParams',
                    function(toverifyciService,$stateParams){
                    return toverifyciService.getusertoverifycis($stateParams.userId);
                        //ABC
                }],
                
                user: function() { return {}; }
            }
        })
        .state('assignedToAddContactInfo', {
            url: '/user/:userId/assignedToAddContactInfo',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'assignedToAddContactInfo.html',
                    controller: 'assignedToAddContactInfoController',
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
                thisuserAssignedToAddContactInfo: ['addContactInfoService', '$stateParams',
                    function(addContactInfoService,$stateParams){
                    return addContactInfoService.getuseraddContactInfos($stateParams.userId);
                        //ABC
                }],
                
                user: function() { return {}; }
            }
        })
        .state('filledAll', {
            url: '/user/:userId/filledAll',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'filled.html',
                    controller: 'filledCIController',
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
                thisuserFilled: ['UserService', '$stateParams',
                    function(UserService,$stateParams){
                    return UserService.getUserFilled('all');
                }],
                
                user: function() { return {}; }
            }
        })
    
        .state('group', {
            url: '/user/:userId/group',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'group.html',
                    controller: 'groupController',
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
        .state('profile', {
            url: '/user/:userId/profile',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'profile.html',
                    controller: 'profileController',
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
        .state('checkLogo', {
            url: '/user/:userId/checkLogo/:pageNumber/',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'checkLogo.html',
                    controller: 'checkLogoController',
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
                logoList: ['targetStudyProviderService', '$stateParams',
                    function(targetStudyProviderService, $stateParams) {
                    return targetStudyProviderService.checkLogo($stateParams.pageNumber);
                }],
                
                user: function() { return {}; }
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
        .state('addGroup', {
            url: '/addGroup',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'addGroup.html',
                    controller: 'addGroupController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                groupList: ['GroupService',
                    function(GroupService){
                    return GroupService.getGroups();
                }],
                group: function() { return {}; }
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
        .state('addEligibility', {
            url: '/addEligibility',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'addEligibility.html',
                    controller: 'addEligibilityController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                eligibilityList: ['EligibilityService',
                    function(EligibilityService){
                    return EligibilityService.getEligibilities();
                }],
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
        .state('addInstitute', {
            url: '/master/:userId/addInstitute',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'addInstitute.html',
                    controller: 'addInstituteController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                //GHI
                thisuser: ['UserService', '$stateParams',
                    function(UserService,$stateParams){
                    return UserService.getUser($stateParams.userId);
                }],
                user: function() { return {}; }
            }
        })
        .state('bulkDisable', {
            url: '/master/:userId/bulkDisable',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'bulkDisable.html',
                    controller: 'bulkDisableController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                //GHI
                thisuser: ['UserService', '$stateParams',
                    function(UserService,$stateParams){
                    return UserService.getUser($stateParams.userId);
                }],
                user: function() { return {}; }
            }
        })
        .state('addIntern', {
            url: '/user/:userId/addIntern',
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
            $locationProvider.html5Mode(true);
            //$locationProvider.hashPrefix("!");
        });
        
    })();

exambazaar.run(function($rootScope,$mdDialog, ngMeta, $location) {
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
    ngMeta.init();
    var currURL = $location.absUrl();
    $rootScope.pageURL = currURL;
    $rootScope.pageImage = 'http://www.exambazaar.com/images/logo/eblogo.png';
    
    
    
    // If we've already installed the SDK, we're done
     if (document.getElementById('facebook-jssdk')) {return;}

     // Get the first script element, which we'll use to find the parent node
     var firstScriptElement = document.getElementsByTagName('script')[0];

     // Create a new script element and set its id
     var facebookJS = document.createElement('script'); 
     facebookJS.id = 'facebook-jssdk';

     // Set the new script's source to the source of the Facebook JS SDK
     facebookJS.src = '//connect.facebook.net/en_US/all.js';

     // Insert the Facebook JS SDK into the DOM
     firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
    
});


function generateOtp(min, max) {
    min = 1000;
    max = 9999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function compare(dateTimeA, dateTimeB) {
    var momentA = moment(dateTimeA,"DD/MM/YYYY");
    var momentB = moment(dateTimeB,"DD/MM/YYYY");
    if (momentA > momentB) return 1;
    else if (momentA < momentB) return -1;
    else return 0;
};



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

exambazaar.directive('affixer', function ($window) {
    return {
        restrict: 'A',
        link: function ($scope, $element) {
            var win = angular.element($window);
            var topOffset = $element[0].offsetTop;
            
            function affixElement() {              
                
                console.log($window.pageYOffset);
                
                if ($window.pageYOffset > topOffset) {
                    $element.css('position', 'fixed');
                    $element.css('top', '0px');
                } else {
                    $element.css('position', '');
                    $element.css('top', '');
                }
            }
            
            $scope.$on('$routeChangeStart', function() {
                win.unbind('scroll', affixElement);
            });
            win.bind('scroll', affixElement);                        
        }
    };
});
exambazaar.directive('onlyDigits', function () {
    return {
      require: 'ngModel',
      restrict: 'A',
      link: function (scope, element, attr, ctrl) {
        function inputValue(val) {
          if (val) {
            var digits = val.replace(/[^0-9]/g, '');

            if (digits !== val) {
              ctrl.$setViewValue(digits);
              ctrl.$render();
            }
            return parseInt(digits,10);
          }
          return undefined;
        }            
        ctrl.$parsers.push(inputValue);
      }
    };
});
exambazaar.directive("limitTo", [function() {
    return {
        restrict: "A",
        link: function(scope, elem, attrs) {
            var limit = parseInt(attrs.limitTo);
            angular.element(elem).on("keypress", function(e) {
                if (this.value.length == limit) e.preventDefault();
            });
        }
    }
}]);

exambazaar.directive("moveNextOnMaxlength", function() {
    return {
        restrict: "A",
        link: function($scope, element) {
            element.on("input", function(e) {
                if(element.val().length == element.attr("ng-maxlength")) {
                    var $nextElement = element.next();
                    if($nextElement.length) {
                        $nextElement[0].focus();
                    }
                }
            });
        }
    }
});

exambazaar.directive('www.exambazaar.com', function(){
    return {
        scope: {},
        link:function(scope,element){
            element.on('copy', function (event) {
              event.preventDefault();
            });
        }
    };
});