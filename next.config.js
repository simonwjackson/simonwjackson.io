const emoji = require('remark-emoji'); 
// const highlight = require("remark-highlight.js");

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      emoji, 
      // highlight,
    ] 
  }
})

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'mdx'],
})
