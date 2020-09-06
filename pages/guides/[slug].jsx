import fs from 'fs'
import React from 'react'
import path from 'path'
import Article from '../../components/Article'
import ResponsiveDrawer from '../../components/ResponsiveDrawer'

// TODO: Refactor `importAll` into module
export const importAll = context => {
  return context
    .keys()
    .map(key => [key, context(key)])
}

const getSlug = str => str
  .replace('/index.mdx', '')
  .replace('./', '')

const Slug = ({ filename, slug, ...props}) => {
    const { 
        default: Content, 
        meta 
    } = require('../../' + filename)

    const posts = importAll(
        require.context('../../guides', true, /\.mdx?$/)
    ).map(([file, { meta: { title } }]) => ({
        title,
        slug: getSlug(file)
    }))

  return (
    <>
        <ResponsiveDrawer items={posts} />
        <Article> 
            <Content />
        </Article>
    </>
  )  
}

export async function getStaticProps({ params }) {
    const filename = path.join("guides", params.slug, "index.mdx")
    
    return {
        props: {
            filename,
            slug: params.slug
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

export default Slug 
