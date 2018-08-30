import React from 'react';

import Header from './../components/Header';

export default (props) => {
  return (
    <div>
      <Header />
      <div>
        {props.children}
      </div>
    </div>
  )
}
