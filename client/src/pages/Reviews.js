import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
  getCurrentProduct,
  clearCurrentProduct,
  postNewReview
} from '../store/actions/products'
import Spinner from '../components/Spinner'
import { ResponsiveContainer, LineLength } from '../utils/Responsive'
import { Rating } from '@material-ui/lab'
import {
  TextField,
  Typography,
  makeStyles,
  Paper,
  Divider,
  Button
} from '@material-ui/core'
import { Headline, Subheadline } from '../utils/Responsive'

const useStyles = makeStyles(theme => ({
  newReview: {
    maxWidth: 640,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  centered: {
    textAlign: 'center'
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  rating: {
    alignSelf: 'flex-start',
    margin: '16px 0'
  },
  paper: {
    padding: theme.spacing(4),
    marginTop: theme.spacing(4),
    background: '#f8f8f8'
  },
  divider: {
    margin: `${theme.spacing(6)}px 0`
  }
}))

const Reviews = ({
  match,
  user,
  isAuthenticated,
  currentProduct,
  getCurrentProduct,
  clearCurrentProduct,
  postNewReview
}) => {
  const [newReviewData, setNewReviewData] = useState({
    rating: null,
    reviewText: ''
  })

  useEffect(() => {
    const timeout = setTimeout(() => {
      getCurrentProduct(match.params.id)
    }, 200)

    return () => {
      clearCurrentProduct()
      clearTimeout(timeout)
    }
  }, [])

  const handleChange = e =>
    setNewReviewData({ ...newReviewData, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    const formData = { ...newReviewData, rating: Number(newReviewData.rating) }
    postNewReview(formData, match.params.id)
  }

  const classes = useStyles()

  return currentProduct === null ? (
    <div style={{ minHeight: 'calc(100vh - 60px)' }}>
      <Spinner />
    </div>
  ) : (
    <section style={{ minHeight: 'calc(100vh - 60px)' }}>
      <ResponsiveContainer>
        <Headline style={{ textAlign: 'center' }}>Post a new review</Headline>
        {!isAuthenticated ? (
          <Typography variant="body1" style={{ textAlign: 'center' }}>
            Only registered users can post reviews
          </Typography>
        ) : currentProduct.reviews.some(rev => rev.user === user._id) ? (
          <Typography variant="body1" style={{ textAlign: 'center' }}>
            You have already posted a review for this product
          </Typography>
        ) : (
          <form onSubmit={handleSubmit} className={classes.newReview}>
            <Rating
              className={classes.rating}
              name="rating"
              value={Number(newReviewData.rating)}
              onChange={handleChange}
            />
            <TextField
              name="reviewText"
              multiline
              fullWidth
              rows="6"
              variant="outlined"
              label="Text"
              value={newReviewData.reviewText}
              onChange={handleChange}
            />

            <Button
              disabled={Object.keys(newReviewData).some(
                data => !newReviewData[data]
              )}
              style={{ marginTop: 40 }}
              type="submit"
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </form>
        )}

        <Divider className={classes.divider} />

        <LineLength>
          <Headline className={classes.centered}>All reviews</Headline>
          {currentProduct.reviews.length > 0 ? (
            currentProduct.reviews.map(rev => (
              <Paper key={rev._id} className={classes.paper}>
                <div className={classes.flex}>
                  <Subheadline bold>
                    {rev.firstName} {rev.lastName}
                  </Subheadline>
                  <Rating value={rev.rating} readOnly />
                </div>
                <Typography variant="body1">{rev.reviewText}</Typography>
              </Paper>
            ))
          ) : (
            <Typography variant="body1" className={classes.centered}>
              No reviews have been posted yet
            </Typography>
          )}
        </LineLength>
      </ResponsiveContainer>
    </section>
  )
}

const mapStateToProps = state => ({
  currentProduct: state.products.currentProduct,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
})

export default connect(mapStateToProps, {
  getCurrentProduct,
  clearCurrentProduct,
  postNewReview
})(Reviews)
