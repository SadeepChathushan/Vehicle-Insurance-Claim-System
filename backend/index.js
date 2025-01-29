const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const AdminRouter = require('./Routes/adminRoutes');
const dcAdjusterRouter = require('./Routes/dcAdjusterRouter');
const clientRouter = require('./Routes/clientRoutes');
const agentRouter = require('./Routes/agentRouter');

require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 8080;

app.get('/ping', (req, res) => {
    res.send('PONG');
});

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/admin', AdminRouter);
app.use('/dcAdjuster', dcAdjusterRouter);
app.use('/client', clientRouter);
app.use('/agent' , agentRouter);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})