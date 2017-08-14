var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var master = require('../app/models/master');
var intern = require('../app/models/intern');
var address = require('../app/models/address');
var sourceUrl = require('../app/models/sourceUrl');
var clusterUrl = require('../app/models/clusterUrl');
var user = require('../app/models/user');
var provider = require('../app/models/provider');
var targetStudyProvider = require('../app/models/targetStudyProvider');

var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');
var bcrypt   = require('bcrypt-nodejs');

var unirest = require('unirest');
var cheerio = require('cheerio');

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
    var allGroupProviders = targetStudyProvider.find({website: {$exists: true}, $where:"this.website.length>0 && this.website[0] !=''"}, {website:1, email: 1},function(err, allGroupProviders) {
    if (!err){
        var nProviders = allGroupProviders.length;
        console.log('Fetching emails for: ' + nProviders + ' coachings');
        
        allGroupProviders.forEach(function(thisGroup, index){
            if(index % 100 == 0){
                console.log('Extracting for institute: ' + index);
            }
            var thisWebsites = thisGroup.website;
            var thisGroupEmail = thisGroup.email;
            if(Array.isArray(thisGroupEmail)){
                
            }else{
                console.log('Converting Email from string to array: ' + thisGroup._id);
                var res = thisGroupEmail.split(",");
                if(res && res.length > 0){
                    thisGroupEmail = res;
                }else{
                    thisGroupEmail = [thisGroupEmail];
                }
            }
            var nWebsites = thisWebsites.length;
            var counter2 = 0;
            
            thisWebsites.forEach(function(newWebsite, windex){
                var url = newWebsite;
                if(newWebsite){
                    nWebsites += 1;
                    var Request = unirest.get(url);
                    Request.headers({
                      'Accept': 'application/json',
                      'Accept-Language': 'en-us',
                      'User-Agent': 'Unirest Node.js'
                    });

                    Request.timeout(1000000).end(function (response) {
                        if (response.error) {
                            //console.log('GET error', response.error);
                            listingNo = listingNo + 1;
                            console.log(JSON.stringify(listingNo + '. ' + thisGroup._id));
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
                                        console.log(thisGroup._id + " saved!");
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
    }).limit(1000).skip(1000);
    
    
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

//to get all masters
router.get('/clusterUrls', function(req, res) {
    clusterUrl.find({'added':false}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});

//to get all masters
router.get('/targetstudyurlsList', function(req, res) {
    sourceUrl.find({'added':false}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    }).limit(1500);
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

router.get('/getAllExams/', function(req, res) {
    url = 'https://targetstudy.com/exams/';
    var Request = unirest.get(url);
    Request.headers({
      'Accept': 'application/json',
      'Accept-Language': 'en-us',
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:25.0) Gecko/20100101 Firefox/25.0'
      //'User-Agent': 'Unirest Node.js'
    });
    //list-group list-group-item
    
    Request.timeout(600000).end(function (response) {
        if (response.error) {
            console.log('GET error', response.error)
        }else{
            //console.log("--------------------");
            var sourceCode = response.body;
            //console.log(sourceCode);
            var $ = cheerio.load(sourceCode, {
                normalizeWhitespace: true,
                xmlMode: true
            });

            var shorts = [];
            var exams = [];
            
            $('.list-group').find('.list-group-item').each(function(i, elem) {
                var all = $(this).text();
                var shortName = $(this).find('b').text();
                var link = $(this).find('a').text();
                shorts[i] = shortName;
                exams[i] = link;
            });
            
            shorts.forEach(function(thistd, tdindex){
                if(shorts[tdindex]){
                    console.log(shorts[tdindex] + ": " + exams[tdindex]);
                }else{
                    console.log(exams[tdindex]);
                }
                
            });
            console.log(exams.length + " " + shorts.length);
        }
    });
    
});
router.post('/targetstudyurls/', function(req, res) {
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
                    
                    
                    var newtargetStudyProvider = new targetStudyProvider({
                        name: name,
                        website: website,
                        targetStudyWebsite: url,
                        address: address,
                        city: city,
                        state: state,
                        pincode: pincode,
                        logo: imgsrc,
                        mobile: mobiles,
                        phone: phones,
                        coursesOffered: services,
                    });
                    newtargetStudyProvider.save(function(err, newtargetStudyProvider) {
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
//to get a particular master with _id masterId
router.get('/edit/:masterId', function(req, res) {
    var masterId = req.params.masterId;
    console.log("Master id is: " + masterId);
    master
        .findOne({ '_id': masterId })
        .deepPopulate('batches _institute subjects subjects._batch subjects._batch.students')
        .exec(function (err, docs) {
        if (!err){ 
            //console.log('The master name is: ' + JSON.stringify(master.batchlist));
            console.log(docs);
            res.json(docs);
            //process.exit();
        } else {throw err;}
    });
});
module.exports = router;