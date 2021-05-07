require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;

//router import
const userRouter = require('./routes/userRouter');

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
	secret: process.env.SESION_SECRET,
	saveUninitialized: true,
	resave: true,
	cookie: { maxAge: 60000 }
}));

console.log(process.env.SESSION_SECRET);

app.use('/user', userRouter);

app.listen(PORT, () => {
	console.log(`Server up on port ${PORT}`);
});

