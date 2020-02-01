import React from 'react'
import { Backdrop, CircularProgress } from '@material-ui/core'

const Spinner = () => (
  <Backdrop open={true}>
    <CircularProgress color="inherit" />
  </Backdrop>
)

export default Spinner