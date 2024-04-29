const mongoose = require("mongoose")
const {UserSchema} = require('../model')
const {Roles} = require("../constant");
const User = mongoose.model("User", UserSchema)

const UserRepository = {
    FindByEmail(email){
        return User.findOne({email}).lean()
    },
    Update(id, user){
        return User.updateOne({_id:id}, user).lean()
    },
    GetUserList(){
        const roles = [Roles.ADMIN, Roles.CLIENT]
        return User.find({deleted:false})
            .where({role : { $in : roles}})
            .lean()
    },
    FindById(id){
        return User.findById(id).lean()
    },
    Create(user){
        return User.create(user)
    },
    CreateRegister(user){
        return User.create(user)
    },
    Delete(id){
        return User.updateOne({_id:id},{deleted:true})
    }
}

module.exports = UserRepository