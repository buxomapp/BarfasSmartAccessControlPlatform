var axios = require('axios');
var qs = require('qs');
var data = qs.stringify({
  'PraprtyNmae': 'biyom' 
});
var config = {
  method: 'post',
  url: 'http://localhost:3000/Addpraprty',
  headers: { 
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data : data
};

axios(config)
.then(function (response) {
 var aaa = JSON.stringify(response.data);
 exports.aaa=aaa
})
.catch(function (error) {
  console.log(error);
});
