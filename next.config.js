const emoji = require('remark-emoji'); 
const images = require('remark-images')
// const codeExtra = require('remark-code-extra'); 
const highlight = require("remark-highlight.js");


const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      // images, 
      emoji, 
      //  codeExtra
      highlight
    ] 
  }
})

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'mdx'],
})
