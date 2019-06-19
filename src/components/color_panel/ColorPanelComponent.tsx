
import React, { PureComponent } from 'react';

interface OwnProps {}

type Props = OwnProps;

class ColorPanelComponent extends PureComponent<Props> {
  render() {
    return (
      <div>
        Color panel component
      </div>
    );
  }
}

export default ColorPanelComponent;
