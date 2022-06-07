import TimePicker from 'react-bootstrap-time-picker';


// Types definition for TimePicker are not available
// Therefore we trick for using it.
const ReactTimePicker = ({value, onChange}) => {
    return (
        <TimePicker style={{backgroundColor: "#e9ecef"}} onChange={onChange} value={value} start="06:00" end="23:59" step={15} />
    )
}
export default ReactTimePicker;