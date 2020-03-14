import React, { Component } from 'react';
import SessionsList from '../components/SessionsList';
import ItemModal from '../components/itemModal';
import { Container } from 'reactstrap';
import { Provider } from 'react-redux';
import store from '../store';

export default class ProfView extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className='ProfView'>
          <Container>
            <ItemModal />
            <SessionsList />
          </Container>
        </div>
      </Provider>
    );
  }
}
