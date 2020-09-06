import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import {
  makeStyles,
} from '@material-ui/core/styles'
import React, { useEffect, useState, useRef } from 'react'
import Scrollspy from 'react-scrollspy'
import { useRouter } from 'next/router'


const useStyles = makeStyles(theme => ({
  overrides: {
    ListItem: {
      dense: {
        paddingTop: 0,
        paddingBottom: 0,
      },
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
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
    '& > h1, & > p': {
      marginBottom: theme.spacing(6)
    },
    '& > h2': {
      marginBottom: theme.spacing(2.5)
    }
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
}))

export const Article = props => {
  const { children } = props

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