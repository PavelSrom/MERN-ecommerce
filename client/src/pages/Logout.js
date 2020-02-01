import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../store/actions/auth'

const Logout = ({ logout }) => {
  useEffect(() => {
    logout()
  }, [])

  return <Redirect to="/" />
}

export default connect(null, { logout })(Logout)
