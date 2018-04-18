var express = require('express');
//var FuzzySet = require('FuzzySet');
var router = express.Router();

var config = require('../config/mydatabase.js');
var FuzzySet = require('../app/models/fuzzyset.js');
var master = require('../app/models/master');
var intern = require('../app/models/intern');
var address = require('../app/models/address');
var college = require('../app/models/college');
var sourceUrl = require('../app/models/sourceUrl');
var clusterUrl = require('../app/models/clusterUrl');
var user = require('../app/models/user');
var provider = require('../app/models/provider');
var coaching = require('../app/models/coaching');

var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');
var bcrypt   = require('bcrypt-nodejs');

var unirest = require('unirest');
var cheerio = require('cheerio');

var NodeGeocoder = require('node-geocoder');

//to add a master
router.post('/save', function(req, res) {
    var thisMaster = req.body;
    console.log(thisMaster._id);
    
    if(thisMaster._id){
        console.log("Yes master exists")
    }
    
    var thisAddress = new address({
        street:thisMaster.address.street,
        city:thisMaster.address.city,
        pincode:thisMaster.address.pincode,
        tel:thisMaster.address.tel
    });

    var this_master = new master({
        basic: {
            salutation: thisMaster.basic.salutation,
            firstName: thisMaster.basic.firstName,
            lastName: thisMaster.basic.lastName,
            middleName: thisMaster.basic.middleName,
            gender: thisMaster.basic.gender,
            dob: thisMaster.basic.dob,
        },
        /*account: {
            imageUrl:thisMaster.account.imageUrl
        },*/
        contact: {
        mobile: thisMaster.contact.mobile,
        email: thisMaster.contact.email
        },
        address: thisAddress
    });
    this_master.save(function(err, this_master) {
        if (err) return console.error(err);
        console.log("Saved master with id: " + this_master._id);
        var hash = bcrypt.hashSync(thisMaster.basic.lastName, bcrypt.genSaltSync(10));
        var this_user = new user({
            userType : 'Master',
            firstName : thisMaster.basic.firstName,
            //userName : thisMaster.contact.mobile+"_"+thisMaster.basic.firstName,
            mobile : thisMaster.contact.mobile,
            password : hash,
            _master : this_master._id
        });
        this_user.save(function(err, this_user) {
            if (err) return console.error(err);
            console.log("User master with id: " + this_user._id);
        });
        
        res.json(this_master._id);
    });

});




//to get all masters
router.get('/', function(req, res) {
    master.find({}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});


router.get('/count', function(req, res) {
    master.count({}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

router.post('/extractEmails/', function(req, res) {
    var params = req.body;
    var limit = params.limit;
    var skip = params.skip;
    console.log(limit + " " + skip);
    
    var images = ['.jpg','.png','.jpeg','.gif'];
    var validExtensions = ['.com', '.in', '.biz'];
    var providerIds = req.body;
    var counter = 0;
    var listingNo = 0;
    var nTotalUpdates = 0;
    var nWebsites = 0;
    var nWorkingWebsites = 0;
    var allEmails = [];
    var validEmail = true;
    //_id:{$in: providerIds}
    //{website: {$exists: true}, $where:"this.website.length>0 && this.website[0] !=''"}
    var allGroupProviders = coaching.find({website: {$exists: true}, $where:"this.website.length>0 && this.website[0] !=''"}, {website:1, email: 1, name:1},function(err, allGroupProviders) {
    if (!err){
        var nProviders = allGroupProviders.length;
        console.log('Fetching emails for: ' + nProviders + ' coachings');
        
        allGroupProviders.forEach(function(thisGroup, index){
            if(index % 100 == 0){
                console.log('Extracting for institute: ' + index);
            }
            var thisWebsites = thisGroup.website;
            var thisGroupEmail = thisGroup.email;
            /*if(Array.isArray(thisGroupEmail)){
                
            }else{
                console.log('Converting Email from string to array: ' + thisGroup._id);
                var res = thisGroupEmail.split(",");
                if(res && res.length > 0){
                    thisGroupEmail = res;
                }else{
                    thisGroupEmail = [thisGroupEmail];
                }
            }*/
            var nWebsites = thisWebsites.length;
            var counter2 = 0;
            
            thisWebsites.forEach(function(newWebsite, windex){
                var url = newWebsite;
                if(newWebsite){
                    //nWebsites += 1;
                    var Request = unirest.get(url);
                    Request.headers({
                      'Accept': 'application/json',
                      'Accept-Language': 'en-us',
                      'User-Agent': 'Unirest Node.js'
                    });

                    Request.timeout(1000000).end(function (response) {
                        if (response.error) {
                            listingNo = listingNo + 1;
                            console.log(JSON.stringify("Error: " + listingNo + '. ' + thisGroup.name));
                        }else{
                            nWorkingWebsites += 1;
                            var sourceCode = response.body;
                            if(sourceCode){
                                var allEmails = sourceCode.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
                            var thisEmails = [];
                            
                            if(!allEmails){
                                allEmails = [];
                            }
                            
                            allEmails.forEach(function(newEmail, eindex){
                                validEmail = false;
                                validExtensions.forEach(function(validExtension, vindex){
                                    if(newEmail.indexOf(validExtension) != -1){
                                        validEmail = true;
                                    }
                                });
                                images.forEach(function(imgExtension, iindex){
                                    if(newEmail.indexOf(imgExtension) != -1){
                                        validEmail = false;
                                    }
                                });
                                //validEmail = true;
                                if(validEmail){
                                    thisEmails.push(newEmail);
                                }
                            });

                            if(thisEmails.length > 0){
                                listingNo = listingNo + 1;
                                thisEmails = thisEmails.filter(onlyUnique);
                                allEmails.push(thisEmails);
                                var nEmailUpdates = 0;
                                console.log(JSON.stringify(listingNo + '. ' + thisGroup._id + '  ' + thisEmails));
                                
                                
                                thisEmails.forEach(function(newEmail, eindex){
                                    if(thisGroupEmail.indexOf(newEmail) == -1){
                                        thisGroupEmail.push(newEmail);
                                        nEmailUpdates += 1;
                                        nTotalUpdates += 1;
                                    }
                                });
                                
                                if(nEmailUpdates > 0){
                                   thisGroup.save(function(err, thisGroup) {
                                        if (err) return console.error(err);
                                        console.log(thisGroup.name + " saved!");
                                        console.log("Total emails added are: " + nTotalUpdates);
                                    });
                                }
                                
                                
                            }
                            }    
                      }  
                    });
                }
                counter2 += 1;
                if(counter2 == nWebsites){
                    allEmails = allEmails.filter(onlyUnique);
                    console.log(JSON.stringify(allEmails));
                    console.log('Out of ' + nProviders + ' providers, ' + nWebsites + ' websites could load and ' + nWorkingWebsites + ' were working. We found ' + allEmails.length + ' emails!');
                }
                
            });
            
            counter += 1;
            
            
        });
        
        
        res.json('Done');
    } else {throw err;}
    }).limit(limit).skip(skip);
    
    
});


router.post('/urls/', function(req, res) {
    //var urls = req.params.urls;
    var urls = req.body;
    
    urls.forEach(function(thisurl, index){
        var url = thisurl.url;
        var thisproviders = provider.find({'website': url}, { website:1},function(err, thisproviders) {
        if (!err){
            
        if(thisproviders.length==0){
            //need to create
            console.log("-------------------------- Adding new coaching institute " + url);
            var Request = unirest.get(url);
            /*.headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
            .send({ "parameter": 23, "foo": "bar" })*/
            //.timeout(2000)
            Request.headers({
              'Accept': 'application/json',
              'Accept-Language': 'en-us',
              'User-Agent': 'Unirest Node.js'
            });
            Request.timeout(600000).end(function (response) {
                if (response.error) {
                    console.log('GET error', response.error)
                }else{



                var sourceCode = response.body;
                //console.log(sourceCode);
                var $ = cheerio.load(sourceCode, {
                    normalizeWhitespace: true,
                    xmlMode: true
                });
                //console.log(url);
                //commenhead clearfix
                //var list = $('div');
                var name = $('.commenhead.clearfix').find('h1').text();
                var area = $('.commenhead.clearfix').find('h1').find('span').text();
                name = name.replace(area,"");
                //var name2 = $('.commenhead.clearfix').html();
                //var phoneNo = $('.phone_no_cellh2').text();
                var phoneNo = [];
                $('.phone_no_cellh2').each(function(i, elem) {
                  phoneNo[i] = $(this).text();
                });
                var address = [];
                $('.phone_no_cellhadd').each(function(i, elem) {
                  address[i] = $(this).text();
                });
                //tab_inner_row

                var courses = [];
                $('#sectionA').each(function(i, elem) {
                    courses[i] = $(this).text().replace(name,"").trim();
                });
                //console.log("Url is: " + url);
                //console.log("Coaching is: " + name);
                //console.log(courses);
                //console.log($);


                if(courses.length>=1){
                    var sectionA = courses[0].replace(name,"").trim();

                    //console.log(sectionA);
                    var pivot1 = sectionA.search("Facilities");
                    var pivot2 = sectionA.search("adsbygoogle");
                    //var coursesOffered = 

                    var sectionA1 = sectionA.substring(16, pivot1).trim();
                    var sectionA2 = sectionA.substring(pivot1+11, pivot2-1).trim();
                    var pivotB1 = sectionA2.search("Unavailable");
                    var sectionA2B1 = sectionA2.substring(11,pivotB1).trim();
                    var sectionA2B2 = sectionA2.substring(pivotB1+11,sectionA2.length).trim();
                    //console.log(pivot1 + " " + pivot2);
                    var coursesOffered = sectionA1.split('          ');
                    var facilities_available = sectionA2B1.split('   ');
                    var facilities_unavailable = sectionA2B2.split('   ');


                    /*console.log(sectionA1);
                    console.log(sectionA2B1);
                    console.log(sectionA2B2);*/

                    var facultyStudents;
                    var otherinfo = [];
                    $('.tab_inner_row').each(function(i, elem) {
                        otherinfo[i] = $(this).text().trim();
                        if(otherinfo[i].includes("Faculty Size")){
                            facultyStudents = otherinfo[i].split("  ");
                        }
                    });
                    var faculty = facultyStudents[0];
                    var splitIndex = faculty.search(":");
                    faculty = faculty.substring(splitIndex+1, faculty.length).trim();

                    var students = facultyStudents[1];
                    var splitIndex = students.search(":");
                    students = students.substring(splitIndex+1, students.length).trim();

                    var newProvider = new provider({
                        name: name,
                        website: url,
                        phone: phoneNo[0].trim(),
                        address: address[0].trim(),
                        area: area,
                        students: students,
                        faculty: faculty,
                        coursesOffered: coursesOffered,
                        facilities_available: facilities_available,
                        facilities_unavailable: facilities_unavailable
                    });


                    newProvider.save(function(err, newProvider) {
                        if (err) return console.error(err);
                        console.log("Provider saved: " + name + " " + area);

                    });

                }    

                /*console.log(url);
                console.log(name);
                console.log(area);
                console.log(address[0].trim());
                console.log(phoneNo[0].trim());
                console.log(students);
                console.log(faculty);
                console.log(coursesOffered);
                console.log(facilities_available);
                console.log(facilities_unavailable);*/

                //console.log(sectionA);
                //console.log(sourceCode);
              }  
            });

        }else{
            console.log("Url already added " + url);
        }

        }
            
        });
        
        
    });
    res.send("Done");
});


router.post('/knowyourcollege/', function(req, res) {
    var collegesInfo = req.body;
    //console.log(collegesInfo);
    var collegeIds = collegesInfo.collegeIds;
    var thisPage = collegesInfo.page;
    res.send(true);
    
    var totalIds = collegeIds.length;
    var idCounter = 0;
    
    var prefix = 'http://www.knowyourcollege-gov.in/';
    var filler = '?insti_id=';
    
    
    collegeIds.forEach(function(thisCollege, index){
        //var insti_id = '1-467477641';
        var insti_id = thisCollege.toString();
        var collegeurls = [
            {sectionName: 'Institute', url: 'instituteDetails.php', section: null}, 
            {sectionName: 'Course', url: 'courseDetails.php', section: null}, 
            {sectionName: 'Laboratory', url: 'labDetails.php', section: null}, 
            {sectionName: 'Faculty', url: 'facultyDetails.php', section: null}, 
            {sectionName: 'Library', url: 'libraryDetails.php', section: null}, 
            {sectionName: 'Hostel', url: 'hostelDetails.php', section: null}, 
            {sectionName: 'Ombudsman', url: 'ombudsmanDetails.php', section: null}, 
            {sectionName: 'Anti Ragging', url: 'antiraggingDetails.php', section: null}, 
            {sectionName: 'Student Count', url: 'StudentCountDetails.php', section: null}, 

        ];
        collegeurls.forEach(function(thisSection, index){
            thisSection.url = prefix + thisSection.url + filler + insti_id;
        });
        //Institute,Faculty
        var allowedSectionNames = [thisPage];
        var nAllowed = allowedSectionNames.length;
        var nCounter = 0;
        var urlCounter = 0;

        var thisCollege = college.findOne({'insti_id':insti_id}, function(err, thisCollege) {
        if (!err){ 
            if(!thisCollege){
                thisCollege = {};
            }

            collegeurls.forEach(function(thisSection, index){
                if(allowedSectionNames.indexOf(thisSection.sectionName) != -1){
                    url = thisSection.url;
                    thisSectionName = thisSection.sectionName;
                    var Request = unirest.get(url);

                    Request.headers({
                      'Accept': 'application/json',
                      'Accept-Language': 'en-us',
                      'User-Agent': 'Unirest Node.js'
                    });
                    Request.timeout(600000).end(function (response) {
                        if (response.error) {
                            console.log(url);
                            console.log('GET error', response.error)
                        }else{


                        var sourceCode = response.body;
                        var $ = cheerio.load(sourceCode, {
                            normalizeWhitespace: true,
                            xmlMode: true
                        });




                        thisCollege[thisSectionName] = {};
                        if(thisSectionName == 'Institute'){
                            var subtotal = $('li.active').length;
                            $('li.active').each(function(k, elem) {
                            var sectionName = $(this).find('h3').text().replace(':', '').trim();
                            var thisSection = {};
                            if(sectionName){
                                    $(this).find('#shift').find('table').find('tbody').find('tr').each(function(i, elem) {
                                        var row = $(this).text();
                                        var results = row.split(':');
                                        var key = null;
                                        var value = null;
                                        if(results[0]){
                                            key = results[0].trim().replace('.', '');
                                        }
                                        if(results[1]){
                                            value = results[1].trim();
                                        }    
                                        if(key){
                                            thisSection[key] = value;    
                                        }
                                    });
                                    thisCollege[thisSectionName][sectionName] = thisSection;
                                    if(k == subtotal - 1){
                                        if(thisCollege['Institute']['Institute Details']['Permanent Institute ID']){
                                            thisCollege.insti_id = thisCollege['Institute']['Institute Details']['Permanent Institute ID'];
                                            thisCollege.inst_name = thisCollege['Institute']['Institute Details']['Name of Institute'];

                                        }
                                        urlCounter += 1;
                                        if(urlCounter == collegeurls.length){
                                            //console.log(thisCollege);
                                            var newCollege = new college({});

                                            for (var property in thisCollege) {
                                                newCollege[property] = thisCollege[property];
                                            }
                                            newCollege.save(function(err, newCollege) {
                                                if (err) return console.error(err);
                                                idCounter += 1;
                                                console.log(idCounter + '/' + totalIds + ' College saved with id: ' + newCollege._id);
                                                //res.json('Done');
                                            });
                                        }
                                    }
                                }




                            });
                        }
                        if(thisSectionName == 'Faculty'){
                            $('#institute-detail').each(function(i, elem) {
                            var sectionName = $(this).find('i').text().replace(':', '').trim();

                            if(sectionName){
                                    var counter = 0;
                                    var headerArray = [];
                                    var total = $('div.CSSTableGenerator table tbody tr').length;
                                
                                    if(total > 0){
                                        
                                    var thisSection = new Array(total - 1);
                                    $(this).find('div.CSSTableGenerator').find('table').find('tbody').find('tr').each(function(i, elem) {
                                        var subSection = {};

                                        if(i == 0){
                                            $(this).find('th').each(function(j, thisElem) {
                                                var subSectionVal = $(this).text().trim().replace('.', '');
                                                headerArray.push(subSectionVal);
                                            });
                                        }else{
                                            $(this).find('td').each(function(j, thisElem) {
                                                if(!thisSection[i-1]){
                                                    thisSection[i-1] = {};
                                                }
                                                var subSectionVal = $(this).text().trim();
                                                thisSection[i-1][headerArray[j]] = subSectionVal;

                                            });
                                        }


                                    });
                                    thisCollege[thisSectionName][sectionName] = thisSection;
                                    urlCounter += 1;
                                    if(urlCounter == collegeurls.length){
                                        //console.log(thisCollege);
                                        var newCollege = new college({});

                                        for (var property in thisCollege) {
                                            newCollege[property] = thisCollege[property];
                                        }
                                        newCollege.save(function(err, newCollege) {
                                            if (err) return console.error(err);
                                            idCounter += 1;
                                            console.log(idCounter + '/' + totalIds + ' College saved with id: ' + newCollege._id);
                                            //res.json('Done');
                                        });
                                    }    
                                        
                                    }
                                
                                    
                                }
                            });
                        }    

                      } 
                    });


                }else{
                    urlCounter += 1;
                }


            });


        } else {throw err;}
        });
        
        
        
        
        
    });
    
    
    
    
    
    
    
    
    
    
});


//to get all masters
router.get('/clusterUrls', function(req, res) {
    clusterUrl.find({'added':false}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});

/*
Places API and Youtube Data Keys
1) AIzaSyCj1hPurugAfBtML3GhSxIdBg3lWMLiJdw
2) AIzaSyCs1Q1NsFZy0o-RHqoWaXyxda_ZVgTKIaw

Geolocation keys
1) AIzaSyCBS48UI_f9OXepU5PerZ_hssAx7ZwDImY
2) AIzaSyCBZDrCuQ2l79RItjz5xoK_lEIJv_V3Pak

Quotas per day per key:
1) Places: 150,000
2) Youtube: 1,000,000
3) Geolocation: 100,000

*/

router.get('/latLngSummary', function(req, res) {
    console.log('Lat Long summary starting');
    //res.json('Done');
    var allProviders = coaching.find( { latlng: {$exists: false}, possibleGeoCodings:{$exists: true},latlngna:true,  disabled: false}, {possibleGeoCodings:1, name:1, address:1, city:1, pincode:1,latlng:1, latlngna:1, loc:1},function(err, allProviders) {
    if (!err){
        var foundNone = [];
        var foundOne = [];
        var foundTwoOrMore = [];
        var nLength = allProviders.length;
        var counter = 0;
        console.log('Looking at: ' + nLength + ' providers!');
        allProviders.forEach(function(thisprovider, index){
            
            var thisPossibleGeoCodings = thisprovider.possibleGeoCodings.geocodings;
            
            if(!thisPossibleGeoCodings){
                foundNone.push(thisprovider);
            }else{
                if(thisPossibleGeoCodings.length == 1){
                    var latlng = {
                        lat: thisPossibleGeoCodings[0].latitude, 
                        lng: thisPossibleGeoCodings[0].longitude, 
                    };
                    thisprovider.latlng = latlng;
                    thisprovider.latlngna = false;
                    thisprovider.loc = {
                        type : 'Point',
                        coordinates : [thisprovider.latlng.lng, thisprovider.latlng.lat]
                    };
                    
                    thisprovider.save(function(err, thisprovider) {
                        if (err) return console.error(err);
                        console.log("Latlng saved for: "+ thisprovider._id);

                    });
                    //console.log(thisprovider.latlng);
                    foundOne.push(thisprovider);
                }
                if(thisPossibleGeoCodings.length >= 2){
                    var latlng = {
                        lat: thisPossibleGeoCodings[0].latitude, 
                        lng: thisPossibleGeoCodings[0].longitude, 
                    };
                    thisprovider.latlng = latlng;
                    thisprovider.latlngna = false;
                    thisprovider.loc = {
                        type : 'Point',
                        coordinates : [thisprovider.latlng.lng, thisprovider.latlng.lat]
                    };
                    
                    thisprovider.save(function(err, thisprovider) {
                        if (err) return console.error(err);
                        console.log("Latlng saved for: "+ thisprovider._id);

                    });
                    
                    foundTwoOrMore.push(thisprovider);
                }
            }
        });
        
        
        console.log("None: " + foundNone.length);
        console.log("One: " + foundOne.length);
        console.log("Two: " + foundTwoOrMore.length);
        var responses = [];
        responses.push(foundTwoOrMore[0]);
        responses.push(foundTwoOrMore[1]);
        responses.push(foundTwoOrMore[2]);
        responses.push(foundTwoOrMore[3]);
        responses.push(foundTwoOrMore[4]);
        res.json(responses);
        if(nLength == 0){
            console.log('No provider to look at!');
            res.json([]);    
        }
        
    } else {throw err;}
    });
});  
router.get('/bulkSaveLatLng', function(req, res) {
    res.json('Done');
    var options = {
      provider: 'google',

      httpAdapter: 'https', // Default 
      //apiKey: 'AIzaSyA7KEqF0FkVdsvQ_Qmoo8g69-DTjpaAvD4', // for Mapquest, OpenCage, Google Premier 
      apiKey: 'AIzaSyCBZDrCuQ2l79RItjz5xoK_lEIJv_V3Pak',
      formatter: null
    };

    var geocoder = NodeGeocoder(options);
    //latlng: {$exists: false}, possibleGeoCodings:{$exists: false},latlngna:true,  disabled: false
    //_id: '5870efd080ea0e0698890921'
    //latlng:1, latlngna:1, 
    
    var allProviders = coaching.find( {}, {address:1, city:1, state:1, pincode:1, disabled:1, name: 1,possibleGeoCodings:1},function(err, allProviders) {
    if (!err){
        var nLength = allProviders.length;
        var counter = 0;
        console.log('Looking at: ' + nLength + ' providers!');
        allProviders.forEach(function(thisprovider, index){
            //var thisLatLng = thisprovider.latlng;
            var searchAddress = thisprovider.address + ", " + thisprovider.city + " " + thisprovider.pincode;
            console.log("Coaching Id is: " + thisprovider._id);
            console.log("Search Address is: " + searchAddress);
            
            geocoder.geocode(searchAddress, function(err, res) {
                if(err) { console.log(err); return; }
                if(res && res.length > 0){
                    //console.log(thisprovider.name + " " + searchAddress + " " + res.length);
                    
                    thisprovider.possibleGeoCodings = {
                        searched: true,
                        _when: Date.now(),
                        geocodings: [],
                    };
                    res.forEach(function(thisgeocode, gindex){
                        if(thisgeocode){
                            console.log(thisgeocode);
                            
                            var newgeocode = {};
                            for (var property in thisgeocode) {
                            newgeocode[property] = thisgeocode[property];
                            }
                            thisprovider.possibleGeoCodings.geocodings.push(newgeocode);
                        }
                    });
                    var nGeocodings = thisprovider.possibleGeoCodings.geocodings.length;
                    thisprovider.save(function(err, thisprovider) {
                        if (err) return console.error(err);
                        console.log(nGeocodings + " geocodings added for provider id: "+ thisprovider._id);

                    });
                    
                    
                    
                    
                    //JSON.stringify(res)
                }else{
                    thisprovider.possibleGeoCodings = {
                        searched: true,
                        _when: Date.now(),
                        geocodings: null,
                    };
                    thisprovider.save(function(err, thisprovider) {
                        if (err) return console.error(err);
                        console.log("None geocodings added for provider id: "+ thisprovider._id);

                    });
                }
              
            });
        });
        
        if(nLength == 0){
            //res.json('Done');    
        }
        
    } else {throw err;}
    }).limit(100);
    
    
    
    

});

router.get('/syncGooglePlaceId', function(req, res) {
    res.json(true);
    
    var allProviders = coaching.find( {}, {possibleGeoCodings:1, googlePlace: 1},function(err, allProviders) {
    if (!err){
        var nLength = allProviders.length;
        var counter = 0;
        var idecounter = 0;
        var mcounter = 0;
        console.log('Looking at: ' + nLength + ' providers!');
        allProviders.forEach(function(thisprovider, index){
            var thisGP = thisprovider.googlePlace;
            var thisPGC = thisprovider.possibleGeoCodings;
            var gpId1 = null;
            var gpId2 = [];
            var gpIdConfidence2 = [];
            if(thisGP && thisGP.place_id){
                gpId1 = thisGP.place_id;
            }
            
            if(thisPGC && thisPGC.geocodings && thisPGC.geocodings.length > 0){
                thisPGC.geocodings.forEach(function(thisGeocoding, gcindex){
                    if(thisGeocoding.extra && thisGeocoding.extra.googlePlaceId){
                        gpId2.push(thisGeocoding.extra.googlePlaceId);
                        gpIdConfidence2.push(thisGeocoding.extra.confidence);
                    }else{
                        gpId2.push(null);
                        gpIdConfidence2.push(null);
                    }
                });
                
                
            }
            var gpIdArray = [];
            var allGPIds = [];
            if(gpId1){
                gpIdArray = [gpId1];
                gpIdArray = gpIdArray.concat(gpId2);
            }
            gpIdArray.forEach(function(thisPId, pindex){
                if(thisPId){
                    allGPIds.push(thisPId);
                }
                
            });
            if(allGPIds.length == 0){
                //console.log("No Google Place for Coaching Id: " + thisprovider._id);
            }else if(allGPIds.length == 1){
                //console.log("Google Place Id for Coaching Id: " + thisprovider._id + " is: " + allGPIds[0]);
                thisprovider.googlePlaceId = allGPIds[0];
                                
                thisprovider.save(function(err, thisprovider) {
                    if (err) return console.error(err);
                });
                idecounter += 1;
            }else{
                //console.log("More than 1 Google Place Id for Coaching Id: " + thisprovider._id + ". They are: " + allGPIds);
                mcounter += 1;
                thisprovider.googlePlaceId = allGPIds[0];
                thisprovider.multipleGooglePlaceIds = allGPIds;
                                
                thisprovider.save(function(err, thisprovider) {
                    if (err) return console.error(err);
                });
                
            }
            counter += 1;
            if(counter == nLength){
                console.log("Found Coaching Id for: " + idecounter + " out of " + nLength + " coachings!");
                console.log("Multiple Coaching Ids for: " + mcounter + " out of " + nLength + " coachings!");
            }
            
        });
        
        if(nLength == 0){
            //res.json('Done');    
        }
        
    } else {throw err;}
    });//.limit(1000);
    
    
    
    

});


function levenshteinDistance (s, t) {
    console.log('Distance function: ' + s + ' ' + t);
    if (!s.length) return t.length;
    if (!t.length) return s.length;

    return Math.min(
        levenshteinDistance(s.substr(1), t) + 1,
        levenshteinDistance(t.substr(1), s) + 1,
        levenshteinDistance(s.substr(1), t.substr(1)) + (s[0] !== t[0] ? 1 : 0)) + 1;
};

function matchingName(providerName, googlePlaceName){
    console.log(providerName + " " + googlePlaceName);
    var matching = false;
    if(googlePlaceName.indexOf(providerName) != -1){
        matching = true;
    }else{
        /*var distance = levenshteinDistance(providerName, googlePlaceName, function(err, distance){
            console.log(distance);
            if(distance < 5){
                matching = true;
            }
        });*/
        
    }
    
    return matching;
};


//to get google places
router.get('/googlePlaces', function(req, res) {
    res.json('Done');
    var GooglePlaces = require('google-places');

    var places = new GooglePlaces('AIzaSyCj1hPurugAfBtML3GhSxIdBg3lWMLiJdw');
    //AIzaSyCj1hPurugAfBtML3GhSxIdBg3lWMLiJdw
    //AIzaSyA7KEqF0FkVdsvQ_Qmoo8g69-DTjpaAvD4
    

    /*places.autocomplete({input: 'Allen Career Institute Jaipur'}, function(err, response) {
      if(err) { console.log(err); return; }
        var results = response.predictions;
      console.log(response.predictions.length);
      console.log("autocomplete: ", response.predictions);

      var success = function(err, response) {
        if(err) { console.log(err); return; }
        console.log("did you mean: ", response.result.name);
      };

      for(var index in response.predictions) {
        places.details({reference: response.predictions[index].reference}, success);
      }
    });*/
    var ObjectId = require('mongodb').ObjectID;
    //, exams: ObjectId("58ac27030be6311eccbbc3a6")
    //58726b2c89517d2a6c260cfc
    var allProviders = coaching.find( {latlng: {$exists: true}, latlngna:false,  disabled: false,  googlePlace: {$exists: false}}, {latlng:1, name: 1, address: 1, city: 1},function(err, allProviders) {
        //googlePlaceSearchTry: false,
    if (!err){
        var nLength = allProviders.length;
        var nSaves = 0;
        var counter = 0;
        console.log('There are: ' + nLength + " coachings!");
        allProviders.forEach(function(thisprovider, index){
            var thisLatLng = thisprovider.latlng;
            var thisLng = Number(thisLatLng.lng);
            var thisLat = Number(thisLatLng.lat);
            var coordinates = [thisLat, thisLng];
            var thisName = thisprovider.name;
            var thisAddress = thisprovider.address;
            var thisCity = thisprovider.city;
            var parts = thisAddress.split(',');
            var lastArea = parts[parts.length - 1];
            var searchString = thisName + " " + lastArea + " " + thisCity;
            //console.log(thisName + " " + JSON.stringify(coordinates));
            thisprovider.googlePlaceSearchTry = true;
                                
            thisprovider.save(function(err, thisprovider) {
                if (err) return console.error(err);
                //console.log("Google place search try saved for: " + thisprovider._id);
                //res.send('Done');
            });
            //name: thisName, location:coordinates, radius:1000
            if(thisName && coordinates){
                places.search({name: thisName, location:coordinates, radius:1000}, function(err, response) {
                    //, rankby:'distance'
                    
                    if(response && response.results.length > 0){
                        var results = response.results;
                        //console.log("search: " + thisName + " " + thisprovider._id);
                        results.forEach(function(thisResult, rindex){
                            var googlePlaceName = thisResult.name;
                            var googlePlaceId = thisResult.place_id;
                            
                            /*console.log(thisName + " "+ googlePlaceName);
                            var distance = levenshteinDistance(thisName, googlePlaceName, function(err, distance){
                                console.log(distance);
                            });*/
                            
                            var f = FuzzySet([googlePlaceName]);
                            var fResults = f.get(thisName, minScore=.33);
                            //console.log(fResults);
                            //googlePlaceName.indexOf(thisName) != -1 || thisName.indexOf(googlePlaceName)!= -1
                            if(fResults.length > 0){
                                //console.log(rindex + " " + googlePlaceName + " " + googlePlaceId); 
                                //console.log(thisResult);
                                
                                
                                thisprovider.googlePlace = thisResult;
                                
                                thisprovider.save(function(err, thisprovider) {
                                    if (err) return console.error(err);
                                    nSaves += 1;
                                    console.log(nSaves + " out of " + nLength + " ^ Provider google place saved: " + thisprovider._id);
                                    //res.send('Done');
                                });
                            }else{
                                //console.log("Did not match: " + rindex + " " + googlePlaceName + " " + googlePlaceId); 
                            }
                            /*var matching = matchingName(thisName, googlePlaceName,function(err, matching){
                                console.log('Matching: ' + matching);
                                if(matching){
                                    console.log(rindex + " " + googlePlaceName + " " + googlePlaceId); 
                                    console.log(thisResult); 
                                }else{
                                    console.log("Did not match: " + rindex + " " + googlePlaceName + " " + googlePlaceId); 
                                }
                            });*/
                            
                            
                              
                        });
                        
                        /*{ 
                            geometry:{
                            location: { lat: 30.73562609999999, lng: 76.74880189999999 },
                            viewport: { northeast: [Object], southwest: [Object] } 
                            },
                            icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/school-71.png',
                            id: 'c88be54d91516cd66605195dd9bfb53bf4cfbcf0',
                            name: 'Maxx Institute',
                            place_id: 'ChIJ____r8PtDzkRWm7k_Z1L7aQ',
                            reference: 'CmRSAAAA8A_cn5P5spdNrRviG6pcI5Rh8Np28xfBvK5ILMfKqHgbYmR93Z7dzvQAtceb8XuYaJqcYAyWut0Z7KJaqCNEho7PigSLGYAPtq76PVCRL4GG5Z7BgUMFe1dnpsIdRgvKEhDIaXVonnBha4T8LGlgzH_8GhTefTB2QfFgRV1YZ5QPD4nhLSOj1A',
                            scope: 'GOOGLE',
                            types: [ 'point_of_interest', 'establishment' ],
                            vicinity: 'Sco 223, Top Floor, Sector 37-c, Sector 37-c, Chandigarh' 
                        }*/
                          /*places.details({reference: response.results[0].reference}, function(err, response) {
                            console.log("search details: ", response.result.website);
                            // search details:  http://www.vermonster.com/
                          });*/
                    }else{
                        //console.log("search: " + thisprovider._id + " found nothing");
                    }
                  
                });
            }
        });
        
        if(nLength == 0){
            //res.json('Done');    
        }
        
    } else {throw err;}
    }).limit(250);
    //
    /*places.search({name: 'Shekhawati Institute Of Competitions', location:[26.876856,75.79724999999996], rankby:'distance'}, function(err, response) {
      console.log("search: ", response.results);

      places.details({reference: response.results[0].reference}, function(err, response) {
        console.log("search details: ", response.result.website);
        // search details:  http://www.vermonster.com/
      });
    });*/
    
});


router.get('/googlePlacesById', function(req, res) {
    res.json('Done');
    var GooglePlaces = require('google-places');

    var places = new GooglePlaces('AIzaSyCj1hPurugAfBtML3GhSxIdBg3lWMLiJdw');
    //AIzaSyCj1hPurugAfBtML3GhSxIdBg3lWMLiJdw
    //AIzaSyA7KEqF0FkVdsvQ_Qmoo8g69-DTjpaAvD4
    //googlePlace: {$exists: false},
    var allProviders = coaching.find( {googlePlaceId: {$exists: true}, newGooglePlace: {$exists: false}}, {googlePlaceId: 1},function(err, allProviders) {
    if (!err){
        var nLength = allProviders.length;
        var nSaves = 0;
        var counter = 0;
        console.log('There are: ' + nLength + " coachings!");
        allProviders.forEach(function(thisprovider, index){
            var thisGooglePlaceId = thisprovider.googlePlaceId;
            //console.log(thisprovider._id + " | " + thisGooglePlaceId);
            
            places.details({placeid: thisGooglePlaceId}, function(err, response) {
              if(err) { console.log(err); return; }
                //console.log(response);
                if(response.result){
                    thisprovider.newGooglePlace = response.result;
                    thisprovider.save(function(err, thisprovider) {
                        if (err) return console.error(err);
                        counter += 1;
                        console.log(counter + ". Provider saved: " + thisprovider._id);
                        
                        if(counter == nLength){
                            console.log("All done! Saved: " + counter + " coachings!");
                        }
                    });
                }
                
            });
            
            
        });
        
        if(nLength == 0){
            //res.json('Done');    
        }
        
    } else {throw err;}
    }).limit(100);//.skip(20);
    
});
router.post('/addIntern/', function(req, res) {
    var applicant = req.body;
    console.log(applicant.name);
    var newIntern = new intern({
        name: applicant.name,
        mobile: applicant.mobile,
        email: applicant.email,
        resume: applicant.resume
    });
    newIntern.save(function(err, newIntern) {
        if (err) return console.error(err);
        console.log("Intern saved: " + applicant.name);
        res.send('Done');
    });
    
});

router.post('/coachingurls/', function(req, res) {
    //urls are stored in sourceurls
    var urls = req.body;
    //console.log(urls);
    urls.forEach(function(thisurl, index){
            var url = thisurl.url;
            console.log("URL is " + url);
            var Request = unirest.get(url);
            Request.headers({
              'Accept': 'application/json',
              'Accept-Language': 'en-us',
              'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:25.0) Gecko/20100101 Firefox/25.0'
              //'User-Agent': 'Unirest Node.js'
            });
            Request.timeout(600000).end(function (response) {
                if (response.error) {
                    console.log('GET error', response.error)
                }else{
                    //console.log("--------------------");
                    var sourceCode = response.body;
                    var $ = cheerio.load(sourceCode, {
                        normalizeWhitespace: true,
                        xmlMode: true
                    });
                    
                    var name = $('.panel-body').find('h1').text();
                    var imgsrc = $('.panel-body').find('img').attr('src');
                    var website = $('.panel-body').find('a').attr('href');
                    var mobiles = [];
                    var phones = [];
                    var fax = [];
                    var others = [];
                    var others2 = [];
                    $('.panel-body').find('h1').text();
                    $('.panel-body').find('tr').each(function(i, elem) {
                      others[i] = $(this).text();
                      others2[i] = $(this).html();
                    });
                    var address, pincode,citystate,city,state;
                    var searchmobile, searchphone,searchfax,searchpincode;
                    others.forEach(function(thistd, tdindex){
                        searchmobile = thistd.search("Mobile");
                        searchpincode = thistd.search("Pincode");
                        searchmobile = thistd.search("Mobile");
                        searchphone = thistd.search("Phone");
                        //searchfax = thistd.search("Fax");
                        if(tdindex == 1){
                            //address
                            address = thistd.trim();
                        }
                        if(tdindex == 2){
                            //address
                            
                            var splitPoint = thistd.search("Pincode");
                            if(splitPoint != -1){
                                citystate = thistd.substring(0,splitPoint);
                            }else{
                               citystate = thistd;
                            }
                            
                            var splits = citystate.split(',');
                            //console.log(citystate);
                            city = splits[0].trim();
                            state = splits[1].trim();
                        }
                        if(searchpincode == 0){
                            pincode = thistd.substring(9, thistd.length).trim();
                        }
                        if(searchmobile == 0){
                            mobiles = thistd.substring(8, thistd.length).trim().split(", ");
                        }
                        if(searchphone == 0){
                            //console.log(thistd);
                            phones = thistd.substring(7, thistd.length).trim().split(",");
                        }
                    });
                    
                    var services = [];
                    $('.panel-body').find('#coursesTab').find('a').each(function(i, elem) {
                      services[i] = $(this).text();
                    });
                    
                    
                    var newcoaching = new coaching({
                        name: name,
                        website: website,
                        coachingWebsite: url,
                        address: address,
                        city: city,
                        state: state,
                        pincode: pincode,
                        logo: imgsrc,
                        mobile: mobiles,
                        phone: phones,
                        coursesOffered: services,
                    });
                    newcoaching.save(function(err, newcoaching) {
                        if (err) return console.error(err);
                        console.log("Provider saved: " + name + " " + city);
                        
                        var addedUrl = sourceUrl.findOne({'url':url}, function(err, addedUrl) {
                        if (!err){ 
                            addedUrl.added = true;
                            addedUrl.save(function(err, addedUrl) {
                                console.log(addedUrl.url + " marked as added");
                            });
                        } else {throw err;}
                        });
                        
                    });
                    
                    /*console.log("Institute: " + name);
                    console.log("Address: " + address);
                    console.log("City: " + city);
                    console.log("State: " + state);
                    console.log("Pincode: " + pincode);
                    console.log("Logo is: " + imgsrc);
                    console.log("Website: " + website);
                    console.log("Mobiles: " + mobiles);
                    console.log("Phones: " + phones);
                    console.log("Services: " + services);
                    //console.log(others);
                    console.log("--------------------");*/
                }
            });
        });
    
    
    
    
    
    
   
    
});

router.post('/urls2/', function(req, res) {
    var urls = req.body;
    urls.forEach(function(thisurl, index){
        var url = thisurl.url;
        var thisproviders = provider.find({'website': url}, { website:1},function(err, thisproviders) {
        if (!err){
        if(thisproviders.length==0){
            console.log("--- Adding new coaching institute " + url);
            var Request = unirest.get(url);
            Request.headers({
              'Accept': 'application/json',
              'Accept-Language': 'en-us',
              'User-Agent': 'Unirest Node.js'
            });
            Request.timeout(6000).end(function (response) {
                if (response.error) {
                    console.log('GET error', response.error)
                }else{
                    //console.log("Here");
                var sourceCode = response.body;
                var $ = cheerio.load(sourceCode, {
                    normalizeWhitespace: true,
                    xmlMode: true
                });
                var tutors = [];
                var address = [];
                var links = [];
                var services = [];
                
                var j = url.search("recNo");
                if(j == -1){
                    //cluster urls    
                    var pages = $('.top-small-heading-bar').find('.text-right-responsive').text();
                    var pageNo = pages.search("Page No.");
                    if(pageNo !=-1){
                        
                    
                    pages = parseInt(pages.substring(pages.length-4, pages.length-2).trim());
                    console.log(pages);

                    var i = 1;
                    var newURL ='';
                    for (i = 1; i < pages; i++) { 
                        newURL = url + '?recNo=' + i*20;
                        console.log('Added page ' + newURL);
                        urls.push(newURL);
                        thisClusterUrl = new clusterUrl({
                            url: newURL
                        });
                        thisClusterUrl.save(function(err, thisClusterUrl) {
                            if (err) 
                                return '';
                                //return console.error(err);
                            console.log("Cluster URL added: " + newURL);
                        });
                    }
                    }
                };    
                    
                    
                $('.panel-body').find('ul').each(function(i, elem) {
                    services[i] = $(this).text();
                });
                $('.panel-custom').find('.panel-body').each(function(i, elem) {
                  links[i] = $(this).find('a').attr('href');
                });
                var linkLen = services.length;
                links.forEach(function(thislink, linkindex){
                    if(linkindex < linkLen){
                        thisSourceUrl = new sourceUrl({
                            url: thislink
                        });
                        thisSourceUrl.save(function(err, thisSourceUrl) {
                            if (err) 
                                return '';
                                //return console.error(err);
                            console.log("URL saved: " + thislink);
                        });
                    }
                });
                    
                //console.log(tutors);
                //console.log(address);
                //console.log(links);
                //console.log(services);
                
              }  
            });

        }else{
            console.log("Url already added " + url);
            }

        }
            
        });
        
        
    });
    res.send("Done");
});

module.exports = router;