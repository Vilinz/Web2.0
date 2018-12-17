var fs = require("fs");
var http = require("http");
var querystring = require('querystring');
var url = require("url");
var path = require("path");
var users = [];
var error = "";
function readData() {
  var alluser = fs.readFileSync("data.json","utf-8");
  var arrayUser = alluser.split("\n");
  arrayUser.pop();
  for(var i = 0; i < arrayUser.length; i++) {
    console.log(arrayUser[i]);
    var obj = eval('('+arrayUser[i]+')');
    users.push(obj);
  }
  console.log("Read file success");
}

readData();//read data from data.json

http.createServer(function(req, res){
  var postData = "";
  var username = url.parse(req.url, true).query.username;
  if(req.method === 'POST') {
    req.on('data', function(chunk){//get data from web
      postData += chunk;
    });

    req.on('end', function() {
      var aUser = querystring.parse(postData);//string to a obj
      error="";//storage error informaton
      username = aUser.name;
      console.log("username "+username);
      form_regex(aUser);
      if(error == "") {
        validRepeat(aUser);
        //console.log("rerror"+error);
        if(error != "") {
          showFailinfo(res, error);
          console.log("Register fail!");
          console.log("Some information is repeated!");
          res.end();
        } else {
          users.push(aUser);
          var fd = fs.openSync("data.json", "a");
          var buf = new Buffer(JSON.stringify(aUser)+'\n');//change it to a string
          fs.write(fd, buf,0,buf.length,function(){//write to file
            console.log("Write file success.");
          });
          console.log(aUser);
          console.log(aUser.name+" Register success!");
          showSuccessinfo(res, aUser);
          res.end();
        }
      } else {
        showFailinfo(res, error);
        console.log("Register failed!");
				res.end();
      }
    });
  }

  if(req.method === 'GET') {
    if(req.url == '/'||req.url == '/mysever.html') {
      fs.readFile(path.join(__dirname, "/mysever.html"), function(err, data){
        if(err) {
          res.write(err);
        } else {
          res.write(data);
        }
        res.end();
      });
    }
    else if(req.url == '/style.css') {
      fs.readFile(path.join(__dirname, "/style.css"), function(err, data){
        if(err){
          res.write(err);
        } else {
          res.writeHeader(200, {'Content-Type':'text/css'});
          res.write(data);
        }
        res.end();
      });
    }
    else if(req.url == '/background.jpg') {
      fs.readFile(path.join(__dirname,"/background.jpg"),function(err, data){
        if(err) {
          res.write(err);
        } else {
          res.write(data);
        }
        res.end();
      });
    }
    else if(req.url == '/user.jpg'){
      fs.readFile(path.join(__dirname,"/user.jpg"),function(err, data){
        if(err) {
          res.write(err);
        } else {
          res.write(data);
        }
        res.end();
      });
    }
    else if(req.url == '/tip.js'){
      fs.readFile(path.join(__dirname,"/tip.js"),function(err, data){
        if(err) {
          res.write(err);
        } else {
          res.write(data);
        }
        res.end();
      });
    }else{
      if(username == "undefined") {
        fs.readFile(path.join(__dirname,"/mysever.html"), function(err, data){
          if(err) {
            res.write(err);
          } else {
            res.write(data);
          }
          res.end();
        });
      } else {
        var index = false;
        for(var i = 0; i < users.length; i++) {
          if(users[i].name == username) {
            showSuccessinfo(res, users[i]);
						res.end();
						index = true;
						break;
          }
        }
        if(index == false) {
          fs.readFile(path.join(__dirname, "/mysever.html"), function(err, data) {
            if(err) {
              res.write(err);
            } else {
              res.write(data);
            }
            res.end();
          });
        }
      }
    }
  }
}).listen(8000, function() {
  console.log("servering");
});

//192.168.56.1:8000

function form_regex(user) {
  var name_regex = /^[a-zA-Z][a-zA-Z0-9]{5,17}$/;
  var studentid_regex = /^[1-9][0-9]{7}$/;
  var phone_regex = /^[1-9][0-9]{10}$/;
  var email_regex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

  if(!name_regex.test(user.name)) {
    error += "User name must contain 6 to 18 alphanumeric characters, or underscore, must begin with an English letter.";
  }
  if(!studentid_regex.test(user.studentid)) {
    error += "Student ID is 8 digits, can not start with 0.";
  }
  if(!phone_regex.test(user.phone)) {
    error += "The phone number is 11 digits and can not start with 0.";
  }
  if(!email_regex.test(user.email)) {
    error += "E-mail format error.";
  }
}

function showSuccessinfo(res, user) {
  res.write("<!DOCTYPE html>");
  res.write("<html>");
  res.write("<head>");
  res.write("<title>user's information</title>");
  res.write("<meta http-equiv='Content-Type' content='text/html;charset=UTF-8'>");
  res.write("<link rel='stylesheet' type='text/css' href='style.css'>");
  res.write("</head>");
  res.write("<body>");
  res.write("<div id = table1>")
  res.write("<h1>user's information</h1>");
  res.write("<table>");
  res.write("<tr>");
  res.write("<td>name</td>");
  res.write("<td>" + user.name + "</td>");
  res.write("</tr>");
  res.write("<tr>");
  res.write("<td>studentid</td>");
  res.write("<td>" + user.studentid + "</td>");
  res.write("</tr>");
  res.write("<tr>");
  res.write("<td>phone</td>");
  res.write("<td>" + user.phone + "</td>");
  res.write("</tr>");
  res.write("<tr>");
  res.write("<td>email</td>");
  res.write("<td>" + user.email + "</td>");
  res.write("</tr>");
  res.write("</table>");
  res.write("</div>")
  res.write("</body>");
  res.write("</html>");
}

function showFailinfo(res, error) {
  res.write("<!DOCTYPE html>");
  res.write("<html>");
  res.write("<head>");
  res.write("<title>error</title>");
  res.write("<meta http-equiv='Content-Type' content='text/html;charset=UTF-8'>");
  res.write("<link rel='stylesheet' type='text/css' href='style.css'>");
  res.write("</head>");
  res.write("<body>");
  res.write("<div id=return>");
  res.write("<h1>Register fail!</h1>");
  res.write("<div id=error>" + error + "</div>");
  res.write("<button><a href='/'>return</a></button>")
  res.write("</div>");
  res.write("</body>");
  res.write("</html>");
}

function validRepeat(user) {
  //console.log("length"+users.length);
  for(var i = 0; i < users.length; i++) {
    if(users[i].name == user.name) {
      error += "The user's name has existed.\n";
    }
    if(users[i].studentid == user.studentid) {
      error += "The user's studentid has existed.\n";
    }
    if(users[i].phone == user.phone) {
      error += "The user's phone has existed.\n";
      error += '\n';
    }
    if(users[i].email == user.email) {
      error += "The user's email has existed\n";
      error += '\n';
    }
  }
  //console.log("error"+error);
}



//172.18.33.148:8000