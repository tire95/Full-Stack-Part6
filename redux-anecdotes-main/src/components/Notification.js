
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { clearNotification } from '../reducers/notificationReducer'

const Notification = (props) => {
  const notification = props.notification

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  useEffect(() => {
    const timer = setTimeout(() => props.clearNotification(), (notification.timer * 1000))
    return () => clearTimeout(timer)
  }, [props, notification])



  return (
    <div style={style}>
      {notification.message}
    </div>
  )
}

const mapDispatchToProps = {
  clearNotification
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

const ConnectedNotification = connect(mapStateToProps, mapDispatchToProps)(Notification)
export default ConnectedNotification