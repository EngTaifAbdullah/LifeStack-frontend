import React from 'react'
import { connect } from 'react-redux'

export const App = (props) => {
  return (
    <div>App</div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(App)