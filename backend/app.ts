import express from 'express';
import expressJwt from 'express-jwt';



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


module.exports = app;
