import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useLastLocation } from 'react-router-last-location'
import {
  Slider,
  Select,
  MenuItem,
  Button,
  Typography,
  Tooltip,
  makeStyles
} from '@material-ui/core'
import { ResponsiveContainer } from '../utils/Responsive'

const useStyles = makeStyles(theme => ({
  select: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  centered: {
    textAlign: 'center'
  },
  submitBtn: {
    marginTop: theme.spacing(4)
  }
}))

const OptionPanel = ({
  setPage,
  history,
  clearProducts,
  showSpinner,
  location
}) => {
  const [queryParams, setQueryParams] = useState({
    category: '',
    sortBy: 'price', // price or rating
    maxPrice: '30000'
  })

  const currentURL = `${location.pathname}${location.search}`
  const prevLocation = useLastLocation()
  let prevURL
  if (prevLocation)
    prevURL = `${prevLocation.pathname}${prevLocation.search}` || null

  const submitQueryChange = async () => {
    clearProducts()
    showSpinner()
    let queryArr = []

    for (let key in queryParams) {
      if (queryParams[key]) queryArr.push(`${key}=${queryParams[key]}`)
    }

    await setPage(1)
    history.replace('/products?' + queryArr.join('&'))
  }

  const ValueLabelComponent = ({ children, open, value }) => (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  )

  const classes = useStyles()

  return (
    <section style={{ background: '#fff' }}>
      <ResponsiveContainer>
        <div style={{ maxWidth: 480, margin: '0 auto' }}>
          <div className={classes.select}>
            <div className={classes.selectBox}>
              <Typography variant="body1">Category</Typography>
              <Select
                displayEmpty
                value={queryParams.category}
                onChange={e =>
                  setQueryParams({ ...queryParams, category: e.target.value })
                }
              >
                <MenuItem value="" disabled>
                  Select one
                </MenuItem>
                <MenuItem value="smartphone">Smartphone</MenuItem>
                <MenuItem value="desktop">Desktop</MenuItem>
                <MenuItem value="laptop">Laptop</MenuItem>
              </Select>
            </div>

            <div className={classes.selectBox}>
              <Typography variant="body1">Sort by</Typography>
              <Select
                value={queryParams.sortBy}
                onChange={e =>
                  setQueryParams({ ...queryParams, sortBy: e.target.value })
                }
              >
                <MenuItem value="price">Price</MenuItem>
                <MenuItem value="rating">Rating</MenuItem>
              </Select>
            </div>
          </div>

          <div className={classes.centered}>
            <Typography variant="body1">Max price</Typography>
            <Slider
              min={0}
              max={80000}
              step={5000}
              defaultValue={30000}
              onChange={(e, newVal) =>
                setQueryParams({ ...queryParams, maxPrice: newVal })
              }
              marks
              valueLabelDisplay="auto"
              ValueLabelComponent={ValueLabelComponent}
            />

            <Button
              color="primary"
              variant="contained"
              onClick={submitQueryChange}
              className={classes.submitBtn}
            >
              Submit changes
            </Button>
          </div>
        </div>
      </ResponsiveContainer>
    </section>
  )
}

export default withRouter(OptionPanel)
