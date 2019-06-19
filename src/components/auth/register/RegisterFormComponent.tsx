import React, {PureComponent} from 'react';
import firebase from '../../../firebase';
import {Form, Input, Tooltip, Icon, Button} from 'antd/lib/index';
import {FormComponentProps} from 'antd/lib/form';
import styled from "styled-components";
import md5 from "md5";

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

interface RegisterFormProps extends FormComponentProps {
}

type State = Readonly<{
    confirmDirty: boolean,
    autoCompleteResult: any,
    usersRef: any
}>;

class RegisterFormComponent extends PureComponent<RegisterFormProps, State> {
    readonly state: State = {
        confirmDirty: false,
        autoCompleteResult: [],
        usersRef: firebase.database().ref('users')
    };

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
    saveUser = (createdUser: any) => {
        return this.state.usersRef.child(createdUser.user.uid).set({
            name: createdUser.user.displayName,
            avatar: createdUser.user.photoURL
        });
    };
    handleSubmit = (e: any) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(values.email, values.password)
                    .then((createdUser: any) => {
                        console.log(createdUser);
                        createdUser.user.updateProfile({
                            displayName: values.nickname,
                            photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
                        })
                            .then(() => {
                                this.saveUser(createdUser);
                                console.log("user saved");
                            })
                    })
                    .catch(err => {
                        console.error(err);
                        this.loginError(err.message)
                    });
            }
        });
    };
    handleConfirmBlur = (e: any) => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    };
    compareToFirstPassword = (rule: any, value: any, callback: any) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };
    validateToNextPassword = (rule: any, value: any, callback: any) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    };

    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <Form layout='vertical' onSubmit={this.handleSubmit}>
                <Form.Item
                    label={(
                        <span>
              Nickname&nbsp;
                            <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
                    )}
                >
                    {getFieldDecorator('nickname', {
                        rules: [{required: true, message: 'Please input your nickname!', whitespace: true}],
                    })(
                        <Input/>
                    )}
                </Form.Item>
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
                        }, {
                            validator: this.validateToNextPassword,
                        }],
                    })(
                        <Input type="password"/>
                    )}
                </Form.Item>
                <Form.Item
                    label="Confirm Password"
                >
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: 'Please confirm your password!',
                        }, {
                            validator: this.compareToFirstPassword,
                        }],
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur}/>
                    )}
                </Form.Item>
                <Form.Item>
                    <ButtonWrapper>
                        <StyledButton type="primary" htmlType="submit">Register</StyledButton>
                    </ButtonWrapper>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedRegisterFormComponent = Form.create<RegisterFormProps>({name: 'register'})(RegisterFormComponent);

export default WrappedRegisterFormComponent;
