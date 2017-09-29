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
                console.log("Data: " + data +
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
    
        
exambazaar.controller("rentvsbuyController", 
        [ '$scope', '$http', '$rootScope','$state', '$mdDialog','$timeout','Notification', function($scope, $http, $rootScope, $state, $mdDialog, $timeout, Notification){
            
            $rootScope.pageTitle = 'Rent vs Buy';
            
            $scope.aedinr = 17.4;
            $scope.area = 1656;
            $scope.pricepersqft = 1500;
            $scope.servicechargepersqft = 27;
            $scope.registrationpercentage = 5;
            $scope.registrationFixed = 368;
            $scope.brokercommission = 2;
            $scope.equityPercentage = 25;
            $scope.loanTenure = 25;
            $scope.fixedTenure = 2;
            $scope.fixedDebtPercentage = 3.5;
            $scope.maxFine = 10000;
            $scope.floatingDebtSpreadPercentage = 2.5;
            $scope.IBORRates = [];
            
            $scope.frequencyOptions = ['month','quarter','half year','year'];
            $scope.interestFrequency = 'month';
            $scope.paymentFrequency = 'month';
            $scope.startOfLoan = moment().startOf('day');
            
            $scope.initiatedEMI = 11000;
            $scope.avgIBOR = 3;
            $scope.IBORtouched = false;
            $scope.fastPayMode = false;
            $scope.fastPayPercent = 0;
            
            $scope.fastPay = function(){
                $scope.fastPayMode = true;
                $scope.fastPayPercent = 20;
                $scope.initiate($scope.initiatedEMI);
            };
            $scope.undofastPay = function(){
                $scope.fastPayMode = false;
                $scope.fastPayPercent = 0;
                $scope.initiate($scope.initiatedEMI);
            };
            $scope.initiateIBOR = function(){
                
                if(!$scope.IBORtouched){
                    $scope.IBORRates = [];
                   $scope.loanDates.forEach(function(thisDate, dindex){
                    var newIBORRate = {
                            _date: thisDate,
                            IBOR: $scope.avgIBOR,
                        };
                    $scope.IBORRates.push(newIBORRate);   
                    });
                }else{
                    
                }
            };
            
            $scope.initiateServiceCharges = function(){
                $scope.annualservices = [];
                $scope.loanDates.forEach(function(thisDate, dindex){
                    if(dindex%12 == 0  && dindex > 0){
                       var newServiceCharge = {
                            _date: thisDate,
                            amount: $scope.annualServiceCharge,
                        };
                        $scope.annualservices.push(newServiceCharge);
                    }else{
                        var newServiceCharge = {
                            _date: thisDate,
                            amount: 0,
                        };
                        $scope.annualservices.push(newServiceCharge);
                    }
                });
            };
            
            $scope.setIBOR = function(){
                $scope.IBORtouched = true;
                $scope.IBORRanges = [];
                var nMonths = 12;
                
                $scope.IBORRates.forEach(function(thisIBOR, iindex){
                    
                    if(iindex % nMonths == 0 && iindex > 0){
                        var newRange = {
                            startMonth:iindex-nMonths,
                            endMonth: iindex-1,
                            startString: $scope.IBORRates[iindex-nMonths]._date.format('MMM YYYY'),
                            endString: $scope.IBORRates[iindex-1]._date.format('MMM YYYY'),
                            IBOR: $scope.IBORRates[iindex-nMonths].IBOR
                        };
                        $scope.IBORRanges.push(newRange); 
                    }
                    
                });
                
                $scope.showIBORDialog();
            };
            $scope.saveIBORChanges = function(){
                $mdDialog.hide();
                $scope.IBORRanges.forEach(function(thisIBORRange, rindex){
                    var startMonth = thisIBORRange.startMonth;
                    var endMonth = thisIBORRange.endMonth;
                    var IBOR = Number(thisIBORRange.IBOR);
                    
                    if(IBOR && IBOR != ''){
                        var i = 0;
                        for(i=startMonth; i<=endMonth; i++){
                            $scope.IBORRates[i].IBOR = IBOR;
                            
                        }
                    }
                    
                });
                console.log($scope.IBORRates);
                $scope.initiate($scope.initiatedEMI);
            };
            
            $scope.setNumbers = function(){
                $scope.area = Number($scope.area);
                $scope.pricepersqft = Number($scope.pricepersqft);
                $scope.registrationpercentage = Number($scope.registrationpercentage);
                $scope.brokercommission = Number($scope.brokercommission);
                $scope.servicechargepersqft = Number($scope.servicechargepersqft);
                $scope.equityPercentage = Number($scope.equityPercentage);
                $scope.loanTenure = Number($scope.loanTenure);
                $scope.fixedTenure = Number($scope.fixedTenure);
                $scope.fixedDebtPercentage = Number($scope.fixedDebtPercentage);
                $scope.floatingDebtSpreadPercentage = Number($scope.floatingDebtSpreadPercentage);
                $scope.avgIBOR = Number($scope.avgIBOR);
                
            };
            
            $scope.initiate = function(emi){
                
                $scope.setNumbers();
                //$scope.busy = true;
                $scope.loanDates = [];
                $scope.payments = [];
                $scope.prepaymentFines = [];
                $scope.principals = [];
                $scope.principalsRepaid = [];
                $scope.interests = [];
                $scope.interestRates = [];
                $scope.annualservices = [];
                
                
                $scope.basicFlatPrice = $scope.area * $scope.pricepersqft;
                $scope.annualServiceCharge = $scope.servicechargepersqft*$scope.area;
                $scope.registrationFee = $scope.registrationpercentage*$scope.basicFlatPrice /100 + $scope.registrationFixed;
                $scope.brokerageFee = $scope.brokercommission*$scope.basicFlatPrice /100;
                
                $scope.fullFlatPrice = $scope.basicFlatPrice + $scope.registrationFee + $scope.brokerageFee;
                
                $scope.equityValue = $scope.equityPercentage/100 * $scope.fullFlatPrice;
                $scope.debtValue = (100-$scope.equityPercentage)/100 * $scope.fullFlatPrice;
                
                
                var i = 1;
                var nPayments = $scope.loanTenure * 12;
                var nFixeds = $scope.fixedTenure * 12;
                
                $scope.loanDates.push($scope.startOfLoan);
                for(i=1; i<=nPayments; i++){
                    var newDate = moment().startOf('day').add(i,'months');
                   $scope.loanDates.push(newDate);
                }
                
                $scope.loanDates.forEach(function(thisDate, dindex){
                    if(dindex == 0){
                        var newPayment = {
                            _date: thisDate,
                            amount: 0,
                        };
                    }else{
                        var newPayment = {
                            _date: thisDate,
                            amount: emi,
                        };
                    }
                    
                    
                    if($scope.fastPayMode){
                        newPayment.amount = (1 + $scope.fastPayPercent/100)*newPayment.amount;
                        
                        var outPayment = (newPayment.amount-emi);
                        var outPaymentPercent = (newPayment.amount-emi)*100/emi;
                        if(outPaymentPercent > 20){
                            var fineA = outPayment*1/100;
                            var fine = Math.min(fineA,$scope.maxFine);
                           var newPrepaymentFine = {
                                _date: thisDate,
                                amount: fine,
                           }
                           $scope.prepaymentFines.push(newPrepaymentFine);
                       }else{
                           var newPrepaymentFine = {
                                _date: thisDate,
                                amount: 0,
                           }
                           $scope.prepaymentFines.push(newPrepaymentFine);
                       }
                    }
                    
                    $scope.payments.push(newPayment);
                    
                });
                $scope.initiateIBOR();
                $scope.initiateServiceCharges();
                
                
                $scope.payments.forEach(function(thisPayment, pindex){
                    if(pindex == 0){
                        var newPrincipal = {
                            _date: thisPayment._date,
                            amount: $scope.debtValue,
                        };
                        var newPrincipalRepaid = {
                            _date: thisPayment._date,
                            amount: 0,
                        };
                        var newInterest = {
                            _date: thisPayment._date,
                            amount: 0,
                        };
                        var newInterestRate = {
                            _date: thisPayment._date,
                            rate: 0,
                        };
                        $scope.principals.push(newPrincipal);
                        $scope.principalsRepaid.push(newPrincipalRepaid);
                        $scope.interests.push(newInterest);
                        $scope.interestRates.push(newInterestRate);
                    }else{
                        
                        var thisInterestRate = 2;
                        if(pindex < nFixeds){
                            thisInterestRate = $scope.fixedDebtPercentage;
                        }else{
                            thisInterestRate = $scope.floatingDebtSpreadPercentage + $scope.IBORRates[pindex].IBOR;
                        }
                        
                        var newInterestRate = {
                            _date: thisPayment._date,
                            rate: thisInterestRate,
                        };
                        $scope.interestRates.push(newInterestRate);
                        
                        var oldPrincipal = 0;
                        if($scope.principals[pindex-1]){
                            oldPrincipal = $scope.principals[pindex-1].amount;
                        }
                        //console.log(oldPrincipal);
                        var newInterest = {
                            _date: thisPayment._date,
                            amount: oldPrincipal* thisInterestRate/100*1/12,
                        };
                        $scope.interests.push(newInterest);
                        
                        var interestRepaid = Math.min(newInterest.amount, thisPayment.amount);
                        
                        var principalRepaid = Math.max(thisPayment.amount - interestRepaid, 0);
                        
                        var newPrincipal = {
                            _date: thisPayment._date,
                            amount: oldPrincipal - principalRepaid,
                        };
                        
                        var newPrincipalRepaid = {
                            _date: thisPayment._date,
                            amount: principalRepaid,
                        };
                        $scope.principals.push(newPrincipal);
                        
                        $scope.principalsRepaid.push(newPrincipalRepaid);
                    }
                });
                var pLen = $scope.principals.length;
                $scope.outstandingPrincipal = $scope.principals[pLen-1];
                
                $scope.totalInterestPaid = 0;
                $scope.totalPrincipalPaid = 0;
                $scope.totalServiceChargePaid = 0;
                $scope.interests.forEach(function(thisInterest, pindex){
                    $scope.totalInterestPaid += thisInterest.amount;
                    $scope.totalPrincipalPaid += $scope.principalsRepaid[pindex].amount;
                    $scope.totalServiceChargePaid += $scope.annualservices[pindex].amount;
                });
                
            };
            
            
                
            
            //$scope.startOfLoan = moment().startOf('day');//.subtract(3, "days")
            
            
            
            $scope.calculateEMI = function(){
                
                $scope.initiatedEMI = Number($scope.initiatedEMI);
                $scope.emistep = 10;
                $scope.emiiters = 500;
                
                $scope.emivals = [];
                
                var i = 0;
                
                for(i=$scope.emiiters; i>0; i--){
                    
                    if($scope.initiatedEMI - i * $scope.emistep > 0){
                        var newEMIval = {
                            emi: $scope.initiatedEMI - i * $scope.emistep,
                            principalLeft: null,
                        };
                        $scope.emivals.push(newEMIval);
                    }
                    
                    
                    
                }
                var newEMIval = {
                    emi: $scope.initiatedEMI,
                    principalLeft: null,
                };
                $scope.emivals.push(newEMIval);
                for(i=1; i<=$scope.emiiters; i++){
                    var newEMIval = {
                        emi: $scope.initiatedEMI + i * $scope.emistep,
                        principalLeft: null,
                    };
                   
                    $scope.emivals.push(newEMIval);
                }
                
            
                
                $scope.emivals.forEach(function(thisEMI, eindex){
                    
                    
                    $scope.initiate(thisEMI.emi);
                    var pLen = $scope.principals.length;
                    thisEMI.principalLeft = $scope.principals[pLen-1].amount;
                    
                    
                    //console.log(thisEMI.emi + ' ' + thisEMI.principalLeft);
                });
                var inflection = -1;
                $scope.emivals.forEach(function(thisEMI, eindex){
                    
                    
                    if(eindex > 0){
                        var prevEMI = $scope.emivals[eindex-1];
                        if(thisEMI.principalLeft*prevEMI.principalLeft < 0){
                            inflection = eindex;
                            
                        }
                        
                    }
                });
                
                if(inflection != -1){
                    console.log('EMI between: ' + $scope.emivals[inflection-1].emi + ' and ' + $scope.emivals[inflection].emi);
                    $scope.initiatedEMI = $scope.emivals[inflection-1].emi;
                    $scope.initiate($scope.initiatedEMI);
                    
                    Notification.success("Great, we have found the EMI to be " + $scope.initiatedEMI + ' AED per month!');
                    Notification.primary("Scroll down for cashflow details");
                    
                }else{
                    $scope.initiate($scope.initiatedEMI);
                    if($scope.emivals[0].principalLeft > 0){
                        console.log('EMI iterated between: ' + $scope.emivals[0].emi + ' and ' + $scope.emivals[$scope.emivals.length-1].emi);
                        Notification.warning("No solution found! Increase the Intial EMI");
                        console.log('No solution found! Increase Intial EMI');
                    }else{
                        console.log('EMI iterated between: ' + $scope.emivals[0].emi + ' and ' + $scope.emivals[$scope.emivals.length-1].emi);
                        Notification.warning("No solution found! Decrease Intial EMI");
                        console.log('No solution found! Decrease the Intial EMI');
                    }
                }
                
                
                
            };
            $scope.$watch('initiatedEMI', function (newValue, oldValue, scope) {
                if(newValue != null && newValue != ''){
                    $scope.initiate(newValue);
                }
                
            }, true);
            $scope.calculateEMI();
            
            $scope.closeDialog = function(){
                $mdDialog.hide();   
            };
            
            $scope.showChartDialog = function(ev) {
            $mdDialog.show({
                  contentElement: '#chartDialog',
                  parent: angular.element(document.body),
                  targetEvent: ev,
                  clickOutsideToClose: true
                }).finally(function() {
                    //$scope.userReviewMode = true;
                });
            };
            $scope.showIBORDialog = function(ev) {
            $mdDialog.show({
                  contentElement: '#IBORDialog',
                  parent: angular.element(document.body),
                  targetEvent: ev,
                  clickOutsideToClose: true
                }).finally(function() {
                    //$scope.userReviewMode = true;
                });
            };
            $scope.seeChart = function(){
                $scope.charts = [];
                $scope.viewoptions = {
                    legend: {
                        display: true,
                        labels: {
                            fontColor: "#000080",
                        }
                    },
                    scales: {
                      yAxes: [
                        {
                          id: 'y-axis-1',
                          type: 'linear',
                          display: true,
                          position: 'left',
                          ticks: {
                            suggestedMin: 0,
                            beginAtZero: true
                          }
                        },
                        {
                          id: 'y-axis-2',
                          type: 'linear',
                          display: true,
                          position: 'right',
                          ticks: {
                            suggestedMin: 0,
                            beginAtZero: true
                          }
                        },  
                      ]
                    },
                    title: {
                        display: true,
                        text: 'EMI, Principal, Interest Chart'
                    }
                };

                var principals = $scope.principals.map(function(a) {return Math.round(a.amount);});
                var principalsRepaid = $scope.principalsRepaid.map(function(a) {return Math.round(a.amount);});
                var interests = $scope.interests.map(function(a) {return Math.round(a.amount);});
                var payments = $scope.payments.map(function(a) {return Math.round(a.amount);});
                var newChart = {
                    labels: $scope.principals.map(function(a) {return moment(a._date).format('DD MMM YY');}),
                    series: ['Outstanding Principal','Interest Due','Monthly Payment','Towards Principal'],
                    data: [principals, interests, payments, principalsRepaid],
                    datasetOverride: [{yAxisID: 'y-axis-1'},{yAxisID: 'y-axis-2'},{yAxisID: 'y-axis-2'},{yAxisID: 'y-axis-2'}],
                    options: $scope.viewoptions
                };
                $scope.charts.push(newChart);
                
                $scope.showChartDialog();
            };
    }]);