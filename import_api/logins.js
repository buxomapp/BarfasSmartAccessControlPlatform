var axios = require('axios');
var qs = require('qs');
var data = qs.stringify({
  'name': 'door1logins' ,
});
var config = {
  method: 'post',
  url: 'http://localhost:3000/ReadProfileall',
  headers: { 
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data : data
};

  axios(config)
  .then(function (response) {
    var logins =JSON.stringify(response.data)
    exports.logins=logins
  })
  .catch(function (error) {
    console.log(error);
  });

  

