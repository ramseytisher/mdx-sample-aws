const { createFilePath } = require("gatsby-source-filesystem")

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  // you only want to operate on `Mdx` nodes. If you had content from a
  // remote CMS you could also check to see if the parent node was a
  // `File` node here
  if (node.internal.type === "Mdx") {
    const value = createFilePath({ node, getNode })
    
    createNodeField({
      name: "slug",
      node,
      value: `${value}`,
    })

    createNodeField({
      name: "image",
      node,
      value: `./cover.jpg`
    })

    createNodeField({
      name: "items",
      node,
      value: `./items.csv`
    })
  }
}

const path = require("path")
exports.createPages = async ({ graphql, actions, reporter }) => {
  // Destructure the createPage function from the actions object
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }
  // Create blog post pages.
  const containers = result.data.allMdx.edges
  // you'll call `createPage` for each result
  containers.forEach(({ node }, index) => {
    createPage({
      // This is the slug you created before
      // (or `node.frontmatter.slug`)
      path: node.fields.slug,
      // This component will wrap our MDX content
      component: path.resolve(`./src/components/containers-page-layout.js`),
      // You can use the values in this context in
      // our page layout component
      context: { id: node.id },
    })
  })
}