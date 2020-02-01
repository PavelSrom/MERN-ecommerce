import React from 'react'
import { Grid } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

const SkeletonSpinner = () => (
  <Grid container spacing={4}>
    {[1, 2, 3, 4, 5, 6].map((_, index) => (
      <Grid item key={index} xs={12} md={6} lg={4}>
        <Skeleton variant="rect" width={'100%'} height={200} />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" />

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Skeleton variant="text" width={100} height={30} />
          <Skeleton variant="circle" width={40} height={40} />
        </div>
      </Grid>
    ))}
  </Grid>
)

export default SkeletonSpinner
