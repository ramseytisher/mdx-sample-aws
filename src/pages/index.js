import React from "react"
import { Link } from "gatsby"
import { Box, Stack } from "grommet"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"
import Img from "gatsby-image"

const IndexPage = ({ data }) => {
  const { edges: containers } = data.allMdx
  return (
    <Layout>
      <SEO title="Home" />
      {/* <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>

      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div> */}
      <Link to="/page-2/">Go to page 2</Link>
      <h1>MDX Containers</h1>
      <Box direction="row-responsive">
        {containers.map(({ node: post }) => (
          <Link to={post.fields.slug}>
            <Box key={post.id} width="medium">
              <Stack>
                <Img fluid={post.fields.image.childImageSharp.fluid} />
                <p>{post.frontmatter.description}</p>
                <h2>{post.frontmatter.title}</h2>
              </Stack>
            </Box>
          </Link>
        ))}
      </Box>

    </Layout>
  )
}

export const pageQuery = graphql`
  query containerIndex {
    allMdx {
      edges {
        node {
          id
          excerpt
          frontmatter {
            title
            description
          }
          fields {
            slug
            image {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`

export default IndexPage
