/**
 * @description buxom app company :
 * database module
 */
var mysql = require('mysql')
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Barfas"
  })

    /**
   * 
   * thats for check  items
   * @param {String} F1 is data base name
   * @param {String} F2 is cul name
   * @param {id} F3  is id name
   * @returns just false
   */
  function db_chack(F1,F2,F3) {
    con.connect(function(err) {
      //Select all customers and return the result object:
      con.query("SELECT * FROM `"+F1+"` WHERE id = "+F2+" ", function (err, result, fields) {
      if (err) throw err
    if (result[0].PropertyName === F3){
        var an = false
        exports.an=an
    }
      });
    });
    
  }

  /**
   * 
   * @param {String} F1 is data base name
   * @param {String} F2 is cul name
   * @param {id} F3  is id name
   * @returns all data with arrey [{test:"test"}]
   */

  function ReadProfile(F1,F2,F3) {
    con.connect(function(err) {
      //Select all customers and return the result object:
      con.query("SELECT * FROM `"+F1+"` WHERE "+F2+" = "+F3+" ", function (err, result, fields) {
     ///  if (err) throw err
        var items =  result
        exports.items=items

      });
    });
    
  }

  function Adddevicec(a1,a2) {
    con.connect(function(err) {
     /// if (err) throw err;
      //Select all customers and return the result object:
      var sql = "CREATE TABLE "+a1+" (id INT(255) AUTO_INCREMENT PRIMARY KEY, SerialNumber VARCHAR(255),date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)";
      con.query(sql,  function (err, result) {
       ///if (err) throw err;
      });
      var addlist = "INSERT INTO `devicelist` (name,active,inactive) VALUES ('"+a2+"', 'true', 'true')";
      con.query(addlist, function (err, result) {
        if (err) throw err;
      });

    });
  }

  function showlistf() {
    con.connect(function(err) {
      ////if (err) throw err;
      //Select all customers and return the result object:
      con.query("SELECT * FROM devicelist ", function (err, result, fields) {
        if (err) throw err;
        var showlist = result
        exports.showlist=showlist
      });
    });
    
  }
  
  
  exports.db_chack=db_chack
  exports.ReadProfile=ReadProfile
  exports.Adddevicec=Adddevicec
  exports.showlistf=showlistf
 

 
