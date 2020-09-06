import Link from 'next/link'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import {
  makeStyles,
  useTheme 
} from '@material-ui/core/styles'
import MailIcon from '@material-ui/icons/Mail'
import MenuIcon from '@material-ui/icons/Menu'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import React, { useState } from 'react'

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
  menuButton: {
    position: 'fixed',
    height: 'fit-content',
    top: theme.spacing(4.25),
    left: -(theme.spacing(3)),

    [theme.breakpoints.up(720)]: { 
      left: theme.spacing(0),
    },
  },
  drawerPaper: { width: drawerWidth },
}))

export const ResponsiveDrawer = props => {
  const { window, children, items = [] } = props
  const classes = useStyles()
  const theme = useTheme()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleDrawerToggle = () => 
    setDrawerOpen(!drawerOpen)

  const drawer = (
    <List dense>
      {items
        .map((obj, index) => (
          <Link href={obj.slug}>
            <ListItem button key={obj.slug} onClick={handleDrawerToggle}>
              <ListItemText primary={obj.title} />
            </ListItem>
          </Link>
        ))}
    </List>
  )

  const container = window !== undefined 
    ? () => window().document.body
    : undefined

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
          open={drawerOpen}
          onClose={handleDrawerToggle}
          classes={{ paper: classes.drawerPaper }}
          ModalProps={{ keepMounted: true }}
        >
          {drawer}
        </Drawer>
      </nav>
    </div>
  )
}

export default ResponsiveDrawer