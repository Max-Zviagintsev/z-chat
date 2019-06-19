import React, {FunctionComponent} from 'react';
import ColorPanelComponent from "../color_panel/ColorPanelComponent";
import MessagesComponent from "../messages/MessagesComponent";
import SidePanelComponent from "../side_panel/SidePanelComponent";
import MetaPanelComponent from "../meta_panel/MetaPanelComponent";

interface OwnProps {
}

type Props = OwnProps;

const HomeComponent: FunctionComponent<Props> = (props) => {
    return <div>
        <ColorPanelComponent/>
        <MessagesComponent/>
        <SidePanelComponent/>
        <MetaPanelComponent/>
    </div>;
};

export default HomeComponent;
