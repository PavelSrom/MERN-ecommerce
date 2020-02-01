import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { autoSignupUser } from './store/actions/auth'
import { LastLocationProvider } from 'react-router-last-location'
import ScrollToTop from 'react-router-scroll-top'
import PrivateRoute from './hoc/PrivateRoute'

import Header from './components/Header'
import Footer from './components/Footer'
import AlertBox from './components/Alert'

import Homepage from './pages/Homepage'
import Register from './pages/Register'
import Login from './pages/Login'
import Products from './pages/Products'
import Product from './pages/Product'
import Reviews from './pages/Reviews'
import Logout from './pages/Logout'
import MyProfile from './pages/MyProfile'
import UpdateProfile from './pages/UpdateProfile'
import Favorites from './pages/Favorites'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'

const App = ({ autoSignupUser }) => {
  useEffect(() => {
    if (localStorage.token) autoSignupUser()
  }, [])

  return (
    <Router>
      <LastLocationProvider>
        <ScrollToTop>
          <Header />
          <AlertBox />
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/products" component={Products} />
            <Route exact path="/products/:id" component={Product} />
            <Route exact path="/products/:id/reviews" component={Reviews} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/me/cart" component={Cart} />
            <Route exact path="/checkout" component={Checkout} />
            <PrivateRoute exact path="/me" component={MyProfile} />
            <PrivateRoute exact path="/me/update" component={UpdateProfile} />
            <PrivateRoute exact path="/me/favs" component={Favorites} />
          </Switch>
          <Footer />
        </ScrollToTop>
      </LastLocationProvider>
    </Router>
  )
}

export default connect(null, { autoSignupUser })(App)
