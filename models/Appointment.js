const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId
		required: true
	},
	docId: {
		type: mongoose.Schema.Types.ObjecId
		required: true
	},
	date: {
		type: Date
	},
	meetingLink: {
		type: String
	}
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;

