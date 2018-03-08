var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var cbse = require('../app/models/cbse');
var coaching = require('../app/models/coaching');
var school = require('../app/models/school');
var mongoose = require('mongoose');

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');

var unirest = require('unirest');
var cheerio = require('cheerio');

router.post('/bulksave', function(req, res) {
    var affiliationForm = req.body;
    var affiliationNumbers = affiliationForm.affiliationNumbers;
    var thisuser = affiliationForm._createdBy;
    //console.log(affiliationNumbers);
    //console.log(thisuser);
    
    if(affiliationNumbers && affiliationNumbers.length > 0){
        
        
        var existingCbses = cbse.find({ 'affilationNo': {$in: affiliationNumbers} },function (err, existingCbses) {
            if(!existingCbses){
                existingCbses = [];
            }else{
                existingCbses = existingCbses.map(function(a) {return a.affilationNo.toString();});
            }
            var nAdded = 0;
            var counter = 0;
            var nAffiliations = affiliationNumbers.length;
            affiliationNumbers.forEach(function(thisAffiliation, aindex){
                var eIndex = existingCbses.indexOf(thisAffiliation.toString());
                console.log(eIndex);
                if(eIndex == -1){
                    var this_cbse = new cbse({
                        affilationNo : thisAffiliation,
                        _createdBy : thisuser,
                    });
                    this_cbse.save(function(err, this_cbse) {
                    if (err) return console.error(err);
                        console.log(this_cbse._id + " saved!");
                        counter += 1;
                        nAdded += 1;
                        if(counter == nAffiliations){
                            res.json(nAdded);
                        }
                        //res.json(true);
                    });
                }else{
                    
                    counter += 1;
                    console.log('Affiliation Number ' + thisAffiliation + ' already exists!');
                    if(counter == nAffiliations){
                        res.json(nAdded);
                    }
                }

            });
        });
        
        
        
    }else{
        res.json(null);
    }
    
});

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

router.post('/extract', function(req, res) {
    res.json(true);
    var limit = 300;
    var skip = 0;
    
    var existingSchools = school.find({}, {affilationNo: 1},function (err, existingSchools) {
        var existingSchoolAffiliationNos = [];
        if(!existingSchools){
            existingSchools = [];   
        }else{
            existingSchoolAffiliationNos = existingSchools.map(function(a) {return a.affilationNo.toString();});
        }
        //console.log(existingSchoolAffiliationNos);
        
        var existingCbses = cbse.find({affilationNo: {$nin: existingSchoolAffiliationNos}},function (err, existingCbses) {
            if(existingCbses){
            var nSchools = existingCbses.length;
            var nAdded = 0;
            var nErrors = 0;
            var counter = 0;

            var affiliationNumbers = existingCbses.map(function(a) {return a.affilationNo.toString();});
            //var affiliationNumbers = ['330499'];
            //console.log(affiliationNumbers);
            //var affiliationNumbers = ['1240008'];
            if(affiliationNumbers && affiliationNumbers.length > 0){
                affiliationNumbers.forEach(function(thisAffiliation, aindex){
                    var thisUrl = 'http://cbseaff.nic.in/cbse_aff/schdir_Report/AppViewdir.aspx?affno=' + thisAffiliation;

                    var inclusions = ["Name of Institution","Affiliation Number","State","District","Postal Address","Pin Code","Phone No. with STD Code","Office","Residence","FAX No","Email","Website","Year of Foundation","Date of First Opening of School","Name of Principal/ Head of Institution","Sex","Principal's Educational/Professional Qualifications:","No of Experience (in Years):","Administrative:","Teaching:","Status of The School","Type of affiliation","From","To","Name of Trust/ Society/ Managing Committee"];
                    var exclusions = ["-------------------", "Affiliation Period"];

                    var Request = unirest.get(thisUrl);
                            Request.headers({
                              'Accept': 'application/json',
                              'Accept-Language': 'en-us',
                              'User-Agent': 'Unirest Node.js'
                            });

                            Request.timeout(1000000).end(function (response) {
                                if (response.error) {
                                    console.log(JSON.stringify("Error: " + aindex + '. ' + thisAffiliation));
                                    nErrors += 1;
                                    counter += 1;
                                    if(counter == nSchools){
                                        console.log("---- All Done ----");
                                        console.log(nAdded + " added out of " + nSchools + " schools | Errors: " + nErrors);
                                    }
                                }else{

                                    var sourceCode = response.body;
                                    //console.log(sourceCode);

                                    var $ = cheerio.load(sourceCode, {
                                        normalizeWhitespace: true,
                                        xmlMode: true
                                    });


                                    var row1 = [];
                                    var row2 = [];
                                    var rowflip = true;
                                    $('td').each(function(i, elem) {

                                        var thisCell = $(this).text().trim().toString();

                                        if(exclusions.indexOf(thisCell) != -1){

                                        }else{
                                            if(inclusions.indexOf(thisCell) != -1){
                                                thisCell = slugify(thisCell).toString();
                                                row1.push(thisCell);
                                                rowflip = !rowflip;
                                            }else if(!rowflip){
                                                row2.push(thisCell);
                                                rowflip = !rowflip;
                                            }else{
                                                //console.log('Ignoring: ' + thisCell);
                                            }
                                        }

                                        //console.log(rows[i]);


                                    });

                                    /*console.log(row1.length);
                                    console.log(row2.length);

                                    console.log(row1);
                                    console.log(row2);*/

                                    if(row1 && row2 && row1.length == row2.length){

                                        var data = {};
                                        row1.forEach(function(thisRow, aindex){
                                            data[row1[aindex]] = row2[aindex];
                                        });

                                        /*var newCBSESchool = {
                                            affilationNo: thisAffiliation,
                                            url: thisUrl,
                                            data: data,
                                        };*/
                                        nAdded += 1;
                                        counter += 1;
                                        if(counter == nSchools){
                                            console.log("---- All Done ----");
                                            console.log(nAdded + " added out of " + nSchools + " schools | Errors: " + nErrors);
                                        }

                                        var existingSchool = school.findOne({ 'affilationNo': thisAffiliation },function (err, existingSchool) {
                                            if(!existingSchool){

                                            var newCBSESchool = new school({
                                                affilationNo: thisAffiliation,
                                                url: thisUrl,
                                                data: data,
                                            });    

                                            newCBSESchool.save(function(err, newCBSESchool) {
                                            if (err) return console.error(err);
                                                console.log(newCBSESchool._id + " saved!");
                                            });    

                                            }else{
                                                var newCBSESchool = {
                                                    affilationNo: thisAffiliation,
                                                    url: thisUrl,
                                                    data: data,
                                                };

                                                for (var property in newCBSESchool) {
                                                    existingSchool[property] = newCBSESchool[property];
                                                }
                                                existingSchool.save(function(err, existingSchool) {
                                                if (err) return console.error(err);
                                                    console.log(existingSchool._id + " resaved!");
                                                }); 

                                            }
                                        });



                                    }
                                }
                            });
                });
            }

            }else{
                console.log('Something went wrong!!');
            }
        }).limit(limit).skip(skip);
    });
});

router.get('/', function(req, res) {
    //console.log('Here');
    cbse.find({active: true, count: {$gte: 10}}, {name:1, count: 1}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});

module.exports = router;