
const AdminRoute = require('./admin');
const SecurityRoute = require('./SecurityRoute')
const RegisterRoute = require('./RegisterRoute')
const ClientRoute = require('./client')
const ProFileRoute = require('./ProFileRoute')

const Auth = require('../app/middleware/Auth')
const {ADMIN, CLIENT} = require("../app/constant/Roles");

module.exports = (app) => {
    
    app.use('/profile',
    (req, res, next) => Auth.Authorize(req, res, next, [ADMIN, CLIENT]),
    ProFileRoute
)
    app.use('/security', SecurityRoute)


    app.use('/register', RegisterRoute)
    //root route admin

    app.use('/admin',
    (req, res, next) => Auth.Authorize(req, res, next, [ADMIN]),
    AdminRoute);

    app.use('/client', 
    (req, res, next) => Auth.Authorize(req, res, next, [CLIENT]),
    ClientRoute);
    
    // app.use('/client', ClientRoute);
    app.use('/', SecurityRoute);

}
