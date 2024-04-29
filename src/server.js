
const express = require('express');
const app = express();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const ejs = require('ejs');
const path = require('path')
methodOverride = require('method-override');

const port = 3000;
const db = require('./config/db/index');

//Connect to DB
db.connect();

const route = require('./route/index-route')

app.use(express.json  ());

// static
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())
//morgan
app.use(morgan('combined'));
// app.use(methodOverride('_method'))
//temples engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'app/view'));
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts)

// Routes init
route(app);


app.listen(port, () =>
    console.log(`App listening on port ${port}`));
