const {UserService} = require("../service");
const {Roles} = require('../constant')
const {CREATED, BAD_REQUEST} = require("../constant");
const {DateUtil} = require("../utils");


const RegisterController = {
    async NewRegisterPage(req, res) {
        const data = {
            page_title: 'Register',
            role: Roles.CLIENT
        }
        return res.render(
            'register/register-page',
            {
                layout: false,
                data
            }
        )
    },
    async CreateRegister(req, res) {
        const register = await UserService.Register(req)
        if (register === 'user_existed') {
            return res.status(200).json({
                code: BAD_REQUEST,
                message: `Account already exists with email: ${req.body.email}`
            })}
        else if (register) {
            return res.status(200).json({code: CREATED, message: 'created successfully'})
        }
        return res.status(200).json({code: BAD_REQUEST, message: 'creating failed'})
    },
}

module.exports = RegisterController