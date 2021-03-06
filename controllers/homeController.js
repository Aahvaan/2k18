
var TeamLeader = require("../models/teamLeader");
var Team = require("../models/team");
var async = require('async');
var nodemailer = require('nodemailer');
var crypto = require('crypto');
var bcrypt = require('bcrypt');
const saltRounds = 10;
var smtpTransport = nodemailer.createTransport({
						service: 'Gmail',
						auth:{
							user: 'aahvaandtu@gmail.com',
							pass: process.env.PASSWORD 
						}
					});
exports.index = function(req,res){
	var number_of_teams=0;
	TeamLeader.findById(req.session.userid,function(err,teamLeader){
		if(teamLeader){
			Team.find({leader:teamLeader}).exec(function(err,teams){
				number_of_teams = teams.length;
				res.render("../views/home",{username: req.session.username , userid: req.session.userid , number_of_teams:number_of_teams});
			});
		}else{
			res.render("../views/home",{username: req.session.username , userid: req.session.userid , number_of_teams:number_of_teams});
		}
	});
	
};

// exports.home_two = function(req,res){
// 	res.render("../views/home_two",{username: req.session.username , userid: req.session.userid});
// }

// exports.home_three = function(req,res){
// 	res.render("../views/home_three",{username: req.session.username , userid: req.session.userid});
// }

exports.my_teams = function(req,res){
	if(req.session.username){
		var amount = 0;
		TeamLeader.findById(req.session.userid,function(err,teamLeader){
			if(err){
				console.log(err);
			}else{
		Team.find({leader: teamLeader}).sort({time: -1}).exec(function(err,teams){
			if(err){
			console.log(err);
			}else{
				teams.forEach(function(team){
					amount = amount + team.amount;
				});
			res.render("../views/my_teams",{username: req.session.username , userid: req.session.userid , teams:teams , amount: amount});	
		}
		});
		}
		});
	}else{
		res.render("../views/login",{alert: 0 , username: req.session.username , userid: req.session.userid});
	}
};

exports.get_register_events = function(req,res){
		var number_of_teams=0;
	TeamLeader.findById(req.session.userid,function(err,teamLeader){
		if(teamLeader){
			Team.find({leader:teamLeader}).exec(function(err,teams){
				number_of_teams = teams.length;
					res.render("../views/home",{username: req.session.username , userid: req.session.userid , number_of_teams:number_of_teams});
			});
		}else{
			res.render("../views/home",{username: req.session.username , userid: req.session.userid , number_of_teams:number_of_teams});
		}
	});

}

exports.register_events = function(req,res){
	res.render("../views/register_events",{alert: false , username:req.session.username , userid: req.session.userid , event: req.body.event});
};

exports.register_events_teams = function(req,res){

	


};

exports.register = function(req,res){
	if(req.session.username){
		res.render("../views/register_teams",{username: req.session.username , userid: req.session.userid});
	}else{
	res.render("../views/register" , {alert: 0 , username: req.session.username , userid: req.session.userid});
	}
};

exports.post_register = function(req,res){
	if(req.session.username){
		res.render("../views/register_teams",{username: req.session.username , userid: req.session.userid});
	}else{
	var leader_phone = Number(req.body.leader_number);
	if(isNaN(leader_phone)){
		res.render("../views/register",{alert: 1 , username: req.session.username , userid: req.session.userid});
	}else{
		TeamLeader.findOne({email: req.body.leader_email} , function(err,teamLeader){
			if(teamLeader){
				res.render("../views/register",{alert: 3 , username: req.session.username , userid: req.session.userid});
			}else{
				bcrypt.genSalt(saltRounds,function(err,salt){
				if(err){
					res.render("../views/register",{alert: 2 , username: req.session.username , userid: req.session.userid});
				}else{
					bcrypt.hash(req.body.leader_password,salt,function(err,hash){
						if(err){
							res.render("../views/register",{alert: 2 , username: req.session.username , userid: req.session.userid});
						}else{
						TeamLeader.create(
							{name: req.body.leader_name,
			 				college: req.body.leader_college,
			 				number: req.body.leader_number,
			 				email: req.body.leader_email,
			 				password: hash
							}, function(err,teamLeader){
									if(err){
										res.render("../views/register",{alert: 2 , username: req.session.username , userid: req.session.userid});
									}else{
										req.session.username = teamLeader.name;
										req.session.userid = teamLeader._id;
										res.render("../views/home",{username: req.session.username , userid: req.session.userid,number_of_teams:0});
									}
					   			}
							);
					}
					});
				}
				});
				
			}
		});
		
	}
}
};

exports.register_teams = function(req,res){
		res.render("../views/register_teams",{username: req.session.username , userid: req.session.userid});
};

exports.post_register_teams = function(req,res){
		var sports_number = Number(req.body.sport);
		var sports_name=' ';
		switch(sports_number){
			case 1: sports_name = "Athletics";
					break;
			case 2: sports_name = "Badminton";
					break;
			case 3: sports_name = "Basketball";
					break;
			case 4: sports_name = "Chess";
					break;
			case 5: sports_name = "Cricket";
					break;
			case 6: sports_name = "Football";
					break;
			case 7: sports_name = "Handball";
					break;
			case 8: sports_name = "Kabaddi";
					break;
			case 9: sports_name = "Powerlifting";
					break;
			case 10: sports_name = "TableTennis";
					break;
			case 11: sports_name = "Tennis";
					break;
			case 12: sports_name = "Volleyball";
					break;	
			default: sports_name=" ";																				
		}
	res.render("../views/register_sports",{alert:0 , sports_name:sports_name , username: req.session.username , userid: req.session.userid});
};


exports.register_sports = function(req,res){
		var sports_name = "Athletics";
		res.render("../views/register_sports",{alert:0 , sports_name:sports_name , username: req.session.username , userid: req.session.userid});
};

exports.post_register_sports = function(req,res){
		var Team = require("../models/team");
		var cap_phone = Number(req.body.captain_number);
		var number = Number(req.body.number_of_players);
		var sports_name = req.body.sports_name;
		if(isNaN(cap_phone)){
					res.render("../views/register_sports",{alert:1 , sports_name:req.body.sports_name, username: req.session.username , userid: req.session.userid});
		}else{
			var accomodation = false;
					if(req.body.accomodation){
						accomodation = true;
					}
			if(!req.session.username){
					var players = [];
					for(var i=0;i<req.body.number_of_players;i++){
						var player_name = "player_name"+(i);
						var select='';
						if(sports_name=="Athletics"){
						 select = "select_events"+(i);
					}else if(sports_name="Powerlifting"){
						select = "select_category"+(i);
					}
						players.push({name: req.body[player_name],events:req.body[select]});
					}
					Team.create(
					{captain: req.body.captain_name,
					 college:req.body.college_name,
					 contact: req.body.captain_number,
					 email: req.body.team_email,
					 number_of_players: req.body.number_of_players,
					 gender: req.body.gender,
					 players: players,
					 accomodation: accomodation,
					 amount: req.body.amount,
					 sport: req.body.sports_name},function(err,team){
						if(err){
							console.log(err);
						}else{
							var players_name = [];
							team.players.forEach(function(player){
								players_name.push(player.name);
							});
						var mailOptions = {
						to: team.email,
						from: 'aahvaandtu@gmail.com',
						subject: 'Aahvaan 2k18 Team Registration',
						text: 'Thank you for registering team for Aahvaan 2k18.'+'\n'+
						'Sport: '+team.sport+'\n'+
						'Captain: '+team.captain+'\n'+
						'Players: '+players_name+'\n'+
						'Amount: Rs. ' + team.amount +'.'+'\n'+
						'Further instructions for payment will be provided to you.'+'\n'+
						'Regards,'+'\n'+
						'Team Aahvaan' 
					};
					smtpTransport.sendMail(mailOptions,function(err){
						if(err){
							console.log(err);
						}
					});
							res.render("../views/thankyou",{username:req.session.username,userid:req.session.userid});
						}
					});

			}else{
				TeamLeader.findById(req.session.userid , function(err,teamLeader){
				if(err){
					console.log(err);
				}else{
					var players = [];
					for(var i=0;i<req.body.number_of_players;i++){
						var player_name = "player_name"+(i);
						var select='';
						if(sports_name=="Athletics"){
						 select = "select_events"+(i);
					}else if(sports_name="Powerlifting"){
						select = "select_category"+(i);
					}
						players.push({name: req.body[player_name],events:req.body[select]});
					}
					Team.create(
					{captain: req.body.captain_name,
					college: teamLeader.college,
					 contact: req.body.captain_number,
					 email: teamLeader.email,
					 number_of_players: req.body.number_of_players,
					 leader: teamLeader,
					 gender: req.body.gender,
					 accomodation:accomodation,
					 amount: req.body.amount,
					 players: players,
					 sport: req.body.sports_name},function(err,team){
						if(err){
							console.log(err);
						}else{
								var number_of_teams=0;
								Team.find({leader:teamLeader}).exec(function(err,teams){
								number_of_teams = teams.length;
								res.render("../views/home",{username: req.session.username , userid: req.session.userid , number_of_teams:number_of_teams});
								});
								
						}
					});
				}
			});
		}
	}
	
		
};

exports.login = function(req,res){
	if(req.session.username){
	var number_of_teams=0;
	TeamLeader.findById(req.session.userid,function(err,teamLeader){
		if(teamLeader){
			Team.find({leader:teamLeader}).exec(function(err,teams){
				number_of_teams = teams.length;
					res.render("../views/home",{username: req.session.username , userid: req.session.userid , number_of_teams:number_of_teams});
			});
		}else{
			res.render("../views/home",{username: req.session.username , userid: req.session.userid , number_of_teams:number_of_teams});
		}
	});

		}else{
	res.render("../views/login",{alert: 0 , username: req.session.username , userid: req.session.userid});
	}
};

exports.post_login = function(req,res){
	if(req.session.username){
				var number_of_teams=0;
	TeamLeader.findById(req.session.userid,function(err,teamLeader){
		if(teamLeader){
			Team.find({leader:teamLeader}).exec(function(err,teams){
				number_of_teams = teams.length;
					res.render("../views/home",{username: req.session.username , userid: req.session.userid , number_of_teams:number_of_teams});
			});
		}else{
			res.render("../views/home",{username: req.session.username , userid: req.session.userid , number_of_teams:number_of_teams});
		}
	});

		}else{
	TeamLeader.findOne({email: req.body.leader_email} , function(err,teamLeader){
			if(err){
				res.render("../views/login",{alert:1 , username: req.session.username , userid: req.session.userid});
			}else{
				if(teamLeader){
					bcrypt.compare(req.body.leader_password,teamLeader.password,function(err,check){
						if(check){
							req.session.username = teamLeader.name;
							req.session.userid = teamLeader._id;
								var number_of_teams=0;
			Team.find({leader:teamLeader}).exec(function(err,teams){
				number_of_teams = teams.length;
					res.render("../views/home",{username: req.session.username , userid: req.session.userid , number_of_teams:number_of_teams});
			});

						}else{
							res.render("../views/login",{alert:1 , username: req.session.username , userid: req.session.userid});
						}
					});
				}else{
					res.render("../views/login",{alert:1 , username: req.session.username , userid: req.session.userid});
				}
			}
	});
}
};	


exports.logout = function(req,res){
	if(req.session.username){
		req.session.username = null;
		req.session.userid = null;	
	}
	res.render("../views/home",{username:req.session.username , userid: req.session.userid,number_of_teams:0});
};

exports.campus_ambassador = function(req,res){
	res.render("../views/campus_ambassador_form",{alert:0 , username: req.session.username , userid: req.session.userid});
};

exports.post_campus_ambassador = function(req,res){
		var CampusAmbassador = require("../models/campusAmbassador");
		var ca_phone = Number(req.body.ca_number);
		if(isNaN(ca_phone)){
			res.render("../views/campus_ambassador_form",{alert:1 , username: req.session.username , userid: req.session.userid});
		}else{
			CampusAmbassador.findOne({email: req.body.ca_email},function(err,campusAmbassador){
				if(err){
					res.render("../views/campus_ambassador_form",{alert:1 , username: req.session.username , userid: req.session.userid});
				}else{

					if(campusAmbassador){
						res.render("../views/campus_ambassador_form",{alert:2 , username: req.session.username , userid: req.session.userid});	
					}else{
						CampusAmbassador.create(
							{name: req.body.ca_name,
				 			number: req.body.ca_number,
				 			email: req.body.ca_email,
							college: req.body.ca_college,
							year: req.body.ca_year,
				 			area: req.body.ca_area,
				 			why: req.body.ca_why} , function(err,CampusAmbassador){
				 				if(err){
				 					res.render("../views/campus_ambassador_form",{alert:1 , username: req.session.username , userid: req.session.userid});
				 				}else{
				 		var mailOptions = {
						to: CampusAmbassador.email,
						from: 'aahvaandtu@gmail.com',
						subject: 'Aahvaan 2k18 Campus Ambassador',
						text: 'Thank you for applying for Campus Ambassador.'+'\n'+
						'Looking forward on working with you.'+'\n'+
						'Regards,'+'\n'+
						'Team Aahvaan' 
					};
					smtpTransport.sendMail(mailOptions,function(err){
						if(err){
							console.log(err);
						}
					});
				 		res.render("../views/thankyou_campus_ambassador" , {username: req.session.username , userid: req.session.userid});
				 				}
				 			}
						);
					}
				}
			});
			
		}
};

exports.forgot_password = function(req,res){
	if(req.session.username){
	var number_of_teams=0;
	TeamLeader.findById(req.session.userid,function(err,teamLeader){
		if(teamLeader){
			Team.find({leader:teamLeader}).exec(function(err,teams){
				number_of_teams = teams.length;
					res.render("../views/home",{username: req.session.username , userid: req.session.userid , number_of_teams:number_of_teams});
			});
		}else{
			res.render("../views/home",{username: req.session.username , userid: req.session.userid , number_of_teams:number_of_teams});
		}
	});

	}else{
		res.render("../views/forgot_password",{alert: 0 , username: req.session.username , userid: req.session.userid});
	}
};

exports.send_token = function(req,res){
	var number_of_teams=0;
	TeamLeader.findById(req.session.userid,function(err,teamLeader){
		if(teamLeader){
			Team.find({leader:teamLeader}).exec(function(err,teams){
				number_of_teams = teams.length;
					res.render("../views/home",{username: req.session.username , userid: req.session.userid , number_of_teams:number_of_teams});
			});
		}else{
			res.render("../views/home",{username: req.session.username , userid: req.session.userid , number_of_teams:number_of_teams});
		}
	});

}

exports.post_send_token = function(req,res){
	var email = req.body.user_email;
	TeamLeader.findOne({email:email},function(err,teamLeader){
		if(err){
			res.render("../views/forgot_password",{alert:1 , username: req.session.username , userid: req.session.userid});
		}else{
			if(teamLeader){
					crypto.randomBytes(20,function(err,buf){
						if(err){
							console.log(err);
						}else{
						  var token = buf.toString('hex');
					teamLeader.resetPasswordToken = token;
					teamLeader.resetPasswordExpires = Date.now() + 3600000;

					teamLeader.save(function(err){
						if(err){
							res.render("../views/forgot_password",{alert:1 , username: req.session.username , userid: req.session.userid});
						}
					});

					

					var mailOptions = {
						to: teamLeader.email,
						from: 'aahvaandtu@gmail.com',
						subject: 'Aahvaan 2k18 Contingent Leader Password Reset',
						text: 'You are receiving this because you (or someone else) has requested for the reset of the password.'+'\n'+
						'Please click on the following link or paste into your browser to complete the process.'+'\n'+
						'http://'+req.headers.host+'/reset_password/'+token+'\n\n'+
						'If you not request this , please ignore and your password will remain unchanged.'+'\n'+
						'This token is valid only for one hour.'+'\n\n'+
						'Regards,'+'\n'+
						'Team Aahvaan' 
					};
					smtpTransport.sendMail(mailOptions,function(err){
						if(err){
							console.log(err);
							res.render("../views/forgot_password",{alert:1 , username: req.session.username , userid: req.session.userid});
						}else{
							res.render("../views/forgot_password_sent",{useremail:teamLeader.email,username: req.session.username , userid: req.session.userid});
						}
					});
			}
					});
			
			}else{
				res.render("../views/forgot_password",{alert:2 , username: req.session.username , userid: req.session.userid});
			}
		}
	});
}

exports.reset_password = function(req,res){
	TeamLeader.findOne({resetPasswordToken: req.params.token , resetPasswordExpires: {$gt: Date.now()}},function(err,teamLeader){
		if(err){
			console.log(err);
			res.render("../views/forgot_password",{alert:1 , username: req.session.username , userid: req.session.userid});
		}else{
			if(teamLeader){
				res.render("../views/reset_password",{alert: 0 , token:req.params.token,username: req.session.username , userid: req.session.userid});
			}else{
				res.render("../views/forgot_password",{alert:3 , username: req.session.username , userid: req.session.userid});
			}
		}
	});
};	

exports.post_reset_password = function(req,res){
	if(req.body.leader_password != req.body.leader_password_confirm){
			res.render("../views/reset_password",{alert: 1 , token:req.body.token,username: req.session.username , userid: req.session.userid});
	}else{
	TeamLeader.findOne({resetPasswordToken: req.body.token , resetPasswordExpires: {$gt: Date.now()}},function(err,teamLeader){
		if(err){
			console.log(err);
			res.render("../views/forgot_password",{alert:1 , username: req.session.username , userid: req.session.userid});
		}else{
			if(teamLeader){
				bcrypt.genSalt(saltRounds,function(err,salt){
				if(err){
					res.render("../views/forgot_password",{alert: 1 , username: req.session.username , userid: req.session.userid});
				}else{
					bcrypt.hash(req.body.leader_password,salt,function(err,hash){
						if(err){
							res.render("../views/forgot_password",{alert: 1 , username: req.session.username , userid: req.session.userid});
						}else{
							teamLeader.password = hash;
							teamLeader.resetPasswordToken = undefined;
							teamLeader.resetPasswordExpires = undefined;

							teamLeader.save(function(err){
								if(err){
									res.render("../views/forgot_password",{alert: 1 , username: req.session.username , userid: req.session.userid});
								}else{
									res.render("../views/login",{alert: 2 , username:req.session.username , userid: req.session.userid});
								}
							});
						}
					});
			}});
			}else{
				res.render("../views/forgot_password",{alert:3 , username: req.session.username , userid: req.session.userid});
			}
		}
	});

}

};


exports.thankyou = function(req,res){
		var number_of_teams=0;
	TeamLeader.findById(req.session.userid,function(err,teamLeader){
		if(teamLeader){
			Team.find({leader:teamLeader}).exec(function(err,teams){
				number_of_teams = teams.length;
					res.render("../views/home",{username: req.session.username , userid: req.session.userid , number_of_teams:number_of_teams});
			});
		}else{
			res.render("../views/home",{username: req.session.username , userid: req.session.userid , number_of_teams:number_of_teams});
		}
	});

};

exports.thankyou_ca = function(req,res){
		var number_of_teams=0;
	TeamLeader.findById(req.session.userid,function(err,teamLeader){
		if(teamLeader){
			Team.find({leader:teamLeader}).exec(function(err,teams){
				number_of_teams = teams.length;
					res.render("../views/home",{username: req.session.username , userid: req.session.userid , number_of_teams:number_of_teams});
			});
		}else{
			res.render("../views/home",{username: req.session.username , userid: req.session.userid , number_of_teams:number_of_teams});
		}
	});

};

exports.contingent_submit = function(req,res){
		var amount = 0;
		var sports = [];
		TeamLeader.findById(req.session.userid,function(err,teamLeader){
			if(err){
				console.log(err);
			}else{
		Team.find({leader: teamLeader}).sort({time: -1}).exec(function(err,teams){
			if(err){
			console.log(err);
			}else{
				teams.forEach(function(team){
				amount = amount + team.amount;
				sports.push(team.sport);
				});
			var mailOptions = {
						to: teamLeader.email,
						from: 'aahvaandtu@gmail.com',
						subject: 'Aahvaan 2k18 Team Registration',
						text: 'Thank you for registering your teams for Aahvaan 2k18.'+'\n'+
						'Sports: '+sports+'\n'+
						'Amount: Rs. ' + amount +'.'+'\n'+
						'Further instructions for payment will be provided to you.'+'\n'+
						'Regards,'+'\n'+
						'Team Aahvaan' 
					};
					smtpTransport.sendMail(mailOptions,function(err){
						if(err){
							console.log(err);
						}
					});
					res.render("../views/thankyou",{username:req.session.username,userid:req.session.userid});
		}
	});
	}});				
};

exports.delete_team = function(req,res){
	Team.findById(req.body.id,function(err,team){
		if(err){
			console.log(err);
		}else{
			team.remove();
		}
	});
};

// exports.live = function(req,res){
// 	res.render("../views/live" , {username: req.session.username , userid: req.session.userid});
// };


// exports.carousel = function(req, res) {
// 	res.render("../views/carousel", {
//     username: req.session.username,
//     userid: req.session.userid
//   });











