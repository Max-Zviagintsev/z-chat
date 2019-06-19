import React, { PureComponent } from 'react';
import firebase from '../../../firebase';

interface OwnProps {}

type Props = OwnProps;

type State = Readonly<{
  confirmDirty: boolean,
  autoCompleteResult: any,
  usersRef: any
}>;

class RegisterFormComponent extends PureComponent<Props, State> {
  readonly state: State = {
      confirmDirty: false,
      autoCompleteResult: [],
      usersRef: firebase.database().ref('users')
  };

  render() {
    return (
      <div>
        RegisterFormComponent
      </div>
    );
  }
}

export default RegisterFormComponent;

