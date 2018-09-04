import React from 'react';
import axios from 'axios';

export default (props) => {
  let request = axios.get('/api/logout')
                      .then(response => {
                        setTimeout(() => {
                          props.history.push('/');
                        }, 2000)
                      })
  return (
    <div className="logout_container">
      <h1>Sorry to see you go :(</h1>
    </div>
  )
}
