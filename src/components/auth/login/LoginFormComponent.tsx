import React, { PureComponent } from 'react';
import { Form, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import styled from "styled-components";
import firebase from '../../../firebase';

//CSS Starts
const StyledButton = styled(Button)`
  background-color: ${props => props.theme.colorPrimary} !important;
  border-style: none !important;
  box-shadow: ${props => props.theme.shadow};
    &:hover{
      box-shadow: ${props => props.theme.largeShadow};
    }
`;
const ButtonWrapper = styled.div`
  text-align: center;
`;
//CSS Ends

interface LoginFormProps extends FormComponentProps {
}

class LoginFormComponent extends PureComponent<LoginFormProps, any> {
    loginError = (errorMessage: any) => {

        return (
            this.props.form.setFields({
                email: {
                    errors: [new Error(errorMessage)],
                },
                password: {
                    errors: [new Error(errorMessage)],
                },
            })
        )
    };

    handleSubmit = (e: any) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                firebase
                    .auth()
                    .signInWithEmailAndPassword(values.email, values.password)
                    .then(signedInUser => {
                        console.log(signedInUser);
                    })
                    .catch(err => {
                        console.error(err);
                        this.loginError(err.message)
                    });
            }
        });
    };
  render() {
      const {getFieldDecorator} = this.props.form;
    return (
        <Form layout='vertical' onSubmit={this.handleSubmit}>
            <Form.Item
                label="E-mail"
            >
                {getFieldDecorator('email', {
                    rules: [{
                        type: 'email', message: 'The input is not valid E-mail!',
                    }, {
                        required: true, message: 'Please input your E-mail!',
                    }],
                })(
                    <Input/>
                )}
            </Form.Item>
            <Form.Item
                label="Password"
            >
                {getFieldDecorator('password', {
                    rules: [{
                        required: true, message: 'Please input your password!',
                    }],
                })(
                    <Input type="password"/>
                )}
            </Form.Item>
            <Form.Item>
                <ButtonWrapper>
                    <StyledButton type="primary" htmlType="submit">Login</StyledButton>
                </ButtonWrapper>
            </Form.Item>
        </Form>
    );
  }
}

const WrappedLoginFormComponent = Form.create<LoginFormProps>({name: 'register'})(LoginFormComponent);

export default WrappedLoginFormComponent;