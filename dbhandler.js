'use strict';
var connection = require('./config');
var async = require('async')
module.exports = class DbHandler {
   constructor(firstName, lastName) {
       this.firstName = firstName;
       this.lastName = lastName;
   }

   display() {
       console.log(this.firstName + " " + this.lastName);
   }
   holiday_leave(org,res){
	   connection.query("select leave_date from  holyday where leave_type='H' and FIND_IN_SET( ? ,organisation)",[org], function (error, results, fields) {
		if (error) {
			  console.log(error);
		}else{
			//console.log(results);
			return res(results);
		}
	   });
   }
   excQuery(query,params,callback){
	    connection.query(query,params, function (error, results, fields) {
			if (error) {
				  console.log(error);
			}else{
				return callback(results);
			}					
		});	
				
   }
   
   getDatesFromRange(startDate,endDate,emp_id,org,res){

		var dates = [],
		currentDate = startDate,
		addDays = function(days) {
			var date = new Date(this.valueOf());
			date.setDate(date.getDate() + days);
			return date;
		};
		console.log(currentDate,endDate);
		while (currentDate <= endDate) {
			var date_new = currentDate.getFullYear()+'-'+(currentDate.getMonth()+1)+'-'+currentDate.getDate();
			dates.push(date_new);
			currentDate = addDays.call(currentDate, 1);

		}	
		return res(dates);		
   }
   
   
   getPunchInPunchOut(from_date,to_date,emp_id,org,callback){
	   var json_data = [];
	   var that = this;
	     this.getDatesFromRange(from_date,to_date,emp_id,org, function(response){
			console.log(response);
		
			
			async.eachSeries(response,function(item,callback){ // It will be executed one by one
			var sql = "select id,emp_id,org, min(punch_in) as punch_intime  ,max(punch_in) as punch_outtime from attendance_login where emp_id = '"+emp_id+"'  and date(punch_in) =  '"+item+"' order by punch_in DESC ; ";
			
			that.excQuery(sql,[],function (results) {
					var tmp = {};
						tmp['color_code']="#FFC0CB";
						tmp['date']=that.getDateFormat(item);
						tmp['present_absent']=(results[0].punch_intime==null)? "A":"P";
						tmp['punch_intime']=(results[0].punch_intime==null)? "00:00:00": that.getTimeFormat(results[0].punch_intime);
						tmp['punch_outtime']=(results[0].punch_outtime==null)? "00:00:00": that.getTimeFormat(results[0].punch_outtime);
						tmp['org']=results[0].org;
						json_data.push(tmp);
						callback();
					
				});
				
				
			

			}, function(err, results) {
				//console.log(json_data);
				callback(json_data);
			});
				
			
		});	
			
   }
   getDateFormat(date){
	   var date = new Date(date);
			return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
   }
   getTimeFormat(date){
	   var date = new Date(date);
			return date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
   }
   
   getMyAttendance(from_date,to_date,emp_id,org,callback){

	   	  this.getPunchInPunchOut(new Date(from_date), new Date(to_date),emp_id,org, function(response){
	
					  callback(response);

				  });
   }
}