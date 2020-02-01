import React, { useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../store/actions/auth'
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  makeStyles,
  Button,
  Hidden,
  Drawer,
  Avatar,
  Menu,
  MenuItem,
  Typography
} from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import MenuIcon from '@material-ui/icons/Menu'
import ShopIcon from '@material-ui/icons/Shop'

const useStyles = makeStyles(theme => ({
  appBar: {
    height: 60,
    paddingRight: '0 !important'
  },
  icon: {
    cursor: 'pointer'
  },
  avatar: {
    background: theme.palette.secondary.main
  },
  desktopNav: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center'
  },
  mobileNav: {
    marginTop: 40,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  mobileNavIcons: {
    marginTop: 40,
    display: 'flex',
    justifyContent: 'center'
  },
  drawer: {
    width: 200,
    height: '100%',
    background: theme.palette.primary.main
  }
}))

const Header = ({ isAuthenticated, user, guest, logout }) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [navLinks] = useState(['/products', '/register', '/login'])

  const guestLinks = (
    <Fragment>
      {navLinks.map((link, index) => (
        <Button
          style={{ color: '#fff' }}
          key={index}
          component={Link}
          to={link}
          onClick={() => setDrawerOpen(false)}
        >
          {link.slice(1)}
        </Button>
      ))}
    </Fragment>
  )
  const authLinks = navLinks.map((link, index) => (
    <Button
      style={{ color: '#fff' }}
      key={index}
      component={Link}
      to={link}
      onClick={() => setDrawerOpen(false)}
    >
      {link.slice(1)}
    </Button>
  ))[0]

  const handleClose = (e, reason) => {
    if (reason === 'clickaway') return

    setAnchorEl(null)
  }

  const calculateSum = arr =>
    arr.reduce((acc, { quantity }) => acc + quantity, 0)

  const classes = useStyles()

  return (
    <Fragment>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <ShopIcon style={{ fontSize: 50 }} />
              <Typography variant="h6">E-DEVICES</Typography>
            </div>
          </Link>

          <nav className={classes.desktopNav}>
            <Hidden smDown>
              <div style={{ marginRight: 40 }}>
                {isAuthenticated ? authLinks : guestLinks}
              </div>

              {isAuthenticated && (
                <IconButton
                  style={{ color: '#fff' }}
                  component={Link}
                  to="/me/favs"
                  onClick={() => setDrawerOpen(false)}
                >
                  {user !== null && (
                    <Badge
                      color="secondary"
                      badgeContent={user.favorites.length}
                    >
                      <FavoriteIcon />
                    </Badge>
                  )}
                </IconButton>
              )}
              <IconButton
                style={{ color: '#fff' }}
                component={Link}
                to="/me/cart"
                onClick={() => setDrawerOpen(false)}
              >
                {user !== null ? (
                  <Badge
                    color="secondary"
                    badgeContent={calculateSum(user.cart)}
                  >
                    <ShoppingCartIcon />
                  </Badge>
                ) : (
                  <Badge
                    color="secondary"
                    badgeContent={calculateSum(guest.cart)}
                  >
                    <ShoppingCartIcon />
                  </Badge>
                )}
              </IconButton>
            </Hidden>
          </nav>

          <Hidden mdUp>
            <IconButton
              style={{ color: '#fff' }}
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>

          <Drawer
            open={drawerOpen}
            anchor="right"
            onClose={() => setDrawerOpen(false)}
          >
            <nav className={classes.drawer}>
              <div className={classes.mobileNav}>
                {isAuthenticated ? authLinks : guestLinks}
              </div>
              <div className={classes.mobileNavIcons}>
                {isAuthenticated && (
                  <IconButton
                    style={{ color: '#fff' }}
                    component={Link}
                    to="/me/favs"
                    onClick={() => setDrawerOpen(false)}
                  >
                    {user !== null && (
                      <Badge
                        color="secondary"
                        badgeContent={user.favorites.length}
                      >
                        <FavoriteIcon />
                      </Badge>
                    )}
                  </IconButton>
                )}
                <IconButton
                  style={{ color: '#fff' }}
                  component={Link}
                  to="/me/cart"
                  onClick={() => setDrawerOpen(false)}
                >
                  {user !== null ? (
                    <Badge
                      color="secondary"
                      badgeContent={calculateSum(user.cart)}
                    >
                      <ShoppingCartIcon />
                    </Badge>
                  ) : (
                    <Badge
                      color="secondary"
                      badgeContent={calculateSum(guest.cart)}
                    >
                      <ShoppingCartIcon />
                    </Badge>
                  )}
                </IconButton>
              </div>
            </nav>
          </Drawer>

          {user && isAuthenticated && (
            <Fragment>
              <IconButton onClick={e => setAnchorEl(e.currentTarget)}>
                <Avatar className={classes.avatar}>
                  {`${user.firstName[0].toUpperCase()}${user.lastName[0].toUpperCase()}`}
                </Avatar>
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                keepMounted
              >
                <MenuItem
                  component={Link}
                  to="/me"
                  value="me"
                  onClick={handleClose}
                >
                  My profile
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose()
                    logout()
                  }}
                  component={Link}
                  to="/logout"
                  value="logout"
                >
                  Log out
                </MenuItem>
              </Menu>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
      <div className={classes.appBar} />
    </Fragment>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.user.user,
  guest: state.user.guest
})

export default connect(mapStateToProps, { logout })(Header)
