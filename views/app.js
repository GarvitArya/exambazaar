function AppCtrl(SidebarJS) {
  this.toggleSidebarJS = toggleSidebarJS;
  this.sidebarIsVisible = isVisibleSidebarJS;
  this.onSidebarOpen = onSidebarOpen;
  this.onSidebarClose = onSidebarClose;
  this.changePosition = changePosition;

  function toggleSidebarJS(sidebarName) {
    SidebarJS.toggle(sidebarName);
  }

  function isVisibleSidebarJS(sidebarName) {
    return SidebarJS.isVisible(sidebarName);
  }

  function onSidebarOpen() {
    console.log('is open!');
  }

  function onSidebarClose() {
    console.log('is close!');
  }

  function changePosition(newPosition) {
    SidebarJS.setPosition(newPosition);
  }
}
//'ngHandsontable','angular-medium-editor','angular-timeline', 'chart.js', ui.bootstrap, mgcrea.bootstrap.affix
var exambazaar = angular.module('exambazaar', ['angular-clipboard','angular-google-gapi','angular-loading-bar','duScroll','youtube-embed', 'material.svgAssetsCache', 'ngAnimate','ngAria','ngCookies', 'ngGeolocation', 'ngMap', 'ngMaterial', 'ngMaterialDatePicker', 'ngSanitize', 'ngSidebarJS', 'ngtweet','ngFacebook','oc.lazyLoad', '720kb.socialshare', 'ui.router', 'ui-notification']);
//,'ngHandsontable''ngHandsontable',,'ng','seo', 'angular-medium-editor-insert-plugin', 'htmlToPdfSave', ui.bootstrap
    (function() {
    'use strict';
    angular
    .module('exambazaar')
    .config(function($mdThemingProvider, $facebookProvider, NotificationProvider, $ocLazyLoadProvider) {
        $mdThemingProvider
            .theme("default")
            .primaryPalette("teal");
        
        $facebookProvider.setAppId('1236747093103286');
        $facebookProvider.setPermissions("public_profile,email"); //, user_education_history, publish_actions
        //$anchorScrollProvider.disableAutoScrolling();
        NotificationProvider.setOptions({
            delay: 10000,
            startTop: 20,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'right',
            positionY: 'bottom'
        });
        
        $ocLazyLoadProvider.config({
          modules: [
            {
              name: 'ngHandsontable',
              files: [
                    'handsontable.min.js',
                    'ngHandsontable.min.js',
                    'handsontable.full.css'
              ]
            },
            {
              name: 'mediumEditor',
              files: [
                    'jquery.min.js',
                    'https://cdnjs.cloudflare.com/ajax/libs/medium-editor/5.23.1/js/medium-editor.min.js',
                    'https://cdnjs.cloudflare.com/ajax/libs/medium-editor/5.23.1/css/medium-editor.min.css',
                    'https://cdnjs.cloudflare.com/ajax/libs/medium-editor/5.23.1/css/themes/tim.min.css',
                    'angular-medium-editor.js',
                    'medium-editor-tables.js',
                    'css/medium-editor-tables.css',

              ]
            },
            {
              name: 'angularTimeline',
              files: [
                    'angular-timeline.js',
                    'css/angular-timeline.css',
                    'css/angular-timeline-animations.css',
                    'css/angular-timeline-bootstrap.css',
              ]
            },
            {
              name: 'charting',
              files: [
                    'Chart.min.js',
                    'angular-chart.min.js'
              ]
            },
            {
              name: 'angularClipboard',
              files: [
                    'angular-clipboard.js',
              ]
            },
            {
              name: 'ngFileUpload',
              files: [
                    'jquery.min.js',
                    'ng-file-upload-shim.min.js',
                    'ng-file-upload.min.js',
              ]
            },
            {
              name: 'bootstrapAffix',
              files: [
                    'jquery.min.js',
                    'angular-bootstrap-affix.js',
              ]
            }
          ]
        });
    })
    .controller('streamController', streamController);
    function streamController(streamList,$scope,$window,$http,$state, $document,OTPService,$cookies,categories, $rootScope,  $location) {
        $scope.hideLoginDialog();
        if($cookies.getObject('location')){
            $scope.location = $cookies.getObject('location'); 
        }
        $scope.streams = streamList.data;
        /*$rootScope.pageTitle = "Exambazaar: Select the stream you want to study";
        $rootScope.pageTitle = "Exambazaar is India’s biggest and largest education discovery platform and is the fastest way to discover best coaching classes in your city. Our easy-to-use website shows you all the coaching classes based on study streams, along with courses, photos, vidoes and results. Exambazaar also provides comprehensive information for test prep for entrance exams in India, colleges, courses, universities and career options. You can find information about more than 50 exams and coaching classes to succeed";*/
        $rootScope.pageTitle = 'Exambazaar: Select your Exam Stream';
        
        
        $rootScope.pageDescription = "Select your exam stream from Engineering, Medical, CA & CS, School, Mba, Law, Foreign Education, Civil Services, SSC, Bank, Defence, Insurance, Financial Certification";
        
        $rootScope.pageKeywords = "Exambazaar, Best Coaching India, Coaching Reviews, Engineering Coaching, Medical Coaching, CA & CS Coaching, NTSE Coaching, CAT Coaching, CLAT Coaching, SAT GMAT Coaching, IAS Coaching, SSC Coaching, Bank PO Coaching, Defence Coaching";
        
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
        this.procMon = function() {
            
            return $http.post('/api/users/procmon');
        };
        this.saveUser = function(user) {
            
            return $http.post('/api/users/save', user);
        };
        this.updateUser = function(user) {
            
            return $http.post('/api/users/update', user);
        };
        this.dailySummary = function() {
            return $http.get('/api/users/dailySummary');
        };
        this.hourlyHeatmap = function() {
            return $http.get('/api/users/hourlyHeatmap');
        };
        this.deliverVoucher = function(voucherForm) {
            
            return $http.post('/api/users/deliverVoucher', voucherForm);
        };
        
        this.sendReferrals = function(referralForm) {
            
            return $http.post('/api/users/sendReferrals', referralForm);
        };
        this.searchUsers = function(query) {
            return $http.get('/api/users/query/'+query, {query: query});
        };
        this.fbSave = function(user) {
            
            return $http.post('/api/users/fbSave', user);
        };
        this.getBlogger = function(userId) {
            return $http.get('/api/users/blogger/'+userId, {userId: userId});
        };
        this.activateBlogger = function(userId) {
            return $http.get('/api/users/activateBlogger/'+userId, {userId: userId});
        };
        this.deactivateBlogger = function(userId) {
            return $http.get('/api/users/deactivateBlogger/'+userId, {userId: userId});
        };
        this.activeUsers = function(nDays) {
            return $http.get('/api/users/activeUsers/'+nDays, {nDays: nDays});
        };
        this.activateIntern = function(userId) {
            return $http.get('/api/users/activateIntern/'+userId, {userId: userId});
        };
        this.deactivateIntern = function(userId) {
            return $http.get('/api/users/deactivateIntern/'+userId, {userId: userId});
        };
        this.closeInternship = function(userId) {
            return $http.get('/api/users/closeInternship/'+userId, {userId: userId});
        };
        
        this.getUser = function(userId) {
            return $http.get('/api/users/edit/'+userId, {userId: userId});
        };
        this.getAddedInstitutes = function(userId) {
            return $http.get('/api/users/addedInstitutes/'+userId, {userId: userId});
        };
        this.getAddedQuestions = function(userId) {
            return $http.get('/api/users/addedQuestions/'+userId, {userId: userId});
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
        this.getUserShortlistedInstitutes = function(userId) {
            return $http.get('/api/users/userShortlist/'+userId, {userId: userId});
        };
        this.getUsers = function() {
            return $http.get('/api/users');
        };
        this.properNames = function() {
            return $http.get('/api/users/properNames');
        };
        this.allBloggers = function() {
            return $http.get('/api/users/allBloggers');
        };
        this.getInterns = function() {
            return $http.get('/api/users/interns');
        };
        this.getEBTeam = function() {
            return $http.get('/api/users/ebteam');
        };
        
        this.getUserFilled = function(userId) {
            
            return $http.get('/api/users/editFilled/'+userId, {userId: userId});
        };
        this.userexists = function(mobile) {
            return $http.get('/api/users/userexists/'+mobile, {mobile: mobile});
        };
        this.referexists = function(mobile) {
            return $http.get('/api/users/referexists/'+mobile, {mobile: mobile});
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
        this.addBlogGalleryPic = function(newPicForm) {
            return $http.post('/api/users/addBlogGalleryPic', newPicForm);
        };
        this.removeBlogGalleryPic = function(newPicForm) {
            return $http.post('/api/users/removeBlogGalleryPic', newPicForm);
        };
        this.removeAllBlogGallery = function(newPicForm) {
            return $http.post('/api/users/removeAllBlogGallery', newPicForm);
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
        this.makePartner = function(partnerUser) {
            return $http.post('/api/users/makePartner',partnerUser);
        };
        this.unmakePartner = function(partnerUser) {
            return $http.post('/api/users/unmakePartner',partnerUser);
        };
        this.userMarketing = function(userList) {
            return $http.post('/api/users/userMarketing',userList);
        };
        this.userSurvey = function(userList) {
            return $http.post('/api/users/userSurvey',userList);
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
        this.welcomeEmail = function(email) {
            return $http.post('/api/emails/welcomeEmail', email);
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
    exambazaar.service('questionService', ['$http', function($http) {
        this.saveQuestion = function(question) {
            return $http.post('/api/questions/save', question);
        };
        this.getTestQuestions = function(testId) {
            return $http.get('/api/questions/testQuestions/'+testId, {testId: testId});
        };
        this.markCreator = function(testId) {
            return $http.get('/api/questions/markCreator/'+testId, {testId: testId});
        };
        this.getQuestion = function(questionId) {
            return $http.get('/api/questions/edit/'+questionId, {questionId: questionId});
        };
        this.removeQuestion = function(questionId) {
            return $http.get('/api/questions/remove/'+questionId, {questionId: questionId});
        };
        this.getQuestions = function() {
            return $http.get('/api/questions');
        };
        this.getExamQuestions = function(examId) {
            return $http.get('/api/questions/exam/'+examId, {examName: examId});
        };
        this.questionToPost = function(examArray) {
            return $http.post('/api/questions/questionToPost',examArray);
        };
        this.buildPostSchedule = function(buildParams) {
            return $http.post('/api/questions/buildPostSchedule',buildParams);
        };
    }]);
    exambazaar.service('testService', ['$http', function($http) {
        this.saveTest = function(test) {
            return $http.post('/api/tests/save', test);
        };
        this.getTest = function(testId) {
            return $http.get('/api/tests/edit/'+testId, {testId: testId});
        };
        this.readTest = function(testId) {
            return $http.get('/api/tests/readTest/'+testId, {testId: testId});
        };
        this.removeTest = function(testId) {
            return $http.get('/api/tests/remove/'+testId, {testId: testId});
        };
        this.getTests = function() {
            return $http.get('/api/tests');
        };
        this.getExamTests = function(examId) {
            return $http.get('/api/tests/exam/'+examId, {examId: examId});
        };
        this.getExamTestsByExamName = function(examName) {
            return $http.get('/api/tests/examByName/'+examName, {examName: examName});
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
        this.getExamPapers = function() {
            return $http.get('/api/exams/papers');
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
       
    exambazaar.service('subscriberService', ['$http', function($http) {
        this.saveSubscribers = function(subscriberList) {
            return $http.post('/api/subscribers/bulksave', subscriberList);
        };
        this.sendReviewInvites = function(reviewInviteForm) {
            
            return $http.post('/api/subscribers/sendReviewInvites', reviewInviteForm);
        };
        this.getSubscriber = function(subscriberId) {
            return $http.get('/api/subscribers/edit/'+subscriberId, {subscriberId: subscriberId});
        };
        this.getSubscribers = function() {
            return $http.get('/api/subscribers');
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
        
    exambazaar.service('socialMediaCredentialService', ['$http', function($http) {
        this.saveSocialMediaCredential = function(socialMediaCredential) {
            return $http.post('/api/socialMediaCredentials/save', socialMediaCredential);
        };
        
        this.getSocialMediaCredential = function(socialMediaCredentialId) {
            return $http.get('/api/socialMediaCredentials/edit/'+socialMediaCredentialId, {socialMediaCredentialId: socialMediaCredentialId});
        };
        this.getActiveSocialMediaCredential = function() {
            return $http.get('/api/socialMediaCredentials/getOne');
        };
        this.getSocialMediaCredentials = function() {
            return $http.get('/api/socialMediaCredentials');
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
            return $http.get('https://freegeoip.net/json/');
        };
        
    }]);
    exambazaar.service('viewService', ['$http', function($http) {
       
        this.saveview = function(viewForm) {
            return $http.post('/api/views/save', viewForm);
        };
        this.masterViewSummary = function() {
            return $http.get('/api/views/masterViewSummary');
        };
        this.dailySummary = function() {
            return $http.get('/api/views/dailySummary');
        };
        this.hourlyHeatmap = function() {
            return $http.get('/api/views/hourlyHeatmap');
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
        this.getuserBlogviews = function(userId) {
            return $http.get('/api/views/userBlog/'+userId, {userId: userId});
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
        this.findAssigned = function(instituteIds) {
            return $http.post('/api/tofillcis/findAssigned', instituteIds);
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
        
    exambazaar.service('resultService', ['$http', function($http) {
       
        this.saveresult = function(resultForm) {
            return $http.post('/api/results/save', resultForm);
        };
        this.existingResult = function(userInstituteForm) {
            return $http.post('/api/results/existingResult', userInstituteForm);
        };
        this.groupResults = function(groupResultForm) {
            return $http.post('/api/results/groupResults', groupResultForm);
        };
        
        this.resultsCount = function() {
            return $http.get('/api/results/resultsCount');
        };
        this.getresult = function(resultId) {
            return $http.get('/api/results/edit/'+resultId, {resultId: resultId});
        };
        this.removeresult = function(resultId){
            $http.get('/api/results/remove/'+resultId, {resultId: resultId});
        };
        this.getresults = function() {
            return $http.get('/api/results');
        };
        this.getuserResults = function(userId) {
            return $http.get('/api/results/user/'+userId, {userId: userId});
        };
    }]);
        
    exambazaar.service('commentService', ['$http', function($http) {
        this.savecomment = function(commentForm) {
            return $http.post('/api/comments/save', commentForm);
        };
        this.commentsCount = function() {
            return $http.get('/api/comments/commentsCount');
        };
        this.getcomment = function(commentId) {
            return $http.get('/api/comments/edit/'+commentId, {commentId: commentId});
        };
        this.removecomment = function(commentId){
            $http.get('/api/comments/remove/'+commentId, {commentId: commentId});
        };
        this.disablecomment = function(commentId) {
            return $http.get('/api/comments/disable/'+commentId, {commentId: commentId});
        };
        this.enablecomment = function(commentId) {
            return $http.get('/api/comments/enable/'+commentId, {commentId: commentId});
        };
        this.getcomments = function() {
            return $http.get('/api/comments/');
        };
        this.blogpostComments = function(blogpostId) {
            return $http.get('/api/comments/blogpostComments/'+blogpostId, {blogpostId: blogpostId});
        };
        this.userBlogpostcomment = function(commentForm) {
            return $http.post('/api/comments/userBlogpostcomment', commentForm);
        };
    }]);
        
    exambazaar.service('blogTagService', ['$http', function($http) {
        this.saveblogTag = function(blogTagForm) {
            return $http.post('/api/blogTags/save', blogTagForm);
        };
        this.blogTagsCount = function() {
            return $http.get('/api/blogTags/blogTagsCount');
        };
        this.getblogTag = function(blogTagId) {
            return $http.get('/api/blogTags/edit/'+blogTagId, {blogTagId: blogTagId});
        };
        this.removeblogTag = function(blogTagId){
            $http.get('/api/blogTags/remove/'+blogTagId, {blogTagId: blogTagId});
        };
        this.disableblogTag = function(blogTagId) {
            return $http.get('/api/blogTags/disable/'+blogTagId, {blogTagId: blogTagId});
        };
        this.enableblogTag = function(blogTagId) {
            return $http.get('/api/blogTags/enable/'+blogTagId, {blogTagId: blogTagId});
        };
        this.getblogTags = function() {
            return $http.get('/api/blogTags/');
        };
    }]);    
    exambazaar.service('blogpostService', ['$http', function($http) {
        this.slugExists = function(query) {
            return $http.get('/api/blogposts/slugExists/'+query, {query: query});
        };
        
        this.saveblogpost = function(blogpostForm) {
            return $http.post('/api/blogposts/save', blogpostForm);
        };
        this.existingBlogpost = function(userInstituteForm) {
            return $http.post('/api/blogposts/existingBlogpost', userInstituteForm);
        };
        this.groupBlogposts = function(groupBlogposts) {
            return $http.post('/api/blogposts/groupBlogposts', groupBlogposts);
        };
        this.changeCover = function(coverPicForm) {
            return $http.post('/api/blogposts/changeCover', coverPicForm);
        };
        this.blogpostsCount = function() {
            return $http.get('/api/blogposts/blogpostsCount');
        };
        this.getblogpost = function(blogpostId) {
            return $http.get('/api/blogposts/edit/'+blogpostId, {blogpostId: blogpostId});
        };
        
        
        this.getblogpostFromSlug = function(blogpostSlug) {
            return $http.get('/api/blogposts/getblogpostFromSlug/'+blogpostSlug, {blogpostSlug: blogpostSlug});
        };
        this.disableblogpost = function(blogpostId) {
            return $http.get('/api/blogposts/disable/'+blogpostId, {blogpostId: blogpostId});
        };
        this.enableblogpost = function(blogpostId) {
            return $http.get('/api/blogposts/enable/'+blogpostId, {blogpostId: blogpostId});
        };
        this.removeblogpost = function(blogpostId){
            return $http.get('/api/blogposts/remove/'+blogpostId, {blogpostId: blogpostId});
        };
        this.markEdbites = function(blogpostId){
            return $http.get('/api/blogposts/markEdbites/'+blogpostId, {blogpostId: blogpostId});
        };
        this.unmarkEdbites = function(blogpostId){
            return $http.get('/api/blogposts/unmarkEdbites/'+blogpostId, {blogpostId: blogpostId});
        };
        
        this.getUserBlogposts = function(userId) {
            return $http.get('/api/blogposts/userblogs/'+userId, {userId: userId});
        };
        this.getblogs = function(userId) {
            return $http.get('/api/blogposts/getblogs');
        };
        this.suggestedblogs = function(examName) {
            return $http.get('/api/blogposts/suggestedblogs/'+examName, {examName: examName});
        };
        this.headerBlogs = function() {
            return $http.get('/api/blogposts/headerBlogs');
        };
        this.sanitizeblogposts = function() {
            return $http.get('/api/blogposts/sanitizeblogposts');
        };
        this.markAllEdbites = function() {
            return $http.get('/api/blogposts/markAllEdbites');
        };
        
        this.getuserBlogposts = function(userId) {
            return $http.get('/api/blogposts/user/'+userId, {userId: userId});
        };
        this.setToLastSavedVersion = function(blogpostId) {
            return $http.get('/api/blogposts/setToLastSavedVersion/'+blogpostId, {blogpostId: blogpostId});
        };
    }]);
        
    exambazaar.service('reviewService', ['$http', function($http) {
       
        this.savereview = function(reviewForm) {
            return $http.post('/api/reviews/save', reviewForm);
        };
        this.existingReview = function(userInstituteForm) {
            return $http.post('/api/reviews/existingReview', userInstituteForm);
        };
        this.groupReviews = function(groupReviews) {
            return $http.post('/api/reviews/groupReviews', groupReviews);
        };
        this.dailySummary = function() {
            return $http.get('/api/reviews/dailySummary');
        };
        this.reviewsCount = function() {
            return $http.get('/api/reviews/reviewsCount');
        };
        this.getreview = function(reviewId) {
            return $http.get('/api/reviews/edit/'+reviewId, {reviewId: reviewId});
        };
        this.disablereview = function(reviewId) {
            return $http.get('/api/reviews/disable/'+reviewId, {reviewId: reviewId});
        };
        this.enablereview = function(reviewId) {
            return $http.get('/api/reviews/enable/'+reviewId, {reviewId: reviewId});
        };
        this.removereview = function(reviewId){
            $http.get('/api/reviews/remove/'+reviewId, {reviewId: reviewId});
        };
        this.getreviews = function() {
            return $http.get('/api/reviews');
        };
        this.getuserReviews = function(userId) {
            return $http.get('/api/reviews/user/'+userId, {userId: userId});
        };
    }]);
        
    exambazaar.service('upvoteService', ['$http', function($http) {
       
        this.saveupvote = function(upvoteForm) {
            return $http.post('/api/upvotes/save', upvoteForm);
        };
        this.removeupvote = function(removeupvoteForm) {
            return $http.post('/api/upvotes/removeupvote/', removeupvoteForm);
        };
        this.blogpostUpvoteCount = function(blogpostSlug) {
            return $http.get('/api/upvotes/blogpostUpvoteCount/'+blogpostSlug, {blogpostSlug: blogpostSlug});
        };
        this.allBlogsUpvotesCount = function() {
            return $http.get('/api/upvotes/allBlogsUpvotesCount');
        };
        this.blogpostUserUpvotes = function(userId) {
            return $http.get('/api/upvotes/blogpostUserUpvotes/'+userId, {userId: userId});
        };
        this.randomUpvotes = function(randomUpvoteForm) {
            return $http.post('/api/upvotes/randomUpvotes', randomUpvoteForm);
        };
    }]);
        
    exambazaar.service('rateInstituteService', ['$http', function($http) {
       
        this.saverateInstitute = function(rateInstituteForm) {
            return $http.post('/api/rateInstitutes/save', rateInstituteForm);
        };
        
        this.markDone = function(rateInstituteForm) {
            return $http.post('/api/rateInstitutes/markDone', rateInstituteForm);
        };
        this.ratedCount = function() {
            return $http.get('/api/rateInstitutes/ratedCount');
        };
        this.institutesRated = function() {
            return $http.get('/api/rateInstitutes/institutesRated');
        };
        this.getrateInstitute = function(rateInstituteId) {
            return $http.get('/api/rateInstitutes/edit/'+rateInstituteId, {rateInstituteId: rateInstituteId});
        };
        this.prevRated = function(groupName) {
            return $http.get('/api/rateInstitutes/prevRated/'+groupName, {groupName: groupName});
        };
        this.removeAssigned = function(rateInstituteId){
            $http.get('/api/rateInstitutes/remove/'+rateInstituteId, {rateInstituteId: rateInstituteId});
        };
        this.getrateInstitutes = function() {
            return $http.get('/api/rateInstitutes');
        };
        this.getuserrateInstitute = function(userId) {
            return $http.get('/api/rateInstitutes/user/'+userId, {userId: userId});
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
        
    exambazaar.service('couponService', ['$http', function($http) {
        this.saveCoupon = function(coupon) {
            return $http.post('/api/coupons/save', coupon);
        };
        this.getCoupon = function(couponId) {
            return $http.get('/api/coupons/edit/'+couponId, {couponId: couponId});
        };
        this.nameExists = function(name) {
            return $http.post('/api/coupons/nameExists/', name);
        };
        this.getOneActiveCouponCode = function(couponForm) {
            return $http.post('/api/coupons/getOneActiveCouponCode/', couponForm);
        };
        this.deliver = function(deliverForm) {
            return $http.post('/api/coupons/deliver/', deliverForm);
        };
        this.getCoupons = function() {
            return $http.get('/api/coupons');
        };
        this.databaseServices = function() {
            return $http.get('/api/coupons/databaseServices');
        };
        this.getAllCodes = function() {
            return $http.get('/api/coupons/allCodes');
        };
        this.couponsCount = function() {
            return $http.get('/api/coupons/couponsCount');
        };
        this.issuedcouponsCount = function() {
            return $http.get('/api/coupons/issuedcouponsCount');
        };
        this.getOneOfEachActiveCoupon = function() {
            return $http.get('/api/coupons/oneOfEachActiveCoupon');
        };
        
        this.getProviderCoupons = function(providerId) {
            return $http.get('/api/coupons/providerCoupons/'+providerId, {providerId: providerId});
        };
        this.getCouponByName = function(couponName) {
            return $http.get('/api/coupons/coupon/'+couponName, {couponName: couponName});
        };
    }]);
    
    exambazaar.service('offerService', ['$http', function($http) {
        this.saveOffer = function(offer) {
            return $http.post('/api/offers/save', offer);
        };
        this.getOffer = function(offerId) {
            return $http.get('/api/offers/edit/'+offerId, {offerId: offerId});
        };
        this.activate = function(offerId) {
            return $http.get('/api/offers/activate/'+offerId, {offerId: offerId});
        };
        this.deactivate = function(offerId) {
            return $http.get('/api/offers/deactivate/'+offerId, {offerId: offerId});
        };
        this.nameExists = function(name) {
            return $http.post('/api/offers/nameExists/', name);
        };
        this.getOffers = function() {
            return $http.get('/api/offers');
        };
        this.getActiveOffers = function() {
            return $http.get('/api/offers/activeOffers');
        };
        this.getActiveOffersBasic = function() {
            return $http.get('/api/offers/activeOffersBasic');
        };
        this.getActiveOffersMedium = function() {
            return $http.get('/api/offers/activeOffersMedium');
        };
        this.getProviderOffers = function(providerId) {
            return $http.get('/api/offers/providerOffers/'+providerId, {providerId: providerId});
        };
        this.getOfferByName = function(offerName) {
            return $http.get('/api/offers/offer/'+offerName, {offerName: offerName});
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
        this.contacts = function() {
            return $http.get('/api/targetStudyProviders/contacts');
        };
        this.sanitizeMobiles = function() {
            return $http.get('/api/targetStudyProviders/sanitizeMobiles');
        };
        this.dailySummary = function() {
            return $http.get('/api/targetStudyProviders/dailySummary');
        };
        this.allResults = function(examId) {
            return $http.get('/api/targetStudyProviders/allResults/'+examId, {examId: examId});
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
        this.searchBlogCoachingGroupProviders = function(query) {
            return $http.get('/api/targetStudyProviders/blogCoachingGroupQuery/'+query, {query: query});
        };
        this.addExamsToAll = function(groupExamForm) {
            return $http.post('/api/targetStudyProviders/addExamsToAll',groupExamForm);
        };
        this.setLogoForAll = function(groupLogoForm) {
            return $http.post('/api/targetStudyProviders/setLogoForAll',groupLogoForm);
        };
        this.setEmailForAll = function(groupExamForm) {
            return $http.post('/api/targetStudyProviders/setEmailForAll',groupExamForm);
        };
        this.setWebsiteForAll = function(groupWebsiteForm) {
            return $http.post('/api/targetStudyProviders/setWebsiteForAll',groupWebsiteForm);
        };
        
        this.renameAllCoaching = function(groupNameForm) {
            return $http.post('/api/targetStudyProviders/renameAllCoaching',groupNameForm);
        };
        this.renameAllGroupName = function(groupNameForm) {
            return $http.post('/api/targetStudyProviders/renameAllGroupName',groupNameForm);
        };
        this.removeExamsFromAll = function(groupExamForm) {
            return $http.post('/api/targetStudyProviders/removeExamsFromAll',groupExamForm);
        };
        this.commonExamsInAll = function(groupExamForm) {
            return $http.post('/api/targetStudyProviders/commonExamsInAll',groupExamForm);
        };
        this.searchCityProviders = function(cityQueryForm) {
            return $http.post('/api/targetStudyProviders/cityQuery',cityQueryForm);
        };
        this.showGroupHelper = function(cityCoachingForm) {
            return $http.post('/api/targetStudyProviders/showGroupHelper',cityCoachingForm);
        };
        this.showGroupHelperById = function(coachingId) {
            return $http.post('/api/targetStudyProviders/showGroupHelperById',coachingId);
        };
        this.searchCityReviewProviders = function(cityQueryForm) {
            return $http.post('/api/targetStudyProviders/cityReviewQuery',cityQueryForm);
        };
        this.cityGroupExamQueryForm = function(cityGroupExamQueryForm) {
            return $http.post('/api/targetStudyProviders/cityGroupExamQuery',cityGroupExamQueryForm);
        };
        this.aroundme = function(queryForm) {
            return $http.post('/api/targetStudyProviders/aroundme',queryForm);
        };
        this.bulkSaveLatLng = function(LatLngForm) {
            return $http.post('/api/targetStudyProviders/bulkSaveLatLng',LatLngForm);
        };
        this.setLocOfAll = function() {
            return $http.post('/api/targetStudyProviders/setLocofAll');
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
        this.titleCaseName = function(coachingId) {
            return $http.get('/api/targetStudyProviders/titleCaseName/'+coachingId, {coachingId: coachingId});
        };
        this.getClaimProvider = function(coachingId) {
            return $http.get('/api/targetStudyProviders/claimcoaching/'+coachingId, {coachingId: coachingId});
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
        this.removeProvider = function(coachingId) {
            return $http.get('/api/targetStudyProviders/removecoaching/'+coachingId, {coachingId: coachingId});
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
        
        this.providercities = function(query) {
            return $http.get('/api/targetStudyProviders/providercities/'+query, {query: query});
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
        this.cityStateService = function() {
            return $http.get('/api/targetStudyProviders/cityStateService');
        };
        this.cityStateService2 = function() {
            return $http.get('/api/targetStudyProviders/cityStateService2');
        };
        this.emailService = function() {
            return $http.get('/api/targetStudyProviders/emailService');
        };
        this.groupSummaryService = function() {
            return $http.get('/api/targetStudyProviders/groupSummaryService');
        };
        this.citySummaryService = function() {
            return $http.get('/api/targetStudyProviders/citySummaryService');
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
        this.extractEmails = function(providerIds) {
            return $http.post('/api/masters/extractEmails/',providerIds);
        };
        this.googlePlaces = function() {
            return $http.get('/api/masters/googlePlaces/');
        };
        this.bulkSaveLatLng = function() {
            return $http.get('/api/masters/bulkSaveLatLng/');
        };
        this.latLngSummary = function() {
            return $http.get('/api/masters/latLngSummary/');
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
                console.log('Error ' + data + ' ' + status);
            });
        };
        $scope.generateUserOTP = function(){
                UserService.userexists($scope.newUser.contact.mobile).success(function (data, status, headers) {
                    var userExists = data;
                    console.log(userExists);
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
                            console.log("OTP sent to mobile " + thisOTP.mobile);
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
                    console.log('Error ' + data + ' ' + status);
                });
            
        };
            
    }]); 
    exambazaar.controller("categoryController", 
        [ '$scope','$stateParams','$cookies','$state','categories','$rootScope','examList',  function($scope,$stateParams,$cookies,$state,categories,$rootScope,examList){
        $scope.hideLoginDialog();
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
        
        
        $rootScope.pageTitle = "Choose exam within " + $scope.category.displayname + " Stream";
        $rootScope.pageDescription = "Study for " + examNames + " at the best coaching classes across 90 cities of India | Exambazaar - results, fees, faculty, photos, vidoes, reviews of Coaching Classes in India";
        var streamKeywords = "Exambazaar " + $scope.category.displayname + " Coaching, "+ "Best " + $scope.category.displayname + " Coaching Classes, " + "Top " + $scope.category.displayname + " Coaching Centre, " + $scope.category.displayname + " Coaching in India, ";
        $rootScope.pageKeywords = "Exambazaar, " + streamKeywords + examNamesCoaching;
            
    }]); 
    exambazaar.controller("landingController", 
        [ '$scope','$stateParams','$cookies','$state','categories','$rootScope','metaService', '$mdDialog', function($scope,$stateParams,$cookies,$state,categories,$rootScope,metaService, $mdDialog){
        $scope.hideLoginDialog();
        $scope.number = 24;
        $scope.getNumber = function(num) {
            return new Array(num);   
        }
        
        $scope.categoryName = $stateParams.categoryName;
        $scope.category = {};
        $scope.subcategory = [];
            
        
        $rootScope.pageTitle = 'Exambazaar: Find best coaching classes in your city for more than 50 exams';
        $rootScope.pageDescription = "Search and apply to the best coaching classes and get the education that you deserve. Browse through courses, photos, videos and results for 26000+ institutes in 90+ cities";
        $rootScope.pageKeywords = "Exambazaar, Best Coaching Classes, Top Coaching Centre, Coaching Reviews, Engineering Coaching, Medical Coaching, CA & CS Coaching, NTSE Coaching, CAT Coaching, CLAT Coaching, SAT GMAT Coaching, IAS Coaching, SSC Coaching, Bank PO Coaching, Defence Coaching";
        
        
            
        $scope.goToCity = function(subcategory){ 
            $cookies.putObject('subcategory', subcategory);
            $state.go('city');
        };
        
            
           
        
            
    }]); 
    exambazaar.controller("cityController", 
        [ '$scope','$stateParams','$cookies','$state','cities','$rootScope','categories','$mdDialog','thisStream','thisExam',  function($scope,$stateParams,$cookies,$state,cities,$rootScope,categories,$mdDialog,thisStream,thisExam){
        $scope.hideLoginDialog();
        $scope.rankedCities = ["Delhi","Mumbai","New Delhi","Ahmedabad","Chennai","Kolkata","Hyderabad","Pune","Bangalore","Chandigarh","Jaipur","Agra","Ajmer","Allahabad","Alwar","Ambala","Amritsar","Bhilwara","Bhopal","Bikaner","Coimbatore","Dehradun","Ganganagar","Ghaziabad","Guwahati","Gwalior","Indore","Juhnjhunu","Kanpur","Kota","Kurukshetra","Lucknow","Ludhiana","Mathura","Meerut","Mohali","Mysore","Nasik","Noida","Patiala","Patna","Rajkot","Rohtak","Roorkee","Shimla","Sikar","Sonbhadra","Surat","Thrissur","Trivandrum","Vadodara","Vellore","Vishakhapatnam"];
        
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
        $rootScope.pageDescription = "Search for " + $scope.subcategory.displayname + " coaching classes in " + cityNames + " and 90 other cities in India | Exambazaar - results, fees, faculty, photos, vidoes, reviews of Coaching Classes in India";
        
        var examKeywords = "Exambazaar " + $scope.subcategory.displayname + " Coaching, "+ "Best " + $scope.subcategory.displayname + " Coaching Classes, " + "Top " + $scope.subcategory.displayname + " Coaching Centre, " + $scope.subcategory.displayname + " Coaching in India, ";
        $rootScope.pageKeywords = "Exambazaar, " + examKeywords + cityNamesCoaching;
            
    }]);    
    
    exambazaar.controller("p4Controller", 
    [ '$scope','$rootScope', 'targetStudyProviderService', 'targetStudyProvidersList','cities','$state','$stateParams', '$cookies', 'thisStream', 'thisExam','streamExams', '$mdDialog', '$geolocation', 'suggestedblogs', function($scope,$rootScope, targetStudyProviderService, targetStudyProvidersList,cities,$state,$stateParams, $cookies,thisStream,thisExam,streamExams,  $mdDialog, $geolocation, suggestedblogs){
       
        $scope.hideLoginDialog();
        $scope.editable = false;
        if($cookies.getObject('sessionuser')){
            var user = $cookies.getObject('sessionuser');
            if(user.userType=='Master'){
                $scope.editable = true;
            }
        }
        $scope.userPosition = null;
       
     
        if($cookies.getObject('userlocation')){
            $scope.userlocation = $cookies.getObject('userlocation');
            //console.log($scope.userlocation);
            if(!$scope.userPosition || $scope.userPosition.length < 4){
                //console.log('Empty object');
                $geolocation.getCurrentPosition({
                timeout: 60000
                 }).then(function(position) {
                    $cookies.putObject('userlocation', position);
                    $scope.userlocation = position;
                    if($scope.userlocation && $scope.userlocation.coords && $scope.userlocation.coords.latitude &&  $scope.userlocation.coords.longitude){
                        $scope.userlatlng = new google.maps.LatLng($scope.userlocation.coords.latitude, $scope.userlocation.coords.longitude);
                        $scope.userPosition = $scope.userlocation.coords.latitude.toString() + "," + $scope.userlocation.coords.longitude.toString();
                        //console.log($scope.userPosition);
                        
                    }
                 });
            }
            
            if($scope.userlocation && $scope.userlocation.coords && $scope.userlocation.coords.latitude &&  $scope.userlocation.coords.longitude){
                $scope.userlatlng = new google.maps.LatLng($scope.userlocation.coords.latitude, $scope.userlocation.coords.longitude);
                console.log($scope.userlatlng);
                
                $scope.userPosition = $scope.userlocation.coords.latitude.toString() + "," + $scope.userlocation.coords.longitude.toString();
                $cookies.putObject('userlocation', $scope.userlocation);
                $cookies.putObject('userPosition', $scope.userPosition);
                console.log($scope.userPosition);
            }
            
        }else{
            $geolocation.getCurrentPosition({
            timeout: 60000
             }).then(function(position) {
                $cookies.putObject('userlocation', position);
                $scope.userlocation = position;
                if($scope.userlocation && $scope.userlocation.coords && $scope.userlocation.coords.latitude &&  $scope.userlocation.coords.longitude){
                    $scope.userlatlng = new google.maps.LatLng($scope.userlocation.coords.latitude, $scope.userlocation.coords.longitude); 
                }
                
             });
        }
        
        
        $scope.goToBlog = function(blog){
            var url = $state.href('showblog', {blogpostSlug: blog.urlslug});
            window.open(url,'_blank');  
        };
        
        $scope.categoryName = $stateParams.categoryName;
        $scope.subCategoryName = $stateParams.subCategoryName;
        $scope.city = $stateParams.cityName;
        
        $scope.suggestedblogs = suggestedblogs.data;
        $scope.category = thisStream.data;
        $scope.subcategory = thisExam.data;
        //console.log($scope.subcategory);
        var streamExamsData = streamExams.data;
        var streamExamsIds = streamExamsData.map(function(a) {return a._id;});
        $scope.streamExams = streamExams.data.map(function(a) {return a.name;});
        
        $scope.providersList = targetStudyProvidersList.data;
        $scope.uniqueProviders = [];
        $scope.uniqueInstitutes = [];
        var origins = [];
        var destinations = [];
        
        var directionsService = new google.maps.DirectionsService;
        
        var getDrivingDistance = function(origin, destination, index){
            
            directionsService.route({
              origin: origin,
              destination: destination,
              travelMode: 'DRIVING'
            }, function(response, status) {
                if (status === 'OK') {
                    //console.log(index + " " + JSON.stringify(response.routes[0].legs[0].distance));
                    //console.log(index);
                    $scope.providersList[index].distance = response.routes[0].legs[0].distance;  
                       
                }
                else if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT){
                    setTimeout(function() {
                        getDrivingDistance(origin, destination, index);
                    }, 10 );
                }
                else {
                    console.log("Geocode was not successful for the following reason: " + status);
                }
            });
        };
        
        $scope.providersList.forEach(function(thisProvider, providerIndex){
            var thisLatLng = thisProvider.latlng;
            if($scope.userlatlng && thisLatLng && thisLatLng.lat && thisLatLng.lng && thisLatLng.lat !='' && thisLatLng.lng !=''){
                var gLatLng = new google.maps.LatLng(thisLatLng.lat, thisLatLng.lng);
                var distance = google.maps.geometry.spherical.computeDistanceBetween($scope.userlatlng, gLatLng)/1000;
                thisProvider.SLdistance = distance;
                //console.log(distance);
                origins.push($scope.userlatlng);
                destinations.push(gLatLng);
                
                var origin1 = $scope.userlatlng;
                var destination1 = gLatLng;
                
                getDrivingDistance(origin1, destination1, providerIndex);
                
                
            };
            
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
        var examsOffered;
        var groupResults;
        var thisProviderExams;
        var thisProviderResults;
        
        
        $scope.uniqueInstitutes.forEach(function(thisGroup, index){
            examsOffered = [];
            groupResults = [];
            
            thisGroup.institutes.forEach(function(thisProvider, pIndex){
                thisProviderExams = thisProvider.exams;
                thisProviderResults = thisProvider.results;
                
                thisProviderExams.forEach(function(thisExam, cIndex){
                    if(examsOffered.indexOf(thisExam) == -1){
                        examsOffered.push(thisExam);
                        
                    }
                });
                /*if(thisProviderResults){
                    groupResults = groupResults.concat(thisProviderResults);
                }*/
                thisProviderResults.forEach(function(thisResult, rIndex){
                    if(thisResult.exam == $scope.subcategory._id && thisResult.image && thisResult.image != ''){
                        groupResults.push(thisResult);
                    }
                });
               
                //console.log(examsOffered);
            });
            var streamExamsOffered = [];
            examsOffered.forEach(function(thisExam, eIndex){
                var examIndex = streamExamsIds.indexOf(thisExam);
                if(examIndex != -1){
                    streamExamsOffered.push(streamExamsData[examIndex]);
                }
            });
            
            thisGroup.examsOffered = streamExamsOffered;
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
        $rootScope.pageDescription = "Select from top " + $scope.uniqueInstitutes.length + " " +   $scope.subcategory.displayname + " Coaching Classes in " + $scope.city + ". Choose from "+ coachingGroupNames + " and " + " many more!" + " | Exambazaar - results, fees, faculty, photos, vidoes, reviews of Coaching Classes in India";
        
        var coachingKeywords = "Best " + $scope.subcategory.displayname + " Coaching Classes in " + $scope.city + ", " + "Top " + $scope.uniqueInstitutes.length + " " + $scope.subcategory.displayname + " Coaching Centres in " +$scope.city + ", ";
        $rootScope.pageKeywords = coachingKeywords + coachingGroupNamesCity;
        
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
            //console.log(JSON.stringify(thisOTP));
            
            OTPService.generateOTP(thisOTP).success(function (data, status, headers) {
                $scope.serverOTP = data.otp;
                $scope.currStep = 2;
            })
            .error(function (data, status, header, config) {
                console.log();
            });
        };
        $scope.incorrectOTP = false;
        $scope.verifyOTP = function(){
            
            if($scope.enterOTP[0] && $scope.enterOTP[1] && $scope.enterOTP[2] && $scope.enterOTP[3]){
                var enterOTP = $scope.enterOTP[0].toString() + $scope.enterOTP[1].toString() + $scope.enterOTP[2].toString() + $scope.enterOTP[3].toString();
                console.log(enterOTP + " " + $scope.serverOTP);
                if(enterOTP == $scope.serverOTP){
                    $scope.currStep = 3;
                    $scope.incorrectOTP = false;
                    console.log('OTP verified');
                }else{
                    $scope.incorrectOTP = true;
                    console.log('OTP incorrect');
                    $scope.currStep = 2;
                }
                console.log($scope.currStep);
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
                    basic: {
                        name: $scope.provider.name     
                    },
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
                    $scope.userlogin.mobile = mobile;
                    $scope.userlogin.password = $scope.userPassword;
                    $scope.login();
                    /*var sessionuser = {
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
                    
                    $state.go('partner-dashboard', {userId: sessionuser.userId});*/

                })
                .error(function (data, status, header, config) {
                    console.log('Error ' + data + ' ' + status);
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
    [ '$scope','$rootScope', 'targetStudyProviderService', 'thisGroup', 'thisStream', 'thisExam', 'streamList', 'examList', '$state','$stateParams', '$cookies', 'UserService', '$mdDialog', '$timeout',  'viewService', 'reviewService','thisGroupResults', function($scope,$rootScope, targetStudyProviderService,thisGroup, thisStream, thisExam, streamList, examList,$state,$stateParams, $cookies, UserService, $mdDialog, $timeout,  viewService, reviewService,thisGroupResults){
        $rootScope.reviewStream = null;
        $rootScope.reviewExam = null;
        $rootScope.reviewCity = null;
        $rootScope.reviewInstitute = null;
        $mdDialog.hide();
        
        $scope.cancel = function() {
          $mdDialog.cancel();
        };
        
        $scope.thisGroupR = thisGroupResults.data;
        $scope.group = thisGroup.data;
        var groupDisabled = $scope.group.map(function(a) {return a.disabled;});
        var groupIds = $scope.group.map(function(a) {return a._id;});
        
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
             UserService.getUserShortlistedInstitutes($scope.user.userId).success(function (data, status, headers) {
                 var allShortlistData = data;
                 var allShortlistedIds = allShortlistData.map(function(a) {return a.institute._id;});
                 $scope.shortlistedIds = [];
                 $scope.shortlistDetails = [];
                 groupIds.forEach(function(thisGroupId, gindex){
                     var sIndex = allShortlistedIds.indexOf(thisGroupId);
                     if(sIndex != -1){
                     $scope.shortlistedIds.push(thisGroupId); $scope.shortlistDetails.push(allShortlistData[sIndex]);
                     }
                 });
                if($scope.shortlistedIds.indexOf($scope.provider._id) != -1){
                    $scope.shortlisted = true;
                }
            })
            .error(function (data, status, header, config) {
                console.log('Shortlist Error' + status + " " + data);    
            }); 
            
            if($scope.user.userType=='Master' || $scope.user.userType=='Intern - Business Development'){
                $scope.ebuser = true;
            }
            
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
                console.log('View Marked');
            })
            .error(function (data, status, header, config) {
                console.log();
            });*/
        }
        
        if(!$scope.user || !$scope.user.userId){
            $scope.showLoginForm();
            //console.log('It has been shown');
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
            'Location',
            'Reviews'
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
        
        
        
        
        //console.log(groupDisabled);
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
        //console.log($scope.groupResults);
        
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
                //console.log(JSON.stringify(indexPair));
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
        
        $scope.getShortlistSelectedColour = function(thisGroup){
            var className = "notselected";
            if($scope.shortlistedIds){
                var sIndex = $scope.shortlistedIds.indexOf(thisGroup._id);
                if(sIndex == -1){
                }else{
                    className = "selected";
                }
            }
            
            
            
            return className;
        };
        
        
        $scope.updateShortlistInstitute = function(thisGroup){
            var sIndex = $scope.shortlistedIds.indexOf(thisGroup._id);
            
            if(sIndex == -1){
                $scope.shortlistedIds.push(thisGroup._id);
                $scope.shortlistInstitute(thisGroup._id);
            }else{
                //$scope.shortlistedIds.splice(sIndex, 1);
            }
            
        };
        
        
        $scope.shortlistInstitute = function(instituteId){
            //console.log($scope.shortlistedIds);
            //$scope.showSelectShortlistCentreDialog();
            if($scope.user.userId && instituteId){
                var shortListForm = {
                    userId: $scope.user.userId,
                    instituteId: instituteId
                };
                UserService.shortlistInstitute(shortListForm).success(function (data, status, headers) {
                    console.log('Institute Shortlisted');
                    $state.reload();
                })
                .error(function (data, status, header, config) {
                    console.log('Shortlist error: ' + status + " " + data);    
                });  
            }
              
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
        
        
        var instituteIds = []; //$scope.group.map(function(a) {return a._id;});
        
        $scope.group.forEach(function(thisGroup, index){
            if(thisGroup.city == $stateParams.cityName){
                instituteIds.push(thisGroup._id);
            }
        });
        
        //console.log(instituteIds);
        $scope.user = $cookies.getObject('sessionuser');
        var viewForm = {
            institutes: instituteIds,
            state: $state.current.name,
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
            //console.log('View Marked');
        })
        .error(function (data, status, header, config) {
            console.log();
        });
        
        
        
        var examNamesKeywords = "";
        
        $scope.groupExams.forEach(function(thisExam, index){
            
            examNamesKeywords += $stateParams.groupName + " " + $stateParams.cityName + " for " + thisExam.exam.displayname;
            if(index < $scope.groupExams.length - 1){
                examNamesKeywords += ", ";
            }
        });
        var thisCity = $scope.city;
        $scope.cityCenters = [];
        $scope.group.forEach(function(thisGroup, gindex){
            if(thisGroup.city == thisCity){
                $scope.cityCenters.push(thisGroup);
            }
        });
        
        $rootScope.pageTitle = $stateParams.groupName + ' in ' + $stateParams.cityName + ' for ' + $stateParams.subCategoryName;
        $rootScope.pageDescription = $stateParams.groupName + ", " +$scope.city +  " has " + $scope.cityCenters.length + " " +   $scope.subcategory.displayname + " Coaching Centers in " + $scope.city + ". | Exambazaar - results, fees, faculty, photos, vidoes, reviews of " + $stateParams.groupName;
        
        var groupKeywords = $stateParams.groupName + ", Top " + $stateParams.subCategoryName + " Coaching in " + $stateParams.cityName + ", " + $stateParams.groupName + ' in ' + $stateParams.cityName + ' for ' + $stateParams.subCategoryName + ", " + $scope.cityCenters.length + " " + $stateParams.groupName + " Centers in " + $scope.city + ", ";
        $rootScope.pageKeywords = groupKeywords + examNamesKeywords;
        
        
        
        
        $scope.years = ["2017","2016","2015","2014","2013","2012","2011","2010","2009","2008","2007","2006","2005","2004","2003"];
        $scope.reviewTags = ["Great Faculty", "Supportive Administration", "Value for Money", "Tech Powered", "Exhaustive Content", "Effective Test Series"];
        $scope.addRemoveReviewTag = function(reviewTag){
            if(!$scope.userReview.tags){
                $scope.userReview.tags = [];
            }
            var rIndex = $scope.userReview.tags.indexOf(reviewTag);
            if(rIndex == -1){
                $scope.userReview.tags.push(reviewTag);
            }else{
                $scope.userReview.tags.splice(rIndex, 1);
            }
        };
        $scope.setReviewTagColor = function(reviewTag){
            var className = "unfilledTag";
            var rIndex = $scope.userReview.tags.indexOf(reviewTag);
            if(rIndex -= -1){
                className = "filledTag";
            }
            return className;
        };
        
        $scope.updateUserReviewYear = function(year){
            if($scope.userReview){
                UserService.year_of_start = year;
            }
        };
        $scope.userReviewMode = false;
        
        $scope.showUserReviewDialog = function(ev,index) {
            $mdDialog.show({
              contentElement: '#userReviewDialog',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true
            }).finally(function() {
                $scope.userReviewMode = true;
            });
        };
        
        
        
        $scope.editUserReviewMode = function(){
            $scope.userReviewMode = !$scope.userReviewMode;
        };
        reviewService.groupReviews(groupIds).success(function (data, status, headers) {
            $scope.otherReviews = data;
            $scope.otherReviews.forEach(function(thisReview, rindex){
                var instituteId = thisReview.institute;
                var iIndex = groupIds.indexOf(instituteId);
                thisReview.institute = $scope.group[iIndex];
                
                $scope.reviewParams.forEach(function(thisParam, index){
                                
                var pIndex = $scope.reviews.indexOf(parseFloat(thisReview[thisParam.name]));
                    
                //console.log(thisReview[thisParam.name] + " "+ parseFloat(thisReview[thisParam.name]) + " " + pIndex);
                $scope.setReview(thisParam.name,parseFloat(thisReview[thisParam.name]), $scope.otherReviews[rindex]);

                });
                
                
                
            });
            
            
        })
        .error(function (data, status, header, config) {
            console.log('Error ' + data + ' ' + status);
        });
        //groupIds
        $scope.updateReviewInstitute = function(thisGroup){
            $scope.userReview.institute = thisGroup._id;
            console.log($scope.userReview.institute);
        };
        $scope.reviewParams = [
            {name: "faculty", displayname:"Faculty and Teaching Experience", hoverVal: -1},
            {name: "competitive_environment", displayname:"Competitive Environment", hoverVal: -1},
            {name: "quality_of_material", displayname:"Quality of material", hoverVal: -1},
            {name: "infrastructure", displayname:"Infrastructure", hoverVal: -1},
        ];
        
        $scope.userReview = {
            institute: null,
            exam: $scope.exam._id,
            stream: $scope.category._id,
            text: '',
            tags:[]
        };
        if($scope.user && $scope.user.userId){
            $scope.userReview.user = $scope.user.userId;
        }
        $scope.reviewParams.forEach(function(thisParam, index){
            $scope.userReview[thisParam.name] = null;
        });
        var noReview = false;
        var reviewsQueried = false;
        $scope.$watch('user.userId', function (newValue, oldValue, scope) {
            if(newValue && !reviewsQueried){
                reviewsQueried = true;
                var userInstituteForm = {
                    user: newValue,   
                    instituteIdArray: groupIds,   
                }; reviewService.existingReview(userInstituteForm).success(function (data, status, headers) {
                    if(data && data.length > 0){
                        $scope.userReview = data[0];
                        
                        if($scope.userReview){
                            $scope.reviewParams.forEach(function(thisParam, index){
                                
                            var pIndex = $scope.reviews.indexOf(parseFloat($scope.userReview[thisParam.name]));
                            $scope.setReview(thisParam.name,parseFloat($scope.userReview[thisParam.name]), $scope.userReview);
                                
                            });
                        }
                        
                    }else{
                        //console.log('Here');
                        if($scope.user){
                            //$scope.showUserReviewDialog();
                        }
                    } 
                })
                .error(function (data, status, header, config) {
                    console.log('Error ' + data + ' ' + status);
                }); 
            }else{
            }
        }, true);
        $scope.reviews = [1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0];
        $scope.reviewsClasses = ["review1","review2","review3","review4","review5","review6","review7","review8","review9"];
        $scope.minTextLength = 70;
        
        $scope.placeholder = "Tip: A great review covers information about Faculty, Peer Interaction, Quality of material and Infrastructure. Got recommendations for your favorite faculty and employees, or something everyone should know about " + $scope.provider.name +", " + $scope.provider.city + "? Include that too! And remember, your review needs to be atleast " + $scope.minTextLength + " characters long. The best review will be featured on our main page :)";
        
        var paramNames = $scope.reviewParams.map(function(a) {return a.name;});
        
        $scope.getBackgroundColour = function(reviewParam,  paramIndex, userReview){
            var pIndex = paramNames.indexOf(reviewParam.name);
            var className = "noreview";
            
            var propName = $scope.reviewParams[pIndex].name;
            
            if(userReview && userReview[propName]){
                var review = userReview[propName];
                var rIndex = $scope.reviews.indexOf(review);
                //console.log(rIndex);
                if(paramIndex <= rIndex){
                    var rIndex2 = rIndex + 1;
                    className = "review" + rIndex2;    
                }
            }
            
            if($scope.reviewParams[pIndex].hoverVal >= 0){
                className = "noreview";
            };
            
            if($scope.reviewParams[pIndex].hoverVal >= paramIndex){
                
                var paramIndex2 = paramIndex + 1;
                className = "review" + paramIndex2;
            }
            
            
            return className;
        };
        
        
        $scope.getReviewSelectedColour = function(thisGroup){
            var className = "notselected";
            if($scope.userReview && $scope.userReview.institute && $scope.userReview.institute == thisGroup._id){
                className = "selected";
            }
            
            return className;
        };
        $scope.logMouseEvent = function(reviewParam,  paramIndex) {
            switch (event.type) {
              case "mouseenter":
                    console.log("Hey Mouse Entered");
                    break;
              case "mouseover":{
                    var pIndex = paramNames.indexOf(reviewParam.name);
                    $scope.reviewParams[pIndex].hoverVal = paramIndex;
                    break;
              }
              case "mouseout":{
                    var pIndex = paramNames.indexOf(reviewParam.name);
                    $scope.reviewParams[pIndex].hoverVal = -1;
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
        $scope.reviewCentreError = false;
        $scope.showSelectReviewCentreDialog = function(ev) {
            $mdDialog.show({
              contentElement: '#selectReviewCentreDialog',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true
            });
        };
        $scope.showSelectShortlistCentreDialog = function(ev) {
            $mdDialog.show({
              contentElement: '#selectShortlistCentreDialog',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true
            });
        };
        $scope.showSavedReviewDialog = function(ev) {
            $mdDialog.show({
              contentElement: '#savedReviewDialog',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true
            });
            $timeout(function(){
                $mdDialog.cancel();
            },1000)
        };
        
        $scope.selectReviewCentre = function(){
            if($scope.group.length > 1){
                $scope.showSelectReviewCentreDialog();
            }else{
                $scope.updateReviewInstitute($scope.group[0]);
                $scope.submitReview();
            }
        };
        $scope.cancelSelectReviewCentre = function(){
            $scope.reviewCentreError = false;
            $mdDialog.hide();
        };
        
        
        $scope.submitReview = function(){
            if(!$scope.userReview.institute){
                $scope.reviewCentreError = true;
            }else{
                if($scope.userReview.user){
                    reviewService.savereview($scope.userReview).success(function (data, status, headers) {
                        var reviewId = data;
                        $scope.showSavedReviewDialog();
                        
                        $state.go('availOffer', {userId: $scope.user.userId, reviewId: reviewId});
                        
                        //$state.reload();
                    })
                    .error(function (data, status, header, config) {
                        console.log('Error ' + data + ' ' + status);
                    });
                }else{
                    console.log('No user set');
                    $scope.showLoginForm();
                }
            }
            
            
        };
        
        
        
        $scope.checkReview = function(reviewParam, rateVal) {   
            if($scope.userReview[reviewParam.name] >=rateVal){return true;}else{return false;}
        }
        
        $scope.setReview = function(param, value, userReview){
            //console.log(userReview);
            if(userReview){
                userReview[param] = value;
            }
            
        };
        $scope.invalidSubmit = function(){
            var invalid = false;
            
            $scope.reviewParams.forEach(function(thisParam, index){
                if(!$scope.userReview || !$scope.userReview[thisParam.name]){
                    invalid = true;
                }
            });
            if($scope.userReview){
                $scope.userReview.text = $scope.userReview.text.trim();
                $scope.userReview.text = $scope.userReview.text.replace(/\s+/g, " ");

                var textLength = $scope.userReview.text.length;
                //console.log(textLength);
                if(textLength < $scope.minTextLength){
                    invalid = true;
                }
            }
            if(!$scope.userReview.exam ||  !$scope.userReview.stream ||  !$scope.userReview.year_of_start){
                invalid = true;
            }
            
            return invalid;
        };
        
        
        
        
        
        
        
    }]);
        
        
        
    function onlyUnique(value, index, self) { 
        return self.indexOf(value) === index;
    }       
    exambazaar.controller("offersController", 
    [ '$scope', '$rootScope', 'targetStudyProviderService', 'thisProvider', '$state', '$stateParams', '$cookies', '$mdDialog', '$timeout', 'thisGroupInfo', 'offersList', 'couponsList', 'offerService', 'couponService', 'UserService', function($scope,$rootScope, targetStudyProviderService, thisProvider, $state,$stateParams, $cookies,$mdDialog, $timeout, thisGroupInfo, offersList, couponsList, offerService, couponService, UserService){
        $scope.provider = thisProvider.data;
        $scope.provideroffers = offersList.data;
        //console.log($scope.provideroffers);
        $scope.provideroffers.forEach(function(thisoffer, pIndex){
            var couponNames = thisoffer.coupons.map(function(a) {return a.name;});
            thisoffer.couponNames = couponNames.filter(onlyUnique);
            //console.log(thisoffer.couponNames);
        });
        
        $scope.uniqueOffers = $scope.provideroffers;
        $scope.couponsList = couponsList.data;
        $scope.groupInfo = thisProvider.groupInfo;
        if($cookies.getObject('sessionuser')){
            $scope.user = $cookies.getObject('sessionuser');
        }
        var today = moment();
        var sixMonths = moment().add(6, "months");
        var threeMonths = moment().add(3, "months");
        var offerName = $scope.provider.name + " - " + today.format('DD MMM YY');
        $scope.newoffer = {
            name: offerName,
            provider: $scope.provider._id,
            primaryContact: {},
            otheremails: [],
            othermobiles: [],
            _start: today,
            _end: sixMonths,
            active: true,
            couponBuilder: [],
            offerNameError: '',
        };
        $scope.addEmail = function(){
            if(!$scope.newoffer.otheremails){
                $scope.newoffer.otheremails = [];
            }
            $scope.newoffer.otheremails.push('');
        };
        $scope.addMobile = function(){
            if(!$scope.newoffer.othermobiles){
                $scope.newoffer.othermobiles = [];
            }
            $scope.newoffer.othermobiles.push('');
        };
        $scope.showDeleteMobileConfirm = function(ev) {
        var len = $scope.newoffer.othermobiles.length;
            if(len > 0){
                var lastMobile = $scope.newoffer.othermobiles[len-1];
                if(lastMobile == ''){
                    $scope.newoffer.othermobiles.pop();
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
                          $scope.newoffer.othermobiles.pop();
                        }, function() {
                          //nothing
                        });
                    }
                }
        };
        $scope.showDeleteEmailConfirm = function(ev) {
        var len = $scope.newoffer.otheremails.length;
            if(len > 0){
                var lastEmail = $scope.newoffer.otheremails[len-1];
                if(lastEmail == ''){
                    $scope.newoffer.otheremails.pop();
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
                          $scope.newoffer.otheremails.pop();
                        }, function() {
                          //nothing
                        });
                    }
                }
        };
        
        if($scope.provider.primaryManagement){
            if($scope.provider.primaryManagement.name){
                $scope.newoffer.primaryContact.name = $scope.provider.primaryManagement.name;
            }
            if($scope.provider.primaryManagement.email){
                $scope.newoffer.primaryContact.email = $scope.provider.primaryManagement.email;
                $scope.newoffer.otheremails.push($scope.provider.primaryManagement.email);
            }
            if($scope.provider.primaryManagement.mobile){
                $scope.newoffer.primaryContact.mobile = $scope.provider.primaryManagement.mobile;
                $scope.newoffer.othermobiles.push($scope.provider.primaryManagement.mobile);
            }
        }
            
        $scope.discountTypes = ['Percentage Discount','Flat Discount'];
        $scope.validityTypes = ['From date of issue by Exambazaar','Fixed Expiry Date'];
        var generatedByProvider = "Generated by " + $scope.provider.name;
        $scope.generationTypes = ['Generated by Exambazaar'];
        $scope.generationTypes.push(generatedByProvider);
        //$scope.offer = $scope.newoffer;
        $scope.addOffer = function(){
            $scope.offer = $scope.newoffer;
            $scope.existingOffer = null;
        };
        $scope.setExistingOffer = function(offer){
            $scope.existingOffer = offer;
            $scope.offer = null;
        };
        
        if($scope.provideroffers.length > 0){
            $scope.setExistingOffer($scope.provideroffers[0]);
        }
        
        
        $scope.$watch('existingOffer.coupons', function (newValue, oldValue, scope) {
            
            if(newValue && newValue.length > 0){
                newValue.forEach(function(thisCoupon, cindex){
                if(thisCoupon.user && !thisCoupon.user._id){
                    var userId = thisCoupon.user;
                    UserService.getUserBasic(userId).success(function (data, status, headers) {
                        //console.log(data);
                        thisCoupon.user = data;
                    })
                    .error(function (data, status, header, config) {
                        console.log('Error ' + data + ' ' + status);
                    });



                }
                    
                });
            }

        }, true);
        
        $scope.addCoupon = function(){
            var steps = [];
            steps.push('Go to ' + $scope.provider.website);
            steps.push('Choose the product (test series, correspondence course) you want to purchase');
            steps.push('Enter exclusive promo code (if applicable) at checkout on ' + $scope.provider.website);
            
            var providerEmailText = '';
            if($scope.offer.otheremails.length > 0){
                providerEmailText = " or " +  $scope.offer.otheremails[0];
            }
            
            steps.push('For any help email: always@exambazaar.com' + providerEmailText);
            
            var newCouponTemplate = {
                name: '',
                discountType: 'Percentage Discount',
                validfor: 'All Courses',
                validityType: 'Fixed Expiry Date',
                generationType: generatedByProvider,
                flatDiscount: '500',
                percentageDiscount: '40',
                validtyDuration: '30',
                fixedExpiryDate: threeMonths,
                nCoupons: 1000,
                percentageSocialShareBenefit: 15,
                flatSocialShareBenefit: 250,
                steps: steps,
                couponCodes: [],
                couponNameError: '',
            };
            $scope.offer.couponBuilder.push(newCouponTemplate);
        };
        
        
        $scope.updateDiscountType = function(coupon, discountType){
            coupon.discountType = discountType;
        };
        $scope.updateValidityType = function(coupon, validityType){
            coupon.validityType = validityType;
            //console.log(coupon.validityType);
        };
        $scope.updateGenerationType = function(coupon, generationType){
            coupon.generationType = generationType;
            //console.log(coupon.validityType);
        };
        
        $scope.readyToAddCoupons = function(couponTemplate){
            //console.log(couponTemplate);
            var disabled = false;
            var properties = ["name", "discountType", "validfor", "validityType", "generationType"];
            //"flatDiscount", "percentageDiscount", "validtyDuration", "fixedExpiryDate"
            properties.forEach(function(thisProperty, pIndex){
                if(!couponTemplate[thisProperty] || couponTemplate[thisProperty] == ''){
                    disabled = true;
                }
            });
            if(couponTemplate.discountType && couponTemplate.discountType == 'Percentage Discount'){
                if(!couponTemplate.percentageDiscount || couponTemplate.percentageDiscount == ''){
                    disabled = true;
                }
            }
            if(couponTemplate.discountType && couponTemplate.discountType == 'Flat Discount'){
                if(!couponTemplate.flatDiscount || couponTemplate.flatDiscount == ''){
                    disabled = true;
                }
            }
            if(couponTemplate.validityType && couponTemplate.validityType == 'From date of issue by Exambazaar'){
                if(!couponTemplate.validtyDuration || couponTemplate.validtyDuration == ''){
                    disabled = true;
                }
            }
            if(couponTemplate.validityType && couponTemplate.validityType == 'Fixed Expiry Date'){
                if(!couponTemplate.fixedExpiryDate || couponTemplate.fixedExpiryDate == ''){
                    disabled = true;
                }
            }
            return disabled;
            
        };
        
        
        $scope.generateCoupons = function(couponTemplate){
            var nCoupons = couponTemplate.nCoupons;
            var genCodes = uniqueCodeGenerator(nCoupons*2, $scope.couponsList);
            
            $scope.couponsList = $scope.couponsList.concat(genCodes);
            
            var nLength = genCodes.length;
            var codesArray = genCodes.splice(0,nCoupons);
            var socialCodesArray = genCodes;
            codesArray.forEach(function(thisCode, cIndex){
                var codePair = {
                    code: codesArray[cIndex],
                    socialShareCode: socialCodesArray[cIndex],
                };
                couponTemplate.couponCodes.push(codePair);
            });
            
            //console.log(couponTemplate.couponCodes);
        };
        $scope.removeCouponBuilder = function($index, ev) {
            var couponBuilder = $scope.offer.couponBuilder[$index];
            var confirm = $mdDialog.confirm()
                .title('Would you like to remove ' + couponBuilder.name + '?')
                .textContent('You will not be able to recover the changes in your coupon builder!')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .clickOutsideToClose(true)
                .ok('Confirm')
                .cancel('Cancel');
                $mdDialog.show(confirm).then(function() {
                    $scope.offer.couponBuilder.splice($index, 1);
                    //$state.reload();
                }, function() {
                  //nothing
                });
            
        };
        $scope.showUploadCouponsDialog = function(couponBuilder, ev) {
            $scope.uploadCouponBuilder = couponBuilder;
            $mdDialog.show({
              contentElement: '#uploadCouponsDialog',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true
            });
        };
        $scope.cancelDialog = function(){
            $mdDialog.hide();
        };
        $scope.uploadedCoupons = [];
        
        function correctCode(code){
            var ALPHABET = '23456789ABDEGJKMNPQRVWXYZ';
            var conforms = true;
            /*
            if(code.length != 8){
                conforms = false;
            }
            if(code[0] != 'E' && code[0] != 'B'){
                conforms = false;
            }
            
            for (var i = 0, len = code.length; i < len; i++) {
                if(ALPHABET.indexOf(code[i]) == -1){
                    conforms = false;
                    console.log(code);
                }
            }*/
            return conforms;
        };
        
        $scope.submitUploadedCoupons = function(couponTemplate){
            var excelCodesArray = $scope.uploadedCoupons.map(function(a) {return a.code;});
            var excelSocialCodesArray = $scope.uploadedCoupons.map(function(a) {return a.socialShareCode;});
            
            $scope.uploadErrorMessages = null;
            var codesArray = [];
            var socialCodesArray = [];
            
            excelCodesArray.forEach(function(thisCode, cIndex){
                if(thisCode ){//&& thisCode!= ''
                    codesArray.push(thisCode);
                    /*if(correctCode(thisCode)){
                        codesArray.push(thisCode);
                    }else{
                        if(!$scope.uploadErrorMessages){
                            $scope.uploadErrorMessages = [];
                        }
                        $scope.uploadErrorMessages.push('Incorrect Code: ' + thisCode);
                    }*/
                }else{
                    if(cIndex < excelSocialCodesArray.length-1){
                        codesArray.push(thisCode);
                    }
                    
                }
            });
            excelSocialCodesArray.forEach(function(thisCode, cIndex){
                if(thisCode && thisCode!= ''){
                    if(correctCode(thisCode)){
                        socialCodesArray.push(thisCode);
                    }else{
                        if(!$scope.uploadErrorMessages){
                            $scope.uploadErrorMessages = [];
                        }
                        $scope.uploadErrorMessages.push('Incorrect Social Share Code: ' + thisCode);
                    }
                }
            });
            
            if(!$scope.uploadErrorMessages && codesArray.length > 0 && socialCodesArray.length > 0 && codesArray.length == socialCodesArray.length){
                console.log('We are set to add coupons');
                codesArray.forEach(function(thisCode, cIndex){
                    var codePair = {
                        code: codesArray[cIndex],
                        socialShareCode: socialCodesArray[cIndex],
                    };
                    couponTemplate.couponCodes.push(codePair);
                });
                $mdDialog.hide();
            }else{
                if(!$scope.uploadErrorMessages){
                    $scope.uploadErrorMessages = [];
                }
                console.log(codesArray.length + " " +  socialCodesArray.length);
                $scope.uploadErrorMessages.push('Please add equal valid normal and social coupon codes before submitting');
            }
            $scope.uploadedCoupons = [];
            console.log();  
        };
        
        $scope.removeCodes = function($index, ev) {
            var couponBuilder = $scope.offer.couponBuilder[$index];
            var confirm = $mdDialog.confirm()
                .title('Would you like to remove ' + couponBuilder.couponCodes.length + ' coupons for ' + couponBuilder.name + '?')
                .textContent('You can regenerate the codes in your coupon builder!')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .clickOutsideToClose(true)
                .ok('Confirm')
                .cancel('Cancel');
                $mdDialog.show(confirm).then(function() {
                    $scope.uploadedCoupons = [];
                    couponBuilder.couponCodes = [];
                    //$state.reload();
                }, function() {
                  //nothing
                });
            
        };
        
        $scope.disabledAddOffer = function(){
            var disabled = false;
        };
        
        $scope.saveOffer = function(offer){
            $scope.saveOfferError = null;
            if(offer.couponBuilder.length == 0){
                if(!$scope.saveOfferError){
                    $scope.saveOfferError = [];
                }
                $scope.saveOfferError.push('Add atleast one coupon builder and coupon codes');
            }else if(offer.offerNameError != ''){
                console.log(offer.offerNameError);
                if(!$scope.saveOfferError){
                    $scope.saveOfferError = [];
                }
                $scope.saveOfferError.push("Offer Name already exists! Choose another name");
            }else if(offer.couponBuilder.length > 0){
                
                offer.couponBuilder.forEach(function(thisCouponBuilder, index){
                    console.log(thisCouponBuilder.steps);
                    thisCouponBuilder.steps.forEach(function(thisStep, sindex){
                        console.log(thisStep.trim());
                        if(thisStep.trim() == ''){
                            thisCouponBuilder.steps.splice(sindex, 1);
                        }
                    });
                    if(thisCouponBuilder.couponCodes.length == 0){
                        if(!$scope.saveOfferError){
                            $scope.saveOfferError = [];
                        }
                        $scope.saveOfferError.push('Generate or upload atleast one coupon code for ' + thisCouponBuilder.name);
                    }
                    if(thisCouponBuilder.couponNameError != ''){
                        $scope.saveOfferError.push("Coupon Name already exists! Choose another name: " + thisCouponBuilder.name);
                        
                    }
                });
                
                if(!$scope.saveOfferError){
                    console.log($scope.offer);
                    var saveOffer = offerService.saveOffer($scope.offer).success(function (data, status, headers) {
                        //console.log(data);
                        $state.reload();
                    })
                    .error(function (data, status, header, config) {
                        console.log('Error ' + data + ' ' + status);
                    });
                    
                    
                }
            }
        };
        
        function uniqueCodeGenerator(count, previous){
            var ALPHABET = '23456789ABDEGJKMNPQRVWXYZ';
            var ALPHABET_LENGTH = ALPHABET.length;
            var ID_LENGTH = 6;
            var UNIQUE_RETRIES = 9999;
            var HashID = {};
            HashID.generate = function() {
              var rtn = '';
              for (var i = 0; i < ID_LENGTH; i++) {
                rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET_LENGTH));
              }
              return rtn;
            };

            HashID.generateUnique = function(previous) {
              previous = previous || [];
              var retries = 0;
              var id;

              // Try to generate a unique ID,
              // i.e. one that isn't in the previous.
              while(!id && retries < UNIQUE_RETRIES) {
                id = HashID.generate();
                if(previous.indexOf(id) !== -1) {
                  id = null;
                  retries++;
                }
              }

              return id;
            };
            var codesArray = [];

            while (codesArray.length < count) {
                var newCode = "EB" + HashID.generateUnique(codesArray);
                codesArray.push(newCode);
            }
            return codesArray;

        };
        
        
        $scope.$watch('offer.name', function (newValue, oldValue, scope) {
            if(newValue != null && newValue != '' && newValue!=oldValue){
                //$scope.offerNameError = '';
                var nameForm = {
                    name: newValue
                };
                offerService.nameExists(nameForm).success(function (data, status, headers) {
                    if(data){
                        $scope.offer.offerNameError = "Offer Name already exists! Choose another name";
                    }else{
                        $scope.offer.offerNameError = ''
                    }

                    $scope.fetching = false;
                }).error(function (data, status, header, config) {
                    console.log("Error ");
                });
            }
        }, true);
        
        $scope.$watch('offer.couponBuilder', function (newValue, oldValue, scope) {
            if(newValue != null && newValue != '' && newValue.length > 0 &&  newValue!=oldValue){
                
            newValue.forEach(function(thisCouponBuilder, index){
                //thisCouponBuilder.couponNameError = '';
                var nameForm = {
                    name: thisCouponBuilder.name
                };
                if(!oldValue[index] || thisCouponBuilder.name != oldValue[index].name){
                    couponService.nameExists(nameForm).success(function (data, status, headers) {
                    //console.log(data);
                    if(data){
                        thisCouponBuilder.couponNameError = "Coupon Name already exists! Choose another name";
                        
                        }else{
                            thisCouponBuilder.couponNameError = '';
                        }

                        $scope.fetching = false;
                    }).error(function (data, status, header, config) {
                        console.log("Error ");
                    }); 
                    
                }
                
                
            });
                
            }
        }, true);
        
    }]);  
    
    
    
    
    
    
    exambazaar.controller("claimController", 
    [ '$scope', '$rootScope', 'targetStudyProviderService', 'ImageService', 'LocationService', 'OTPService','UserService', 'cisavedService', 'tofillciService', 'viewService', 'Upload', 'thisProvider', 'imageMediaTagList', 'videoMediaTagList', 'examList', 'streamList', 'cisavedUsersList' , '$state', '$stateParams', '$cookies', '$mdDialog', '$timeout', 'toverifyciService',  'thisGroupInfo', 'addContactInfoService', 'rateInstituteService', function($scope,$rootScope, targetStudyProviderService, ImageService, LocationService, OTPService, UserService, cisavedService, tofillciService, viewService, Upload, thisProvider, imageMediaTagList, videoMediaTagList,  examList,streamList, cisavedUsersList , $state,$stateParams, $cookies,$mdDialog, $timeout, toverifyciService,  thisGroupInfo, addContactInfoService, rateInstituteService){
        $scope.provider = thisProvider.data;
        $scope.thisGroupInfo = thisGroupInfo.data;
        
        if(!$scope.provider || !$scope.thisGroupInfo){
            $state.go('error');
        }
        
        $scope.imageTags = imageMediaTagList.data.mediaTypeTags;
        $scope.imageTypes = imageMediaTagList.data.distinctTypes;
        $scope.videoTags = videoMediaTagList.data.mediaTypeTags;
        $scope.videoTypes = videoMediaTagList.data.distinctTypes;
        
        
        
        /*console.log($scope.videoTags);
        console.log($scope.videoTypes);*/
        
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
            //console.log(JSON.stringify(thisOTP));
            OTPService.generateOTP(thisOTP).success(function (data, status, headers) {
                $scope.serverOTP = data.otp;
                
            })
            .error(function (data, status, header, config) {
                console.log();
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
                //console.log(newValue);
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
                address: $scope.provider.address + ", " + $scope.provider.city ,
                callback: function(results, status) {
                    
                    if (status == 'OK') {
                        console.log(results[0].geometry.location.lat() + ", " + results[0].geometry.location.lng());
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
                console.log('Error ' + data + ' ' + status);
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
        
        
        $scope.components = [
            /*'Overview',*/
            'Contact',
            'Exams',
            'Results',
            'Courses',
            'Photos',
            'Videos',
            'Faculty',
            
        ];
        if($scope.provider && $scope.provider.type != 'Online Coaching'){
            $scope.components.push('Location');
        }
        
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
                clickOutsideToClose: false,
                escapeToClose: false,
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
                state: $state.current.name,
                state2: 'logged in',
                user: $scope.user.userId,
                claim: true
            };
            if($cookies.getObject('ip')){
                var ip = $cookies.getObject('ip');
                //console.log(ip);
                viewForm.ip = ip;
            }
            viewService.saveview(viewForm).success(function (data, status, headers) {
                //console.log('View Marked');
            })
            .error(function (data, status, header, config) {
                console.log();
            });
            UserService.getUserShortlisted($scope.user.userId).success(function (data, status, headers) {
                var shortlistedIds = data.map(function(a) {return a._id;});
                if(shortlistedIds.indexOf($scope.provider._id) != -1){
                    $scope.shortlisted = true;
                }
                //console.log(data);
            })
            .error(function (data, status, header, config) {
                console.log('Shortlist Error' + status + " " + data);    
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
                state: $state.current.name,
                state2: 'not logged in',
                claim: true
            };
            if($cookies.getObject('ip')){
                var ip = $cookies.getObject('ip');
                viewForm.ip = ip;
            }
            viewService.saveview(viewForm).success(function (data, status, headers) {
                console.log('View Marked');
            })
            .error(function (data, status, header, config) {
                console.log();
            });
            $scope.showClaimDialog();
        }
        
        
        $scope.markPrimaryManagement = function(){
            $state.go('partner-dashboard', {userId: $scope.user.userId});
        };
        
        var city =  $scope.provider.city;
        LocationService.getCityLocations(city).success(function (data, status, headers) {
            $scope.cityLocations = data;
            //console.log($scope.cityLocations);
        })
        .error(function (data, status, header, config) {
            console.log("Error ");
        });
        
        $scope.allExams = examList.data;
        $scope.allStreams = streamList.data;
        $scope.streamIds=[];
        $scope.streams=[];
        $scope.preview = {
            stream: null,
            exam: null,
        };
        $scope.provider.exams.forEach(function(thisExam, index){
            if(!$scope.preview.exam){
                $scope.preview.exam = thisExam.name;
                $scope.preview.stream = thisExam.stream.name;
            }
            if($scope.streamIds.indexOf(thisExam.stream._id)==-1){
                $scope.streamIds.push(thisExam.stream._id);
                $scope.streams.push(thisExam.stream);
            }
        });
        //console.log($scope.preview);
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
                //console.log(ebVerfiyForm);
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
                        console.log("Error ");
                    });
                    
                })
                .error(function (data, status, header, config) {
                    console.log("Error");
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
                console.log(contactInfoForm);
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
                        console.log("Error ");
                    });
                    
                })
                .error(function (data, status, header, config) {
                    console.log("Error");
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
                    console.log("Error ");
                });
            }
        };
        
        $scope.removeProviderConfirm = function(provider){
            console.log('I am here');
            console.log(provider.name);
            var confirm = $mdDialog.confirm()
            .title('Would you like to remove coaching named ' + provider.name + ', located at ' +  provider.address + ', ' + provider.city + '?')
            .textContent('You will not be able to revert it later')
            .ariaLabel('Lucky day')
            .targetEvent()
            .clickOutsideToClose(true)
            .ok('Confirm')
            .cancel('Cancel');
            $mdDialog.show(confirm).then(function() {
                $scope.removeProvider(provider);
            }, function() {
              //nothing
                $scope.showExamDialog();
            });     
        };
        $scope.removeProvider = function(provider){
             targetStudyProviderService.removeProvider(provider._id).success(function (data, status, headers) {
                if(data){
                    $scope.showSavedDialog();
                }else{
                    console.log('Something went wrong');   
                }
            })
            .error(function (data, status, header, config) {
            console.log('Error ' + data + ' ' + status);
            });  
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
        $scope.editEBVerify = false;
        $scope.editEBRating = false;
        
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
                    console.log('Institute Shortlisted');
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
                    //console.log(JSON.stringify(thisExamResult));
                    //console.log('--' + thisExamResult.result.length + ' ' + thisExamResult.initialLength);
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
            console.log(JSON.stringify($scope.provider.course));
            
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
        
        $scope.removeAllExams = function(){
            alert('I am here');
            if($scope.editable){
                
                var confirm = $mdDialog.confirm()
                .title('Do you want to remove all exams for this coaching?')
                .textContent('Be very careful. You will not be able to revert this!')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .clickOutsideToClose(true)
                .ok('Confirm')
                .cancel('Cancel');
                $mdDialog.show(confirm).then(function() {
                    $scope.provider.exams = [];
                    $scope.saveProvider();
                }, function() {
                  //nothing
                }); 
                
                
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
            //console.log($scope.provider);
            var saveProvider = {
                targetStudyProvider:$scope.provider,
                user: $scope.user.userId
            };
            targetStudyProviderService.saveProvider(saveProvider).success(function (data, status, headers) {
                $scope.showSavedDialog();
                $state.reload();
                console.log("Done");
            })
            .error(function (data, status, header, config) {
                console.log("Error ");
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
                        console.log('Pivot not set');
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
                    //console.log(resultWithImages);
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
                    //console.log(yearResult);
                    yearResult.forEach(function(thisYearResult, yearResultIndex){
                        if(thisYearResult.year == year){
                            thisYearResult.result.push(thisResult);
                        }
                    });
                    }
                });
                if(counter == nLength){
                    $scope.examWiseResult = examWiseResult;
                    //console.log($scope.examWiseResult);
                }
            });
            if(nLength ==0){
                $scope.examWiseResult = examWiseResult;
            }
        };
        
        $scope.resultHelper('exam',$scope.providerExamIds);
        $scope.examPivotResults =$scope.pivotResult;
        //console.log($scope.examPivotResults);
        $scope.resultSortExamYear();
        //console.log($scope.examWiseResult);
        
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
                    //console.log(yearResult);
                    yearResult.forEach(function(thisYearResult, yearResultIndex){
                        if(thisYearResult.exam == exam){
                            thisYearResult.result.push(thisResult);
                        }
                    });
                    }
                });
                
                
                
                //console.log(year + ' ' + exam);
                if(counter == nLength){
                    //console.log(pivotResult);
                    $scope.yearWiseResult = yearWiseResult;
                }
            });
        };
       
        $scope.markasdone = function(){
            
            
            var cisavedForm = {
                institute: $scope.provider._id,
                user: $scope.user.userId
            };
            console.log(cisavedForm);
            cisavedService.savecisaved(cisavedForm).success(function (data, status, headers) {
                tofillciService.markDone(cisavedForm)
                .success( function (data, status, headers) {
                    $scope.showMarkedDialog();
                    $state.reload();
                })
                .error(function (data, status, header, config) {
                    console.log("Error ");
                });
                
            })
            .error(function (data, status, header, config) {
                console.log("Error ");
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
                console.log($scope.provider);
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
                        console.log("Done");
                    }
                    
                })
                .error(function (data, status, header, config) {
                    console.log("Error ");
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
                //console.log("Done");
                if(data == 'Done'){
                    var refreshedProvider = targetStudyProviderService.getProvider(providerId).success(function (refreshedProvider, status, headers) {
                    $scope.provider = refreshedProvider;
                     $scope.resultHelper('exam',$scope.providerExamIds);
                    $scope.examPivotResults =$scope.pivotResult;
                    //console.log(JSON.stringify($scope.examPivotResults));
                    $scope.resultSortExamYear();
                    $scope.editResult = false;

                    }).error(function (data, status, header, config) {
                        console.log("Error ");
                    });
                    
                    
                    $scope.showSavedDialog();
                    $state.reload();
                }
            })
            .error(function (data, status, header, config) {
                console.log("Error ");
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
                //console.log(JSON.stringify(indexPair));
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
        $scope.editDescription = false;
        $scope.addeditDescription = function(){
            $scope.editDescription = true;
            
            
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
            console.log(JSON.stringify($scope.provider.ebNote));
            
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
            //console.log(JSON.stringify($scope.tagThisVideo));
            if($scope.tagThisVideo.tags.indexOf(tag._id) == -1){
                $scope.tagThisVideo.tags.push(tag._id);
            }
            
        };
        
        $scope.removeVideoTag = function(tag){
            //console.log(JSON.stringify($scope.tagThisVideo));
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
        
        $scope.showRatingDoneDialog = function(ev) {
            $mdDialog.show({
              contentElement: '#ratingDoneDialog',
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
            console.log(index + ' ' + examResult.result.length); 
            console.log(JSON.stringify(indexPair));
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
                console.log('Success ' + thisFile.name + 'uploaded. Response: ' + resp.data);
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
                            console.log("Error ");
                        });
                    }
                })
                .error(function (data, status, header, config) {
                    console.log("Error ");
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
                console.log("Error");
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
                console.log('Success ' + thisFile.name + 'uploaded. Response: ' + resp.data);
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
                console.log("Error");
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
                console.log('Success ' + thisFile.name + 'uploaded. Response: ' + resp.data);
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
                            //console.log(JSON.stringify($scope.examPivotResults));
                            $scope.resultSortExamYear();
                            $scope.editResult = false;
                            
                            
                            $scope.showSavedDialog();
                            //$state.reload();
                        }).error(function (data, status, header, config) {
                            console.log("Error ");
                        });
                       
                        
                        
                    }
                })
                .error(function (data, status, header, config) {
                    console.log("Error ");
                });
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                }, function (evt) {
                    
                });

            })
            .error(function (data, status, header, config) {
                console.log("Error");
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
                console.log('Success ' + thisFile.name + 'uploaded. Response: ' + resp.data);
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
                            console.log("Error ");
                        });
                       
                        
                        
                    }
                })
                .error(function (data, status, header, config) {
                    console.log("Error ");
                });
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                }, function (evt) {
                    
                });

            })
            .error(function (data, status, header, config) {
                console.log("Error");
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
                console.log('Success ' + thisFile.name + 'uploaded. Response: ' + resp.data);
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
                            console.log("Error ");
                        });
                    }
                })
                .error(function (data, status, header, config) {
                    console.log("Error ");
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
                console.log("Error");
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
                console.log('Success ' + thisFile.name + 'uploaded. Response: ' + resp.data);
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
                            console.log("Error ");
                        });
                    }
                })
                .error(function (data, status, header, config) {
                    console.log("Error ");
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
                console.log("Error");
            });   
                 
            });
            }
         };
        
        
        
        
        
        $scope.ratingParams = [
            {
                name: "n_centers",
                displayname: "No. of Centres",
                options: ["> 20","10 - 20","5 - 10","2 - 5","1"],
                
            },
            {
                name: "n_exams",
                displayname: "No. of Exams",
                options: ["> 5","4","3","2","1"],
                
            },
            {
                name: "total_students",
                displayname: "Total Students",
                options: ["> 1000","500 - 1000","250 - 500","100 - 250","< 100"],
                
            },
            {
                name: "avg_batch_strength",
                displayname: "Average Batch Strength",
                options: ["20 - 30","30 - 50","50 - 70","70 - 100","> 100"],
                
            },
            {
                name: "student_to_faculty_ratio",
                displayname: "Student to Faculty Ratio",
                options: ["< 20","20 - 30","30 - 50","50 - 100","> 100"],
                
            },
            {
                name: "avg_teacher_experience",
                displayname: "Average Teacher Experience (years)",
                options: ["> 15","10 - 15","5 - 10","2 - 5","< 2"],
                
            },
            
        ];
        
        $scope.ratingFacilities = [
            {name:"printed_notes",displayname:"Printed Notes/ Study Material",description:"Does the CI supply printed notes?",},
            {name:"test_series",displayname:"Test Series",description:"Does the CI have its own test series?",},
            {name:"dlp",displayname:"DLP",description:"Does the CI have Distance Learning Program?",},
            {name:"hostel",displayname:"Hostel",description:"Does the CI have hostel facilities?",},
            {name:"doubt_sessions",displayname:"Doubt sessions",description:"Does the CI have periodic doubt sessions?",},
            {name:"periodic_performance_tests",displayname:"Periodic Performance Tests",description:"Does the CI have periodic performance tests?",},
            {name:"online_lectures",displayname:"Online Lectures",description:"Does the CI have online lectures?",},
            {name:"n_classrooms",displayname:"Classrooms > 5",description:"Does the CI have more than 5 classrooms in the centre?",},
            {name:"counselling",displayname:"Counselling",description:"Does the CI offer counselling?",},
            {name:"entrance_test",displayname:"Entrance Test",description:"Does the CI have an entrance test?",},

        ];
        
        $scope.examRatingParams = [
            {
                name: "percent_students_selected",
                displayname: "% of students selected in the Exam",
                options: ["> 50%","25% - 50%","10% - 25%","5% - 10%","< 5%"],
                
            },
            {
                name: "ranks_top100",
                displayname: "Ranks of students in top 100",
                options: ["> 25","15 - 25","10 - 15","5 - 10","1 - 5","0"],
                
            },
            {
                name: "ranks_top1000",
                displayname: "Ranks of students in top 1000",
                options: ["> 200","100 - 200","50 - 100","10 - 50","< 10", "0"],
                
            },
        ];
        
        $scope.editRating = false;
        $scope.editRatings = function(){
            $scope.editRating = true;
        };
        
        $scope.ratingParamValues = {};
        $scope.ratingParamEstimate = {};
        $scope.ratingParamValue = {};
        
        $scope.examRatingParamValues = [];
        $scope.ratingFacilitiesValues = {};
        
        $scope.ratingParams.forEach(function(thisRP, rpIndex){
            $scope.ratingParamValues[thisRP.name] = null;
            $scope.ratingParamEstimate[thisRP.name] = false;
            $scope.ratingParamValue[thisRP.name] = '';
        });
        
        $scope.ratingFacilities.forEach(function(thisF, fIndex){
            $scope.ratingFacilitiesValues[thisF.name] = false;
            
        });
        
        $scope.setExamRatingResultType = function (examRatingResultType, examRatingParamValue){
            examRatingParamValue.resultType = examRatingResultType;
        };
        $scope.examRatingResultTypes = ['CLP only','CLP+DLP'];
        
        $scope.provider.exams.forEach(function(thisExam, examIndex){
            var examRating = {
                exam: thisExam,
                resultType: 'CLP+DLP',
                rating: {
                },
            };
            /*var ratingParam = {
                    option: null, 
                    estimate: false, 
                    value: '',
            },*/
            $scope.examRatingParams.forEach(function(thisRP, rpIndex){
                examRating.rating[thisRP.name] = {
                    option: null, 
                    estimate: false, 
                    value: '',
                };
            });
            $scope.examRatingParamValues.push(examRating);
        });
        //console.log($scope.examRatingParamValues);
        
        if($scope.provider.rating){
            for (var property in $scope.ratingParamValues) {
                if($scope.provider.rating[property]){
                    $scope.ratingParamValues[property] = $scope.provider.rating[property].option;
                    $scope.ratingParamEstimate[property] = $scope.provider.rating[property].estimate;
                    $scope.ratingParamValue[property] = $scope.provider.rating[property].value;
                }
            }
            
            if($scope.provider.rating.examRating && $scope.provider.rating.examRating.length > 0){
                //console.log('Am here');
                $scope.examRatingParamValues = $scope.provider.rating.examRating;
            }
            
            if($scope.provider.rating.facilities){
                $scope.ratingFacilitiesValues = $scope.provider.rating.facilities;
            }
            
        }
        
        
        $scope.setRatingParam = function(ratingParam, option){
            $scope.ratingParamValues[ratingParam.name] = option;
        };
        $scope.setRatingFacility = function(ratingFacility){
            $scope.ratingFacilitiesValues[ratingFacility.name] = true;
        };
        $scope.unsetRatingFacility = function(ratingFacility){
            $scope.ratingFacilitiesValues[ratingFacility.name] = false;
        };
        $scope.setExamRatingParam = function(examRatingParamValue, examRatingParam, option){
            examRatingParamValue.rating[examRatingParam.name].option = option;
            //console.log($scope.examRatingParamValues);
        };
        
        
        
        $scope.checkRatingFilled = function(){
            var disabled = false;
            for (var property in $scope.ratingParamValues) {
                if(!$scope.ratingParamValues[property]){
                    disabled = true;
                }
            } /*$scope.examRatingParamValues.forEach(function(examRatingParamValue, erpIndex){
                for (var property in examRatingParamValue.rating) {
                    if(!examRatingParamValue.rating[property]){
                        disabled = true;
                    }
                }
            });*/
            return disabled;
        };
        
        
        
        
        $scope.saveProviderRating = function (){
            if(!$scope.provider.rating){
                $scope.provider.rating = {};
            }
            //console.log($scope.examRatingParamValues);
            $scope.ratingParams.forEach(function(thisRP, rpIndex){
                var ratingObj = {
                    option: $scope.ratingParamValues[thisRP.name], 
                    estimate: $scope.ratingParamEstimate[thisRP.name], 
                    value: $scope.ratingParamValue[thisRP.name],
                };
                $scope.provider.rating[thisRP.name] = ratingObj;
                /*
                $scope.ratingParamValues[thisRP.name] = null;
                $scope.ratingParamEstimate[thisRP.name] = false;
                $scope.ratingParamValue[thisRP.name] = '';*/
            });
            
            /*for (var property in $scope.ratingParamValues) {
                $scope.provider.rating[property] = $scope.ratingParamValues[property];
            }*/
            
            $scope.provider.rating.facilities = $scope.ratingFacilitiesValues;
            
            $scope.provider.rating.examRating = [];
            $scope.examRatingParamValues.forEach(function(examRatingParamValue, erpIndex){
                //console.log(examRatingParamValue);
                var examRatingElem = {
                    exam: examRatingParamValue.exam._id,
                    rating: examRatingParamValue.rating,
                }
                //console.log(examRatingElem);
                $scope.provider.rating.examRating.push(examRatingElem);
            });
            
            
            var saveProvider = {
                targetStudyProvider:$scope.provider,
                user: $scope.user.userId
            };
            
            targetStudyProviderService.saveProvider(saveProvider).success(function (data, status, headers) {
                
                var rateInstituteForm = {
                    institute: $scope.provider._id
                };
                console.log(rateInstituteForm);
                rateInstituteService.markDone(rateInstituteForm)
                .success( function (data, status, headers) {
                    $scope.showRatingDoneDialog();
                    //$state.reload();
                    console.log("Rating Marked");
                })
                .error(function (data, status, header, config) {
                    console.log("Error ");
                });
                
                
                
                
                
            })
            .error(function (data, status, header, config) {
                console.log("Error ");
            });
             
            
            
            //$scope.saveProvider();
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
        
        
    }]);     
   
    exambazaar.controller("showCoachingController", 
    [ '$scope','$rootScope', 'targetStudyProviderService','thisProvider','$state','$stateParams', '$cookies','thisStream','thisExam', '$document', function($scope,$rootScope, targetStudyProviderService,thisProvider,$state,$stateParams, $cookies,thisStream,thisExam,$document){
        $scope.hideLoginDialog();
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
        console.log($scope.streams);
        
        
        
        
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
                            console.log("Done");
                        })
                        .error(function (data, status, header, config) {
                            console.log("Error ");
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
                            console.log("Done");
                        })
                        .error(function (data, status, header, config) {
                            console.log("Error ");
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
                            console.log("Done");
                        })
                        .error(function (data, status, header, config) {
                            console.log("Error ");
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
    function compareDates(dateTimeA, dateTimeB) {
        //returns 1 if dateTimeA > dateTimeB
        dateTimeA = new Date(dateTimeA);
        var momentA = moment(dateTimeA,"DD/MM/YYYY");
        var momentB = moment(dateTimeB,"DD/MM/YYYY");
        if (momentA > momentB) return 1;
        else if (momentA < momentB) return -1;
        else return 0;
    };
    exambazaar.controller("masterDashboardController", 
        [ '$scope', 'usersCount', 'verifiedUsersCount', 'studentCount', 'coachingCount', 'internList', 'tofillciList', 'tofillciService', 'viewService', '$state', 'masterViewSummary','coachingSavedCount', 'filledCount', 'reviewsCount', 'couponsCount', 'issuedcouponsCount' , '$mdDialog', 'toverifyciService', 'toverifyciList', 'verifiedCount', '$rootScope', 'targetStudyProviderService', '$timeout', 'addContactInfoService', 'addContactInfoList', 'rateInstituteService', 'rateInstituteList', 'couponService', function($scope, usersCount, verifiedUsersCount, studentCount, coachingCount, internList, tofillciList, tofillciService,viewService, $state, masterViewSummary, coachingSavedCount , filledCount, reviewsCount, couponsCount, issuedcouponsCount,  $mdDialog, toverifyciService, toverifyciList, verifiedCount, $rootScope, targetStudyProviderService, $timeout, addContactInfoService, addContactInfoList, rateInstituteService, rateInstituteList, couponService){
            
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
                console.log(task._deadline + ' ' + day + ' ' + comp);
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
            //console.log($scope.internList);
            $scope.internList.forEach( function(thisIntern, index){
                if(thisIntern.active){
                    $scope.activeInternList.push(thisIntern);    
                }
            });
            
            $scope.couponDatabaseEdit = function(){
                console.log('Database edit starting');
                couponService.databaseServices().success(function (data, status, headers) {
                    alert('All Done');
                })
                .error(function (data, status, header, config) {
                    console.log(status + " " + data);
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
                    console.log(status + " " + data);
                });
            };
            
            $scope.changeUserContactInfo = function(){
                addContactInfoService.changeUser().success(function (data, status, headers) {
                    $scope.showSavedDialog();
                    $state.reload();
                })
                .error(function (data, status, header, config) {
                    console.log(status + " " + data);
                });
            };
            $scope.filledCount = filledCount.data;
            $scope.reviewsCount = reviewsCount.data;
            $scope.couponsCount = couponsCount.data;
            $scope.issuedcouponsCount = issuedcouponsCount.data;
            
            $scope.tofillciList = tofillciList.data;
            
            var tofillGroupNames = $scope.tofillciList.map(function(a) {return a.institute.groupName;});
            $scope.toverifyciList = toverifyciList.data;
            $scope.addContactInfoList = addContactInfoList.data;
            $scope.rateInstituteList = rateInstituteList.data;
            
            var rateGroupNames = $scope.rateInstituteList.map(function(a) {return a.institute.groupName;});
            
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
                    //console.log(internIndex);
                    $scope.internDueList[internIndex].assigned += 1;
                    
                    //console.log(thisTask._deadline + ' ' + rightNow + ' ' + compare(rightNow, new Date(thisTask._deadline)));
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
                        console.log(status + " " + data);
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
                    console.log(JSON.stringify(data));
                })
                .error(function (data, status, header, config) {
                    console.log("Error ");
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
                    
                    var toverifyciForm = {
                        verifyCity: verifyCity,
                        instituteVerifyCount: instituteVerifyCount,
                        user: intern,
                        _deadline: ciVerifyDeadline,
                    };
                   console.log(toverifyciForm); toverifyciService.savetoverifyci(toverifyciForm).success(function (data, status, headers) {
                        console.log('Done');
                        $state.reload();
                    })
                    .error(function (data, status, header, config) {
                        console.log(status + " " + data);
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
                   console.log(addContactInfoForm); addContactInfoService.saveaddContactInfo(addContactInfoForm).success(function (data, status, headers) {
                        console.log('Done');
                        $state.reload();
                    })
                    .error(function (data, status, header, config) {
                        console.log(status + " " + data);
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
            
            
            $scope.showRateRemoveConfirm = function(rateInstitute, ev) {
                //console.log(JSON.stringify(rateInstitute.user));
                var confirm = $mdDialog.confirm()
                    .title('Would you like to remove ' + rateInstitute.institute.name + ' for ' +  rateInstitute.user.basic.name + '?')
                    .textContent('Assigned on: ' + moment(rateInstitute._created).format('DD-MMM HH:mm') + ', Deadline: ' + moment(rateInstitute._deadline).format('DD-MMM HH:mm') + '!')
                    .ariaLabel('Lucky day')
                    .targetEvent(ev)
                    .clickOutsideToClose(true)
                    .ok('Confirm')
                    .cancel('Cancel');
                    $mdDialog.show(confirm).then(function() {
                      $scope.removeRateAssigned(rateInstitute);
                    }, function() {
                      //nothing
                    });

            };
            
            
            $scope.removeAssigned = function(tofillci){
                console.log(tofillci);
                tofillciService.removeAssigned(tofillci._id);
                $state.reload();
            };
            
            $scope.removeRateAssigned = function(rateInstitute){
                console.log(rateInstitute);
                rateInstituteService.removeAssigned(rateInstitute._id);
                $state.reload();
            };
            
            $rootScope.pageTitle = 'Master Dashboard';
            $scope.fetching = false;
            $scope.$watch('instituteInput', function (newValue, oldValue, scope) {
            if(newValue != null && newValue != ''){
                //console.log(newValue);
                //DEF
                var newValueArr = newValue.split("/");
                newValue = newValueArr[newValueArr.length-1];
                //$scope.email.instituteId = newValue;
                //console.log(newValue);
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
                        console.log("Error ");
                    });
                    
                    //tofillGroupNames 
                    /*tofillciService.prevFilled(newValue).success(function (prevfilleddata, status, headers) {
                        $scope.prevFilledLength = prevfilleddata;
                        
                        $scope.fetching = false;
                    })
                    .error(function (data, status, header, config) {
                        console.log(status + " " + data);
                    });*/
                    
                    
                    
                    
                }

            }

            }, true);
            
            
            
            
            $scope.rateInstitutefetching = false;
            $scope.$watch('rateInstitute', function (newValue, oldValue, scope) {
            if(newValue != null && newValue != ''){
                //console.log(newValue);
                //DEF
                var newValueArr = newValue.split("/");
                newValue = newValueArr[newValueArr.length-1];
                //$scope.email.instituteId = newValue;
                //console.log(newValue);
                if(newValue.length > 5){
                    $scope.fetching = true;
                    $scope.assignError = false;
                    console.log(newValue);
                    targetStudyProviderService.getGroupName(newValue).success(function (data, status, headers) {
                        console.log(data);
                        if(data){
                            $scope.assignGroup = data;
                            if(rateGroupNames.indexOf(data) == -1){
                                $scope.prevRateLength = 0;
                            }else{
                                $scope.prevRateLength = 1;
                            }
                        }else{
                            $scope.assignError = true;
                        }
                        
                        $scope.fetching = false;
                    }).error(function (data, status, header, config) {
                        console.log("Error ");
                    });
                    
                    //tofillGroupNames 
                    /*tofillciService.prevFilled(newValue).success(function (prevfilleddata, status, headers) {
                        $scope.prevFilledLength = prevfilleddata;
                        
                        $scope.fetching = false;
                    })
                    .error(function (data, status, header, config) {
                        console.log(status + " " + data);
                    });*/
                    
                    
                    
                    
                }

            }

            }, true);
            
            $scope.ciRateDeadline = new Date();
            $scope.ciRateDeadline.setDate( $scope.ciRateDeadline.getDate() + 1);
            $scope.assignCIRate = function(){
                var intern = $scope.ciRateIntern;
                var coaching = $scope.rateInstitute;
                var ciRateDeadline = $scope.ciRateDeadline;
                ciRateDeadline.setHours(23,59,59);
                var res = coaching.split("/");
                var coaching = res[res.length-1];
                if(coaching.length < 15 || !ciRateDeadline){
                    alert('Check Coaching Id or URL and deadline date');
                }else{
                    
                    var rateInstituteForm = {
                        institute: coaching,
                        user: intern,
                        _deadline: ciRateDeadline,
                    };
                    console.log(JSON.stringify(rateInstituteForm));
                    rateInstituteService.saverateInstitute(rateInstituteForm).success(function (data, status, headers) {
                        $scope.showSavedDialog();
                        $state.reload();
                    })
                    .error(function (data, status, header, config) {
                        console.log(status + " " + data);
                    });
                }
            };
            
            
            
    }]);
    
    /*    
    exambazaar.controller("masterToFillController", 
        [ '$scope', 'internList', 'tofillciList', 'tofillciService', '$state', 'filledCount', '$mdDialog', function($scope, internList, tofillciList, tofillciService, $state , filledCount, $mdDialog){
            
            $scope.internList = internList.data;
            $scope.activeInternList = [];
            //console.log($scope.internList);
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
                    //console.log(internIndex);
                    $scope.internDueList[internIndex].assigned += 1;
                    
                    //console.log(thisTask._deadline + ' ' + rightNow + ' ' + compare(rightNow, new Date(thisTask._deadline)));
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
                        console.log(status + " " + data);
                    });
                }
            };
            
            $scope.showRemoveConfirm = function(tofillci, ev) {
                console.log(JSON.stringify(tofillci.institute));
                console.log(JSON.stringify(tofillci.user));
                
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
        [ '$scope','$rootScope','$state','$cookies','$http','UserService', '$mdDialog', function($scope,$rootScope,$state,$cookies,$http,UserService,$mdDialog){
        $mdDialog.hide();
        $scope.login = {
            mobile: '',
            password: ''
        };
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
                    console.log(status + " " + data);
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
                console.log(JSON.stringify(loginForm));
                UserService.markLogin(loginForm).success(function (data, status, headers) {
                    console.log('Login marked');
                })
                .error(function (data, status, header, config) {
                    console.log(status + " " + data);    
                });
                UserService.getUser(user._id).success(function (data, status, headers) {
                    var fulluser = data;
                    var sessionuser;
                    if(user.verified===true){
                        console.log('User type is: ' + user.userType);
                        
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
                        if($state.current.name == 'landing' || $state.current.name == 'login'){
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
                console.log('Error');
                })
            
            })
            .error(function (data, status, header, config){
              
              $scope.login.password="";
              $scope.message = 'Incorrect Mobile or Password';
                
            });
        };//login ends
        /*$scope.logout = function(){
            $cookies.remove('sessionuser');
            $http.post('/logout');
            $state.reload();
            //$state.go("main", {}, {reload: true});
        };*/
            
    }]);
    
    
    exambazaar.controller("headerController", 
        [ '$scope','$rootScope','$state', '$stateParams','$cookies','$http','UserService', 'OTPService','NotificationService','ipService','blogpostService','$geolocation', '$facebook', '$mdDialog', 'EmailService', 'SidebarJS','$timeout', function($scope,$rootScope,$state, $stateParams,$cookies,$http,UserService, OTPService, NotificationService, ipService, blogpostService, $geolocation, $facebook, $mdDialog, EmailService, SidebarJS,$timeout){
            $rootScope.searchMode = false;
            $rootScope.searchPlaceholder = "Search";
            $rootScope.stateName = $state.current.name;
            $rootScope.loginState = $rootScope.stateName;
            $rootScope.defaultCoachingLogo = "https://exambazaar.s3.amazonaws.com/fb2b671170976dfdbb2992a1aeaf0c87.png";
            
            
            $rootScope.permittedToAdd = [
                '59899631a68cea0154b49502',
                '59085f0fc7289d0011d6ea8c',
                '5995886d0f6bc61245d8464f',
                '59a7eb973d71f10170dbb468',
                '59bcd748b0cdd5440a424d03',
                '59c10639b2574f0f556f2722',
                '59bfa3660a814b248710137b'
            ];
            $rootScope.permittedToDisable = ['59899631a68cea0154b49502'];
            
            
            //"findCoaching", "showCoaching", "showGroup"
            var headerGreenStates = [];
            
            var headerTransparentStates = ["landing", "main", "category", "city"];
            $scope.headerLogoCSS = function(){
                var stateName = $state.current.name;
                var headerLogoCSS = "headerLogo";
                var sIndex = -1;
                
                sIndex = headerGreenStates.indexOf(stateName);
                if(sIndex != -1){
                    headerLogoCSS = "headerLogoGreen";
                }
                
                sIndex = headerTransparentStates.indexOf(stateName);
                if(sIndex != -1){
                    headerLogoCSS = "headerLogoTransparent";
                }
                return headerLogoCSS;
            };
            
            $scope.headerBackgroundCSS = function(){
                var stateName = $state.current.name;
                var headerBackgroundCSS = "headerWhite";
                var sIndex = -1;
                
                sIndex = headerGreenStates.indexOf(stateName);
                if(sIndex != -1){
                    headerBackgroundCSS = "headerGreen";
                }
                
                sIndex = headerTransparentStates.indexOf(stateName);
                if(sIndex != -1){
                    headerBackgroundCSS = "headerTransparent";
                }
                return headerBackgroundCSS;
            };
            
            $scope.headerButtonCSS = function(){
                var stateName = $state.current.name;
                var headerButtonCSS = "md-green2 tolowercase";
                var sIndex = -1;
                
                sIndex = headerGreenStates.indexOf(stateName);
                if(sIndex != -1){
                    headerButtonCSS = "md-black tolowercase";
                }
                
                sIndex = headerTransparentStates.indexOf(stateName);
                if(sIndex != -1){
                    headerButtonCSS = "md-green2 tolowercase";
                }
                return headerButtonCSS;
            };
            
            $scope.headerShowOptions = function(){
                var stateName = $state.current.name;
                var showVal = true;
                var sIndex = -1;
                
                sIndex = headerTransparentStates.indexOf(stateName);
                if(sIndex != -1){
                    showVal = false;
                }
                return showVal;
            };
            $rootScope.showMobileSearch = false;
            $scope.flipMobileSearch = function(){
                $rootScope.showMobileSearch = !$rootScope.showMobileSearch;
            };
            
            $scope.sendWelcomeEmail = function(){
                if(!$scope.user){
                    $scope.user = $cookies.getObject('sessionuser');
                }
                console.log($scope.user);
                if($scope.user && $scope.user.email){
                    $scope.email = {
                        to: $scope.user.email,
                        templateName: 'Welcome Email',
                        username: $scope.user.basic.name
                    };
                    EmailService.welcomeEmail($scope.email).success(function (data, status, headers) {
                        var response = data;
                        console.log(JSON.stringify(response));

                    })
                    .error(function (data, status, header, config) {
                        console.log('Error ' + data + ' ' + status);
                    });  

                }else{
                    console.log('Either no user or no email for the user');
                }
            }; 
        
            var newThreshold = "7"; //all blogs less than 1 week are marked as new
            blogpostService.headerBlogs().success(function (data, status, headers) {
                $scope.blogs = data;
                $scope.blogs.forEach(function(thisBlog, index){
                    thisBlog.fromNow = moment(thisBlog._created).fromNow();
                });
            })
            .error(function (data, status, header, config) {
                console.log('Error ' + data + ' ' + status);
            });  
        
        if($rootScope.stateName == 'showGroup'){
            $rootScope.coachingGroupName = $stateParams.groupName;
            $rootScope.coachingGroupCity = $stateParams.cityName;
        }
        
        //console.log($rootScope.stateName );
        $scope.showLoginDialog = function(ev) {
            
            SidebarJS.close();
            if($state.current.name == 'showGroup' || $state.current.name == 'claim' || $state.current.name == 'rankerswall'){
                //console.log('I am here');
                $mdDialog.show({
                  contentElement: '#loginDialog',
                  parent: angular.element(document.body),
                  targetEvent: ev,
                  clickOutsideToClose: false,
                  escapeToClose: false,
                  //hasBackdrop: true,
                  openFrom: {
                      top: -50,
                      width: 30,
                      height: 80
                    },
                 closeTo: {
                  left: 1500
                }
                });
            }else{
                $mdDialog.show({
                  contentElement: '#loginDialog',
                  parent: angular.element(document.body),
                  targetEvent: ev,
                  clickOutsideToClose: true,
                  escapeToClose: true,
                  //hasBackdrop: true,
                  openFrom: {
                      top: -50,
                      width: 30,
                      height: 80
                    },
                 closeTo: {
                  left: 1500
                }
                });
            }
            
        };
        $scope.hideLoginDialog = function(ev){
            $mdDialog.hide();
        };
           
        
            
        $scope.signupMode = false;
        $scope.resetMode = false;
        $scope.signupToggle = function(){
            $scope.signupMode = !$scope.signupMode;
        };
        $scope.resetToggle = function(){
            $scope.resetMode = !$scope.resetMode;
        };
            
        if($cookies.getObject('ip')){
            //console.log("IP exists");
        }else{
            ipService.getip()
            .success(function (data, status, headers) {
                //console.log(data);
                var ip = {
                    city: data.city,
                    country: data.country_name,
                    region: data.region_name,
                    lat: data.latitude,
                    long: data.longitude,
                    zip: data.zip_code,
                    query: data.ip,
                };
                //console.log(ip);
                $cookies.putObject('ip', ip);
            })
            .error(function (data, status, header, config) {
                console.log();
            });
        }
            
        
        
        if($cookies.getObject('userlocation')){
            $scope.userlocation = $cookies.getObject('userlocation');
            
            if(!$scope.userPosition || $scope.userPosition.length < 4){
                //console.log('Empty object');
                $geolocation.getCurrentPosition({
                timeout: 60000
                 }).then(function(position) {
                    $cookies.putObject('userlocation', position);
                    $scope.userlocation = position;
                    if($scope.userlocation && $scope.userlocation.coords && $scope.userlocation.coords.latitude &&  $scope.userlocation.coords.longitude){
                        $scope.userlatlng = new google.maps.LatLng($scope.userlocation.coords.latitude, $scope.userlocation.coords.longitude);
                        
                        $scope.userPosition = $scope.userlocation.coords.latitude.toString() + "," + $scope.userlocation.coords.longitude.toString();
                        $cookies.putObject('userPosition', $scope.userPosition);
                        
                    }
                 });
            }
            
            
            if($scope.userlocation && $scope.userlocation.coords && $scope.userlocation.coords.latitude &&  $scope.userlocation.coords.longitude){
                $scope.userlatlng = new google.maps.LatLng($scope.userlocation.coords.latitude, $scope.userlocation.coords.longitude);
                
                
                $scope.userPosition = $scope.userlocation.coords.latitude.toString() + "," + $scope.userlocation.coords.longitude.toString();
            }
            
        }else{
            $geolocation.getCurrentPosition({
            timeout: 60000
             }).then(function(position) {
                $cookies.putObject('userlocation', position);
                $scope.userlocation = position;
                if($scope.userlocation && $scope.userlocation.coords && $scope.userlocation.coords.latitude &&  $scope.userlocation.coords.longitude){
                    $scope.userlatlng = new google.maps.LatLng($scope.userlocation.coords.latitude, $scope.userlocation.coords.longitude); 
                }
                
             });
        } 
        
            
        $scope.showLoginForm = function(){
            $scope.showLoginDialog();
            
        };
            
        $rootScope.$on("CallShowLogin", function(){
           $scope.showLoginForm();
        });

        $rootScope.$on("CallBlogLogin", function(){
           $scope.showLoginForm();
        });
            
        if($cookies.getObject('sessionuser')){
            $scope.sessionuser = $cookies.getObject('sessionuser');
        }else{
            $scope.sessionuser = {};
        }
            
        $scope.userlogin = {
            mobile: '',
            password: ''
        };
            
        $scope.login = function(){
            console.log('Login Initiated');
            
            
            $http.post('/login', {
              mobile: $scope.userlogin.mobile,
              password: $scope.userlogin.password,
            })
            .success(function(user){
                var loginForm = {
                    userId: user._id
                };
                if($cookies.getObject('ip')){
                    var ip = $cookies.getObject('ip');
                    loginForm.ip = ip;
                }
                
                UserService.markLogin(loginForm).success(function (data, status, headers) {
                    console.log('Login marked');
                })
                .error(function (data, status, header, config) {
                    console.log(status + " " + data);    
                });
                UserService.getUser(user._id).success(function (data, status, headers) {
                    $scope.hideLoginDialog();
                    var fulluser = data;
                    console.log(fulluser);
                    var sessionuser;
                    //user.verified="true";
                    //console.log(user.verified);
                    if(user.verified===true){
                        
                        sessionuser = {
                            _id: fulluser._id,
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
                        $scope.sessionuser = sessionuser;
                        loginReroute();
                        
                    }else{
                        
                        $state.go('verify', {userId: user._id});
                    }
                    
                })
                .error(function (data, status, header, config) {
                console.log('Error');
                })
            
            })
            .error(function(){
                $scope.login.password="";
                $scope.loginErrorMessage = 'Incorrect mobile or password';

                //$state.go('login');
            });
        };//login ends
        $scope.logout = function(){
            //$http.post('/logout');
            
            
            if($scope.sessionuser && $scope.sessionuser.facebookId){
                console.log('Facebook Logout Initiated');
                $cookies.remove('sessionuser');
                $scope.sessionuser = {};
                $facebook.logout().then(function(response) {
                    console.log('Facebook Logout done');
                    $state.reload();
                });
            }else{
                console.log('Normal Logout Inititated');
                $cookies.remove('sessionuser');
                $scope.sessionuser = {};
                $http.post('/logout');
                $state.reload();
            }
        }; 
        

        $scope.fblogin = function() {
            
           
            $facebook.login().then(function(response) {
                $scope.fbLoginStatus = response;
                //console.log("Login Status is: " + JSON.stringify($scope.fbLoginStatus));
                refresh();
            });
            
        };
            
        function refresh() {
            $facebook.api("/me", {fields: 'id, name, age_range, link, gender, picture, email'}).then(
            function(response) {
                
                if($scope.sessionuser && $scope.sessionuser.userId){
                    //link the user's fb id to the current user
                    $scope.sessionuser.fbuser = {
                        name: response.name,
                        gender: response.gender,
                        image: response.picture.data.url,
                        email: response.email,
                        facebook: {
                            link: response.link,
                            id: response.id,
                        }
                    };

                    if(!$scope.sessionuser.facebookId){
                    //console.log("Calls being made to add user");
                    $scope.sessionuser.fbuser.facebook.accessToken = $scope.fbLoginStatus.authResponse.accessToken;
                    UserService.fbSave($scope.sessionuser).success(function (data, status, headers) {
                        $mdDialog.hide();
                        var fulluser = data;
                        console.log(fulluser);
                        var sessionuser = {
                            _id: fulluser._id,
                            userId: fulluser._id,
                            facebookId: fulluser.facebookId,
                            userType: fulluser.userType,
                            basic: fulluser.basic,
                            image: fulluser.image,
                            mobile: fulluser.mobile,
                            email: fulluser.email,

                        };
                        //console.log('I am here');
                        $cookies.putObject('sessionuser', sessionuser);
                        $scope.sessionuser = sessionuser;
                        
                        loginReroute();
                    })
                    .error(function (data, status, header, config) {
                        console.log("Error ");
                    });
                    }

                }else{
                    $scope.sessionuser = {};
                    $scope.sessionuser.fbuser = {
                        name: response.name,
                        gender: response.gender,
                        image: response.picture.data.url,
                        email: response.email,
                        facebook: {
                            link: response.link,
                            id: response.id,
                        }
                    };
                    if(!$scope.sessionuser.facebookId){
                    //add a new user with facebook id
                    //console.log("Calls being made to add user");
                    $scope.sessionuser.fbuser.facebook.accessToken = $scope.fbLoginStatus.authResponse.accessToken;
                    UserService.fbSave($scope.sessionuser).success(function (data, status, headers) {
                        $mdDialog.hide();
                        
                        var fulluser = data;
                        var sessionuser = {
                            _id: fulluser._id,
                            userId: fulluser._id,
                            facebookId: fulluser.facebookId,
                            userType: fulluser.userType,
                            basic: fulluser.basic,
                            image: fulluser.image,
                            mobile: fulluser.mobile,
                            email: fulluser.email,

                        };
                        $cookies.putObject('sessionuser', sessionuser);
                        $scope.sessionuser = sessionuser;
                        
                        loginReroute();
                        
                    })
                    .error(function (data, status, header, config) {
                        console.log("Error ");
                    });
                    }
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
            
        function loginReroute(){
            $mdDialog.hide();
            
            $rootScope.$emit("userset", {});
            console.log('Rerouting to state');
            if($state.current.name == 'landing'){
                if($scope.sessionuser.userType =='Master'){

                    //$state.go('master-dashboard', {masterId: $scope.sessionuser.userId});
                    $state.go('charting');
                }
                if($scope.sessionuser.userType =='Intern - Business Development'){
                     $state.go('assigned', {userId: $scope.sessionuser.userId});
                }
                if($scope.sessionuser.userType =='Student'){
                    console.log('student logged in');
                    //$state.reload();
                }
                if($scope.sessionuser.userType =='Partner'){
                    $state.go('partner-dashboard', {userId: $scope.sessionuser.userId});
                }
            }else{
                //$state.reload();
            }
        };
            
        $scope.signup = {
            name: '',
            email: '',
            mobile: '',
            password: '',
        }; 
        $scope.checkSignupForm = function(){
            var disabled = false;
            
            if($scope.signup.name.length <3){
                disabled = true;
            }
            if(!$scope.signup.password || $scope.signup.password.length < 6){
                disabled = true;
            }
            if(!$scope.OTPVerified){
                disabled = true;
            }
            return disabled;
        };
        $scope.checkResetForm = function(){
            var disabled = false;
            if($scope.reset.mobile){
                $scope.reset.mobile = $scope.reset.mobile.toString();
            }
            if(!$scope.reset.mobile || $scope.reset.mobile.length != 10){
                disabled = true;
            }
            if(!$scope.reset.password || $scope.reset.password.length < 6){
                disabled = true;
            }
            if(!$scope.ResetOTPVerified){
                disabled = true;
            }
            return disabled;
        };
        
        $scope.showVerifyOTP = false;
        $scope.showResetVerifyOTP = false;
        $scope.OTPsent = false;
        $scope.ResetOTPsent = false;
        
        
        $scope.$watch('signup.mobile', function (newValue, oldValue, scope) {
            if(newValue)
            newValue = newValue.toString();
            if(newValue && newValue.length == 10){
                $scope.showVerifyOTP = true;
                $scope.userExistMessage = null;
            }

        }, true);
        $scope.reset = {
            mobile: '',
            otp: '',
            password: '',
        }
        $scope.$watch('reset.mobile', function (newValue, oldValue, scope) {
            if(newValue)
            newValue = newValue.toString();
            if(newValue && newValue.length == 10){
                $scope.showResetVerifyOTP = true;
                $scope.userExistMessage = null;
            }else{
                $scope.showResetVerifyOTP = false;
                $scope.userExistMessage = null;
            }

        }, true);      
            
        $scope.$watch('reset.otp', function (newValue, oldValue, scope) {
            if(newValue)
                newValue = newValue.toString();
            if(newValue && newValue.length == 4){
                console.log(newValue);
                if($scope.setResetOTP == newValue){
                    $scope.ResetOTPVerified = true;
                    $scope.ResetOTPmessage = null;
                }else{
                    $scope.ResetOTPmessage = 'Incorrect OTP';
                }
                
            }

        }, true);    
            
        $scope.$watch('signup.otp', function (newValue, oldValue, scope) {
            if(newValue)
                newValue = newValue.toString();
            if(newValue && newValue.length == 4){
                if($scope.setOTP == newValue){
                    $scope.OTPVerified = true;
                    $scope.OTPmessage = null;
                }else{
                    $scope.OTPmessage = 'Incorrect OTP';
                }
                
            }

        }, true);
        
            
        $scope.verifyPhone = function(){
            $scope.generateUserOTP();
        };
        $scope.resetPhone = function(){
            $scope.generateUserResetOTP();
        };    
            
        $scope.verifyOTP = function(){
            if($scope.newUser.OTP == $scope.setOTP){
                $scope.step2 = false;
                $scope.step3 = true;
            }else{
                $scope.OTPmessage = 'Incorrect OTP';
            }
        };
        $scope.signupUser = function(){
            $scope.signup.userType = 'Student';
            $scope.signup.verified = true;
            var saveUser = UserService.saveUser($scope.signup).success(function (data, status, headers) {
                var fulluser = data;
                
                var sessionuser = {
                    _id: fulluser._id,
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
                $scope.sessionuser = sessionuser;
                $mdDialog.hide();
                $state.reload();
                
            })
            .error(function (data, status, header, config) {
                console.log('Error ' + data + ' ' + status);
            });
        };
            
        $scope.generateUserResetOTP = function(){
            console.log('Sending Reset Message');
            UserService.userexists($scope.reset.mobile).success(function (data, status, headers) {
                var userExists = data;
                if(userExists){
                     var thisOTP = {
                        mobile:$scope.reset.mobile,
                        otp: generateOtp(),
                        reason : 'Reset'
                    };
                    OTPService.generateOTP(thisOTP).success(function (data, status, headers) {
                        $scope.ResetOTPsent = true;
                        $scope.setResetOTP = data.otp;
                        console.log("OTP sent to mobile " + thisOTP.mobile);
                    })
                    .error(function (data, status, header, config) {

                    });
                }else{
                    $scope.userResetExistMessage = "User with mobile " + $scope.reset.mobile + ' does not exist!';   
                    
                }
                //$state.go('main');

            })
            .error(function (data, status, header, config) {
                console.log('Error ' + data + ' ' + status);
            });
            
        };
            
        $scope.generateUserOTP = function(){
            UserService.userexists($scope.signup.mobile).success(function (data, status, headers) {
                var userExists = data;
                //console.log(userExists);
                if(userExists){
                    $scope.userExistMessage = "User with mobile " + $scope.signup.mobile + ' already exists!';    
                }else{
                    var thisOTP = {
                        mobile:$scope.signup.mobile,
                        otp: generateOtp(),
                        reason : 'Signup'
                    };
                    OTPService.generateOTP(thisOTP).success(function (data, status, headers) {
                        $scope.OTPsent = true;
                        $scope.setOTP = data.otp;
                        console.log("OTP sent to mobile " + thisOTP.mobile);
                    })
                    .error(function (data, status, header, config) {

                    });
                }
                //$state.go('main');

            })
            .error(function (data, status, header, config) {
                console.log('Error ' + data + ' ' + status);
            });
            
        };
            
            
        $scope.resetPassword = function(){
            console.log($scope.reset);
           var userPassword = {
               mobile: $scope.reset.mobile,
               newPassword: $scope.reset.password,
           };
            UserService.updatePassword(userPassword).success(function (data, status, headers) {
                //console.log('User verified & password updated! Please login again.');
                $scope.userlogin.mobile = $scope.reset.mobile;
                $scope.userlogin.password = $scope.reset.password;
                //console.log($scope.userlogin);
                $scope.login();
                //$scope.logout();
                //$state.go('main');
            })
            .error(function (data, status, header, config) {
                $scope.ServerResponse =  htmlDecode("Data: " + data +
                    "\n\n\n\nstatus: " + status +
                    "\n\n\n\nheaders: " + header +
                    "\n\n\n\nconfig: " + config);
            });
            
        }    
        /*$rootScope.fblikeDialog = null;
        $rootScope.fbpopupMode = false;
        $rootScope.showfblikeDialog = function(ev) {
            $rootScope.fbpopupMode = true;
            $rootScope.fblikeDialog = $mdDialog.show({
              contentElement: '#fblikeDialog',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: false,
              escapeToClose: false,
              //hasBackdrop: true,
              
            });

        };
        $timeout(function() {
          if($rootScope.fblikeDialog && !$rootScope.fblikeDialog.$$state.status) { 
           console.log("Dialog is still active");
          }else{
              console.log("Dialog is not open");
              $rootScope.fblikeDialog = null;
              $rootScope.fbpopupMode = false;
          }
        }, 1000);*/
        
        
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
        /*$scope.logout = function(){
            $scope.user = {};
            $cookies.remove('sessionuser');
            $state.reload();
            
        };*/
    }]);
    
    
    
     
     exambazaar.controller("providersWithAreasController", 
    [ '$scope', 'targetStudyProviderService','targetStudyProvidersList','$state','$stateParams', '$cookies', function($scope, targetStudyProviderService,targetStudyProvidersList,$state,$stateParams, $cookies){
        
        $scope.providersList = targetStudyProvidersList.data;
        
        $scope.startsWithProviders = function(){
           
           if($scope.startsWith != ''){
               targetStudyProviderService.changeProvidersStartingWith($scope.startsWith).success(function (data, status, headers) {
                    console.log("Done");
                   $scope.clear();
                })
                .error(function (data, status, header, config) {
                    console.log("Error ");
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
                console.log("Done");
            })
            .error(function (data, status, header, config) {
                console.log("Error ");
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
                
                console.log("Done");
            })
            .error(function (data, status, header, config) {
                console.log("Error ");
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
        //console.log(institutesFilled);
        
        
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
        
        $scope.cityStates = targetStudyCities.data.map(function(a) {return a._id;});
        
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
        var allowedCities = ['New Delhi', 'Bangalore', 'Kanpur', 'Allahabad', 'Bhopal', 'Varanasi', 'Dehradun', 'Raipur', 'Noida', 'Ghaziabad', 'Dhanbad', 'Bhubaneshwar', 'Jammu', 'Amritsar', 'Gwalior', 'Indore', 'Gurgaon', 'Bathinda', 'Jalandhar', 'Faridabad', 'Bareilly', 'Aligarh', 'Moradabad', 'Saharanpur','Thrissur', 'Malappuram', 'Kannur', 'Vijayawada', 'Agartala', 'Faridabad','Bilaspur','Hubli', 'Jodhpur', 'Panipat', 'Korba', 'Srinagar', 'Kolhapur', 'Solapur', 'Dibrugarh', 'Warangal', 'Jabalpur', 'Ujjain', 'Jhansi', 'Pantnagar', 'Nainital', 'Kashipur', 'Rudrapur', 'Haldwani', 'Hosur', 'Kolar', 'Tumakuru', 'Chintamani', 'Tiptur', 'Gauribidanur', 'Sonbhadra', 'Kochi', 'Belgaum', 'Davanagere', 'Udaipur','Durgapur', 'Aurangabad', 'Siliguri','Akola', 'Faizabad', 'Muzaffarpur','Asansol', 'Gaya', 'Satna', 'Bhagalpur'];
        
        if($cookies.getObject('sessionuser')){
            
            $scope.user = $cookies.getObject('sessionuser');
            if($scope.user.userType=='Master'){
                $scope.showLevel = 10;
            }
            if($scope.user.userType=='Intern - Business Development'){
                
                if(allowedCities.indexOf($scope.city) != -1){
                    $scope.showLevel = 1;
                }else{
                    $scope.showLevel = 0; 
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
                    console.log("Error ");
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
                
                console.log("Done");
            })
            .error(function (data, status, header, config) {
                console.log("Error ");
            });
            
        };
         
        
        
        
        $scope.uprank = function(provider){
            targetStudyProviderService.uprank(provider._id).success(function (data, status, headers) {
                console.log("Done");
            })
            .error(function (data, status, header, config) {
                console.log("Error ");
            });
        };
        $scope.downrank = function(provider){
            targetStudyProviderService.downrank(provider._id).success(function (data, status, headers) {
                console.log("Done");
            })
            .error(function (data, status, header, config) {
                console.log("Error ");
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
        
        /*$scope.$watch('searchText', function (newValue, oldValue, scope) {
            if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
            
            tempFilterText = newValue;
            filterTextTimeout = $timeout(function() {
                $scope.filterText = tempFilterText;
            }, 250); // delay 250 ms
        });*/
        
        
        
        
        
        $scope.removeDuplicates = function(){
            targetStudyProviderService.removeDuplicates($scope.city).success(function (data, status, headers) {
                console.log("Done");
            })
            .error(function (data, status, header, config) {
                console.log("Error ");
            });
        };
        $scope.rank0 = function(){
            targetStudyProviderService.rank0().success(function (data, status, headers) {
                console.log("Done");
            })
            .error(function (data, status, header, config) {
                console.log("Error ");
            });
        };
        
        $scope.getWebsites = function(){
            //alert('Starting');
            targetStudyProviderService.getWebsites().success(function (data, status, headers) {
                console.log("Done");
            })
            .error(function (data, status, header, config) {
                console.log("Error ");
            });
        };
        
        $scope.cityStateService = function(){
            //alert('Starting');
            targetStudyProviderService.citySummaryService().success(function (data, status, headers) {
                
                console.log("Done");
            })
            .error(function (data, status, header, config) {
                console.log("Error ");
            });
        };
        $scope.citySummary = null;
        $scope.citySummaryService = function(){
            //alert('Starting');
            targetStudyProviderService.citySummaryService().success(function (data, status, headers) {
                $scope.citySummary = data;
                console.log("Done");
            })
            .error(function (data, status, header, config) {
                console.log("Error ");
            });
        };
        $scope.cityStateService2 = function(){
            //alert('Starting');
            targetStudyProviderService.cityStateService2().success(function (data, status, headers) {
                console.log(data);
                //$scope.allCities = data;
            })
            .error(function (data, status, header, config) {
                console.log("Error ");
            });
        };
        $scope.getCityCount = function(){
            targetStudyProviderService.getCityCount().success(function (data, status, headers) {
                console.log("Done");
            })
            .error(function (data, status, header, config) {
                console.log("Error ");
            });
        };
        
        $scope.logoService = function(){
            targetStudyProviderService.logoService().success(function (data, status, headers) {
                console.log("Done");
            })
            .error(function (data, status, header, config) {
                console.log("Error ");
            });
        };
        $scope.databaseService = function(){
            targetStudyProviderService.databaseService().success(function (data, status, headers) {
                $scope.distinctStates = data;
                console.log("Done");
            })
            .error(function (data, status, header, config) {
                console.log("Error ");
            });
        };
        $scope.UniqueLogoService = function(){
            
            $scope.showlogos = true;
            targetStudyProviderService.UniqueLogoService().success(function (data, status, headers) {
                $scope.uniquelogos = data;
            })
            .error(function (data, status, header, config) {
                console.log("Error ");
            });
        };
        
        $scope.allDistinct = function(){
            $scope.allDistinctBool = false;
            targetStudyProviderService.allDistinct().success(function (data, status, headers) {
                alert('Done');
                //$scope.allProviderNames = data;
                //$scope.allDistinctBool = true;
                //console.log(JSON.stringify(data));
            })
            .error(function (data, status, header, config) {
                console.log("Error ");
            });
        };
        $scope.allCourses = false;
        $scope.getAllCourses = function(){
            targetStudyProviderService.getAllCourses().success(function (data, status, headers) {
                console.log("Done");
                $scope.allCourses = true;
                $scope.courses = data;
            })
            .error(function (data, status, header, config) {
                console.log("Error ");
            });
        };
        
        $scope.cleanTargetstudyurls = function(){
            targetStudyProviderService.cleanTargetstudyurls().success(function (data, status, headers) {
                console.log("Done");
            })
            .error(function (data, status, header, config) {
                console.log("Error ");
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
    [ '$scope', 'targetStudyProviderService','LocationService','thisTargetStudyProvider','$state','$stateParams', '$cookies','ImageService','Upload','imageMediaTagList', function($scope, targetStudyProviderService,LocationService,thisTargetStudyProvider,$state,$stateParams, $cookies,ImageService,Upload,imageMediaTagList){
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
                console.log("Done");
            })
            .error(function (data, status, header, config) {
                console.log("Error ");
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
            if(url && url.length > 0){
            url = url.replace('www.','');
            url = url.replace('http://','');
            url = url.replace('https://','');
            var rightChar = url.substring(url.length-1, url.length);
            }
            
            
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
            //console.log(JSON.stringify(fileInfo));
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
                    console.log("Error ");
                });
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                }, function (evt) {
                    thisFile.uploadProgress = parseInt(100.0 * evt.loaded / evt.total);
                    //console.log('progress: ' + thisFile.uploadProgress + '% ' + thisFile.name);
                });

            })
            .error(function (data, status, header, config) {
                console.log("Error");
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
            console.log(JSON.stringify(fileInfo));
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
                    //console.log('Counter is: ' + counter);
                    //console.log("Faculty added to database " + thisFile.newFaculty.image);
                    if(counter == nFiles){
                        $scope.showAddFacultiesForm = true;
                        $scope.preUploadFacultyLength = $scope.provider.faculty.length;
                        var refreshedProvider = targetStudyProviderService.getProvider(providerId).success(function (refreshedProvider, status, headers) {
                            $scope.provider = refreshedProvider;
                            $scope.editPhotos();
                        }).error(function (data, status, header, config) {
                            console.log("Error ");
                        });
                        
                    }
                })
                .error(function (data, status, header, config) {
                    console.log("Error ");
                });
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                }, function (evt) {
                    thisFile.uploadProgress = parseInt(100.0 * evt.loaded / evt.total);
                    //console.log('progress: ' + thisFile.uploadProgress + '% ' + thisFile.name);
                });

            })
            .error(function (data, status, header, config) {
                console.log("Error");
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
                console.log("Done");
            })
            .error(function (data, status, header, config) {
                console.log("Error ");
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
                console.log(JSON.stringify($scope.newImage));
                ImageService.saveImage($scope.newImage).success(function (data, status, headers) {
                   console.log('Done'); 
                })
                .error(function (data, status, header, config) {
                    console.log(data);
                });
                
            }
            r.readAsBinaryString(f);
        };
        
        $scope.downrank = function(provider){
            targetStudyProviderService.downrank(provider._id).success(function (data, status, headers) {
                console.log("Done");
            })
            .error(function (data, status, header, config) {
                console.log("Error ");
            });
        };
        $scope.saveCoaching = function(){
            
           var provider = {
               targetStudyProvider: $scope.provider
           }; targetStudyProviderService.saveProvider(provider).success(function (data, status, headers) {
                console.log("Done");
            })
            .error(function (data, status, header, config) {
                console.log("Error ");
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
                console.log("Done");
            })
            .error(function (data, status, header, config) {
                console.log("Error ");
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
                console.log('Error ' + data + ' ' + status);
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
            console.log('Item changed to ' + JSON.stringify(item));
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
                    //console.log(response.data);
                    return response.data;
                });
            }
            
        };
            $rootScope.pageTitle ='Sandbox';
    }]);
         
      
        
    exambazaar.controller("offerController", 
        [ '$scope', '$http','$state','$rootScope', 'targetStudyProviderService', '$mdDialog', '$document', 'offerService', function($scope, $http, $state, $rootScope, targetStudyProviderService, $mdDialog, $document, offerService){
            $scope.offers = [];
            offerService.getActiveOffersBasic().success(function (data, status, headers) {
                $scope.offersList = data;
                //console.log($scope.offersList);
            })
            .error(function (data, status, header, config) {
                console.log('Error ' + data + ' ' + status);
            });
            
            $scope.$watch('offersList', function (newValue, oldValue, scope) {
                if(newValue != null && newValue != ''){
                    $scope.offers = newValue;
                    //console.log(newValue);
                }
            }, true);
            
        $scope.instituteHolder = "your Coaching Institute"; 
        $scope.goToReview = function(){
            var statesToShow = ["landing","main","category","city","findCoaching"];
            var sIndex = statesToShow.indexOf($state.current.name);
            
            if($state.current.name == 'showGroup'){
                $mdDialog.hide();
                var someElement = angular.element(document.getElementById('Reviews'));
                $document.scrollToElement(someElement, -200, 1000);
            }else if($state.current.name == 'review'){
                var someElement = angular.element(document.getElementById('Reviews'));
                $document.scrollToElement(someElement, 0, 1000);
            }else if(sIndex != -1){
                
                $state.go('review');
            }
            
            
        };
        
        $scope.showBottomOfferBar = function(){
            var showMe = false;
            var statesToShow = ["landing","main","category","city","findCoaching","why"];
            var sIndex = statesToShow.indexOf($state.current.name);
            
            if(sIndex != -1){
                showMe = true;
            }
            
            return showMe;
        };
        $rootScope.$on("ShowReviewDialog", function(){
            $scope.showUserReviewSearchDialog();
        });
        $rootScope.$on("ShowWhyReviewDialog", function(){
           $scope.showWhyReviewSearchDialog();
        });    
        $scope.showUserReviewSearchDialog = function(ev) {
            $mdDialog.show({
              contentElement: '#userReviewSearchDialog',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true
            }).finally(function() {
                //$scope.userReviewMode = true;
            });
        };
            
        $scope.showWhyReviewSearchDialog = function(ev) {
            $mdDialog.show({
              contentElement: '#whyReviewDialog',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true
            }).finally(function() {
                $scope.userReviewMode = true;
            });
        };
            
        $scope.showPartnerDialog = function(offer, ev) {
            $rootScope.partnerOffer = offer;
            
            
            $mdDialog.show({
              contentElement: '#partnerDialog',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true
            }).finally(function() {
                
            });
        };
    }]);    
    exambazaar.controller("offerController2", 
        [ '$scope', '$http','$state','$rootScope', 'targetStudyProviderService', '$mdDialog', '$document', 'offerService', function($scope, $http, $state, $rootScope, targetStudyProviderService, $mdDialog, $document, offerService){
            $scope.offers = [];
            offerService.getActiveOffersBasic().success(function (data, status, headers) {
                $scope.offersList = data;
                //console.log($scope.offersList);
            })
            .error(function (data, status, header, config) {
                console.log('Error ' + data + ' ' + status);
            });
            
            $scope.$watch('offersList', function (newValue, oldValue, scope) {
                if(newValue != null && newValue != ''){
                    $scope.offers = newValue;
                    //console.log(newValue);
                }
            }, true);
            
        $scope.instituteHolder = "your Coaching Institute"; 
        $scope.goToReview = function(){
            var statesToShow = ["landing","main","category","city","findCoaching"];
            var sIndex = statesToShow.indexOf($state.current.name);
            
            if($state.current.name == 'showGroup'){
                $mdDialog.hide();
                var someElement = angular.element(document.getElementById('Reviews'));
                $document.scrollToElement(someElement, -200, 1000);
            }else if($state.current.name == 'review'){
                var someElement = angular.element(document.getElementById('Reviews'));
                $document.scrollToElement(someElement, 0, 1000);
            }else if(sIndex != -1){
                
                $state.go('review');
            }
            
            
        };
        
        $scope.showBottomOfferBar = function(){
            var showMe = false;
            var statesToShow = ["landing","main","category","city","findCoaching","rankerswall","why"];
            var sIndex = statesToShow.indexOf($state.current.name);
            
            if(sIndex != -1){
                showMe = true;
            }
            
            return showMe;
        };
          
        $scope.showUserReviewSearchDialog = function(ev) {
            console.log('I am opened');
            $mdDialog.show({
              contentElement: '#userReviewSearchDialog',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true
            }).finally(function() {
                //$scope.userReviewMode = true;
            });
        };
            
        $scope.showWhyReviewSearchDialog = function(ev) {
            $mdDialog.show({
              contentElement: '#whyReviewDialog',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true
            }).finally(function() {
                $scope.userReviewMode = true;
            });
        };
            
        $scope.showPartnerDialog = function(offer, ev) {
            $rootScope.partnerOffer = offer;
            
            
            $mdDialog.show({
              contentElement: '#partnerDialog',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true
            }).finally(function() {
                
            });
        };
    }]);      
    exambazaar.controller("coachingGroupAutocompleteController", 
        [ '$scope', '$http','$state','$rootScope', 'targetStudyProviderService', function($scope, $http, $state, $rootScope, targetStudyProviderService){
            
        this.selectedItemChange = selectedItemChange;
        function selectedItemChange(item) {
            //console.log('Item changed to ' + JSON.stringify(item));
            $rootScope.coachingGroup = item;
            
            var items = $rootScope.coachingGroupItems;
            //console.log(items.length);
            var coachingGroupItems = [];
            items.forEach(function(thisItem, index){
                if(thisItem.groupName == item.groupName){
                    coachingGroupItems.push(thisItem);
                }else{
                    //console.log(thisItem);
                }
                
            });
            $rootScope.coachingGroupItems = coachingGroupItems;
            $rootScope.$emit("setSpreadSheetCoachings", {coachingGroupItems: coachingGroupItems});
            //console.log(coachingGroupItems.length);
        };
        this.querySearch = function(query){
            if(query.length > 2){
                $rootScope.coachingGroupItems = [];
                return targetStudyProviderService.searchCoachingGroupProviders(query).then(function(response){
                    //console.log(response.data);
                    
                    $rootScope.coachingGroupItems = response.data;
                    return response.data;
                });
            }
            
            /*return $http.get("https://api.github.com/search/users", {params: {q: query}})
            .then(function(response){
              return response.data.items;
            })*/
        };
            $rootScope.pageTitle ='Sandbox';
    }]);    
    
    exambazaar.controller("blogCoachingGroupAutocompleteController", 
        [ '$scope', '$http','$state','$rootScope', 'targetStudyProviderService', function($scope, $http, $state, $rootScope, targetStudyProviderService){
            
        this.selectedItemChange = selectedItemChange;
        function selectedItemChange(item) {
            var groupName = item.name;
            $rootScope.$emit("setBlogCoachingGroup", {groupName: groupName});
            this.selectedItem = null;
            //console.log(groupName);
        };
        this.querySearch = function(query){
            if(query.length > 2){
                return targetStudyProviderService.searchBlogCoachingGroupProviders(query).then(function(response){
                    //console.log(response.data);
                    
                    $rootScope.coachingGroupItems = response.data;
                    return response.data;
                });
            }else{
                return null;
            }
            
        };
    }]);        
        
    exambazaar.controller("userAutocompleteController", 
        [ '$scope', '$http','$state','$rootScope', 'UserService', function($scope, $http, $state, $rootScope, UserService){
            
        this.selectedItemChange = selectedItemChange;
        function selectedItemChange(item) {
            //console.log('Item changed to ' + JSON.stringify(item));
            $rootScope.$emit("setBloggerUser", {user: item});
        };
        this.querySearch = function(query){
            if(query.length > 2){
                return UserService.searchUsers(query).then(function(response){
                    return response.data;
                });
            }
        };
    }]);    
        
    exambazaar.controller("autocompleteController", 
        [ '$scope', '$http','$state','$rootScope', 'targetStudyProviderService', function($scope, $http, $state, $rootScope, targetStudyProviderService){
            
            $scope.searchFocusIn = function(){
                console.log('Focus In');
                $rootScope.searchMode = true;
                $rootScope.searchPlaceholder = "Search Exambazaar for over 26,000 coaching classes for 50+ Exams in 90+ cities";
            };
            $scope.searchFocusOut = function(){
                console.log('Focus Out');
                $rootScope.searchMode = false;
                $rootScope.searchPlaceholder = "Search";
                $rootScope.showMobileSearch = !$rootScope.showMobileSearch;
            };
            $scope.goToCoaching = function(provider){
                var coachingForm = {
                    _id: provider._id 
            };
            targetStudyProviderService.showGroupHelperById(coachingForm).success(function (data, status, headers) {
                    var examStream = data;
                    $state.go('showGroup', {categoryName: examStream.stream, subCategoryName: examStream.exam, cityName: examStream.city, groupName: examStream.groupName});
                    
                    
                })
                .error(function (data, status, header, config) {
                    console.log('Error ' + data + ' ' + status);
                });
        };    
            
        this.selectedItemChange = selectedItemChange;
        function selectedItemChange(item) {
            console.log('Item changed to ' + JSON.stringify(item));
            $scope.goToCoaching(item);
        };
        this.querySearch = function(query){
            if(query.length > 2){
                return targetStudyProviderService.searchProviders(query).then(function(response){
                    //console.log(response.data);
                    return response.data;
                });
            }
        };
    }]);
        
    exambazaar.controller("citySearchController", 
        [ '$scope', '$http','$state','$rootScope', 'targetStudyProviderService', '$cookies', function($scope, $http, $state, $rootScope, targetStudyProviderService, $cookies){
        
        
        if($cookies.getObject('userlocation')){
            $scope.userlocation = $cookies.getObject('userlocation');
        }
        if($cookies.getObject('ip')){
            $scope.userip = $cookies.getObject('ip');
        }
        
            
        $scope.reviewCity = "";
        this.selectedItemChange = selectedItemChange;
        function selectedItemChange(item) {
            $rootScope.newReviewCity = item;
            console.log($rootScope.newReviewCity);
            $rootScope.newReviewError = null;
        };
        this.querySearch = function(query){
            var searchQuery = query;
            if(query == ''){
                searchQuery = "exambazaar";
            }
            return targetStudyProviderService.providercities(searchQuery).then(function(response){
                
                //console.log(response.data);
                return response.data;
            });
        };
    }]);
    
    exambazaar.controller("coachingSearchController", 
        [ '$scope', '$http','$state','$rootScope', 'targetStudyProviderService', function($scope, $http, $state, $rootScope, targetStudyProviderService){
        
        
        this.selectedItemChange = selectedItemChange;
        function selectedItemChange(item) {
            console.log('Item changed to ' + JSON.stringify(item));
            $rootScope.newReviewCoaching = item;
        };
        this.querySearch = function(query){
            if(!$rootScope.newReviewCity){
                $rootScope.newReviewError = true;
            }else{
                $rootScope.newReviewError = null;
                if(query ==''){query = "exambazaar";}
                var cityQueryForm = {
                    query: query,
                    city: $rootScope.newReviewCity
                };
                //console.log($rootScope.newReviewCity);

                return targetStudyProviderService.searchCityReviewProviders(cityQueryForm).then(function(response){
                    //console.log(response.data);
                    return response.data;
                });
            }

        };
        
    }]);  
        
    exambazaar.controller("reviewRedirectController", 
        [ '$scope', '$http','$state','$rootScope', 'targetStudyProviderService', 'offerService', '$mdDialog', '$document', function($scope, $http, $state, $rootScope, targetStudyProviderService, offerService, $mdDialog, $document){
            $scope.redirectToReview = function(){
                if($rootScope.newReviewCity && $rootScope.newReviewCoaching){
                    //ABC
                    var cityCoachingForm = {
                        city: $rootScope.newReviewCity,
                        coachingName: $rootScope.newReviewCoaching.name,
                    };
                    console.log(cityCoachingForm);
                    targetStudyProviderService.showGroupHelper(cityCoachingForm).success(function (data, status, headers) {
                        var examStream = data;
                        console.log(examStream);
                        
                        $state.go('showGroup', {categoryName: examStream.stream, subCategoryName: examStream.exam, cityName: $rootScope.newReviewCity, groupName: $rootScope.newReviewCoaching.name,'#': 'Reviews'});
                    })
                    .error(function (data, status, header, config) {
                        console.log('Error ' + data + ' ' + status);
                    });
                    
                    
                }
            };
            
            $scope.offers = [];
            offerService.getActiveOffersBasic().success(function (data, status, headers) {
                $scope.offersList = data;
                //console.log($scope.offersList);
            })
            .error(function (data, status, header, config) {
                console.log('Error ' + data + ' ' + status);
            });
            
            $scope.$watch('offersList', function (newValue, oldValue, scope) {
                if(newValue != null && newValue != ''){
                    $scope.offers = newValue;
                    //console.log(newValue);
                }
            }, true);
            
    }]);      
        
    exambazaar.controller("resultAutocompleteController", 
        [ '$scope', '$http','$state', 'targetStudyProviderService', function($scope, $http, $state, targetStudyProviderService){
            
        this.selectedItemChange = selectedItemChange;
        function selectedItemChange(item) {
            console.log('Item changed to ' + JSON.stringify(item));
            $state.go('claim', {coachingId: item._id});
            
        };
        this.querySearch = function(query){
            if(query.length > 2){
                return targetStudyProviderService.searchProviders(query).then(function(response){
                    //console.log(response.data);
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
            $rootScope.pageTitle ='Sandbox 2';
    }]);
    
        
    exambazaar.controller("thankyouController", 
        [ '$scope', '$http','$state', '$rootScope', '$location', 'Socialshare', '$mdDialog', '$timeout', function($scope, $http, $state, $rootScope, $location, Socialshare, $mdDialog, $timeout){
            //var redirectUrl = "https://www.exambazaar.com/" + "/user/" + $scope.user._id + "/thankyou";
            var redirectUrl = "https://www.exambazaar.com";
            $scope.shareFacebook = function(){
                Socialshare.share({
                  'provider': 'facebook',
                  'attrs': {
                    'socialshareType': 'share',
                    'socialshareUrl': 'https://www.exambazaar.com',
                    'socialshareVia':"1236747093103286",  'socialshareRedirectUri': redirectUrl,
                  }
                });    
            };
            
            $scope.shareText = "Receive amazing discounts at Exambazaar by reviewing your coaching institute! Go ahead, review your coaching and get discount at ";
            
            $rootScope.pageTitle = 'Thank you for reviewing your coaching institute!';
            $rootScope.pageURL = 'https://www.exambazaar.com';
            $rootScope.pageImage = 'https://www.exambazaar.com/images/logo/cover.png';
    }]);
    
    
    exambazaar.controller("availOfferController", 
        [ '$scope', '$http','$state', '$rootScope','thisuser','targetStudyProviderService', 'UserService', 'couponService', '$location', 'thisReview', 'activeOfferInstitutes', 'activeCoupons', 'Socialshare', '$mdDialog', '$timeout', '$window', function($scope, $http, $state, $rootScope, thisuser, targetStudyProviderService, UserService, couponService, $location, thisReview, activeOfferInstitutes, activeCoupons, Socialshare, $mdDialog, $timeout, $window){
            $window.scrollTo(0, 0);
            $scope.user = thisuser.data;
            $scope.activeOfferInstitutes = activeOfferInstitutes.data;
            $scope.activeCoupons = activeCoupons.data;
            $scope.thisReview = thisReview.data;
            $scope.states = ["Browse","Refer","Coupon",];
            $scope.currState = "Browse";
            
            var deliveredCouponId = null;
            if($scope.thisReview.coupon){
                $scope.currState='Coupon';
                deliveredCouponId = $scope.thisReview.coupon;
            }
            
            $scope.$watch('currState', function (newValue, oldValue, scope) {
                if(deliveredCouponId){
                    couponService.getCoupon(deliveredCouponId).success(function (data, status, headers) {
                        $scope.deliveredCoupon = data;
                        console.log($scope.deliveredCoupon);
                    })
                    .error(function (data, status, header, config) {
                        console.log('Error ' + data + ' ' + status);
                    });
                    
                }

            }, true);
            
            
            
            
            $scope.chooseCoupon = function(activeCoupon, activeOfferInstitute){
                $scope.selectedCoupon = activeCoupon;
                $scope.selectedOfferInstitute = activeOfferInstitute;
                $scope.currState = "Refer";
            };
            $scope.getBreadCrumbClass = function(state){
                var className = "";
                if(state == $scope.currState){
                    className = "active";
                }
                return className;
            };
            $scope.navigate = function(clickstate){
                var clickIndex = $scope.states.indexOf(clickstate);
                var currIndex = $scope.states.indexOf($scope.currState);
                
                if(clickIndex < currIndex && $scope.currState != 'Coupon'){
                    $scope.currState = clickstate;
                }
            };
            
            $scope.shareOnFacebook = true;
            $scope.shareText = "I have received an amazing discount at Exambazaar.com by reviewing " +  $scope.thisReview.institute.name + "! Go ahead, review your coaching and get your discount at www.exambazaar.com/review/";
            var redirectUrl = "https://www.exambazaar.com/thankyou";
           
            
            
            

            $scope.fail = function (err) {
                console.error('Error!', err);
            };
            
            var messageText = function(){
                var totalDiscount = '';
                if($scope.selectedCoupon.discountType == 'Percentage Discount'){
                    totalDiscount = $scope.selectedCoupon.percentageDiscount + "%";
                }
                if($scope.selectedCoupon.discountType == 'Flat Discount'){
                    totalDiscount = $scope.selectedCoupon.flatDiscount +"Rs.";
                }
                
                var smsMessage = $scope.user.basic.name + " received " + totalDiscount + " on prep material via www.exambazaar.com. Review your coaching institute and lock-in your 50% off now!";
                
                return smsMessage;
            };
            
            $scope.showCopiedDialog = function(text, ev) {
                $scope.copiedText = text;
                $mdDialog.show({
                  contentElement: '#copiedDialog',
                  parent: angular.element(document.body),
                  targetEvent: ev,
                  clickOutsideToClose: true
                });
                $timeout(function(){
                    $mdDialog.cancel();
                },500)
            };
            $scope.refermobiles = [];
            var i =1;
            for (i=1;i<=5;i++) {
                
                var newMobile = {
                    mobile: '',
                    exists: null,
                    placeholder: "10 Digit Mobile " + i,
                };
                $scope.refermobiles.push(newMobile);
            };
            
            $scope.$watch('refermobiles', function (newValue, oldValue, scope) {
                newValue.forEach(function(thisMobile, mindex){
                    if(thisMobile.mobile && thisMobile.mobile != oldValue[mindex].mobile){
                         UserService.referexists(thisMobile.mobile).success(function (data, status, headers) {
                            thisMobile.exists = data;
                        })
                        .error(function (data, status, header, config) {
                            console.log('Error ' + data + ' ' + status);
                        });
                    }   
                });
            }, true);
            
            $scope.shareFacebook = function(){
                Socialshare.share({
                  'provider': 'facebook',
                  'attrs': {
                    'socialshareType': 'send',
                    'socialshareUrl': 'https://www.exambazaar.com',
                    'socialshareVia':"1236747093103286",  'socialshareRedirectUri': redirectUrl,
                  }
                });
                
                $scope.userSocial = true;
            };
            
            $scope.postFacebook = function(){
                Socialshare.share({
                  'provider': 'facebook',
                  'attrs': {
                    'socialshareType': 'feed',
                    'socialshareUrl': 'https://www.exambazaar.com',
                    'socialshareVia':"1236747093103286",  'socialshareRedirectUri': 'https://www.exambazaar.com',
                  }
                });    
            };
            $scope.inviteMobiles = function(){
                var invalid = false;
                $scope.referMobilesError = null;
               
                var sendmobiles = $scope.refermobiles.map(function(a) {return a.mobile;});
                
                $scope.refermobiles.forEach(function(thisMobile, mindex){
                    if(thisMobile.mobile){
                        thisMobile.mobile = thisMobile.mobile.toString();
                    }
                    if(thisMobile.mobile.length != 10 || thisMobile.exists){
                        console.log(thisMobile.mobile.length + thisMobile.mobile);
                        invalid = true;
                    }
                });
                
                if(invalid){
                    $scope.referMobilesError = "Please enter 5 valid mobile numbers";
                }else{
                    var smsMessage = messageText();
                    console.log(smsMessage.length);
                    console.log(smsMessage);
                    
                    
                    
                    var referralForm = {
                        user: $scope.user._id,
                        message: smsMessage,
                        mobiles: $scope.refermobiles,
                        
                    };
                    console.log(referralForm);
                    UserService.sendReferrals(referralForm).success(function (data, status, headers) {
                        console.log('Delivered');
                        $scope.userSocial = true;
                    }).error(function (data, status, header, config) {
                        console.log("Error ");
                    });
                    
                }
            };
            
            $scope.showSkipDialog = function(ev) {
                var totalDiscount = '';
                if($scope.selectedCoupon.discountType == 'Percentage Discount'){
                    totalDiscount = $scope.selectedCoupon.percentageSocialShareBenefit + "% !";
                }
                if($scope.selectedCoupon.discountType == 'Flat Discount'){
                    totalDiscount = $scope.selectedCoupon.flatSocialShareBenefit +" Rs !";
                }
                var confirm = $mdDialog.confirm()
                .title('Would you like to skip referring your friends to Exambazaar?')
                .textContent('You will not receive the additional Exambazaar discount of ' + totalDiscount)
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .clickOutsideToClose(true)
                .ok('Confirm')
                .cancel('Cancel');
                $mdDialog.show(confirm).then(function() {
                    $scope.issueCoupon(false);
                }, function() {
                  //nothing
                });
                    
            };
            
            $scope.$watch('userSocial', function (newValue, oldValue, scope) {
                if(newValue){
                    $scope.issueCoupon(true);
                }
            }, true);
            
            $scope.issueCoupon = function(social){
                
                var couponForm = {
                    name: $scope.selectedCoupon.name,
                    offer: $scope.selectedCoupon.offer,
                };
                couponService.getOneActiveCouponCode(couponForm).success(function (data, status, headers) {
                    if(data){
                        $scope.selectedCoupon = data;
                        $scope.selectedCoupon.user = $scope.user._id;
                        
                        $scope.selectedCoupon.delivered = {
                            social: social,
                            state: 'Delivered',
                        };
                        if(social){
                            $scope.selectedCoupon.delivered.usercode = $scope.selectedCoupon.socialShareCode;
                        }else{
                            $scope.selectedCoupon.delivered.usercode = $scope.selectedCoupon.code;
                            
                        }
                        var timeNow = moment();
                        $scope.selectedCoupon.delivered._deliverDate = timeNow;
                        if($scope.selectedCoupon.validityType == 'From date of issue by Exambazaar'){
                            var nDays = $scope.selectedCoupon.validtyDuration;
                            var ebExpiry = timeNow.add(nDays, "days");
                            $scope.selectedCoupon.delivered._expiryDate = ebExpiry;
                        }
                        
                        if($scope.selectedCoupon.validityType == 'Fixed Expiry Date'){
                            var fixedExpiryDate = $scope.selectedCoupon.fixedExpiryDate;
                            $scope.selectedCoupon.delivered._expiryDate = fixedExpiryDate;
                        }
                        
                        var deliverForm = {
                            selectedCoupon: $scope.selectedCoupon,
                            review: $scope.thisReview._id,
                        };
                        
                        couponService.deliver(deliverForm).success(function (data, status, headers) {
                        console.log(data);
                        if(data){
                            $scope.selectedCoupon = data;
                            deliveredCouponId = $scope.selectedCoupon._id;
                            $scope.currState = "Coupon";
                            console.log($scope.selectedCoupon);
                            var voucherForm = {
                                user: $scope.user._id,    
                                coupon: $scope.selectedCoupon._id,    
                            };
                            UserService.deliverVoucher(voucherForm).success(function (data, status, headers) {
                                console.log('Delivered');
                                
                            }).error(function (data, status, header, config) {
                                console.log("Error ");
                            });
                            
                        }else{
                            console.log('Something went wrong');
                        }
                            
                            
                        
                        }).error(function (data, status, header, config) {
                            console.log("Error ");
                        });
                        
                        
                        
                    }else{
                        console.log('Error: No more active coupon for this offer! Sorry');
                    }
                }).error(function (data, status, header, config) {
                    console.log("Error ");
                });
            };
            
            $scope.deliverCoupon = function(){
                var voucherForm = {
                    user: $scope.user._id,    
                    coupon: $scope.deliveredCoupon._id,    
                };
                UserService.deliverVoucher(voucherForm).success(function (data, status, headers) {
                    console.log('Delivered');

                }).error(function (data, status, header, config) {
                    console.log("Error ");
                });    
            };
            
            /*var currURL = $location.absUrl();
            $rootScope.pageURL = currURL;*/
            $rootScope.pageTitle = 'Review your coaching institute to get rewarded!';
            $rootScope.pageImage = 'https://www.exambazaar.com/images/logo/cover.png';
    }]);
    
    
    exambazaar.controller("reviewedController", 
        [ '$scope', '$http','$state','$rootScope','thisuser','targetStudyProviderService', '$location', 'thisuserReviewed', 'activeOffers', function($scope, $http, $state, $rootScope, thisuser, targetStudyProviderService, $location, thisuserReviewed, activeOffers){
            $scope.user = thisuser.data;
            $scope.activeOffers = activeOffers.data;
            //console.log($scope.activeOffers);
            $scope.userReviewed = thisuserReviewed.data;
            //console.log($scope.reviewed);
            $rootScope.pageTitle ='Reviews by ' + $scope.user.basic.name;
            $scope.reviews = [1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0];
            $scope.reviewsClasses = ["review1","review2","review3","review4","review5","review6","review7","review8","review9"];
            $scope.reviewParams = [
                {name: "faculty", displayname:"Faculty and Teaching Experience", hoverVal: -1},
                {name: "competitive_environment", displayname:"Competitive Environment", hoverVal: -1},
                {name: "quality_of_material", displayname:"Quality of material", hoverVal: -1},
                {name: "infrastructure", displayname:"Infrastructure", hoverVal: -1},
            ];
            var paramNames = $scope.reviewParams.map(function(a) {return a.name;});
            
            $scope.getBackgroundColour = function(reviewParam, paramIndex, userReview){
                var pIndex = paramNames.indexOf(reviewParam.name);
                var className = "noreview";

                var propName = $scope.reviewParams[pIndex].name;
                
                if(userReview && userReview[propName]){
                    var review = userReview[propName];
                    var rIndex = $scope.reviews.indexOf(Number(review));
                    if(paramIndex <= rIndex){
                        var rIndex2 = rIndex + 1;
                        className = "review" + rIndex2;    
                    }
                }

                if($scope.reviewParams[pIndex].hoverVal >= 0){
                    className = "noreview";
                };

                if($scope.reviewParams[pIndex].hoverVal >= paramIndex){

                    var paramIndex2 = paramIndex + 1;
                    className = "review" + paramIndex2;
                }

                //console.log(propName + " " + className);
                return className;
            };
            
            
            $scope.logMouseEvent = function(reviewParam,  paramIndex) {
                switch (event.type) {
                  case "mouseenter":
                        console.log("Hey Mouse Entered");
                        break;
                  case "mouseover":{
                        var pIndex = paramNames.indexOf(reviewParam.name);
                        $scope.reviewParams[pIndex].hoverVal = paramIndex;
                        break;
                  }
                  case "mouseout":{
                        var pIndex = paramNames.indexOf(reviewParam.name);
                        $scope.reviewParams[pIndex].hoverVal = -1;
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
            
            
            //$scope.showCouponOptions = false;
            $scope.flipShowCoupon = function(userReview){
                $state.go('availOffer', {userId: $scope.user._id, reviewId: userReview._id});
                
            };
            
            /*var currURL = $location.absUrl();
            $rootScope.pageURL = currURL;*/
            $rootScope.pageImage = 'https://www.exambazaar.com/images/logo/cover.png';
    }]);
        
    exambazaar.controller("addedInstitutesController", 
        [ '$scope', '$http','$state','$rootScope','thisuser','targetStudyProviderService', 'addedInstitutes', 'ebteam', '$mdDialog', '$timeout', 'tofillciService', function($scope, $http, $state, $rootScope, thisuser, targetStudyProviderService, addedInstitutes, ebteam, $mdDialog, $timeout, tofillciService){
            $scope.user = thisuser.data;
            $rootScope.pageTitle ='Report - Added Institutes';
            
            var ebteam = ebteam.data;
            var ebteamIds = ebteam.map(function(a) {return a._id;});
            
            var listedUsers = [];
            
            if($scope.user && ($scope.user.userType == 'Master' || $scope.user.userType == 'Intern - Business Development')){
                $scope.authorized = true;
            }
            $scope.masterUser = null;
            if($scope.user.userType == 'Master'){
                $scope.masterUser = true;
            }
            $scope.allAddedInstitutes = addedInstitutes.data;
            console.log($scope.allAddedInstitutes.map(function(a) {return a._createdBy;}));
            $scope.$watch('allAddedInstitutes', function (newValue, oldValue, scope) {
                if(newValue != null && newValue.length > 0){
                    var instituteIds = newValue.map(function(a) {return a._id;});
                    //console.log(instituteIds);
                    tofillciService.findAssigned(instituteIds).success(function (data, status, headers) {
                        var response = data;
                        if(response && response.length > 0){
                            response.forEach(function(thisInstitute, index){
                                var iIndex = instituteIds.indexOf(thisInstitute);
                                if(iIndex != -1){
                                    $scope.allAddedInstitutes[iIndex].cifilled = true;
                                }
                            });
                        }
                        
                        $scope.addedInstitutes = $scope.allAddedInstitutes;
                        $scope.addedInstitutes.forEach(function(thisInstitute, index){
                            var addedByUser = thisInstitute._createdBy;
                            console.log(thisInstitute);
                            if(listedUsers.indexOf(addedByUser) == -1){
                                listedUsers.push(addedByUser);
                            }
                            var uIndex = ebteamIds.indexOf(addedByUser);
                            if(uIndex != -1){
                                thisInstitute._createdBy = ebteam[uIndex];
                            }
                            
                        });
                        $scope.listedUsers = [];
                        listedUsers.forEach(function(thisUser, index){
                            var uIndex = ebteamIds.indexOf(thisUser);
                            $scope.listedUsers.push(ebteam[uIndex]);

                        });

                    })
                    .error(function (data, status, header, config) {
                        console.log('Error ' + data + ' ' + status);
                    });  
                }
                
            }, true);
            
            
            $scope.websiteExists = function(institute){
                var exists = false;
                if(institute.website.length > 0){
                    exists = true;
                }
                return exists;
            };
            
            $scope.updateAddedInstitutes = function(user){
                
                if(user && user._id){
                    var userId = user._id;
                    $scope.addedInstitutes = [];
                    $scope.allAddedInstitutes.forEach(function(thisInstitute, index){
                        var addedByUser = thisInstitute._createdBy;
                        if(addedByUser._id == userId){
                            $scope.addedInstitutes.push(thisInstitute);
                        }
                    });
                }else{
                    $scope.addedInstitutes = $scope.allAddedInstitutes;
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
            
            $scope.titleCaseName = function(provider, index){
                targetStudyProviderService.titleCaseName(provider._id).success(function (data, status, headers) {
                    if(data){
                        provider = data;
                        console.log(provider.name);
                        /*$scope.showSavedDialog();
                        var addedByUser = provider._createdBy;
                        
                        var uIndex = ebteamIds.indexOf(addedByUser);
                        provider._createdBy = ebteam[uIndex];
                        
                        $scope.updateAddedInstitutes(null);*/
                    }else{
                        console.log('Something went wrong');   
                    }
                })
                .error(function (data, status, header, config) {
                console.log('Error ' + data + ' ' + status);
                });  
            };
            
            $scope.removeProviderConfirm = function(provider){
                var confirm = $mdDialog.confirm()
                .title('Would you like to remove coaching named ' + provider.name + ', located at ' +  provider.address + ', ' + provider.city + '?')
                .textContent('You will not be able to revert it later')
                .ariaLabel('Lucky day')
                .targetEvent()
                .clickOutsideToClose(true)
                .ok('Confirm')
                .cancel('Cancel');
                $mdDialog.show(confirm).then(function() {
                    $scope.removeProvider(provider);
                }, function() {
                  //nothing
                    $scope.showExamDialog();
                });     
            };
            $scope.removeProvider = function(provider){
                 targetStudyProviderService.removeProvider(provider._id).success(function (data, status, headers) {
                    if(data){
                        $scope.showSavedDialog();
                    }else{
                        console.log('Something went wrong');   
                    }
                })
                .error(function (data, status, header, config) {
                console.log('Error ' + data + ' ' + status);
                });  
            };
    }]);
        
    exambazaar.controller("addedQuestionsController", 
        [ '$scope', '$http','$state','$rootScope','thisuser','targetStudyProviderService', 'addedQuestions', 'ebteam', 'examList', function($scope, $http, $state, $rootScope, thisuser, targetStudyProviderService, addedQuestions, ebteam, examList){
            $scope.user = thisuser.data;
            var exams = examList.data;
            
            if($scope.user && ($scope.user.userType == 'Master' || $scope.user.userType == 'Intern - Business Development')){
                $scope.authorized = true;
            }
            $scope.allAddedQuestions = addedQuestions.data;
            $scope.addedQuestions = addedQuestions.data;
            var ebteam = ebteam.data;
            var ebteamIds = ebteam.map(function(a) {return a._id;});
            var examIds = exams.map(function(a) {return a._id;});
            
            var listedUsers = [];
            
            $scope.addedQuestions.forEach(function(thisQuestion, index){
                var addedByUser = thisQuestion._createdBy;
                if(listedUsers.indexOf(addedByUser) == -1){
                    listedUsers.push(addedByUser);
                }
                var uIndex = ebteamIds.indexOf(addedByUser);
                thisQuestion._createdBy = ebteam[uIndex];
                
                var eIndex = examIds.indexOf(thisQuestion.exam);
                if(eIndex != -1){
                    thisQuestion.exam = exams[eIndex];
                }
                thisQuestion.hasSolution = 'No';
                thisQuestion.questions.forEach(function(thisQuestionPart, index){
                    
                });
            });
            $scope.listedUsers = [];
            listedUsers.forEach(function(thisUser, index){
                var uIndex = ebteamIds.indexOf(thisUser);
                $scope.listedUsers.push(ebteam[uIndex]);
                
            });
            $scope.updateAddedQuestions = function(user){
                
                var userId = user._id;
                $scope.addedQuestions = [];
                $scope.allAddedQuestions.forEach(function(thisQuestion, index){
                    var addedByUser = thisQuestion._createdBy;
                    if(addedByUser._id == userId){
                        $scope.addedQuestions.push(thisQuestion);
                    }
                });
            };
            $scope.generateExamSummary = function(){
                $scope.examQCount = [];
                var examQuestions = $scope.addedQuestions.map(function(a) {return a.exam._id;});
               
                
                var counts = {};
                for (var i = 0; i < examQuestions.length; i++) {
                    counts[examQuestions[i]] = 1 + (counts[examQuestions[i]] || 0);
                }
                for(var i in counts){
                    //console.log(i + " " + counts[i]);
                    var newExamCount = {
                        exam: null,
                        count: null
                    };
                    
                    var eIndex = examIds.indexOf(i);
                    if(eIndex != -1){
                        newExamCount.exam = exams[eIndex];
                        newExamCount.count = counts[i];
                    }
                    $scope.examQCount.push(newExamCount);
                }
                console.log($scope.examQCount);
            };
            $scope.generateExamSummary();
    }]);
        
    exambazaar.controller("cityGroupExamQueryController", 
        [ '$scope', '$http','$state','$rootScope', 'targetStudyProviderService', function($scope, $http, $state, $rootScope, targetStudyProviderService){
        
        this.selectedItemChange = selectedItemChange;
        function selectedItemChange(item) {
            console.log('Item changed to ' + JSON.stringify(item));
            //$state.go('claim', {coachingId: item._id});
            $rootScope.reviewInstitute = item;
        };
        this.querySearch = function(query){
            if(query.length > 2){
                var cityGroupExamQuery = {
                    query: query,
                    city: $rootScope.reviewCity,
                    exam: $rootScope.reviewExam,
                    stream: $rootScope.reviewStream,
                };
                
                return targetStudyProviderService.cityGroupExamQueryForm(cityGroupExamQuery).then(function(response){
                    //console.log(response.data);
                    return response.data;
                });
            }
            
            /*return $http.get("https://api.github.com/search/users", {params: {q: query}})
            .then(function(response){
              return response.data.items;
            })*/
        };
            $rootScope.pageTitle ='Sandbox';
    }]);  
        
        
    exambazaar.controller("reviewController", 
        [ '$scope', '$http','$state','$rootScope','targetStudyProviderService', 'allcities', '$location', 'streamList', 'examList', '$mdDialog', function($scope, $http, $state, $rootScope, targetStudyProviderService, allcities, $location, streamList, examList, $mdDialog){
            $mdDialog.hide();
            $scope.streams = streamList.data;
            $scope.exams = examList.data;
            
            $scope.cities = allcities.data;
            $scope.rankedCities = ["Delhi","Mumbai","New Delhi","Ahmedabad","Chennai","Kolkata","Hyderabad","Pune","Bangalore","Chandigarh","Jaipur","Agra","Ajmer","Allahabad","Alwar","Ambala","Amritsar","Bhilwara","Bhopal","Bilaspur","Bhubaneswar","Bikaner","Coimbatore","Dehradun","Ganganagar","Ghaziabad","Guwahati","Gwalior","Indore","Juhnjhunu","Kanpur","Kota","Kurukshetra","Lucknow","Ludhiana","Mangalore","Mathura","Meerut","Mohali","Mysore","Nasik","Noida","Patiala","Patna","Rajkot","Rohtak","Roorkee","Sonbhadra","Shimla","Sikar","Surat","Thrissur","Trivandrum","Vadodara","Vellore","Vishakhapatnam"];
            //$scope.rankedCities = ["Jaipur","Kota"];
            
            $scope.reviewPolicy = "I certify that this review is based on my own experience and is my genuine opinion of this coaching institute, and that I have no personal or business relationship with this establishment, and have not been offered any incentive or payment originating from the establishment to write this review. I understand that Exambazaar has a zero-tolerance policy on fake reviews.";
            
            $scope.cancelDialog = function(){
                $mdDialog.hide();
            };
            $scope.showOtherCityDialog = function(ev) {
                $mdDialog.show({
                  contentElement: '#cityDialog',
                  parent: angular.element(document.body),
                  targetEvent: ev,
                  clickOutsideToClose: true
                });
            };
            
            $scope.examStep = function(){
                $scope.selectStream = false;
                $scope.selectExam = true;
                $scope.selectCity = false;
                $scope.searchCoaching = false;
                $rootScope.reviewExam = null;
                $rootScope.reviewCity = null;
                $rootScope.reviewInstitute = null;
            };
            $scope.cityStep = function(){
                $scope.selectStream = false;
                $scope.selectExam = false;
                $scope.selectCity = true;
                $scope.searchCoaching = false;
                $rootScope.reviewCity = null;
                $rootScope.reviewInstitute = null;
            };
            $scope.selectStream = true;
            $scope.selectExam = false;
            $scope.selectCity = false;
            $scope.searchCoaching = false;
            $scope.updateStream = function(stream){
                $rootScope.reviewStream = stream;
                $scope.selectStream = false;
                $scope.selectExam = true;
                $scope.selectCity = false;
                $scope.searchCoaching = false;
            };
            $scope.updateExam = function(exam){
                $rootScope.reviewExam = exam;
                $scope.selectStream = false;
                $scope.selectExam = false;
                $scope.selectCity = true;
                $scope.searchCoaching = false;
            };
            $scope.updateCity = function(city){
                $mdDialog.hide();
                $rootScope.reviewCity = city;
                $scope.selectStream = false;
                $scope.selectExam = false;
                $scope.selectCity = false;
                $scope.searchCoaching = true;
            };
            $scope.clearAll = function(){
                $scope.selectStream = true;
                $scope.selectExam = false;
                $scope.selectCity = false;
                $scope.searchCoaching = false;
                $rootScope.reviewStream = null;
                $rootScope.reviewExam = null;
                $rootScope.reviewCity = null;
                $rootScope.reviewInstitute = null;
            };
            
            $scope.checkReviewButton = function(){
                var disabled = false;
                if(!$rootScope.reviewStream || !$rootScope.reviewExam || !$rootScope.reviewCity || !$rootScope.reviewInstitute){
                    disabled = true;
                }
                return disabled;
            };
            $scope.goToReview = function(){
                var stream = $rootScope.reviewStream;
                var exam = $rootScope.reviewExam;
                var city = $rootScope.reviewCity;
                var institute = $rootScope.reviewInstitute;
                
                
                ///group/:categoryName/:subCategoryName/:cityName/:groupName
                console.log(stream.name);
                console.log(exam.name);
                console.log(city);
                console.log(institute.groupName);
                $state.go('showGroup', {categoryName: stream.name, subCategoryName: exam.name, cityName: city, groupName: institute.groupName});
            };
            $rootScope.pageTitle ='Write a Review - Exambazaar';
            
            var currURL = $location.absUrl();
            $rootScope.pageURL = currURL;
            $rootScope.pageImage = 'https://www.exambazaar.com/images/logo/cover.png';
    }]);
        
    /*exambazaar.controller("reviewCenterController", 
    [ '$scope', '$rootScope', 'thisProvider','$location', 'reviewService', '$cookies', '$mdDialog', '$timeout', function($scope,$rootScope, thisProvider, $location, reviewService, $cookies, $mdDialog, $timeout){
        $scope.provider = thisProvider.data;
        if($cookies.getObject( 'sessionuser')){
            $scope.user = $cookies.getObject( 'sessionuser');
        }
        
        
        $scope.reviewParams = [
            {name: "faculty", displayname:"Faculty and Teaching Experience", hoverVal: -1},
            {name: "competitive_environment", displayname:"Competitive Environment", hoverVal: -1},
            {name: "quality_of_material", displayname:"Quality of material", hoverVal: -1},
            {name: "infrastructure", displayname:"Infrastructure", hoverVal: -1},
        ];
        $scope.userReview = {
            institute: $scope.provider._id,
            text: ''
        };
        if($scope.user && $scope.user.userId){
            $scope.userReview.user = $scope.user.userId;
        }
        $scope.reviewParams.forEach(function(thisParam, index){
            $scope.userReview[thisParam.name] = null;
        });
        var noReview = false;
        $scope.$watch('[user.userId, provider._id]', function (newValue, oldValue, scope) {
            if(newValue[0] && newValue[1] && !noReview){
                var userInstituteForm = {
                    user: newValue[0],   
                    institute: newValue[1],   
                };
                reviewService.existingReview(userInstituteForm).success(function (data, status, headers) {
                    if(data){
                        $scope.userReview = data;
                        $scope.reviewParams.forEach(function(thisParam, index){
                            var pIndex = $scope.reviews.indexOf(parseInt($scope.userReview[thisParam.name]));
                            $scope.setReview(thisParam.name,parseInt($scope.userReview[thisParam.name]));
                        });
                    }else{
                        noReview = true;
                    }
                    
                })
                .error(function (data, status, header, config) {
                    console.log('Error ' + data + ' ' + status);
                }); 
            }
        }, true);
        $scope.reviews = [1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0];
        $scope.reviewsClasses = ["review1","review2","review3","review4","review5","review6","review7","review8","review9"];
        $scope.minTextLength = 140;
        
        $scope.placeholder = "Tip: A great review covers information about Faculty, Peer Interaction, Quality of material and Infrastructure. Got recommendations for your favorite faculty and employees, or something everyone should know about " + $scope.provider.name +", " + $scope.provider.city + "? Include that too! And remember, your review needs to be atleast " + $scope.minTextLength + " characters long :)";
        
        var paramNames = $scope.reviewParams.map(function(a) {return a.name;});
        
        $scope.getBackgroundColour = function(reviewParam,  paramIndex){
            var pIndex = paramNames.indexOf(reviewParam.name);
            var className = "noreview";
            
            var propName = $scope.reviewParams[pIndex].name;
            var review = $scope.userReview[propName];
            
            if(review){
                var rIndex = $scope.reviews.indexOf(review);
                //console.log(rIndex);
                if(paramIndex <= rIndex){
                    var rIndex2 = rIndex + 1;
                    className = "review" + rIndex2;    
                }
                
            }
            
            if($scope.reviewParams[pIndex].hoverVal >= 0){
                className = "noreview";
            };
            
            if($scope.reviewParams[pIndex].hoverVal >= paramIndex){
                
                var paramIndex2 = paramIndex + 1;
                className = "review" + paramIndex2;
            }
            
            
            return className;
        };
        
        $scope.logMouseEvent = function(reviewParam,  paramIndex) {
            switch (event.type) {
              case "mouseenter":
                    console.log("Hey Mouse Entered");
                    break;
              case "mouseover":{
                    var pIndex = paramNames.indexOf(reviewParam.name);
                    $scope.reviewParams[pIndex].hoverVal = paramIndex;
                    break;
              }
              case "mouseout":{
                    var pIndex = paramNames.indexOf(reviewParam.name);
                    $scope.reviewParams[pIndex].hoverVal = -1;
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
        
        $scope.showSavedReviewDialog = function(ev) {
            $mdDialog.show({
              contentElement: '#savedReviewDialog',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true
            });
            $timeout(function(){
                $mdDialog.cancel();
            },1000)
        };
        
        $scope.submitReview = function(){
            if($scope.userReview.user){
                reviewService.savereview($scope.userReview).success(function (data, status, headers) {
                    $scope.showSavedReviewDialog();
                })
                .error(function (data, status, header, config) {
                    console.log('Error ' + data + ' ' + status);
                });
            }else{
                console.log('No user set');
            }
        };
        $scope.checkReview = function(reviewParam, rateVal) {   
            if($scope.userReview[reviewParam.name] >=rateVal){return true;}else{return false;}
        }
        
        $scope.setReview = function(param, value){
            $scope.userReview[param] = value;
            //console.log($scope.userReview);
        };
        $scope.invalidSubmit = function(){
            var invalid = false;
            
            $scope.reviewParams.forEach(function(thisParam, index){
                if(!$scope.userReview[thisParam.name]){
                    invalid = true;
                }
            });
            $scope.userReview.text = $scope.userReview.text.trim();
            $scope.userReview.text = $scope.userReview.text.replace(/\s+/g, " ");
            
            
            
            var textLength = $scope.userReview.text.length;
            //console.log(textLength);
            if(textLength < $scope.minTextLength){
                invalid = true;
            }
            
            return invalid;
        };
        
        $rootScope.pageTitle = "Review " + $scope.provider.name + " " + $scope.provider.city;
        
        var currURL = $location.absUrl();
        $rootScope.pageURL = currURL;
        $rootScope.pageImage = 'https://www.exambazaar.com/images/logo/cover.png';
        
    }]);    */
    
    exambazaar.controller("coachingGroupController", 
        [ '$scope', '$http','$state','$rootScope','targetStudyProviderService', '$mdDialog', '$timeout','thisuser', 'examList', 'streamList', function($scope, $http, $state, $rootScope, targetStudyProviderService, $mdDialog, $timeout,thisuser, examList, streamList){
            
            $scope.user = thisuser.data;
            $scope.allExams = examList.data;
            $scope.allStreams = streamList.data;
            $scope.spreadsheetMode = false;
            
            
            if($scope.user.userType =='Master'){
                $scope.spreadsheetMode = true;
            }
            if($scope.user._id =='59899631a68cea0154b49502'){
                $scope.spreadsheetMode = true;
            }
            
            $rootScope.pageTitle ='Coaching Group Editing';
            
            
            $scope.showRenameCoachingDialog = function(ev) {
                $scope.newName = $scope.spreadSheetCoachings[1].name;
                $scope.newGroupName = $scope.spreadSheetCoachings[1].groupName;
                $mdDialog.show({
                  contentElement: '#renameCoachingDialog',
                  parent: angular.element(document.body),
                  targetEvent: ev,
                  clickOutsideToClose: true
                });
            };
            $scope.showRenameGroupDialog = function(ev) {
                $mdDialog.show({
                  contentElement: '#renameGroupDialog',
                  parent: angular.element(document.body),
                  targetEvent: ev,
                  clickOutsideToClose: true
                });
            };
            $scope.showExamDialog = function(ev) {
                $mdDialog.show({
                  contentElement: '#examDialog',
                  parent: angular.element(document.body),
                  targetEvent: ev,
                  clickOutsideToClose: true
                });
            };
            $scope.showRemoveExamDialog = function(ev) {
                $mdDialog.show({
                  contentElement: '#removeExamDialog',
                  parent: angular.element(document.body),
                  targetEvent: ev,
                  clickOutsideToClose: true
                });
            };
            $scope.showCommonExamDialog = function(ev) {
                $mdDialog.show({
                  contentElement: '#commonExamDialog',
                  parent: angular.element(document.body),
                  targetEvent: ev,
                  clickOutsideToClose: true
                });
            };
            $scope.showLogoDialog = function(ev) {
                $mdDialog.show({
                  contentElement: '#logoDialog',
                  parent: angular.element(document.body),
                  targetEvent: ev,
                  clickOutsideToClose: true
                });
            };
            $scope.showEmailDialog = function(ev) {
                $mdDialog.show({
                  contentElement: '#emailDialog',
                  parent: angular.element(document.body),
                  targetEvent: ev,
                  clickOutsideToClose: true
                });
            };
            
            $scope.showWebsiteDialog = function(ev) {
                $mdDialog.show({
                  contentElement: '#websiteDialog',
                  parent: angular.element(document.body),
                  targetEvent: ev,
                  clickOutsideToClose: true
                });
            };
            $scope.closeDialog = function(){
                $mdDialog.hide();
            };
            $scope.showSpreadsheetDialog = function(ev) {
                $mdDialog.show({
                  contentElement: '#spreadsheetDialog',
                  parent: angular.element(document.body),
                  targetEvent: ev,
                  clickOutsideToClose: true
                });
            };
            
            $scope.addExamsArray = [];
            $scope.removeExamsArray = [];
            $scope.addExam = function(thisArray, thisExam){
                var thisExamId = thisExam._id;
                var eIndex = thisArray.indexOf(thisExamId);
                if(eIndex == -1){
                    thisArray.push(thisExamId);
                }else{
                    //do nothing
                }
            };
            $scope.removeExam = function(thisArray, thisExam){
                var thisExamId = thisExam._id;
                var eIndex = thisArray.indexOf(thisExamId);
                if(eIndex == -1){
                    //do nothing
                }else{
                    thisArray.splice(eIndex,1);
                }
            };
            
            $scope.renameCoachingConfirm = function(){
                var instituteLength = $scope.spreadSheetCoachings.length;
                
                console.log($scope.newName);
                var allInstitutes = $scope.spreadSheetCoachings;
                if(allInstitutes[0]._id == 'EB Id'){
                    instituteLength = allInstitutes.length - 1;
                }
                
                var groupName = '';
                if($scope.spreadSheetCoachings.length > 1){
                    groupName = $scope.spreadSheetCoachings[1].name;
                }
                var confirm = $mdDialog.confirm()
                .title('Would you like to rename these ' + instituteLength + ' coaching centers of ' +  groupName + '?')
                .textContent('You will not be able to revert it later')
                .ariaLabel('Lucky day')
                .targetEvent()
                .clickOutsideToClose(true)
                .ok('Confirm')
                .cancel('Cancel');
                $mdDialog.show(confirm).then(function() {
                    $scope.renameAllCoaching();
                }, function() {
                  //nothing
                    $scope.showExamDialog();
                }); 
            };
            
            $scope.renameGroupNameConfirm = function(){
                var instituteLength = $scope.spreadSheetCoachings.length;
                
                console.log($scope.newGroupName);
                var allInstitutes = $scope.spreadSheetCoachings;
                if(allInstitutes[0]._id == 'EB Id'){
                    instituteLength = allInstitutes.length - 1;
                }
                
                var groupName = '';
                if($scope.spreadSheetCoachings.length > 1){
                    groupName = $scope.spreadSheetCoachings[1].groupName;
                }
                var confirm = $mdDialog.confirm()
                .title('Would you like to rename Group Name of these ' + instituteLength + ' coaching centers of ' +  groupName + '?')
                .textContent('You will not be able to revert it later')
                .ariaLabel('Lucky day')
                .targetEvent()
                .clickOutsideToClose(true)
                .ok('Confirm')
                .cancel('Cancel');
                $mdDialog.show(confirm).then(function() {
                    $scope.renameAllGroupName();
                }, function() {
                  //nothing
                    $scope.showExamDialog();
                }); 
            };
            $scope.renameAllCoaching = function(){
                var allInstitutes = $scope.spreadSheetCoachings;
                if(allInstitutes[0]._id == 'EB Id'){
                    allInstitutes.splice(0,1);
                }
                
                var instituteArray =  allInstitutes.map(function(a) {return a._id;});
                var groupNameForm = {
                    instituteArray: instituteArray,
                    name: $scope.newName
                };
                
                targetStudyProviderService.renameAllCoaching(groupNameForm).success(function (data, status, headers) {
                    console.log('Done');
                    $scope.showSavedDialog();
                    //$scope.showSavedDialog();
                    
                })
                .error(function (data, status, header, config) {
                    console.log('Error ' + data + ' ' + status);
                });       
            };
            
            $scope.renameAllGroupName = function(){
                var allInstitutes = $scope.spreadSheetCoachings;
                if(allInstitutes[0]._id == 'EB Id'){
                    allInstitutes.splice(0,1);
                }
                
                var instituteArray =  allInstitutes.map(function(a) {return a._id;});
                var groupNameForm = {
                    instituteArray: instituteArray,
                    groupName: $scope.newGroupName
                };
                
                targetStudyProviderService.renameAllGroupName(groupNameForm).success(function (data, status, headers) {
                    console.log('Done');
                    $scope.showSavedDialog();
                    //$scope.showSavedDialog();
                    
                })
                .error(function (data, status, header, config) {
                    console.log('Error ' + data + ' ' + status);
                });       
            };
            
            $scope.addExamConfirm = function(){
                var instituteLength = $scope.spreadSheetCoachings.length;
                var allInstitutes = $scope.spreadSheetCoachings;
                if(allInstitutes[0]._id == 'EB Id'){
                    instituteLength = allInstitutes.length - 1;
                }
                
                var groupName = '';
                if($scope.spreadSheetCoachings.length > 1){
                    groupName = $scope.spreadSheetCoachings[1].name;
                }
                var confirm = $mdDialog.confirm()
                .title('Would you add these ' + $scope.addExamsArray.length + ' exams to these ' + instituteLength + ' coaching centers of ' +  groupName + '?')
                .textContent('You will not be able to revert it later')
                .ariaLabel('Lucky day')
                .targetEvent()
                .clickOutsideToClose(true)
                .ok('Confirm')
                .cancel('Cancel');
                $mdDialog.show(confirm).then(function() {
                    $scope.addExamsToAll();
                }, function() {
                  //nothing
                    $scope.showExamDialog();
                }); 
            };
            
            $scope.setLogoConfirm = function(){
                var instituteLength = $scope.spreadSheetCoachings.length;
                var allInstitutes = $scope.spreadSheetCoachings;
                if(allInstitutes[0]._id == 'EB Id'){
                    instituteLength = allInstitutes.length - 1;
                }
                
                var groupName = '';
                if($scope.spreadSheetCoachings.length > 1){
                    groupName = $scope.spreadSheetCoachings[1].name;
                }
                var confirm = $mdDialog.confirm()
                .title('Would you like to set logo for these ' + instituteLength + ' coaching centers of ' +  groupName + '?')
                .textContent('You will not be able to revert it later')
                .ariaLabel('Lucky day')
                .targetEvent()
                .clickOutsideToClose(true)
                .ok('Confirm')
                .cancel('Cancel');
                $mdDialog.show(confirm).then(function() {
                    $scope.setLogoForAll();
                }, function() {
                  //nothing
                    $scope.showLogoDialog();
                }); 
            };
            
            $scope.setEmailConfirm = function(){
                var instituteLength = $scope.spreadSheetCoachings.length;
                var allInstitutes = $scope.spreadSheetCoachings;
                if(allInstitutes[0]._id == 'EB Id'){
                    instituteLength = allInstitutes.length - 1;
                }
                
                var groupName = '';
                if($scope.spreadSheetCoachings.length > 1){
                    groupName = $scope.spreadSheetCoachings[1].name;
                }
                var confirm = $mdDialog.confirm()
                .title('Would you like to add email for these ' + instituteLength + ' coaching centers of ' +  groupName + '?')
                .textContent('You will not be able to revert it later')
                .ariaLabel('Lucky day')
                .targetEvent()
                .clickOutsideToClose(true)
                .ok('Confirm')
                .cancel('Cancel');
                $mdDialog.show(confirm).then(function() {
                    $scope.setEmailForAll();
                }, function() {
                  //nothing
                    $scope.showLogoDialog();
                }); 
            };
            $scope.setWebsiteConfirm = function(){
                var instituteLength = $scope.spreadSheetCoachings.length;
                var allInstitutes = $scope.spreadSheetCoachings;
                if(allInstitutes[0]._id == 'EB Id'){
                    instituteLength = allInstitutes.length - 1;
                }
                
                var groupName = '';
                if($scope.spreadSheetCoachings.length > 1){
                    groupName = $scope.spreadSheetCoachings[1].name;
                }
                var confirm = $mdDialog.confirm()
                .title('Would you like to add website for these ' + instituteLength + ' coaching centers of ' +  groupName + '?')
                .textContent('You will not be able to revert it later')
                .ariaLabel('Lucky day')
                .targetEvent()
                .clickOutsideToClose(true)
                .ok('Confirm')
                .cancel('Cancel');
                $mdDialog.show(confirm).then(function() {
                    $scope.setWebsiteForAll();
                }, function() {
                  //nothing
                    $scope.showLogoDialog();
                }); 
            };
            
            $scope.addExamsToAll = function(){
                var allInstitutes = $scope.spreadSheetCoachings;
                if(allInstitutes[0]._id == 'EB Id'){
                    allInstitutes.splice(0,1);
                }
                
                var instituteArray =  allInstitutes.map(function(a) {return a._id;});
                var groupExamForm = {
                    instituteArray: instituteArray,
                    examArray: $scope.addExamsArray
                };
                
                targetStudyProviderService.addExamsToAll(groupExamForm).success(function (data, status, headers) {
                    console.log('Done');
                    $scope.showSavedDialog();
                    //$scope.showSavedDialog();
                    
                })
                .error(function (data, status, header, config) {
                    console.log('Error ' + data + ' ' + status);
                });       
            };
            
            $scope.setLogoForAll = function(){
                var allInstitutes = $scope.spreadSheetCoachings;
                if(allInstitutes[0]._id == 'EB Id'){
                    allInstitutes.splice(0,1);
                }
                
                var instituteArray =  allInstitutes.map(function(a) {return a._id;});
                var groupLogoForm = {
                    instituteArray: instituteArray,
                    logo: $scope.newLogo
                };
                
                targetStudyProviderService.setLogoForAll(groupLogoForm).success(function (data, status, headers) {
                    console.log('Done');
                    $scope.showSavedDialog();
                    //$scope.showSavedDialog();
                    
                })
                .error(function (data, status, header, config) {
                    console.log('Error ' + data + ' ' + status);
                });       
            };
            $scope.newEmail = '';
            $scope.setEmailForAll = function(){
                var allInstitutes = $scope.spreadSheetCoachings;
                if(allInstitutes[0]._id == 'EB Id'){
                    allInstitutes.splice(0,1);
                }
                var emailArray = $scope.newEmail.toLowerCase().split(',');
                
                emailArray.forEach(function(thisEmail, index){
                    thisEmail = thisEmail.trim();
                });
                
                if(emailArray.length > 0){
                    var instituteArray =  allInstitutes.map(function(a) {return a._id;});
                    var groupEmailForm = {
                        instituteArray: instituteArray,
                        emailArray: emailArray
                    };

                    targetStudyProviderService.setEmailForAll(groupEmailForm).success(function (data, status, headers) {
                        $scope.showSavedDialog();

                    })
                    .error(function (data, status, header, config) {
                        console.log('Error ' + data + ' ' + status);
                    });  
                   
                }
                     
            };
            
            $scope.newWebsite = '';
            $scope.setWebsiteForAll = function(){
                var allInstitutes = $scope.spreadSheetCoachings;
                if(allInstitutes[0]._id == 'EB Id'){
                    allInstitutes.splice(0,1);
                }
                var websiteArray = $scope.newWebsite.toLowerCase().split(',');
                
                websiteArray.forEach(function(thisWebsite, index){
                    thisWebsite = thisWebsite.trim();
                });
                
                if(websiteArray.length > 0){
                    var instituteArray =  allInstitutes.map(function(a) {return a._id;});
                    var groupWebsiteForm = {
                        instituteArray: instituteArray,
                        websiteArray: websiteArray
                    };

                    targetStudyProviderService.setWebsiteForAll(groupWebsiteForm).success(function (data, status, headers) {
                        $scope.showSavedDialog();

                    })
                    .error(function (data, status, header, config) {
                        console.log('Error ' + data + ' ' + status);
                    });  
                   
                }
                     
            };
            
            $scope.removeExamConfirm = function(){
                var instituteLength = $scope.spreadSheetCoachings.length;
                var allInstitutes = $scope.spreadSheetCoachings;
                if(allInstitutes[0]._id == 'EB Id'){
                    instituteLength = allInstitutes.length - 1;
                }
                
                var groupName = '';
                if($scope.spreadSheetCoachings.length > 1){
                    groupName = $scope.spreadSheetCoachings[1].name;
                }
                var confirm = $mdDialog.confirm()
                .title('Would you remove these ' + $scope.removeExamsArray.length + ' exams from these ' + instituteLength + ' coaching centers of ' +  groupName + '?')
                .textContent('You will not be able to revert it later')
                .ariaLabel('Lucky day')
                .targetEvent()
                .clickOutsideToClose(true)
                .ok('Confirm')
                .cancel('Cancel');
                $mdDialog.show(confirm).then(function() {
                    $scope.removeExamsFromAll();
                }, function() {
                  //nothing
                    $scope.showRemoveExamDialog();
                }); 
            };
            $scope.removeExamsFromAll = function(){
                var allInstitutes = $scope.spreadSheetCoachings;
                if(allInstitutes[0]._id == 'EB Id'){
                    allInstitutes.splice(0,1);
                }
                
                var instituteArray =  allInstitutes.map(function(a) {return a._id;});
                var groupExamForm = {
                    instituteArray: instituteArray,
                    examArray: $scope.removeExamsArray
                };
                
                targetStudyProviderService.removeExamsFromAll(groupExamForm).success(function (data, status, headers) {
                    console.log('Done');
                    $scope.showSavedDialog();
                    //$scope.showSavedDialog();
                    
                })
                .error(function (data, status, header, config) {
                    console.log('Error ' + data + ' ' + status);
                });       
            };
            
            $scope.commonExamsInAll = function(){
                var allInstitutes = $scope.spreadSheetCoachings;
                if(allInstitutes[0]._id == 'EB Id'){
                    allInstitutes.splice(0,1);
                }
                var allExamIds =  $scope.allExams.map(function(a) {return a._id;});
                
                var instituteArray =  allInstitutes.map(function(a) {return a._id;});
                var groupExamForm = {
                    instituteArray: instituteArray,
                    examArray: allExamIds,
                };
                
                targetStudyProviderService.commonExamsInAll(groupExamForm).success(function (data, status, headers) {
                    var commonExams = data;
                    $scope.commonExamIds = data;
                    var allExamIds =  $scope.allExams.map(function(a) {return a._id;});
                    $scope.commonExams = [];
                    commonExams.forEach(function(thisExam, index){
                        var eIndex = allExamIds.indexOf(thisExam);
                        $scope.commonExams.push($scope.allExams[eIndex]);
                    });
                    $scope.showCommonExamDialog();
                    console.log($scope.commonExams);
                    //$scope.showSavedDialog();
                    //$scope.showSavedDialog();
                    
                })
                .error(function (data, status, header, config) {
                    console.log('Error ' + data + ' ' + status);
                });       
            };
            
            $scope.disableConfirm = function(){
                var instituteLength = $scope.spreadSheetCoachings.length;
                
                console.log($scope.newName);
                var allInstitutes = $scope.spreadSheetCoachings;
                if(allInstitutes[0]._id == 'EB Id'){
                    instituteLength = allInstitutes.length - 1;
                }
                
                var groupName = '';
                if($scope.spreadSheetCoachings.length > 1){
                    groupName = $scope.spreadSheetCoachings[1].name;
                }
                var confirm = $mdDialog.confirm()
                .title('Would you like to disable these ' + instituteLength + ' coaching centers of ' +  groupName + '?')
                .textContent('You will not be able to revert it later')
                .ariaLabel('Lucky day')
                .targetEvent()
                .clickOutsideToClose(true)
                .ok('Confirm')
                .cancel('Cancel');
                $mdDialog.show(confirm).then(function() {
                    $scope.disableAll();
                }, function() {
                  //nothing
                    $scope.showExamDialog();
                }); 
            };
            
            $scope.disableAll = function(){
                
                var allInstitutes = $scope.spreadSheetCoachings;
                if(allInstitutes[0]._id == 'EB Id'){
                    allInstitutes.splice(0,1);
                }
                
                var disableForm = {
                    user: $scope.user._id,
                    instituteIds: allInstitutes
                };
                console.log('Disabling: ' + allInstitutes.length);
                targetStudyProviderService.bulkDisableProviders(disableForm).success(function (data, status, headers) {
                    console.log('Done');
                    $scope.showSavedDialog();
                })
                .error(function (data, status, header, config) {
                    console.log("Error ");
                });   
            };
            
            $rootScope.$on("setSpreadSheetCoachings", function(event, data){
                $scope.spreadSheetCoachings = [];
                var searchedCoachingGroup = data.coachingGroupItems;
                var newCenter = {
                    sno: 'S. No',
                    _id: 'EB Id',
                    name: 'Name',
                    groupName: 'Group Name',
                    address: 'Address',
                    city: 'City',
                    state: 'State',
                    pincode: 'Pincode',
                    logo: 'Logo',
                    email: 'Email',
                    phone: 'Phone',
                    mobile: 'Mobile',
                    website: 'Website',
                };
                $scope.spreadSheetCoachings.push(newCenter);
                searchedCoachingGroup.forEach(function(thisCoaching, cindex){
                    if(thisCoaching.email && thisCoaching.email.length > 0){
                        var emailString = '';
                        thisCoaching.email.forEach(function(thisEmail, eindex){
                            emailString += thisEmail;
                            if(eindex != thisCoaching.email.length-1){
                                emailString +=", ";
                            }
                        });
                    }
                    if(thisCoaching.phone && thisCoaching.phone.length > 0){
                        var phoneString = '';
                        thisCoaching.phone.forEach(function(thisEmail, eindex){
                            phoneString += thisEmail;
                            if(eindex != thisCoaching.phone.length-1){
                                phoneString +=", ";
                            }
                        });
                    }
                    if(thisCoaching.mobile && thisCoaching.mobile.length > 0){
                        var mobileString = '';
                        thisCoaching.mobile.forEach(function(thisEmail, eindex){
                            mobileString += thisEmail;
                            if(eindex != thisCoaching.mobile.length-1){
                                mobileString +=", ";
                            }
                        });
                    }
                    if(thisCoaching.website && thisCoaching.website.length > 0){
                        var websiteString = '';
                        thisCoaching.website.forEach(function(thisEmail, eindex){
                            websiteString += thisEmail;
                            if(eindex != thisCoaching.website.length-1){
                                websiteString +=", ";
                            }
                        });
                    }
                    var newCenter = {
                        sno: cindex + 1,
                        _id: thisCoaching._id,
                        name: thisCoaching.name,
                        groupName: thisCoaching.groupName,
                        address: thisCoaching.address,
                        city: thisCoaching.city,
                        state: thisCoaching.state,
                        pincode: thisCoaching.pincode,
                        logo: thisCoaching.logo,
                        email: emailString,
                        phone: phoneString,
                        mobile: mobileString,
                        website: websiteString,
                    };
                   
                    
                    $scope.spreadSheetCoachings.push(newCenter);

                });
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
                    console.log('Error ' + data + ' ' + status);
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
            $rootScope.pageTitle ='Search & Review Coaching Classes';
            
    }]); 
    
    exambazaar.controller("socialLoginController", 
        [ '$scope', '$http','$state','$rootScope', '$facebook', '$location', '$cookies', 'UserService', function($scope, $http, $state, $rootScope, $facebook, $location, $cookies, UserService){
            $scope.description = "";
            
            $scope.seeDescription = function(){
                
                var remove = "<div class=";
                var rIndex = $scope.description.indexOf(remove);
                $scope.description = $scope.description.substring(0, rIndex);
                console.log($scope.description );
            };
            
            var editor = new MediumEditor('.editable');
            $(function () {
                $('.editable').mediumInsert({
                    editor: editor
                });
            });
            
            /*$(function () {
                $('.editable').mediumInsert({
                    editor: editor,
                    addons: {
                        images: {
                            fileUploadOptions: {
                                url: 'upload.php'
                            }
                        }
                    }
                });
            });*/
            
            $rootScope.pageTitle ='Search & Review Coaching Classes';
            
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
                      redirect_uri: 'https://www.exambazaar.com/', 
                      hashtag: '#exambazaar',
                      quote: 'Exambazaar: Find best coaching classes in your city for more than 50 exams',
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
                      link: 'https://www.exambazaar.com',
                      //redirect_uri: 'https://www.exambazaar.com', 
                      source: 'https://www.exambazaar.com/images/logo/cover.png',
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

            //console.log($scope.user);
            
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
                        console.log("Error ");
                    });
                }
                
                
                
                
            }

            }, true);
            
            
            
            
    }]);
    
    exambazaar.controller("contactsController", 
        [ '$scope', '$http','$state','$rootScope', '$facebook', '$location', '$cookies', 'targetStudyProviderService', 'contactsSummary', function($scope, $http, $state, $rootScope, $facebook, $location, $cookies, targetStudyProviderService, contactsSummary){
            $scope.contacts = contactsSummary.data;
            console.log($scope.contacts);
            $scope.sanitizeMobiles = function(){
                targetStudyProviderService.sanitizeMobiles().success(function (data, status, headers) {
                    console.log('Mobiles sanitized');
                    console.log(data);
                    
                })
                .error(function (data, status, header, config) {
                    console.log();
                });    
            };
            
    }]);
      
    exambazaar.controller("aroundmeController", 
        [ '$scope', '$http','$state','$rootScope', '$location', '$cookies', 'UserService', 'targetStudyProviderService', 'NgMap', '$mdDialog', '$timeout', 'examList', 'streamList', '$geolocation', 'Notification', 'viewService','MasterService', function($scope, $http, $state, $rootScope, $location, $cookies, UserService, targetStudyProviderService, NgMap, $mdDialog, $timeout, examList, streamList, $geolocation, Notification, viewService, MasterService){
            $scope.allExams = examList.data;
            $scope.allStreams = streamList.data;
            $scope.masterUser = false;
            
            $rootScope.pageTitle ='Coaching Centers around you!';
            if($cookies.getObject('sessionuser')){
                $scope.user = $cookies.getObject('sessionuser');
                if($scope.user.userType == 'Master'){
                    $scope.masterUser = true;
                }
            }else{
                $scope.user = null;
            }
            
            $scope.toPdf = function(){
                var doc = new jsPDF({
                  orientation: 'landscape',
                  
                });

                doc.text('Hello world!', 35, 25);
                doc.text('Hello world2!', 35, 25);
                doc.save('two-by-four.pdf');
            };
            var viewForm = {
                state: $state.current.name,
                claim: false,
                url: $location.url()
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
                //console.log('View Marked');
            })
            .error(function (data, status, header, config) {
                console.log();
            });
            
            $scope.setLocofAll = function(){
                targetStudyProviderService.setLocOfAll().success(function (data, status, headers) {
                    console.log(data);
                })
                .error(function (data, status, header, config) {
                    console.log('Error ' + data + ' ' + status);
                });   
            };
            
            $scope.googlePlaces = function(){
                MasterService.googlePlaces().success(function (data, status, headers) {
                    console.log(data);
                })
                .error(function (data, status, header, config) {
                    console.log('Error ' + data + ' ' + status);
                });   
            };
            
            $scope.bulkSaveLatLng = function(){
                MasterService.bulkSaveLatLng().success(function (data, status, headers) {
                    console.log(data);
                })
                .error(function (data, status, header, config) {
                    console.log('Error ' + data + ' ' + status);
                });   
            };
            $scope.latLngSummary = function(){
                MasterService.latLngSummary().success(function (data, status, headers) {
                    console.log(data);
                    $scope.coachings = data;
                })
                .error(function (data, status, header, config) {
                    console.log('Error ' + data + ' ' + status);
                });   
            };
            
            NgMap.getMap().then(function(map) {
                //console.log('map', map);
                $scope.map = map;
            });
            $scope.goToCoaching = function(provider){
                var coachingForm = {
                    _id: provider._id 
                };
                targetStudyProviderService.showGroupHelperById(coachingForm).success(function (data, status, headers) {
                        var examStream = data;
                        
                        var url = $state.href('showGroup', {categoryName: examStream.stream, subCategoryName: examStream.exam, cityName: examStream.city, groupName: examStream.groupName});
                        window.open(url,'_blank');
                    })
                    .error(function (data, status, header, config) {
                        console.log('Error ' + data + ' ' + status);
                    });
            };
            function reverseGeocodeUser(lat, lng){
                var geocoder = new google.maps.Geocoder();
                var latlng = new google.maps.LatLng(lat, lng);
                geocoder.geocode({ 'latLng': latlng }, function (results, status){
                    if (status == google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        var gResults = results[1].address_components;
                        var userAddress = {
                            sublocality_level_2: null,    
                            sublocality: null,    
                            city: null,    
                            state: null,    
                            country: null,    
                        };
                        
                        //console.log(gResults);    
                        gResults.forEach(function(thisComp, cindex){
                        var cTypes = thisComp.types;
                         
                        if(cTypes.indexOf("sublocality_level_2") != -1){
                            userAddress.sublocality_level_2 = thisComp.long_name;
                        } 
                        if(cTypes.indexOf("sublocality_level_1") != -1){
                            userAddress.sublocality = thisComp.long_name;
                        }    
                        if(cTypes.indexOf("administrative_area_level_2") != -1){
                            userAddress.city = thisComp.long_name;
                        }
                        if(cTypes.indexOf("administrative_area_level_1") != -1){
                            userAddress.state = thisComp.long_name;
                        }
                        if(cTypes.indexOf("country") != -1){
                            userAddress.country = thisComp.long_name;
                        }
                        });
                           
                        //console.log(userAddress);
                        if(userAddress.sublocality && userAddress.city){
                           Notification.success("Great, we have located you at " + userAddress.sublocality + ", " + userAddress.city);
                           
                        }
                        
                            
                        //console.log(results[1].formatted_address);
                        } else {
                            console.log('Location not found');
                        }
                    } else {
                        console.log('Geocoder failed due to: ' + status);
                    }
                });
            };
            function latlngfromIP(){
                if($cookies.getObject('ip')){
                    var thisIP = $cookies.getObject('ip');
                    console.log("Using IP to geolocate user");
                    console.log(thisIP);
                    $scope.currLocation = [thisIP.lat, thisIP.long];
                    Notification.warning("Exambazaar couldn't locate you with accuracy");
                }    
            };
            
            $scope.$watch('currLocation', function (newValue, oldValue, scope) {
                if(newValue != null && newValue != ''){
                    reverseGeocodeUser(newValue[0], newValue[1]);
                }
            }, true);
            if (navigator.geolocation) {
                  var timeoutVal = 10 * 1000 * 1000;
                  navigator.geolocation.getCurrentPosition(
                    displayPosition, 
                    displayError,
                    { enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
                  );
                }
                else {
                  alert("Geolocation is not supported by your browser");
                    //use ip info
                }

                function displayPosition(position) {
                    $scope.currLocation = [position.coords.latitude, position.coords.longitude];
                    //$scope.currLocation = [13.029595, 77.569381];
                    //$scope.currLocation = [18.935322, 72.825932];
                    //$scope.currLocation = [31.633979, 74.872264];
                    //$scope.currLocation = [28.515623, 77.250452];
                    //$scope.currLocation = [28.576849, 77.161944];
                    //$scope.currLocation = [19.056719, 72.828877];
                    //$scope.currLocation = [28.917227, 77.064013];
                    //$scope.currLocation = [28.486915, 77.507298];
                    //$scope.currLocation = [12.823035, 80.043792];
                    //$scope.currLocation = [28.688274, 77.205712];
                    //$scope.currLocation = [26.277995, 73.011094];
                    //$scope.currLocation = [17.413502, 78.528736];
                    //$scope.currLocation = [24.434886, 77.161200];
                    //$scope.currLocation = [17.318687, 78.543050];
                }
                function displayError(error) {
                  var errors = { 
                    1: 'Permission denied',
                    2: 'Position unavailable',
                    3: 'Request timeout'
                  };
                  console.log("Error: " + errors[error.code]);
                    //use ip info
                    latlngfromIP();
                }
            
            $scope.showProvider = function(event, provider){
                $scope.activeProvider = provider;
                if(!provider.logo || provider.logo == ''){
                    $scope.activeProvider.logo = '';
                }
                $scope.map.showInfoWindow('foo-iw', $scope.activeProvider._id);
            };
            
            $scope.hideDetail = function() {
                $scope.map.hideInfoWindow('foo-iw');
            };
            $scope.onDragEnd = function (marker, $event) {
                var lat = marker.latLng.lat();
                var lng = marker.latLng.lng();
                $scope.currLocation = [lat, lng];
                //console.log($scope.currLocation);
                /*var geocoder = new $event.google.maps.Geocoder();
                geocoder.geocode({
                    'latLng': new $event.google.maps.LatLng(lat, lng)
                }, function (results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        if (results[0]) {
                            // @url: https://developers.google.com/maps/documentation/javascript/geocoding#ReverseGeocoding
                            // We return the second result, which is less specific than the first
                            //  (in this case, a neighborhood name)
                            var formatted_address = results[0].formatted_address;
                            $timeout(function () {
                                $scope.address = formatted_address;
                            }, 300);
                        } else {
                            alert('No results found');
                        }
                    } else {
                        alert('Geocoder failed due to: ' + status);
                    }
                });*/
            };
            $scope.getCurrentlocation = function(e) {
                $scope.currLocation = [e.latLng.lat(), e.latLng.lng()];
                
                
            };
            $scope.setSearchDistance = function(distance){
                $scope.searchDistance = distance;
            };
            $scope.searchDistance = 5;
            $scope.searchDistances = [1, 5, 10, 20, 50];
            $scope.searchExams = [];
            $scope.aroundme = function(){
                $mdDialog.hide();
                Notification.clearAll()
                //console.log($scope.searchExams);
                
                var queryForm = {
                    latlng: {
                        lat: $scope.currLocation[0],
                        lng: $scope.currLocation[1],
                    },
                    distanceinKm: $scope.searchDistance,
                    examArray: $scope.searchExams,
                };
                
                
                targetStudyProviderService.aroundme(queryForm).success(function (data, status, headers) {
                    $scope.providers = data;
                    
                    if($scope.providers.length > 0){
                        $scope.providers.forEach(function(thisProvider, index){
                            thisProvider.mapLatLng = [thisProvider.loc.coordinates[1], thisProvider.loc.coordinates[0]]
                        });
                        var latLngs = $scope.providers.map(function(a) {return a.mapLatLng;});
                        zoomToIncludeMarkers(latLngs);
                        Notification.success({message: "We found " + $scope.providers.length + " coaching classes within " + $scope.searchDistance + " kms of your location!", delay: 20000});
                        
                    }else{
                        Notification.error({message: 'Sorry we found no coaching classes around you!', delay: 20000});
                    }
                    
                    
                    //Notification.error({message: 'Error notification 1s', delay: 1000});
                    //console.log(data);
                })
                .error(function (data, status, header, config) {
                    console.log('Error ' + data + ' ' + status);
                });
            };
            
            $scope.showExamDialog = function(ev) {
            $mdDialog.show({
                  contentElement: '#examDialog',
                  parent: angular.element(document.body),
                  targetEvent: ev,
                  clickOutsideToClose: true
                }).finally(function() {
                    //$scope.userReviewMode = true;
                });
            };
            
            $scope.closeDialog = function(){
                $mdDialog.hide();
            };
            
            $scope.addExam = function(thisExam){
                if(!$scope.searchExams){
                    $scope.searchExams = [];
                }
                var eIndex = $scope.searchExams.indexOf(thisExam._id);
                if(eIndex == -1){
                    $scope.searchExams.push(thisExam._id);
                }else{
                    //exam already exists
                }
            };
            
            $scope.removeExam = function(thisExam){
                if(!$scope.searchExams){
                    //do nothing
                }else{
                    var eIndex = $scope.searchExams.indexOf(thisExam._id);
                    if(eIndex == -1){
                        //do nothing
                    }else{
                         $scope.searchExams.splice(eIndex, 1);
                    }
                }
            };
            
            function zoomToIncludeMarkers(markers) {
                markers.push($scope.currLocation);
                var bounds = new google.maps.LatLngBounds();
                markers.forEach(function(thisMarker, mindex){
                    var latlng = new google.maps.LatLng(thisMarker[0], thisMarker[1]);
                    bounds.extend(latlng);
                    
                });
                
                
                NgMap.getMap().then(function(map) {
                    //vm.map = map;
                    map.setCenter(bounds.getCenter());
                    map.fitBounds(bounds);
                    //map.setZoom(4);
                });
            };
         
            
            $scope.$on('$locationChangeStart', function( event ) {
                var answer = confirm("Are you sure you want to leave this page?")
                if (!answer) {
                    event.preventDefault();
                }
            });
            
    }]); 
    
    exambazaar.controller("chartingController", 
        [ '$scope', '$http','$state','$rootScope', '$facebook', '$location', '$cookies', 'UserService', 'viewSummary', 'viewHourlyHeatmap', 'userSummary', 'userHourlyHeatmap', 'providerSummary', 'reviewSummary', function($scope, $http, $state, $rootScope, $facebook, $location, $cookies, UserService, viewSummary, viewHourlyHeatmap, userSummary, userHourlyHeatmap, providerSummary, reviewSummary){
            
            $rootScope.pageTitle ='Charting Sandbox';
            if($cookies.getObject('sessionuser')){
                $scope.user = $cookies.getObject('sessionuser');
            }else{
                $scope.user = null;
            }
            $scope.charts = [];
            
            var summaryData = viewSummary.data;
            $scope.viewSummary = [];
            summaryData.forEach(function(thisDay, vindex){
                var newDayData = {
                    date: new Date(thisDay._id.year, thisDay._id.month-1, thisDay._id.day),
                    views: thisDay.count,
                };
                $scope.viewSummary.push(newDayData);
            });
            $scope.viewSummary.sort(function(a,b){
              return new Date(a.date) - new Date(b.date);
            });
            var views = $scope.viewSummary.map(function(a) {return a.views;});
            $scope.viewoptions = {
                scales: {
                  yAxes: [
                    {
                      id: 'y-axis-1',
                      type: 'linear',
                      display: true,
                      position: 'right'
                    },
                  ]
                },
                title: {
                    display: true,
                    text: 'EB Views per day'
                }
            };
            var newChart = {
                labels: $scope.viewSummary.map(function(a) {return moment(a.date).format('DD MMM YY');}),
                series: ['Views'],
                data: [views],
                datasetOverride: [{ yAxisID: 'y-axis-1' }],
                options: $scope.viewoptions
            };
            $scope.charts.push(newChart);
            
            
            
            
            
            var summaryData = userSummary.data;
            $scope.userSummary = [];
            summaryData.forEach(function(thisDay, vindex){
                var newDayData = {
                    date: new Date(thisDay._id.year, thisDay._id.month-1, thisDay._id.day),
                    users: thisDay.count,
                };
                $scope.userSummary.push(newDayData);
            });
            $scope.userSummary.sort(function(a,b){
              return new Date(a.date) - new Date(b.date);
            });
            var users = $scope.userSummary.map(function(a) {return a.users;});
            $scope.useroptions = {
                scales: {
                  yAxes: [
                    {
                      id: 'y-axis-1',
                      type: 'linear',
                      display: true,
                      position: 'right'
                    },
                  ]
                },
                title: {
                    display: true,
                    text: 'EB Users per day'
                }
            };
            newChart = {
                labels: $scope.userSummary.map(function(a) {return moment(a.date).format('DD MMM YY');}),
                series: ['Users'],
                data: [users],
                datasetOverride: [{ yAxisID: 'y-axis-1' }],
                options: $scope.useroptions
            };
            $scope.charts.push(newChart);
            
            
            
            var summaryData = providerSummary.data;
            $scope.providerSummary = [];
            summaryData.forEach(function(thisDay, vindex){
                var newDayData = {
                    date: new Date(thisDay._id.year, thisDay._id.month-1, thisDay._id.day),
                    providers: thisDay.count,
                };
                if(thisDay._id.month>2){
                    $scope.providerSummary.push(newDayData);
                }
                
            });
            $scope.providerSummary.sort(function(a,b){
              return new Date(a.date) - new Date(b.date);
            });
            var providers = $scope.providerSummary.map(function(a) {return a.providers;});
            $scope.provideroptions = {
                scales: {
                  yAxes: [
                    {
                      id: 'y-axis-1',
                      type: 'linear',
                      display: true,
                      position: 'right'
                    },
                  ]
                },
                title: {
                    display: true,
                    text: 'EB Providers added per day'
                }
            };
            newChart = {
                labels: $scope.providerSummary.map(function(a) {return moment(a.date).format('DD MMM YY');}),
                series: ['Providers'],
                data: [providers],
                datasetOverride: [{ yAxisID: 'y-axis-1' }],
                options: $scope.provideroptions
            };
            $scope.charts.push(newChart);
            
            
            var summaryData = reviewSummary.data;
            $scope.reviewSummary = [];
            summaryData.forEach(function(thisDay, vindex){
                var newDayData = {
                    date: new Date(thisDay._id.year, thisDay._id.month-1, thisDay._id.day),
                    reviews: thisDay.count,
                };
                if(thisDay._id.month>2){
                    $scope.reviewSummary.push(newDayData);
                }
                
            });
            $scope.reviewSummary.sort(function(a,b){
              return new Date(a.date) - new Date(b.date);
            });
            var reviews = $scope.reviewSummary.map(function(a) {return a.reviews;});
            $scope.reviewoptions = {
                scales: {
                  yAxes: [
                    {
                      id: 'y-axis-1',
                      type: 'linear',
                      display: true,
                      position: 'right'
                    },
                  ]
                },
                title: {
                    display: true,
                    text: 'EB Reviews added per day'
                }
            };
            newChart = {
                labels: $scope.reviewSummary.map(function(a) {return moment(a.date).format('DD MMM YY');}),
                series: ['Review'],
                data: [reviews],
                datasetOverride: [{ yAxisID: 'y-axis-1' }],
                options: $scope.reviewoptions
            };
            $scope.charts.push(newChart);
            
            
            
            
            var summaryData = viewHourlyHeatmap.data;
            $scope.viewHourlyHeatmapSummary = [];
            summaryData.forEach(function(thisHour, vindex){
                var newHourData = {
                    hour: (thisHour._id.hour + 5) % 24,
                    views: thisHour.count,
                };
                $scope.viewHourlyHeatmapSummary.push(newHourData);
            });
            $scope.viewHourlyHeatmapSummary.sort(function(a,b){
              return new Date(a.hour) - new Date(b.hour);
            });
            var views = $scope.viewHourlyHeatmapSummary.map(function(a) {return a.views;});
            $scope.viewoptions = {
                scales: {
                  yAxes: [
                    {
                      id: 'y-axis-1',
                      type: 'linear',
                      display: true,
                      position: 'right'
                    },
                  ]
                },
                title: {
                    display: true,
                    text: 'EB Views based on time of day'
                }
            };
            newChart = {
                labels: $scope.viewHourlyHeatmapSummary.map(function(a) {return a.hour;}),
                series: ['Views'],
                data: [views],
                datasetOverride: [{ yAxisID: 'y-axis-1' }],
                options: $scope.viewoptions
            };
            $scope.charts.push(newChart);
            
            
            var summaryData = userHourlyHeatmap.data;
            $scope.userHourlyHeatmapSummary = [];
            summaryData.forEach(function(thisHour, vindex){
                var newHourData = {
                    hour: (thisHour._id.hour + 5) % 24,
                    users: thisHour.count,
                };
                $scope.userHourlyHeatmapSummary.push(newHourData);
            });
            $scope.userHourlyHeatmapSummary.sort(function(a,b){
              return new Date(a.hour) - new Date(b.hour);
            });
            var users = $scope.userHourlyHeatmapSummary.map(function(a) {return a.users;});
            $scope.useroptions = {
                scales: {
                  yAxes: [
                    {
                      id: 'y-axis-1',
                      type: 'linear',
                      display: true,
                      position: 'right'
                    },
                  ]
                },
                title: {
                    display: true,
                    text: 'New Users added based on time of day'
                }
            };
            newChart = {
                labels: $scope.userHourlyHeatmapSummary.map(function(a) {return a.hour;}),
                series: ['Users'],
                data: [users],
                datasetOverride: [{ yAxisID: 'y-axis-1' }],
                options: $scope.useroptions
            };
            $scope.charts.push(newChart);
            
    }]);     
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }
    exambazaar.controller("blogController", 
        [ '$scope', '$http','$state','$rootScope', '$facebook', '$location', '$cookies','$mdDialog', '$document', 'pageTimer', 'blogpostService','allBlogs', 'Socialshare', 'viewService', 'upvoteService', 'allBlogsUpvotesCount', function($scope, $http, $state, $rootScope, $facebook, $location, $cookies, $mdDialog, $document, pageTimer, blogpostService, allBlogs, Socialshare, viewService, upvoteService, allBlogsUpvotesCount){
            $scope.allBlogs = allBlogs.data;
            
            var allBlogsUpvotesCount = allBlogsUpvotesCount.data;
            var blogUpvotesId = allBlogsUpvotesCount.map(function(a) {return a.blogpost;});
            $scope.allBlogs.forEach(function(thisBlog, index){
                var bIndex = blogUpvotesId.indexOf(thisBlog._id);
                
                if(bIndex == -1){
                    thisBlog.upvotes = 0;
                }else{
                    thisBlog.upvotes = allBlogsUpvotesCount[bIndex].upvotes;
                }
            });
            
            $scope.addedUpvoteIds = [];
            $scope.userUpvotes = [];
            if($cookies.getObject('sessionuser')){
                $scope.user = $cookies.getObject('sessionuser');
                upvoteService.blogpostUserUpvotes($scope.user._id).success(function (data, status, headers) {
                    $scope.userUpvotes = data;
                })
                .error(function (data, status, header, config) {
                    console.log();
                });
                
            }else{
                
            }
            
            $scope.upvoteExists = function(blogpost){
                var uIndex = $scope.userUpvotes.indexOf(blogpost._id);
                if(uIndex == -1){
                    return false;
                }else{
                    return true;
                }
            };
            
            $scope.saveupvote = function(blogpost){
                var upvoteForm = {
                    blogpost: blogpost._id,
                };
                if($scope.user && $scope.user._id){
                    upvoteForm.user = $scope.user._id;
                }
                upvoteService.saveupvote(upvoteForm).success(function (savedata, status, headers) {    
                    upvoteService.blogpostUpvoteCount(blogpost.urlslug).success(function (data, status, headers) {
                         $scope.userUpvotes.push(blogpost._id);
                         blogpost.upvotes = data;

                    })
                    .error(function (data, status, header, config) {
                        console.log();
                    });
                })
                .error(function (data, status, header, config) {
                    console.log();
                });
            };
            
            $scope.removeupvote = function(blogpost){
                if($scope.user && $scope.user._id){
                    var removeupvoteForm = {
                        blogpost: blogpost._id,
                        user: $scope.user._id,
                    };
                     upvoteService.removeupvote(removeupvoteForm).success(function (data, status, headers) {
                        upvoteService.blogpostUpvoteCount(blogpost.urlslug).success(function (sdata, status, headers) {    
                         upvoteService.blogpostUserUpvotes($scope.user._id).success(function (data, status, headers) {
                                $scope.userUpvotes = data;
                                blogpost.upvotes = sdata;
                            })
                            .error(function (data, status, header, config) {
                                console.log();
                            });

                        })
                        .error(function (data, status, header, config) {
                            console.log();
                        });
                    })
                    .error(function (data, status, header, config) {
                        console.log();
                    });   
                }
            };
            
            var defaultBlogCovers = ["images/blog/blog-cover-7.jpg","images/blog/background.jpg"];
            var rIndex = getRandomInt(0, defaultBlogCovers.length);
            var defaultBlogCover = defaultBlogCovers[rIndex];
            $scope.thisBlogCover = defaultBlogCover;
            
            $scope.shareText = "Hi! Read the exam preparation blog at Exambazaar! ";
            $scope.shareText2 = $scope.shareText;
            $scope.currURL = $location.absUrl();
            $scope.prefix = "https://exambazaar.com/blogpost/";
            $scope.shareURL = function(blogpost){
                return ($scope.prefix + blogpost.urlslug);
            };
            $scope.shareBlogText = function(blogpost){
                return ('"' + blogpost.title + '"' + " | Read all about exam preparation ");
            };
            $scope.postFacebook = function(blogpost){
                Socialshare.share({
                  'provider': 'facebook',
                  'attrs': {
                    'socialshareType': 'feed',
                    'socialshareUrl': $scope.shareURL(blogpost),
                    'socialshareVia':"1236747093103286",  'socialshareRedirectUri': 'https://www.exambazaar.com',
                  }
                });    
            };
            $scope.shareFacebook = function(){
                Socialshare.share({
                  'provider': 'facebook',
                  'attrs': {
                    'socialshareType': 'send',
                    'socialshareUrl': $scope.currURL,
                    'socialshareVia':"1236747093103286",  'socialshareRedirectUri': 'https://www.exambazaar.com',
                  }
                });
            };
           
            
            $rootScope.pageTitle = "Blog - Exambazaar resources for all exams in India";
            $rootScope.pageImage = $scope.thisBlogCover;
            
            $scope.goToBlog = function(blog){
                var url = $state.href('showblog', {blogpostSlug: blog.urlslug});
                window.open(url,'_blank');  
            };
            
            var viewForm = {
                state: $state.current.name,
                claim: false,
                url: $location.url()
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
                //console.log('View Marked');
            })
            .error(function (data, status, header, config) {
                console.log();
            });
            
            /*$document.on('mouseleave', leaveFromTop);
            function leaveFromTop(e){
                if( e.clientY < 0 && !$rootScope.fblikeDialog && $scope.t.counts > 10){
                    //console.log($rootScope.fblikeDialog);
                    $rootScope.showfblikeDialog();
                }
                //console.log($scope.t.counts);
            };
            $scope.t = pageTimer(1000);*/
            
    }]);   
    
    exambazaar.controller("activeUsersController", 
        [ '$scope', 'thisuser','activeUsers', 'UserService', 'Notification', function($scope, thisuser, activeUsers, UserService, Notification){
            $scope.user = thisuser.data;
            $scope.activeUsers = activeUsers.data;
            
            console.log($scope.activeUsers);
            if($scope.user && $scope.user.userType=='Master'){
                $scope.masterUser = true;
            }
            $scope.nDays = 7;
            $scope.daysArray = [1, 2, 3, 4, 5, 6, 7, 30, 60, 90];
            
            $scope.setNDays = function(day){
                $scope.nDays = day;
                $scope.updateActiveUsers();
            };
            $scope.updateActiveUsers = function(){
                UserService.activeUsers($scope.nDays).success(function (data, status, headers) {
                    $scope.activeUsers = data;
                    Notification.success("Great, we have found the active users of the last " + $scope.nDays + ' days!');
                })
                .error(function (data, status, header, config) {
                    console.log();
                });
            };
    }]);
    
    exambazaar.controller("allTestsController", 
        [ '$scope', 'thisuser','examList','testList', 'testService', function($scope, thisuser, examList, testList, testService){
            $scope.user = thisuser.data;
            $scope.allTests = testList.data;
            var allExams = examList.data;
            
            var examIds = allExams.map(function(a) {return a._id;});
            
            allExams.forEach(function(thisExam, index){
                if(!thisExam.tests){
                    thisExam.tests = [];
                }
            });
            
            $scope.allTests.forEach(function(thisTest, index){
                var eIndex = examIds.indexOf(thisTest.exam);
                if(eIndex != -1){
                    if(!allExams[eIndex].tests){
                        allExams[eIndex].tests = [];
                    }
                    allExams[eIndex].tests.push(thisTest);
                }
            });
            
            $scope.allExams = allExams;
            //console.log($scope.allTests);
            if($scope.user && $scope.user.userType=='Master'){
                $scope.masterUser = true;
            }
            
            $scope.readTest = function(test){
                var question = test.url.question;
                var answer = test.url.question;
                testService.readTest(test._id).success(function (data, status, headers) {
                    console.log(data);
                })
                .error(function (data, status, header, config) {
                    console.log("Error ");
                });    
            };
    }]);    
        
            
        
    exambazaar.controller("scheduleQADController", 
        [ '$scope', '$rootScope', 'thisuser', 'allPages', 'socialMediaCredentialService', '$mdDialog', '$timeout', 'examList', 'streamList', 'questionService', function($scope, $rootScope, thisuser, allPages, socialMediaCredentialService, $mdDialog, $timeout, examList, streamList, questionService){
            $scope.user = thisuser.data;
            $scope.allExams = examList.data;
            
            var examIds = $scope.allExams.map(function(a) {return a._id;});
            $scope.allStreams = streamList.data;
            
            if($scope.user._id =='59a7eb973d71f10170dbb468' || $scope.user.userType == 'Master'){
                $scope.masterUser = true;
            }
            
            $rootScope.pageTitle = "Schedule QAD";
            
            $scope.examBadgeClass = function(thisExam){
                var badgeClass = "examTagHolder";
                if($scope.markingPage){
                    var pageExamIds = $scope.markingPage.exams.map(function(a) {return a._id;});
                    if(pageExamIds.indexOf(thisExam._id) != -1){
                        badgeClass = "existingExamTagHolder";
                    }
                }
                return badgeClass;
            };
            $scope.allPages = allPages.data;
            
            $scope.allPages.forEach(function(thisPage, index){
                thisPage.facebook.link = "https://www.facebook.com/" + thisPage.facebook.id;
                
                thisPage.exams.forEach(function(thisExam, eindex){
                    var examIndex = examIds.indexOf(thisExam);
                    if(examIndex != -1){
                        $scope.allPages[index].exams[eindex] = $scope.allExams[examIndex];
                    }
                });
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
            $scope.showPostedDialog = function(ev) {
            $mdDialog.show({
                  contentElement: '#postedDialog',
                  parent: angular.element(document.body),
                  targetEvent: ev,
                  clickOutsideToClose: true
                });
                $timeout(function(){
                    $mdDialog.cancel();
                },1000)
            };
            $scope.markingPage = null;
            $scope.showExamDialog = function(page, ev) {
                $scope.markingPage = page;
                console.log($scope.markingPage.exams);
                $mdDialog.show({
                  contentElement: '#examDialog',
                  parent: angular.element(document.body),
                  targetEvent: ev,
                  clickOutsideToClose: true
                }).finally(function() {
                    //$scope.userReviewMode = true;
                });
            };
            $scope.markExamsDone = function(){
                $mdDialog.hide();    
            };
            
            $scope.addRemovePageExam = function(thisExam){
                if(!$scope.markingPage.exams){
                    $scope.markingPage.exams = [];
                }
                var examIds = $scope.markingPage.exams.map(function(a) {return a._id;});
                var eIndex = examIds.indexOf(thisExam._id);
                console.log(eIndex);
                if(eIndex == -1){
                    $scope.markingPage.exams.push(thisExam._id);
                }else{
                    //exam already exists
                    $scope.markingPage.exams.splice(eIndex, 1);
                }
            };
            
            
            
            
            
            $scope.savePage = function(page){
                if(!page.hashtags){
                    page.hashtags = [];
                }
                page.hashtags.forEach(function(thisHashTag, index){
                    if(thisHashTag == ''){
                        page.hashtags.splice(index, 1);
                    }else{
                        if(thisHashTag.indexOf('#') != 0){
                            page.hashtags[index] = "#" + thisHashTag;
                        }
                    }
                });
                socialMediaCredentialService.saveSocialMediaCredential(page).success(function (data, status, headers) {
                    socialMediaCredentialService.getSocialMediaCredentials().success(function (data, status, headers) {
                        $scope.allPages = data;
                        $scope.allPages.forEach(function(thisPage, index){
                            thisPage.facebook.link = "https://www.facebook.com/" + thisPage.facebook.id;

                            thisPage.exams.forEach(function(thisExam, eindex){
                                var examIndex = examIds.indexOf(thisExam);
                                if(examIndex != -1){
                                    $scope.allPages[index].exams[eindex] = $scope.allExams[examIndex];
                                }
                            });
                        });
                        $scope.showSavedDialog();
                    })
                    .error(function (data, status, header, config) {
                        console.log("Error ");
                    });
                })
                .error(function (data, status, header, config) {
                    console.log("Error ");
                });    
            };
            
            $scope.syncFB = function(){
            FB.login(function(response){

            FB.api('/me/accounts', function(response){
            var fbpages = response.data;
            var nPages = fbpages.length;
            var counter = 0;

            fbpages.forEach(function(thisPage, index){
                var p_id = thisPage.id;
                var string_id = '/' + p_id + '/feed';
                var p_accessToken = thisPage.access_token;
                var p_name = thisPage.name;
                var existingPagesFBIds = $scope.allPages.map(function(a) {return a.facebook.id;});
                var eIndex = existingPagesFBIds.indexOf(p_id);
                
                FB.api(string_id, function(response) {
                    thisPage.data = response.data;
                    var newSocialMediaCredential = {
                        platform: 'Facebook',
                        facebook: thisPage,
                        exams: []
                    }; 
                    if(eIndex != -1){
                        
                        var currExams = $scope.allPages[eIndex].exams;
                        if(currExams.length > 0){
                            currExams = currExams.map(function(a) {return a._id;});
                        }
                        newSocialMediaCredential.exams = currExams;
                        
                    }
                    
                    socialMediaCredentialService.saveSocialMediaCredential(newSocialMediaCredential).success(function (data, status, headers) {
                        //console.log(data);
                        counter += 1;
                        if(counter == nPages){
                        socialMediaCredentialService.getSocialMediaCredentials().success(function (data, status, headers) {
                            $scope.allPages = data;
                            $scope.allPages.forEach(function(thisPage, index){
                                thisPage.facebook.link = "https://www.facebook.com/" + thisPage.facebook.id;

                                thisPage.exams.forEach(function(thisExam, eindex){
                                    var examIndex = examIds.indexOf(thisExam);
                                    if(examIndex != -1){
                                        $scope.allPages[index].exams[eindex] = $scope.allExams[examIndex];
                                    }
                                });
                            });
                            
                            
                            $scope.showSavedDialog();
                        })
                        .error(function (data, status, header, config) {
                            console.log("Error ");
                        });

                        }
                    })
                    .error(function (data, status, header, config) {
                        console.log("Error ");
                    });
                });
            });
            });

            },{scope:'manage_pages,publish_pages'});
            };
            
            $scope.postToFB = function(){
                FB.login(function(response){
                
                FB.api('/me/accounts', function(response){

                var fbpages = response.data;
                fbpages.forEach(function(thisPage, index){
                    
                    var p_id = thisPage.id;
                    var string_id = '/' + p_id + '/feed';
                    var photos_id = '/' + p_id + '/photos';
                    var p_accessToken = thisPage.access_token;
                    var p_name = thisPage.name; 
                    //console.log('The pagename is: '+ p_name + 'Page access token is: ' + p_accessToken);
                    
                    FB.api(string_id, function(response) {
                        //console.log(response);
                        thisPage.data = response.data;
                        console.log(thisPage);
                        var newSocialMediaCredential = {
                            platform: 'Facebook',
                            facebook: thisPage,
                            exams: []
                        };
                        
                        socialMediaCredentialService.saveSocialMediaCredential(newSocialMediaCredential).success(function (data, status, headers) {
                            console.log(data);
                        })
                        .error(function (data, status, header, config) {
                            console.log("Error ");
                        });
                        
                    });
                    
                    
                    var questionString1 = "Exambazaar Question a Day of " + moment().format("DD MMM YY") + " is: \r\n\r\n";

                    var questionString1 = "Exambazaar Question a Day of " + moment().format("DD MMM YY") + " is: \r\n\r\n";
                    var questionString2 = "Q. A water cooler of storage capacity 120 litres can cool water at a constant rate of P watts. In a closed circulation system (as shown schematically in the figure), the water from the cooler is used to cool an external device that generates constantly 3 kW of heat (thermal load). The temperature of water fed into the device cannot exceed 30 degree celcius and the entire stored 120 litres of water in initially cooled to 10 degree celcius. The entire system is thermally insulated. The minimum value of P (in watts) for which the devicde can be operated for 3 hours is: (specific heat of water is 4.2 kJ per kg per K and the density of water is 1000 kg per meter^3) θ  \r\n\r\n";
                    var optionString = [];
                    optionString.push("A. 1600\r\n");
                    optionString.push("B. 2067\r\n");
                    optionString.push("C. 2533\r\n");
                    optionString.push("D. 3933\r\n");


                    var postString = questionString1 + questionString2;

                    optionString.forEach(function(thisOption, index){
                        postString += thisOption;
                    });

                    postString += "\r\n\r\nFor detailed answers and explanations, logon to www.exambazaar.com";
                    postString += "\r\n\r\n\#eqad #exambazaar";

                    var myDate="31-08-2017";
                    myDate=myDate.split("-");
                    var newDate=myDate[1]+"/"+myDate[0]+"/"+myDate[2];
                    var backdate = new Date(newDate).getTime();
                    //console.log(backdate);

                    var scheduledTime = moment().add(10, "minutes").unix();
                    //console.log(scheduledTime);
                    //The specified scheduled publish time is invalid

                    /*FB.api(
                        photos_id,
                        "POST",
                        {
                            "url": "https://exambazaar.s3.amazonaws.com/1ef829c877a8f44c6d755fd7e335ecc2.PNG",
                            access_token : p_accessToken,
                            caption: postString,
                            //no_story:1,
                            //backdated_time : backdate,
                            //published : false,
                            //scheduled_publish_time : scheduledTime,
                            //object_attachment

                        },
                        function (response) {
                          if (response && !response.error) {
                              console.log('Photo Posted');
                              console.log(response);
                              var photoId = response.id;
                              var photoPostId = response.post_id;
                          }else{
                              console.log(response);
                          }
                    });*/
                    /*FB.api(
                        string_id,
                        "POST",
                        {
                            "message": postString,
                            access_token : p_accessToken,
                            //backdated_time : backdate,
                            //published : false,
                            //scheduled_publish_time : scheduledTime,
                            object_attachment:photoId,

                        },
                        function (response) {
                          if (response && !response.error) {
                              console.log('Question Posted');
                              console.log(response);
                          }else{
                              console.log(response);
                          }
                    });*/

                });
                });
                
                },{scope:'manage_pages,publish_pages'});
                
                //publish_actions,
            };
            $scope.addHashtag = function(page){
                if(!page.hashtags){
                    page.hashtags = [];
                }
                page.hashtags.push('');
            };
            $scope.questionToPost = function(page){
                var examArray = page.exams.map(function(a) {return a._id;});
                //console.log(examArray);
                questionService.questionToPost(examArray).success(function (data, status, headers) {
                    var question = data;
                    
                    if(question){
                        $scope.postToFBPage(page, question);
                        
                    }else{
                        alert('Found no question');
                    }
                })
                .error(function (data, status, header, config) {
                    console.log("Error ");
                });  
            };
            $scope.buildPostSchedule = function(page){
                var examArray = page.exams.map(function(a) {return a._id;});
                var buildParams = {
                    examArray: examArray,
                    nQuestions: 10,
                };
                //console.log(examArray);
                questionService.buildPostSchedule(examArray).success(function (data, status, headers) {
                    var question = data;
                    
                    if(question){
                        console.log(question);
                        //$scope.postToFBPage(page, question);
                        
                    }else{
                        alert('Found no question');
                    }
                })
                .error(function (data, status, header, config) {
                    console.log("Error ");
                });  
            };
            //main posting function
            $scope.postToFBPage = function(page, question){
                console.log('FB Post Initiating');
            var thisPage = page.facebook;
            FB.login(function(response){
                FB.api('/me/accounts', function(response){
                    
                    var nQuestions = question.questions.length;
                    var nImages = 0;
                    if(question.images){
                        nImages = question.images.length;
                    }
                    console.log(question);
                    console.log(nQuestions);
                    console.log(nImages);
                    
                    var p_id = thisPage.id;
                    var string_id = '/' + p_id + '/feed';
                    var photos_id = '/' + p_id + '/photos';
                    var p_accessToken = thisPage.access_token;
                    var p_name = thisPage.name; 
                    //console.log('The pagename is: '+ p_name + 'Page access token is: ' + p_accessToken);
                    var miniseparator = "\r\n";
                    var separator = "\r\n\r\n";
                    var preQText = "EQAD of " + moment().format("DD MMM") + " as appeared in " + question.test.name + " is:" + separator;
                    
                    var totalQtexts = [];
                    if(question.context && question.context.length > 10){
                        totalQtexts.push(question.context + separator);
                    }
                    question.questions.forEach(function(thisQuestion, index){
                        //var thisQuestion = question.questions[0];
                        var qno = index + 1;
                        var Qtext = "Q" + qno + ". " + thisQuestion.question + separator;
                        var optionPrefixes = ["A. ", "B. ", "C. ", "D. ", "E. ", "F. ", "G. "];
                        var optionString = [];
                        var options = thisQuestion.options;
                        var Otext = "";
                        options.forEach(function(thisOption, index){
                            var nextOption = optionPrefixes[index] + thisOption.option + miniseparator;
                            Otext += nextOption;
                        });
                        Otext = Otext + separator;
                        var totalQtext = Qtext + Otext;
                        totalQtexts.push(totalQtext);
                    });
                    
                    var allQText = '';
                    totalQtexts.forEach(function(thisQuestionPart, index){
                        allQText += thisQuestionPart;
                    });
                    
                    var postOText = "For detailed answers and explanations, logon to www.exambazaar.com" + separator;
                    var thisPageHashTags = page.hashtags;
                    if(!thisPageHashTags){
                        thisPageHashTags = [];
                    }
                    var hashTagsList = ['#eqad', '#exambazaar'];
                    thisPageHashTags = thisPageHashTags.concat(hashTagsList);
                    var hashTags = "";
                    thisPageHashTags.forEach(function(thisHashTag, index){
                        hashTags = hashTags + thisHashTag;
                        if(index != thisPageHashTags.length - 1){
                            hashTags = hashTags + " ";
                        }
                        
                        
                    });
                    console.log(hashTags);

                    var postString = preQText + allQText + postOText + hashTags;
                    
                    var myDate="10-09-2017";
                    myDate=myDate.split("-");
                    var newDate=myDate[1]+"/"+myDate[0]+"/"+myDate[2];
                    var backdate = new Date(newDate).getTime();
                    //console.log(backdate);

                    var scheduledTime = moment().add(60, "minutes").unix();
                    //schedule time should be from 10 minutes to 6 months from now
                    
                    if(nImages == 0){
                        FB.api(
                            string_id,
                            "POST",
                            {
                                "message": postString,
                                access_token : p_accessToken,
                                //backdated_time : backdate,
                                published : false,
                                scheduled_publish_time : scheduledTime,

                            },
                            function (response) {
                              if (response && !response.error) {
                                  $scope.showPostedDialog();
                                  console.log('Question Posted');
                                  console.log(response);
                              }else{
                                  console.log(response);
                              }
                        });
                    }else{
                        FB.api(
                        photos_id,
                        "POST",
                        {
                            "url": question.images[0],
                            access_token : p_accessToken,
                            caption: postString,
                            //no_story:1,
                            //backdated_time : backdate,
                            published : false,
                            scheduled_publish_time : scheduledTime,
                            //object_attachment

                        },
                        function (response) {
                          if (response && !response.error) {
                              $scope.showPostedDialog();
                              console.log('Photo Posted');
                              console.log(response);
                              var photoId = response.id;
                              var photoPostId = response.post_id;
                          }else{
                              console.log(response);
                          }
                    });
                    }
                    
                    
                    
                    //console.log(scheduledTime);
                    //The specified scheduled publish time is invalid
                    /*FB.api(
                        photos_id,
                        "POST",
                        {
                            "url": "https://exambazaar.s3.amazonaws.com/1ef829c877a8f44c6d755fd7e335ecc2.PNG",
                            access_token : p_accessToken,
                            caption: postString,
                            //no_story:1,
                            //backdated_time : backdate,
                            //published : false,
                            //scheduled_publish_time : scheduledTime,
                            //object_attachment

                        },
                        function (response) {
                          if (response && !response.error) {
                              console.log('Photo Posted');
                              console.log(response);
                              var photoId = response.id;
                              var photoPostId = response.post_id;
                          }else{
                              console.log(response);
                          }
                    });*/
                    /*FB.api(
                        string_id,
                        "POST",
                        {
                            "message": postString,
                            access_token : p_accessToken,
                            //backdated_time : backdate,
                            //published : false,
                            //scheduled_publish_time : scheduledTime,
                            object_attachment:photoId,

                        },
                        function (response) {
                          if (response && !response.error) {
                              console.log('Question Posted');
                              console.log(response);
                          }else{
                              console.log(response);
                          }
                    });*/
                
                    
                });
            },{scope:'manage_pages,publish_pages'});
                
                //publish_actions,
            };
    }]);    
        
        
    exambazaar.controller("postBlogController", 
        [ '$scope', '$http','$state', '$stateParams','$rootScope', '$facebook', '$location', '$cookies', 'UserService', 'Upload', 'ImageService','$mdDialog', '$timeout', 'blogpostService','userBlogs', 'thisuser', 'upvoteService', 'allBlogsUpvotesCount', 'allBloggers', function($scope, $http, $state, $stateParams, $rootScope, $facebook, $location, $cookies, UserService, Upload, ImageService, $mdDialog, $timeout, blogpostService, userBlogs, thisuser, upvoteService, allBlogsUpvotesCount, allBloggers){
            $scope.user = thisuser.data;
            if(!$scope.user){
                if($cookies.getObject('sessionuser')){
                    $scope.user = $cookies.getObject('sessionuser');
                     UserService.getBlogger($scope.user._id).success(function (data, status, headers) {
                        var userGallery = data.blogger.gallery;
                        //console.log(userGallery);
                        $scope.blogGallery = userGallery;
                    })
                    .error(function (data, status, header, config) {
                        console.log("Error ");
                    });

                }else{
                    $scope.user = null;
                }
            }
            if($scope.user.userType == 'Master'){
                $scope.masterUser = true;
            }
                   
            $scope.credentialsMode = false;
            $scope.setCredentials = function(){
                $scope.credentialsMode = true;
            };
            $scope.saveBlogger = function(){
                $scope.credentialsMode = false;
                UserService.updateUser($scope.user).success(function (data, status, headers) {
                    $scope.showSavedDialog();
                })
                .error(function (data, status, header, config) {
                    console.log('Error ' + data + ' ' + status);
                });    
            };
            $scope.uploadBloggerPic = function (newPic) {
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
                console.log('Success ' + thisFile.name + 'uploaded. Response: ' + resp.data);
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
                    console.log("Error ");
                });
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                }, function (evt) {
                    
                });

            })
            .error(function (data, status, header, config) {
                console.log("Error");
            });   
                 
            });
            }
         };
            //console.log($scope.user);
            
            $scope.blogRowClass = function(thisblog){
                var className = "inactiveBlog";
                if(thisblog.active){
                    className = "activeBlog";
                }
                return className;
            };
            
            $scope.allBloggers = allBloggers.data;
            $scope.userBlogs = userBlogs.data;
            
            var allBlogsUpvotesCount = allBlogsUpvotesCount.data;
            var blogUpvotesId = allBlogsUpvotesCount.map(function(a) {return a.blogpost;});
            $scope.userBlogs.forEach(function(thisBlog, index){
                var bIndex = blogUpvotesId.indexOf(thisBlog._id);
                
                if(bIndex == -1){
                    thisBlog.upvotes = 0;
                }else{
                    thisBlog.upvotes = allBlogsUpvotesCount[bIndex].upvotes;
                }
            });
            
            
            $scope.refreshVoteCount = function(){
                upvoteService.allBlogsUpvotesCount().success(function (data, status, headers) {
                    var allBlogsUpvotesCount = data;
                    var blogUpvotesId = allBlogsUpvotesCount.map(function(a) {return a.blogpost;});
                    $scope.userBlogs.forEach(function(thisBlog, index){
                        var bIndex = blogUpvotesId.indexOf(thisBlog._id);

                        if(bIndex == -1){
                            thisBlog.upvotes = 0;
                        }else{
                            thisBlog.upvotes = allBlogsUpvotesCount[bIndex].upvotes;
                        }
                    });
                })
                .error(function (data, status, header, config) {
                    console.log();
                });    
            };
            
            $scope.setBlog = function(thisblog){
                $scope.blogpost = thisblog;
            };
            
            
            $scope.mediumBindOptions = {
                buttonLabels: 'fontawesome',
                toolbar: {
                    buttons: ['bold', 'italic', 'underline', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'indent', 'outdent', 'anchor', 'h1','h2', 'h3', 'image', 'removeFormat', 'table', 'orderedlist', 'unorderedlist']
                },
                extensions: {
                    table: new MediumEditorTable()
                },
                anchor: {
                    placeholderText: 'Type a link',
                    customClassOption: 'btn',
                    customClassOptionText: 'Create Button'
                },
                keyboardCommands: {
                    /* This example includes the default options for keyboardCommands,
                       if nothing is passed this is what it used */
                    commands: [
                        {
                            command: 'bold',
                            key: 'B',
                            meta: true,
                            shift: false,
                            alt: false
                        },
                        {
                            command: 'italic',
                            key: 'I',
                            meta: true,
                            shift: false,
                            alt: false
                        },
                        {
                            command: 'underline',
                            key: 'U',
                            meta: true,
                            shift: false,
                            alt: false
                        }
                    ],
                }
            };
            $scope.titleBindOptions = {
                toolbar: {
                    buttons: ['bold', 'italic', 'underline', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'anchor', 'h1','h2', 'h3','removeFormat']
                },
                disableReturn: true,
                disableExtraSpaces: true,
              
            };
            
            $scope.blogpost = {
                title: '',
                content: ''
            };
            
            $scope.newBlogPost = function(){
                var blogpost = {
                    title: $scope.user.basic.name + ' - new blogpost. Click and Edit! ' + moment().format("DD MMM YY HH:mm"),
                    content: 'You should write your blog here'
                };
                
                var blogpostForm = {
                    user: $scope.user._id,
                    savedBy: $scope.user._id,
                    autosave: false,
                    title: blogpost.title,
                    content: blogpost.content,
                    active: false,
                    urlslug: slugify(blogpost.title)
                };
                for (var property in blogpost) {
                    blogpostForm[property] = blogpost[property];
                }
                blogpostService.saveblogpost(blogpostForm).success(function (data, status, headers) {
                    var blogpostId = data._id;
                    blogpostService.getUserBlogposts($stateParams.userId).success(function (data, status, headers) {
                        $scope.userBlogs = data;
                        $scope.refreshVoteCount();
                        //var url = $state.href('editblog', {blogpostId: blogpostId});
                        //window.open(url,'_blank');
                        $state.go('editblog', {blogpostId: blogpostId});
                    })
                    .error(function (data, status, header, config) {
                        console.log("Error ");
                    });
                })
                .error(function (data, status, header, config) {
                    console.log("Error ");
                });
            };
            
            $scope.cloneConfirm = function(thisblog){
                
                var confirm = $mdDialog.confirm()
                .title('Would you like to create a clone of post titled "' + thisblog.title + '"?')
                .textContent('It was originally authored by ' + thisblog.user.basic.name +"!" )
                .ariaLabel('Lucky day')
                .targetEvent()
                .clickOutsideToClose(true)
                .ok('Confirm')
                .cancel('Cancel');
                $mdDialog.show(confirm).then(function() {
                    $scope.cloneBlogPost(thisblog);
                }, function() {
                  //nothing
                }); 
            };
            
            $scope.cloneBlogPost = function(toCloneBlog){
                var blogpost = {
                    title: toCloneBlog.title + ' - Clone ' + moment().format("DD MMM YY HH:mm"),
                    content: toCloneBlog.content,
                    savedBy: $scope.user._id,
                    autosave: false
                };
                
                var blogpostForm = {
                    user: $scope.user._id,
                    title: blogpost.title,
                    content: blogpost.content,
                    active: false,
                    urlslug: slugify(blogpost.title)
                };
                for (var property in blogpost) {
                    blogpostForm[property] = blogpost[property];
                }
                
                blogpostService.saveblogpost(blogpostForm).success(function (data, status, headers) {
                    var blogpostId = data._id;
                    blogpostService.getUserBlogposts($stateParams.userId).success(function (data, status, headers) {
                        $scope.userBlogs = data;
                        $scope.refreshVoteCount();
                        var url = $state.href('editblog', {blogpostId: blogpostId});
                        window.open(url,'_blank');
                    })
                    .error(function (data, status, header, config) {
                        console.log("Error ");
                    });
                })
                .error(function (data, status, header, config) {
                    console.log("Error ");
                });
            };
            
            $scope.removeConfirm = function(thisblog){
                
                var confirm = $mdDialog.confirm()
                .title('Would you like to delete post titled "' + thisblog.title + '"?')
                .textContent('It was authored by ' + thisblog.user.basic.name +"!" )
                .ariaLabel('Lucky day')
                .targetEvent()
                .clickOutsideToClose(true)
                .ok('Confirm')
                .cancel('Cancel');
                $mdDialog.show(confirm).then(function() {
                    $scope.removeBlogPost(thisblog);
                }, function() {
                  //nothing
                }); 
            };
            
            $scope.updateConfirm = function(thisblog){
                
                var confirm = $mdDialog.confirm()
                .title('Would you like to update changes to post titled "' + thisblog.title + '"?')
                .textContent('It was authored by ' + thisblog.user.basic.name +"!" )
                .ariaLabel('Lucky day')
                .targetEvent()
                .clickOutsideToClose(true)
                .ok('Confirm')
                .cancel('Cancel');
                $mdDialog.show(confirm).then(function() {
                    $scope.updateBlogPost(thisblog);
                }, function() {
                  //nothing
                }); 
            };
            
            $scope.updateBlogPost = function(thisblog){
                 thisblog.savedBy = $scope.user._id;
                 thisblog.autosave = false;
                blogpostService.saveblogpost(thisblog).success(function (data, status, headers) {
                    $scope.showSavedDialog();
                })
                .error(function (data, status, header, config) {
                    console.log("Error ");
                });    
            };
            $scope.flipEdbites = function(thisblog){
                if(thisblog.blogSeries == 'EdBites'){
                    $scope.unmarkEdbites(thisblog);
                }else{
                    $scope.markEdbites(thisblog);
                }
            };
            $scope.markEdbites = function(thisblog){
                 blogpostService.markEdbites(thisblog._id).success(function (data, status, headers) {
                    
                     $scope.showSavedDialog();
                     $state.reload();
                })
                .error(function (data, status, header, config) {
                    console.log("Error ");
                });    
            };
            $scope.unmarkEdbites = function(thisblog){
                 blogpostService.unmarkEdbites(thisblog._id).success(function (data, status, headers) {
                    
                     $scope.showSavedDialog();
                     $state.reload();
                })
                .error(function (data, status, header, config) {
                    console.log("Error ");
                });    
            };
            
            $scope.removeBlogPost = function(toRemoveBlog){
                 blogpostService.removeblogpost(toRemoveBlog._id).success(function (data, status, headers) {
                    blogpostService.getUserBlogposts($stateParams.userId).success(function (data, status, headers) {
                        $scope.userBlogs = data;
                        $scope.refreshVoteCount();
                        $scope.showSavedDialog();
                    })
                    .error(function (data, status, header, config) {
                        console.log("Error ");
                    });
                })
                .error(function (data, status, header, config) {
                    console.log("Error ");
                });
            };
            
            $scope.randomUpvotes = function(blogpost){
                var randomUpvoteForm = {
                    blogpost: blogpost._id,
                };
                upvoteService.randomUpvotes(randomUpvoteForm).success(function (data, status, headers) {
                    console.log(data);
                    
                })
                .error(function (data, status, header, config) {
                    console.log();
                });
            };
            $scope.sanitizeblogposts = function(){
                blogpostService.sanitizeblogposts().success(function (data, status, headers) {
                    if(data){
                        $scope.showSavedDialog();
                        $state.reload();
                    }else{
                        
                    }
                })
                .error(function (data, status, header, config) {
                    console.log("Error ");
                });
                
            };
            $scope.markAllEdbites = function(){
                blogpostService.markAllEdbites().success(function (data, status, headers) {
                    if(data){
                        $scope.showSavedDialog();
                        $state.reload();
                    }else{
                        
                    }
                    console.log(data);
                })
                .error(function (data, status, header, config) {
                    console.log("Error ");
                });
                
            };
            
            $scope.removePic = function(image){
                
                var confirm = $mdDialog.confirm()
                .title('Would you like to delete this image?')
                .textContent('You will not be able to restore it later')
                .ariaLabel('Lucky day')
                .targetEvent()
                .clickOutsideToClose(true)
                .ok('Confirm')
                .cancel('Cancel');
                $mdDialog.show(confirm).then(function() {
                    var newPicForm ={
                        image: image,
                        userId: $scope.user._id
                    }; UserService.removeBlogGalleryPic(newPicForm).success(function (data, status, headers) {
                        UserService.getBlogger($scope.user._id).success(function (data, status, headers) {
                            var userGallery = data.blogger.gallery;
                            //console.log(userGallery);
                            $scope.blogGallery = userGallery;
                        })
                        .error(function (data, status, header, config) {
                            console.log("Error ");
                        });
                    })
                    .error(function (data, status, header, config) {
                        console.log("Error ");
                    });
                }, function() {
                  //nothing
                }); 
            };
            $scope.uploadPic = function (newPic) {
                //var pic = $scope.newPic;
                var pic = [newPic];
                var nFiles = pic.length;

                var counter = 0;
                //console.log(JSON.stringify($scope.user));
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
                    console.log('Success ' + thisFile.name + 'uploaded. Response: ' + resp.data);
                    var picLink = $(resp.data).find('Location').text();
                    console.log(picLink);
                    

                    var newPicForm ={
                        image: picLink,
                        userId: userId
                    }; UserService.addBlogGalleryPic(newPicForm).success(function (data, status, headers) {
                        UserService.getBlogger($scope.user._id).success(function (data, status, headers) {
                            var userGallery = data.blogger.gallery;
                            //console.log(userGallery);
                            $scope.blogGallery = userGallery;
                        })
                        .error(function (data, status, header, config) {
                            console.log("Error ");
                        });
                        //$state.reload();
                    })
                    .error(function (data, status, header, config) {
                        console.log("Error ");
                    });
                    }, function (resp) {
                        console.log('Error status: ' + resp.status);
                    }, function (evt) {

                    });

                })
                .error(function (data, status, header, config) {
                    console.log("Error");
                });   

                });
                }
             };
            
             $scope.showCopiedDialog = function(text, ev) {
                $scope.copiedText = text;
                $mdDialog.show({
                  contentElement: '#copiedDialog',
                  parent: angular.element(document.body),
                  targetEvent: ev,
                  clickOutsideToClose: true
                });
                $timeout(function(){
                    $mdDialog.cancel();
                },500)
            };
            $scope.seeDescription = function(){
                
                /*var remove = "<div class=";
                var rIndex = $scope.blogpost.content.indexOf(remove);
                $scope.blogpost.content = $scope.blogpost.content.substring(0, rIndex);*/
                console.log(JSON.stringify($scope.blogpost.content));
                $scope.markdownText = toMarkdown($scope.blogpost.content);
                console.log(JSON.stringify($scope.markdownText));
                
                var converter = new Showdown.converter();
                $scope.htmlText = converter.makeHtml($scope.markdownText);
                
            };
            
            $scope.saveBlogPost = function(blogpost){
                var blogpostForm = {
                    user: $scope.user._id,
                    title: blogpost.title,
                    content: blogpost.content,
                };
                if(blogpost._id){
                    blogpostForm._id = blogpost._id;
                }
                blogpostService.saveblogpost(blogpostForm).success(function (data, status, headers) {
                    $scope.showSavedDialog();
                })
                .error(function (data, status, header, config) {
                    console.log("Error ");
                });
            };
            $scope.previewBlogPost = function(blogpost){
                var blogpostSlug = blogpost.urlslug;
                //console.log(blogpostSlug);

                var url = $state.href('showblog', {blogpostSlug: blogpostSlug});
                window.open(url,'_blank');
            };
            $scope.editBlogPost = function(blogpost){
                var blogpostId = blogpost._id;
                var url = $state.href('editblog', {blogpostId: blogpostId});
                window.open(url,'_blank');
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
            $scope.showRemovedDialog = function(ev) {
                $mdDialog.show({
                  contentElement: '#removeDialog',
                  parent: angular.element(document.body),
                  targetEvent: ev,
                  clickOutsideToClose: true
                });
                $timeout(function(){
                    $mdDialog.cancel();
                },1000)
            };
            
            $rootScope.pageTitle ='Write Blog Post at Exambazaar';
            
            $scope.fbLoginStatus = {};
            
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
                      redirect_uri: 'https://www.exambazaar.com/', 
                      hashtag: '#exambazaar',
                      quote: 'Exambazaar: Find best coaching classes in your city for more than 50 exams',
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
                      link: 'https://www.exambazaar.com',
                      //redirect_uri: 'https://www.exambazaar.com', 
                      source: 'https://www.exambazaar.com/images/logo/cover.png',
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

            //console.log($scope.user);
            
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
                        console.log("Error ");
                    });
                }
                
                
                
                
            }

            }, true);
            
            
            
            
    }]);       
    
    
    
    function intersect_safe(a, b)
        {
          var ai=0, bi=0;
          var result = [];

          while( ai < a.length && bi < b.length )
          {
             if      (a[ai] < b[bi] ){ ai++; }
             else if (a[ai] > b[bi] ){ bi++; }
             else /* they're equal */
             {
               result.push(a[ai]);
               ai++;
               bi++;
             }
          }

          return result;
        }
    exambazaar.controller("coachingGroupSummaryController", 
        [ '$scope', '$http', '$rootScope','$state', '$mdDialog', 'MasterService','groupSummary', 'examList', 'streamList', function($scope, $http, $rootScope, $state, $mdDialog, MasterService, groupSummary, examList, streamList){
            
            $rootScope.pageTitle = 'EB Coaching Group Summary';
            $scope.allGroups = groupSummary.data;
            $scope.groupSummary = $scope.allGroups;
            $scope.examList = examList.data;
            $scope.allExams = $scope.examList;
            $scope.allStreams = streamList.data;
            var examIds = $scope.examList.map(function(a) {return a._id;});
            $scope.groupSummary.forEach(function(thisGroup, gindex){
                var thisExams = thisGroup.exams;
                var allExams = [];
                thisExams.forEach(function(thisExam, eindex){
                    var exIndex = examIds.indexOf(thisExam);
                    if(exIndex != -1){
                        //thisExam = $scope.examList[exIndex];
                        allExams.push($scope.examList[exIndex]);
                    }else{
                        console.log('something is wrong: ' + thisExam);
                    }
                });
                thisGroup.exams = allExams;
            });
            $scope.searchExams = [];
            
            $scope.addExam = function(exam){
                var examId = exam._id;
                var eIndex = $scope.searchExams.indexOf(examId);
                if(eIndex == -1){
                    $scope.searchExams.push(examId.toString());
                }
            };
            $scope.removeExam = function(exam){
                var examId = exam._id;
                var eIndex = $scope.searchExams.indexOf(examId);
                if(eIndex != -1){
                    $scope.searchExams.splice(eIndex, 1);
                }
            };
            $scope.filterCoachings = function(){
                console.log($scope.searchExams);
                $scope.groupSummary = [];
                
                $scope.allGroups.forEach(function(thisGroup, gindex){
                    var thisFilter = false;
                    var thisExams = thisGroup.exams;
                    thisExams = thisExams.map(function(a) {return a._id.toString();});
                    
                    $scope.searchExams.forEach(function(thisExam, eindex){
                        if(!thisFilter){
                            var exIndex = thisExams.indexOf(thisExam);
                            if(exIndex != -1){
                                thisFilter = true;
                            }
                        }
                        
                    });
                    if(thisFilter > 0){
                        $scope.groupSummary.push(thisGroup);
                        
                        console.log(thisGroup.name);
                    }
                });
                $mdDialog.hide();
            };
            $scope.showExamDialog = function(ev) {
            $mdDialog.show({
                  contentElement: '#examDialog',
                  parent: angular.element(document.body),
                  targetEvent: ev,
                  clickOutsideToClose: true
                }).finally(function() {
                    //$scope.userReviewMode = true;
                });
            };
    }]); 
    exambazaar.controller("extractEmailsController", 
        [ '$scope', '$http', '$rootScope','$state', '$mdDialog', 'MasterService', function($scope, $http, $rootScope, $state, $mdDialog, MasterService){
            
            $rootScope.pageTitle = 'Extract Emails';
            
            
            $scope.emails= [];
            $scope.extractEmails = function()
            {
                $scope.emails = $scope.text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
                console.log($scope.emails);
            };
            //$scope.text = 'sdabhikagathara@rediffmail.com, "assdsdf" <dsfassdfhsdfarkal@gmail.com>, "rodnsdfald ferdfnson" <rfernsdfson@gmal.com>, "Affdmdol Gondfgale" <gyfanamosl@gmail.com>, "truform techno" <pidfpinfg@truformdftechnoproducts.com>, "NiTsdfeSh ThIdfsKaRe" <nthfsskare@ysahoo.in>, "akasdfsh kasdfstla" <akashkatsdfsa@yahsdfsfoo.in>, "Bisdsdfamal Prakaasdsh" <bimsdaalprakash@live.com>,; "milisdfsfnd ansdfasdfnsftwar" <dfdmilifsd.ensfdfcogndfdfatia@gmail.com>';
            $scope.text = '';
            $scope.limit = 1000;
            $scope.skip = 0;
            $scope.extractEmailfromIds = function(){
                var params = {
                    limit: parseInt($scope.limit),   
                    skip: parseInt($scope.skip),   
                };
                
                MasterService.extractEmails(params).success(function (data, status, headers) {
                    console.log(data);
                    $scope.skip = parseInt($scope.skip) + parseInt($scope.limit);
                })
                .error(function (data, status, header, config) {
                    console.log('Error ' + data + ' ' + status);
                });
            };
            
            
    }]); 
        
    exambazaar.controller("allreviewsController", 
        [ '$scope', '$http', '$rootScope','reviewService','allReviews', 'targetStudyProviderService','$state', '$mdDialog', function($scope, $http, $rootScope, reviewService, allReviews, targetStudyProviderService, $state, $mdDialog){
            $scope.allReviews = allReviews.data;
            
            $rootScope.pageTitle = 'All Reviews';
            
            $scope.openReview = function(review){
                var cityCoachingForm = {
                    city: review.institute.city,
                    coachingName: review.institute.name,
                };
                targetStudyProviderService.showGroupHelper(cityCoachingForm).success(function (data, status, headers) {
                    var examStream = data;
                    console.log(examStream);

                    $state.go('showGroup', {categoryName: examStream.stream, subCategoryName: examStream.exam, cityName: $rootScope.newReviewCity, groupName: $rootScope.newReviewCoaching.name,'#': 'Reviews'});
                })
                .error(function (data, status, header, config) {
                    console.log('Error ' + data + ' ' + status);
                });    
            };
            
            $scope.disablereview = function(review){
                
                var confirm = $mdDialog.confirm()
                .title('Would you like to disabled review of ' + review.institute.name + ' by ' + review.user.basic.name + '?')
                .textContent('You can enable it later!')
                .ariaLabel('Lucky day')
                .targetEvent()
                .clickOutsideToClose(true)
                .ok('Confirm')
                .cancel('Cancel');
                $mdDialog.show(confirm).then(function() {
                    reviewService.disablereview(review._id).success(function (data, status, headers) {
                        $state.reload();
                    })
                    .error(function (data, status, header, config) {
                        console.log('Error ' + data + ' ' + status);
                    });
                    
                }, function() {
                  //nothing
                }); 
            };
            
            $scope.enablereview = function(review){
                
                var confirm = $mdDialog.confirm()
                .title('Would you like to enable review of ' + review.institute.name + ' by ' + review.user.basic.name + '?')
                .textContent('You can enable it later!')
                .ariaLabel('Lucky day')
                .targetEvent()
                .clickOutsideToClose(true)
                .ok('Confirm')
                .cancel('Cancel');
                $mdDialog.show(confirm).then(function() {
                    reviewService.enablereview(review._id).success(function (data, status, headers) {
                        $state.reload();
                    })
                    .error(function (data, status, header, config) {
                        console.log('Error ' + data + ' ' + status);
                    });
                    
                }, function() {
                  //nothing
                }); 
            };
            
    }]); 
    
    exambazaar.controller("allOffersController", 
        [ '$scope', '$http', '$state', '$rootScope','offerService','allOffers', 'targetStudyProviderService', function($scope, $http, $state, $rootScope, offerService, allOffers, targetStudyProviderService){
            $scope.allOffers = allOffers.data;
            
            $rootScope.pageTitle = 'All Offers';
            
            $scope.activateOffer = function(offer){
                 offerService.activate(offer._id).success(function (data, status, headers) {
                    alert('Done');
                    $state.reload();
                })
                .error(function (data, status, header, config) {
                    console.log('Error ' + data + ' ' + status);
                });
                
            };
            $scope.deactivateOffer = function(offer){
                 offerService.deactivate(offer._id).success(function (data, status, headers) {
                    alert('Done');
                    $state.reload();
                })
                .error(function (data, status, header, config) {
                    console.log('Error ' + data + ' ' + status);
                });
                
            };
            
    }]);     
        
    exambazaar.controller("rankerswallController", 
        [ '$scope', '$http','$state', '$stateParams','$rootScope','targetStudyProviderService','allResults', 'thisExam','$location', 'Socialshare','$cookies', 'viewService', function($scope, $http, $state, $stateParams, $rootScope, targetStudyProviderService, allResults, thisExam,$location, Socialshare, $cookies, viewService){
            
            if($cookies.getObject('sessionuser')){
                $scope.user = $cookies.getObject('sessionuser');
            }else{
                
            }
            
            if(!$scope.user || !$scope.user.userId){
                $scope.showLoginForm();
            }
            
            $scope.currURL = $location.absUrl();
            
            $scope.allResults = allResults.data;
            $scope.exam = thisExam.data;
            var examStream = {
                exam: $scope.exam.name,
                stream: $scope.exam.stream.name,
            };
            $scope.year = $stateParams.year;
            //console.log($scope.exam);
            $scope.yearResults = [];
            $scope.coachingMode = false;
            $scope.flipAll = function(){
                $scope.coachingMode = !$scope.coachingMode;
            };
            $scope.flipRank = function(resultPair){
                resultPair.coachingMode = !resultPair.coachingMode;
            };
            
            $scope.shareFacebook = function(){
                Socialshare.share({
                  'provider': 'facebook',
                  'attrs': {
                    'socialshareType': 'send',
                    'socialshareUrl': $scope.currURL,
                    'socialshareVia':"1236747093103286",  'socialshareRedirectUri': 'https://www.exambazaar.com',
                  }
                });
            };
            
            $scope.logMouseEvent = function(resultPair) {
                switch (event.type) {
                  case "mouseenter":
                        
                        //console.log("Hey Mouse Entered");
                        break;
                  case "mouseover":{
                        //$scope.flipRank(resultPair);
                        resultPair.coachingMode = true;
                        //console.log("Hey Mouse Over");
                        break;
                  }
                  case "mouseout":{
                        resultPair.coachingMode = false;
                        //console.log("Hey Mouse Out");
                        break;
                  }

                  case "mouseleave":
                    //console.log("Mouse Gone");
                    break;

                  default:
                    //console.log(event.type);
                    break;
                };
            };
            
            for (var i=1;i<=100;i++) {
                $scope.yearResults.push({});
            };
            
            $scope.goToCoaching = function(resultPair){
                
                var url = $state.href('showGroup', {categoryName: examStream.stream, subCategoryName: examStream.exam, cityName: resultPair.coaching.city, groupName: resultPair.coaching.name});
                window.open(url,'_blank');
                
            };
            $scope.allResults.forEach(function(thisResultPair, rindex){
                thisResultPair.result.rank = parseInt(thisResultPair.result.rank);
                var thisRank = thisResultPair.result.rank -1;
                thisResultPair.coachingMode = false;
                
                if(thisResultPair.result.year == $scope.year && thisRank<100){
                    
                    $scope.yearResults[thisRank] = thisResultPair;
                   
                }
                
            });
            
            var viewForm = {
                state: $state.current.name,
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
                //console.log('View Marked');
            })
            .error(function (data, status, header, config) {
                console.log();
            });
            
            
            $scope.shareText = "Hey! This list of Top 100 AIRs (" + $scope.exam.displayname + " " + $scope.year + ") on Exambazaar is sensational. Do check it out! ";
            $scope.shareText2 = "Check out the inspirational list of Top 100 (" + $scope.exam.displayname + " " + $scope.year + ")! ";
            $scope.hashtags = "exambazaar, " + $scope.exam.displayname;
            $rootScope.pageTitle =$scope.exam.displayname + " " + $scope.year + ' Rankers Wall';
            
            
    }]); 
        
    exambazaar.controller("searchController", 
        [ '$scope', '$http','$state','$rootScope','NgMap','targetStudyProviderService','targetStudyProvidersList', '$facebook', '$location', function($scope, $http, $state, $rootScope,NgMap, targetStudyProviderService, targetStudyProvidersList, $facebook, $location){
            
            
            $rootScope.pageTitle ='Search & Review Coaching Classes';
            
            
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
        $rootScope.pageTitle =$scope.user.basic.name;
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
        $rootScope.pageTitle =$scope.user.basic.name;
    }]);  
      
    exambazaar.controller("assignedToRateController", 
        [ '$scope', 'thisuser' , 'thisuserAssignedToRate',  '$http','$state','$rootScope', function($scope, thisuser, thisuserAssignedToRate, $http, $state, $rootScope){
        $scope.user = thisuser.data;
        $scope.assigned = thisuserAssignedToRate.data;
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
        $rootScope.pageTitle =$scope.user.basic.name;
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
        $rootScope.pageTitle =$scope.user.basic.name;
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
        $rootScope.pageTitle =$scope.user.basic.name;
    }]);    
    exambazaar.controller("shortlistedController", 
        [ '$scope', 'thisuser' , 'thisuserShortlisted',  '$http','$state','$rootScope', function($scope, thisuser, thisuserShortlisted, $http, $state, $rootScope){
        $scope.user = thisuser.data;
        $scope.shortlisted = thisuserShortlisted.data;
        
        $rootScope.pageTitle =$scope.user.basic.name;
    }]);    
    exambazaar.controller("viewedController", 
        [ '$scope', 'thisuser' , 'thisuserViewed',  '$http','$state','$rootScope', function($scope, thisuser, thisuserViewed, $http, $state, $rootScope){
        $scope.user = thisuser.data;
        $scope.viewed = thisuserViewed.data;
        console.log($scope.viewed);    
            
        $rootScope.pageTitle =$scope.user.basic.name;
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
                console.log('Error ' + data + ' ' + status);
            });
        };
            
        if($scope.user.basic)
            $rootScope.pageTitle =$scope.user.basic.name;
    }]);       
        
    exambazaar.controller("profileController", 
        [ '$scope', 'thisuser' , '$http','$state', '$rootScope', '$cookies', 'Upload', 'ImageService', 'UserService', '$facebook', '$mdDialog', '$timeout', function($scope, thisuser,$http,$state,$rootScope, $cookies, Upload, ImageService, UserService, $facebook, $mdDialog, $timeout){
        $scope.user = thisuser.data;
            
        if($cookies.getObject('sessionuser')){
            var sessionuser = $cookies.getObject( 'sessionuser');
        }else{
            $scope.showLoginForm();
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
                console.log('Success ' + thisFile.name + 'uploaded. Response: ' + resp.data);
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
                    console.log("Error ");
                });
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                }, function (evt) {
                    
                });

            })
            .error(function (data, status, header, config) {
                console.log("Error");
            });   
                 
            });
            }
         };
        
            

            
        if($scope.user.basic)
            $rootScope.pageTitle =$scope.user.basic.name;
            
        $scope.saveBlogger = function(){
            UserService.updateUser($scope.user).success(function (data, status, headers) {
                $scope.showSavedDialog();
            })
            .error(function (data, status, header, config) {
                console.log('Error ' + data + ' ' + status);
            });    
        };
        

        $scope.fblogin = function() {
            $facebook.getLoginStatus().then(function(response) {
                $scope.fbLoginStatus = response;
            });
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

                    if($scope.user && $scope.user._id){
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

            //console.log($scope.user);
            
        $scope.$watch('[fbLoginStatus.status, user.fbuser.facebook.id]', function (newValue, oldValue, scope) {
            //console.log(newValue);
        if(newValue[0] == 'connected' && newValue[1]){
            $scope.fbUser = true;
            $scope.user.fbuser.facebook.accessToken = $scope.fbLoginStatus.authResponse.accessToken;
            if(!$scope.user.facebookId || $scope.user.facebookId == ''){
                //console.log($scope.user);
                UserService.fbSave($scope.user).success(function (data, status, headers) {

                    var fulluser = data;
                    //console.log(fulluser);
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

                    //console.log(sessionuser.userType);
                    //alert('Done');
                    $scope.showSavedDialog();

                    //$state.reload();
                })
                .error(function (data, status, header, config) {
                    console.log("Error ");
                });
            }




        }

        }, true);

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
            
        //console.log('Profile Controller finished');    
    }]);    
        
    exambazaar.controller("addSubscriberController", 
        [ '$scope',  'subscribersList','subscriberService','$http','$state', function($scope, subscribersList, subscriberService,$http,$state){
        
            $scope.subscribersList = subscribersList.data;
            $scope.newSubscribers = [
                {
                    name: '',
                    email: '',
                    mobile: '',
                }
            ];
            
            
            $scope.addSubscribers = function(){
                var toAddSubscribers = [];
                console.log("New Subscribers are: " + $scope.newSubscribers.length);
                
                $scope.newSubscribers.forEach(function(thisSubscriber, index){
                    if(thisSubscriber && thisSubscriber.name && (thisSubscriber.email ||  thisSubscriber.mobile)){
                        toAddSubscribers.push(thisSubscriber);
                    }
                });
                console.log("Adding subscribers: " + toAddSubscribers.length);
                subscriberService.saveSubscribers(toAddSubscribers).success(function (data, status, headers) {
               
                    alert("Subscribers saved!");
                })
                .error(function (data, status, header, config) {
                    console.log('Error ' + data + ' ' + status);
                });
                
            };
            
            $scope.subscribersList.sort(function(a,b) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);} );  
            
            
            $scope.selectedUser = [];
            
            $scope.setUser = function(subscriber){
                if(!$scope.selectedUser || $scope.selectedUser.length == 0){
                    $scope.selectedUser = [];
                }
                
                var selectedUserIds = [];
                if($scope.selectedUser && $scope.selectedUser.length > 0){
                    selectedUserIds = $scope.selectedUser.map(function(a) {return a._id;});
                }
                
                var sIndex = selectedUserIds.indexOf(subscriber._id);
                if(sIndex == -1){
                    //console.log($scope.selectedUser);
                    var subscriberUserIds = $scope.subscribersList.map(function(a) {return a._id;});
                    var selectedIndex = subscriberUserIds.indexOf(subscriber._id);
                    //console.log(selectedIndex);
                    var totalInvite = 200;
                    var totalSubscribers = $scope.subscribersList.length;
                    totalInvite = Math.min(selectedIndex + totalInvite, totalSubscribers);
                    //console.log(totalInvite);
                    var i = 0;

                    for(i=selectedIndex; i<totalInvite; i++){
                       $scope.selectedUser.push($scope.subscribersList[i]); 
                    }
                    //console.log($scope.selectedUser);
                    
                }else{
                    $scope.selectedUser.splice(sIndex,1);
                    console.log(subscriber._id + " already exists!");
                }
            };
            $scope.selectedBackground = function(subscriber){
                var selectedUserIds = $scope.selectedUser.map(function(a) {return a._id;});
                var sIndex = selectedUserIds.indexOf(subscriber._id);
                if(sIndex == -1){
                    return false;
                }else{
                    return true;
                }
            };
            
            $scope.sendReviewInvite = function(){
                
                if($scope.selectedUser){
                    var reviewInviteForm = {
                        userList: $scope.selectedUser,
                    };
                    subscriberService.sendReviewInvites(reviewInviteForm).success(function (data, status, headers) {
                        console.log('Delivered');
                        $scope.userSocial = true;
                    }).error(function (data, status, header, config) {
                        console.log("Error ");
                    });    
                }
                
                
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
                console.log('Error ' + data + ' ' + status);
            });
        };
            
        
        $scope.setAwsCredential = function(awsCredential){
            $scope.awsCredential = awsCredential;
        };
    }]);
    
    exambazaar.controller("whyReviewController", 
        [ '$scope','$http','$state','$rootScope', 'viewService', '$cookies', function($scope, $http, $state, $rootScope, viewService, $cookies){
            if($cookies.getObject('sessionuser')){
                $scope.user = $cookies.getObject('sessionuser');
            }else{
                
            }
            
            $rootScope.pageTitle = 'Why review at Exambazaar?';
            //alert('Starting');
            $rootScope.$emit("ShowReviewDialog", {});
            
            
            
            var viewForm = {
                state: $state.current.name,
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
                //console.log('View Marked');
            })
            .error(function (data, status, header, config) {
                console.log();
            });
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
                console.log('Error ' + data + ' ' + status);
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
                    console.log('Error: ' + data);
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
                console.log('Error ' + data + ' ' + status);
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
                    console.log('Error: ' + data);
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
                console.log('Error ' + data + ' ' + status);
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
                    console.log('Error: ' + data);
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
        //console.log($scope.examNames);    
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
            console.log($scope.elgInput);
            
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
            var checkExamIds = ['58ad20045401f52440af6f24'];
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
                        //console.log(index + " " + valid + " " + thisItem + " " + thisEligibility._id);
                    }
                });
                if(!categoryBool){
                    valid = false;
                        /*if(checkExamIds.indexOf(thisEligibility.exam._id) != -1){
                            console.log(index + " " + valid + " " + thisItem + " " + thisEligibility._id);
                        }*/
                }
                
            }
            if(checkAge){
                if($scope.elgInput.age < thisEligibility.age.minage || $scope.elgInput.age > thisEligibility.age.maxage){
                    valid = false;
                    if(checkExamIds.indexOf(thisEligibility.exam._id) != -1){
                        console.log(index + " " + valid + " " + thisEligibility._id);
                    }
                    //console.log(index + " " + valid + " " + thisEligibility._id);
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
                            console.log(index + " " + valid + " " + thisItem.name + " " + thisEligibility._id);
                        }
                        //console.log(index + " " + valid + " " + thisItem.name + " " + thisEligibility._id);
                    }
                });
            }    
            if(checkClass12Percentage){
                if(thisEligibility.class12Percentage.minPercentage && $scope.elgInput.class12Percentage < thisEligibility.class12Percentage.minPercentage){
                    valid = false;
                    //console.log(index + " " + valid + " " + thisEligibility._id);
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
                        //console.log(index + " " + valid + " " + thisItem.name + " "+ thisEligibility._id);
                    }
                });
                if(!undergradBool){
                    valid = false;
                    //console.log(index + " " + valid + " " + thisEligibility._id);
               }
            }
            if(checkUndergradPercentage){
                if(thisEligibility.undergradPercentage.minPercentage && $scope.elgInput.undergradPercentage < thisEligibility.undergradPercentage.minPercentage){
                    valid = false;
                    //console.log(index + " " + valid + " " + thisEligibility._id);
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
                    //console.log(index + " " + valid + " " + thisEligibility._id);
               }
            }    
            if(checkPostgradPercentage){
                if(thisEligibility.postgradPercentage.minPercentage && $scope.elgInput.postgradPercentage < thisEligibility.postgradPercentage.minPercentage){
                    valid = false;
                    //console.log(index + " " + valid + " " + thisEligibility._id);
                }
                if($scope.elgInput.postgradPercentage == null || $scope.elgInput.postgradPercentage == 0){
                    valid = false;
                }
            } 
                
            if(valid){
                //console.log(thisEligibility.level + " " + $scope.elgInput.educationLevel.level);
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
            
        $scope.newEligibility.sort(function(a,b) {return (a.examName > b.examName) ? 1 : ((b.examName > a.examName) ? -1 : 0);} );    
            
        $scope.exams.forEach(function(thisExam, eIndex){
            $scope.examNames += thisExam.displayname+',';
        });
        //console.log($scope.examNames);    
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
                        console.log("Please check exam name: " + thisEligibility.examName +". You need to match it exactly.");
                    }
                    
                }
                
            });
            
            var saveEligibility = EligibilityService.bulksaveEligibility(eligibilitys).success(function (data, status, headers) {
                alert("Eligibilities saved!");
            })
            .error(function (data, status, header, config) {
                console.log('Error ' + data + ' ' + status);
            });
        };
        $scope.setExam = function(exam){
            $scope.exam = exam;
        };
    }]);
        
        
         
    exambazaar.controller("addQuestionController", 
        [ '$scope', 'Notification', '$rootScope', 'thisTest', 'Upload', 'ImageService', 'questionService', '$state', '$mdDialog', '$timeout', 'thisTestQuestions', '$cookies', function($scope, Notification, $rootScope, thisTest, Upload, ImageService, questionService, $state, $mdDialog, $timeout, thisTestQuestions, $cookies){
            $scope.test = thisTest.data;
            $scope.thisTestQuestions = thisTestQuestions.data;
            
            $scope.sortQuestions = function(){
                $scope.thisTestQuestions.forEach(function(thisQuestion, index){
                    thisQuestion._startnumber = parseInt(thisQuestion._startnumber);
                    thisQuestion._endnumber = parseInt(thisQuestion._endnumber);
                });    
            };
            $scope.sortQuestions();
            
            $scope.missingQuestions = [];
            $scope.findMissingQuestions = function(){
                var startingNo = 10000;
                var endingNo = 0;
                var qnos = [];
                $scope.thisTestQuestions.forEach(function(thisQuestion, index){
                    if(thisQuestion._startnumber > endingNo){
                        endingNo = thisQuestion._startnumber;
                    }
                    if(thisQuestion._endnumber > endingNo){
                        endingNo = thisQuestion._endnumber;
                    }
                    if(thisQuestion._startnumber < startingNo){
                        startingNo = thisQuestion._startnumber;
                    }
                });
                for (var i = startingNo; i <= endingNo; i++) { 
                    qnos.push(i);
                }
                
                $scope.thisTestQuestions.forEach(function(thisQuestion, index){
                    var start = thisQuestion._startnumber;
                    var end = thisQuestion._endnumber;
                    if(end && end != ''){
                        for (var i = start; i <= end; i++) { 
                            var qIndex = qnos.indexOf(i);
                            qnos.splice(qIndex, 1);
                        }
                    }else{
                        var qIndex = qnos.indexOf(start);
                        qnos.splice(qIndex, 1);
                    }
                });
                
                $scope.missingQuestions = qnos;
                
            };
            $scope.findMissingQuestions();
            
            $scope.markCreator = function(){
                if($scope.user.userType = 'Master'){
                     questionService.markCreator($scope.test._id).success(function (data, status, headers) {
                        console.log(data);
                    })
                    .error(function (data, status, header, config) {
                        console.log('Error ' + data + ' ' + status);
                    });
                }
            };
            $scope.removeQuestionDialog = function(){
                var questionSet = $scope.toAddQuestion;
                var confirm = $mdDialog.confirm()
                .title('Would you like to delete this question?')
                .textContent('You will not be able to recover them after this!')
                .ariaLabel('Lucky day')
                .targetEvent()
                .clickOutsideToClose(true)
                .ok('Confirm')
                .cancel('Cancel');
                $mdDialog.show(confirm).then(function() {
                    $scope.deleteQuestion(questionSet);
                }, function() {
                  //nothing
                });   
            };
            $scope.deleteQuestion = function(questionSet){
                if(questionSet._id){
                    questionService.removeQuestion(questionSet._id).success(function (data, status, headers) {
                        $scope.showSavedDialog();
                        $state.reload();
                    })
                    .error(function (data, status, header, config) {
                        console.log('Error ' + data + ' ' + status);
                    });
                }
                
            };
            $scope.splitQuestions = function(){
                var questionSet = $scope.toAddQuestion;
                var nQuestions = questionSet.questions.length;
                var allSplitQuestions = [];
                if(nQuestions > 1){
                    questionSet.questions.forEach(function(thisQuestion, index){
                        var newQuestion = {
                            _groupOfQuestions: false,
                            //_multipleCorrect: false,
                            _startnumber: questionSet._startnumber + index,
                            _endnumber: '',
                            _hascontext: false,
                            context: '',
                            images: null,
                            questions:[],
                            test: $scope.test._id,
                            exam: $scope.test.exam,

                        };
                        newQuestion.questions = [];
                        newQuestion.questions.push({
                            question: questionSet.context + '\r\n\r\n' + thisQuestion.question,
                            options: thisQuestion.options,
                            solution: thisQuestion.solution,
                            answer: thisQuestion.answer,
                            images: thisQuestion.images,
                        });
                        newQuestion._createdBy = $scope.user._id;
                        allSplitQuestions.push(newQuestion);
                    });
                    var addingQuestions = allSplitQuestions.length;
                    var counter = 0;
                    console.log(allSplitQuestions);
                    allSplitQuestions.forEach(function(thisQuestion, index){
                         questionService.saveQuestion(thisQuestion).success(function (data, status, headers) {
                            counter += 1;
                            if(counter == addingQuestions){
                                $scope.showSavedDialog();
                                $state.reload();
                            }
                            
                        })
                        .error(function (data, status, header, config) {
                            console.log('Error ' + data + ' ' + status);
                        });
                        
                    });
                    
                    
                }
            };
            
            $scope.toAddQuestion = null;
            $scope.questionTypes = ["MCQ"];
            
            if($cookies.getObject('sessionuser')){
                $scope.user = $cookies.getObject('sessionuser');
            }else{
                $scope.user = null;
            }
            
            $scope.addNewQuestionSet = function(){
                $scope.toAddQuestion = {
                    _groupOfQuestions: false,
                    //_multipleCorrect: false,
                    _startnumber: '',
                    _endnumber: '',
                    _hascontext: false,
                    context: '',
                    images: null,
                    questions:[],
                    test: $scope.test._id,
                    exam: $scope.test.exam,
                    
                };
                if($scope.user){
                    $scope.toAddQuestion._createdBy = $scope.user._id;
                    //console.log($scope.toAddQuestion);
                }
                $scope.addNewQuestion();
                
                $scope.sortQuestions();
            };
            
            $scope.reload = function(){
                $state.reload();
            };
            $scope.readyToSave = function(){
                var ready = true;
                if($scope.toAddQuestion._startnumber == ''){
                    ready = false;
                }
                if($scope.toAddQuestion.questions.length > 1 && $scope.toAddQuestion._endnumber == ''){
                   ready = false;
                }
                if($scope.toAddQuestion.questions.length == 1){
                   /*$scope.toAddQuestion._endnumber = '';
                   $scope.toAddQuestion.context = '';
                   $scope.toAddQuestion._groupOfQuestions = false;
                   $scope.toAddQuestion._hascontext = false;*/
                }
                if($scope.toAddQuestion.questions.length > 1){
                    $scope.toAddQuestion._groupOfQuestions = true;
                    $scope.toAddQuestion._hascontext = true;
                }
                $scope.toAddQuestion.questions.forEach(function(thisQuestion, index){
                    if(thisQuestion.question.length < 10){
                        ready = false;
                    }
                    thisQuestion.options.forEach(function(thisOption, oindex){
                        if(thisOption.option == ''){
                            ready = false;
                        }
                    });
                });
                ready = !ready;
                return ready;
            };
            $scope.addNewQuestion = function(){
                if($scope.toAddQuestion){
                    var newQuestion = {
                        question: '',
                        options: [],
                        solution: {
                            solution: '',
                            images: [],
                        },
                        answer: '',
                        images: [],
                    };
                    $scope.addNewOption(newQuestion);
                    $scope.addNewOption(newQuestion);
                    $scope.addNewOption(newQuestion);
                    $scope.addNewOption(newQuestion);
                    $scope.toAddQuestion.questions.push(newQuestion);
                    
                    
                }
                
                $scope.sortQuestions();
            };
            $scope.removeQuestionFromSet = function(question, index){
                console.log('I am here ' + index);
                if(index && index < $scope.toAddQuestion.questions.length){
                    $scope.toAddQuestion.questions.splice(index, 1);
                    console.log('Done');
                }    
            };
            $scope.addNewOption = function(question){
                if(!question.options){
                    question.options = [];
                }
                var newOption = {
                    option: '',
                    _correct: false,
                };
                question.options.push(newOption);
            };
            $scope.removeOption = function(question, option, index){
                if(question.options && question.options.length > index){
                    question.options.splice(index, 1);
                }
            };
            $scope.addNewQuestionSet();
            
            $scope.saveNewQuestion = function(){
                questionService.saveQuestion($scope.toAddQuestion).success(function (data, status, headers) {
                    console.log(data);
                    $scope.toAddQuestion = data;
                    $scope.showSavedDialog();
                    $state.reload();
                })
                .error(function (data, status, header, config) {
                    console.log('Error ' + data + ' ' + status);
                });
            };
            $scope.setQuestion = function(question){
                $scope.toAddQuestion = question;
                
                $scope.toAddQuestion.questions.forEach(function(thisQuestion, index){
                    if(!thisQuestion.solution){
                        thisQuestion.solution = {
                            solution: '',
                            images: [],
                        };
                    }
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
            
            $scope.$watch('toAddQuestion.text', function (newValue, oldValue, scope) {
                if(newValue != null && newValue != '' && !$scope.addNewQuestion._id){
                    newValue = newValue.replace(/(\r\n|\n|\r)/gm," ");
                    $scope.toAddQuestion.text = newValue;
                }

            }, true);
        
            $scope.removeImage = function(image){
                if($scope.toAddQuestion.images && $scope.toAddQuestion.images.length > 0){
                    var iIndex = $scope.toAddQuestion.images.indexOf(image);
                    if(iIndex != -1){
                        $scope.toAddQuestion.images.splice(iIndex, 1);
                    }
                }
            };
            $scope.uploadImage = function (images) {
                
                var nFiles = images.length;
                
                var counter = 0;
                $scope.imageProgess = 0;
                if (images && images.length) {
                    images.forEach(function(thisFile, index){

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
                                console.log('Success ' + thisFile.name + 'uploaded. Response: ' + resp.data);
                                thisFile.link = $(resp.data).find('Location').text();
                                if(!$scope.toAddQuestion.images){
                                    $scope.toAddQuestion.images = [];
                                }
                                $scope.toAddQuestion.images.push(thisFile.link);
                                console.log($scope.toAddQuestion);

                            }, function (resp){
                                console.log('Error status: ' + resp.status);
                            }, function (evt) {
                                $scope.imageProgess = 0;
                                thisFile.uploadProgress = parseInt(100.0 * evt.loaded / evt.total);
                                images.forEach(function(thisPhoto, index){
                                    //console.log(index + ' ' + thisPhoto.uploadProgress + ' ' + nFiles);
                                    if(!thisPhoto.uploadProgress){
                                        thisPhoto.uploadProgress = 0;
                                    }
                                    $scope.imageProgess += thisPhoto.uploadProgress;
                                    //console.log($scope.imageProgess);
                                });
                                $scope.imageProgess = $scope.imageProgess / nFiles;
                                //console.log('progress: ' + thisFile.uploadProgress + '% ' + thisFile.name);
                            });

                        })
                        .error(function (data, status, header, config) {
                            console.log("Error");
                        });   

                    });
                }
             };
            
            $scope.removeSolutionImage = function(question, image){
                if(question.solution.images && question.solution.images.length > 0){
                    var iIndex = question.solution.images.indexOf(image);
                    if(iIndex != -1){
                        question.solution.images.splice(iIndex, 1);
                    }
                }
            };
            
            $scope.uploadSolutionImages = function (question, images) {
                
                var nFiles = images.length;
                
                var counter = 0;
                $scope.imageProgess = 0;
                if (images && images.length) {
                    images.forEach(function(thisFile, index){

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
                                console.log('Success ' + thisFile.name + 'uploaded. Response: ' + resp.data);
                                thisFile.link = $(resp.data).find('Location').text();
                                
                                if(!question.solution.images){
                                    question.solution.images = [];
                                }
                                question.solution.images.push(thisFile.link);

                            }, function (resp){
                                console.log('Error status: ' + resp.status);
                            }, function (evt) {
                                $scope.imageProgess = 0;
                                thisFile.uploadProgress = parseInt(100.0 * evt.loaded / evt.total);
                                images.forEach(function(thisPhoto, index){
                                    //console.log(index + ' ' + thisPhoto.uploadProgress + ' ' + nFiles);
                                    if(!thisPhoto.uploadProgress){
                                        thisPhoto.uploadProgress = 0;
                                    }
                                    $scope.imageProgess += thisPhoto.uploadProgress;
                                    //console.log($scope.imageProgess);
                                });
                                $scope.imageProgess = $scope.imageProgess / nFiles;
                                //console.log('progress: ' + thisFile.uploadProgress + '% ' + thisFile.name);
                            });

                        })
                        .error(function (data, status, header, config) {
                            console.log("Error");
                        });   

                    });
                }
             };
            
    }]);
    Date.prototype.addDays = function(days) {
        var date = new Date(this.valueOf())
        date.setDate(date.getDate() + days);
        return date;
    }
    function getDateRange(startDate, endDate, addFn, interval) {
        
        addFn = addFn || Date.prototype.addDays;
        interval = interval || 1;
        var retVal = [];
        var current = new Date(startDate);
        var endDate = new Date(endDate);
        while (current <= endDate) {
            //console.log(current);
            retVal.push(new Date(current));
            current = addFn.call(current, interval);
        }
        return retVal;
    }
    
    exambazaar.controller("examController", 
        [ '$scope', '$rootScope',  'thisexam', 'ExamService', '$http', '$state', '$mdDialog', 'Upload', '$timeout', 'testService', 'Notification', '$cookies', 'testList', function($scope, $rootScope, thisexam, ExamService, $http, $state, $mdDialog, Upload, $timeout, testService, Notification, $cookies, testList){
            $scope.exam = thisexam.data;
            $scope.exam.tests = testList.data;
            
            var examCycles = $scope.exam.cycle;
            $scope.activeExamCylce = null;
            
            examCycles.forEach(function(thisCycle, index){
                if(thisCycle.active){
                    $scope.activeExamCylce = thisCycle;
                }
            });
            
            var badgeIconClasses = ['glyphicon-modal-window', 'glyphicon-credit-card'];
            var badgeClasses = ['info', 'warning'];
            
            $scope.events = [];
            
            if($scope.activeExamCylce){
                var steps = $scope.activeExamCylce.examSteps;
                 
                
                steps.forEach(function(thisStep, index){
                    var random = Math.floor(Math.random() * badgeIconClasses.length);
                    
                    var dateRange = thisStep.stepDate.dateRange;
                    var timeRange = thisStep.stepDate.timeRange;
                    var allDay = false;
                    var dateString = '';
                    var timeString = '';
                    var fullString = '';
                    if(timeRange && timeRange.startTime && timeRange.endTime){
                        if(timeRange.startTime == "00:00" && timeRange.endTime == "23:00"){
                            allDay = true;
                        }
                    }
                    if(!timeRange || !timeRange.startTime && !dateRange.endTime){
                        allDay = true;
                    }
                    if(dateRange && dateRange.startDate && dateRange.endDate){
                        var startDate = moment(dateRange.startDate);
                        var endDate = moment(dateRange.endDate);
                        
                        dateString = "" + moment(startDate).format('DD MMM YY');
                        console.log(compareDates(startDate, endDate));
                        if(compareDates(startDate, endDate) == -1){
                            dateString += " to " + moment(dateRange.endDate).format('DD MMM YY');
                        }
                        
                    }
                    
                    if(allDay){
                        timeString = " - All Day ";
                    }
                    
                    fullString = dateString + timeString;
                    var newEvent = {
                        badgeClass: badgeClasses[random],
                        badgeIconClass: badgeIconClasses[random],
                        title: thisStep.stepType,
                        content: fullString,
                    };
                    console.log(thisStep);
                    $scope.events.push(newEvent);
                });
                
                
                
            }
            /*$scope.events = [{
                badgeClass: 'info',
                badgeIconClass: 'glyphicon-modal-window',
                title: 'Registration',
                content: 'Some awesome content.'
              }, {
                badgeClass: 'warning',
                badgeIconClass: 'glyphicon-credit-card',
                title: 'Second heading',
                content: 'More awesome content.'
            }];*/
            
            
            $rootScope.pageTitle = $scope.exam.displayname;
    }]);
            
    exambazaar.controller("editExamController", 
        [ '$scope',  'thisexam', 'streamList', 'ExamService', '$http', '$state', '$mdDialog', 'ImageService', 'Upload', '$timeout', 'testService', 'Notification', '$rootScope', '$cookies', 'testList', function($scope, thisexam, streamList, ExamService, $http, $state, $mdDialog, ImageService, Upload, $timeout, testService, Notification, $rootScope, $cookies, testList){
        $scope.exam = thisexam.data;
        $scope.exam.tests = testList.data;
            
        if(!$scope.exam.registration){
            $scope.exam.registration = {
                website: '',
                mode: '',
                fee:{
                    general_obc: '',
                    sc_st_ph: '',
                    females: '',
                    paymentModes: [],
                },
                otherInformation:'',
            };
        }    
        $scope.streams = streamList.data;
        if($cookies.getObject('sessionuser')){
            $scope.user = $cookies.getObject('sessionuser');
        }else{
            $scope.user = null;
        }
        $scope.masterUser = false;
        if($scope.user && $scope.user.userType == 'Master'){
            $scope.masterUser = true;
        }
            
        $rootScope.pageTitle = $scope.exam.displayname;        
        $scope.reload = function(){
            $state.reload();
        };
        
        $scope.resultFormats = [
            "Rank",
            "Percentile",
            "Percentage",
            "Marks",
            "Pass/Fail",
        ];
        $scope.examFrequencies = [
            "Yearly",
            "Half-Yearly",
            "Quarter-Yearly",
            "Monthly",
            "Anytime",
        ];
        $scope.registrationModes = [
            "Online",
            "Offline",
            "Both Online & Offline",
        ];
        $scope.examModes = [
            "Online",
            "Offline",
            "Both Online & Offline",
        ];
        $scope.feePaymentModes = [
            "Netbanking",
            "Credit Card",
            "Debit Card",
            "Wallets",
            "Demand Draft",
            "Challan",
            "Cash",
        ];
        $scope.cycleYears = ["2016","2017","2018","2019","2020"];
        $scope.timeSlots = ["06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "00:00", "01:00", "02:00", "03:00", "04:00", "05:00"];
        $scope.cycleNumbers = ["1","2","3","4","5","6","7","8","9","10","11","12"];
        
        $scope.newOfficialLink = null;   
        $scope.addNewOfficialLink = function(){
            $scope.newOfficialLink = {
                url: '',
                description: '',
            };
        };
        $scope.removeOfficialLink = function(link, index){
            if(index < $scope.exam.links.length ){
                $scope.exam.links.splice(index, 1);
            }
        };
        $scope.removeNewOfficialLink = function(){
            $scope.newOfficialLink = null;
        };
        $scope.saveNewOfficialLink = function(){
            
            if($scope.newOfficialLink.url){
                if(!$scope.exam.links){
                    $scope.exam.links = [];
                }
                $scope.exam.links.push($scope.newOfficialLink);
                console.log('Done');
                $scope.newOfficialLink = null;
            }
        };
        $scope.saveExam = function () {
            //console.log($scope.exam);
            var saveExam = ExamService.saveExam($scope.exam).success(function (data, status, headers) {
                $scope.showSavedDialog();
            })
            .error(function (data, status, header, config) {
                console.log('Error ' + data + ' ' + status);
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
        $scope.feePaymentModeToggle = function(feePaymentMode){
            var pIndex = $scope.exam.registration.fee.paymentModes.indexOf(feePaymentMode);
            console.log(pIndex);
            if(pIndex == -1){
                $scope.exam.registration.fee.paymentModes.push(feePaymentMode);
                console.log($scope.exam.registration.fee.paymentModes);
            }else{
                $scope.exam.registration.fee.paymentModes.splice(pIndex, 1);
            }
        };
        $scope.feePaymentBadge = function(feePaymentMode){
            var thisClass = "notExistingBage";
            var pIndex = $scope.exam.registration.fee.paymentModes.indexOf(feePaymentMode);
            if(pIndex != -1){
                thisClass = "existingBadge";
            }
            return thisClass;
            
        };
            
        //start of functions for tests
        $scope.toAddTest = null;
        $scope.removeTestConfirm = function(test){
            if(test._id){
                var confirm = $mdDialog.confirm()
                .title('Would you like to delete test titled '+ test.name +'  ?')
                .textContent('You will not be able to recover them after this!')
                .ariaLabel('Lucky day')
                .targetEvent()
                .clickOutsideToClose(true)
                .ok('Confirm')
                .cancel('Cancel');
                $mdDialog.show(confirm).then(function() {
                    $scope.removeTest(test);
                }, function() {
                  //nothing
                });   
            }else{
                $scope.cancelNewTest();
            }
        };
        $scope.removeTest = function(test){ 
            testService.removeTest(test._id).success(function (data, status, headers) {
                $scope.toAddTest = null;
                $scope.getExamTests();
            })
            .error(function (data, status, header, config) {
                console.log('Error ' + data + ' ' + status);
            });
            
        }; 
        $scope.addNewTest = function(){
            $scope.toAddTest = {
                name: '',
                description: '',
                year: '2016',
                url: {
                    question: null,
                    answer: null,
                },
                screenshots: [],
                exam: $scope.exam._id,
                official: true,
                mockPaper: false,
                solved: false,
                questionWithAnswer: false,
            };
        };
        
        
        $scope.setTest = function(test){
            $scope.toAddTest = test;
        };
        $scope.removeQuestionPaper = function(){
            $scope.toAddTest.url.question = null;
        };
        $scope.removeAnswerKey = function(){
            $scope.toAddTest.url.answer = null;
        };
        $scope.removeScreenshots = function(){
            $scope.toAddTest.screenshots = [];
        };
        $scope.getExamTests = function(){
            testService.getExamTests($scope.exam._id).success(function (data, status, headers) {
            //console.log(data);
                $scope.exam.tests = data;

                if(data && data.length > 0){
                    Notification.success("Great, we have found " + data.length + " tests of " + $scope.exam.displayname);
                    $scope.showSavedDialog();
                $scope.cancelNewTest();
                }else{
                    Notification.warning("Ok, we found no tests of " + $scope.exam.displayname + '. Lets add some!');
                }
            })
            .error(function (data, status, header, config) {
                console.log('Error ' + data + ' ' + status);
            });
        }
        $scope.saveNewTest = function(){
            testService.saveTest($scope.toAddTest).success(function (data, status, headers) {
                console.log(data);
                $scope.toAddTest = data;
                $scope.getExamTests();
                
                
            })
            .error(function (data, status, header, config) {
                console.log('Error ' + data + ' ' + status);
            });
        };
        $scope.cancelNewTest = function(){
            $scope.toAddTest = null;
        };    
            
        //end of functions for tests
            
            
        
        //start of upload functions
        //upload helper functions for test papers
        $scope.uploadAnswerKey = function (newanswerkey) {
            var answerkey = [newanswerkey];
            var nFiles = answerkey.length;
            
            var counter = 0;
            if (answerkey && answerkey.length) {
            
            answerkey.forEach(function(thisFile, index){
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
                console.log('Success ' + thisFile.name + 'uploaded. Response: ' + resp.data);
                var answerkeyLink = $(resp.data).find('Location').text();
                $scope.toAddTest.url.answer = answerkeyLink;
                
                
                
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                }, function (evt) {
                    
                });

            })
            .error(function (data, status, header, config) {
                console.log("Error");
            });   
                 
            });
            }
        };    
        $scope.uploadQuestionPaper = function (newquestionpaper) {
            var questionpaper = [newquestionpaper];
            var nFiles = questionpaper.length;
            
            var counter = 0;
            if (questionpaper && questionpaper.length) {
            
            questionpaper.forEach(function(thisFile, index){
            var fileInfo = {
                filename: thisFile.name,
                contentType: thisFile.type
            };
            console.log(thisFile);
            console.log(thisFile.size);
            var fileName = fileInfo.filename;
            var splits = fileName.split('.');
            fileName = splits[0];
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
                var questionpaperLink = $(resp.data).find('Location').text();
                $scope.toAddTest.url.question = questionpaperLink;
                $scope.toAddTest.name = fileName;
                }, function (resp) {
                    $scope.respError = resp;
                    console.log($scope.respError);
                    console.log('Error status: ' + resp.status);
                }, function (evt) {
                    $scope.uploadProgress = parseInt(100.0 * evt.loaded / evt.total);
                    console.log($scope.uploadProgress);
                });

            })
            .error(function (data, status, header, config) {
                console.log("Error");
            });   
                 
            });
            }
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
                console.log('Success ' + thisFile.name + 'uploaded. Response: ' + resp.data);
                var logoLink = $(resp.data).find('Location').text();
                
                var newLogoForm ={
                    logo: logoLink,
                    examId: $scope.exam._id
                };
                
                if(newLogoForm.examId){
                    ExamService.addLogo(newLogoForm).success(function (data, status, headers) {
                        counter = counter + 1;
                        $scope.showSavedDialog();
                        $state.reload();
                    })
                    .error(function (data, status, header, config) {
                        console.log("Error ");
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
                console.log("Error");
            });   
                 
            });
            }
        };
            
        $scope.uploadScreenshots = function (photos) {
            var nFiles = photos.length;
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
                            console.log('Success ' + thisFile.name + 'uploaded. Response: ' + resp.data);
                            thisFile.link = $(resp.data).find('Location').text();
                        
                            $scope.toAddTest.screenshots.push(thisFile.link);

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
                        console.log("Error");
                    });   

                });
            }
         };
            
        //upload helper functions for exam cycles  
        $scope.uploadSyllabus = function (syllabuses) {
            var nFiles = syllabuses.length;
            var counter = 0;
            if (syllabuses && syllabuses.length) {
                syllabuses.forEach(function(thisFile, index){

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
                            console.log('Success ' + thisFile.name + 'uploaded. Response: ' + resp.data);
                            thisFile.link = $(resp.data).find('Location').text();
                        
                           var newSyllabus = {
                                name: '',
                                description: '',
                                url: thisFile.link,
                            };
                            $scope.newExamCycle.syllabus.push(newSyllabus);

                        }, function (resp) {
                            console.log('Error status: ' + resp.status);
                        }, function (evt) {
                            
                        });

                    })
                    .error(function (data, status, header, config) {
                        console.log("Error");
                    });   

                });
            }
         };
        $scope.uploadDocs = function (docs) {
            var nFiles = docs.length;
            var counter = 0;
            if (docs && docs.length) {
                docs.forEach(function(thisFile, index){

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
                            console.log('Success ' + thisFile.name + 'uploaded. Response: ' + resp.data);
                            thisFile.link = $(resp.data).find('Location').text();
                        
                           var newDoc = {
                                name: '',
                                description: '',
                                url: thisFile.link,
                            };
                            if(!$scope.newExamCycle.docs){
                                $scope.newExamCycle.docs = [];
                            }
                            $scope.newExamCycle.docs.push(newDoc);

                        }, function (resp) {
                            console.log('Error status: ' + resp.status);
                        }, function (evt) {
                            
                        });

                    })
                    .error(function (data, status, header, config) {
                        console.log("Error");
                    });   

                });
            }
         };
        $scope.uploadBrochure = function (brochures) {
            var nFiles = brochures.length;
            var counter = 0;
            $scope.photoProgess = 0;
            if (brochures && brochures.length) {
                brochures.forEach(function(thisFile, index){

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
                            console.log('Success ' + thisFile.name + 'uploaded. Response: ' + resp.data);
                            thisFile.link = $(resp.data).find('Location').text();
                        
                           var newBrochure = {
                                name: '',
                                description: '',
                                url: thisFile.link,
                            };
                            $scope.newExamCycle.brochure.push(newBrochure);

                        }, function (resp) {
                            console.log('Error status: ' + resp.status);
                        }, function (evt) {
                            $scope.photoProgess = 0;
                            thisFile.uploadProgress = parseInt(100.0 * evt.loaded / evt.total);
                            brochures.forEach(function(thisBrochure, index){
                                console.log(index + ' ' + thisBrochure.uploadProgress + ' ' + nFiles);
                                if(!thisBrochure.uploadProgress){
                                    thisBrochure.uploadProgress = 0;
                                }
                                $scope.photoProgess += thisBrochure.uploadProgress;
                                //console.log($scope.photoProgess);
                            });
                            $scope.photoProgess = $scope.photoProgess / nFiles;
                            //console.log('progress: ' + thisFile.uploadProgress + '% ' + thisFile.name);
                        });

                    })
                    .error(function (data, status, header, config) {
                        console.log("Error");
                    });   

                });
            }
         };    
        //end of upload functions
        
            
        $scope.newExamCycle = null;   
        $scope.addNewExamCycle = function(){
            
            $scope.newExamCycle = {
                year: '2018',
                cycleNumber: '1',
                name: '',
                description: '',
                brochure: [],
                syllabus: [],
                docs: [],
                active: false,
                examMode: false,
                studentsAppearing: '',
                studentSeats: '',
                steps: {
                    registration: false,
                    admitCard: false,
                    examDate: false,
                    writtenResultDate: false,
                    counselling: false,
                    interview: false,
                    finalResultDate: false,
                    text: ''
                },
                examdates:{
                    registration:{
                        start: {
                            _date: new Date(),
                            tentative: false,
                            applicable: false,
                        },
                        end: {
                            _date: new Date(),
                            tentative: false,
                            applicable: false,
                        },
                        endwithlatefees: {
                            _date: new Date(),
                            tentative: false,
                            applicable: false,
                        },
                        text: '',
                    },
                    admitCard:{
                        start: {
                            _date: new Date(),
                            tentative: false,
                            applicable: false,
                        },
                        end: {
                            _date: new Date(),
                            tentative: false,
                            applicable: false,
                        },
                        text: '',
                    },
                    examDate:{
                        start: {
                            _date: new Date(),
                            tentative: false,
                            applicable: false,
                        },
                        end: {
                            _date: new Date(),
                            tentative: false,
                            applicable: false,
                        },
                        text: '',
                    },
                    writtenResultDate:{
                        start: {
                            _date: new Date(),
                            tentative: false,
                            applicable: false,
                        },
                        end: {
                            _date: new Date(),
                            tentative: false,
                            applicable: false,
                        },
                        text: '',
                    },
                    counselling:{
                        start: {
                            _date: new Date(),
                            tentative: false,
                            applicable: false,
                        },
                        end: {
                            _date: new Date(),
                            tentative: false,
                            applicable: false,
                        },
                        text: '',
                    },
                    interview:{
                        start: {
                            _date: new Date(),
                            tentative: false,
                            applicable: false,
                        },
                        end: {
                            _date: new Date(),
                            tentative: false,
                            applicable: false,
                        },
                        text: '',
                    },
                    finalResultDate:{
                        start: {
                            _date: new Date(),
                            tentative: false,
                            applicable: false,
                        },
                        end: {
                            _date: new Date(),
                            tentative: false,
                            applicable: false,
                        },
                        text: '',
                    },
                },
            };
        };
            
        $scope.cancelNewExamCycle = function(){
            $scope.newExamCycle = null;
        };
        $scope.setExamCycle = function(cycle){
            $scope.newExamCycle = cycle;
            //console.log(cycle);
        };
            
        $scope.stepTypes = ["Registration", "Admit Card", "Written", "Counselling", "Interview"];
        $scope.writtenStepNames = ["Prelims", "Mains", "Other"];    
        $scope.newExamStep = null;
        var today = moment();
        $scope.toAddDate = new Date();
        $scope.toAddDate.setUTCHours(0,0,0,0);
        var today = new Date();
        today.setUTCHours(0,0,0,0);
        $scope.toAddTimeRange = null;
        $scope.addNewExamStep = function(newExamCycle){
            $scope.newExamStep = {
                name: 'Prelims',
                description: '',
                stepType: 'Written', //Written, Counselling, Interview
                otherName: '',
                stepDate:{
                    dateRangeBool: true,
                    timeRangeBool: true,
                    dateRange:{
                        startDate: today,
                        endDate: today,
                    },
                    dateArray:[],
                    timeRange:[],
                    dates:[],
                    allDates:[],
                },
            };
            
            if(!newExamCycle.examSteps){
                newExamCycle.examSteps = [];
            }
            newExamCycle.examSteps.push($scope.newExamStep);
            $scope.toAddTimeRange = $scope.newExamStep.stepDate.timeRange[0];
            console.log($scope.toAddTimeRange);
        };
            //"Registration", "Admit Card", "Written", "Counselling", "Interview"
        $scope.addRegistration = function(newExamCycle){
            $scope.newExamStep = {
                name: '',
                description: '',
                stepType: 'Registration', //Written, Counselling, Interview
                otherName: '',
                stepDate:{
                    dateRangeBool: true,
                    timeRangeBool: true,
                    dateRange:{
                        startDate: today,
                        endDate: today,
                    },
                    dateArray:[],
                    timeRange:[],
                    dates:[],
                    allDates:[],
                },
            };
            if(!newExamCycle.examSteps){
                newExamCycle.examSteps = [];
            }
            newExamCycle.examSteps.push($scope.newExamStep);
        };
        $scope.addAdmitCard = function(newExamCycle){
            $scope.newExamStep = {
                name: '',
                description: '',
                stepType: 'Admit Card', //Written, Counselling, Interview
                otherName: '',
                stepDate:{
                    dateRangeBool: true,
                    timeRangeBool: true,
                    dateRange:{
                        startDate: today,
                        endDate: today,
                    },
                    dateArray:[],
                    timeRange:[],
                    dates:[],
                    allDates:[],
                },
            };
            if(!newExamCycle.examSteps){
                newExamCycle.examSteps = [];
            }
            newExamCycle.examSteps.push($scope.newExamStep);
        };
        $scope.addWritten = function(newExamCycle){
            $scope.newExamStep = {
                name: '',
                description: '',
                stepType: 'Written', //Written, Counselling, Interview
                otherName: '',
                stepDate:{
                    dateRangeBool: true,
                    timeRangeBool: true,
                    dateRange:{
                        startDate: today,
                        endDate: today,
                    },
                    dateArray:[],
                    timeRange:[],
                    dates:[],
                    allDates:[],
                },
            };
            if(!newExamCycle.examSteps){
                newExamCycle.examSteps = [];
            }
            newExamCycle.examSteps.push($scope.newExamStep);
        };
        $scope.addCounselling = function(newExamCycle){
            $scope.newExamStep = {
                name: '',
                description: '',
                stepType: 'Counselling', //Written, Counselling, Interview
                otherName: '',
                stepDate:{
                    dateRangeBool: true,
                    timeRangeBool: true,
                    dateRange:{
                        startDate: today,
                        endDate: today,
                    },
                    dateArray:[],
                    timeRange:[],
                    dates:[],
                    allDates:[],
                },
            };
            if(!newExamCycle.examSteps){
                newExamCycle.examSteps = [];
            }
            newExamCycle.examSteps.push($scope.newExamStep);
        };
        $scope.addInterview = function(newExamCycle){
            $scope.newExamStep = {
                name: '',
                description: '',
                stepType: 'Interview', //Written, Counselling, Interview
                otherName: '',
                stepDate:{
                    dateRangeBool: true,
                    timeRangeBool: true,
                    dateRange:{
                        startDate: today,
                        endDate: today,
                    },
                    dateArray:[],
                    timeRange:[],
                    dates:[],
                    allDates:[],
                },
            };
            if(!newExamCycle.examSteps){
                newExamCycle.examSteps = [];
            }
            newExamCycle.examSteps.push($scope.newExamStep);
        };
            
        $scope.moveStepBefore = function(newExamCycle, $index){
            var nLength = newExamCycle.examSteps.length;
            if($index > 0){
                var stepBefore = newExamCycle.examSteps[$index - 1];
                var thisStep = newExamCycle.examSteps[$index];
                newExamCycle.examSteps[$index - 1] = thisStep;
                newExamCycle.examSteps[$index] = stepBefore;
            }
        };
        $scope.moveStepAfter = function(newExamCycle, $index){
            var nLength = newExamCycle.examSteps.length;
            if($index < nLength-1){
                var stepAfter = newExamCycle.examSteps[$index + 1];
                var thisStep = newExamCycle.examSteps[$index];
                newExamCycle.examSteps[$index + 1] = thisStep;
                newExamCycle.examSteps[$index] = stepAfter;
            }
        };
        
        $scope.addNewExamDate = function(newExamCycle, toAddDate){
            if(!$scope.newExamStep.stepDate.dateArray){
                $scope.newExamStep.stepDate.dateArray = [];
            }
            toAddDate.setUTCHours(0,0,0,0);
            console.log(toAddDate);
            $scope.newExamStep.stepDate.dateArray.push(toAddDate);
            $scope.buildSlots();
        };
        $scope.addNewTimeRange = function(newExamCycle, toAddTimeRange){
            if(!$scope.newExamStep.stepDate.timeRange){
                $scope.newExamStep.stepDate.timeRange = [];
            }
            var exists = false;
            var overlaps = false;
            $scope.newExamStep.stepDate.timeRange.forEach(function(thisRange, rindex){
                if(thisRange.startTime == toAddTimeRange.startTime && thisRange.endTime == toAddTimeRange.endTime){
                   exists = true;
                }
                
                var trst = $scope.timeSlots.indexOf(thisRange.startTime);
                var tret = $scope.timeSlots.indexOf(thisRange.endTime);
                var tast = $scope.timeSlots.indexOf(toAddTimeRange.startTime);
                var taet = $scope.timeSlots.indexOf(toAddTimeRange.endTime);
                
                if(trst < tast && tret > tast){
                    overlaps = true;
                }
                if(trst < taet && tret > taet){
                    overlaps = true;
                }
            });
            if(!exists && !overlaps){
                var newTimeRange = {
                    startTime: toAddTimeRange.startTime,
                    endTime: toAddTimeRange.endTime,
                }
                $scope.newExamStep.stepDate.timeRange.push(newTimeRange);
                Notification.success("Time slot added successfully!");
                
            }else{
                if(exists){
                    Notification.warning("Did not add this time slot, as it already exists!");
                }
                if(overlaps){
                    Notification.warning("Did not add this time slot, as it overlaps with an existing timeslot!");
                }
            }
            
            $scope.buildSlots();
            
        };
        
        $scope.removeExamDate = function(index){
            if(index < $scope.newExamStep.stepDate.allDates.length){
                $scope.newExamStep.stepDate.allDates.splice(index, 1); 
            }
        };
        
        $scope.removeTimeRange = function(index){
            if(index < $scope.newExamStep.stepDate.timeRange.length){
                $scope.newExamStep.stepDate.timeRange.splice(index, 1); 
            }
        };
        $scope.removeDates = function(index){
            if(index < $scope.newExamStep.stepDate.dates.length){
                $scope.newExamStep.stepDate.dates.splice(index, 1); 
            }
        };
            
        $scope.buildSlots = function(){
            var allDates = $scope.newExamStep.stepDate.allDates;
            var timeRange = $scope.newExamStep.stepDate.timeRange;
            
            if(allDates.length > 0 && timeRange.length > 0){
                $scope.newExamStep.stepDate.dates = [];
                allDates.forEach(function(thisDate, dindex){
                    timeRange.forEach(function(thisRange, tindex){
                        var startTime = thisRange.startTime;
                        var endTime = thisRange.endTime;
                        var startDateTime = new Date(thisDate);
                        var endDateTime = new Date(thisDate);
                        
                        if(startTime){
                            var res = startTime.split(":");
                            var hours = res[0];
                            var minutes = res[1];
                            startDateTime.setHours(hours);
                            startDateTime.setMinutes(minutes);
                        }
                        if(endTime){
                            var res = endTime.split(":");
                            var hours = res[0];
                            var minutes = res[1];
                            endDateTime.setHours(hours);
                            endDateTime.setMinutes(minutes);
                        }
                        var newDate = {
                            start: startDateTime,
                            end: endDateTime,
                            name: '',
                        };
                        $scope.newExamStep.stepDate.dates.push(newDate);
                    });
                });
            }
            //console.log($scope.newExamStep.stepDate.dates);
        };
        $scope.$watch('newExamStep.stepDate.dateRange', function (newValue, oldValue, scope) {
            if(newValue != null){
                if($scope.newExamStep.stepDate.dateRangeBool){
                    var dateRange = getDateRange($scope.newExamStep.stepDate.dateRange.startDate, $scope.newExamStep.stepDate.dateRange.endDate);
                    $scope.newExamStep.stepDate.allDates = dateRange;
                }
            }

        }, true);
            
        $scope.$watch('newExamStep.stepDate.timeRangeBool', function (newValue, oldValue, scope) {
            if(newValue != null){
                if(newValue == true){
                    $scope.newExamStep.stepDate.timeRange = [{
                        startTime: '00:00',
                        endTime: '23:00',
                    }];
                }else{
                   if($scope.newExamStep.stepDate.timeRange){
                       //console.log($scope.newExamStep.stepDate.timeRange);
                       $scope.newExamStep.stepDate.timeRange.forEach(function(thisRange, rindex){
                           if(thisRange.startTime == "00:00" && thisRange.endTime == "23:00"){
                               $scope.newExamStep.stepDate.timeRange.splice(rindex, 1);
                           }
                       });
                   }
                }

            }

        }, true);
            
        $scope.$watch('newExamStep.stepDate.dateRangeBool', function (newValue, oldValue, scope) {
            if(newValue != null){
                if(newValue == true){
                    if(!$scope.newExamStep.stepDate.dateRange.startDate){
                        $scope.newExamStep.stepDate.dateRange.startDate = new Date();
                        $scope.newExamStep.stepDate.dateRange.startDate.setUTCHours(0,0,0,0);
                    }
                    if(!$scope.newExamStep.stepDate.dateRange.endDate){
                        $scope.newExamStep.stepDate.dateRange.endDate = new Date();
                        $scope.newExamStep.stepDate.dateRange.endDate.setUTCHours(0,0,0,0);
                    }
                    var dateRange = getDateRange($scope.newExamStep.stepDate.dateRange.startDate, $scope.newExamStep.stepDate.dateRange.endDate);
                    
                    $scope.newExamStep.stepDate.allDates = dateRange;
                    
                    $scope.newExamStep.stepDate.dateArray = [];
                    
                }else{
                    $scope.newExamStep.stepDate.dates = [];
                    $scope.newExamStep.stepDate.allDates = [];
                    $scope.newExamStep.stepDate.dateRange.startDate = null;
                    $scope.newExamStep.stepDate.dateRange.endDate = null;
                    if(!$scope.newExamStep.stepDate.dateArray){
                        $scope.newExamStep.stepDate.dateArray = [];
                    }
                    $scope.newExamStep.stepDate.allDates = $scope.newExamStep.stepDate.dateArray;
                    $scope.buildSlots();
                    //$scope.newExamStep.stepDate.dateArray = [];
                }

            }

        }, true);
        $scope.setExamStep = function(examStep){
            $scope.newExamStep = examStep;
            //console.log(examStep);
        };
        $scope.removeExamStep = function(newExamCycle, index){
            if(index < newExamCycle.examSteps.length){
                newExamCycle.examSteps.splice(index, 1);
            }
            
            //console.log(examStep);
        };
            
        $scope.saveNewExamCycle = function(){
            
            if(!$scope.exam.cycle){
               $scope.exam.cycle = [];
            }
            var examCylceIds = $scope.exam.cycle.map(function(a) {return a._id;});
            var examCycleNames = $scope.exam.cycle.map(function(a) {return a.name;});
            if($scope.newExamCycle._id){
                console.log($scope.newExamCycle);
                
                var cIndex = examCylceIds.indexOf($scope.newExamCycle._id);
                if(cIndex != -1){
                    $scope.exam.cycle[cIndex] = $scope.newExamCycle;
                }else{
                    $scope.exam.cycle.push($scope.newExamCycle);
                }
            }else{
                var thisCycleName = $scope.newExamCycle.name;
                var cIndex = examCycleNames.indexOf(thisCycleName);
                if(cIndex != -1){
                    $scope.exam.cycle[cIndex] = $scope.newExamCycle;
                }else{
                    $scope.exam.cycle.push($scope.newExamCycle);
                }
            }
            //$scope.showSavedDialog();
            $scope.cancelNewExamCycle();
        };
            
            
        $scope.removeExamCycleConfirm = function(examcycle){
            if(examcycle._id){
                var confirm = $mdDialog.confirm()
                .title('Would you like to delete exam cycle titled '+ examcycle.name +'  ?')
                .textContent('You will not be able to recover them after this!')
                .ariaLabel('Lucky day')
                .targetEvent()
                .clickOutsideToClose(true)
                .ok('Confirm')
                .cancel('Cancel');
                $mdDialog.show(confirm).then(function() {
                    $scope.removeExamCycle(examcycle);
                }, function() {
                  //nothing
                });   
            }else{
                $scope.cancelNewExamCycle();
            }
        };
        $scope.removeExamCycle = function(examcycle){ 
            if(!$scope.exam.cycle){
               $scope.exam.cycle = [];
            }
            var examCylceIds = $scope.exam.cycle.map(function(a) {return a._id;});
            var examCycleNames = $scope.exam.cycle.map(function(a) {return a.name;});
            if($scope.newExamCycle._id){
                var cIndex = examCylceIds.indexOf($scope.newExamCycle._id);
                if(cIndex != -1){
                    $scope.exam.cycle.splice(cIndex);
                }else{
                    //$scope.exam.cycle.push($scope.newExamCycle);
                }
            }else{
                var thisCycleName = $scope.newExamCycle.name;
                var cIndex = examCycleNames.indexOf(thisCycleName);
                if(cIndex != -1){
                    $scope.exam.cycle.splice(cIndex);
                }else{
                    //$scope.exam.cycle.push($scope.newExamCycle);
                }
            }
            //$scope.showSavedDialog();
            $scope.cancelNewExamCycle();
            
            
        }; 
            
    }]);
        
        
        
    exambazaar.controller("addExamController", 
        [ '$scope',  'examList', 'streamList', 'ExamService', '$http', '$state', '$mdDialog', 'ImageService', 'Upload', '$timeout', 'testService', 'Notification', '$rootScope', '$cookies', function($scope, examList, streamList, ExamService, $http, $state, $mdDialog, ImageService, Upload, $timeout, testService, Notification, $rootScope, $cookies){
        $scope.masteruser = null;
        if($cookies.getObject('sessionuser')){
            $scope.user = $cookies.getObject('sessionuser');
            if($scope.user.userType == 'Master'){
                $scope.masteruser = true;
            }

        }else{
            $scope.user = null;
        }
            
        $rootScope.pageTitle = 'All Exams listed on EB';        
        $scope.exams = examList.data;
        $scope.streams = streamList.data;
        $scope.showAllExams = true;    
        $scope.resultFormats = [
            "Rank",
            "Percentile",
            "Percentage",
            "Marks",
            "Pass/Fail",
        ];
        $scope.examFrequencies = [
            "Yearly",
            "Half-Yearly",
            "Quarter-Yearly",
            "Monthly",
            "Anytime",
        ];
        $scope.cycleYears = ["2016","2017","2018","2019","2020"];
        
        $scope.cycleNumbers = ["1","2","3","4","5","6","7","8","9","10","11","12"];
            
        $scope.$watch('exam.frequency', function (newValue, oldValue, scope) {
            if(newValue != null && newValue != ''){
                if(newValue == 'Yearly'){
                    $scope.cycleNumbers = ["1"];
                }
                if(newValue == 'Half-Yearly'){
                    $scope.cycleNumbers = ["1","2"];
                }
                if(newValue == 'Quarter-Yearly'){
                    $scope.cycleNumbers = ["1","2","3","4"];
                }
                if(newValue == 'Monthly'){
                    $scope.cycleNumbers = ["1","2","3","4","5","6","7","8","9","10","11","12"];
                }
                if(newValue == 'Anytime'){
                    $scope.cycleNumbers = ["N/A"];
                    
                }
                
            }

            }, true);    
        $scope.addNewExam = function(){
            $scope.showAllExams = false;
            $scope.exam = {
                
            };
        }; 
        $scope.addExam = function () {
            var saveExam = ExamService.saveExam($scope.exam).success(function (data, status, headers) {
                $scope.showSavedDialog();
            })
            .error(function (data, status, header, config) {
                console.log('Error ' + data + ' ' + status);
            });
        };
            
        $scope.setExam = function(exam){
            $scope.showAllExams = false;
            $scope.exam = exam;
            if(!$scope.exam.logo){
                $scope.exam.logo = '';
            }
            testService.getExamTests($scope.exam._id).success(function (data, status, headers) {
                //console.log(data);
                $scope.exam.tests = data;
                
                if(data && data.length > 0){
                    Notification.success("Great, we have found " + data.length + " tests of " + $scope.exam.displayname);
                }else{
                    Notification.warning("Ok, we found no tests of " + $scope.exam.displayname + '. Lets add some!');
                }
            })
            .error(function (data, status, header, config) {
                console.log('Error ' + data + ' ' + status);
            });
        };
        $scope.unsetExam = function(){
            $scope.showAllExams = true;
            $scope.exam = null;
            $scope.toAddTest = null;
            $scope.newExamCycle = null;
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
        $scope.toAddTest = null;
        $scope.removeTestConfirm = function(test){
            if(test._id){
                var confirm = $mdDialog.confirm()
                .title('Would you like to delete test titled '+ test.name +'  ?')
                .textContent('You will not be able to recover them after this!')
                .ariaLabel('Lucky day')
                .targetEvent()
                .clickOutsideToClose(true)
                .ok('Confirm')
                .cancel('Cancel');
                $mdDialog.show(confirm).then(function() {
                    $scope.removeTest(test);
                }, function() {
                  //nothing
                });   
            }else{
                $scope.cancelNewTest();
            }
        };
        $scope.removeTest = function(test){ 
            testService.removeTest(test._id).success(function (data, status, headers) {
                $scope.toAddTest = null;
                $scope.showSavedDialog();
                $scope.setExam($scope.exam);
            })
            .error(function (data, status, header, config) {
                console.log('Error ' + data + ' ' + status);
            });
            
        };
        $scope.addNewTest = function(){
            $scope.toAddTest = {
                name: '',
                description: '',
                year: '2016',
                url: {
                    question: null,
                    answer: null,
                },
                screenshots: [],
                exam: $scope.exam._id,
                official: true,
                mockPaper: false,
                solved: false,
                questionWithAnswer: false,
            };
        };
        
        
        $scope.setTest = function(test){
            $scope.toAddTest = test;
        };
        $scope.removeQuestionPaper = function(){
            $scope.toAddTest.url.question = null;
        };
        $scope.removeAnswerKey = function(){
            $scope.toAddTest.url.answer = null;
        };
        $scope.removeScreenshots = function(){
            $scope.toAddTest.screenshots = [];
        };
        $scope.saveNewTest = function(){
            testService.saveTest($scope.toAddTest).success(function (data, status, headers) {
                console.log(data);
                $scope.toAddTest = data;
                $scope.showSavedDialog();
                $scope.cancelNewTest();
            })
            .error(function (data, status, header, config) {
                console.log('Error ' + data + ' ' + status);
            });
        };
        $scope.cancelNewTest = function(){
            $scope.toAddTest = null;
            $scope.setExam($scope.exam);
        };
        
        $scope.newOfficialLink = null;   
        $scope.addNewOfficialLink = function(){
            $scope.newOfficialLink = {
                url: '',
                description: '',
            };
        };
        $scope.saveNewOfficialLink = function(){
            
            if($scope.newOfficialLink.url){
                if(!$scope.exam.links){
                    $scope.exam.links = [];
                }
                $scope.exam.links.push($scope.newOfficialLink);
                console.log('Done');
                $scope.newOfficialLink = null;
            }
            
        };
            
        $scope.newExamCycle = null;   
        $scope.addNewExamCycle = function(){
            
            $scope.newExamCycle = {
                year: '2018',
                cycleNumber: '1',
                name: '',
                description: '',
                brochure: [],
                syllabus: [],
                docs: [],
                active: false,
                examMode: false,
                studentsAppearing: '',
                studentSeats: '',
                steps: {
                    registration: false,
                    admitCard: false,
                    examDate: false,
                    writtenResultDate: false,
                    counselling: false,
                    interview: false,
                    finalResultDate: false,
                    text: ''
                },
                examdates:{
                    registration:{
                        start: {
                            _date: new Date(),
                            tentative: false,
                            applicable: false,
                        },
                        end: {
                            _date: new Date(),
                            tentative: false,
                            applicable: false,
                        },
                        endwithlatefees: {
                            _date: new Date(),
                            tentative: false,
                            applicable: false,
                        },
                        text: '',
                    },
                    admitCard:{
                        start: {
                            _date: new Date(),
                            tentative: false,
                            applicable: false,
                        },
                        end: {
                            _date: new Date(),
                            tentative: false,
                            applicable: false,
                        },
                        text: '',
                    },
                    examDate:{
                        start: {
                            _date: new Date(),
                            tentative: false,
                            applicable: false,
                        },
                        end: {
                            _date: new Date(),
                            tentative: false,
                            applicable: false,
                        },
                        text: '',
                    },
                    writtenResultDate:{
                        start: {
                            _date: new Date(),
                            tentative: false,
                            applicable: false,
                        },
                        end: {
                            _date: new Date(),
                            tentative: false,
                            applicable: false,
                        },
                        text: '',
                    },
                    counselling:{
                        start: {
                            _date: new Date(),
                            tentative: false,
                            applicable: false,
                        },
                        end: {
                            _date: new Date(),
                            tentative: false,
                            applicable: false,
                        },
                        text: '',
                    },
                    interview:{
                        start: {
                            _date: new Date(),
                            tentative: false,
                            applicable: false,
                        },
                        end: {
                            _date: new Date(),
                            tentative: false,
                            applicable: false,
                        },
                        text: '',
                    },
                    finalResultDate:{
                        start: {
                            _date: new Date(),
                            tentative: false,
                            applicable: false,
                        },
                        end: {
                            _date: new Date(),
                            tentative: false,
                            applicable: false,
                        },
                        text: '',
                    },
                },
            };
        };
            
        $scope.cancelNewExamCycle = function(){
            $scope.newExamCycle = null;
            $scope.setExam($scope.exam);
        };
        $scope.setExamCycle = function(cycle){
            $scope.newExamCycle = cycle;
            //console.log(cycle);
        };
        $scope.saveNewExamCycle = function(){
            
            if(!$scope.exam.cycle){
               $scope.exam.cycle = [];
            }
            var examCylceIds = $scope.exam.cycle.map(function(a) {return a._id;});
            var examCycleNames = $scope.exam.cycle.map(function(a) {return a.name;});
            if($scope.newExamCycle._id){
                var cIndex = examCylceIds.indexOf($scope.newExamCycle._id);
                if(cIndex != -1){
                    $scope.exam.cycle[cIndex] = $scope.newExamCycle;
                }else{
                    $scope.exam.cycle.push($scope.newExamCycle);
                }
            }else{
                var thisCycleName = $scope.newExamCycle.name;
                var cIndex = examCycleNames.indexOf(thisCycleName);
                if(cIndex != -1){
                    $scope.exam.cycle[cIndex] = $scope.newExamCycle;
                }else{
                    $scope.exam.cycle.push($scope.newExamCycle);
                }
            }
            //$scope.showSavedDialog();
            $scope.cancelNewExamCycle();
        };
            
            
        $scope.removeExamCycleConfirm = function(examcycle){
            if(examcycle._id){
                var confirm = $mdDialog.confirm()
                .title('Would you like to delete exam cycle titled '+ examcycle.name +'  ?')
                .textContent('You will not be able to recover them after this!')
                .ariaLabel('Lucky day')
                .targetEvent()
                .clickOutsideToClose(true)
                .ok('Confirm')
                .cancel('Cancel');
                $mdDialog.show(confirm).then(function() {
                    $scope.removeExamCycle(examcycle);
                }, function() {
                  //nothing
                });   
            }else{
                $scope.cancelNewExamCycle();
            }
        };
        $scope.removeExamCycle = function(examcycle){ 
            if(!$scope.exam.cycle){
               $scope.exam.cycle = [];
            }
            var examCylceIds = $scope.exam.cycle.map(function(a) {return a._id;});
            var examCycleNames = $scope.exam.cycle.map(function(a) {return a.name;});
            if($scope.newExamCycle._id){
                var cIndex = examCylceIds.indexOf($scope.newExamCycle._id);
                if(cIndex != -1){
                    $scope.exam.cycle.splice(cIndex);
                }else{
                    //$scope.exam.cycle.push($scope.newExamCycle);
                }
            }else{
                var thisCycleName = $scope.newExamCycle.name;
                var cIndex = examCycleNames.indexOf(thisCycleName);
                if(cIndex != -1){
                    $scope.exam.cycle.splice(cIndex);
                }else{
                    //$scope.exam.cycle.push($scope.newExamCycle);
                }
            }
            //$scope.showSavedDialog();
            $scope.cancelNewExamCycle();
            
            
        }; 
            
        $scope.removeBrochure = function(brochure){
            var brochureIds = $scope.newExamCycle.brochure.map(function(a) {return a.url;});
            var bIndex = brochureIds.indexOf(brochure.url);
            if(bIndex!= -1){
                $scope.newExamCycle.brochure.splice(bIndex,1);
            }
        };
        
        $scope.registrationText = function(ev) {
            $mdDialog.show({
              contentElement: '#registrationText',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true
            });
        };
        $scope.admitCardText = function(ev) {
            $mdDialog.show({
              contentElement: '#admitCardText',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true
            });
        };
        $scope.examDateText = function(ev) {
            $mdDialog.show({
              contentElement: '#examDateText',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true
            });
        };
        $scope.writtenResultDateText = function(ev) {
            $mdDialog.show({
              contentElement: '#writtenResultDateText',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true
            });
        };
        $scope.counsellingText = function(ev) {
            $mdDialog.show({
              contentElement: '#counsellingText',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true
            });
        };
        $scope.interviewText = function(ev) {
            $mdDialog.show({
              contentElement: '#interviewText',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true
            });
        };
        $scope.finalResultDateText = function(ev) {
            $mdDialog.show({
              contentElement: '#finalResultDateText',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true
            });
        };
            
        $scope.removeSyllabus = function(syllabus){
            var syllabusIds = $scope.newExamCycle.syllabus.map(function(a) {return a.url;});
            var sIndex = syllabusIds.indexOf(syllabus.url);
            if(sIndex!= -1){
                $scope.newExamCycle.syllabus.splice(sIndex,1);
            }
        };
          
        $scope.removeDoc = function(doc){
            var docIds = $scope.newExamCycle.docs.map(function(a) {return a.url;});
            var dIndex = docIds.indexOf(doc.url);
            if(dIndex!= -1){
                $scope.newExamCycle.docs.splice(dIndex,1);
            }
        };    
        //upload helper functions for test papers
        $scope.uploadAnswerKey = function (newanswerkey) {
            var answerkey = [newanswerkey];
            var nFiles = answerkey.length;
            
            var counter = 0;
            if (answerkey && answerkey.length) {
            
            answerkey.forEach(function(thisFile, index){
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
                console.log('Success ' + thisFile.name + 'uploaded. Response: ' + resp.data);
                var answerkeyLink = $(resp.data).find('Location').text();
                $scope.toAddTest.url.answer = answerkeyLink;
                
                
                
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                }, function (evt) {
                    
                });

            })
            .error(function (data, status, header, config) {
                console.log("Error");
            });   
                 
            });
            }
        };    
        $scope.uploadQuestionPaper = function (newquestionpaper) {
            var questionpaper = [newquestionpaper];
            var nFiles = questionpaper.length;
            
            var counter = 0;
            if (questionpaper && questionpaper.length) {
            
            questionpaper.forEach(function(thisFile, index){
            var fileInfo = {
                filename: thisFile.name,
                contentType: thisFile.type
            };
            console.log(thisFile);
            console.log(thisFile.size);
            var fileName = fileInfo.filename;
            var splits = fileName.split('.');
            fileName = splits[0];
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
                var questionpaperLink = $(resp.data).find('Location').text();
                $scope.toAddTest.url.question = questionpaperLink;
                $scope.toAddTest.name = fileName;
                }, function (resp) {
                    $scope.respError = resp;
                    console.log($scope.respError);
                    console.log('Error status: ' + resp.status);
                }, function (evt) {
                    $scope.uploadProgress = parseInt(100.0 * evt.loaded / evt.total);
                    console.log($scope.uploadProgress);
                });

            })
            .error(function (data, status, header, config) {
                console.log("Error");
            });   
                 
            });
            }
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
                console.log('Success ' + thisFile.name + 'uploaded. Response: ' + resp.data);
                var logoLink = $(resp.data).find('Location').text();
                
                var newLogoForm ={
                    logo: logoLink,
                    examId: $scope.exam._id
                };
                console.log(newLogoForm);
                
                if(newLogoForm.examId){
                    ExamService.addLogo(newLogoForm).success(function (data, status, headers) {
                        counter = counter + 1;
                        $scope.showSavedDialog();
                        $state.reload();
                    })
                    .error(function (data, status, header, config) {
                        console.log("Error ");
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
                console.log("Error");
            });   
                 
            });
            }
        };
            
        $scope.uploadScreenshots = function (photos) {
            var nFiles = photos.length;
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
                            console.log('Success ' + thisFile.name + 'uploaded. Response: ' + resp.data);
                            thisFile.link = $(resp.data).find('Location').text();
                        
                            $scope.toAddTest.screenshots.push(thisFile.link);

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
                        console.log("Error");
                    });   

                });
            }
         };
            
        //upload helper functions for exam cycles  
        $scope.uploadSyllabus = function (syllabuses) {
            var nFiles = syllabuses.length;
            var counter = 0;
            if (syllabuses && syllabuses.length) {
                syllabuses.forEach(function(thisFile, index){

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
                            console.log('Success ' + thisFile.name + 'uploaded. Response: ' + resp.data);
                            thisFile.link = $(resp.data).find('Location').text();
                        
                           var newSyllabus = {
                                name: '',
                                description: '',
                                url: thisFile.link,
                            };
                            $scope.newExamCycle.syllabus.push(newSyllabus);

                        }, function (resp) {
                            console.log('Error status: ' + resp.status);
                        }, function (evt) {
                            
                        });

                    })
                    .error(function (data, status, header, config) {
                        console.log("Error");
                    });   

                });
            }
         };
        $scope.uploadDocs = function (docs) {
            var nFiles = docs.length;
            var counter = 0;
            if (docs && docs.length) {
                docs.forEach(function(thisFile, index){

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
                            console.log('Success ' + thisFile.name + 'uploaded. Response: ' + resp.data);
                            thisFile.link = $(resp.data).find('Location').text();
                        
                           var newDoc = {
                                name: '',
                                description: '',
                                url: thisFile.link,
                            };
                            if(!$scope.newExamCycle.docs){
                                $scope.newExamCycle.docs = [];
                            }
                            $scope.newExamCycle.docs.push(newDoc);

                        }, function (resp) {
                            console.log('Error status: ' + resp.status);
                        }, function (evt) {
                            
                        });

                    })
                    .error(function (data, status, header, config) {
                        console.log("Error");
                    });   

                });
            }
         };
        $scope.uploadBrochure = function (brochures) {
            var nFiles = brochures.length;
            var counter = 0;
            $scope.photoProgess = 0;
            if (brochures && brochures.length) {
                brochures.forEach(function(thisFile, index){

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
                            console.log('Success ' + thisFile.name + 'uploaded. Response: ' + resp.data);
                            thisFile.link = $(resp.data).find('Location').text();
                        
                           var newBrochure = {
                                name: '',
                                description: '',
                                url: thisFile.link,
                            };
                            $scope.newExamCycle.brochure.push(newBrochure);

                        }, function (resp) {
                            console.log('Error status: ' + resp.status);
                        }, function (evt) {
                            $scope.photoProgess = 0;
                            thisFile.uploadProgress = parseInt(100.0 * evt.loaded / evt.total);
                            brochures.forEach(function(thisBrochure, index){
                                console.log(index + ' ' + thisBrochure.uploadProgress + ' ' + nFiles);
                                if(!thisBrochure.uploadProgress){
                                    thisBrochure.uploadProgress = 0;
                                }
                                $scope.photoProgess += thisBrochure.uploadProgress;
                                //console.log($scope.photoProgess);
                            });
                            $scope.photoProgess = $scope.photoProgess / nFiles;
                            //console.log('progress: ' + thisFile.uploadProgress + '% ' + thisFile.name);
                        });

                    })
                    .error(function (data, status, header, config) {
                        console.log("Error");
                    });   

                });
            }
         };
            
        
            
    }]);
    exambazaar.controller("addStreamController", 
        [ '$scope',  'streamList','StreamService','$http','$state', function($scope, streamList, StreamService,$http,$state){
        $scope.streams = streamList.data;
        console.log(streamList.data);
        $scope.addStream = function () {
            var saveStream = StreamService.saveStream($scope.stream).success(function (data, status, headers) {
               //$state.go('master-dashboard', {masterId: masterId});
            
            })
            .error(function (data, status, header, config) {
                console.log('Error ' + data + ' ' + status);
            });
        };
        $scope.setStream = function(stream){
            $scope.stream = stream;
        };
    }]);
    
        
        
    exambazaar.controller("addOfferController", 
        [ '$scope',  'offersList','offerService','$http','$state', function($scope, offersList, offerService,$http,$state){
        $scope.offersList = offersList.data;
        $scope.addOffer = function () {
            var saveOffer = offerService.saveOffer($scope.offer).success(function (data, status, headers) {
               //$state.go('master-dashboard', {masterId: masterId});
            
            })
            .error(function (data, status, header, config) {
                console.log('Error ' + data + ' ' + status);
            });
        };
        $scope.setOffer = function(offer){
            $scope.offer = offer;
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
            console.log(JSON.stringify($scope.intern));
            var saveIntern = UserService.saveUser($scope.intern).success(function (data, status, headers) {
                var internId = data;
            //$scope.formmessage = "Intern " + $scope.intern.basic.firstName + " " + $scope.intern.basic.lastName + " saved!";
            
            alert('Done');    
                //$state.go('intern-dashboard', {internId: internId});
                
            })
            .error(function (data, status, header, config) {
                console.log('Error ' + data + ' ' + status);
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
                console.log('Error ' + data + ' ' + status);
            });
            };
    }]);
    
    exambazaar.controller("manageUsersController", 
        [ '$scope', 'UserService', 'viewService','$http','$state', '$rootScope', '$mdDialog', '$timeout', function($scope, UserService, viewService, $http,$state, $rootScope, $mdDialog, $timeout){
            $scope.properNames = function(){
                UserService.properNames().success(function (data, status, headers) {
                    if(data){
                        console.log('Done');
                    }else{
                        console.log('Error');
                    }
                })
                .error(function (data, status, header, config) {
                    console.log("Error ");
                });
            };
            
            $rootScope.pageTitle = "Manage users on EB";
            $rootScope.$on("setBloggerUser", function(event, data){
                if(data && data.user){
                    $scope.thisuser = data.user;
                    console.log($scope.thisuser);
                    viewService.getuserviews($scope.thisuser._id).success(function (data2, status, headers) {
                        $scope.thisuserViewed = data2;
                    })
                    .error(function (data, status, header, config) {
                        console.log("Error ");
                    });
                    viewService.getuserBlogviews($scope.thisuser._id).success(function (data3, status, headers) {
                        $scope.thisuserBlogViewed = data3;
                    })
                    .error(function (data, status, header, config) {
                        console.log("Error ");
                    });
                    
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
            $scope.showErrorDialog = function(ev) {
                $mdDialog.show({
                  contentElement: '#errorDialog',
                  parent: angular.element(document.body),
                  targetEvent: ev,
                  clickOutsideToClose: true
                });
                $timeout(function(){
                    $mdDialog.cancel();
                },1000)
            };
            
            $scope.partnerInstituteId = null;
            $scope.makePartner = function(){
                if($scope.partnerInstituteId && $scope.thisuser._id){
                    $scope.partnerUser = {
                        userId: $scope.thisuser._id,
                        partnerInstituteId: $scope.partnerInstituteId
                    };
                    UserService.makePartner($scope.partnerUser).success(function (data, status, headers) {
                        if(data){
                            $scope.showSavedDialog();
                        }else{
                            $scope.showErrorDialog();
                        }
                    })
                    .error(function (data, status, header, config) {
                        console.log("Error ");
                    });
                    
                }
                
            };
            $scope.unmakePartner = function(){
                if($scope.thisuser.partner && $scope.thisuser.partner.length > 0 && $scope.thisuser._id){
                    $scope.partnerUser = {
                        userId: $scope.thisuser._id,
                        partnerInstituteId: $scope.thisuser.partner[0],
                    };
                    UserService.unmakePartner($scope.partnerUser).success(function (data, status, headers) {
                        if(data){
                            $scope.showSavedDialog();
                        }else{
                            $scope.showErrorDialog();
                        }
                    })
                    .error(function (data, status, header, config) {
                        console.log("Error ");
                    });
                    
                }
                
            };
            $scope.makePartnerDialog = function(ev) {
            $mdDialog.show({
                  contentElement: '#parnterDialog',
                  parent: angular.element(document.body),
                  targetEvent: ev,
                  clickOutsideToClose: true
                }).finally(function() {
                    //$scope.userReviewMode = true;
                });
            };
            $scope.activateIntern = function(thisuser){
                UserService.activateIntern(thisuser._id).success(function (data, status, headers) {
                    console.log("Done");
                    alert(data);
                    if($scope.thisuser){
                        $scope.thisuser = data;
                    }
                    
                })
                .error(function (data, status, header, config) {
                    console.log("Error ");
                });
            };
            $scope.deactivateIntern = function(thisuser){
                UserService.deactivateIntern(thisuser._id).success(function (data, status, headers) {
                    console.log("Done");
                    $scope.thisuser = data;
                })
                .error(function (data, status, header, config) {
                    console.log("Error ");
                });
            };
            $scope.closeInternship = function(thisuser){
                UserService.closeInternship(thisuser._id).success(function (data, status, headers) {
                    console.log("Done");
                    $scope.thisuser = data;
                })
                .error(function (data, status, header, config) {
                    console.log("Error ");
                });
            };
            $scope.activateBlogger = function(thisuser){
                UserService.activateBlogger(thisuser._id).success(function (data, status, headers) {
                    console.log("Done");
                    $scope.thisuser = data;
                })
                .error(function (data, status, header, config) {
                    console.log("Error ");
                });
            };
            $scope.deactivateBlogger = function(thisuser){
                UserService.deactivateBlogger(thisuser._id).success(function (data, status, headers) {
                    console.log("Done");
                    $scope.thisuser = data;
                })
                .error(function (data, status, header, config) {
                    console.log("Error ");
                });
            };
    }]);    
        
    exambazaar.controller("bulkDisableController", 
        [ '$scope', '$rootScope', 'UserService', '$http', '$state', 'thisuser', 'targetStudyProviderService', function($scope, $rootScope, UserService,$http,$state, thisuser, targetStudyProviderService){
        $scope.user = thisuser.data;
        if($scope.user.userType =='Master'){
            $scope.showLevel = 10;
        }
        if($rootScope.permittedToDisable.indexOf($scope.user._id) != -1){
            $scope.showLevel = 10;
        }
        /*if($scope.user._id == '59899631a68cea0154b49502'){
            $scope.showLevel = 10;
        }*/
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
                console.log("Done");
            })
            .error(function (data, status, header, config) {
                console.log("Error ");
            });
        };
        $scope.claimInstitute = function(){
            if($scope.addedInstituteId){
                $state.go('claim', {coachingId: $scope.addedInstituteId});
            }
        };
    }]);        
        
    exambazaar.controller("addInstituteController", 
        [ '$scope', 'UserService', '$http', '$state', 'thisuser', 'targetStudyProviderService', 'examList', 'streamList', '$rootScope', 'Notification', function($scope, UserService,$http,$state, thisuser, targetStudyProviderService, examList, streamList,$rootScope, Notification){
            
        $rootScope.pageTitle = 'Add Coaching in EB';    
        $scope.user = thisuser.data;
        $scope.exams = examList.data;
            //console.log($scope.exams);
        $scope.streams = streamList.data;
        
        if($scope.user.userType =='Master'){
            $scope.showLevel = 10;
        }
        if($rootScope.permittedToAdd.indexOf($scope.user._id) != -1){
            $scope.showLevel = 10;
        }
        /*if($scope.user._id == '59a9749112e754442af93d43' || $scope.user._id == '59a24d743011356248da915e'  || $scope.user._id == '59085f0fc7289d0011d6ea8c'){
            $scope.showLevel = 10;
        }*/
            
        $scope.newinstitutes =[];
        $scope.commonExams = [];
            
        $scope.addExam = function(examId){
            if($scope.commonExams.indexOf(examId) == -1){
                
                $scope.commonExams.push(examId);
                console.log($scope.commonExams);
            }
        };
        $scope.removeExam = function(examId){
            var eIndex = $scope.commonExams.indexOf(examId);
            
            if(eIndex != -1){
                $scope.commonExams.splice(eIndex,1);
            }
        };
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
                console.log("Done");
            })
            .error(function (data, status, header, config) {
                console.log("Error ");
            });
        };
        $scope.refreshPage = function(){
            $state.reload();    
        };
        $scope.adding = null;
        $scope.addInstitutes = function(){
            $scope.adding = true;
            var institutes = [];
            $scope.newinstitutes.forEach(function(thisinstitute, iIndex){
                if(thisinstitute.name && thisinstitute.name != ''){
                    thisinstitute.name = thisinstitute.name.trim();
                    thisinstitute.groupName = thisinstitute.name;
                    
                    
                    if(thisinstitute.city && thisinstitute.city != ''){
                        thisinstitute.city = titleCase(thisinstitute.city);
                    }
                    if(thisinstitute.state && thisinstitute.state != ''){
                        thisinstitute.state = titleCase(thisinstitute.state);
                    }
                    if(thisinstitute.email && thisinstitute.email != ''){
                        thisinstitute.email = thisinstitute.email.replace(/\s+/g, '');
                        thisinstitute.email = thisinstitute.email.toLowerCase();
                    }
                    if(thisinstitute.phone && thisinstitute.phone != ''){
                        thisinstitute.phone = thisinstitute.phone.replace(/\s+/g, '');
                    }
                    if(thisinstitute.mobile && thisinstitute.mobile != ''){
                        thisinstitute.mobile = thisinstitute.mobile.replace(/\s+/g, '');
                    }
                    if(thisinstitute.website && thisinstitute.website != ''){
                        thisinstitute.website = thisinstitute.website.replace(/\s+/g, '');
                        thisinstitute.email = thisinstitute.email.toLowerCase();
                        
                        var find ="http";
                        var fIndex = thisinstitute.website.indexOf(find);
                        if(fIndex == -1){
                            thisinstitute.website = "http://" + thisinstitute.website;
                        }
                    }
                    if(thisinstitute.pincode && thisinstitute.pincode != ''){
                        thisinstitute.pincode = thisinstitute.pincode.replace(/\s+/g, '');
                    }
                    
                    var saveProvider = {
                        targetStudyProvider:thisinstitute,
                        user: $scope.user._id,
                        
                    };
                    if($scope.commonExams.length > 0){
                        saveProvider.targetStudyProvider.exams = $scope.commonExams;
                    }
                        
                    institutes.push(saveProvider);
                }
            });
            targetStudyProviderService.bulkSaveProviders(institutes).success(function (data, status, headers) {
                $scope.addedInstituteIds = data;
                console.log("Done");
                Notification.success("Great, we have added " + $scope.addedInstituteIds.length + " institutes!");
                Notification.warning("You will have to refresh this page to add more!");
            })
            .error(function (data, status, header, config) {
                console.log("Error ");
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
        /*$scope.urlpart1 = 'https://www.exambazaar.com/stream/';
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
            
        
        var part1 = ["https://www.exambazaar.com/stream/engineering/JEE%20Advanced/","https://www.exambazaar.com/stream/engineering/BITSAT/","https://www.exambazaar.com/stream/engineering/GATE/","https://www.exambazaar.com/stream/engineering/NATA/","https://www.exambazaar.com/stream/medical/AIPMT/","https://www.exambazaar.com/stream/medical/AIIMS/","https://www.exambazaar.com/stream/medical/AFMC/","https://www.exambazaar.com/stream/cacs/CA%20CPT/","https://www.exambazaar.com/stream/cacs/CS%20Foundation%20Exam/","https://www.exambazaar.com/stream/school/NTSE%20Exam/","https://www.exambazaar.com/stream/school/KVPY/","https://www.exambazaar.com/stream/mba/CAT/","https://www.exambazaar.com/stream/mba/XAT/","https://www.exambazaar.com/stream/mba/SNAP/","https://www.exambazaar.com/stream/law/CLAT/","https://www.exambazaar.com/stream/law/LSAT/","https://www.exambazaar.com/stream/law/AILET/","https://www.exambazaar.com/stream/foreigneducation/SAT/","https://www.exambazaar.com/stream/foreigneducation/GMAT/","https://www.exambazaar.com/stream/foreigneducation/GRE/","https://www.exambazaar.com/stream/foreigneducation/IELTS/","https://www.exambazaar.com/stream/foreigneducation/TOEFL/","https://www.exambazaar.com/stream/civilservices/Civil%20Services%20Exam/","https://www.exambazaar.com/stream/civilservices/IFS%20Exam/","https://www.exambazaar.com/stream/civilservices/IES~2FISS%20Exam/","https://www.exambazaar.com/stream/ssc/SSC%20CGLE/","https://www.exambazaar.com/stream/ssc/SSC%20CHSL%20Exam/","https://www.exambazaar.com/stream/ssc/SSC%20CMLE/","https://www.exambazaar.com/stream/ssc/SSC%20CPO%20(S.I)%20Exam/","https://www.exambazaar.com/stream/ssc/SSC%20JE/","https://www.exambazaar.com/stream/bank/SBI%20PO%20Exam/","https://www.exambazaar.com/stream/bank/IBPS%20PO%20CWE/","https://www.exambazaar.com/stream/bank/IBPS%20Clerk%20CWE/","https://www.exambazaar.com/stream/bank/RBI%20Assistant%20Exam/","https://www.exambazaar.com/stream/defence/NDA%20Exam/","https://www.exambazaar.com/stream/defence/CDS%20Exam/","https://www.exambazaar.com/stream/defence/I.A.F.%20Exam/","https://www.exambazaar.com/stream/defence/I.N.A%20Exam/","https://www.exambazaar.com/stream/defence/AFCAT/","https://www.exambazaar.com/stream/insurance/IRDA%20Exam/","https://www.exambazaar.com/stream/insurance/LIC%20AAO%20Exam/","https://www.exambazaar.com/stream/insurance/L.I.C%20D.O/","https://www.exambazaar.com/stream/insurance/G.I.C%20Exam/"];    
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
        [ '$scope','$http','$state','EmailService', 'targetStudyProviderService', 'UserService', 'thisuser','$mdDialog', '$timeout', 'thisuserEmails', 'tofillciService', '$rootScope', function($scope,$http,$state,EmailService, targetStudyProviderService, UserService, thisuser,$mdDialog, $timeout, thisuserEmails, tofillciService, $rootScope){
            $rootScope.pageTitle = "Send Emails via Sendgrid";
            $scope.emailService = function(){
                targetStudyProviderService.emailService().success(function (data, status, headers) {
                    //$scope.distinctStates = data;
                    console.log("Done");
                })
                .error(function (data, status, header, config) {
                    console.log("Error ");
                });
            };
            
            $scope.procMon = function(){
                UserService.procMon().success(function (data, status, headers) {
                    //$scope.distinctStates = data;
                    console.log("Done");
                })
                .error(function (data, status, header, config) {
                    console.log("Error ");
                });
            };
            
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
                    console.log(JSON.stringify(uniqueIds.length));
                    
                })
                .error(function (data, status, header, config) {
                    console.log('Error ' + data + ' ' + status);
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
                //console.log(newValue);
                //DEF
                var newValueArr = newValue.split("/");
                newValue = newValueArr[newValueArr.length-1];
                //$scope.email.instituteId = newValue;
                //console.log(newValue);
                if(newValue.length > 5){
                //alert($scope.email.instituteId);
                 targetStudyProviderService.getProviderBasic(newValue).success(function (data, status, headers) {
                if(data){
                    //console.log(data);
                    var refreshedProvider = data.provider;
                    
                    if(data.emailSent){
                        $scope.emailSent = data.emailSent;
                        $scope.emailSent.forEach(function(thisEmail, eIndex){
                            thisEmail.fromNow = moment(thisEmail._date).fromNow();
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
                    console.log("Error ");
                });
                }




            }

            }, true);
            
            $scope.sendEmail = function() {
                //
                EmailService.sendGrid($scope.email).success(function (data, status, headers) {
                    var response = data;
                    console.log(JSON.stringify(response));
                    if(response.statusCode == '202'){
                        $scope.showSentDialog();
                    }else{
                        $scope.showErrorDialog();
                    }
                    //alert(JSON.stringify(data));
                })
                .error(function (data, status, header, config) {
                    console.log('Error ' + data + ' ' + status);
                });  
            };
            
    }]);
    function extractContent(s) {
      var span= document.createElement('span');
      span.innerHTML= s;
      return span.textContent || span.innerText;
    };
    function titleCase(str) {
      str = str.toLowerCase();
      str = str.split(' ');
      for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
      }
      return str.join(' ');
    }    
        
    function slugify(string) {
      return string
        .toString()
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "");
    };
    function getIndicesOf(searchStr, str, caseSensitive) {
        var searchStrLen = searchStr.length;
        if (searchStrLen == 0) {
            return [];
        }
        var startIndex = 0, index, indices = [];
        if (!caseSensitive) {
            str = str.toLowerCase();
            searchStr = searchStr.toLowerCase();
        }
        while ((index = str.indexOf(searchStr, startIndex)) > -1) {
            indices.push(index);
            startIndex = index + searchStrLen;
        }
        return indices;
    }    
    exambazaar.controller("editblogController", 
        [ '$scope','$http','$state','blogpostService', 'blogTagService', 'UserService', 'ExamService', 'StreamService', 'thisblog', '$rootScope','$mdDialog','$timeout', 'Upload', '$cookies', 'ImageService', 'Notification', 'allBloggers', function($scope,$http, $state, blogpostService, blogTagService, UserService, ExamService, StreamService, thisblog, $rootScope, $mdDialog,$timeout, Upload, $cookies, ImageService, Notification, allBloggers){
            $scope.blogpost = thisblog.data;
            $scope.allBloggers = allBloggers.data;
            var bloggerIds = $scope.allBloggers.map(function(a) {return a._id;});
            $scope.masteruser = null;
            if($cookies.getObject('sessionuser')){
                $scope.user = $cookies.getObject('sessionuser'); 
                if($scope.user && $scope.user.userType == 'Master'){
                    $scope.masteruser = true;
                }
                UserService.getBlogger($scope.user._id).success(function (data, status, headers) {
                    var userGallery = data.blogger.gallery;
                    //console.log(userGallery);
                    $scope.blogGallery = userGallery;
                })
                .error(function (data, status, header, config) {
                    console.log("Error ");
                });
                
            }else{
                $scope.user = null;
            }
            
            //"<p","</p>",
            var possibleBlocks = ["<h3","<h2","<h1"];
            var possibleBlocksClose = ["</h3>","</h2>","</h1>"];
            $scope.showSelectedText = function() {
                $scope.closestBlockText = null;
                $scope.closestTag = null;
                
                $scope.selectedText =  $scope.getSelectionText();
                console.log($scope.selectedText);
                var contentLength = $scope.blogpost.content.length;
                
                var startTextIndex = $scope.blogpost.content.indexOf($scope.selectedText);
                //console.log(startTextIndex);
                if($scope.selectedText.length > 5 && startTextIndex != -1){
                    
                
                var stringBefore = $scope.blogpost.content.substr(0, startTextIndex);
                var startingNumbers = [];    
                possibleBlocks.forEach(function(thisBlock, bindex){
                    var thisIndex = stringBefore.lastIndexOf(thisBlock);
                    startingNumbers.push(thisIndex);
                });
                console.log(startingNumbers);
                console.log(startTextIndex);
                var innerMostBlockIndex = -1;
                var innerMostBlockNumber = -1;
                var innerMostBlock = '';
                startingNumbers.forEach(function(thisStart, sindex){
                    // && thisStart >= startTextIndex - thisBlockLen
                    var thisBlockLen = possibleBlocks[sindex].length + 1;
                    if(thisStart != -1 && thisStart >= innerMostBlockIndex && thisStart >= startTextIndex - thisBlockLen - 6){
                        innerMostBlockIndex = sindex;
                        innerMostBlockNumber = thisStart;
                    }
                });
                console.log(innerMostBlockNumber);
                if(innerMostBlockNumber != -1){
                    var closestBlockOpen = possibleBlocks[innerMostBlockIndex];
                    var closestBlockClose = possibleBlocksClose[innerMostBlockIndex];
                    //console.log(closestBlockOpen + " " + closestBlockClose);
                    var closestBlockFullText = $scope.blogpost.content.substring(innerMostBlockNumber, contentLength);
                    var closestBlockTextIndex = closestBlockFullText.indexOf(closestBlockClose) + closestBlockClose.length;
                    var closestBlockText = $scope.blogpost.content.substr(innerMostBlockNumber, closestBlockTextIndex);
                    
                    //console.log(closestBlockFullText);
                    
                    if(closestBlockText && closestBlockText.length > 0){
                        var closestTag = closestBlockOpen.substring(1, closestBlockOpen.length);
                        $scope.closestBlockText = closestBlockText;
                        $scope.closestTag = closestTag;
                        /*if($scope.masteruser){
                            $scope.replaceTag(closestBlockText, closestTag);
                        }*/
                        
                    }
                } 
                }
                //console.log($scope.selectedText);
            };
            $scope.replaceTag = function(closestBlockText, tag){
                var bIndex = $scope.blogpost.content.indexOf(closestBlockText);
                
                if(bIndex != -1){
                    var preText = $scope.blogpost.content.substring(0, bIndex);
                    var postText = $scope.blogpost.content.substring(bIndex + closestBlockText.length, $scope.blogpost.content.length);
                    
                }
                var replace1From = "<"+tag;
                var replace1To = "<p";
                var replace2From = "</"+tag+">";
                var replace2To = "</p>";
                var newBlockText = closestBlockText.replace(replace1From, replace1To);
                newBlockText = newBlockText.replace(replace2From, replace2To);
                
                var confirm = $mdDialog.confirm()
                .title('Do you want to remove the header tag?')
                .textContent("You are going replace from " + closestBlockText + " to " + newBlockText)
                .ariaLabel('Lucky day')
                .targetEvent()
                .clickOutsideToClose(true)
                .ok('Confirm')
                .cancel('Cancel');
                $mdDialog.show(confirm).then(function() {
                    $scope.blogpost.content = preText + newBlockText + postText;
                }, function() {
                  //nothing
                });
                
                
            };
            
            $scope.getSelectionText = function() {
              var text = "";
              if (window.getSelection) {
                  text = window.getSelection().toString();
              } else if (document.selection && document.selection.type != "Control") {
                  text = document.selection.createRange().text;
              }
              return text;
            };
            var defaultBlogCover = "https://exambazaar.com/images/background/examinfo.jpg";
            if($scope.blogpost.coverPhoto){
                $scope.thisBlogCover = $scope.blogpost.coverPhoto;
            }else{
                $scope.thisBlogCover = defaultBlogCover;
            }
            //console.log($scope.blogpost.coverPhoto);
            
            
            $scope.urlslug = '';
            $scope.urlslugError = false;
            $scope.urlslugSet = false;
            
            $scope.addBlogExam = function(thisExam){
                if(!$scope.blogpost.exams){
                    $scope.blogpost.exams = [];
                }
                var eIndex = $scope.blogpost.exams.indexOf(thisExam._id);
                if(eIndex == -1){
                    $scope.blogpost.exams.push(thisExam._id);
                }else{
                    //exam already exists
                }
            };
            
            $scope.removeBlogExam = function(thisExam){
                if(!$scope.blogpost.exams){
                    //do nothing
                }else{
                    var eIndex = $scope.blogpost.exams.indexOf(thisExam._id);
                    if(eIndex == -1){
                        //do nothing
                    }else{
                         $scope.blogpost.exams.splice(eIndex, 1);
                    }
                }
            };
            
            $rootScope.$on("setBlogCoachingGroup", function(event, data){
                var newGroup = data.groupName;
                $scope.addBlogCoaching(newGroup);
            });
            
            $scope.addBlogCoaching = function(groupName){
                if(!$scope.blogpost.coachingGroups){
                    $scope.blogpost.coachingGroups = [];
                }
                var cIndex = $scope.blogpost.coachingGroups.indexOf(groupName);
                if(cIndex == -1){
                    $scope.blogpost.coachingGroups.push(groupName);
                }else{
                    //do nothing
                }
            };
            
            $scope.removeBlogCoaching = function(groupName){
                if($scope.blogpost.coachingGroups){
                    var cIndex = $scope.blogpost.coachingGroups.indexOf(groupName);
                    if(cIndex == -1){
                        //do nothing
                    }else{
                        $scope.blogpost.coachingGroups.splice(cIndex,1);
                    }
                }
            };
            
            $scope.newTagText = '';
            $scope.addGlobalBlogTag = function(newTagText){
                
                var blogTagForm = {
                    user: $scope.user._id,
                    tag: $scope.newTagText,
                };
                 blogTagService.saveblogTag(blogTagForm).success(function (data, status, headers) {
                     $scope.newTagText = '';
                     blogTagService.getblogTags().success(function (data, status, headers) {
                         $scope.allTags = data;
                    })
                    .error(function (data, status, header, config) {
                        console.log("Error ");
                    });
                })
                .error(function (data, status, header, config) {
                    console.log("Error ");
                });
            };
            
            /*allTags: ['blogTagService',
                    function(blogTagService){
                    return blogTagService.getblogTags();
                }],
                examList: ['ExamService',
                    function(ExamService){
                    return ExamService.getExams();
                }],
                streamList: ['StreamService',
                    function(StreamService){
                    return StreamService.getStreams();
                }],*/
            
            $scope.setBlogTag = function(newTag){
                var newTagId = newTag._id;
                if(!$scope.blogpost.blogTags){
                    $scope.blogpost.blogTags = [];
                }
                var tIndex = $scope.blogpost.blogTags.indexOf(newTagId);
                if(tIndex == -1){
                    $scope.blogpost.blogTags.push(newTagId);
                }else{
                    //do nothing
                }
            };
            
            $scope.unsetBlogTag = function(newTag){
                var newTagId = newTag._id;
                if(!$scope.blogpost.blogTags){
                    $scope.blogpost.blogTags = [];
                }
                var tIndex = $scope.blogpost.blogTags.indexOf(newTagId);
                if(tIndex == -1){
                    //do nothing
                }else{
                    $scope.blogpost.blogTags.splice(tIndex,1);
                    
                }
            };
            
            
            $scope.urlslugDone = function(){
                //console.log($scope.newUrlslug);
                $scope.blogpost.urlslug = $scope.newUrlslug;
                console.log($scope.blogpost.urlslug);
                $mdDialog.hide();    
            };
            $scope.markExamsDone = function(){
                $mdDialog.hide();    
            };
            $scope.showBlogGalleryDialog = function(ev) {
            $mdDialog.show({
                  contentElement: '#blogGalleryDialog',
                  parent: angular.element(document.body),
                  targetEvent: ev,
                  clickOutsideToClose: true
                }).finally(function() {
                    //$scope.userReviewMode = true;
                });
            };
            $scope.allExams = null;
            $scope.allStreams = null;
            $scope.showBlogExamDialog = function(ev) {
                if(!$scope.allExams || !$scope.allStreams){
                    ExamService.getExams().success(function (examdata, status, headers) {
                        console.log('Exams loaded!');
                        $scope.allExams = examdata;
                        StreamService.getStreams().success(function (streamdata, status, headers) {
                            console.log('Streams loaded!');
                            $scope.allStreams = streamdata;
                            $mdDialog.show({
                              contentElement: '#examDialog',
                              parent: angular.element(document.body),
                              targetEvent: ev,
                              clickOutsideToClose: true
                            }).finally(function() {
                                //$scope.userReviewMode = true;
                            });
                        })
                        .error(function (data, status, header, config) {
                            Notification.warning({message: "Something went wrong! Streams not loaded!",  positionY: 'top', positionX: 'right', delay: 1000});
                            console.log("Error ");
                        });
                    })
                    .error(function (data, status, header, config) {
                        Notification.warning({message: "Something went wrong! Exams not loaded!",  positionY: 'top', positionX: 'right', delay: 1000});
                        console.log("Error ");
                    });
                   
                }else{
                    $mdDialog.show({
                      contentElement: '#examDialog',
                      parent: angular.element(document.body),
                      targetEvent: ev,
                      clickOutsideToClose: true
                    }).finally(function() {
                        //$scope.userReviewMode = true;
                    });
                }
            };
            $scope.showBlogCoachingDialog = function(ev) {
                            
                $mdDialog.show({
                  contentElement: '#coachingDialog',
                  parent: angular.element(document.body),
                  targetEvent: ev,
                  clickOutsideToClose: true
                }).finally(function() {
                    //$scope.userReviewMode = true;
                });
            };
            $scope.showBlogTagDialog = function(ev) {
                if(!$scope.allTags){
                    blogTagService.getblogTags().success(function (data, status, headers) {
                        console.log('Tags loaded!');
                        $scope.allTags = data;
                        $scope.blogTagsList = [];
                        if($scope.blogpost.blogTags){
                            $scope.blogTagsList = $scope.blogpost.blogTags.map(function(a) {return a._id;});
                        }
                        $mdDialog.show({
                          contentElement: '#tagDialog',
                          parent: angular.element(document.body),
                          targetEvent: ev,
                          clickOutsideToClose: true
                        }).finally(function() {
                            //$scope.userReviewMode = true;
                        });
                    })
                    .error(function (data, status, header, config) {
                        Notification.warning({message: "Something went wrong! Blog tags not loaded!",  positionY: 'top', positionX: 'right', delay: 1000});
                        console.log("Error ");
                    });
                   
                }else{
                    $mdDialog.show({
                      contentElement: '#tagDialog',
                      parent: angular.element(document.body),
                      targetEvent: ev,
                      clickOutsideToClose: true
                    }).finally(function() {
                        //$scope.userReviewMode = true;
                    });
                }
                
            };
            $scope.showVersionDialog = function(ev) {
            $mdDialog.show({
                  contentElement: '#versionDialog',
                  parent: angular.element(document.body),
                  targetEvent: ev,
                  clickOutsideToClose: true
                }).finally(function() {
                    //$scope.userReviewMode = true;
                });
            };
            $scope.showHTMLDialog = function(ev) {
                
            $scope.editHTML = $scope.blogpost.content;    
            $mdDialog.show({
                  contentElement: '#HTMLDialog',
                  parent: angular.element(document.body),
                  targetEvent: ev,
                  clickOutsideToClose: false,
                  escapeToClose: false,
                }).finally(function() {
                    //$scope.userReviewMode = true;
                });
            };
            $scope.markHTMLDone = function(){
                $scope.blogpost.content = $scope.editHTML;
                $mdDialog.hide();
            };
            $scope.mediumBindOptions = {
                toolbar: {
                    buttons: ['bold', 'italic', 'underline', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'indent', 'outdent', 'anchor', 'h1','h2', 'h3', 'image', 'removeFormat', 'table', 'orderedlist', 'unorderedlist']
                },
                targetBlank: true,
                /*disableExtraSpaces: true,*/
                spellcheck: true,
                /*disableReturn: false,
                disableDoubleReturn: true,*/
                extensions: {
                    table: new MediumEditorTable()
                },
                anchor: {
                    placeholderText: 'Type a link',
                    customClassOption: 'btn',
                    customClassOptionText: 'Create Button'
                },
                keyboardCommands: {
                    /* This example includes the default options for keyboardCommands,
                       if nothing is passed this is what it used */
                    commands: [
                        {
                            command: 'bold',
                            key: 'B',
                            meta: true,
                            shift: false,
                            alt: false
                        },
                        {
                            command: 'italic',
                            key: 'I',
                            meta: true,
                            shift: false,
                            alt: false
                        },
                        {
                            command: 'underline',
                            key: 'U',
                            meta: true,
                            shift: false,
                            alt: false
                        }
                    ],
                },
                paste: {
                    
                    forcePlainText: false,
                    cleanPastedHTML: true,
                    /*cleanAttrs: ['class', 'style', 'dir'],
                    cleanTags: ['br', 'meta', 'body', 'section', 'aside', 'article',
                      'span', 'h1', 'h2','h3', 'font'],*/
                }
            };
            $scope.titleBindOptions = {
                /*toolbar: {
                    buttons: ['bold', 'italic', 'underline', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'anchor', 'h1','h2', 'h3','removeFormat']
                },*/
                disableReturn: true,
                disableExtraSpaces: true,
                toolbar: false
            };
            
            $scope.$watch('blogpost.seoKeywords', function (newValue, oldValue, scope) {
                if(newValue && newValue.length > 0){
                    $scope.nKeywords = (newValue.match(new RegExp(",", "g")) || []).length + 1;
                    //console.log($scope.nKeywords);
                }

            }, true);
            var possibleBlocks = ["<h3","<h2","<h1"];
            var possibleBlocksClose = ["</h3>","</h2>","</h1>"];
            $scope.$watch('blogpost.content', function (newValue, oldValue, scope) {
                if(newValue && newValue.length > 0){
                    //console.log(newValue);
                    possibleBlocks.forEach(function(thisBlock, bindex){
                        var indices = getIndicesOf(thisBlock, newValue);
                        //console.log(thisBlock);
                        //console.log(indices);
                    });
                    
                }

            }, true);
            setInterval(function() {
                console.log('Autosave starting: ' + moment().format('DD-MMM HH:mm:ss'));
                $scope.saveBlogPost($scope.blogpost, 'Autosaved');
            }, 180 * 1000);
            
            $scope.saveBlogPost = function(blogpost, displayString){
                if($scope.user && $scope.user._id){
                    
                
                var find = "EdBites";
                var fIndex = $scope.blogpost.title.indexOf(find);
                if(fIndex != -1){
                    $scope.blogpost.blogSeries = "EdBites";
                }
                
                $scope.blogpost.urlslug = slugify($scope.blogpost.title);
                blogpostService.slugExists($scope.blogpost.urlslug).success(function (data, status, headers) {
                    console.log(data);
                    if(data == false){
                        var blogpostForm = {
                            savedBy: $scope.user._id,
                            autosave: false
                        };
                        if(displayString == 'Autosaved'){
                            blogpostForm.autosave = true;
                        }

                        for (var property in blogpost) {
                            blogpostForm[property] = blogpost[property];
                        }
                        
                        blogpostService.saveblogpost(blogpostForm).success(function (data, status, headers) {
                            //$scope.showSavedDialog();
                            if(displayString == 'Autosaved'){
                                Notification.primary({message: "Blog "+ displayString + "!",  positionY: 'top', positionX: 'right', delay: 30000});
                            }else{
                                Notification.success({message: "Blog "+ displayString + "!",  positionY: 'top', positionX: 'right', delay: 3000});
                            }
                            
                        })
                        .error(function (data, status, header, config) {
                            Notification.warning({message: "Something went wrong! Blog not "+ displayString + "!",  positionY: 'top', positionX: 'right', delay: 1000});
                            console.log("Error ");
                        });
                        
                        
                    }else{
                        if($scope.blogpost._id == data){
                            //do nothing
                            //console.log(data);
                            
                            
                            var blogpostForm = {
                                savedBy: $scope.user._id,
                                autosave: false
                            };
                            if(displayString == 'Autosaved'){
                                blogpostForm.autosave = true;
                            }

                            for (var property in blogpost) {
                                blogpostForm[property] = blogpost[property];
                            }
                            //console.log(blogpostForm);
                            blogpostService.saveblogpost(blogpostForm).success(function (data, status, headers) {
                                $scope.blogpost = data;
                                if(displayString == 'Autosaved'){
                                    Notification.primary({message: "Blog "+ displayString + "!",  positionY: 'top', positionX: 'right', delay: 30000});
                                }else{
                                    Notification.success({message: "Blog "+ displayString + "!",  positionY: 'top', positionX: 'right', delay: 3000});
                                }
                            })
                            .error(function (data, status, header, config) {
                                Notification.warning({message: "Something went wrong! Blog not "+ displayString + "!",  positionY: 'top', positionX: 'right', delay: 1000});
                                
                                console.log("Error ");
                            });
                        }else{
                            $scope.showUrlslugDialog();
                        }
                        
                        

                    }

                })
                .error(function (data, status, header, config) {
                    console.log("Error ");
                });
                }else{
                    Notification.warning({message: "You need to login before you can save changes!",  positionY: 'top', positionX: 'right', delay: 5000});
                }
                
            };
            
            $scope.blogPostVersions = function(blogpost){
                $scope.versions = [];
                if(blogpost._autosaved){
                    $scope.versions.push(blogpost._autosaved);
                }
                if(blogpost._saved && blogpost._saved.length > 0){
                    $scope.versions = $scope.versions.concat(blogpost._saved);
                }
                $scope.versions.forEach(function(thisVersion, vindex){
                    var thisUser = thisVersion.user;
                    if(thisUser){
                        if(thisUser._id){
                            thisUser = thisUser._id;
                        }

                        var bIndex = bloggerIds.indexOf(thisUser);
                        //console.log(bIndex);
                        if(bIndex != -1){
                            $scope.versions[vindex].user = $scope.allBloggers[bIndex];
                        }
                    }
                    
                });
                
                
                $scope.showVersionDialog();
            };
            $scope.setVersion = function(version){
                var fields = [];
                $scope.blogpost.title = version.title;
                $scope.blogpost.content = version.content;
                $scope.blogpost.coverPhoto = version.coverPhoto;
                $scope.blogpost.blogTags = version.blogTags;
                $scope.blogpost.blogSeries = version.blogSeries;
                $scope.blogpost.exams = version.exams;
                $scope.blogpost.coachingGroups = version.coachingGroups;
                $scope.blogpost.active = version.active;
                
                if($scope.blogpost.coverPhoto){
                    $scope.thisBlogCover = $scope.blogpost.coverPhoto;
                }else{
                    $scope.thisBlogCover = defaultBlogCover;
                }
                console.log($scope.thisBlogCover);
                $mdDialog.hide();
            };
            
            $scope.previewblogpost = function(blogpost){
                var blogpostSlug = blogpost.urlslug;
                var url = $state.href('showblog', {blogpostSlug: blogpostSlug});
                window.open(url,'_blank');    
            };
            
            $scope.enableblogpost = function(blogpost){
                blogpostService.enableblogpost(blogpost._id).success(function (data, status, headers) {
                    $state.reload();
                })
                .error(function (data, status, header, config) {
                    console.log("Error ");
                });
            };
            $scope.disableblogpost = function(blogpost){
                blogpostService.disableblogpost(blogpost._id).success(function (data, status, headers) {
                    $state.reload();
                })
                .error(function (data, status, header, config) {
                    console.log("Error ");
                });
            };
            $scope.dontsaveChanges = function(blogpost, ev){
                var confirm = $mdDialog.confirm()
                .title('Would you like to cancel all changes made?')
                .textContent('The blog will be set back to the latest save made by any user!')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .clickOutsideToClose(true)
                .ok('Confirm')
                .cancel('Cancel');
                $mdDialog.show(confirm).then(function() {
                  //$state.reload();
                    $scope.setToLastSavedVersion(blogpost);
                }, function() {
                  //nothing
                });
                
                
            };
            $scope.setToLastSavedVersion = function(blogpost){
                blogpostService.setToLastSavedVersion(blogpost._id).success(function (data, status, headers) {
                    console.log(data);
                    if(data && data._id){
                        var lastSavedBlog = data;
                        var savedBy = lastSavedBlog.user;
                        var _date = moment(lastSavedBlog._date).format("DD-MMM-YYYY HH:mm");
                        var bIndex = bloggerIds.indexOf(savedBy);
                        console.log(bIndex);
                        if(bIndex != -1){
                            savedBy = $scope.allBloggers[bIndex];
                        }
                        
                        $scope.blogpost.title = lastSavedBlog.title;
                        $scope.blogpost.content = lastSavedBlog.content;
                        $scope.blogpost.coverPhoto = lastSavedBlog.coverPhoto;
                        $scope.blogpost.blogTags = lastSavedBlog.blogTags;
                        $scope.blogpost.blogSeries = lastSavedBlog.blogSeries;
                        $scope.blogpost.exams = lastSavedBlog.exams;
                        $scope.blogpost.coachingGroups = lastSavedBlog.coachingGroups;
                        $scope.blogpost.active = lastSavedBlog.active;

                        if($scope.blogpost.coverPhoto){
                            $scope.thisBlogCover = $scope.blogpost.coverPhoto;
                        }else{
                            $scope.thisBlogCover = defaultBlogCover;
                        }
                        
                        
                        Notification.success({message: "Blog restored to last user save by " + savedBy.basic.name + " on " + _date,  positionY: 'top', positionX: 'right', delay: 10000});
                    }
                })
                .error(function (data, status, header, config) {
                    console.log("Error ");
                });
            };
           
            $rootScope.pageTitle = $scope.blogpost.title + " | Exambazaar.com";
            
            
            $scope.removePic = function(image){
                
                var confirm = $mdDialog.confirm()
                .title('Would you like to delete this image?')
                .textContent('You will not be able to restore it later')
                .ariaLabel('Lucky day')
                .targetEvent()
                .clickOutsideToClose(true)
                .ok('Confirm')
                .cancel('Cancel');
                $mdDialog.show(confirm).then(function() {
                    var newPicForm ={
                        image: image,
                        userId: $scope.user._id
                    }; UserService.removeBlogGalleryPic(newPicForm).success(function (data, status, headers) {
                        UserService.getBlogger($scope.user._id).success(function (data, status, headers) {
                            var userGallery = data.blogger.gallery;
                            //console.log(userGallery);
                            $scope.blogGallery = userGallery;
                            $scope.showBlogGalleryDialog();
                        })
                        .error(function (data, status, header, config) {
                            console.log("Error ");
                        });
                    })
                    .error(function (data, status, header, config) {
                        console.log("Error ");
                    });
                }, function() {
                  //nothing
                }); 
            };
            
            $scope.setInfographic = function(image){
                
                var confirm = $mdDialog.confirm()
                .title('Would you like to set this image as the blog infographic?')
                .textContent('You can always change this')
                .ariaLabel('Lucky day')
                .targetEvent()
                .clickOutsideToClose(true)
                .ok('Confirm')
                .cancel('Cancel');
                $mdDialog.show(confirm).then(function() {
                    $scope.blogpost.infographic = image;
                }, function() {
                  //nothing
                }); 
            };
            $scope.removeAllBlogGallery = function(image){
                
                var confirm = $mdDialog.confirm()
                .title('Would you like to delete all images from your blog gallery?')
                .textContent('You will not be able to restore it later')
                .ariaLabel('Lucky day')
                .targetEvent()
                .clickOutsideToClose(true)
                .ok('Confirm')
                .cancel('Cancel');
                $mdDialog.show(confirm).then(function() {
                    var newPicForm ={
                        userId: $scope.user._id
                    }; UserService.removeAllBlogGallery(newPicForm).success(function (data, status, headers) {
                        UserService.getBlogger($scope.user._id).success(function (data, status, headers) {
                            var userGallery = data.blogger.gallery;
                            $scope.blogGallery = userGallery;
                            $scope.showBlogGalleryDialog();
                            
                        })
                        .error(function (data, status, header, config) {
                            console.log("Error ");
                        });
                        
                    })
                    .error(function (data, status, header, config) {
                        console.log("Error ");
                    });
                }, function() {
                  //nothing
                }); 
            };
            $scope.uploadPic = function (newPic) {
                //var pic = $scope.newPic;
                var pic = [newPic];
                var nFiles = pic.length;

                var counter = 0;
                //console.log(JSON.stringify($scope.user));
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
                    console.log('Success ' + thisFile.name + 'uploaded. Response: ' + resp.data);
                    var picLink = $(resp.data).find('Location').text();
                    console.log(picLink);
                    

                    var newPicForm ={
                        image: picLink,
                        userId: userId
                    }; UserService.addBlogGalleryPic(newPicForm).success(function (data, status, headers) {
                        UserService.getBlogger($scope.user._id).success(function (data, status, headers) {
                            var userGallery = data.blogger.gallery;
                            //console.log(userGallery);
                            $scope.blogGallery = userGallery;
                        })
                        .error(function (data, status, header, config) {
                            console.log("Error ");
                        });
                        //$state.reload();
                    })
                    .error(function (data, status, header, config) {
                        console.log("Error ");
                    });
                    }, function (resp) {
                        console.log('Error status: ' + resp.status);
                    }, function (evt) {

                    });

                })
                .error(function (data, status, header, config) {
                    console.log("Error");
                });   

                });
                }
             };
            
            $scope.refreshPage = function(){
                $state.reload();    
            };
            $scope.uploadCover = function (coverPic) {
                var pic = [coverPic];
                var nFiles = pic.length;

                var counter = 0;
                var blogId = $scope.blogpost._id;
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
                    //console.log('Success ' + thisFile.name + 'uploaded. Response: ' + resp.data);
                    var picLink = $(resp.data).find('Location').text();
                    //console.log(picLink);
                    
                    var coverPicForm ={
                        image: picLink,
                        blogId: blogId
                    };
                     blogpostService.changeCover(coverPicForm).success(function (data, status, headers) {
                        console.log('Done');
                        if(data){
                            $scope.blogpost = data;
                            
                            if($scope.blogpost.coverPhoto){
                                $scope.thisBlogCover = $scope.blogpost.coverPhoto;
                            }else{
                                $scope.thisBlogCover = defaultBlogCover;
                            }
                            $scope.showCoverSavedDialog();
                            
                        }else{
                            console.log('Something went wrong in uploading cover photo!');
                        }
                    })
                    .error(function (data, status, header, config) {
                        console.log("Error ");
                    });
                    }, function (resp) {
                        console.log('Error status: ' + resp.status);
                    }, function (evt) {

                    });

                })
                .error(function (data, status, header, config) {
                    console.log("Error");
                });   

                });
                }
             };
            
            
             $scope.showCopiedDialog = function(text, ev) {
                $scope.copiedText = text;
                $mdDialog.show({
                  contentElement: '#copiedDialog',
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
            $scope.showCoverSavedDialog = function(ev) {
                $mdDialog.show({
                  contentElement: '#coverSavedDialog',
                  parent: angular.element(document.body),
                  targetEvent: ev,
                  clickOutsideToClose: true
                });
            };
            $scope.showUrlslugDialog = function(ev) {
                $mdDialog.show({
                  contentElement: '#urlslugDialog',
                  parent: angular.element(document.body),
                  targetEvent: ev,
                  clickOutsideToClose: false,
                  escapeToClose: false,
                });
            };
            
            $scope.replaceHTML = function(){
                
                var nOccurences = ($scope.editHTML.match(new RegExp($scope.toreplaceText , "g")) || []).length;
                
                //console.log(nOccurences);
                
                var confirm = $mdDialog.confirm()
                .title('Would you like to replace the following ' + nOccurences + ' occurences ?')
                .textContent('Replace ' + $scope.toreplaceText + ' with: ' + $scope.replacingText)
                .ariaLabel('Lucky day')
                .targetEvent()
                .clickOutsideToClose(true)
                .ok('Confirm')
                .cancel('Cancel');
                $mdDialog.show(confirm).then(function() {
                    $scope.blogpost.content = $scope.editHTML.replace(new RegExp($scope.toreplaceText, 'g'), $scope.replacingText);
                    console.log($scope.editHTML);
                    
                    $scope.showHTMLDialog();
                }, function() {
                  //nothing
                });
            };
            
            
            
    }]);
    
    exambazaar.controller("showblogController", 
        [ '$scope','$http','$state', '$stateParams', '$document','blogpostService', 'thisblog', '$rootScope', 'Socialshare', '$location', '$window', 'pageTimer', 'viewService','$cookies', 'upvoteService', 'upvoteCount', 'commentService', 'thisblogComments', function($scope,$http, $state, $stateParams, $document, blogpostService, thisblog, $rootScope, Socialshare, $location, $window, pageTimer, viewService,$cookies, upvoteService, upvoteCount, commentService, thisblogComments){
            $scope.blogpost = thisblog.data;
            $scope.blogComments = thisblogComments.data;
            $scope.blogpost.upvotes = upvoteCount.data;
            
            
            $scope.addedUpvoteIds = [];
            $scope.userUpvotes = [];
            
            $scope.newComment = {
                blogpost: $scope.blogpost._id,
                comment: '',
            };
            $scope.commentPlaceholder = 'Type in your comment here';
            
            if($cookies.getObject('sessionuser')){
                $scope.user = $cookies.getObject('sessionuser');
                upvoteService.blogpostUserUpvotes($scope.user._id).success(function (data, status, headers) {
                    $scope.userUpvotes = data;
                })
                .error(function (data, status, header, config) {
                    console.log();
                });
                if($scope.user){
                    $scope.newComment.user = $scope.user
                }
                
               var commentForm = {
                   user: $scope.user._id,
                   blogpost: $scope.blogpost._id,
               };
                commentService.userBlogpostcomment(commentForm).success(function (data, status, headers) {
                    $scope.thisUserComment = data;
                    if(!$scope.thisUserComment){
                        $scope.thisUserComment = $scope.newComment;
                    }
                    //console.log($scope.thisUserComment);
                })
                .error(function (data, status, header, config) {
                    console.log();
                });
                
                
            }else{
                if(!$scope.thisUserComment){
                    $scope.thisUserComment = $scope.newComment;
                }
                $scope.thisUserComment.user = {
                    basic: {
                        name: 'New User'
                    },
                    image: 'images/user.png',
                }
            }
            
            if(!$scope.blogpost){
                window.location = "http://www.exambazaar.com/error";
            }
            
            $scope.goToRankerWall = function(rankerWall){
                window.open(rankerWall.link,'_blank');    
            };
            
            $scope.rankerWalls = [
                {
                    title: 'NEET 2017 Rankers Wall',
                    subtitle: 'Check out the standouts, the makers of history. NEET 2017 Top 100 Rankers and their Coachings!',
                    coverPhoto: 'https://exambazaar.s3.amazonaws.com/58230ffc8814bc38104336952fcefd1f.PNG',
                    readingTime: {
                        text: '3 min read'
                    },
                    link: 'https://exambazaar.com/rankerswall/NEET%20UG/2017',
                },
                {
                    title: 'JEE Advanced 2017 Rankers Wall',
                    subtitle: 'Check out the standouts, the makers of history. JEE Advance 2017 Top 100 Rankers and their Coachings!',
                    coverPhoto: 'https://exambazaar.s3.amazonaws.com/506113959c79568cc8329504a61111a6.PNG',
                    readingTime: {
                        text: '2 min read'
                    },
                    link: 'https://exambazaar.com/rankerswall/NEET%20UG/2017',
                },
                
            ];
            
            var defaultBlogCover = "images/background/examinfo.jpg";
            if($scope.blogpost.coverPhoto){
                $scope.thisBlogCover = $scope.blogpost.coverPhoto;
            }else{
                $scope.thisBlogCover = defaultBlogCover;
            }
            
            
            $scope.shareText = "Hi! Read the exam preparation blog at Exambazaar! ";
            $scope.shareText2 = $scope.shareText;
            $scope.currURL = $location.absUrl();
            $scope.prefix = "https://exambazaar.com/blogpost/";
            $scope.shareURL = function(blogpost){
                return ($scope.prefix + blogpost.urlslug);
            };
            $scope.shareBlogText = function(blogpost){
                return ('"' + blogpost.title + '"' + " | Read all about exam preparation ");
            };
            $scope.postFacebook = function(blogpost){
                Socialshare.share({
                  'provider': 'facebook',
                  'attrs': {
                    'socialshareType': 'feed',
                    'socialshareUrl': $scope.shareURL(blogpost),
                    'socialshareVia':"1236747093103286",  'socialshareRedirectUri': 'https://www.exambazaar.com',
                  }
                });    
            };
            $scope.shareFacebook = function(){
                Socialshare.share({
                  'provider': 'facebook',
                  'attrs': {
                    'socialshareType': 'send',
                    'socialshareUrl': $scope.currURL,
                    'socialshareVia':"1236747093103286",  'socialshareRedirectUri': 'https://www.exambazaar.com',
                  }
                });
            };
           
            $scope.upvoteExists = function(blogpost){
                var uIndex = $scope.userUpvotes.indexOf(blogpost._id);
                if(uIndex == -1){
                    return false;
                }else{
                    return true;
                }
            };
            
            $scope.saveupvote = function(blogpost){
                var upvoteForm = {
                    blogpost: blogpost._id,
                };
                if($scope.user && $scope.user._id){
                    upvoteForm.user = $scope.user._id;
                }
                upvoteService.saveupvote(upvoteForm).success(function (savedata, status, headers) {    
                    upvoteService.blogpostUpvoteCount(blogpost.urlslug).success(function (data, status, headers) {
                         $scope.userUpvotes.push(blogpost._id);
                         blogpost.upvotes = data;

                    })
                    .error(function (data, status, header, config) {
                        console.log();
                    });
                })
                .error(function (data, status, header, config) {
                    console.log();
                });
            };
            
            $scope.removeupvote = function(blogpost){
                if($scope.user && $scope.user._id){
                    var removeupvoteForm = {
                        blogpost: blogpost._id,
                        user: $scope.user._id,
                    };
                     upvoteService.removeupvote(removeupvoteForm).success(function (data, status, headers) {
                        upvoteService.blogpostUpvoteCount(blogpost.urlslug).success(function (sdata, status, headers) {    
                         upvoteService.blogpostUserUpvotes($scope.user._id).success(function (data, status, headers) {
                                $scope.userUpvotes = data;
                                blogpost.upvotes = sdata;
                            })
                            .error(function (data, status, header, config) {
                                console.log();
                            });

                        })
                        .error(function (data, status, header, config) {
                            console.log();
                        });
                    })
                    .error(function (data, status, header, config) {
                        console.log();
                    });   
                }
            };
            
            $rootScope.pageTitle = $scope.blogpost.title + " | Exambazaar.com";
            $rootScope.pageImage = $scope.thisBlogCover;
            
            $rootScope.pageDescription =  $scope.blogpost.seoDescription;
            $rootScope.pageKeywords =  $scope.blogpost.seoKeywords;
            
            var viewForm = {
                state: $state.current.name,
                claim: false,
                url: $location.url()
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
                //console.log('View Marked');
            })
            .error(function (data, status, header, config) {
                console.log();
            });
            
            $scope.backToBlog = function(){
                $state.go('blog');    
            };
            
            $rootScope.$on("userset", function(){
                if($cookies.getObject('sessionuser')){
                    $scope.user = $cookies.getObject('sessionuser');
                    upvoteService.blogpostUserUpvotes($scope.user._id).success(function (data, status, headers) {
                        $scope.userUpvotes = data;
                    })
                    .error(function (data, status, header, config) {
                        console.log();
                    });
                    if($scope.user){
                        $scope.newComment.user = $scope.user
                    }

                   var commentForm = {
                       user: $scope.user._id,
                       blogpost: $scope.blogpost._id,
                   };
                    commentService.userBlogpostcomment(commentForm).success(function (data, status, headers) {
                        $scope.thisUserComment = data;
                        if(!$scope.thisUserComment){
                            $scope.thisUserComment = $scope.newComment;
                        }
                        //console.log($scope.thisUserComment);
                    })
                    .error(function (data, status, header, config) {
                        console.log();
                    });
                    
                    console.log($scope.user);
                    $scope.submitComment();
                }
                
            });
            $scope.submitComment = function(){
                
                var commentForm = $scope.thisUserComment;
                commentForm.user = null;
                if($scope.user && $scope.user._id){
                    commentForm.user = $scope.user._id;
                }
                if(!commentForm.user){
                    console.log('User not set');
                    $rootScope.$emit("CallBlogLogin", {});
                    
                    
                }else{
                    commentService.savecomment(commentForm).success(function (savedata, status, headers) { 
                        $scope.thisUserComment = savedata;
                        console.log($scope.thisUserComment);
                    
                        commentService.blogpostComments($stateParams.blogpostSlug).success(function (data, status, headers) {
                            $scope.blogComments = data;
                        })
                        .error(function (data, status, header, config) {
                            console.log('Error');
                        });
                    })
                    .error(function (data, status, header, config) {
                        console.log('Error');
                    });
                }
            };
            /*$document.on('mouseleave', leaveFromTop);

            function leaveFromTop(e){
                if( e.clientY < 0 && !$rootScope.fblikeDialog && $scope.t.counts > 10){
                    //console.log($rootScope.fblikeDialog);
                    $rootScope.showfblikeDialog();
                }
                //console.log($scope.t.counts);
            };*/
            $scope.t = pageTimer(1000);
    }]);
    exambazaar.controller("userSurveyController", 
        [ '$scope','$http','$state','UserService', 'thisuser', 'allUsers', '$rootScope', function($scope,$http, $state, UserService, thisuser, allUsers, $rootScope){
            $scope.user = thisuser.data;
            $scope.allTypeUsers = allUsers.data;
            $scope.allUsers = [];
            
            $scope.allTypeUsers.forEach(function(thisUser, uIndex){
                if(!thisUser.basic || !thisUser.basic.name){
                    //console.log(thisUser._id);
                }
                $scope.allUsers.push(thisUser);
                /*if(thisUser.userType == 'Master'){
                    $scope.allUsers.push(thisUser);
                }*/
            });
            
            $scope.selectedUsers = [];
            
            $scope.addAllUsers = function(){
                $scope.selectedUsers = $scope.allUsers;
            };
            $scope.addUser = function(newuser){
                var userIds = $scope.selectedUsers.map(function(a) {return a._id;});
                var uIndex = userIds.indexOf(newuser._id);
                
                if(uIndex == -1){
                    $scope.selectedUsers.push(newuser);
                }else{
                    console.log('Already added!');
                }
                
            };
            
            $scope.selectedBackground = function(thisuser){
                var userIds = $scope.selectedUsers.map(function(a) {return a._id;});
                var uIndex = userIds.indexOf(thisuser._id);
                
                if(uIndex == -1){
                    return false;
                }else{
                    return true;
                }
            };
            
            $scope.sendSurvey = function(){
                console.log("Sending survey to " + $scope.selectedUsers.length + " users");
                
                UserService.userSurvey($scope.selectedUsers).success(function (data, status, headers) {
                    
                    console.log("Done");
                })
                .error(function (data, status, header, config) {
                    console.log("Error ");
                });
                
            };
            
            $rootScope.pageTitle = "User Survey";
    }]); 
        
    exambazaar.controller("userMarketingController", 
        [ '$scope','$http','$state','UserService', 'thisuser', 'allUsers', '$rootScope', function($scope,$http, $state, UserService, thisuser, allUsers, $rootScope){
            $scope.user = thisuser.data;
            $scope.allTypeUsers = allUsers.data;
            $scope.allUsers = [];
            
            $scope.allTypeUsers.forEach(function(thisUser, uIndex){
                if(!thisUser.basic || !thisUser.basic.name){
                    console.log(thisUser._id);
                }
                if((thisUser.userType == 'Student' || thisUser.userType == 'Intern - Business Development')){
                    $scope.allUsers.push(thisUser);
                }
            });
            
            $scope.selectedUsers = [];
            
            $scope.addAllUsers = function(){
                $scope.selectedUsers = $scope.allUsers;
            };
            $scope.addUser = function(newuser){
                var userIds = $scope.selectedUsers.map(function(a) {return a._id;});
                var uIndex = userIds.indexOf(newuser._id);
                
                if(uIndex == -1){
                    $scope.selectedUsers.push(newuser);
                }else{
                    console.log('Already added!');
                }
                
            };
            
            $scope.selectedBackground = function(thisuser){
                var userIds = $scope.selectedUsers.map(function(a) {return a._id;});
                var uIndex = userIds.indexOf(thisuser._id);
                
                if(uIndex == -1){
                    return false;
                }else{
                    return true;
                }
            };
            
            $scope.sendMarketing = function(){
                console.log("Sending marketing to " + $scope.selectedUsers.length + " users");
                
                UserService.userMarketing($scope.selectedUsers).success(function (data, status, headers) {
                    
                    console.log("Done");
                })
                .error(function (data, status, header, config) {
                    console.log("Error ");
                });
                
            };
            
            $rootScope.pageTitle = "User Marketing";
    }]);    
        
        
    exambazaar.config(function($mdDateLocaleProvider) {
    $mdDateLocaleProvider.formatDate = function(date) {
       return moment(date).format('MMM DD YYYY');
        };
    });
    exambazaar.factory('pageTimer', function($interval){
        return function(delay){
            var initialMs= (new Date()).getTime();
            var result = {totalMilliseconds:0, counts:0};                
            $interval(function() {
                result.totalMilliseconds = (new Date()).getTime() - initialMs;
                result.counts++;
            }, delay);
            return result;
        };
     });
        
    exambazaar.factory('metaService', function () {
        var title = 'Exambazaar: Select the stream you want to study',
        description = 'Exambazaar is India’s biggest and largest education discovery platform and is the fastest way to discover best coaching classes in your city. Our easy-to-use website shows you all the coaching classes based on study streams, along with courses, photos, vidoes and results. Exambazaar also provides comprehensive information for test prep for entrance exams in India, colleges, courses, universities and career options. You can find information about more than 50 exams and coaching classes to succeed',
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
    $urlRouterProvider.otherwise('/thankyou');
    $stateProvider
        .state('landing', {
            url: '/',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
                },
                'body':{
                    templateUrl: 'p0.html',
                    controller: 'landingController'
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                 data: function($rootScope) {
                    $rootScope.pageTitle = 'Exambazaar: Find best coaching classes in your city for 50+ Indian exams';
                    $rootScope.pageDescription = "Exambazaar:find best coaching classes in your city. Browse courses, photos, vidoes and results for over 50 entrance exams in India";
                 }
            }
        })
        .state('login', {
            url: '/login',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
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
                    templateUrl: 'header.html',
                    
                },
                'body':{
                    templateUrl: 'p1.html',
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
                    templateUrl: 'header.html',
                    
                },
                'body':{
                    templateUrl: 'p2.html',
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
                    templateUrl: 'header.html',
                    
                },
                'body':{
                    templateUrl: 'p3.html',
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
            url: '/stream/:categoryName/:subCategoryName/:cityName',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
                },
                'body':{
                    templateUrl: 'p4.html',
                    controller: 'p4Controller',
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
                suggestedblogs: ['blogpostService','$stateParams',
                    function(blogpostService,$stateParams){
                    return blogpostService.suggestedblogs($stateParams.subCategoryName);
                }],
                
                
                
            }
        })
        .state('showCoaching', {
            url: '/stream/:categoryName/:subCategoryName/:cityName/:coachingId',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
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
                
                
            }
        })
        .state('showGroup', {
            url: '/group/:categoryName/:subCategoryName/:cityName/:groupName',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
                },
                'body':{
                    templateUrl: 'p5.html',
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
                thisGroupResults: ['resultService','$stateParams',
                    function(resultService,$stateParams) {
                    var groupCity = {
                        groupName: $stateParams.groupName,
                        cityName: $stateParams.cityName
                        
                    };
                    return resultService.groupResults(groupCity);
                }],
                bootstrapAffix: ['$ocLazyLoad', function($ocLazyLoad) {
                     return $ocLazyLoad.load(['bootstrapAffix'], {serie: true});
                }],
                
                
                
            }
        })
        .state('claim', {
            url: '/claim/:coachingId',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
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
                loadHandsontable: ['$ocLazyLoad', function($ocLazyLoad) {
                     return $ocLazyLoad.load(['ngHandsontable'], {serie: true});
                }],
                    
                ngFileUpload: ['$ocLazyLoad', function($ocLazyLoad) {
                     return $ocLazyLoad.load(['ngFileUpload'], {serie: true});
                }],
                bootstrapAffix: ['$ocLazyLoad', function($ocLazyLoad) {
                     return $ocLazyLoad.load(['bootstrapAffix'], {serie: true});
                }],
                
            }
        })
        .state('offers', {
            url: '/ebinternal/partner/:coachingId/offers',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
                },
                'body':{
                    templateUrl: 'offers.html',
                    controller: 'offersController',
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
                offersList: ['offerService','$stateParams',
                    function(offerService,$stateParams) {  
                    return offerService.getProviderOffers($stateParams.coachingId);
                }],
                couponsList: ['couponService',
                    function(couponService) {  
                    return couponService.getAllCodes();
                }],
                thisGroupInfo: ['targetStudyProviderService','$stateParams',
                    function(targetStudyProviderService,$stateParams) {  
                    return targetStudyProviderService.getGroupInfo($stateParams.coachingId);
                }],
                loadHandsontable: ['$ocLazyLoad', function($ocLazyLoad) {
                     return $ocLazyLoad.load(['ngHandsontable'], {serie: true});
                }],
                
                
                
            }
        })
        .state('verifyClaim', {
            url: '/verifyClaim/:coachingId',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
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
                
                
            }
        })
        .state('socialLogin', {
            url: '/ebinternal/socialLogin',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
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
                
                
            }
        })
        .state('contacts', {
            url: '/ebinternal/contacts',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
                },
                'body':{
                    templateUrl: 'contacts.html',
                    controller: 'contactsController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                contactsSummary: ['targetStudyProviderService',
                    function(targetStudyProviderService) {
                    return targetStudyProviderService.contacts();
                }],
                
                
            }
        })
        .state('charting', {
            url: '/ebinternal/charting',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
                },
                'body':{
                    templateUrl: 'charting.html',
                    controller: 'chartingController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                viewSummary: ['viewService',
                    function(viewService) {
                    return viewService.dailySummary();
                }],
                viewHourlyHeatmap: ['viewService',
                    function(viewService) {
                    return viewService.hourlyHeatmap();
                }],
                userSummary: ['UserService',
                    function(UserService) {
                    return UserService.dailySummary();
                }],
                userHourlyHeatmap: ['UserService',
                    function(UserService) {
                    return UserService.hourlyHeatmap();
                }],
                providerSummary: ['targetStudyProviderService',
                    function(targetStudyProviderService) {
                    return targetStudyProviderService.dailySummary();
                }],
                reviewSummary: ['reviewService',
                    function(reviewService) {
                    return reviewService.dailySummary();
                }],
                loadCharting: ['$ocLazyLoad', function($ocLazyLoad) {
                     return $ocLazyLoad.load(['charting'], {serie: true});
                }],
                
            }
        })
        .state('activeUsers', {
            url: '/ebinternal/activeUsers/:userId',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
                },
                'body':{
                    templateUrl: 'activeUsers.html',
                    controller: 'activeUsersController',
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
                activeUsers: ['UserService',
                    function(UserService) {   
                    return UserService.activeUsers(7);
                }],
                
                
            }
        })
        .state('allTests', {
            url: '/ebinternal/allTests/:userId',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
                },
                'body':{
                    templateUrl: 'allTests.html',
                    controller: 'allTestsController',
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
                examList: ['ExamService',
                    function(ExamService){
                    return ExamService.getExams();
                }],
                testList: ['testService',
                    function(testService){
                    return testService.getTests();
                }]
            }
        })
        .state('scheduleQAD', {
            url: '/ebinternal/scheduleQAD/:userId',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
                },
                'body':{
                    templateUrl: 'scheduleQAD.html',
                    controller: 'scheduleQADController',
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
                allPages: ['socialMediaCredentialService',
                    function(socialMediaCredentialService){
                    return socialMediaCredentialService.getSocialMediaCredentials();
                }],
                examList: ['ExamService',
                    function(ExamService){
                    return ExamService.getExams();
                }],
                streamList: ['StreamService',
                    function(StreamService){
                    return StreamService.getStreams();
                }],
                
            }
        })
        .state('aroundme', {
            url: '/aroundme',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
                },
                'body':{
                    templateUrl: 'aroundme.html',
                    controller: 'aroundmeController',
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
                }]
                
            }
        
            
        })
        .state('postBlog', {
            url: '/ebinternal/postBlog/:userId',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
                },
                'body':{
                    templateUrl: 'postBlog.html',
                    controller: 'postBlogController',
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
                allBloggers: ['UserService',
                    function(UserService){
                    return UserService.allBloggers();
                }],
                userBlogs: ['blogpostService', '$stateParams',
                    function(blogpostService, $stateParams) {   
                    return blogpostService.getUserBlogposts($stateParams.userId);
                }],
                allBlogsUpvotesCount: ['upvoteService',
                    function(upvoteService) {
                    return upvoteService.allBlogsUpvotesCount();
                }],
                mediumEditor: ['$ocLazyLoad', function($ocLazyLoad) {
                     return $ocLazyLoad.load(['mediumEditor'], {serie: true});
                }],
                ngFileUpload: ['$ocLazyLoad', function($ocLazyLoad) {
                     return $ocLazyLoad.load(['ngFileUpload'], {serie: true});
                }],
                
            }
        })
        .state('allOffers', {
            url: '/ebinternal/allOffers',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
                },
                'body':{
                    templateUrl: 'allOffers.html',
                    controller: 'allOffersController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                allOffers: ['offerService', '$stateParams',
                    function(offerService,$stateParams){
                    return offerService.getOffers();
                }],
                
                
            }
        })
        .state('allreviews', {
            url: '/ebinternal/allreviews',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
                },
                'body':{
                    templateUrl: 'allreviews.html',
                    controller: 'allreviewsController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                allReviews: ['reviewService',
                    function(allreviews) {   
                    return allreviews.getreviews();
                }],
                
                
            }
        })
        .state('extractEmails', {
            url: '/ebinternal/extractEmails',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
                },
                'body':{
                    templateUrl: 'extractEmails.html',
                    controller: 'extractEmailsController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            }
        })
        .state('coachingGroupSummary', {
            url: '/ebinternal/coachingGroupSummary',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
                },
                'body':{
                    templateUrl: 'coachingGroupSummary.html',
                    controller: 'coachingGroupSummaryController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                groupSummary: ['targetStudyProviderService',
                    function(targetStudyProviderService){
                    return targetStudyProviderService.groupSummaryService();
                }],
                examList: ['ExamService',
                    function(ExamService){
                    return ExamService.getExams();
                }],
                streamList: ['StreamService',
                    function(StreamService){
                    return StreamService.getStreams();
                }],
            }
        })
        .state('rankerswall', {
            url: '/rankerswall/:examName/:year',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
                },
                'body':{
                    templateUrl: 'rankerswall.html',
                    controller: 'rankerswallController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                thisExam: ['ExamService','$stateParams',
                    function(ExamService,$stateParams){
                    return ExamService.getExamByName($stateParams.examName);
                }],
                allResults: ['targetStudyProviderService','$stateParams',
                    function(targetStudyProviderService, $stateParams) {   
                    return targetStudyProviderService.allResults($stateParams.examName);
                }],
                
                
            }
        })
        .state('search', {
            url: '/ebinternal/search',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
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
                
                
            }
        })
        .state('suggestCoaching', {
            url: '/ebinternal/user/:userId/suggestCoaching',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
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
                
                
            }
        })
        .state('coachingGroup', {
            url: '/ebinternal/user/:userId/coachingGroup',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
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
                thisuser: ['UserService', '$stateParams',
                    function(UserService,$stateParams){
                    return UserService.getUser($stateParams.userId);
                }],
                examList: ['ExamService',
                    function(ExamService){
                    return ExamService.getExams();
                }],
                streamList: ['StreamService',
                    function(StreamService){
                    return StreamService.getStreams();
                }],
                loadHandsontable: ['$ocLazyLoad', function($ocLazyLoad) {
                     return $ocLazyLoad.load(['ngHandsontable'], {serie: true});
                }],
                
            }
        })
        .state('review', {
            url: '/review',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
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
                streamList: ['StreamService',
                    function(StreamService){
                    return StreamService.getStreams();
                }],
                examList: ['ExamService',
                    function(ExamService){
                    return ExamService.getExams();
                }],
                
                
            }
        })
        .state('reviewed', {
            url: '/ebinternal/user/:userId/reviewed',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
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
                thisuser: ['UserService', '$stateParams',
                    function(UserService,$stateParams){
                    return UserService.getUser($stateParams.userId);
                }],
                activeOffers: ['offerService', '$stateParams',
                    function(offerService,$stateParams){
                    return offerService.getActiveOffersMedium();
                }],
               
                thisuserReviewed: ['reviewService', '$stateParams',
                    function(reviewService, $stateParams){
                    return reviewService.getuserReviews($stateParams.userId);
                }],
                
                
            }
        })
        .state('addedInstitutes', {
            url: '/ebinternal/user/:userId/addedInstitutes',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
                },
                'body':{
                    templateUrl: 'addedInstitutes.html',
                    controller: 'addedInstitutesController',
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
                ebteam: ['UserService',
                    function(UserService){
                    return UserService.getEBTeam();
                }],
                addedInstitutes: ['UserService', '$stateParams',
                    function(UserService,$stateParams){
                    return UserService.getAddedInstitutes($stateParams.userId);
                }],
                
            }
        })
        .state('addedQuestions', {
            url: '/ebinternal/user/:userId/addedQuestions',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
                },
                'body':{
                    templateUrl: 'addedQuestions.html',
                    controller: 'addedQuestionsController',
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
                ebteam: ['UserService',
                    function(UserService){
                    return UserService.getEBTeam();
                }],
                addedQuestions: ['UserService', '$stateParams',
                    function(UserService,$stateParams){
                    return UserService.getAddedQuestions($stateParams.userId);
                }],
                examList: ['ExamService',
                    function(ExamService){
                    return ExamService.getExams();
                }],
            }
        })
        .state('blog', {
            url: '/blog',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
                },
                'body':{
                    templateUrl: 'blog.html',
                    controller: 'blogController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                allBlogs: ['blogpostService',
                    function(blogpostService) {   
                    return blogpostService.getblogs();
                }],
                allBlogsUpvotesCount: ['upvoteService',
                    function(upvoteService) {
                    return upvoteService.allBlogsUpvotesCount();
                }],
                
                
            }
        })
        .state('showblog', {
            url: '/blogpost/:blogpostSlug',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
                },
                'body':{
                    templateUrl: 'showblog.html',
                    controller: 'showblogController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                thisblog: ['blogpostService', '$stateParams',
                    function(blogpostService,$stateParams){
                    return blogpostService.getblogpostFromSlug($stateParams.blogpostSlug);
                }],
                thisblogComments: ['commentService', '$stateParams',
                    function(commentService,$stateParams){
                    return commentService.blogpostComments($stateParams.blogpostSlug);
                }],
                upvoteCount: ['upvoteService','$stateParams',
                    function(upvoteService,$stateParams) {
                    return upvoteService.blogpostUpvoteCount($stateParams.blogpostSlug);
                }],
                
                
            }
        })
        .state('editblog', {
            url: '/ebinternal/editblog/:blogpostId',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
                },
                'body':{
                    templateUrl: 'editblog.html',
                    controller: 'editblogController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                thisblog: ['blogpostService', '$stateParams',
                    function(blogpostService,$stateParams){
                    return blogpostService.getblogpost($stateParams.blogpostId);
                }],
                allBloggers: ['UserService',
                    function(UserService){
                    return UserService.allBloggers();
                }],
                /*
                examList: ['ExamService',
                    function(ExamService){
                    return ExamService.getExams();
                }],
                streamList: ['StreamService',
                    function(StreamService){
                    return StreamService.getStreams();
                }],
                allTags: ['blogTagService',
                    function(blogTagService){
                    return blogTagService.getblogTags();
                }],
                */
                mediumEditor: ['$ocLazyLoad', function($ocLazyLoad) {
                     return $ocLazyLoad.load(['mediumEditor'], {serie: true});
                }],
                ngFileUpload: ['$ocLazyLoad', function($ocLazyLoad) {
                     return $ocLazyLoad.load(['ngFileUpload'], {serie: true});
                }],
            }
        })
        .state('availOffer', {
            url: '/ebinternal/user/:userId/:reviewId/availoffer',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
                },
                'body':{
                    templateUrl: 'availOffer.html',
                    controller: 'availOfferController',
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
                activeOfferInstitutes: ['offerService',
                    function(offerService){
                    return offerService.getActiveOffersMedium();
                }],
                activeCoupons: ['couponService',
                    function(couponService){
                    return couponService.getOneOfEachActiveCoupon();
                }],
                thisReview: ['reviewService', '$stateParams',
                    function(reviewService, $stateParams){
                    return reviewService.getreview($stateParams.reviewId);
                }],
                
                
            }
        })
        .state('thankyou', {
            url: '/thankyou',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
                },
                'body':{
                    templateUrl: 'thankyou.html',
                    controller: 'thankyouController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            }
        })
        .state('error', {
            url: '/ebinternal/error',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
                },
                'body':{
                    templateUrl: 'error.html',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            }
        })
        .state('sandbox2', {
            url: '/ebinternal/master/:masterId/sandbox2/:cityName',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
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
                
                
            }
        })
        .state('eligibility', {
            url: '/ebinternal/user/:userId/eligibility',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
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
                    
                },
                'body':{
                    templateUrl: 'privacyPolicy.html',
                    
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            }
        })
        .state('why', {
            url: '/ebinternal/why',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
                },
                'body':{
                    templateUrl: 'p0.html',
                    controller: 'whyReviewController'
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            }
        })
        .state('about', {
            url: '/ebinternal/about',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
                },
                'body':{
                    templateUrl: 'aboutus.html',
                    
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            }
        })
        .state('calendar', {
            url: '/ebinternal/calendar',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
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
        .state('sendEmail', {
            url: '/ebinternal/user/:userId/sendEmail',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
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
        .state('userMarketing', {
            url: '/ebinternal/user/:userId/userMarketing',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
                },
                'body':{
                    templateUrl: 'userMarketing.html',
                    controller: 'userMarketingController',
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
                allUsers: ['UserService',
                    function(UserService){
                    return UserService.getUsers();
                }],
                user: function() { return {}; }
            }
        })
        .state('userSurvey', {
            url: '/ebinternal/user/:userId/userSurvey',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
                },
                'body':{
                    templateUrl: 'userSurvey.html',
                    controller: 'userSurveyController',
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
                allUsers: ['UserService',
                    function(UserService){
                    return UserService.getUsers();
                }],
                user: function() { return {}; }
            }
        })
        .state('providers', {
            url: '/ebinternal/coaching/database2/:city',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
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
                
            }   
        })
        .state('editTargetStudyProvider', {
            url: '/ebinternal/edit/database1/:coachingId',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
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
                ngFileUpload: ['$ocLazyLoad', function($ocLazyLoad) {
                     return $ocLazyLoad.load(['ngFileUpload'], {serie: true});
                }],
                
            }
        })
        .state('providersWithAreas', {
            url: '/ebinternal/coaching/providersWithAreas',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
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
                
            }
        })
        .state('targetStudyProviders', {
            url: '/ebinternal/coaching/database1/:city',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
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
                targetStudyCities: ['targetStudyProviderService','$stateParams',
                    function(targetStudyProviderService) {
                    return targetStudyProviderService.getCities();
                }]
                
            }
        })
        .state('master-dashboard', {
            url: '/ebinternal/master/:masterId/dashboard',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
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
                reviewsCount: ['reviewService',
                    function(reviewService) {
                    return reviewService.reviewsCount();
                }],
                couponsCount: ['couponService',
                    function(couponService) {
                    return couponService.couponsCount();
                }],
                issuedcouponsCount: ['couponService',
                    function(couponService) {
                    return couponService.issuedcouponsCount();
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
                rateInstituteList: ['rateInstituteService',
                    function(rateInstituteService) {
                    return rateInstituteService.getrateInstitutes();
                }],
                verifiedCount: ['toverifyciService',
                    function(toverifyciService) {
                    return toverifyciService.verifiedCount();
                }],
            }
        })
        .state('partner-dashboard', {
            url: '/ebinternal/partner/:userId/dashboard',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
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
                
            }
        })
        .state('shortlisted', {
            url: '/ebinternal/user/:userId/shortlisted',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
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
            url: '/ebinternal/user/:userId/viewed',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
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
            url: '/ebinternal/user/:userId/filled',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
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
            url: '/ebinternal/user/:userId/assigned',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
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
                        
                }],
                
                user: function() { return {}; }
            }
        })
        .state('assignedToVerify', {
            url: '/ebinternal/user/:userId/assignedToVerify',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
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
                        
                }],
                
                user: function() { return {}; }
            }
        })
        .state('assignedToRate', {
            url: '/ebinternal/user/:userId/assignedToRate',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
                },
                'body':{
                    templateUrl: 'assignedToRate.html',
                    controller: 'assignedToRateController',
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
                thisuserAssignedToRate: ['rateInstituteService', '$stateParams',
                    function(rateInstituteService,$stateParams){
                    return rateInstituteService.getuserrateInstitute($stateParams.userId);
                        
                }],
                
                user: function() { return {}; }
            }
        })
        .state('assignedToAddContactInfo', {
            url: '/ebinternal/user/:userId/assignedToAddContactInfo',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
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
                        
                }],
                
                user: function() { return {}; }
            }
        })
        .state('filledAll', {
            url: '/ebinternal/user/:userId/filledAll',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
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
            url: '/ebinternal/user/:userId/group',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
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
            url: '/ebinternal/user/:userId/profile',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
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
                ngFileUpload: ['$ocLazyLoad', function($ocLazyLoad) {
                     return $ocLazyLoad.load(['ngFileUpload'], {serie: true});
                }],
            }
        })
        .state('checkLogo', {
            url: '/ebinternal/user/:userId/checkLogo/:pageNumber/',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
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
        .state('addStream', {
            url: '/ebinternal/addStream',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
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
        .state('addOffer', {
            url: '/ebinternal/addOffer',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
                },
                'body':{
                    templateUrl: 'addOffer.html',
                    controller: 'addOfferController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                offersList: ['offerService',
                    function(offerService){
                    return offerService.getOffers();
                }],
                stream: function() { return {}; }
            }
        })
        .state('addLocation', {
            url: '/ebinternal/addLocation',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
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
                loadHandsontable: ['$ocLazyLoad', function($ocLazyLoad) {
                     return $ocLazyLoad.load(['ngHandsontable'], {serie: true});
                }],
            }
        })
        .state('addMediaTag', {
            url: '/ebinternal/addMediaTag',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
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
                loadHandsontable: ['$ocLazyLoad', function($ocLazyLoad) {
                     return $ocLazyLoad.load(['ngHandsontable'], {serie: true});
                }],
            }
        })
        .state('addGroup', {
            url: '/ebinternal/addGroup',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
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
                loadHandsontable: ['$ocLazyLoad', function($ocLazyLoad) {
                     return $ocLazyLoad.load(['ngHandsontable'], {serie: true});
                }],
            }
        })
        .state('addSendGridCredential', {
            url: '/ebinternal/addSendGridCredential',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
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
            url: '/ebinternal/addAwsCredential',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
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
        .state('addSubscriber', {
            url: '/ebinternal/addSubscriber',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
                },
                'body':{
                    templateUrl: 'addSubscriber.html',
                    controller: 'addSubscriberController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                subscribersList: ['subscriberService',
                    function(subscriberService){
                    return subscriberService.getSubscribers();
                }],
                loadHandsontable: ['$ocLazyLoad', function($ocLazyLoad) {
                     return $ocLazyLoad.load(['ngHandsontable'], {serie: true});
                }],
            }
        })
        .state('addExam', {
            url: '/ebinternal/addExam',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
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
                ngFileUpload: ['$ocLazyLoad', function($ocLazyLoad) {
                     return $ocLazyLoad.load(['ngFileUpload'], {serie: true});
                }],
            }
        })
        .state('editExam', {
            url: '/ebinternal/editExam/:examId',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
                },
                'body':{
                    templateUrl: 'editExam.html',
                    controller: 'editExamController',
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
                streamList: ['StreamService',
                    function(StreamService){
                    return StreamService.getStreams();
                }],
                testList: ['testService', '$stateParams',
                    function(testService, $stateParams){
                    return testService.getExamTests($stateParams.examId);
                }],
                ngFileUpload: ['$ocLazyLoad', function($ocLazyLoad) {
                     return $ocLazyLoad.load(['ngFileUpload'], {serie: true});
                }],
            }
        })
        .state('exam', {
            url: '/ebinternal/exam/:examName',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
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
                    return ExamService.getExamByName($stateParams.examName);    
                }],
                testList: ['testService', '$stateParams',
                    function(testService, $stateParams){
                    return testService.getExamTestsByExamName($stateParams.examName);
                }],
                loadHandsontable: ['$ocLazyLoad', function($ocLazyLoad) {
                     return $ocLazyLoad.load(['angularTimeline'], {serie: true});
                }],
                ngFileUpload: ['$ocLazyLoad', function($ocLazyLoad) {
                     return $ocLazyLoad.load(['ngFileUpload'], {serie: true});
                }],
            }
        })
        .state('addQuestion', {
            url: '/ebinternal/addQuestion/:testId',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
                },
                'body':{
                    templateUrl: 'addQuestion.html',
                    controller: 'addQuestionController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                thisTest: ['testService','$stateParams',
                    function(testService, $stateParams){
                    return testService.getTest($stateParams.testId);
                }],
                thisTestQuestions: ['questionService','$stateParams',
                    function(questionService, $stateParams){
                    return questionService.getTestQuestions($stateParams.testId);
                }],
                ngFileUpload: ['$ocLazyLoad', function($ocLazyLoad) {
                     return $ocLazyLoad.load(['ngFileUpload'], {serie: true});
                }],
            }
        })
        .state('addEligibility', {
            url: '/ebinternal/addEligibility',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
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
                loadHandsontable: ['$ocLazyLoad', function($ocLazyLoad) {
                     return $ocLazyLoad.load(['ngHandsontable'], {serie: true});
                }],
            }
        })
        .state('addMaster', {
            url: '/ebinternal/master/:masterId/addMaster',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
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
        .state('manageUsers', {
            url: '/ebinternal/master/:masterId/manageUsers',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
                },
                'body':{
                    templateUrl: 'manageUsers.html',
                    controller: 'manageUsersController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
            }
        })
        .state('addInstitute', {
            url: '/ebinternal/master/:userId/addInstitute',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
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
                examList: ['ExamService',
                    function(ExamService){
                    return ExamService.getExams();
                }],
                streamList: ['StreamService',
                    function(StreamService){
                    return StreamService.getStreams();
                }],
                loadHandsontable: ['$ocLazyLoad', function($ocLazyLoad) {
                     return $ocLazyLoad.load(['ngHandsontable'], {serie: true});
                }],
                
            }
        })
        .state('bulkDisable', {
            url: '/ebinternal/master/:userId/bulkDisable',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
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
            url: '/ebinternal/user/:userId/addIntern',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
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
            url: '/ebinternal/sitemap',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
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
        .state('verify', {
            url: '/ebinternal/verify/:userId/',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    
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
        });
        
            //$locationProvider.html5Mode(true).hashPrefix('#');
            $locationProvider.html5Mode(true);
            //$locationProvider.hashPrefix("!");
        });
        
    })();

exambazaar.run(function(GAuth, GApi, GData, $rootScope,$mdDialog, $location, $window, $transitions) {
    $rootScope.navBarTitle = 'Exambazaar: Exclusive Deals and Videos for test preparation';
    $rootScope.message = '';
    $rootScope.imageUrl = '';
    //moment.tz.link("Asia/Calcutta|Asia/Kolkata");
    $rootScope.today = moment().toDate();
    moment.tz.add("Asia/Calcutta|HMT BURT IST IST|-5R.k -6u -5u -6u|01232|-18LFR.k 1unn.k HB0 7zX0");
    moment.tz.link("Asia/Calcutta|Asia/Kolkata");
    // Logout function is available in any pages
    /*$rootScope.logout = function(){
      //$rootScope.message = 'Logged out.';
      $http.post('/logout');
    };*/
    $rootScope.$on('$stateChangeSuccess', function() {
        
    });
    $transitions.onSuccess({}, function() {
        console.log("statechange success");
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        //$mdDialog.hide();
        console.log("SEO Title: " + $rootScope.pageTitle);
        console.log("SEO Description: " + $rootScope.pageDescription);
        $rootScope.searchMode = false;
        console.log("SEO Keywords: " +  $rootScope.pageKeywords);
        console.log("FB Page URL: " +  $rootScope.pageURL);
        console.log("FB Page Image: " +  $rootScope.pageImage);
        
    });
    
    var currURL = $location.absUrl();
    $rootScope.pageURL = currURL;
    $rootScope.pageImage = 'https://www.exambazaar.com/images/logo/cover.png';
    
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.9&appId=1236747093103286";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    
    
    
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