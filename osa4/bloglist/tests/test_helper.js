const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "blogi_1",
        author: "ihteni",
        url: "www.blogi1.com",
        likes: 0
    },
    {
        title: "blogi_2",
        author: "ihteni taas",
        url: "www.blogi2.com",
        likes: 4
    }
]

const nonExistingId = async () => {
    const blog = new Blog({ title: 'willremovethissoon', author: 'ihteni', url: 'www.blogi3.com', likes: 0 })
    await blog.save()
    await blog.deleteOne()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb
}