/* eslint-disable quotes */
import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import Blog from "./Blog"
import BlogForm from "./BlogForm"

const blog = {
  title: "Testaus",
  author: "Testaaja",
  likes: 1,
  url: "Test url",
  user: { id: "abc", username: "username", name: "name" },
}
describe("Blog renders", () => {
  test("Renders only blogs title and author", () => {
    const component = render(<Blog blog={blog}></Blog>)

    expect(component.container).toHaveTextContent("Testaus")
    expect(component.container).toHaveTextContent("Testaaja")
    expect(component.container).not.toHaveTextContent("1")
    expect(component.container).not.toHaveTextContent("Test url")
  })

  test("After clicking button More, render also likes and url", () => {
    const component = render(<Blog blog={blog}></Blog>)

    const button = component.container.querySelector(".showMoreBtn")

    fireEvent.click(button)

    expect(component.container).toHaveTextContent("Testaus")
    expect(component.container).toHaveTextContent("Testaaja")
    expect(component.container).toHaveTextContent("1")
    expect(component.container).toHaveTextContent("Test url")
  })

  test("Clicking like twice, calls event handler twice", () => {
    const mockHandler = jest.fn()

    const component = render(<Blog blog={blog} likeBlog={mockHandler}></Blog>)

    const moreButton = component.container.querySelector(".showMoreBtn")
    fireEvent.click(moreButton)

    const likeButton = component.container.querySelector(".likeBtn")
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})

describe("Blog creation", () => {
  test("Blog creation form calls event handler with correct content", () => {
    const addBlog = jest.fn()

    const component = render(<BlogForm addBlog={addBlog}></BlogForm>)

    const titleInput = component.container.querySelector("#title")
    const authorInput = component.container.querySelector("#author")
    const urlInput = component.container.querySelector("#url")
    const form = component.container.querySelector("form")

    fireEvent.change(titleInput, {
      target: { value: blog.title },
    })

    fireEvent.change(authorInput, {
      target: { value: blog.author },
    })

    fireEvent.change(urlInput, {
      target: { value: blog.url },
    })
    fireEvent.submit(form)

    const mockCalls = addBlog.mock.calls
    expect(mockCalls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].title).toBe(blog.title)
    expect(addBlog.mock.calls[0][0].author).toBe(blog.author)
    expect(addBlog.mock.calls[0][0].url).toBe(blog.url)
  })
})
