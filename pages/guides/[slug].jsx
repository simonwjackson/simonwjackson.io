import fs from 'fs'
import React from 'react'
import path from 'path'
import dynamic from 'next/dynamic'

const Article = ({ filename, ...props}) => {
  const { 
      default: Content, 
      meta 
  } = require('../../' + filename)

  return (<>
    <h1>BOO!</h1>
    <Content />
  </>)  
}

export async function getStaticProps({ params }) {
    const filename = path.join("guides", params.slug, "index.mdx")

    return {
        props: {
            filename
        },
    }
}

export async function getStaticPaths() {
    const postsDirectory = path.join(process.cwd(), 'guides')
    const mdxFiles = fs.readdirSync(postsDirectory)

    // Loop through all post files and create array of slugs (to create links)
    const paths = mdxFiles.map(filename => ({
        params: {
            slug: filename.replace(".mdx", "")
        }
    }));

    return {
        paths,
        fallback: false
    }
}

export default Article
