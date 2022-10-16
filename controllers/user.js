const TB = require('../models/user')
const { genToken } = require('../utils/libby')
const LIBBY = require('../utils/libby')

let register = async (req, res, next) => {
    let phoneExitUser = TB.findOne({ phone: req.body.phone })
    if (!phoneExitUser) {
        req.body.password = LIBBY.encode(req.body.password)
        let result = await new TB(req.body).save()
        LIBBY.fMsg(res, 'Register Success', result)
    } else next(new Error('Phone is already in use'))
}

let login = async (req, res, next) => {
    const dbUser = await TB.findOne({ phone: req.body.phone }).populate('roles')
    if (dbUser) {
        const { password, ...others } = dbUser._doc
        const token = await genToken({ ...others })
        if (LIBBY.comPass(req.body.password, password)) {
            LIBBY.fMsg(res, 'login success', { ...others, token })
        } else next(new Error('Incorrect password'))
    } else {
        next(new Error('No User with that number'))
    }
}

let userAddRole = async (req, res, next) => {
    let dbUser = await TB.findById(req.body.userId)
    let findRole = dbUser.roles.find(
        role => role.toString() === req.body.roleId
    )

    if (!findRole) {
        let result = await TB.findByIdAndUpdate(req.body.userId, {
            $push: { roles: req.body.roleId },
        })
        LIBBY.fMsg(res, 'Role add to user', result)
    } else next(new Error('Role is already exist'))
}

let userRemoveRole = async (req, res, next) => {
    let dbUser = await TB.findById(req.body.userId)
    console.log(dbUser)
    if (dbUser) {
        let found = dbUser.roles.find(id => id.equals(req.body.roleId))
        if (found) {
            await TB.findByIdAndUpdate(req.body.userId, {
                $pull: { roles: req.body.roleId },
            })
            let result = await TB.findById(req.body.userId).populate('roles')
            LIBBY.fMsg(res, 'User', result)
        } else
            next(
                new Error('user has no role with that id  of' + req.body.roleId)
            )
    } else next(new Error('No user with that id of ' + req.body.userId))
}

let userAddPermit = async (req, res, next) => {
    let dbUser = await TB.findById(req.body.userId)
    if (dbUser) {
        let found = dbUser.permits.find(
            id => id.toString() === req.body.permitId
        )
        if (!found) {
            await TB.findByIdAndUpdate(req.body.userId, {
                $push: { permits: req.body.permitId },
            })
            LIBBY.fMsg(res, 'Permit Added')
        } else next(new Error('User have that permit already!'))
    } else next(new Error('No user with that id of' + req.body.userId))
}

let userRemovePermit = async (req, res, next) => {
    let dbUser = await TB.findById(req.body.userId)
    if (dbUser) {
        let found = dbUser.permits.find(
            id => id.toString() === req.body.permitId
        )
        if (found) {
            await TB.findByIdAndUpdate(req.body.userId, {
                $pull: { permits: req.body.permitId },
            })
            LIBBY.fMsg(res, 'permit deleted')
        } else next(new Error('User doest not have that id of' + permidId))
    } else next(new Error('No user with that id of' + req.body.userId))
}

module.exports = {
    register,
    login,
    userAddRole,
    userRemoveRole,
    userAddPermit,
    userRemovePermit,
}
