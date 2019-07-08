import React from "react"
import { graphql } from "gatsby"
import MDXRenderer from "gatsby-plugin-mdx/mdx-renderer"
import { MDXProvider } from "@mdx-js/react"

import Layout from "../components/layout"

const MdxPost = ({
  data: {
    mdx: { body, frontmatter },
  },
}) => (
  <Layout>
    <h1>{frontmatter.title}</h1>
    <MDXProvider>
      <MDXRenderer>{body}</MDXRenderer>
    </MDXProvider>
  </Layout>
)

export default MdxPost

export const pageQuery = graphql`
  query MdxPosts($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
      }
    }
  }
`
