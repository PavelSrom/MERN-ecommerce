import React from 'react'
import { useResponsiveDesign } from './hooks'
import { Container, Typography } from '@material-ui/core'

export const ResponsiveContainer = ({ children, style, ...rest }) => {
  const { spacing } = useResponsiveDesign()

  const customStyle = {
    ...style,
    paddingTop: spacing,
    paddingBottom: spacing
  }

  return (
    <Container {...rest} style={customStyle} fixed maxWidth="lg">
      {children}
    </Container>
  )
}

export const LineLength = ({ children, style, ...rest }) => {
  const customStyle = {
    ...style,
    maxWidth: 768,
    marginLeft: 'auto',
    marginRight: 'auto'
  }

  return (
    <div {...rest} style={customStyle}>
      {children}
    </div>
  )
}

export const Headline = ({ children, style, white, ...rest }) => {
  const { headlineSize } = useResponsiveDesign()
  const customStyle = {
    ...style,
    fontSize: headlineSize,
    color: '#333',
    textAlign: 'center'
  }
  if (white) customStyle.color = '#fff'

  return (
    <Typography {...rest} style={customStyle} variant="h1">
      {children}
    </Typography>
  )
}

export const Subheadline = ({
  children,
  style,
  bold,
  white,
  center,
  ...rest
}) => {
  const customStyle = {
    ...style,
    fontWeight: 300,
    color: '#333'
  }
  if (bold) customStyle.fontWeight = 500
  if (center) customStyle.textAlign = 'center'
  if (white) customStyle.color = '#fff'

  return (
    <Typography {...rest} variant="h5" style={customStyle}>
      {children}
    </Typography>
  )
}
