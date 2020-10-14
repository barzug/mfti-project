import React from "react";
import {connect} from "react-redux";
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'

function PrivateRoute({user, loading, ...rest}) {
  if (loading) {
    return <h1>LOADING...</h1>
  }

  if (!user) {
    return <Redirect
      to={{
        pathname: '/signup',
      }}
    />
  }

  return (
    <Route
      {...rest}
    />
  )
}

function mapStateToProps(state) {
  const { userReducer } = state;

  return {
    user: userReducer.user,
    loading: userReducer.isFetching,
  }
}

export default connect(mapStateToProps)(PrivateRoute);
