
var connection = require('./../config');
var dbhandler = require('./../dbhandler');
module.exports.myattendance=function(req,res){
	var from_date=req.body.from_date;
    var to_date=req.body.to_date;
	var emp_id =req.body.emp_id;
	var org =req.body.org;
	
	console.log(from_date,to_date,emp_id,org);
	
	if(!!from_date && !!to_date && !!emp_id && !!org){
	
		var dbobj = new dbhandler();
		dbobj.getMyAttendance(new Date(from_date), new Date(to_date),emp_id,org, function(response){
			//console.log(response);
			res.json({
				status:false,
				emp_id:emp_id,
				data:response,
				message:"Success"
			});
		});
		
	}else{
		
		res.json({
			status:false,
			message:"Please provide all required data (i.e : from_date, to_date, emp_id,org )"
		}); 
	}
}
module.exports.manualattendance=function(req,res){
	var abst_dt=req.body.abst_dt;
    var frm_hrs=req.body.frm_hrs;
	var frm_mins =req.body.frm_mins;
	var reason =req.body.reason;
	var remarks =req.body.remarks;
	
	console.log(abst_dt,frm_hrs,frm_mins,reason,remarks);
	
	if(!!abst_dt && !!frm_hrs && !!frm_mins && !!reason){
	
		var dbobj = new dbhandler();
		dbobj.getMyAttendance(new Date(from_date), new Date(to_date),emp_id,org, function(response){
			//console.log(response);
			res.json({
				status:false,
				emp_id:emp_id,
				data:response,
				message:"Success"
			});
		});
		
	}else{
		
		res.json({
			status:false,
			message:"Please provide all required data (i.e : abst_dt, frm_hrs, frm_mins,reason )"
		}); 
	}
}

module.exports.manualrequesthistory=function(req,res){
	var abst_dt=req.body.abst_dt;
    var frm_hrs=req.body.frm_hrs;
	var frm_mins =req.body.frm_mins;
	var reason =req.body.reason;
	var remarks =req.body.remarks;
	
	console.log(abst_dt,frm_hrs,frm_mins,reason,remarks);
	
	if(!!abst_dt && !!frm_hrs && !!frm_mins && !!reason){
	
		var dbobj = new dbhandler();
		dbobj.getMyAttendance(new Date(from_date), new Date(to_date),emp_id,org, function(response){
			//console.log(response);
			res.json({
				status:false,
				emp_id:emp_id,
				data:response,
				message:"Success"
			});
		});
		
	}else{
		
		res.json({
			status:false,
			message:"Please provide all required data (i.e : abst_dt, frm_hrs, frm_mins,reason )"
		}); 
	}
}