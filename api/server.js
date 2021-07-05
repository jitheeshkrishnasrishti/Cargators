const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./DB.js');
// const businessRoute = require('./business.route');
const businessRoute = require('./controller/business.route.js');
const negotiatorRoute = require('./controller/AdminNegotiator.route.js');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true , useUnifiedTopology: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/business', businessRoute);
app.use('/negotiator', negotiatorRoute);


app.listen(PORT, function(){
  console.log('Server is running on Port:',PORT);
});