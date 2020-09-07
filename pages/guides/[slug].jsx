import fs from 'fs'
import React from 'react'
import path from 'path'
import Article from '../../components/Article'



const Slug = ({ filename, slug }) => {
    const { 
        default: Content, 
        meta 
    } = require(`../../${filename}`)

    return (
        <Article meta={meta}> 
            <Content />
        </Article>
    )  
}

// Specify dynamic routes to pre-render based on data.
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

// Fetch data at build time
export async function getStaticProps({ params }) {
    const filename = path.join("guides", params.slug, "index.mdx")

    return {
        props: {
            filename,
            slug: params.slug,
        },
    }
} 

export default Slug 
