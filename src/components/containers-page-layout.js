import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

export default function PageTemplate({ data: { mdx } }) {
  return (
    <div>
      <h1>{mdx.frontmatter.title} | {mdx.id}</h1>
      <h2>Body goes here</h2>
      <MDXRenderer>{mdx.body}</MDXRenderer>
      <h2>Items</h2>
      <pre>{JSON.stringify(mdx.fields.items.childrenItemsCsv, null, 2)}</pre>
    </div>
  )
}

export const pageQuery = graphql`
  query ContainerPageQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      fields {
        items {
          childrenItemsCsv {
            Description
            Link
          }
        }
      }
      frontmatter {
        title
      }
    }
  }
`