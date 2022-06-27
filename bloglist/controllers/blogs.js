const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

    response.json(blogs.map((blog) => blog))
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    if (body.title === undefined || body.url === undefined) {
        response.status(400).end()
    } else {
        const token = request.token
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return response
                .status(401)
                .json({ error: 'token missing or invalid' })
        }
        const user = await User.findById(decodedToken.id)

        const blog = new Blog({
            title: body.title,
            author: body.author,
            user: user,
            likes: body.likes || 0,
            url: body.url,
        })

        const saved = await blog.save()
        response.status(201).json(saved)
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        author: body.author,
        title: body.title,
        url: body.url,
        likes: body.likes || 0,
    }

    const changedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
        new: true,
    })

    response.status(200).json(changedBlog.body)
})

module.exports = blogsRouter
