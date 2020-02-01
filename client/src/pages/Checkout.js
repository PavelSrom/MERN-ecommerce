import React, { useState } from 'react'
import { makeStyles, Paper } from '@material-ui/core'
import { ResponsiveContainer, Subheadline } from '../utils/Responsive'
import { useResponsiveDesign } from '../utils/hooks'
import DeliveryPayment from '../components/Checkout/DeliveryPayment'
import DeliveryInfo from '../components/Checkout/DeliveryInfo'
import Summary from '../components/Checkout/Summary'

const useStyles = makeStyles(theme => ({
  section: {
    background: '#f8f8f8',
    minHeight: '100vh'
  }
}))

const Checkout = () => {
  const [currStep, setCurrStep] = useState(0)
  const [steps] = useState([
    {
      label: 'Delivery and payment',
      name: 'delpay',
      component: <DeliveryPayment inc={setCurrStep} />
    },
    {
      label: 'Delivery information',
      name: 'info',
      component: <DeliveryInfo inc={setCurrStep} />
    },
    {
      label: 'Summary',
      name: 'summary',
      component: <Summary inc={setCurrStep} />
    }
  ])

  const { width } = useResponsiveDesign()
  const stepperStyle = {
    padding: 8,
    marginBottom: 32,
    display: 'flex',
    flexDirection: width >= 960 ? 'row' : 'column',
    justifyContent: width >= 960 ? 'space-between' : 'flex-start',
    alignItems: width >= 960 ? 'flex-start' : 'center'
  }

  const classes = useStyles()

  return (
    <section className={classes.section}>
      <ResponsiveContainer style={{ marginTop: -20 }}>
        <Paper style={stepperStyle}>
          {steps.map(({ label }, index) => {
            return index === currStep ? (
              <Subheadline bold key={index}>
                {index + 1} - {label}
              </Subheadline>
            ) : (
              <Subheadline key={index}>
                {index + 1} - {label}
              </Subheadline>
            )
          })}
        </Paper>
        {steps[currStep].component}
      </ResponsiveContainer>
    </section>
  )
}

export default Checkout
