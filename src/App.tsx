import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { RootState } from "./store/store";
import ColorPanelComponent from "./components/color_panel/ColorPanelComponent";
import MessagesComponent from "./components/messages/MessagesComponent";
import SidePanelComponent from "./components/side_panel/SidePanelComponent";
import MetaPanelComponent from "./components/meta_panel/MetaPanelComponent";

interface OwnProps {}

const mapStateToProps = (state: RootState) => {
    return {

    };
};

const mapDispatchToProps = {

};

type Props = OwnProps & ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

type State = Readonly<{}>;

class App extends PureComponent<Props, State> {
  readonly state: State = {};

  render() {
    return (
      <div>
          <ColorPanelComponent/>
          <MessagesComponent/>
          <SidePanelComponent/>
          <MetaPanelComponent/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

