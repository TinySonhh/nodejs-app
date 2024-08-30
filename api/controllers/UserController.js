'use strict'

require("dotenv").config();
const db = require('../db')
const md5 = require('md5')
const jwt = require("jsonwebtoken");
const random = require("../../scripts/random");

const tokenList = {}

module.exports = {
	create: (req, res) => {        
		let body = req.body
		let password = md5(body.password)
		let email = body.email || ''
		let activationCode = random.random6()

		res.json({result: true, data:"Created successfully"})

		return

		let sql = `INSERT INTO User(PhoneNo, Email, Name, Password, ActivationCode, Status) `
		+	`VALUES (${db.escape(body.phoneNo)}, ${db.escape(email)}, ${db.escape(body.name)}, ${db.escape(password)}, ${db.escape(activationCode)}, 'new') ; `
		db.query(sql, function (err, data){
			let result = {result: false, data: ""}
			if (err) {
				result = {result: false, data: err}
			} else {            
				result = {result: data.affectedRows > 0, data: (data.affectedRows > 0? 'Created successfully':'Could not create')}
			}
			res.json(result)
		})
	},
	
	updateInfo: (req, res) => {                
		let body = req.body        
		let phoneNo = body.phoneNo
		let name = body.name
		let sql = `UPDATE User SET Name=${db.escape(name)} WHERE PhoneNo=${db.escape(phoneNo)} ; `

		result = {result: true, data: 'Updated profile successfully'}
		res.json(result)
		return;

		db.query(sql, function (err, data){
			let result = {result: false, data: ""}
			if (err) {
				result = {result: false, data: err}
			} else {            
				result = {result: data.affectedRows > 0, data: (data.affectedRows > 0? 'Updated profile successfully':'Could not update')}
			}
			res.json(result)
		})
	},

	login: (req, res) => {                
		let body = req.body        
		let params = req.params        
		let phoneNo = body.userid || params.userid
		let password = md5(body.password || "-")
		const pool = db

		let sql = ` Your sql goes here!`
		
		let result = {result: true, token:null, refreshToken:null, data: {}}
		if(result.result){

			const token = jwt.sign(
				{ phoneNo },
				process.env.TOKEN_KEY,
				{
					expiresIn: process.env.TOKEN_LIFE,
				}
			)
			const refreshToken = jwt.sign(
				{ phoneNo },
				process.env.REFRESH_TOKEN_KEY,
				{
					expiresIn: process.env.REFRESH_TOKEN_LIFE,
				}
			)

			tokenList[refreshToken] = refreshToken
			result.token = token
			result.refreshToken = refreshToken
		}			

		res.json(result)
		return;
		
		db.query(sql, function (err, data){
			let result = {result: false, token:null, refreshToken:null, data: {}}
			if (err) {
				result.data=err
			} else {            
				result.result= data.length > 0
				result.data=(data.length > 0? data[0]:{})
			}						

			if(result.result){

				const token = jwt.sign(
					{ phoneNo },
					process.env.TOKEN_KEY,
					{
						expiresIn: process.env.TOKEN_LIFE,
					}
				)
				const refreshToken = jwt.sign(
					{ phoneNo },
					process.env.REFRESH_TOKEN_KEY,
					{
						expiresIn: process.env.REFRESH_TOKEN_LIFE,
					}
				)

				tokenList[refreshToken] = refreshToken
				result.token = token
				result.refreshToken = refreshToken
			}			

			res.json(result)

			if(result.result){
				//check expiry
				sql = `INSERT INTO UserLoginHistory(PhoneNo) VALUES(${pool.escape(phoneNo)}) `
				//send the request and don't care about the response. let server handle it
				db.query(sql, function (err, data){
				})
			}
		})
	},

	profile: (req, res) => {                
		let body = req.body        
		let params = req.params        
		let userid = body.userid || params.userid
		const pool = db

		let sql = ` `
		
		let result = {userid: userid, data: {status: "good"}};
		res.json(result)
		return;

		db.query(sql, function (err, data){
			let result = err || (data.length > 0 ? data[0] : {});
			res.json(result)
		})
	},
}