import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"

const IndexPage = ({
  data: {
    posts: { edges: posts },
  },
}) => (
  <Layout>
    <h1>Post Index</h1>
    <ul>
      {posts.map(({ node }) => {
        const { fields, frontmatter } =
          node.childMarkdownRemark || node.childMdx
        return (
          <li key={fields.slug}>
            <h3>
              <Link to={fields.slug}>{frontmatter.title}</Link>
            </h3>
          </li>
        )
      })}
    </ul>
  </Layout>
)

export default IndexPage

export const pageQuery = graphql`
  query IndexPage {
    posts: allFile(filter: { extension: { regex: "/(md|mdx)/" } }) {
      edges {
        node {
          childMdx {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
          childMarkdownRemark {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  }
`
