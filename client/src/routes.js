import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import Book from './components/Book';
import Layout from './hoc/Layout';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/books/:id" exact component={Book} />
      </Switch>
    </Layout>
  )
};


export default Routes;
