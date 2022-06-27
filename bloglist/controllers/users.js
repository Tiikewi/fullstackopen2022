const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {
        title: 1,
        author: 1,
        url: 1,
    })

    response.json(users.map((user) => user))
})

usersRouter.post('/', async (request, response) => {
    const body = request.body
    if (body.password === undefined || body.password.length < 3) {
        response.status(400).json('invalid password')
    } else {
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            blogs: body.blogId,
            username: body.username,
            name: body.name,
            password: hashedPassword,
        })

        const savedUser = await user.save()

        response.status(201).json(savedUser)
    }
})

module.exports = usersRouter
