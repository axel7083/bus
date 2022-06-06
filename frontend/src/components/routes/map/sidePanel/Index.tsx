import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useAppSelector, useAppDispatch} from "../../../../store/hooks";
import {selectDisplay, toggleLayerVisibility} from "../../../../store/features/display/displaySlice";
import ILayer from "../../../../utils/interface/ILayer";
import { v4 as uuidv4 } from 'uuid';

const createLayer = () => {
    return {polylines: [], id: uuidv4(), name: "", displayed: true, markers:[]};
}

// This component display the lines and allow them to be hiden or not
const Index = ({onEditLine} : {onEditLine:(layer: ILayer) => void}) => {

    const display = useAppSelector(selectDisplay);
    const dispatch = useAppDispatch();

    return <>
        <Stack gap={3}>
            {
                display.layers.map((layer: ILayer, i: number) => {
                    return (
                        <Row key={i}>
                            <Col >{layer.name}</Col>
                            <Col>
                                <Button className={'m-2'} variant="primary" onClick={() => dispatch(toggleLayerVisibility(i))}>Show/Hide</Button>
                            </Col>
                            <Col>
                                <Button className={'m-2'} variant="secondary" onClick={() => onEditLine(layer)}>Edit</Button>
                            </Col>
                        </Row>
                    )
                })
            }
        </Stack>
        <Button variant="primary" onClick={() => { onEditLine(createLayer()); }}>
            Create new Line
        </Button>
    </>
}

export default Index;