import React from 'react';
import Loading from '../Loading';
import {Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {userSelector, loadingSelector} from '../../redux';

function PrivateRoute({children}) {
  const userData = useSelector((store) => {
    return {
      user: userSelector(store),
      isLoading: loadingSelector(store),
    };
  });

  const {user, isLoading} = userData;

  if (isLoading) {
    return <Loading />;
  }
  if (!user) {
    return <Navigate to='/login' />;
  }

  const token = JSON.parse(localStorage.getItem('user'))?.token;

  if (!token) {
    return <Navigate to='/login' />;
  } else {
    return children;
  }
}

export default PrivateRoute;
