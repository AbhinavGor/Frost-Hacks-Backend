const Appointment = require('../models/Appointment');
const mongoose = require('mongoose');

module.exports = {
	getApts : async (req, res) => {
		try{
			const allApts = await Appointment.find({});
			if(allApts){
				res.status(200).send(allApts);
			} else {
				res.status(404).send({ "message": "No appointments found now! Please try again later!" });
			}
		} catch (err) {
			res.status(500).send(err);
		}
	},
	createApt : async (req, res) => {
		try{
			const { docId, date, meetingLink } = req.body;
			const newApt = new Appointment({
				userId: mongoose.Schema.Types.ObjectId(req.user._id.toString()),
				docId: docId,
				date: date,
				meetingLink: meetingLink
			});
			
			await newApt.save();

			res.status(200).send(newApt);
		} catch(err) {
			res.status(500).send(err);
		}
	},
	updateAptStatus : async (req, res) => {
		try{
			const { aptId, aptStatus } = req.params;
			const foundApt = await Appointments.findOne({ _id: mongoose.Schema.Types.Object(aptId) });
			
			if(!foundApt){
				res.status(404).send({ "message": `Appointment with ID ${aptId} not found!` });
			}else{
				foundApt.status = Number(aptStatus);
			}
			await foundApt.save();
		
			res.status(200).send(foundApt);
		} catch(err) {
			res.status(500).send({ "message": `No appointment with ID ${aptId} found!` });
		}
	}
}
		
