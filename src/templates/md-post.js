import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

const MdPost = ({
  data: {
    markdownRemark: { html, frontmatter },
  },
}) => (
  <Layout>
    <h1>{frontmatter.title}</h1>
    <div dangerouslySetInnerHTML={{ __html: html }} />
  </Layout>
)

export default MdPost

export const pageQuery = graphql`
  query MarkdownPosts($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
