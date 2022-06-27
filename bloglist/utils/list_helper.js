const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  const amount = blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)

  return amount
}

const favoriteBlog = (blogs) => {
  const mostLiked = blogs.reduce((max, blog) => {
    return max.likes > blog.likes ? max : blog
  })

  return {
    title: mostLiked.title,
    author: mostLiked.author,
    likes: mostLiked.likes,
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
