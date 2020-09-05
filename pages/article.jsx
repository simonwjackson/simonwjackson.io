import Grid from '@material-ui/core/Grid'; 
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import {
  makeStyles,
  useTheme 
} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import MailIcon from '@material-ui/icons/Mail'
import MenuIcon from '@material-ui/icons/Menu'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import React, { useEffect, useState, useRef } from 'react'
import Scrollspy from 'react-scrollspy'
import ListSubheader from '@material-ui/core/ListSubheader';

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  overrides: {
    ListItem: {
      dense: {
        paddingTop: 0,
        paddingBottom: 0,
      },
    },
  },
  root: { display: 'flex' },
  // drawer: {
  //   [theme.breakpoints.up('sm')]: {
  //     width: drawerWidth,
  //     flexShrink: 0,
  //   },
  // },
  scrollSpyContent: {
    top: theme.spacing(2.25),
    left: '80ch',
    position: 'absolute',
    paddingLeft: theme.spacing(12),
    '& > ul': {
      padding: 0,
      position: 'fixed',
    },
    // position: 'fixed',
    // height: 'fit-content',
    // top: theme.spacing(4.25),
    // right: 0,
    // paddingRight: theme.spacing(6),
    [theme.breakpoints.down(1024)]: { 
      display: 'none'
    }
  },
  articleContainer: {
    maxWidth: '80ch',
    margin: 'auto',
    position: 'relative',
  },
  article: {
    '& > h1, & > p': {
      marginBottom: theme.spacing(6)
    },
    '& > h2': {
      marginBottom: theme.spacing(2.5)
    }
  },
  isCurrent: {
    borderLeftWidth: theme.spacing(.5),
    borderLeftStyle: 'solid',
    borderLeftColor: theme.palette.primary.main,
    '& span': {
      color: theme.palette.primary.main,
      fontWeight: 900
    },
  },
  // appBar: {
  //   [theme.breakpo ints.up('sm')]: {
  //     width: `calc(100% - ${drawerWidth}px)`,
  //     marginLeft: drawerWidth,
  //   },
  // },
  menuButton: {
    position: 'fixed',
    height: 'fit-content',
    top: theme.spacing(4.25),
    left: -(theme.spacing(3)),

    [theme.breakpoints.up(720)]: { 
      left: theme.spacing(0),
    },

    // marginRight: theme.spacing(2),
    // marginTop: theme.spacing(1.5),
  },
  drawerPaper: { width: drawerWidth },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))

export const ResponsiveDrawer = props => {
  const { window } = props
  const classes = useStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [sections, setSections] = useState([])
  const articleRef = useRef() 

  useEffect(() => {
    if (articleRef.current) {
      setSections(
      // @ts-ignore
      [...articleRef.current.querySelectorAll("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]")]
        .map(el => ({
            key: el.id,
            title: el.innerText
        }))
      )
    }
  }, [articleRef])


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div>
      <Divider />
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      {/* <Divider />
        <ListSubheader>TOC</ListSubheader>
        <Scrollspy
          items={Object.keys(sections)}
          currentClassName={classes.isCurrent}>
          {sections.map(section => ( 
            <ListItem button key={section.key}>
              <ListItemIcon><InboxIcon /></ListItemIcon>
              <ListItemText primary={section.title} />
            </ListItem>
          ))}
        </Scrollspy>  */}
    </div>
  )
  const container = window !== undefined ? () => window().document.body : undefined

  return (
    <div className={classes.root}>
      <CssBaseline />
      <IconButton
        color="inherit"
        aria-label="open drawer"
        // edge="start"
        onClick={handleDrawerToggle}
        className={classes.menuButton}
      >
        <MenuIcon />
      </IconButton>
      <nav aria-label="sections">
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{ paper: classes.drawerPaper }}
          ModalProps={{ keepMounted: true }}
        >
          {drawer}
        </Drawer>
      </nav>
      <main className={classes.content}> 
        <div className={classes.articleContainer}> 
          <article className={classes.article} ref={articleRef}>
            <Typography variant="h2" component="h1"> Hello </Typography>
            <Typography variant="h5" component="h2" id="section-1"> First off </Typography>
            <Typography paragraph>
              Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
              facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
              tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
              consequatu mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
              vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
              hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
              tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
              nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
              accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
            </Typography> 
            <Typography variant="h5" component="h2" id="section-2"> Goodbye </Typography>

            <Typography paragraph>
              Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
              facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
              tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
              consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
              vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
              hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
              tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
              nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
              accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
            </Typography> 

            <Typography variant="h5" component="h2" id="section-3"> Hi again </Typography>

            <Typography paragraph>
              Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
              facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
              tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
              consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
              vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
              hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
              tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
              nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
              accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
            </Typography> 
          </article> 
          {sections.length && ( 
            <nav className={classes.scrollSpyContent}>
              <Scrollspy 
                componentTag={List}
                className={'MuiList-dense'}
                items={sections.map(({ key }) => key)}
                currentClassName={classes.isCurrent}>
                  {sections.map(section => ( 
                    <ListItem className={'MuiListItem-dense'} key={section.key}>
                      <ListItemText primary={section.title} />
                    </ListItem>
                  ))}
              </Scrollspy>
            </nav> 
          )}
        </div>
      </main>
    </div>
  )
}

export default ResponsiveDrawer