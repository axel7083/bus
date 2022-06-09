import TimePicker from 'react-bootstrap-time-picker';


// Types definition for TimePicker are not available
// Therefore we trick for using it.
const ReactTimePicker = ({value, onChange, previous}) => {
    return (
        <TimePicker style={{backgroundColor: "#e9ecef"}} onChange={onChange} value={value} start={previous} end="23:59" step={5} />
    )
}
export default ReactTimePicker;