import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade'
import { makeStyles, Button } from '@material-ui/core'
import {
  LineLength,
  Headline,
  Subheadline,
  ResponsiveContainer
} from '../utils/Responsive'

import landing from '../utils/landing.jpg'
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows'
import LaptopWindowsIcon from '@material-ui/icons/LaptopWindows'
import SmartphoneIcon from '@material-ui/icons/Smartphone'

const useStyles = makeStyles(theme => ({
  landing: {
    width: '100%',
    height: 'calc(100vh - 60px)',
    overflow: 'hidden',
    backgroundSize: 'cover',
    backgroundPosition: 'top',
    overflow: 'hidden',
    position: 'relative',
    textAlign: 'center',
    color: '#fff'
  },
  banner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  textWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  teaser: {
    background: '#f8f8f8',
    textAlign: 'center'
  },
  icon: {
    width: 100,
    height: 100,
    color: theme.palette.primary.main,
    marginTop: 56
  }
}))

const Homepage = () => {
  const classes = useStyles()

  return (
    <Fragment>
      <Fade>
        <section
          className={classes.landing}
          style={{ backgroundImage: `url(${landing})` }}
        >
          <div className={classes.banner}>
            <ResponsiveContainer>
              <LineLength className={classes.textWrapper}>
                <Headline white gutterBottom>
                  Your e-shop of choice
                </Headline>
                <Subheadline white>
                  Everything you need in one place
                </Subheadline>
              </LineLength>
            </ResponsiveContainer>
          </div>
        </section>
      </Fade>

      <section className={classes.teaser}>
        <ResponsiveContainer>
          <Headline>What you can find here</Headline>

          <Fade delay={200}>
            <SmartphoneIcon className={classes.icon} />
            <Subheadline bold>Smartphones</Subheadline>
          </Fade>

          <Fade delay={200}>
            <DesktopWindowsIcon className={classes.icon} />
            <Subheadline bold>Desktops</Subheadline>
          </Fade>

          <Fade delay={200}>
            <LaptopWindowsIcon className={classes.icon} />
            <Subheadline bold>Laptops</Subheadline>
          </Fade>

          <Button
            style={{ marginTop: 80 }}
            component={Link}
            to="/products"
            color="primary"
            variant="contained"
          >
            Show now
          </Button>
        </ResponsiveContainer>
      </section>
    </Fragment>
  )
}

export default Homepage
