const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, 2)
})

test('blogs have id property instead of _id', async () => {
    const response = await api.get('/api/blogs')

    const blog = response.body[0]

    assert.ok(blog.id)
    assert.strictEqual(blog._id, undefined)
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'async/await is cool',
        author: 'meikalainen',
        url: 'www.blogi4.com',
        likes: 5
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(b => b.title)
    assert(titles.includes('async/await is cool'))

    assert.strictEqual(response.body.length, 3)
})

test('if likes is missing, it defaults to 0', async () => {
    const newBlog = {
        title: 'no likes blog',
        author: 'testi',
        url: 'www.blogi5.com'
    }

    const response = await api
        .post('/api/blogs')
        .send(newBlog)

    assert.strictEqual(response.body.likes, 0)
})

test('blog without title is not added', async () => {
    const newBlog = {
        author: 'joku',
        url: 'www.blogi6.com',
        likes: 1
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

test('blog without url is not added', async () => {
    const newBlog = {
        title: 'missing url',
        author: 'testeri',
        likes: 1
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    const ids = blogsAtEnd.map(b => b.id)

    assert(!ids.includes(blogToDelete.id))

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
})

test('blog likes can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1
    }

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(200)

    const blogsAtEnd = await helper.blogsInDb()

    const updated = blogsAtEnd.find(b => b.id === blogToUpdate.id)

    assert.strictEqual(updated.likes, blogToUpdate.likes + 1)
})

after(async () => {
  await mongoose.connection.close()
})