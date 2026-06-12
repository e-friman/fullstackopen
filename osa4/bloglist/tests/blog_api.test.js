const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})

    await api.post('/api/users').send({
        username: 'testuser',
        name: 'Test User',
        password: 'secret'
    })

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
    const loginResponse = await api
        .post('/api/login')
        .send({
            username: 'testuser',
            password: 'secret'
        })

    const token = loginResponse.body.token

    const newBlog = {
        title: 'async/await is cool',
        author: 'meikalainen',
        url: 'www.blogi4.com',
        likes: 5
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(b => b.title)

    assert(titles.includes('async/await is cool'))
    assert.strictEqual(response.body.length, 3)
})

test('if likes is missing, it defaults to 0', async () => {
    const loginResponse = await api
        .post('/api/login')
        .send({
            username: 'testuser',
            password: 'secret'
        })

    const token = loginResponse.body.token

    const newBlog = {
        title: 'no likes blog',
        author: 'testi',
        url: 'www.blogi5.com'
    }

    const response = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)

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
        .expect(401)
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
        .expect(401)
})

test('blog cannot be deleted by wrong user', async () => {
    const users = await User.find({})
    const user1 = users[0]
    await api.post('/api/users').send({
        username: 'testuser2',
        name: 'User Two',
        password: 'secret2'
    })

    const login1 = await api.post('/api/login').send({
        username: user1.username,
        password: 'secret'
    })

    const token1 = login1.body.token

    const login2 = await api.post('/api/login').send({
        username: 'testuser2',
        password: 'secret2'
    })

    const token2 = login2.body.token

    const blogResponse = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token1}`)
        .send({
            title: 'test blog',
            url: 'test.com',
            likes: 0
        })

    await api
        .delete(`/api/blogs/${blogResponse.body.id}`)
        .set('Authorization', `Bearer ${token2}`)
        .expect(403)

    const blogsAfter = await Blog.find({})
    assert.strictEqual(blogsAfter.length, helper.initialBlogs.length + 1)
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

test('blog creation fails with 401 if token is not provided', async () => {
    const newBlog = {
        title: 'no auth blog',
        author: 'tester',
        url: 'test.com',
        likes: 0
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)

    const blogsAtEnd = await Blog.find({})
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

after(async () => {
    await mongoose.connection.close()
})