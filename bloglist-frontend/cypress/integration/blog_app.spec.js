describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset")
    const user = {
      username: "testaaja",
      name: "Teste Tester",
      password: "badpassword",
    }
    cy.request("POST", "http://localhost:3003/api/users", user)
    cy.visit("http://localhost:3000")
  })

  it("Login form is shown", function () {
    cy.contains("Username")
    cy.get("#usernameInput")

    cy.contains("Password")
    cy.get("#passwordInput")
  })

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#usernameInput").type("testaaja")
      cy.get("#passwordInput").type("badpassword")
      cy.get("#loginBtn").click()

      cy.contains("Teste Tester")
    })

    it("fails with wrong credentials", function () {
      cy.get("#usernameInput").type("wronguser")
      cy.get("#passwordInput").type("wrongpass")
      cy.get("#loginBtn").click()

      cy.contains("Wrong username or password")
    })
  })

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "testaaja", password: "badpassword" })
    })

    it("A blog can be created", function () {
      cy.contains("Create new blog").click()
      cy.get("#title").type("Test blog")
      cy.get("#author").type("Tester")
      cy.get("#createBtn").click()

      cy.get("#blogListSmall").contains("Test blog Tester")
    })

    describe("and blog exists", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "Test",
          author: "Tester",
          url: "url url",
        })
      })

      it("A blog can be liked", function () {
        cy.get(".showMoreBtn").click()
        cy.get(".likeBtn").click()
        cy.contains("Likes: 1")
      })

      it("A blog can be removed", function () {
        cy.get(".showMoreBtn").click()
        cy.get(".removeBtn").click()
        cy.contains("Test Tester").should("not.exist")
      })

      it("Blogs are sorted by likes", function () {
        cy.createBlog({
          title: "Smallest",
          author: "Tester1",
          url: "url url1",
          likes: 1,
        })
        cy.createBlog({
          title: "Biggest",
          author: "Tester2",
          url: "url url2",
          likes: 100,
        })
        cy.createBlog({
          title: "Middle",
          author: "Tester3",
          url: "url url3",
          likes: 50,
        })

        cy.get(".showMoreBtn").click({ multiple: true })

        cy.get(".blog").eq(0).contains(100)
        cy.get(".blog").eq(1).contains(50)
        cy.get(".blog").eq(2).contains(1)
        cy.get(".blog").eq(3).contains(0)
      })
    })
  })
})
