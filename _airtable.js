var Airtable = require('airtable');
var fs          = require('fs');
var yaml        = require('js-yaml');

function loadConfig() {
  var ymlFile = fs.readFileSync('_config.yml', 'utf8');
  return yaml.load(ymlFile);
}

var config = loadConfig().airtable;
var jsonfile = require('jsonfile');
var fileAbout = '_data/abouts.json';
var abouts = new Airtable({ apiKey: config.apikey }).base(config.abouts);
var aboutJson = [];
var aboutJsonTest = [];

var fileBlog = '_data/blog.json';
var blog = new Airtable({ apiKey: config.apikey }).base(config.blog);
var blogJson = [];
var blogJsonTest = [];

var fileEvents = '_data/events.json';
var events = new Airtable({ apiKey: config.apikey }).base(config.events);
var eventsJson = [];
var eventsJsonTest = [];

var fileMinistries = '_data/ministries.json';
var ministries = new Airtable({ apiKey: config.apikey }).base(config.ministries);
var ministriesJson = [];
var ministriesJsonTest = [];

var filehomeMinistries = '_data/homeministries.json';
var homeministries = new Airtable({ apiKey: config.apikey }).base(config.ministries);
var homeministriesJson = [];
var homeministriesJsonTest = [];

var filePhotos = '_data/photos.json';
var photos = new Airtable({ apiKey: config.apikey }).base(config.photos);
var photosJson = [];
var photosJsonTest = [];

var filesermons = '_data/sermons.json';
var sermons = new Airtable({ apiKey: config.apikey }).base(config.sermons);
var sermonsJson = [];
var sermonsJsonTest = [];

var fileseries = '_data/series.json';
var series = new Airtable({ apiKey: config.apikey }).base(config.series);
var seriesJson = [];
var seriesJsonTest = [];

var filehomeseries = '_data/homeseries.json';
var homeseries = new Airtable({ apiKey: config.apikey }).base(config.series);
var homeseriesJson = [];
var homeseriesJsonTest = [];

var fileinfo = '_data/info.json';
var info = new Airtable({ apiKey: config.apikey }).base(config.info);
var infoJson = [];
var infoJsonTest = [];

var filelocation = '_data/location.json';
var location = new Airtable({ apiKey: config.apikey }).base(config.info);
var locationJson = [];
var locationJsonTest = [];

var filecontact = '_data/contact.json';
var contact = new Airtable({ apiKey: config.apikey }).base(config.info);
var contactJson = [];
var contactJsonTest = [];

var fileservice_schedule = '_data/service_schedule.json';
var service_schedule = new Airtable({ apiKey: config.apikey }).base(config.info);
var service_scheduleJson = [];
var service_scheduleJsonTest = [];


var filewelcome = '_data/welcome.json';
var welcome = new Airtable({ apiKey: config.apikey }).base(config.welcome);
var welcomeJson = [];
var welcomeJsonTest = [];

var filewelcome2 = '_data/welcome2.json';
var welcome2 = new Airtable({ apiKey: config.apikey }).base(config.welcome);
var welcome2Json = [];
var welcome2JsonTest = [];


var filehome = '_data/home.json';
var home = new Airtable({ apiKey: config.apikey }).base(config.info);
var homeJson = [];
var homeJsonTest = [];

var filecontact_page = '_data/contact_page.json';
var contact_page = new Airtable({ apiKey: config.apikey }).base(config.contact);
var contact_pageJson = [];
var contact_pageJsonTest = [];



var updated = false;

// abouts('Pages').select({
//    view: "Main View",
//   filterByFormula: "OR(IS_BEFORE(DATEADD(NOW(), -10, 'years'), CREATED_TIME()), IF(ISERROR(IS_BEFORE(DATEADD(NOW(), -10, 'years'), updated_at)), FALSE(),IS_BEFORE(DATEADD(NOW(), -10, 'years'), updated_at)))"
// }).eachPage(function page(records, fetchNextPage) {

//     records.forEach(function(record) {
//       updated = true;
//     });
//     fetchNextPage();

// }, function done(error) {
//     if (error) {
//         console.log(error);
//     }
//   console.log("updated");
//   console.log(updated);
// });


abouts('Other Pages').select({
    maxRecords: 100,
  //sort
    sort: [{field: "title", direction: "asc"}],
    filterByFormula: "TRUE(published)",
  //Formula to how to get data
  // help https://support.airtable.com/hc/en-us/articles/203255215-Formula-Field-Reference

}).eachPage(function page(records, fetchNextPage) {

    // This function (`page`) will get called for each page of records.

    records.forEach(function(record) {
      aboutJson.push(record._rawJson.fields);
      
    });
    fetchNextPage();

}, function done(error) {
    if (error) {
        console.log(error);
    }
  jsonfile.writeFile(fileAbout, aboutJson, function (err) {
    console.error(err)
  });
  console.log('abouts worked');
});



// blog 

    blog('Posts').select({
        maxRecords: 100,
      //sort
        sort: [{field: "date_added", direction: "desc"}],
        filterByFormula: "published",
      //Formula to how to get data
      // help https://support.airtable.com/hc/en-us/articles/203255215-Formula-Field-Reference

    }).eachPage(function page(records, fetchNextPage) {

        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
          blogJson.push(record._rawJson.fields);
          
        });
        fetchNextPage();

    }, function done(error) {
        if (error) {
            console.log(error);
        }
      jsonfile.writeFile(fileBlog, blogJson, function (err) {
        console.error(err)
      });
      console.log('blog worked');
    });

    // events 

    events('Church Events').select({
        maxRecords: 100,
      //sort
        filterByFormula: "AND(published, Future)",
        sort: [{field: "DateTime", direction: "desc"}],
      //Formula to how to get data
      // help https://support.airtable.com/hc/en-us/articles/203255215-Formula-Field-Reference

    }).eachPage(function page(records, fetchNextPage) {

        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
          eventsJson.push(record._rawJson.fields);
          
        });
        fetchNextPage();

    }, function done(error) {
        if (error) {
            console.log(error);
        }
      jsonfile.writeFile(fileEvents, eventsJson, function (err) {
        console.error(err)
      });
      console.log('events worked');
    });

    // ministries 

    ministries('Ministries').select({
        maxRecords: 100,
      //sort
        filterByFormula: "published",
        sort: [{field: "name", direction: "asc"}],
      //Formula to how to get data
      // help https://support.airtable.com/hc/en-us/articles/203255215-Formula-Field-Reference

    }).eachPage(function page(records, fetchNextPage) {

        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
          ministriesJson.push(record._rawJson.fields);
          
        });
        fetchNextPage();

    }, function done(error) {
        if (error) {
            console.log(error);
        }
      jsonfile.writeFile(fileMinistries, ministriesJson, function (err) {
        console.error(err)
      });
      console.log('ministries worked');
    });

    // home ministries 

    homeministries('Ministries').select({
        maxRecords: 3,
      //sort
        filterByFormula: "AND(published, show_on_home_page)",
        sort: [{field: "name", direction: "asc"}],
      //Formula to how to get data
      // help https://support.airtable.com/hc/en-us/articles/203255215-Formula-Field-Reference

    }).eachPage(function page(records, fetchNextPage) {

        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
          homeministriesJson.push(record._rawJson.fields);
          
        });
        fetchNextPage();

    }, function done(error) {
        if (error) {
            console.log(error);
        }
      jsonfile.writeFile(filehomeMinistries, homeministriesJson, function (err) {
        console.error(err)
      });
      console.log('home ministries worked');
    });

    // photos 

    photos('Photos').select({
        maxRecords: 100,
      //sort
        filterByFormula: "published",
        view: "Main View",
        sort: [{field: "date_added", direction: "desc"}]
      //Formula to how to get data
      // help https://support.airtable.com/hc/en-us/articles/203255215-Formula-Field-Reference

    }).eachPage(function page(records, fetchNextPage) {

        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
          photosJson.push(record._rawJson.fields);
          
        });
        fetchNextPage();

    }, function done(error) {
        if (error) {
            console.log(error);
        }
      jsonfile.writeFile(filePhotos, photosJson, function (err) {
        console.error(err)
      });
      console.log('photos worked');
    });

    // sermons 

    sermons('sermons').select({
        maxRecords: 100,
      //sort
        filterByFormula: "published",
        sort: [{field: "date", direction: "desc"}],
      //Formula to how to get data
      // help https://support.airtable.com/hc/en-us/articles/203255215-Formula-Field-Reference

    }).eachPage(function page(records, fetchNextPage) {

        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
          sermonsJson.push(record._rawJson.fields);
          
        });
        fetchNextPage();

    }, function done(error) {
        if (error) {
            console.log(error);
        }
      jsonfile.writeFile(filesermons, sermonsJson, function (err) {
        console.error(err)
      });
      console.log('sermons worked');
    });

    // series 

    series('series').select({
        maxRecords: 100,
      //sort
        filterByFormula: "published",
        sort: [{field: "sermon_date", direction: "desc"}],
      //Formula to how to get data
      // help https://support.airtable.com/hc/en-us/articles/203255215-Formula-Field-Reference

    }).eachPage(function page(records, fetchNextPage) {

        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
          seriesJson.push(record._rawJson.fields);
          
        });
        fetchNextPage();

    }, function done(error) {
        if (error) {
            console.log(error);
        }
      jsonfile.writeFile(fileseries, seriesJson, function (err) {
        console.error(err)
      });
      console.log('series worked');
    });

        // homeseries 

    homeseries('Series').select({
        maxRecords: 100,
      //sort
        filterByFormula: 'AND(published, IF(title = "No Series", 0,1))',
        sort: [{field: "sermon_date", direction: "desc"}],
      //Formula to how to get data
      // help https://support.airtable.com/hc/en-us/articles/203255215-Formula-Field-Reference

    }).eachPage(function page(records, fetchNextPage) {

        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
          homeseriesJson.push(record._rawJson.fields);
          
        });
        fetchNextPage();

    }, function done(error) {
        if (error) {
            console.log(error);
        }
      jsonfile.writeFile(filehomeseries, homeseriesJson, function (err) {
        console.error(err)
      });
      console.log('home series worked');
    });

          // info 

    info('Main_Stuff').select({
        maxRecords: 1,
      //Formula to how to get data
      // help https://support.airtable.com/hc/en-us/articles/203255215-Formula-Field-Reference

    }).eachPage(function page(records, fetchNextPage) {

        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
          infoJson.push(record._rawJson.fields);
          
        });
        fetchNextPage();

    }, function done(error) {
        if (error) {
            console.log(error);
        }
      jsonfile.writeFile(fileinfo, infoJson, function (err) {
        console.error(err)
      });
      console.log('info worked');
    });


// location

        location('Location').select({
        maxRecords: 1,
      //Formula to how to get data
      // help https://support.airtable.com/hc/en-us/articles/203255215-Formula-Field-Reference

    }).eachPage(function page(records, fetchNextPage) {

        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
          locationJson.push(record._rawJson.fields);
          
        });
        fetchNextPage();

    }, function done(error) {
        if (error) {
            console.log(error);
        }
      jsonfile.writeFile(filelocation, locationJson, function (err) {
        console.error(err)
      });
      console.log('location worked');
    });

      // contact 

    contact('Contact_Info').select({
        maxRecords: 1,
      //Formula to how to get data
      // help https://support.airtable.com/hc/en-us/articles/203255215-Formula-Field-Reference

    }).eachPage(function page(records, fetchNextPage) {

        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
          contactJson.push(record._rawJson.fields);
          
        });
        fetchNextPage();

    }, function done(error) {
        if (error) {
            console.log(error);
        }
      jsonfile.writeFile(filecontact, contactJson, function (err) {
        console.error(err)
      });
      console.log('contact worked');
    });

      // service_schedule 

    service_schedule('Service_Schedule').select({
        maxRecords: 10,
        sort: [{field: "order", direction: "asc"}]
      //Formula to how to get data
      // help https://support.airtable.com/hc/en-us/articles/203255215-Formula-Field-Reference

    }).eachPage(function page(records, fetchNextPage) {

        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
          service_scheduleJson.push(record._rawJson.fields);
          
        });
        fetchNextPage();

    }, function done(error) {
        if (error) {
            console.log(error);
        }
      jsonfile.writeFile(fileservice_schedule, service_scheduleJson, function (err) {
        console.error(err)
      });
      console.log('service_schedule worked');
    });


    // welcome 

    welcome('Sections').select({
        maxRecords: 10,
        sort: [{field: "order", direction: "asc"}]
      //Formula to how to get data
      // help https://support.airtable.com/hc/en-us/articles/203255215-Formula-Field-Reference

    }).eachPage(function page(records, fetchNextPage) {

        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
          welcomeJson.push(record._rawJson.fields);
          
        });
        fetchNextPage();

    }, function done(error) {
        if (error) {
            console.log(error);
        }
      jsonfile.writeFile(filewelcome, welcomeJson, function (err) {
        console.error(err)
      });
      console.log('welcome worked');
    });


      // welcome details

    welcome2('Settings').select({
        maxRecords: 1
      //Formula to how to get data
      // help https://support.airtable.com/hc/en-us/articles/203255215-Formula-Field-Reference

    }).eachPage(function page(records, fetchNextPage) {

        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
          welcome2Json.push(record._rawJson.fields);
          
        });
        fetchNextPage();

    }, function done(error) {
        if (error) {
            console.log(error);
        }
      jsonfile.writeFile(filewelcome2, welcome2Json, function (err) {
        console.error(err)
      });
      console.log('welcome2 worked');
    });


      // home 

    home('Home_Page').select({
        maxRecords: 1,
      //Formula to how to get data
      // help https://support.airtable.com/hc/en-us/articles/203255215-Formula-Field-Reference

    }).eachPage(function page(records, fetchNextPage) {

        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
          homeJson.push(record._rawJson.fields);
          
        });
        fetchNextPage();

    }, function done(error) {
        if (error) {
            console.log(error);
        }
      jsonfile.writeFile(filehome, homeJson, function (err) {
        console.error(err)
      });
      console.log('home worked');
    });

// contact_page Page
        contact_page('Contact_Page').select({
        maxRecords: 1,
      //Formula to how to get data
      // help https://support.airtable.com/hc/en-us/articles/203255215-Formula-Field-Reference

    }).eachPage(function page(records, fetchNextPage) {

        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
          contact_pageJson.push(record._rawJson.fields);
          
        });
        fetchNextPage();

    }, function done(error) {
        if (error) {
            console.log(error);
        }
      jsonfile.writeFile(filecontact_page, contact_pageJson, function (err) {
        console.error(err)
      });
      console.log('contact_page worked');
    });

// Beliefs data

var config = loadConfig().airtable;
var jsonfile = require('jsonfile');
var filebeliefs = '_data/beliefs.json';
var beliefs = new Airtable({ apiKey: config.apikey }).base(config.abouts);
var beliefsJson = [];
var beliefsJsonTest = [];

beliefs('Beliefs').select({
    maxRecords: 100,
    view: "Main View"
  //sort
    
  //Formula to how to get data
  // help https://support.airtable.com/hc/en-us/articles/203255215-Formula-Field-Reference

}).eachPage(function page(records, fetchNextPage) {

    // This function (`page`) will get called for each page of records.

    records.forEach(function(record) {
      beliefsJson.push(record._rawJson.fields);
      
    });
    fetchNextPage();

}, function done(error) {
    if (error) {
        console.log(error);
    }
  jsonfile.writeFile(filebeliefs, beliefsJson, function (err) {
    console.error(err)
  });
  console.log('beliefs worked');
});

// Gospel data

var config = loadConfig().airtable;
var jsonfile = require('jsonfile');
var filegospel = '_data/gospel.json';
var gospel = new Airtable({ apiKey: config.apikey }).base(config.abouts);
var gospelJson = [];
var gospelJsonTest = [];

gospel('Gospel').select({
    maxRecords: 1,
    view: "Main View"
  //sort
    
  //Formula to how to get data
  // help https://support.airtable.com/hc/en-us/articles/203255215-Formula-Field-Reference

}).eachPage(function page(records, fetchNextPage) {

    // This function (`page`) will get called for each page of records.

    records.forEach(function(record) {
      gospelJson.push(record._rawJson.fields);
      
    });
    fetchNextPage();

}, function done(error) {
    if (error) {
        console.log(error);
    }
  jsonfile.writeFile(filegospel, gospelJson, function (err) {
    console.error(err)
  });
  console.log('gospel worked');
});


// Leadership data 

var config = loadConfig().airtable;
var jsonfile = require('jsonfile');
var fileleadership = '_data/leadership.json';
var leadership = new Airtable({ apiKey: config.apikey }).base(config.abouts);
var leadershipJson = [];
var leadershipJsonTest = [];

leadership('Leadership').select({
    maxRecords: 100,
    view: "Main View"
  //sort
    
  //Formula to how to get data
  // help https://support.airtable.com/hc/en-us/articles/203255215-Formula-Field-Reference

}).eachPage(function page(records, fetchNextPage) {

    // This function (`page`) will get called for each page of records.

    records.forEach(function(record) {
      leadershipJson.push(record._rawJson.fields);
      
    });
    fetchNextPage();

}, function done(error) {
    if (error) {
        console.log(error);
    }
  jsonfile.writeFile(fileleadership, leadershipJson, function (err) {
    console.error(err)
  });
  console.log('leadership worked');
});