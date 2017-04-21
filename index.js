var express=require("express");
var bodyParser=require('body-parser');
var app = express();
var authenticateController=require('./controllers/authenticate-controller');
var registerController=require('./controllers/register-controller');
var tipfunctions=require('./controllers/tip-functions');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
/* route to handle login and registration */
app.post('/api/register',registerController.register);
app.post('/api/authenticate',authenticateController.authenticate);
//app.post('/api/teamattendance',tipfunctions.teamattendance);
app.post('/api/myattendance',tipfunctions.myattendance);
app.post('/api/manualattendance',tipfunctions.manualattendance);
app.post('/api/manualrequesthistory',tipfunctions.manualrequesthistory);
app.listen(8012);