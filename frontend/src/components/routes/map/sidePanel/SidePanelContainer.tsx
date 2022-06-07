import React, {useState} from "react";
import ConfigurationState from "../../../../utils/enums/ConfigurationState";
import {BetterLineEditor} from "./BusLines/BetterLineEditor";
import BusLinesListComponent from "./BusLines/BusLinesListComponent";
import {IBusLine} from "../../../../utils/interface/IBusLine";


// This component simply switch between the editor and the lines display
const SidePanelContainer = () => {
    console.log("SidePanelContainer");

    const [busLine, setBusLine] = useState<IBusLine | undefined>(undefined);
    const [state, setState] = useState<ConfigurationState>(ConfigurationState.DISPLAY);

    const onEditLine = (busLine: IBusLine) => {
        setBusLine(busLine);
        setState(ConfigurationState.EDITING);
    }

    const onSavedLine = () => {
        //
        setBusLine(undefined);
        setState(ConfigurationState.DISPLAY);


    }

    switch (state) {
        case ConfigurationState.DISPLAY:
            return <BusLinesListComponent onEditLine={onEditLine}/>
        case ConfigurationState.EDITING:
            return <BetterLineEditor busLine={busLine!} onSavedLine={onSavedLine}/>
    }
}
export default React.memo(SidePanelContainer);