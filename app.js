/**
 * apis and moduls
 */
const express = require('express')
const app = express()
var mysql = require('mysql')
var bodyParser = require('body-parser')
var axios = require('axios')
var pach = require('path')
var to = require('./authentication/token')
var mes = require('./ms_module')
var apis = require('./import_api/GetProfileapi')
app.set("view engine", "ejs")
var cookieParser = require('cookie-parser')
const port = 3000
app.use(cookieParser())

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "Barfas"
})

var urlencodedParser = bodyParser.urlencoded({ extended: false })
/**
 * urlencodedParser <- with this we can find req parameter from clint(with clint ?! I mean all users like customers and end-users)
 * f1 an 3 as string with filter
 */
app.post('/ReadProfile', urlencodedParser, function (req, res) {
  var F1 = req.body.name
  var F2 = req.body.F2
  var F3 = req.body.F3
  function ReadProfile(F1,F2,F3) {
    con.connect(function(err) {
      //Select all customers and return the result object:
      con.query("SELECT * FROM `"+F1+"` WHERE "+F2+" = "+F3+" ", function (err, result, fields) {
     ///  if (err) throw err
        var an =  result
        res.set('content-type', 'application/json');
        res.send(an);
      });
    });
    
  }
  ReadProfile(F1,F2,F3);
})
app.post('/ReadProfileall', urlencodedParser, function (req, res) {
  var F1 = req.body.name
  function ReadProfileall(F1) {
    con.connect(function(err) {
      //Select all customers and return the result object:
      con.query("SELECT * FROM `"+F1+"`  ", function (err, result, fields) {
      /// if (err) throw err;
        var an =  result
        res.set('content-type', 'application/json');
        res.send(an);
      });
    });
  }
  ReadProfileall(F1);
})
///// divose list get for web

app.get('/Dlist', function (req, res) {
  function Dlist() {
    con.connect(function(err) {
      ////if (err) throw err;
      //Select all customers and return the result object:
      con.query("SELECT * FROM devicelist ", function (err, result, fields) {
        if (err) throw err;
        res.send(result)
      });
    });
    
  }
  Dlist();
})




app.get('/rep', function (req, res) {
  

  res.send(apis.Profileitems)

})



/// token
///// divose list get for web
app.post('/login',urlencodedParser, function (req, res) {
 var mail = req.body.name
 function checkuser(mail) {
  con.connect(function(err) {
    //if (err) throw err;
    //Select all customers and return the result object:
    con.query("SELECT * FROM `Customers` WHERE Email = '"+mail+"' ", function (err, result, fields) {
      if (err) throw err;
      var user =  result[0].Email
      var token = to.token()
      if (user === mail){
        res.cookie('login',token)
        res.send(token);

        
      }else{
        false
      }
    })
  });
}
 checkuser(mail)
 
})
app.post('/AddUser', urlencodedParser,function (req, res) {
  var Name = req.body.Name
  var FullName = req.body.FullName
  var Email = req.body.Email
  var PhoneNumber = req.body.PhoneNumber
  var Adress = req.body.Adress
  var data = {Name:Name,FullName:FullName,Email:Email,PhoneNumber:PhoneNumber,Adress:Adress}
  function AddUser() {
    con.connect(function(err) {
      if (err) throw err;
      //Select all customers and return the result object:
      var sql = "INSERT INTO `Users` SET ?";
      con.query(sql,data, function (err, result) {
        if (err) throw err;
        res.send(mes.AddRecords("new user"));
      });
    });
  }
  AddUser();
})
 //// crate devois  culome
app.post('/Adddevicecolumn', urlencodedParser,function (req, res) {
  var Name = req.body.column
  var device = req.body.Tname

  function Adddevicecolumn(a1,a2) {
    con.connect(function(err) {
      if (err) throw err;
      //Select all customers and return the result object:
      var sql = "ALTER table "+a2+" add column ("+a1+" varchar(255))";
      con.query(sql, function (err, result) {
        if (err) throw err;
        res.send("New column Added !");
      });
    });
  }
  Adddevicecolumn(Name,device);
})
 //// crate devois  table
 app.post('/Adddevice', urlencodedParser,function (req, res) {
  var Name = req.body.Dname
  function Adddevicec(a1) {
    con.connect(function(err) {
     /// if (err) throw err;
      //Select all customers and return the result object:
      var sql = "CREATE TABLE "+a1+" (id INT(255) AUTO_INCREMENT PRIMARY KEY, SerialNumber VARCHAR(255),date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)";
      con.query(sql,  function (err, result) {
       /// if (err) throw err;
        res.send(mes.AddRecords("Device"));
      });
      var sql2 = "INSERT INTO `devicelist` (name,active,inactive) VALUES ('"+a1+"', 'true', 'true')";
      con.query(sql2, function (err, result) {
       /// if (err) throw err;
        res.send(mes.AddRecords("Device"));
        
      });

    });
  }
  Adddevicec(Name);
})
/**
 * the most impourtant to this case is :
 * we should to add a list for detect proprtys
 */
 //// add new proprty
 app.post('/Addpraprty', urlencodedParser,function (req, res) {
  var data = req.body.PraprtyName
  function Adddevicec() {
    con.connect(function(err) {
     // if (err) throw err;
      //Select all customers and return the result object:
      var sql = "CREATE TABLE "+data+" (id INT(255) UNSIGNED AUTO_INCREMENT PRIMARY KEY, UserId INT(255), Value VARCHAR(255),date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)";
      con.query(sql,  function (err, result) {
       // if (err) throw err;
        res.send(mes.AddRecords("Praprty"));
      });
      var sql2 = "INSERT INTO `property` (PropertyName) VALUES ('"+data+"')";
      con.query(sql2, function (err, result) {
      //  if (err) throw err;
       /// res.send(mes.AddRecords("Praprty"));
        
      });

    });
  }
  Adddevicec();
})
/**
 * add valeu to proprty
 */
 app.post('/Addvaleupraprty', urlencodedParser,function (req, res) {
  var table = req.body.PraprtyNmae
  var Value = req.body.Value
  var userid = req.body.UserId
  var data = {UserId:userid,Value:Value}
  function Addvaleupraprty() {
    con.connect(function(err) {
     // if (err) throw err;
      //Select all customers and return the result object:
      var sql = "INSERT INTO `"+table+"` SET ?";
      con.query(sql,data, function (err, result) {
       /// if (err) throw err;
        res.send(mes.AddRecords("new valeu "));
      });
    });
  }
  Addvaleupraprty();
})
////// updata for app show
app.post('/apps', urlencodedParser,function (req, res) {
  var st = req.body.active
  function put(stval) {
    con.connect(function(err) {
      if (err) throw err;
      //Select all customers and return the result object:
      var sql = "UPDATE devicelist SET active = '"+stval+"' WHERE id = '1'";
      con.query(sql, function (err, result) {
        if (err) throw err;
        res.send("your devois is inactive");
      });
    });
  }
  put(st);
})

////// updata for app show
app.post('/test', urlencodedParser,function (req, res) {
  var test = req.body.test
  res.send(test)

})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})