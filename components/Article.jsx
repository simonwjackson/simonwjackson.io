import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import {
  makeStyles,
} from '@material-ui/core/styles'
import React, { useEffect, useState, useRef } from 'react'
import Scrollspy from 'react-scrollspy'
import { useRouter } from 'next/router'
import Typography from '@material-ui/core/Typography' 

/**
 * @todo Move common styles into theme
 */
const useStyles = makeStyles(theme => ({
  overrides: {
    ListItem: {
      dense: {
        paddingTop: 0,
        paddingBottom: 0,
      },
    },
  },
  "@global": {
    '.hljs': {
      fontSize: '1rem !important',
      padding: '1rem 1.5rem !important'
    },
  },
  content: {
    flexGrow: 1,
    padding: `${theme.spacing(6)}px ${theme.spacing(3)}px`,
  }, 
  scrollSpyContent: {
    top: theme.spacing(2.25),
    left: '80ch',
    position: 'absolute',
    paddingLeft: theme.spacing(12),
    '& > ul': {
      padding: 0,
      position: 'fixed',
    },
    [theme.breakpoints.down(1024)]: { 
      display: 'none'
    }
  },
  articleContainer: {
    maxWidth: '80ch',
    margin: 'auto',
    position: 'relative',
    minHeight: '100vh',
  },
  article: {
    '& h3, & h4, & h5, & h6': {
      fontWeight: 'bold'
    },
    '& > h3, & > h4, & > h5, & > h6': {
      marginTop: theme.spacing(9)
    },
    '& > p, & > pre': {
      marginTop: theme.spacing(3)
    },
    // '& > h2': {
    //   marginBottom: theme.spacing(2.5)
    // }
  },
  contentLink: {
    borderLeftWidth: theme.spacing(.5),
    borderLeftStyle: 'solid', 
    borderLeftColor: 'rgba(0,0,0,0)',
    '& a': { 
      textDecoration: 'none', 
      color: 'inherit',
    }
  },
  isCurrent: {
    borderLeftColor: theme.palette.primary.main,
    '& span': {
      color: theme.palette.primary.main,
      fontWeight: 900
    },
  },
  heading: {
    paddingBottom: theme.spacing(6),
    display: 'block',
    borderBottom: '1px solid #ccc',
    
    '& h2': {
      marginBottom: theme.spacing(1), 
    },

    '& h3': {
      fontWeight: 'unset'
    }
  }, 
  subtitle: {
    color: 'rgb(116, 129, 141)'
  }
}))

export const Article = props => {
  const { children, meta } = props

  const router = useRouter() 
  const classes = useStyles()
  const [sections, setSections] = useState([])
  const articleRef = useRef() 

  useEffect(() => {
    if (articleRef.current) {
      setSections(
        [...articleRef.current.querySelectorAll("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]")]
          .map(el => ({
            key: el.id,
            title: el.innerText
          }))
      )
    }
  }, [articleRef, children, router])

  return (
    <main className={classes.content}> 
      <div className={classes.articleContainer}> 
        <article
          className={classes.article}
          ref={articleRef}> 
          <heading className={classes.heading}>
            <hgroup> 
              <Typography
                variant="h3"
                component="h2"
              >{meta.title}</Typography>
              <Typography
                variant="h6"
                component="h3"
                className={classes.subtitle}
              >{meta.subtitle}</Typography> 
            </hgroup>
          </heading>
          {children} 
        </article> 
        
        {/*sections.length && ( 
          <nav className={classes.scrollSpyContent}>
            <Scrollspy 
              componentTag={List}
              className={'MuiList-dense'}
              items={sections.map(({ key }) => key)}
              currentClassName={classes.isCurrent}>
                {sections.map(section => ( 
                  <ListItem className={`${classes.contentLink} MuiListItem-dense`} key={section.key}>
                    <a href={'#' + section.key}> 
                      <ListItemText primary={section.title} />
                    </a>
                  </ListItem>
                ))}
            </Scrollspy>
          </nav> 
                )*/}
      </div>
    </main> 
  )
}

export default Article