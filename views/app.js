var exambazaar = angular.module('exambazaar', ['ui.router','ngMaterial','ngMessages','ngTable','ngAria','duScroll','material.svgAssetsCache','angular-loading-bar', 'ngAnimate','ngCookies','angularMoment','materialCalendar','ngSanitize','angularFileUpload','matchMedia','ngHandsontable','geolocation','ngGeolocation']);
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
    function landingController($scope,$window,InstituteService,$http,$state, $document,$rootScope,OTPService,$cookies) {
        $rootScope.navBarTitle = 'exambazaar';
        $http.defaults.headers.post["Content-Type"] = "application/json";
        if($cookies.getObject('location')){
            $scope.location = $cookies.getObject('location'); 
        }
        
        $scope.login = function(){
            
            $http.post('/login', {
              mobile: $scope.login.mobile,
              password: $scope.login.password,
            })
            .success(function(user){
                $rootScope.user = user;
                
                user.verified="true";
                if(user.verified=="true"){
                    if(user.userType==='Student'){
                    $rootScope.message ='';
                    $state.go('student', {studentId: user._student});
                    }
                    if(user.userType==='Teacher'){
                        $rootScope.message ='';
                        $state.go('teacher', {teacherId: user._teacher});
                    }
                    if(user.userType==='Admin'){
                        $rootScope.message ='';
                        $state.go('admin', {adminId: user._admin});
                    }
                    if(user.userType==='Master'){
                        $rootScope.message ='';
                        $state.go('master-dashboard', {masterId: user._master});
                    }
                }else{
                    $state.go('verify', {userId: user._id});
                }
            })
            .error(function(){
              // Error: authentication failed
            
              $scope.login.password="";
              $rootScope.message = 'Incorrect mobile or password';
              $state.go('main');
            });
          };
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
        $scope.categories = [
            {
            name: "School",
            sub: "NTSE, NSE, KVPY, IMO, NSO and more",
            subcategory:["NTSE", "NSE", "KVPY", "IMO", "NSO"]
            },
            {
            name: "Engineering",
            sub: "JEE Main, JEE Advanced, BITSAT, NATA, GATE and more",
            subcategory:["JEE Main", "JEE Advanced", "BITSAT", "NATA", "GATE"]
            },
            {
            name: "Medical",
            sub: "AIIMS, NEET UG, JIPMER, AFMC, PGIMER and more",
            subcategory:["AIIMS", "NEET UG", "JIPMER", "AFMC", "PGIMER"]
            
            },
            {
            name: "MBA",
            sub: "CAT, XAT, CMAT, SNAP and more",
            subcategory:["CAT", "XAT", "CMAT", "SNAP"]
            },
            {
            name: "Law",
            sub: "CLAT, AILET, LSAT, CBS and more",
            subcategory:["CLAT", "AILET", "LSAT", "CBS"]
            },
            {
            name: "Foreign Education",
            sub: "IELTS, GRE, GMAT, SAT, TOEFL and more",
            subcategory:["IELTS", "GRE", "GMAT", "SAT", "TOEFL"]
            },
            {
            name: "Civil Services",
            sub: "IPS Ltd. Competitive Exam, UPSC CAPF Exam, IES/ISS Exam, IFS Exam, SCRA and more",
            subcategory:["IPS Ltd. Competitive Exam", "UPSC CAPF Exam", "IES/ISS Exam", "IFS Exam", "SCRA"]
            },
            {
            name: "SPSC",
            sub: "SSC CPO (S.I) Exam, SSC CGLE, SSC JE, SSC CHSL Exam, SSC CMLE and more",
            subcategory:["SSC CPO (S.I) Exam", "SSC CGLE", "SSC JE", "SSC CHSL Exam", "SSC CMLE"]
            },
            {
            name: "Defense",
            sub: "CDS Exam, NDA Exam, AFCAT, I.A.F. Exam, I.N.A Exam and more",
            subcategory:["CDS Exam", "NDA Exam", "AFCAT", "I.A.F. Exam", "I.N.A Exam"]
            },
            {
            name: "Insurance",
            sub: "IRDA Exam, G.I.C Exam, LIC, L.I.C D.O and more",
            subcategory:["IRDA Exam", "G.I.C Exam", "LIC", "L.I.C D.O"]
            },
            {
            name: "CA",
            sub: "CA CPT, CA IPCC, CA Final, CS Foundation Exam and more",
            subcategory:["CA CPT", "CA IPCC", "CA Final", "CS Foundation Exam"]
            },
            {
            name: "Bank",
            sub: "Bank Clerical Exam, Bank PO Exam, RBI Exam, SBI PO Exam, IBPS Clerk CWE and more",
            subcategory:["Bank Clerical Exam", "Bank PO Exam", "RBI Exam", "SBI PO Exam", "IBPS Clerk CWE"]
            },
        ];
        /*
            
            {
            name: "Educational",
            sub: "UGC NET, SET, CTET, B.Ed. Entrance, ARS NET and more"
            },
        */
    };
        
    exambazaar.service('InstituteService', ['$http', function($http) {
        this.saveInstitute = function(institute) {
            return $http.post('/api/institutes/save', institute);
        };
        this.getInstitute = function(instituteId) {
            return $http.get('/api/institutes/edit/'+instituteId, {instituteId: instituteId});
        };
        this.getBatchInstitute = function(instituteId) {
            return $http.get('/api/institutes/editBatch/'+instituteId, {instituteId: instituteId});
        };
        this.getBatchNames = function(instituteId) {
            return $http.get('/api/institutes/batchNames/'+instituteId, {instituteId: instituteId});
        };
        this.getTeacherInstitute = function(instituteId) {
            return $http.get('/api/institutes/editTeacher/'+instituteId, {instituteId: instituteId});
        };
        this.getStudentInstitute = function(instituteId) {
            return $http.get('/api/institutes/editStudent/'+instituteId, {instituteId: instituteId});
        };
        this.getInstitutes = function() {
            return $http.get('/api/institutes');
        };
        this.saveFeeStructure = function(feeStructure){
            return $http.post('/api/institutes/save/feeStructure', feeStructure);
        };
        this.getFeeStructure = function(instituteId){
            return $http.post('/api/institutes/edit/feeStructure'+instituteId, {instituteId: instituteId});
        };
        this.saveCalendar = function(instituteCalendar){
            return $http.post('/api/institutes/save/calendar', instituteCalendar);
        };
        this.manageInstituteStudents = function() {
            return $http.get('/api/institutes/manageInstituteStudents');
        };
    }]);
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
        this.getInvalidUsers = function() {
            return $http.get('/api/users/invalidusers');
        };
        this.updatePassword = function(userPassword) {
            return $http.post('/api/users/updatePassword',userPassword);
        };
        this.mergeUsers = function() {
            
            return $http.get('/api/users/mergeUsers');
        };
    }]);
    
    exambazaar.service('TeacherService', ['$http', function($http) {
        this.saveTeacher = function(teacher) {
            return $http.post('/api/teachers/save', teacher);
        };
        this.saveTeachers = function(teachers) {
            return $http.post('/api/teachers/bulksave', teachers);
        };
        this.getTeacher = function(teacherId) {
            return $http.get('/api/teachers/edit/'+teacherId, {teacherId: teacherId});
        };
        this.getBasicTeacher = function(teacherId) {
            return $http.get('/api/teachers/editBasic/'+teacherId, {teacherId: teacherId});
        };
        this.getTeachers = function() {
            return $http.get('/api/teachers');
        };
        this.getTeachersCount = function() {
            return $http.get('/api/teachers/count');
        };
        this.invalidTeachers = function() {
            return $http.get('/api/teachers/invalidTeachers');
        };
        
    }]);
    exambazaar.service('AdminService', ['$http', function($http) {
        this.saveAdmin = function(admin) {
            return $http.post('/api/admins/save', admin);
        };
        this.getAdmin = function(adminId) {
            return $http.get('/api/admins/edit/'+adminId, {adminId: adminId});
        };
        this.getAdmins = function() {
            return $http.get('/api/admins');
        };
        this.getAdminsCount = function() {
            return $http.get('/api/admins/count');
        };
    }]);
    exambazaar.service('MasterService', ['$http', function($http) {
        this.saveMaster = function(master) {
            return $http.post('/api/masters/save', master);
        };
        this.getUrls = function(urls) {
            return $http.post('/api/masters/urls/',urls);
        };
        this.addIntern = function(intern) {
            return $http.post('/api/masters/addIntern/',intern);
        };
        
        this.getUrls2 = function(urls) {
            return $http.post('/api/masters/urls2/',urls);
        };
        
        this.getTargetstudyurls = function(urls) {
            return $http.post('/api/masters/targetstudyurls/',urls);
        };
        this.getAllExams = function() {
            return $http.get('/api/masters/getAllExams/');
        };
        this.getTargetstudyurlsList = function() {
            return $http.get('/api/masters/targetstudyurlsList/');
        };
        this.getclusterUrls = function() {
            return $http.get('/api/masters/clusterUrls/');
        };
        this.getMaster = function(masterId) {
            return $http.get('/api/masters/edit/'+masterId, {masterId: masterId});
        };
        this.getMasters = function() {
            return $http.get('/api/masters');
        };
        this.getMastersCount = function() {
            return $http.get('/api/masters/count');
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
        
    exambazaar.service('globalSubjectService', ['$http', function($http) {
        this.saveglobalSubject = function(globalSubject) {
            return $http.post('/api/globalSubjects/save', globalSubject);
        };
        this.getglobalSubject = function(globalSubjectId) {
            return $http.get('/api/globalSubjects/edit/'+globalSubjectId, {globalSubjectId: globalSubjectId});
        };
        this.getglobalSubjects = function() {
            return $http.get('/api/globalSubjects');
        };
    }]);
        
    exambazaar.service('globalFeeItemService', ['$http', function($http) {
        this.saveglobalFeeItem = function(globalFeeItem) {
            return $http.post('/api/globalFeeItems/save', globalFeeItem);
        };
        this.getglobalFeeItem = function(globalFeeItemId) {
            return $http.get('/api/globalFeeItems/edit/'+globalFeeItemId, {globalFeeItemId: globalFeeItemId});
        };
        this.getglobalFeeItems = function() {
            return $http.get('/api/globalFeeItems');
        };
    }]);
    
    exambazaar.service('NotificationService', ['$http', function($http) {
        this.markRead = function(notification) {
            return $http.post('/api/notifications/markRead', notification);
        };
    }]);
        
    exambazaar.service('TransportVehicleService', ['$http', function($http) {
        this.saveTransportVehicle = function(transportVehicle) {
            return $http.post('/api/transportVehicles/save', transportVehicle);
        };
        this.getTransportVehicle = function(transportVehicleId) {
            return $http.get('/api/transportVehicles/edit/'+transportVehicleId, {transportVehicleId: transportVehicleId});
        };
        this.getTransportVehicles = function() {
            return $http.get('/api/transportVehicles');
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
    exambazaar.service('ParentService', ['$http', function($http) {
        this.saveParent = function(parent) {
            return $http.post('/api/parents/save', parent);
        };
        this.getParent = function(parentId) {
            return $http.get('/api/parents/edit/'+parentId, {parentId: parentId});
        };
        this.getParents = function() {
            return $http.get('/api/parents');
        };
        this.invalidParents = function() {
            return $http.get('/api/parents/invalidParents');
        };
        this.getParentsCount = function() {
            return $http.get('/api/parents/count');
        };
        
        
    }]);
    exambazaar.service('BatchService', ['$http', function($http) {
        this.saveBatch = function(batch) {
            return $http.post('/api/batches/save', batch);
        };
        this.saveBatches = function(batches) {
            return $http.post('/api/batches/bulksave', batches);
        };
        this.markAttendance = function(batchDayAttendance) {
            return $http.post('/api/batches/markAttendance', batchDayAttendance);
        };
        this.saveBatchClassTeachers = function(saveBatchClassTeachers) {
            return $http.post('/api/batches/saveBatchClassTeachers', saveBatchClassTeachers);
        };
        this.saveBatchSubjectTeachers = function(batchSubjectTeacherMapping){
            return $http.post('/api/batches/saveBatchSubjectTeachers', batchSubjectTeacherMapping);
        };
        this.getBatch = function(batchId) {
            return $http.get('/api/batches/edit/'+batchId, {batchId: batchId});
        };
        this.getBatchAttendanceDays = function(batchId) {
            return $http.get('/api/batches/attendance/'+batchId, {batchId: batchId});
        };
        this.getCalendar = function(batchId) {
            return $http.get('/api/batches/calendar/'+batchId, {batchId: batchId});
        };
        
        this.getBatches = function() {
            return $http.get('/api/batches');
        };
        this.manageBatchStudents = function() {
            return $http.get('/api/batches/manageBatchStudents');
        };
    }]);
    exambazaar.service('EmailService', ['$http', function($http) {
        this.sendEmail = function(email) {
            return $http.post('/api/emails/send', email);
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
    exambazaar.service('SubjectService', ['$http', function($http) {
        this.saveSubject = function(subject) {
            return $http.post('/api/subjects/add', subject);
        };
        this.getSubject = function(subjectId) {
            return $http.get('/api/subjects/edit/'+subjectId, {subjectId: subjectId});
        };
        this.getSubjects = function() {
            return $http.get('/api/subjects');
        };
    }]);
    exambazaar.service('ExamService', ['$http', function($http) {
        this.saveExam = function(exam) {
            return $http.post('/api/exams/add', exam);
        };
        this.getExam = function(examId) {
            return $http.get('/api/exams/edit/'+examId, {examId: examId});
        };
        this.getExams = function() {
            return $http.get('/api/exams');
        };
    }]);
    exambazaar.service('EvalService', ['$http', function($http) {
        this.saveEval = function(studentEval) {
            return $http.post('/api/evals/add', studentEval);
        };
        this.getEval = function(evalId) {
            return $http.get('/api/evals/edit/'+evalId, {evalId: evalId});
        };
        this.getEvalAnalytics = function(evalId) {
            return $http.get('/api/evals/analysis/'+evalId, {evalId: evalId});
        };
        this.getEvals = function(examId) {
            return $http.get('/api/evals/'+examId, {examId: examId});
        };
        this.saveExamEvaluations = function(studentEvals){
            return $http.post('/api/evals/bulksave/', studentEvals);
        }
    }]);
    exambazaar.controller("InstitutesController", 
        [ '$scope', 'institutesList', function($scope, institutesList){
            $scope.institutesList = institutesList.data;
    }]);
    exambazaar.controller("analyticsController", 
        [ '$scope', function($scope){
            
    }]);    
        
    exambazaar.controller("internshipController", 
        [ '$scope', 'FileUploader','MasterService',function($scope,FileUploader,MasterService){
            $scope.submitted = 0;
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
        
        
    exambazaar.controller("masterDashboardController", 
        [ '$scope','institutesList','studentsCount','teachersCount','parentsCount','adminsCount','mastersCount','usersCount','verifiedUsersCount', function($scope, institutesList,studentsCount,teachersCount,parentsCount,adminsCount,mastersCount,usersCount,verifiedUsersCount){
            $scope.institutesList = institutesList.data;
            $scope.studentsCount = studentsCount.data;
            $scope.teachersCount = teachersCount.data;
            $scope.parentsCount = parentsCount.data;
            $scope.adminsCount = adminsCount.data;
            $scope.mastersCount = mastersCount.data;
            $scope.usersCount = usersCount.data;
            $scope.verifiedUsersCount = verifiedUsersCount.data;
    }]);
    exambazaar.controller("manageBatchStudentsController", 
        [ '$scope', 'BatchService',function($scope,BatchService){
            BatchService.manageBatchStudents().success(function (data, status, headers) {
                    //$state.go($state.current, $stateParams, {reload: true, inherit: false});
                
                //$state.go('institute', {instituteId: $stateParams.instituteId});
                })
                .error(function (data, status, header, config) {
                    $scope.ServerResponse =  htmlDecode("Data: " + data +
                        "\n\n\n\nstatus: " + status +
                        "\n\n\n\nheaders: " + header +
                        "\n\n\n\nconfig: " + config);
                });
            
    }]);
    exambazaar.controller("manageInstituteStudentsController", 
        [ '$scope', 'InstituteService',function($scope,InstituteService){
            InstituteService.manageInstituteStudents().success(function (data, status, headers) {
                    //$state.go($state.current, $stateParams, {reload: true, inherit: false});
                
                //$state.go('institute', {instituteId: $stateParams.instituteId});
                })
                .error(function (data, status, header, config) {
                    $scope.ServerResponse =  htmlDecode("Data: " + data +
                        "\n\n\n\nstatus: " + status +
                        "\n\n\n\nheaders: " + header +
                        "\n\n\n\nconfig: " + config);
                });
            
    }]);
        
        
    
    exambazaar.controller("editSubjectTeachersCtrl", 
        [ '$scope', 'thisinstitute', 'BatchService','$http','thisglobalSubjects','$mdDialog',function($scope, thisinstitute,BatchService,$http,thisglobalSubjects,$mdDialog){
            $scope.institute = thisinstitute.data;
            $scope.batches = $scope.institute.batches;
            angular.forEach($scope.batches, function (batch) {
                batch.grade = parseFloat(batch.grade);
                
            });
            
            $scope.teachers = $scope.institute.teachers;
            $scope.subjects = thisglobalSubjects.data;
            
            $scope.batches.forEach(function(thisBatch, batchIndex){
                thisBatch.subjectTeachers = []; thisBatch.subjects.forEach(function(thisSubject, subjectIndex){
                   
                    var newItemNo = thisBatch.subjectTeachers.length+1;
               
                    var subjectNameMap = {
                        _id: thisSubject._globalSubject._id,
                        name: thisSubject._globalSubject.name
                    };
                   var subjectTeacherMap = {
                       id:newItemNo,
                       subject:subjectNameMap,
                       teacher:thisSubject._teacher._id
                       //secondTeacher: || ''

                   };
                    
                   if(thisSubject._secondTeacher != undefined){
                       
                       subjectTeacherMap.secondTeacher = thisSubject._secondTeacher._id;
                   } thisBatch.subjectTeachers.push(subjectTeacherMap);
                    
                });
            });
            var pushCurrentSubject = function(batch, currSubject) {
                var newItemNo = batch.subjectTeachers.length+1;
               
                var subjectNameMap = {
                    _id: currSubject._globalSubject,
                    name: currSubject._globalSubject.name
                };
               var subjectTeacherMap = {
                   id:newItemNo,
                   subject:subjectNameMap,
                   teacher:currSubject._teacher
                   
               }; batch.subjectTeachers.push(subjectTeacherMap);
            };
            
            $scope.showConfirm = function(ev, batch,subject) {
                if(subject.subject != undefined){
                    var confirm = $mdDialog.confirm()
                    .title('You are deleting ' + subject.subject.name +' for Batch ' + batch.name + '!')
                    .textContent('If you delete ' + subject.subject.name +' for Batch ' + batch.name + ', you will lose all exam results and subject related data.')
                    .ariaLabel('Lucky day')
                    .targetEvent(ev)
                    .ok('Confirm')
                    .cancel('Cancel');
                    $mdDialog.show(confirm).then(function() {
                      $scope.removeChoice(batch);
                    }, function() {
                      
                    });
                }else{
                    $scope.removeChoice(batch);
                }
                
              };
            
            $scope.addNewChoice = function(batch) {
                var newItemNo = batch.subjectTeachers.length+1;
                batch.subjectTeachers.push({'id':newItemNo});
            };
            $scope.removeChoice = function(batch) {
                var lastItem = batch.subjectTeachers.length-1;
                
                batch.subjectTeachers.splice(lastItem);
            };
            $scope.removeSecondTeacher= function(subject){
                subject.secondTeacher = null;
            }
            
            $scope.saveSubjectTeachers = function(){
                
                
                var batchSubjectTeacherMapping =[];
                for(var i = 0; i< $scope.batches.length; i++){
                    var thisbatchSubjectTeacher = {
                        batchId: $scope.batches[i]._id,
                        subjectTeachers: $scope.batches[i].subjectTeachers,
                    };
                    batchSubjectTeacherMapping.push(thisbatchSubjectTeacher);
                }
                
                BatchService.saveBatchSubjectTeachers(batchSubjectTeacherMapping).success(function (data, status, headers) {
                    //$state.go($state.current, $stateParams, {reload: true, inherit: false});
                
                //$state.go('institute', {instituteId: $stateParams.instituteId});
                })
                .error(function (data, status, header, config) {
                    $scope.ServerResponse =  htmlDecode("Data: " + data +
                        "\n\n\n\nstatus: " + status +
                        "\n\n\n\nheaders: " + header +
                        "\n\n\n\nconfig: " + config);
                });;  
            };
            
    }]);
    
    exambazaar.controller("editBatchesTeachersCtrl", 
        [ '$scope', 'thisinstitute', 'BatchService','$http',function($scope, thisinstitute,BatchService,$http){
            $scope.institute = thisinstitute.data;
            
            
            
            $scope.batches = $scope.institute.batches;
            angular.forEach($scope.batches, function (batch) {
                batch.grade = parseFloat(batch.grade);
            });
            
            $scope.teachers = $scope.institute.teachers;
            $scope.saveClassTeachers = function(){
                var batchClassTeacherMapping =[];
                for(var i = 0; i< $scope.batches.length; i++){
                    var thisbatchClassTeacher = {
                        batchId: $scope.batches[i]._id,
                        teacherId: $scope.batches[i].batchTeacher,
                    };
                    batchClassTeacherMapping.push(thisbatchClassTeacher);
                }
                
                var BatchMapping = {
                    batchClassTeacherMapping: batchClassTeacherMapping,
                    _institute: $scope.institute._id
                }
                BatchService.saveBatchClassTeachers(BatchMapping).success(function (data, status, headers) {
                    $state.go($state.current, $stateParams, {reload: true, inherit: false});
                
                //$state.go('institute', {instituteId: $stateParams.instituteId});
                })
                .error(function (data, status, header, config) {
                    $scope.ServerResponse =  htmlDecode("Data: " + data +
                        "\n\n\n\nstatus: " + status +
                        "\n\n\n\nheaders: " + header +
                        "\n\n\n\nconfig: " + config);
                });;  
            };
            
    }]);
    
    exambazaar.controller("bulkAddStudentsCtrl", 
        [ '$scope', 'StudentService','$stateParams','$state','$http','thisinstitute',function($scope, StudentService,$stateParams,$state,$http,thisinstitute){
            
            $scope.students = [];
            $scope.institute = thisinstitute.data;
            $scope.batches = $scope.institute.batches;
            $scope.batchId;
            $scope.showStatus = 1;
            $scope.addBulkStudents = function(){
                $scope.showStatus = 0;
                $scope.students.pop();
                $scope.students.pop();
                $scope.students.pop();
                $scope.students.pop();
                $scope.students.pop();
                var bulkadd = {
                    students: $scope.students,
                    institute: $stateParams.instituteId,
                    batch: $scope.thisbatch
                };
               
                StudentService.saveStudents(bulkadd).success(function (data, status, headers) {
                    //$state.go("main", {}, {reload: true});
                    $state.go('institute-students', {instituteId: $stateParams.instituteId},{reload: true});
                    })
                    .error(function (data, status, header, config) {
                        $scope.ServerResponse =  htmlDecode("Data: " + data +
                            "\n\n\n\nstatus: " + status +
                            "\n\n\n\nheaders: " + header +
                            "\n\n\n\nconfig: " + config);
                    });;  
            };
    }]);
    
    
    exambazaar.controller("bulkAddTeachersCtrl", 
        [ '$scope', 'TeacherService','$stateParams','$state','$http','thisinstitute',function($scope, TeacherService,$stateParams,$state,$http,thisinstitute){
            $scope.teachers = [];
            
            $scope.institute = thisinstitute.data;
            /*$scope.teachers = [
              {
                "mobile": 9829685919,
                "name": "Gaurav Parashar",
                "gender": 'Male',
                "dob": '04/29/1989',
                "address": "D-240A, Pipalda House, Opp. SBBJ, Behind Collecorate, Banipark, Jaipur"
              },
              //more items go here
            ];*/
            $scope.addBulkTeachers = function(){
                $scope.teachers.pop();
                $scope.teachers.pop();
                $scope.teachers.pop();
                $scope.teachers.pop();
                $scope.teachers.pop();
                var bulkadd = {
                    teachers: $scope.teachers,
                    institute: $stateParams.instituteId
                };
               
                TeacherService.saveTeachers(bulkadd).success(function (data, status, headers) {
                    $state.go('institute', {instituteId: $stateParams.instituteId});
                    })
                    .error(function (data, status, header, config) {
                        $scope.ServerResponse =  htmlDecode("Data: " + data +
                            "\n\n\n\nstatus: " + status +
                            "\n\n\n\nheaders: " + header +
                            "\n\n\n\nconfig: " + config);
                    });;  
            };
    }]);
    
    exambazaar.controller("bulkAddBatchesCtrl", 
        [ '$scope', 'BatchService','$stateParams','$state','$http','thisinstitute',function($scope, BatchService,$stateParams,$state,$http,thisinstitute){
            $scope.batches = [];
            $scope.institute = thisinstitute.data;
            
            $scope.addBulkBatches = function(){
                $scope.batches.pop();
                $scope.batches.pop();
                $scope.batches.pop();
                $scope.batches.pop();
                $scope.batches.pop();
                var bulkadd = {
                    batches: $scope.batches,
                    institute: $stateParams.instituteId
                };
                BatchService.saveBatches(bulkadd).success(function (data, status, headers) {
                    $state.go('institute', {instituteId: $stateParams.instituteId});
                    })
                    .error(function (data, status, header, config) {
                        $scope.ServerResponse =  htmlDecode("Data: " + data +
                            "\n\n\n\nstatus: " + status +
                            "\n\n\n\nheaders: " + header +
                            "\n\n\n\nconfig: " + config);
                    });  
            };
            
    }]);
        
        
        
    exambazaar.controller("calendarCtrl", function($scope, $filter, $q, $timeout, $log, MaterialCalendarData, thisinstitute,InstituteService,$rootScope,$state) {
    $scope.institute = thisinstitute.data;
    $scope.selectedDate = new Date();
    $scope.weekStartsOn = 1;
    $scope.dayFormat = "d";
    $scope.tooltips = true;
    $scope.disableFutureDates = false;
    
        
    $scope.startDate = new Date("1 April 2016");
    $scope.endDate = new Date("31 April 2016");
    $scope.saturdayHoliday = true;
    $scope.sundayHoliday = true;
    $scope.days = [];
    $scope.setRange = 1;
    $scope.markHolidays = 0;
    if(typeof($scope.institute.calendar)==='object'){
        $scope.setRange = 0;
        $scope.markHolidays = 1;
        $scope.days = $scope.institute.calendar.days;
    } 
    
        
    $scope.askHolidays = function(){
        $scope.markHolidays = 1;
        var day ={};
        for (var d = $scope.startDate; d <= $scope.endDate; d.setDate(d.getDate() + 1)) {
            //var thisDate = moment(d).utcOffset("+05:30").format();
            var thisDate = moment(d);
            var weekDay = moment(d).isoWeekday();
            
            var academicHoliday=false;
            var academicHolidayDesc="";
            var eventDay=false;
            var eventDayDesc="";
            if(weekDay == 6 && $scope.saturdayHoliday){
                academicHoliday = true;
                academicHolidayDesc = "Saturday";
            }
            if(weekDay == 7 && $scope.sundayHoliday){
                academicHoliday = true;
                academicHolidayDesc = "Sunday";
            }
            day = {
                date: thisDate,
                academicHoliday: academicHoliday,
                academicHolidayDesc: academicHolidayDesc,
                eventDay: eventDay,
                eventDayDesc: eventDayDesc
            };
            $scope.days.push(day);
        }  
    };
    $scope.generateCalendar = function(){
        var calendarVars = {
            startDate: $scope.startDate,
            endDate: $scope.endDate,
            saturdayHoliday: $scope.saturdayHoliday,
            sundayHoliday: $scope.sundayHoliday
        }  
    };
        
    $scope.fullscreen = function() {
        var elem = document.querySelector("#calendar-demo");
        if(!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            } else if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    };
        
    $scope.saveInstituteCalendar = function(){
        var calendarName = $scope.institute.basic.name + " - Annual Calendar ";
        var instituteId = $scope.institute._id;
        var calendar = {
            instituteId: instituteId,
            calendarDays: $scope.days,
            calendarName: calendarName
       }; InstituteService.saveCalendar(calendar).success(function (data, status, headers) {
               
                $rootScope.message = 'Calendar saved!';
                $state.go('master-institute', {instituteId: instituteId});
            })
            .error(function (data, status, header, config) {
                $scope.ServerResponse =  htmlDecode("Data: " + data +
                    "\n\n\n\nstatus: " + status +
                    "\n\n\n\nheaders: " + header +
                    "\n\n\n\nconfig: " + config);
            });
        
    };
    $scope.setDirection = function(direction) {
        $scope.direction = direction;
        $scope.dayFormat = direction === "vertical" ? "EEEE, MMMM d" : "d";
    };

    $scope.dayClick = function(date) {
        $scope.msg = "You clicked " + $filter("date")(date, "MMM d, y h:mm:ss a Z");
        $scope.eventDate = $scope.selectedDate;
        //find events by the date
    };

    $scope.prevMonth = function(data) {
        $scope.msg = "You clicked (prev) month " + data.month + ", " + data.year;
    };

    $scope.nextMonth = function(data) {
        $scope.msg = "You clicked (next) month " + data.month + ", " + data.year;
    };

    $scope.setContentViaService = function() {
        var today = new Date();
        MaterialCalendarData.setDayContent(today, '<span> :oD </span>')
    };

    var holidays = {"2015-01-01":[{"name":"Last Day of Kwanzaa","country":"US","date":"2015-01-01"},{"name":"New Year's Day","country":"US","date":"2015-01-01"}],"2015-01-06":[{"name":"Epiphany","country":"US","date":"2015-01-06"}],"2015-01-07":[{"name":"Orthodox Christmas","country":"US","date":"2015-01-07"}],"2015-01-19":[{"name":"Martin Luther King, Jr. Day","country":"US","date":"2015-01-19"}],"2015-02-02":[{"name":"Groundhog Day","country":"US","date":"2015-02-02"}],"2015-02-14":[{"name":"Valentine's Day","country":"US","date":"2015-02-14"}],"2015-02-16":[{"name":"Washington's Birthday","country":"US","date":"2015-02-16"}],"2015-02-18":[{"name":"Ash Wednesday","country":"US","date":"2015-02-18"}],"2015-03-08":[{"name":"International Women's Day","country":"US","date":"2015-03-08"}],"2015-03-17":[{"name":"Saint Patrick's Day","country":"US","date":"2015-03-17"}],"2015-03-29":[{"name":"Palm Sunday","country":"US","date":"2015-03-29"}],"2015-04-01":[{"name":"April Fools' Day","country":"US","date":"2015-04-01"}],"2015-04-03":[{"name":"Good Friday","country":"US","date":"2015-04-03"}],"2015-04-05":[{"name":"Easter","country":"US","date":"2015-04-05"}],"2015-04-22":[{"name":"Earth Day","country":"US","date":"2015-04-22"}],"2015-04-24":[{"name":"Arbor Day","country":"US","date":"2015-04-24"}],"2015-05-01":[{"name":"May Day","country":"US","date":"2015-05-01"}],"2015-05-04":[{"name":"Star Wars Day","country":"US","date":"2015-05-04"}],"2015-05-05":[{"name":"Cinco de Mayo","country":"US","date":"2015-05-05"}],"2015-05-10":[{"name":"Mother's Day","country":"US","date":"2015-05-10"}],"2015-05-25":[{"name":"Memorial Day","country":"US","date":"2015-05-25"}],"2015-06-14":[{"name":"Flag Day","country":"US","date":"2015-06-14"}],"2015-06-21":[{"name":"Father's Day","country":"US","date":"2015-06-21"}],"2015-06-27":[{"name":"Helen Keller Day","country":"US","date":"2015-06-27"}],"2015-07-04":[{"name":"Independence Day","country":"US","date":"2015-07-04"}],"2015-08-26":[{"name":"Women's Equality Day","country":"US","date":"2015-08-26"}],"2015-09-07":[{"name":"Labor Day","country":"US","date":"2015-09-07"}],"2015-09-11":[{"name":"Patriot Day","country":"US","date":"2015-09-11"}],"2015-09-13":[{"name":"Grandparent's Day","country":"US","date":"2015-09-13"}],"2015-09-17":[{"name":"Constitution Day","country":"US","date":"2015-09-17"}],"2015-10-06":[{"name":"German-American Day","country":"US","date":"2015-10-06"}],"2015-10-09":[{"name":"Leif Erkson Day","country":"US","date":"2015-10-09"}],"2015-10-12":[{"name":"Columbus Day","country":"US","date":"2015-10-12"}],"2015-10-31":[{"name":"Halloween","country":"US","date":"2015-10-31"}],"2015-11-03":[{"name":"Election Day","country":"US","date":"2015-11-03"}],"2015-11-11":[{"name":"Veterans Day","country":"US","date":"2015-11-11"}],"2015-11-26":[{"name":"Thanksgiving Day","country":"US","date":"2015-11-26"}],"2015-11-27":[{"name":"Black Friday","country":"US","date":"2015-11-27"}],"2015-12-07":[{"name":"Pearl Harbor Remembrance Day","country":"US","date":"2015-12-07"}],"2015-12-08":[{"name":"Immaculate Conception of the Virgin Mary","country":"US","date":"2015-12-08"}],"2015-12-24":[{"name":"Christmas Eve","country":"US","date":"2015-12-24"}],"2015-12-25":[{"name":"Christmas","country":"US","date":"2015-12-25"}],"2015-12-26":[{"name":"First Day of Kwanzaa","country":"US","date":"2015-12-26"}],"2015-12-27":[{"name":"Second Day of Kwanzaa","country":"US","date":"2015-12-27"}],"2015-12-28":[{"name":"Third Day of Kwanzaa","country":"US","date":"2015-12-28"}],"2015-12-29":[{"name":"Fourth Day of Kwanzaa","country":"US","date":"2015-12-29"}],"2015-12-30":[{"name":"Fifth Day of Kwanzaa","country":"US","date":"2015-12-30"}],"2015-12-31":[{"name":"New Year's Eve","country":"US","date":"2015-12-31"},{"name":"Sixth Day of Kwanzaa","country":"US","date":"2015-12-31"}],"2016-01-01":[{"name":"Last Day of Kwanzaa","country":"US","date":"2016-01-01"},{"name":"New Year's Day","country":"US","date":"2016-01-01"}],"2016-01-06":[{"name":"Epiphany","country":"US","date":"2016-01-06"}],"2016-01-07":[{"name":"Orthodox Christmas","country":"US","date":"2016-01-07"}],"2016-01-18":[{"name":"Martin Luther King, Jr. Day","country":"US","date":"2016-01-18"}],"2016-02-02":[{"name":"Groundhog Day","country":"US","date":"2016-02-02"}],"2016-02-10":[{"name":"Ash Wednesday","country":"US","date":"2016-02-10"}],"2016-02-14":[{"name":"Valentine's Day","country":"US","date":"2016-02-14"}],"2016-02-15":[{"name":"Washington's Birthday","country":"US","date":"2016-02-15"}],"2016-03-08":[{"name":"International Women's Day","country":"US","date":"2016-03-08"}],"2016-03-17":[{"name":"Saint Patrick's Day","country":"US","date":"2016-03-17"}],"2016-03-20":[{"name":"Palm Sunday","country":"US","date":"2016-03-20"}],"2016-03-25":[{"name":"Good Friday","country":"US","date":"2016-03-25"}],"2016-03-27":[{"name":"Easter","country":"US","date":"2016-03-27"}],"2016-04-01":[{"name":"April Fools' Day","country":"US","date":"2016-04-01"}],"2016-04-22":[{"name":"Earth Day","country":"US","date":"2016-04-22"}],"2016-04-29":[{"name":"Arbor Day","country":"US","date":"2016-04-29"}],"2016-05-01":[{"name":"May Day","country":"US","date":"2016-05-01"}],"2016-05-04":[{"name":"Star Wars Day","country":"US","date":"2016-05-04"}],"2016-05-05":[{"name":"Cinco de Mayo","country":"US","date":"2016-05-05"}],"2016-05-08":[{"name":"Mother's Day","country":"US","date":"2016-05-08"}],"2016-05-30":[{"name":"Memorial Day","country":"US","date":"2016-05-30"}],"2016-06-14":[{"name":"Flag Day","country":"US","date":"2016-06-14"}],"2016-06-19":[{"name":"Father's Day","country":"US","date":"2016-06-19"}],"2016-06-27":[{"name":"Helen Keller Day","country":"US","date":"2016-06-27"}],"2016-07-04":[{"name":"Independence Day","country":"US","date":"2016-07-04"}],"2016-08-26":[{"name":"Women's Equality Day","country":"US","date":"2016-08-26"}],"2016-09-05":[{"name":"Labor Day","country":"US","date":"2016-09-05"}],"2016-09-11":[{"name":"Grandparent's Day","country":"US","date":"2016-09-11"},{"name":"Patriot Day","country":"US","date":"2016-09-11"}],"2016-09-17":[{"name":"Constitution Day","country":"US","date":"2016-09-17"}],"2016-10-06":[{"name":"German-American Day","country":"US","date":"2016-10-06"}],"2016-10-09":[{"name":"Leif Erkson Day","country":"US","date":"2016-10-09"}],"2016-10-10":[{"name":"Columbus Day","country":"US","date":"2016-10-10"}],"2016-10-31":[{"name":"Halloween","country":"US","date":"2016-10-31"}],"2016-11-08":[{"name":"Election Day","country":"US","date":"2016-11-08"},{"name":"Super Tuesday","country":"US","date":"2016-11-08"}],"2016-11-11":[{"name":"Veterans Day","country":"US","date":"2016-11-11"}],"2016-11-23":[{"name":"Thanksgiving Day","country":"US"}],"2016-11-25":[{"name":"Black Friday","country":"US","date":"2016-11-25"}],"2016-12-07":[{"name":"Pearl Harbor Remembrance Day","country":"US","date":"2016-12-07"}],"2016-12-08":[{"name":"Immaculate Conception of the Virgin Mary","country":"US","date":"2016-12-08"}],"2016-12-24":[{"name":"Christmas Eve","country":"US","date":"2016-12-24"}],"2016-12-25":[{"name":"Christmas","country":"US","date":"2016-12-25"}],"2016-12-26":[{"name":"First Day of Kwanzaa","country":"US","date":"2016-12-26"}],"2016-12-27":[{"name":"Second Day of Kwanzaa","country":"US","date":"2016-12-27"}],"2016-12-28":[{"name":"Third Day of Kwanzaa","country":"US","date":"2016-12-28"}],"2016-12-29":[{"name":"Fourth Day of Kwanzaa","country":"US","date":"2016-12-29"}],"2016-12-30":[{"name":"Fifth Day of Kwanzaa","country":"US","date":"2016-12-30"}],"2016-12-31":[{"name":"New Year's Eve","country":"US","date":"2016-12-31"},{"name":"Sixth Day of Kwanzaa","country":"US","date":"2016-12-31"}]};

    // You would inject any HTML you wanted for
    // that particular date here.
    var numFmt = function(num) {
        num = num.toString();
        if (num.length < 2) {
            num = "0" + num;
        }
        return num;
    };

    var loadContentAsync = true;
    $log.info("setDayContent.async", loadContentAsync);
    $scope.setDayContent = function(date) {
        var key = [date.getFullYear(), numFmt(date.getMonth()+1), numFmt(date.getDate())].join("-");
        
        var data = (holidays[key]||[{ name: ""}])[0].name;
        if (loadContentAsync) {
            var deferred = $q.defer();
            $timeout(function() {
                deferred.resolve(data);
            });
            return deferred.promise;
        }

        return data;

    };

});
    
        
        
    exambazaar.controller("batchCalendarCtrl", 
    [ '$scope', 'thisbatch', function($scope, thisbatch){
        $scope.batch = thisbatch.data; 
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
        /*$geolocation.getCurrentPosition({
            timeout: 60000
         }).then(function(position) {
            $scope.myPosition = position;
            alert(JSON.stringify(position));
            $cookies.putObject('location', $scope.myPosition);
         });*/
            
            
        $scope.navBarTitle = 'exambazaar';
        $http.defaults.headers.post["Content-Type"] = "application/json";
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
                
                if(user._student.length + user._teacher.length + user._admin.length> 1){
                    //alert("Multiple Users");
                    $state.go("chooselogin", {userId: user._id}, {reload: true});
                }
                else{
                UserService.getUser(user._id).success(function (data, status, headers) {
                    var fulluser = data;
                    var sessionuser;
                    //console.info(JSON.stringify(fulluser));
                    user.verified="true";
                    if(user.verified=="true"){
                    
                    if(user._student.length>0){
                        $rootScope.message ='';
                        
                        sessionuser = {
                            userId: user._id,
                            studentId: fulluser._student[0]._id,
                            userType: 'Student',
                            basic: fulluser._student[0].basic,
                            contact: fulluser._student[0].contact,
                            imageUrl: fulluser._student[0].imageUrl,
                            nLogins: fulluser.logins.length
                        };
                        //console.info(JSON.stringify(sessionuser));
                        $cookies.putObject('sessionuser', sessionuser);
                        $state.go('student', {studentId: user._student});
                        
                    }
                    if(user._teacher.length>0){
                        $rootScope.message ='';
                        console.info(fulluser);
                        sessionuser = {
                            userId: fulluser._id,
                            teacherId: fulluser._teacher[0]._id,
                            userType: 'Teacher',
                            basic: fulluser._teacher[0].basic,
                            contact: fulluser._teacher[0].contact,
                            imageUrl: fulluser._teacher[0].imageUrl,
                            nLogins: fulluser.logins.length
                        };
                        console.info(JSON.stringify(sessionuser));
                        $cookies.putObject('sessionuser', sessionuser);
                        
                        $state.go('teacher', {teacherId: user._teacher});
                    }
                    if(user._admin.length>0){
                        $rootScope.message ='';
                        
                        sessionuser = {
                            userId: fulluser._id,
                            adminId: fulluser._admin[0]._id,
                            userType: 'Admin',
                            basic: fulluser._admin[0].basic,
                            contact: fulluser._admin[0].contact,
                            imageUrl: fulluser._admin[0].imageUrl,
                            nLogins: fulluser.logins.length
                        };
                        //console.info(JSON.stringify(sessionuser));
                        $cookies.putObject('sessionuser', sessionuser);
                        
                        $state.go('admin', {adminId: user._admin});
                    }
                    if(user._master){
                        $rootScope.message ='';
                        //console.info(user);
                        sessionuser = {
                            userId: fulluser._id,
                            masterId: fulluser._master._id,
                            userType: 'Master',
                            basic: fulluser._master.basic,
                            contact: fulluser._master.contact,
                            imageUrl: fulluser._master.imageUrl,
                            nLogins: fulluser.logins.length
                        };
                        console.info(JSON.stringify(sessionuser));
                        $cookies.putObject('sessionuser', sessionuser);
                        
                        $state.go('master-dashboard', {masterId: user._master});
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
            }
            
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
            $state.go("main", {}, {reload: true});
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
    exambazaar.controller("instituteController", 
    [ '$scope', 'thisinstitute', function($scope, thisinstitute){
        $scope.institute = thisinstitute.data;
        //alert($scope.institute.basic.name);
        angular.forEach($scope.institute.batches, function (batch) {
            batch.grade = parseFloat(batch.grade);
        });
        
        $scope.navBarTitle = $scope.institute.basic.name; 
    }]);
    exambazaar.controller("instituteBatchesController", 
    [ '$scope', 'thisinstitute', function($scope, thisinstitute){
        $scope.institute = thisinstitute.data;
        //alert($scope.institute.basic.name);
        angular.forEach($scope.institute.batches, function (batch) {
            batch.grade = parseFloat(batch.grade);
        });
        
    }]);
    
    exambazaar.controller("instituteTeachersController", 
    [ '$scope', 'thisinstitute','$timeout', function($scope, thisinstitute,$timeout){
        $scope.institute = thisinstitute.data;
        //alert($scope.institute.basic.name);
        angular.forEach($scope.institute.teachers.subjects, function (subject) {
            subject._batch.grade = parseFloat(subject._batch.grade);
        });
        
        $scope.filterText = '';

        // Instantiate these variables outside the watch
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
      
    exambazaar.controller("instituteStudentsController", 
    [ '$scope', 'thisinstitute','$timeout','batchNames', function($scope, thisinstitute,$timeout,batchNames){
        $scope.institute = thisinstitute.data;
        $scope.gradeBatches = batchNames.data;
        angular.forEach($scope.gradeBatches, function (batch) {
            batch.grade = parseFloat(batch.grade);
        });
        $scope.quickLink = function(batchName){
            $scope.searchText = batchName;
        };
        
        console.info(JSON.stringify($scope.gradeBatches));
        angular.forEach($scope.institute.batches, function (batch) {
            batch.grade = parseFloat(batch.grade);
        });
        
            // This is what you will bind the filter to
        $scope.filterText = '';

        // Instantiate these variables outside the watch
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
        
    exambazaar.controller("chooseloginController", 
    [ '$scope','thisuser','UserService','$state','$cookies', function($scope,thisuser,UserService,$state,$cookies){
        $scope.user = thisuser.data;
        var students = $scope.user._student;
        var teachers = $scope.user._teacher;
        var admins = $scope.user._admin;
        var sessionuser;
        $scope.setUser = function(thisuser){
            students.forEach(function(thisStudent, studentIndex){
                if(thisuser._id == thisStudent._id){
                    
                    sessionuser = {
                        userId: $scope.user._id,
                        studentId: thisStudent._id,
                        userType: 'Student',
                        basic: thisStudent.basic,
                        contact: thisStudent.contact,
                        imageUrl: thisStudent.imageUrl,
                        nLogins: thisuser.logins.length
                    };
                       
                    $cookies.putObject('sessionuser', sessionuser);
                    console.info(JSON.stringify(sessionuser));
                    $state.go('student', {studentId: sessionuser.studentId});
                    
                }
            });
            
            teachers.forEach(function(thisTeacher, teacherIndex){
                if(thisuser._id == thisTeacher._id){
                    console.info("User is: " + thisTeacher.basic.firstName);
                    sessionuser = {
                        userId: $scope.user._id,
                        teacherId: thisTeacher._id,
                        userType: 'Teacher',
                        basic: thisStudent.basic,
                        contact: thisStudent.contact,
                        imageUrl: thisStudent.imageUrl,
                        nLogins: thisuser.logins.length
                    };
                       
                    $cookies.putObject('sessionuser', sessionuser);
                    console.info(JSON.stringify(sessionuser));
                    $state.go('teacher', {teacherId: sessionuser.teacherId});
                }
            });
            
            
            admins.forEach(function(thisAdmin, adminIndex){
                if(thisuser._id == thisAdmin._id){
                    console.info("User is: " + thisAdmin.basic.firstName);
                    sessionuser = {
                        userId: $scope.user._id,
                        adminId: thisAdmin._id,
                        userType: 'Admin',
                        basic: thisAdmin.basic,
                        contact: thisAdmin.contact,
                        imageUrl: thisAdmin.imageUrl,
                        nLogins: thisuser.logins.length
                    };
                       
                    $cookies.putObject('sessionuser', sessionuser);
                    console.info(JSON.stringify(sessionuser));
                    $state.go('admin', {adminId: sessionuser.adminId});
                }
            });
            //student({ studentId:{{'sessionuser._student[0]._id'}} })
            
        };
        
        $scope.logout = function(){
            
                $cookies.remove('sessionuser');
                $state.go("main", {}, {reload: true});
            };
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
                $state.go("main", {}, {reload: true});
            };
    }]);
    
    exambazaar.controller("studentAttendanceController", 
    [ '$scope', 'thisstudent','EmailService','SMSService','ProfilePicService','FileUploader','$cookies','$state','$stateParams','screenSize','thisattendance', function($scope, thisstudent,EmailService,SMSService,ProfilePicService,FileUploader,$cookies,$state,$stateParams,screenSize,thisattendance){
        var d = {};
        $scope.student = thisstudent.data.student;
        var attendance = thisattendance.data;
        
        attendance.present.forEach(function(thisPresent, index){
            thisPresent = moment(thisPresent).valueOf()/1000;
            d[thisPresent] = 25;
        });
        attendance.absent.forEach(function(thisAbsent, index){
            thisAbsent = moment(thisAbsent).valueOf()/1000;
            d[thisAbsent] = -10;
        });
        attendance.holiday.forEach(function(thisHoliday, index){
            thisHoliday = moment(thisHoliday).valueOf()/1000;
            d[thisHoliday] = 50;
        });
        //console.info(JSON.stringify(d));
        var imageUrl = $scope.student.imageUrl || '';
        var cal = new CalHeatMap();
        var cellSize = 25;
        var todayDate = new Date();
        var startDate = new Date();
        $scope.showButtons = false;
        if (screenSize.is('xs, sm')) {
             $scope.showButtons = true;
            startDate.setDate(todayDate.getDate());
            cal.init({
                itemSelector: "#cal-heatmap",
                domain: "month",
                subDomain: "day",
                data: d,
                start: startDate,
                minDate: new Date(2016,0,1),
                maxDate: new Date(2017,11,1),
                highlight: [new Date()],
                cellSize: cellSize,
                cellPadding: 5,
                domainGutter: 20,
                range: 1,
                displayLegend: true,
                legendCellSize: cellSize,
                legendVerticalPosition: "top",
                   legendHorizontalPosition: "center",
                legendMargin: [10, 0, 10, 0],
                legendTitleFormat: {
                    lower: "Absent",
                    inner: "Present",
                    upper: "Holiday"
                },
                tooltip: true,
                subDomainTitleFormat: {
                    empty: "No attendance marked for {date}"
                    //filled: "{count} {name} {date}"
                },
                domainDynamicDimension: false,
                previousSelector: "#previous-sm",
                nextSelector: "#next-sm",
                domainLabelFormat: function(date) {
                    return moment(date).format("MMMM YYYY").toUpperCase();
                },
                subDomainTextFormat: "%d",
                legend: [0,40]
            });
            
        }else{
            startDate.setDate(todayDate.getDate()-30*3);
            cal.init({
                itemSelector: "#cal-heatmap",
                domain: "month",
                subDomain: "day",
                data: d,
                start: startDate,
                minDate: new Date(2016,0,1),
                maxDate: new Date(2017,11,1),
                highlight: [new Date()],
                cellSize: cellSize,
                cellPadding: 5,
                domainGutter: 20,
                range: 4,
                displayLegend: true,
                legendCellSize: cellSize,
                legendVerticalPosition: "top",
                   legendHorizontalPosition: "center",
                legendMargin: [10, 0, 10, 0],
                legendTitleFormat: {
                    lower: "Absent",
                    inner: "Present",
                    upper: "Holiday"
                },
                tooltip: true,
                subDomainTitleFormat: {
                    empty: "No attendance marked for {date}"
                    //filled: "{count} {name} {date}"
                },
                domainDynamicDimension: false,
                previousSelector: "#previous-lg",
                nextSelector: "#next-lg",
                domainLabelFormat: function(date) {
                    return moment(date).format("MMMM YYYY").toUpperCase();
                },
                subDomainTextFormat: "%d",
                legend: [0,40]
            });
        }
        
        var uploader = $scope.uploader = new FileUploader({
                url: 'https://api.imgur.com/3/image',
                alias: 'image',
                headers: {
                    Authorization: 'Client-ID a1dc6fb18b097c6',
                },
                autoUpload: true
        });
        
        
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
            //alert(JSON.stringify(response.data.link));
            var uploadImageUrl = response.data.link;
            uploadImageUrl = uploadImageUrl.replace(/['"]+/g, '');
            
            if(uploadImageUrl){
                //alert(JSON.stringify($scope.teacher));
              var imageUpdate = {
                  userType: 'Student',
                  _student: $scope.student._id,
                  imageUrl: uploadImageUrl,
              }; ProfilePicService.saveProfilePic(imageUpdate).success(function (data, status, headers) {
                    var sessionuser = $cookies.getObject('sessionuser');
                    sessionuser.imageUrl = uploadImageUrl;
                    $cookies.putObject('sessionuser', sessionuser);
                    $state.go($state.current, $stateParams, {reload: true, inherit: false});
                    //alert("Your pic has been updated!");
                })
                .error(function (data, status, header, config) {
                    $scope.ServerResponse =  htmlDecode("Data: " + data +
                        "\n\n\n\nstatus: " + status +
                        "\n\n\n\nheaders: " + header +
                        "\n\n\n\nconfig: " + config);
                });
           }
               
        };
        
    }]);
 
        
        
    exambazaar.controller("studentController", 
    [ '$scope', 'thisstudent','EmailService','SMSService','ProfilePicService','FileUploader','$cookies','$state','$stateParams','screenSize', function($scope, thisstudent,EmailService,SMSService,ProfilePicService,FileUploader,$cookies,$state,$stateParams,screenSize){
        $scope.student = thisstudent.data.student;
        $scope.eval = thisstudent.data.eval;
        console.info($scope.student);
        $scope.student.batch.subjects.forEach(function(thisSubject, subjectIndex){
            thisSubject.showExams = false;
            thisSubject._exams.forEach(function(thisExam, examIndex){
                var examid = thisExam._id;
                $scope.eval.forEach(function(thisEval, evalIndex){
                    var evalExamId = thisEval._exam._id;
                    
                    if(evalExamId == examid){
                        thisExam.eval = thisEval;
                    }
                });
            });
        });
        $scope.showHideExams = function(thisSubject){
            thisSubject.showExams = !thisSubject.showExams;
        };
        
        var imageUrl = $scope.student.imageUrl || '';
        var uploader = $scope.uploader = new FileUploader({
                url: 'https://api.imgur.com/3/image',
                alias: 'image',
                headers: {
                    Authorization: 'Client-ID a1dc6fb18b097c6',
                },
                autoUpload: true
        });
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
            //alert(JSON.stringify(response.data.link));
            var uploadImageUrl = response.data.link;
            uploadImageUrl = uploadImageUrl.replace(/['"]+/g, '');
            
            if(uploadImageUrl){
                //alert(JSON.stringify($scope.teacher));
              var imageUpdate = {
                  userType: 'Student',
                  _student: $scope.student._id,
                  imageUrl: uploadImageUrl,
              }; ProfilePicService.saveProfilePic(imageUpdate).success(function (data, status, headers) {
                    var sessionuser = $cookies.getObject('sessionuser');
                    sessionuser.imageUrl = uploadImageUrl;
                    $cookies.putObject('sessionuser', sessionuser);
                    $state.go($state.current, $stateParams, {reload: true, inherit: false});
                    //alert("Your pic has been updated!");
                })
                .error(function (data, status, header, config) {
                    $scope.ServerResponse =  htmlDecode("Data: " + data +
                        "\n\n\n\nstatus: " + status +
                        "\n\n\n\nheaders: " + header +
                        "\n\n\n\nconfig: " + config);
                });
           }  
        };
        
        
        
    }]);
    exambazaar.controller("studentProfileController", 
    [ '$scope', 'thisstudent','EmailService','SMSService','ProfilePicService','$mdDialog','FileUploader','$cookies','$state','$stateParams', function($scope, thisstudent,EmailService,SMSService,ProfilePicService,$mdDialog,FileUploader,$cookies,$state,$stateParams){
        $scope.student = thisstudent.data.student;
        //var imageUrl = $scope.student.account.imageUrl;
            
        var uploader = $scope.uploader = new FileUploader({
            url: 'https://api.imgur.com/3/image',
            alias: 'image',
            headers: {
                Authorization: 'Client-ID a1dc6fb18b097c6',
            },
            autoUpload: true
        });
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
            //alert(JSON.stringify(response.data.link));
            var uploadImageUrl = response.data.link;
            uploadImageUrl = uploadImageUrl.replace(/['"]+/g, '');
            $scope.uploadImageUrl = uploadImageUrl;
            
            if(uploadImageUrl){
                //alert(JSON.stringify($scope.teacher));
              var imageUpdate = {
                  userType: 'Student',
                  _student: $scope.student._id,
                  imageUrl: uploadImageUrl,
              }; ProfilePicService.saveProfilePic(imageUpdate).success(function (data, status, headers) {
                  var sessionuser = $cookies.getObject('sessionuser');
                    sessionuser.imageUrl = uploadImageUrl;
                    $cookies.putObject('sessionuser', sessionuser);
                  console.info(sessionuser);
                  $state.go($state.current, $stateParams, {reload: true, inherit: false});
                    //alert("Your pic has been updated!");
                })
                .error(function (data, status, header, config) {
                    $scope.ServerResponse =  htmlDecode("Data: " + data +
                        "\n\n\n\nstatus: " + status +
                        "\n\n\n\nheaders: " + header +
                        "\n\n\n\nconfig: " + config);
                });
           }
               
        };
        
         $scope.confirm = function(ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            var newPassword = $mdDialog.prompt()
              .title('Update Password')
              .textContent('Enter Old and New passwords')
              .placeholder('Old Password')
              .targetEvent(ev)
              .ok('Update')
              .cancel('Cancel');

            $mdDialog.show(confirm).then(function(result) {
                $scope.newPassword = result;
                
                var userPassword = {
                   userId: $scope.student._id,
                   newPassword: $scope.password
                };
                UserService.updatePassword(userPassword).success(function (data, status, headers) {
                    $rootScope.message = 'Password updated! Please login again.';
                    $state.go('main');
                })
                .error(function (data, status, header, config) {
                    $scope.ServerResponse =  htmlDecode("Data: " + data +
                        "\n\n\n\nstatus: " + status +
                        "\n\n\n\nheaders: " + header +
                        "\n\n\n\nconfig: " + config);
                });
            }, function() {
              //$scope.status = 'You didn\'t name your dog.';
            });
          };
        /*$http.post('/login', {
          mobile: $scope.login.mobile,
          password: $scope.login.password,
        })
        .success(function(user){
        }
        .error(function (data, status, header, config) {
            $scope.ServerResponse =  htmlDecode("Data: " + data +
                "\n\n\n\nstatus: " + status +
                "\n\n\n\nheaders: " + header +
                "\n\n\n\nconfig: " + config);
        });*/
        
        
    }]); 
        
        
    exambazaar.controller("teacherController", 
    [ '$scope', 'thisteacher','ProfilePicService','FileUploader','$http','$cookies', function($scope, thisteacher,ProfilePicService,FileUploader,$http,$cookies){
        $scope.teacher = thisteacher.data; 
        if(typeof($cookies.getObject('sessionuser'))!= 'undefined'){
            $scope.sessionuser = $cookies.getObject('sessionuser');
        }
        var uploader = $scope.uploader = new FileUploader({
            url: 'https://api.imgur.com/3/image',
            alias: 'image',
            headers: {
                Authorization: 'Client-ID a1dc6fb18b097c6',
            },
            autoUpload: true
        });
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
            //alert(JSON.stringify(response.data.link));
            var imageUrl = response.data.link;
            imageUrl = imageUrl.replace(/['"]+/g, '');
            
            if(imageUrl){
                //alert(JSON.stringify($scope.teacher));
              var imageUpdate = {
                  userType: 'Teacher',
                  _teacher: $scope.teacher._id,
                  imageUrl: imageUrl,
              }; ProfilePicService.saveProfilePic(imageUpdate).success(function (data, status, headers) {
                    alert("Your pic has been updated!");
                })
                .error(function (data, status, header, config) {
                    $scope.ServerResponse =  htmlDecode("Data: " + data +
                        "\n\n\n\nstatus: " + status +
                        "\n\n\n\nheaders: " + header +
                        "\n\n\n\nconfig: " + config);
                });
           }
               
        };
        
        
    }]);
    exambazaar.controller("adminController", 
    [ '$scope', 'thisadmin', 'InstituteService',function($scope, thisadmin,InstituteService){
        $scope.admin = thisadmin.data;
        //alert(JSON.stringify($scope.admin._institute._id));
        $scope.institute= InstituteService.getInstitute($scope.admin._institute._id).success(function (data, status, headers) {
                //var batchId = data;
                //alert(batchId);
                //alert(JSON.stringify(data));
                $scope.institute=data;
            })
            .error(function (data, status, header, config) {
                $scope.ServerResponse =  htmlDecode("Data: " + data +
                    "\n\n\n\nstatus: " + status +
                    "\n\n\n\nheaders: " + header +
                    "\n\n\n\nconfig: " + config);
            });
        
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
    [ '$scope', 'targetStudyProviderService','targetStudyProvidersList','targetStudyCities','$timeout','$state','$stateParams', 'MasterService','$cookies', function($scope, targetStudyProviderService,targetStudyProvidersList,targetStudyCities,$timeout,$state,$stateParams,MasterService, $cookies){
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
        
    exambazaar.controller("mastergetCoachingController", 
    [ '$scope', 'ProviderService','providersList','$timeout','$state','$stateParams', 'MasterService', function($scope, ProviderService,providersList,$timeout,$state,$stateParams,MasterService){
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
        
        
        $scope.getAllExams = function(){
            alert('HEre');
            MasterService.getAllExams().success(function (data, status, headers) {
                console.info("Done");
                //$scope.urls = data;
            })
            .error(function (data, status, header, config) {
                console.info("Error " + data);
                $scope.ServerResponse =  htmlDecode("Data: " + data +
                    "\n\n\n\nstatus: " + status +
                    "\n\n\n\nheaders: " + header +
                    "\n\n\n\nconfig: " + config);
            });
        };
        $scope.getTargetstudyurls = function(){
            MasterService.getTargetstudyurls($scope.urls).success(function (data, status, headers) {
                console.info("Done");
                //$scope.urls = data;
            })
            .error(function (data, status, header, config) {
                console.info("Error " + data);
                $scope.ServerResponse =  htmlDecode("Data: " + data +
                    "\n\n\n\nstatus: " + status +
                    "\n\n\n\nheaders: " + header +
                    "\n\n\n\nconfig: " + config);
            });
        };
        
        
        
        $scope.getTargetStudyUrlsList = function(){
            MasterService.getTargetstudyurlsList().success(function (data, status, headers) {
                console.info("Done");
                $scope.urls = data;
            })
            .error(function (data, status, header, config) {
                console.info("Error " + newUrls);
                $scope.ServerResponse =  htmlDecode("Data: " + data +
                    "\n\n\n\nstatus: " + status +
                    "\n\n\n\nheaders: " + header +
                    "\n\n\n\nconfig: " + config);
            });
        };
        
        $scope.getclusterUrls = function(){
            MasterService.getclusterUrls().success(function (data, status, headers) {
                console.info("Done");
                $scope.urls = data;
            })
            .error(function (data, status, header, config) {
                console.info("Error " + newUrls);
                $scope.ServerResponse =  htmlDecode("Data: " + data +
                    "\n\n\n\nstatus: " + status +
                    "\n\n\n\nheaders: " + header +
                    "\n\n\n\nconfig: " + config);
            });
        };
        $scope.geturl = function(){
            $scope.urls.pop();
            $scope.hours = 0;
            $scope.minutes = $scope.urls.length;
            $scope.count = 0;
            $scope.currUrl = '';
            $scope.countdown = function myhandler() {
                console.log($scope.count);
                if ($scope.minutes == 0 && $scope.hours == 0) {
                    console.log('end!');
                    return;
                } else {
                    if ($scope.minutes == 0) {
                        $scope.minutes = 59;
                        $scope.hours--;
                    } else {
                        $scope.minutes--;
                    }
                    var newUrls = [$scope.urls[$scope.count]];
                    $scope.currUrl = newUrls;
                    //console.info("Requesting: " + JSON.stringify(thisUrl));
                    MasterService.getUrls(newUrls).success(function (data, status, headers) {
                        console.info("Done");
                        //$state.go($state.current, $stateParams, {reload: true, inherit: false});
                    })
                    .error(function (data, status, header, config) {
                        console.info("Error " + newUrls);
                        $scope.ServerResponse =  htmlDecode("Data: " + data +
                            "\n\n\n\nstatus: " + status +
                            "\n\n\n\nheaders: " + header +
                            "\n\n\n\nconfig: " + config);
                    });
                    $scope.count++;
                }
                $timeout(myhandler, 2000);
            }
            $scope.countdown();
        };
        
        $scope.getTargetStudyurl = function(){
            $scope.urls.pop();
            $scope.hours = 0;
            $scope.minutes = $scope.urls.length;
            $scope.count = 0;
            $scope.currUrl = '';
            $scope.countdown = function myhandler() {
                console.log($scope.count);
                if ($scope.minutes == 0 && $scope.hours == 0) {
                    console.log('end!');
                    return;
                } else {
                    if ($scope.minutes == 0) {
                        $scope.minutes = 59;
                        $scope.hours--;
                    } else {
                        $scope.minutes--;
                    }
                    var newUrls = [$scope.urls[$scope.count]];
                    $scope.currUrl = newUrls;
                    //console.info("Requesting: " + JSON.stringify(thisUrl));
                    MasterService.getTargetstudyurls(newUrls).success(function (data, status, headers) {
                        console.info("Done");
                        //$state.go($state.current, $stateParams, {reload: true, inherit: false});
                    })
                    .error(function (data, status, header, config) {
                        console.info("Error " + newUrls);
                        $scope.ServerResponse =  htmlDecode("Data: " + data +
                            "\n\n\n\nstatus: " + status +
                            "\n\n\n\nheaders: " + header +
                            "\n\n\n\nconfig: " + config);
                    });
                    $scope.count++;
                }
                $timeout(myhandler, 10000);
            }
            $scope.countdown();
        };
        
        $scope.geturl2 = function(){
            $scope.urls.pop();
            $scope.hours = 0;
            $scope.minutes = $scope.urls.length;
            $scope.count = 0;
            $scope.currUrl = '';
            $scope.countdown = function myhandler() {
                console.log($scope.count);
                if ($scope.minutes == 0 && $scope.hours == 0) {
                    console.log('end!');
                    return;
                } else {
                    if ($scope.minutes == 0) {
                        $scope.minutes = 59;
                        $scope.hours--;
                    } else {
                        $scope.minutes--;
                    }
                    var newUrls = [$scope.urls[$scope.count]];
                    $scope.currUrl = newUrls;
                    //console.info("Requesting: " + JSON.stringify(thisUrl));
                    MasterService.getUrls2(newUrls).success(function (data, status, headers) {
                        console.info("Done");
                        //$state.go($state.current, $stateParams, {reload: true, inherit: false});
                    })
                    .error(function (data, status, header, config) {
                        console.info("Error " + newUrls);
                        $scope.ServerResponse =  htmlDecode("Data: " + data +
                            "\n\n\n\nstatus: " + status +
                            "\n\n\n\nheaders: " + header +
                            "\n\n\n\nconfig: " + config);
                    });
                    $scope.count++;
                }
                $timeout(myhandler, 2000);
            }
            $scope.countdown();
        };
        
    }]); 
        
        
        
    exambazaar.controller("invalidusersController", 
    [ '$scope', 'invalidUsers', function($scope, invalidUsers){
        $scope.invalidUsers = invalidUsers.data; 
        
    }]);
    
    exambazaar.controller("evalController", 
    [ '$scope', 'allEvals', function($scope, allEvals){
        
        $scope.studentEval = allEvals.data.studentEval;
        $scope.student ={
            _id: $scope.studentEval._student._id
        }
        $scope.exam = $scope.studentEval._exam;
        $scope.otherEvals = allEvals.data.otherEvals;
        $scope.presentEvals =[];
        $scope.absentEvals =[];
        $scope.maxMarks = $scope.exam.info.maxMarks;
        var average, median, percentile,present;
        $scope.otherEvals.forEach(function(thisEval, evalIndex){
            if(!thisEval.absent){
                $scope.presentEvals.push(thisEval);
                present = present+1;
            }else{
                $scope.absentEvals.push(thisEval);
            }
        });
        $scope.scores = $scope.presentEvals.map(function(a) {return parseInt(a.score);});
        
        $scope.analysis = {
            min:math.min($scope.scores),
            max:math.max($scope.scores),
            mean:math.round(math.mean($scope.scores),2),    
            median:math.median($scope.scores),
            quartile1: math.quantileSeq($scope.scores, [3/4,4/4]),
            quartile2: math.quantileSeq($scope.scores, [2/4,3/4]),
            quartile3: math.quantileSeq($scope.scores, [1/4,2/4]),
            quartile4: math.quantileSeq($scope.scores, [0/4,1/4])
        };
        $scope.presentEvals.forEach(function(thisEval, evalIndex){
            var score = thisEval.score;
            if(score <= $scope.analysis.quartile4[1] && score >= $scope.analysis.quartile4[0]){
                thisEval.quartile = 4;
            }
            if(score <= $scope.analysis.quartile3[1] && score >= $scope.analysis.quartile3[0]){
                thisEval.quartile = 3;
            }
            if(score <= $scope.analysis.quartile2[1] && score >= $scope.analysis.quartile2[0]){
                thisEval.quartile = 2;
            }
            if(score <= $scope.analysis.quartile1[1] && score >= $scope.analysis.quartile1[0]){
                thisEval.quartile = 1;
            }
            if(thisEval._id == $scope.studentEval._id)
                $scope.studentEval.quartile = thisEval.quartile;
        });
        
        
        
/*        
        var chart = AmCharts.makeChart("chartdiv", {
      "theme": "none",
      "type": "gauge",
      "axes": [{
        "topTextFontSize": 25,
        "topTextYOffset": 50,
        "axisColor": "#31d6ea",
        "axisThickness": 1,
        "endValue": 100,
        "gridInside": true,
        "inside": true,
        "radius": "60%",
        "valueInterval": 25,
        "tickColor": "#67b7dc",
        "startAngle": -85,
        "endAngle": 265,
        "unit": "%",
        "bandOutlineAlpha": 0,
        "bands": [{
          "color": "#0080ff",
          "endValue": 100,
          "innerRadius": "105%",
          "radius": "140%",
          "gradientRatio": [0.5, 0, -0.5],
          "startValue": 0
        }, {
          "color": "#3cd3a3",
          "endValue": 0,
          "innerRadius": "105%",
          "radius": "140%",
          "gradientRatio": [0.5, 0, -0.5],
          "startValue": 0
        }]
      }],
      "arrows": [{
        "alpha": 1,
        "innerRadius": "105%",
        "nailRadius": 0,
        "radius": "140%"
      }]
    });

setInterval(randomValue, 2000);

// set random value
function randomValue() {
  var value = Math.round(Math.random() * 100);
  chart.arrows[0].setValue(value);
  chart.axes[0].setTopText(value + " %");
  // adjust darker band to new value
  chart.axes[0].bands[1].setEndValue(value);
}*/
    
    
    var chart = AmCharts.makeChart( "chartdiv1", {
      "type": "serial",
      "theme": "light",
      "autoMargins": false,
      "marginTop": 0,
      "marginLeft": 10,
      "marginBottom": 40,
      "marginRight": 10,
      "dataProvider": [ {
        "category": "",
        "quartile4": $scope.maxMarks/4,
        "quartile3": $scope.maxMarks/4,
        "quartile2": $scope.maxMarks/4,
        "quartile1": $scope.maxMarks/4,
        "limit": $scope.analysis.max,
        "full": $scope.maxMarks,
        "bullet": $scope.studentEval.score
      } ],
      "valueAxes": [ {
        "maximum": $scope.maxMarks,
        "stackType": "regular",
        "gridAlpha": 0
      } ],
      "startDuration": 1,
      "graphs": [ {
        "fillAlphas": 0.8,
        "lineColor": "#19d228",
        "showBalloon": false,
        "type": "column",
        "valueField": "quartile4"
      }, {
        "fillAlphas": 0.8,
        "lineColor": "#b4dd1e",
        "showBalloon": false,
        "type": "column",
        "valueField": "quartile3"
      }, {
        "fillAlphas": 0.8,
        "lineColor": "#f4fb16",
        "showBalloon": false,
        "type": "column",
        "valueField": "quartile2"
      }, {
        "fillAlphas": 0.8,
        "lineColor": "#f6d32b",
        "showBalloon": false,
        "type": "column",
        "valueField": "quartile1"
      },{
        "clustered": false,
        "columnWidth": 0.3,
        "fillAlphas": 1,
        "lineColor": "#000000",
        "stackable": false,
        "type": "column",
        "valueField": "bullet"
      }, {
        "columnWidth": 0.5,
        "lineColor": "#000000",
        "lineThickness": 3,
        "noStepRisers": true,
        "stackable": false,
        "type": "step",
        "valueField": "limit"
      } ],
      "rotate": true,
      "columnWidth": 1,
      "categoryField": "category",
      "categoryAxis": {
        "gridAlpha": 0,
        "position": "left"
      }
    } );

        
        
    }]);
        
    exambazaar.controller("examController", 
    [ '$scope', 'thisexam','thisevals','ExamService','EvalService','$http','$state','$stateParams', function($scope, thisexam,thisevals,ExamService,EvalService,$http,$state,$stateParams){
        $scope.exam = thisexam.data; 
        $scope.evals = thisevals.data; 
        
        $scope.studentEvals = [];
        var students = $scope.exam._subject._batch.students;
        students.forEach(function(thisStudent, studentIndex){
            var studentEval = {
                _student: {
                    _id: thisStudent._id,
                    basic: thisStudent.basic
                },
                score: '',
                feedback: '',
                absent: false
            };
            $scope.studentEvals.push(studentEval);
        });
        
        
        if($scope.evals){
            $scope.studentEvals.forEach(function(thisStudentEval, studentEvalIndex){
                var studentId = thisStudentEval._student._id;
                var index = $scope.evals.map(function(el) {
                  return el._student;
                }).indexOf(studentId);
                //console.info(index);
                var savedEval = $scope.evals[index];
                if(savedEval){
                   thisStudentEval.score = savedEval.score; 
                   thisStudentEval.feedback = savedEval.feedback; 
                   thisStudentEval.absent = savedEval.absent; 
                }
                
                
                //console.info(savedEval);
            });
            
        }
        $scope.saveExamEvaluations = function (){
            
            var evals = {
                _exam: $scope.exam._id,
                studentEvals: $scope.studentEvals
            };
             EvalService.saveExamEvaluations(evals).success(function (data, status, headers) {
                //var batchId = data;
                alert("Done");
                //$state.go($state.current, $stateParams, {reload: true, inherit: false});
            })
            .error(function (data, status, header, config) {
                $scope.ServerResponse =  htmlDecode("Data: " + data +
                    "\n\n\n\nstatus: " + status +
                    "\n\n\n\nheaders: " + header +
                    "\n\n\n\nconfig: " + config);
            });
        };
        
    }]);
    
    
    exambazaar.controller("subjectController", 
    [ '$scope', 'thissubject','ExamService','EvalService','$http','$state','$stateParams', function($scope, thissubject,ExamService,EvalService,$http,$state,$stateParams){
        $scope.subject = thissubject.data; 
        var today = new Date(); 
        
        $scope.subject._exams.forEach(function(thisExam, examIndex){
            var examDate = new Date(thisExam.info.date);
            //alert(examDate);
            if(examDate <= today){
                thisExam.showLinkToEvaluate = 1;
                
            }else{
                thisExam.showLinkToEvaluate = 0;
                
            }
        });
        
        $scope.insertExam = function () {
            $scope.addExam._subject = $scope.subject._id;
            var saveExam = ExamService.saveExam($scope.addExam).success(function (data, status, headers) {
                //var batchId = data;
                //alert(batchId);
                $state.go($state.current, $stateParams, {reload: true, inherit: false});
            })
            .error(function (data, status, header, config) {
                $scope.ServerResponse =  htmlDecode("Data: " + data +
                    "\n\n\n\nstatus: " + status +
                    "\n\n\n\nheaders: " + header +
                    "\n\n\n\nconfig: " + config);
            });
        };
        
        $scope.studentEvals = [];
        var students = $scope.subject._batch.students;
        students.forEach(function(thisStudent, studentIndex){
            var studentEval = {
                _student: {
                    _id: thisStudent._id,
                    basic: thisStudent.basic
                },
                score: '',
                absent: false
            };
            $scope.studentEvals.push(studentEval);
        });
        
        $scope.saveExamEvaluations = function (){
            
            var evals = {
                _exam: $scope.subject.evalExam._id,
                studentEvals: $scope.studentEvals
            };
             EvalService.saveExamEvaluations(evals).success(function (data, status, headers) {
                //var batchId = data;
                alert("Done");
                //$state.go($state.current, $stateParams, {reload: true, inherit: false});
            })
            .error(function (data, status, header, config) {
                $scope.ServerResponse =  htmlDecode("Data: " + data +
                    "\n\n\n\nstatus: " + status +
                    "\n\n\n\nheaders: " + header +
                    "\n\n\n\nconfig: " + config);
            });
        };
        
    }]);
    exambazaar.controller("batchController", 
    [ '$scope', 'thisbatch','batchCalendar','BatchService','$filter','$state','$stateParams', 'batchAttendanceDays','screenSize',function($scope, thisbatch,batchCalendar,BatchService,$filter,$state,$stateParams,batchAttendanceDays,screenSize){
        $scope.batch = thisbatch.data; 
        $scope.batchCalendar = batchCalendar.data;
        
        var days = $scope.batchCalendar; 
        $scope.holidays = []; 
        $scope.workingdays = []; 
        $scope.fetchDate = new Date();
        $scope.institute = $scope.batch._institute; 
        days.forEach(function(day, dayIndex){
            day.date = moment(day.date).startOf('day');
            if(day.academicHoliday){
                if(day.academicHolidayDesc !='Saturday' && day.academicHolidayDesc !='Sunday'){
                    $scope.holidays.push(day);
                } 
            }else{
                $scope.workingdays.push(day);   
            }
        });
        var attendanceDays = batchAttendanceDays.data;
        console.info(attendanceDays);
        var marked = attendanceDays.marked;
        var unmarked = attendanceDays.unmarked;
        var holiday = attendanceDays.holiday;
        
        
        var d = {};
        marked.forEach(function(thisMark, index){
            thisMark = moment(thisMark).valueOf()/1000;
            d[thisMark] = 25;
        });
        holiday.forEach(function(thisHoliday, index){
            thisHoliday = moment(thisHoliday).valueOf()/1000;
            d[thisHoliday] = 50;
        });
        
        var cal = new CalHeatMap();
        var todayDate = new Date();
        var startDate = new Date();
        $scope.showButtons = false;
        if (screenSize.is('xs, sm')) {
            $scope.showButtons = true;
            startDate.setDate(todayDate.getDate()-30);
            cal.init({
                itemSelector: "#cal-heatmap",
                domain: "month",
                subDomain: "day",
                data: d,
                start: startDate,
                minDate: new Date(2016,0,1),
                maxDate: new Date(2017,11,1),
                highlight: [new Date()],
                cellSize: 20,
                cellPadding: 5,
                domainGutter: 20,
                range: 2,
                displayLegend: true,
                legendCellSize: 20,
                legendVerticalPosition: "top",
                   legendHorizontalPosition: "center",
                legendMargin: [10, 0, 10, 0],
                legendTitleFormat: {
                    lower: "Absent",
                    inner: "Present",
                    upper: "Holiday"
                },
                tooltip: true,
                subDomainTitleFormat: {
                    empty: "No attendance marked for {date}"
                    //filled: "{count} {name} {date}"
                },
                domainDynamicDimension: false,
                previousSelector: "#previous-sm",
                nextSelector: "#next-sm",
                domainLabelFormat: function(date) {
                    return moment(date).format("MMMM YYYY").toUpperCase();
                },
                subDomainTextFormat: "%d",
                legend: [40],
                onClick: function(date, count) {
                    $scope.$evalAsync(
                    function( $scope ) {
                        $scope.fetchDate = moment(date).toDate();
                        }
                    );
                }
            });
            
        }else{
            startDate.setDate(todayDate.getDate()-30*4);
            cal.init({
                itemSelector: "#cal-heatmap",
                domain: "month",
                subDomain: "day",
                data: d,
                start: startDate,
                minDate: new Date(2016,0,1),
                maxDate: new Date(2017,11,1),
                highlight: [new Date()],
                cellSize: 20,
                cellPadding: 5,
                domainGutter: 20,
                range: 6,
                displayLegend: true,
                legendCellSize: 20,
                legendVerticalPosition: "top",
                   legendHorizontalPosition: "center",
                legendMargin: [10, 0, 10, 0],
                legendTitleFormat: {
                    lower: "Absent",
                    inner: "Present",
                    upper: "Holiday"
                },
                tooltip: true,
                subDomainTitleFormat: {
                    empty: "No attendance marked for {date}"
                    //filled: "{count} {name} {date}"
                },
                domainDynamicDimension: false,
                previousSelector: "#previous-lg",
                nextSelector: "#next-lg",
                domainLabelFormat: function(date) {
                    return moment(date).format("MMMM YYYY").toUpperCase();
                },
                subDomainTextFormat: "%d",
                legend: [40],
                onClick: function(date, count) {
                    $scope.$evalAsync(
                    function( $scope ) {
                        $scope.fetchDate = moment(date).toDate();
                        }
                    );
                }
            });
        }
        
        
        
        
        $scope.$watch('fetchDate', function (val) {
            $scope.filteredDate = $filter('matchDate')($scope.workingdays, val);
            $scope.daymarked = 0;
            var dayattendance;
            if($scope.filteredDate[0] == null){
                $scope.holiday = 1;
                dayattendance = null;
            }else{
                dayattendance = $scope.filteredDate[0]._attendance;
                $scope.holiday = 0;
                $scope.batch.students.forEach(function(thisStudent, studentIndex){
                    thisStudent.dayattendance = 1;
                }); 

                if(dayattendance.present.length + dayattendance.absent.length > 0){
                    var present = dayattendance.present;
                    var absent = dayattendance.absent;
                    //alert(JSON.stringify(present));
                    $scope.batch.students.forEach(function(thisStudent, studentIndex){
                        if(present.indexOf(thisStudent._id)>=0){
                            thisStudent.dayattendance = 1;
                            $scope.daymarked = 1;
                        }
                        if(absent.indexOf(thisStudent._id)>=0){
                            thisStudent.dayattendance = 0;
                            $scope.daymarked = 1;
                        }
                    });
                }
            } 
        });
        $scope.getTotal = function(){
            var total = 0;
            $scope.batch.students.forEach(function(thisStudent, studentIndex){
                if(thisStudent.dayattendance)
                    total = total + 1;
            });
            
            return total;
        }

        
        //console.info($scope.filteredDate);
        
        $scope.flip = function(thisStudent){
            thisStudent.dayattendance = !thisStudent.dayattendance;
        };
        
        $scope.markAttendance = function(){
            var fetchDateStart = moment($scope.fetchDate).startOf('day');
            var present = [];
            var absent = [];
            $scope.batch.students.forEach(function(thisStudent, studentIndex){
                if(thisStudent.dayattendance){
                    present.push(thisStudent._id);
                }else{
                    absent.push(thisStudent._id);
                }
            }); 
            
            var batchDayAttendance = {
                day : fetchDateStart,
                batchId: $scope.batch._id,
                instituteId: $scope.batch._institute,
                present: present,
                absent: absent
            };
            BatchService.markAttendance(batchDayAttendance).success(function (data, status, headers) {
                //$state.go($state.current, $stateParams, {reload: true, inherit: false});  
                $scope.daymarked = 1;
                $state.go($state.current, $stateParams, {reload: true, inherit: false});  
            })
            .error(function (data, status, header, config) {
                $scope.ServerResponse =  htmlDecode("Data: " + data +
                    "\n\n\n\nstatus: " + status +
                    "\n\n\n\nheaders: " + header +
                    "\n\n\n\nconfig: " + config);
            });    
            
        };
        
        
        
        
    }]);
        
    exambazaar.filter('makeUppercase', function () {
      return function (item) {
        return item.toUpperCase();
      };
    });
    exambazaar.filter('matchDate', function () {
      return function (items, fetchDate) {
          var returnDates = [];
          var fetchDateStart = moment(fetchDate).startOf('day');
          //console.info(fetchDateStart);
          items.forEach(function(thisDate, dateIndex){
              var thisDateStart = thisDate.date;
              if(thisDateStart.diff(fetchDateStart)==0){
                  returnDates.push(thisDate);
              }
          });
          
        return returnDates;
      };
    });
    exambazaar.controller("addBatchController", 
    [ '$scope', 'thisinstitute', 'thisglobalSubjects','globalSubjectService','BatchService','$state', function($scope, thisinstitute,thisglobalSubjects,globalSubjectService,BatchService,$state){
        $scope.institute = thisinstitute.data;
        $scope.teachers = $scope.institute.teachers;
        $scope.grades = ["Nursery", "LKG","KG","UKG","HKG", "1", "2", "3","4", "5", "6","7", "8","9", "10", "11", "12", "Pre-School","Sparsh"];
        $scope.sections = ["A", "B","C", "D","E","F", "Sc.", "Com.", "Com. A","Com. B"];
        
        //i am here
        $scope.subjects = thisglobalSubjects.data;
        //alert(JSON.stringify(thisglobalSubjects.data));
        
        //$scope.subjects = ["English", "Hindi","Science", "Mathematics","Social Science", "Physical Education"];
        $scope.subjectTeachers = [];
        $scope.addNewChoice = function() {
            var newItemNo = $scope.subjectTeachers.length+1;
            $scope.subjectTeachers.push({'id':newItemNo});
        };
        $scope.removeChoice = function() {
            var lastItem = $scope.subjectTeachers.length-1;
            $scope.subjectTeachers.splice(lastItem);
        };
        $scope.defaultBatch ={
            grade: '1',
            section: 'A',
            name: '1 A',
            batchTeacher: '58071c06c21eca195c7aedf0',
            subjects:{
                0:{
                    name: "English",
                    batchTeacher: '58071c06c21eca195c7aedf0'
                }
            }
        };
        $scope.batch = $scope.defaultBatch;
        $scope.addBatch = function () {
            $scope.batch.subjects = $scope.subjectTeachers;
            $scope.batch.instituteId = $scope.institute._id;
            var saveBatch = BatchService.saveBatch($scope.batch).success(function (data, status, headers) {
                //var batchId = data;
                //alert(batchId);
                $state.go('institute', {instituteId: $scope.institute._id});
            })
            .error(function (data, status, header, config) {
                $scope.ServerResponse =  htmlDecode("Data: " + data +
                    "\n\n\n\nstatus: " + status +
                    "\n\n\n\nheaders: " + header +
                    "\n\n\n\nconfig: " + config);
            });
        };
    }]);
    exambazaar.controller("feeStructureController", 
    [ '$scope', 'thisinstitute', 'thisglobalFeeItems','globalFeeItemService','BatchService','InstituteService','$state','$rootScope', function($scope, thisinstitute,thisglobalFeeItems,globalFeeItemService,BatchService,InstituteService,$state,$rootScope){
        $scope.institute = thisinstitute.data;
        $scope.globalFeeItems = thisglobalFeeItems.data;
        var instituteId = $scope.institute._id;
        $scope.installmentTypes =['Quarterly','Half Yearly','Yearly','Monthly'];
        if(typeof($scope.institute.feeStructure) != 'undefined'){
            //alert("Fee Structure exists");
            $scope.instituteFeeItems={};
            $scope.installments = $scope.institute.feeStructure.installments;
            //$scope.instituteFeeItems = $scope.institute.feeStructure.feeItems;
            for (var key in $scope.installments) {
                $scope.installments[key].dueDate = new Date($scope.installments[key].dueDate);
                if(typeof($scope.institute.feeStructure) != 'undefined'){
                    $scope.installments[key].startDate = new Date($scope.installments[key].startDate);
                }
            }
            for (var key in $scope.institute.feeStructure.feeItems) {
                $scope.instituteFeeItems[$scope.institute.feeStructure.feeItems[key]]=true;
            }
        }else{
            //alert("Fee Structure does not exist");  
            $scope.instituteFeeItems={};
            $scope.installments = [];
            $scope.installments = [{"sNo":1,"type":"Quarterly","name":"Apr","startDate":new Date("2016-04-01"),"dueDate":new Date("2016-04-10")},{"sNo":2,"type":"Quarterly","name":"Jul","startDate":new Date("2016-07-01"),"dueDate":new Date("2016-07-10")}];
        }
        
        
        
        
        
     
        $scope.addNewChoice = function() {
            var newItemNo = $scope.installments.length+1;
            $scope.installments.push({'sNo':newItemNo});
        };
        $scope.removeChoice = function() {
            var lastItem = $scope.installments.length-1;
            $scope.installments.splice(lastItem);
        };
        //set batch fee logic
        
        
        
        $scope.addFeeStructure = function () {
            var feeStructure ={
                instituteId: instituteId,
                instituteFeeItems: $scope.instituteFeeItems,
                installments: $scope.installments
            };  
            var saveFeeStructure = InstituteService.saveFeeStructure(feeStructure).success(function (data, status, headers) {
                //alert(data);
                $rootScope.message = 'Fee Structure saved!';
                $state.go('institute', {instituteId: instituteId});
            })
            .error(function (data, status, header, config) {
                $scope.ServerResponse =  htmlDecode("Data: " + data +
                    "\n\n\n\nstatus: " + status +
                    "\n\n\n\nheaders: " + header +
                    "\n\n\n\nconfig: " + config);
            });
        };
        
        //$scope.addNewChoice();
        
        
    }]);    
        
        
    exambazaar.controller("addTransportVehicleController", 
        [ '$scope', 'thisinstitute','InstituteService','TransportVehicleService','$http','$state', function($scope, thisinstitute,InstituteService,TransportVehicleService,$http,$state){
        $scope.TransportVehicleTypes = ["Auto","Van","Bus"];
        $scope.TransportVehicle = {
            type : 'Auto',
            registration : 'RJ147C7142',
            driver: {
                name: 'Ramesh Kumar',   
                mobile: '8000000001',
                address: {
                    street: 'Mahima Kopal',
                    city: 'Jaipur',
                    pincode: '302018'  
                }
            },
            owner: {
                name: 'Ravi Jindal',  
                mobile: '8000000002',
                address: {
                    street: 'Mahima Vishesh',
                    city: 'Jaipur',
                    pincode: '302021'  
                }
            }
        };
        $scope.institute = thisinstitute.data;
        $scope.TransportVehicle.institute = thisinstitute;
        $scope.updateDriverProfilePic = function(imageUrl){
            $scope.DriverProfilePic = imageUrl;
        };
        $scope.updateOwnerProfilePic = function(imageUrl){
            $scope.OwnerProfilePic = imageUrl;
        };
        $scope.addTransportVehicle = function () {
            //alert("here");
            if($scope.DriverProfilePic != ""){
                $scope.TransportVehicle.driver.imageUrl = $scope.DriverProfilePic;
            }
            if($scope.OwnerProfilePic != ""){
                $scope.TransportVehicle.owner.imageUrl = $scope.OwnerProfilePic;
            }
            var saveTransportVehicle = TransportVehicleService.saveTransportVehicle($scope.TransportVehicle).success(function (data, status, headers) {
                var TransportVehicleId = data;
                $state.go('institute', {instituteId: $scope.institute._id});
            })
            .error(function (data, status, header, config) {
                $scope.ServerResponse =  htmlDecode("Data: " + data +
                    "\n\n\n\nstatus: " + status +
                    "\n\n\n\nheaders: " + header +
                    "\n\n\n\nconfig: " + config);
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
    
    exambazaar.controller("addGlobalSubjectController", 
        [ '$scope', 'thisglobalSubjects','globalSubjectService','$http', function($scope,thisglobalSubjects,globalSubjectService,$http){
        //alert(JSON.stringify(thisglobalSubjects.data));
        $scope.globalSubjects = thisglobalSubjects.data;
        
        $scope.addGlobalSubject = function () {
            var saveGlobalSubject = globalSubjectService.saveglobalSubject($scope.globalSubject).success(function (data, status, headers) {
                alert("Success");
            })
            .error(function (data, status, header, config) {
                $scope.ServerResponse =  htmlDecode("Data: " + data +
                    "\n\n\n\nstatus: " + status +
                    "\n\n\n\nheaders: " + header +
                    "\n\n\n\nconfig: " + config);
            });
            };
        }]);
        
    exambazaar.controller("addGlobalFeeItemController", 
        [ '$scope', 'thisglobalFeeItems','globalFeeItemService','$http', function($scope,thisglobalFeeItems,globalFeeItemService,$http){
        //alert(JSON.stringify(thisglobalFeeItems.data));
        $scope.globalFeeItems = thisglobalFeeItems.data;
        
        $scope.addGlobalFeeItem = function () {
            var saveGlobalFeeItem = globalFeeItemService.saveglobalFeeItem($scope.globalFeeItem).success(function (data, status, headers) {
                alert("Success");
                $scope.globalFeeItem.type='';
                $scope.globalFeeItem.name='';
            })
            .error(function (data, status, header, config) {
                $scope.ServerResponse =  htmlDecode("Data: " + data +
                    "\n\n\n\nstatus: " + status +
                    "\n\n\n\nheaders: " + header +
                    "\n\n\n\nconfig: " + config);
            });
            };
    }]);
        
    exambazaar.controller("mergeUsersController", 
        [ '$scope','UserService','$http', function($scope,UserService,$http){
        
        $scope.mergeUsers = [];
        UserService.mergeUsers().success(function (data, status, headers) {
            $scope.mergeUsers = data;
        })
        .error(function (data, status, header, config) {
            $scope.ServerResponse =  htmlDecode("Data: " + data +
                "\n\n\n\nstatus: " + status +
                "\n\n\n\nheaders: " + header +
                "\n\n\n\nconfig: " + config);
        });
        
    }]);
     
     exambazaar.controller("invalidParentsController", 
        [ '$scope','ParentService','$http', function($scope,ParentService,$http){
        
        $scope.invalidParents = [];
        ParentService.invalidParents().success(function (data, status, headers) {
            $scope.invalidParents = data;
            alert("Done");
        })
        .error(function (data, status, header, config) {
            $scope.ServerResponse =  htmlDecode("Data: " + data +
                "\n\n\n\nstatus: " + status +
                "\n\n\n\nheaders: " + header +
                "\n\n\n\nconfig: " + config);
        });
        
    }]);
      
    exambazaar.controller("invalidTeachersController", 
        [ '$scope','TeacherService','$http', function($scope,TeacherService,$http){
        
        $scope.invalidTeachers = [];
        TeacherService.invalidTeachers().success(function (data, status, headers) {
            $scope.invalidTeachers = data;
            alert("Done");
        })
        .error(function (data, status, header, config) {
            $scope.ServerResponse =  htmlDecode("Data: " + data +
                "\n\n\n\nstatus: " + status +
                "\n\n\n\nheaders: " + header +
                "\n\n\n\nconfig: " + config);
        });
        
    }]);    
    
    exambazaar.controller("addTeacherController", 
        [ '$scope', 'thisinstitute','thisglobalSubjects','InstituteService','TeacherService','$http','$state','$rootScope', function($scope, thisinstitute,thisglobalSubjects,InstituteService,TeacherService,$http,$state,$rootScope){
        $scope.salutations = ["Mr", "Mrs","Miss","Dr"];
        $scope.genders = ["Female", "Male"];
        $scope.teacher = {
            basic: {
                salutation: 'Mr',
                firstName: 'Rajesh',
                lastName: 'Tiwari',
                gender: 'Male',
                dob: new Date("October 01, 1975")
            },
            contact: {
                mobile: '9829685919',
                email: 'rajesh.tiwari@gmail.com'
            },
            address: {
            street: 'JLN Marg',
            city: 'Jaipur',
            pincode: '302018'  
            }    
        };
        $scope.subjects = thisglobalSubjects.data;
        $scope.institute = thisinstitute.data;
        $scope.teacher.institute = thisinstitute;
        $scope.setTeacher = function(teacher){
            $scope.teacher = teacher;
        };
        $scope.updateProfilePic = function(imageUrl){
            $scope.profilePic = imageUrl;
            alert("Profile Pic controller" + imageUrl);
        };
        $scope.addTeacher = function () {
            var imageUrl = $rootScope.imageUrl;
            //alert(imageUrl);
            if(imageUrl != ""){
                $scope.teacher.account = {
                    imageUrl: imageUrl
                };
                alert("Profile Pic controller 2" + $scope.teacher.account.imageUrl);
            }
            
            //alert(JSON.stringify(names));
            var saveTeacher = TeacherService.saveTeacher($scope.teacher).success(function (data, status, headers) {
            var teacherId = data;
            
            $state.go('institute', {instituteId: $scope.institute._id});
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
        [ '$scope', 'MasterService','$http','$state', function($scope, MasterService,$http,$state){
        $scope.salutations = ["Mr", "Mrs","Miss","Dr"];
        $scope.genders = ["Female", "Male"];
        $scope.master = {
            basic: {
                salutation: 'Mr',
                firstName: 'Gaurav',
                lastName: 'Parashar',
                gender: 'Male',
                dob: new Date("April 29, 1989")
            },
            contact: {
                mobile: '9829685919',
                email: 'gauravparashar294@gmail.com'
            },
            address: {
            street: 'A 12 Model Town',
            city: 'Jaipur',
            pincode: '302017'  
            }    
        };
        $scope.updateProfilePic = function(imageUrl){
            $scope.profilePic = imageUrl;
            //alert(imageUrl);
        };
        $scope.addMaster = function () {
            if($scope.profilePic != ""){
                $scope.master.account = {
                    imageUrl: $scope.profilePic
                };
            }
            var saveMaster = MasterService.saveMaster($scope.master).success(function (data, status, headers) {
            var masterId = data;
            $scope.formmessage = "Master " + $scope.master.basic.firstName + " " + $scope.master.basic.lastName + " saved!";
            $state.go('master', {masterId: masterId});
            })
            .error(function (data, status, header, config) {
                $scope.ServerResponse =  htmlDecode("Data: " + data +
                    "\n\n\n\nstatus: " + status +
                    "\n\n\n\nheaders: " + header +
                    "\n\n\n\nconfig: " + config);
            });
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
    exambazaar.controller("addAdminController", 
        [ '$scope', 'thisinstitute','InstituteService','AdminService','$http','$state', function($scope, thisinstitute,InstituteService,AdminService,$http,$state){
        $scope.salutations = ["Mr", "Mrs","Miss","Dr"];
        $scope.genders = ["Female", "Male"];
        $scope.admin = {
            basic: {
                salutation: 'Mr',
                firstName: 'Deepak',
                lastName: 'Maheshwari'
            },
            contact: {
                mobile: '7891515715',
                email: ''
            },
            address: {
            street: 'D-275, Todarmal Marg, Govind Nagar East, Bani Park',
            city: 'Jaipur',
            pincode: '302016'  
            }    
        };
        
        $scope.institute = thisinstitute.data;
        $scope.admin.institute = $scope.institute._id;
        
        $scope.updateProfilePic = function(imageUrl){
            $scope.profilePic = imageUrl;
            //alert(imageUrl);
        };
        $scope.addAdmin = function () {
            if($scope.profilePic != ""){
                $scope.admin.account = {
                    imageUrl: $scope.profilePic
                };
            }
            console.info($scope.admin);
            var saveAdmin = AdminService.saveAdmin($scope.admin).success(function (data, status, headers) {
            var adminId = data;
            $scope.formmessage = "Admin " + $scope.admin.basic.firstName + " " + $scope.admin.basic.lastName + " saved!";
            
            $state.go('institute', {instituteId: $scope.institute._id});
            })
            .error(function (data, status, header, config) {
                console.info(data + " " +header);
            });
            };
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
                    templateUrl: 'landing.html',
                    controller: 'landingController'
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
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
        .state('editBatchesTeachers', {
            url: '/:instituteId/editBatchesTeachers',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'editBatchesTeachers.html',
                    controller: 'editBatchesTeachersCtrl'
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
        .state('editSubjectTeachers', {
            url: '/:instituteId/editSubjectTeachers',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'editSubjectTeachers.html',
                    controller: 'editSubjectTeachersCtrl'
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
                institute: function() { return {}; },
                thisglobalSubjects: ['globalSubjectService', '$stateParams',
                    function(globalSubjectService,$stateParams){
                    return globalSubjectService.getglobalSubjects();
                }],
                globalSubject: function() { return {}; }
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
    
        .state('teacher', {
            url: '/teacher/:teacherId/main',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'teacher.html',
                    controller: 'teacherController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                thisteacher: ['TeacherService', '$stateParams',
                    function(TeacherService,$stateParams){
                    return TeacherService.getBasicTeacher($stateParams.teacherId);
                }],
                teacher: function() { return {}; }
            }
        })
        .state('teacher-batches', {
            url: '/teacher/:teacherId/batches',
            views: {
                'header':{
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'body':{
                    templateUrl: 'teacher-batches.html',
                    controller: 'teacherController',
                },
                'footer': {
                    templateUrl: 'footer.html'
                }
            },
            resolve: {
                thisteacher: ['TeacherService', '$stateParams',
                    function(TeacherService,$stateParams){
                    return TeacherService.getTeacher($stateParams.teacherId);
                }],
                teacher: function() { return {}; }
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
            url: '/coaching/:city', //masterId?
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
        .state('targetStudyProviders', {
            url: '/coaching/targetStudy/:city', //masterId?
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
                
                institutesList: ['InstituteService',
                    function(InstituteService) {
                    return InstituteService.getInstitutes();
                }],
                institute: function() { return {}; },
                studentsCount: ['StudentService',
                    function(StudentService) {
                    return StudentService.getStudentsCount();
                }],
                teachersCount: ['TeacherService',
                    function(TeacherService) {
                    return TeacherService.getTeachersCount();
                }],
                parentsCount: ['ParentService',
                    function(ParentService) {
                    return ParentService.getParentsCount();
                }],
                adminsCount: ['AdminService',
                    function(AdminService) {
                    return AdminService.getAdminsCount();
                }],
                mastersCount: ['MasterService',
                    function(MasterService) {
                    return MasterService.getMastersCount();
                }],
                usersCount: ['UserService',
                    function(UserService) {
                    return UserService.getUsersCount();
                }],
                verifiedUsersCount: ['UserService',
                    function(UserService) {
                    return UserService.getVerfiedUsersCount();
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
            //$locationProvider.html5Mode(true);
        });
        
    })();

exambazaar.run(function($rootScope) {
    $rootScope.navBarTitle = 'exambazaar.com';
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

function upload(file) {   
    if (!file || !file.type.match(/image.*/)) return;
        document.body.className = "uploading";
        
        var fd = new FormData();
        fd.append("image", file);
        fd.append("key", "8401abb9b66125a10a2bcca68187c0a414bf6f89");
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://api.imgur.com/3/image.json");
        xhr.onload = function() {
            document.querySelector("#imgsrc").src = JSON.parse(xhr.responseText).data.link;
            document.body.className = "uploaded";
            angular.element(document.getElementById('MainWrap')).scope().updateProfilePic(JSON.parse(xhr.responseText).data.link);
        }
        xhr.setRequestHeader('Authorization', 'Client-ID a1dc6fb18b097c6');
        xhr.send(fd);    
}

function uploadStudentProfilePic(file) {   
    if (!file || !file.type.match(/image.*/)) return;
        document.body.className = "uploading";
        
        var fd = new FormData();
        fd.append("image", file);
        fd.append("key", "8401abb9b66125a10a2bcca68187c0a414bf6f89");
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://api.imgur.com/3/image.json");
        xhr.onload = function() {
            document.querySelector("#imgsrc").src = JSON.parse(xhr.responseText).data.link;
            document.body.className = "uploaded";
            
           alert(JSON.parse(xhr.responseText).data.link); angular.element(document.getElementById('studentForm')).scope().updateProfilePic(JSON.parse(xhr.responseText).data.link);
        }
        xhr.setRequestHeader('Authorization', 'Client-ID a1dc6fb18b097c6');
        xhr.send(fd);    
}

function uploadTeacherProfilePic(file) {   
    if (!file || !file.type.match(/image.*/)) return;
        
        var fd = new FormData();
        fd.append("image", file);
        fd.append("key", "8401abb9b66125a10a2bcca68187c0a414bf6f89");
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://api.imgur.com/3/image.json");
        xhr.onload = function() {
            document.querySelector("#imgsrc").src = JSON.parse(xhr.responseText).data.link;
            alert(JSON.stringify(angular.element(document.getElementById('addTeacherForm') ).scope()));
            var imageUrl = JSON.parse(xhr.responseText).data.link;
            angular.element(document.getElementById("addTeacherForm")).scope().updateProfilePic(imageUrl);
        }
        xhr.setRequestHeader('Authorization', 'Client-ID a1dc6fb18b097c6');
        xhr.send(fd);    
        
}
function uploadAdminProfilePic(file) {   
    if (!file || !file.type.match(/image.*/)) return;
        document.body.className = "uploading";
        var fd = new FormData();
        fd.append("image", file);
        fd.append("key", "8401abb9b66125a10a2bcca68187c0a414bf6f89");
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://api.imgur.com/3/image.json");
        xhr.onload = function() {
            document.querySelector("#imgsrc").src = JSON.parse(xhr.responseText).data.link;
            document.body.className = "uploaded";
            angular.element(document.getElementById('addAdminForm')).scope().updateProfilePic(JSON.parse(xhr.responseText).data.link);
        }
        xhr.setRequestHeader('Authorization', 'Client-ID a1dc6fb18b097c6');
        xhr.send(fd);    
}
function uploadMasterProfilePic(file) {   
    if (!file || !file.type.match(/image.*/)) return;
        document.body.className = "uploading";
        var fd = new FormData();
        fd.append("image", file);
        fd.append("key", "8401abb9b66125a10a2bcca68187c0a414bf6f89");
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://api.imgur.com/3/image.json");
        xhr.onload = function() {
            document.querySelector("#imgsrc").src = JSON.parse(xhr.responseText).data.link;
            document.body.className = "uploaded";
            angular.element(document.getElementById('addMasterForm')).scope().updateProfilePic(JSON.parse(xhr.responseText).data.link);
        }
        xhr.setRequestHeader('Authorization', 'Client-ID a1dc6fb18b097c6');
        xhr.send(fd);    
}
function uploadTransportVehicleOwnerProfilePic(file) {   
    if (!file || !file.type.match(/image.*/)) return;
        document.body.className = "uploading";
        
        var fd = new FormData();
        fd.append("image", file);
        fd.append("key", "8401abb9b66125a10a2bcca68187c0a414bf6f89");
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://api.imgur.com/3/image.json");
        xhr.onload = function() {
            document.querySelector("#imgsrc").src = JSON.parse(xhr.responseText).data.link;
            document.body.className = "uploaded";
            angular.element(document.getElementById('addTransportVehicleForm')).scope().updateOwnerProfilePic(JSON.parse(xhr.responseText).data.link);
        }
        xhr.setRequestHeader('Authorization', 'Client-ID a1dc6fb18b097c6');
        xhr.send(fd);    
}
function uploadTransportVehicleDriverProfilePic(file) {   
    if (!file || !file.type.match(/image.*/)) return;
        document.body.className = "uploading";
        
        var fd = new FormData();
        fd.append("image", file);
        fd.append("key", "8401abb9b66125a10a2bcca68187c0a414bf6f89");
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://api.imgur.com/3/image.json");
        xhr.onload = function() {
            document.querySelector("#imgsrc").src = JSON.parse(xhr.responseText).data.link;
            document.body.className = "uploaded";
            angular.element(document.getElementById('addTransportVehicleForm')).scope().updateDriverProfilePic(JSON.parse(xhr.responseText).data.link);
        }
        xhr.setRequestHeader('Authorization', 'Client-ID a1dc6fb18b097c6');
        xhr.send(fd);    
}
function generateOtp(min, max) {
    min = 1000;
    max = 9999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}