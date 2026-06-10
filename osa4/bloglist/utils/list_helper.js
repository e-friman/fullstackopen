const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    const maxLikes = Math.max(...blogs.map(blog => blog.likes))
    return blogs.find(blog => blog.likes === maxLikes)
}

const mostBlogs = (blogs) => {
    const grouped = _.groupBy(blogs, 'author')

    const counts = _.map(grouped, (blogs, author) => ({
        author,
        blogs: blogs.length
    }))

    return _.maxBy(counts, 'blogs')
}

const mostLikes = (blogs) => {
    const grouped = _.groupBy(blogs, 'author')

    const likesPerAuthor = _.map(grouped, (blogs, author) => ({
        author,
        likes: _.sumBy(blogs, 'likes')
    }))

    return _.maxBy(likesPerAuthor, 'likes')
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}