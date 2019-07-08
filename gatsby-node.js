const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (
    node.internal.type === `MarkdownRemark` ||
    node.internal.type === `Mdx`
  ) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/md-post.js`)
  const mdxPost = path.resolve(`./src/templates/mdx-post.js`)

  return graphql(
    `
      {
        posts: allFile (
          filter: {extension: {regex: "/(md|mdx)/"}}
        ) {
          edges {
            node {
              childMdx {
                fields {
                  slug
                }
              }
              childMarkdownRemark {
                fields {
                  slug
                }
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.posts.edges;

    posts.forEach(({ node }) => {
      const { fields } = node.childMarkdownRemark || node.childMdx
      if (!fields) return;

      createPage({
        path: fields.slug,
        component: node.childMdx ? mdxPost : blogPost,
        context: {
          slug: fields.slug,
        },
      })
    })

    return null
  })
}
