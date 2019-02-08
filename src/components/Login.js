import React from 'react';
import Cookies from 'universal-cookie';
import { Form, Icon, Input, Button } from 'antd';

const hasErrors = ( fieldsError ) => {
  return Object
    .keys( fieldsError )
    .some( field => fieldsError[ field ] );
}

class Login extends React.Component {
  componentDidMount() {
    this.props.form.validateFields();
  }

  login = ( { username, password } ) => {
    const cookies = new Cookies();

    fetch(
      `${ process.env.REACT_APP_API_URL }/users/login`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { username, password } )
      }
    )
    .then( response => {
      return response.json()
    } )
    .then( json => {
      if ( json.token ) {
        cookies.set( 'token', json.token, { path: '/' } );
        this.props.onLogin();
      }
    } );
  }

  handleSubmit = ( e ) => {
    e.preventDefault();
    this.login( this.props.form.getFieldsValue() );

  }

  render() {
    const {
      getFieldDecorator, getFieldsError, getFieldError, isFieldTouched
    } = this.props.form;

    const usernameError = isFieldTouched( 'username' ) && getFieldError( 'username' );
    const passwordError = isFieldTouched( 'password' ) && getFieldError( 'password' );

    const usernameField = getFieldDecorator(
      'username',
      { rules: [ { required: true, message: 'Username is required.' } ] }
    )(
      <Input
        prefix={ <Icon type="user" style={ { color: 'rgba(0,0,0,.25)' } } /> }
        placeholder="username"
      />
    );

    const passwordField = getFieldDecorator(
      'password',
      { rules: [ { required: true, message: 'Password is required.' } ] }
    )(
      <Input
        prefix={ <Icon type="lock" style={ { color: 'rgba(0,0,0,.25)' } } /> }
        type="password" placeholder="Password"
      />
    )

    return (
      <Form layout="inline" onSubmit={ this.handleSubmit }>
        <Form.Item
          validateStatus={ usernameError ? 'error' : '' }
          help={ usernameError || '' }
        >
          { usernameField }
        </Form.Item>
        <Form.Item
          validateStatus={ passwordError ? 'error' : '' }
          help={ passwordError || '' }
        >
          { passwordField }
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={ hasErrors( getFieldsError() ) }
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const LoginWrapper = Form.create()( Login )

export default LoginWrapper;