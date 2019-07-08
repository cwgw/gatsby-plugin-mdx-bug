module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // // uncomment this and the desired behavior returns
        // plugins: [ `gatsby-remark-images` ],
      }
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        gatsbyRemarkPlugins: [ `gatsby-remark-images` ],
      }
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
  ],
}