const express = require('express')
const otoparkRoutes = require('./routes/otoparkRoutes')
const yesilAlanRoutes = require('./routes/yesilAlanRoutes')
const mongoose = require('mongoose');
const cors = require('cors');
const app = express()


var DB_CONNECTION_STRING = process.env.DB

app.use(cors({origin: true, credentials: true}));
app.use(express.json());

app.use("/otopark",otoparkRoutes)
app.use("/yesilalan",yesilAlanRoutes)




mongoose.connect(DB_CONNECTION_STRING, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

var server = app.listen( process.env.PORT || 8080, function(){
    console.log('Listening on port ' + server.address().port);
});

