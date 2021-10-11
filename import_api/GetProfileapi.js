var axios = require('axios');
var qs = require('qs');
var data = qs.stringify({
  'name': 'Customers' ,
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
    var Profileitems =JSON.stringify(response.data)
    exports.Profileitems=Profileitems
  })
  .catch(function (error) {
    console.log(error);
  });

  

