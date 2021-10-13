var axios = require('axios');

var config = {
  method: 'get',
  url: 'http://localhost:3000/Dlist',
  headers: { }
};

axios(config)
.then(function (response) {
  var dlists = JSON.stringify(response.data);
  exports.dlists=dlists
})
.catch(function (error) {
  console.log(error);
});
