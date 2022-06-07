import {Form} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {useAppDispatch, useAppSelector} from "../../../../../store/hooks";
import {selectBusLineById, update} from "../../../../../store/features/busLines/busLinesSlice";
import {IBusLine} from "../../../../../utils/interface/IBusLine";

const BusLineFormComponent = ({id}: {id: string}) => {

    // The current busLine we are editing
    const busLine: IBusLine = useAppSelector((state) => selectBusLineById(state, id))!;
    const dispatch = useAppDispatch();

    return (
        <>
            <Row>
                <Col>
                    <h4>Bus line properties</h4>
                </Col>
            </Row>
            <Row>
                <Form onSubmit={(e) => {e.preventDefault();}}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Bus line name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" value={busLine.name} onChange={(e) => {
                            dispatch(update({...busLine, name: e.target.value}));
                        }}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Number of conductors</Form.Label>
                        <Form.Control type="number" placeholder="Enter number" value={busLine.conductorCount} onChange={(e) => {
                            dispatch(update({...busLine, conductorCount: Number(e.target.value)}));
                        }}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Number of bus for this line</Form.Label>
                        <Form.Control type="number" placeholder="Enter number" value={busLine.busCount} onChange={(e) => {
                            dispatch(update({...busLine, busCount: Number(e.target.value)}));
                        }}/>
                    </Form.Group>

                    <Form.Label htmlFor="exampleColorInput">Bus Line color</Form.Label>
                    <Form.Control
                        type="color"
                        value={busLine.color}
                        onChange={(e) => {
                            dispatch(update({
                                ...busLine,
                                color: e.target.value,
                            }));
                        }}
                        title="Choose your color"
                    />
                </Form>
            </Row>
        </>

    )
}

export default BusLineFormComponent;