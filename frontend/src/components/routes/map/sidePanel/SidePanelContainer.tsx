import React, {useState} from "react";
import ConfigurationState from "../../../../utils/enums/ConfigurationState";
import Index from "./Index";
import LineEditor from "./LineEditor";
import ILayer from "../../../../utils/interface/ILayer";
import {BetterLineEditor} from "./BetterLineEditor";


// This component simply switch between the editor and the lines display
const SidePanelContainer = () => {
    console.log("SidePanelContainer");

    const [state, setState] = useState<ConfigurationState>(ConfigurationState.DISPLAY);
    const [editLayer, setEditLayer] = useState<ILayer | undefined>(undefined);


    const onEditLine = (layer: ILayer) => {
        setEditLayer(layer);
        setState(ConfigurationState.EDITING);
    }

    const onSaveLine = (layer: ILayer) => {

        //

        setState(ConfigurationState.DISPLAY);
    }

    switch (state) {
        case ConfigurationState.DISPLAY:
            return <Index onEditLine={onEditLine}/>
        case ConfigurationState.EDITING:
            return <BetterLineEditor layer={editLayer!} onSaveLine={onSaveLine}/>
    }
}
export default React.memo(SidePanelContainer);