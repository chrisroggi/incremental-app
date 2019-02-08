import React from 'react';
import Cookies from 'universal-cookie';
import { Button, Modal } from 'antd';
import Count from './Count'

const confirm = Modal.confirm;

class CountQuery extends React.Component {
  state = { count: 0 };

  showConfirm = () => {
    const self = this;
    this.increment()
      .then( count => {
        const nextCount = count;

        confirm( {
          title: 'Increment the count?',
          content: `Current count: ${ this.state.count } | ` +
            `Next count: ${ nextCount }`,
          okText: 'Confirm',
          cancelText: 'Cancel',
          onOk() {
            self.setState( { count: nextCount } );
          }
        } );
      } );
  }

  increment = () => {
    const cookies = new Cookies();
    const apiUrl = process.env.REACT_APP_API_URL;

    return fetch(
      `${ apiUrl }/count/increment?count=${this.state.count}`,
      {
        method: 'GET',
        headers: {
          'Authorization': cookies.get( 'token' )
        }
      }
    )
      .then( response => {
        return response.json()
      } )
      .then( json => {
        if ( json.count ) {
          return json.count;
        }
      } );
  }

  render() {
    return (
      <div>
        <label className="count">Count: </label>
        <Count value={this.state.count} />
        <Button type="primary" onClick={ this.showConfirm }>
          Increment
        </Button>
      </div>
    );
  }
}

export default CountQuery;