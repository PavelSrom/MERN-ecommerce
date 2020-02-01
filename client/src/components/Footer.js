import React from 'react'
import {
  ResponsiveContainer,
  Subheadline,
  LineLength
} from '../utils/Responsive'
import { Typography } from '@material-ui/core'

const Footer = () => (
  <section style={{ background: '#333', textAlign: 'center', color: '#fff' }}>
    <ResponsiveContainer>
      <LineLength>
        <Subheadline white style={{ marginBottom: 32 }}>
          Built with MongoDB, Node.js, Express, React, Redux & Material UI
        </Subheadline>

        <Typography variant="body1">#mernstack</Typography>
        <Typography variant="caption">
          &copy; {new Date().getFullYear()} Pavel Srom
        </Typography>
      </LineLength>
    </ResponsiveContainer>
  </section>
)

export default Footer
