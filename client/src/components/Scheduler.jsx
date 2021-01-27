import React , { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import "./Scheduler.css"
import TimeRangeSlider from 'react-time-range-slider';
import './Time.css'



const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft:"20%",
    marginRight: "20%",
    width: 200,
  },
});

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;
  const [date, setDate] = useState('tomorrow')
  const [startTime, setStartTime] = useState('07:00')
  const [endTime, setEndTime] = useState('18:59');
  const [timeRange, setTimeRange] = useState({
    start:'07:00',
    end: '18:59'
  })

  useEffect (() => {
    setStartTime(timeRange.start)
    setEndTime(timeRange.end)
  })

  const changeStartHandler = (time) => {
    console.log('start handler called', time)
  }
  
  const timeChangeHandler = (time) => {
    setTimeRange(time)
  }
  
  const changeCompleteHandler = (time) => {
    console.log('complete handler called', time)
    setStartTime(time.start)
    setEndTime(time.end)
  }

  const handleClose = () => {
    onClose(selectedValue);
    console.log('select' , selectedValue)
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Date of delivery</DialogTitle>
      <List>
          <form className={classes.container} noValidate>
          <TextField
            id="date"
            label="Date"
            type="date"
            defaultValue="2021-01-29"
            minDate = "2021-01-29"
            minDateMessage="Date should not be before today"
            disablePast
            onChange={setDate}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </form>
        <div>
          <div className="time-range" style={{fontSize:"20px"}}><strong>Time of delivery</strong> 
            <div className="time-range-start" >
            <span><strong>From:</strong>{timeRange.start}</span>
            <span><strong>to:</strong>{timeRange.end}</span>
            </div>
          </div>
        <div class="plan-time-slider-add">
          <TimeRangeSlider
          disabled={false}
          format={24}
          maxValue={"18:59"}
          minValue={"07:00"}
          name={"time_range"}
          onChangeStart={time => changeStartHandler(time)}
          onChangeComplete={time => changeCompleteHandler(time)}
          onChange={time => timeChangeHandler(time)}
          step={15}
          value={timeRange}/>
        </div>
  </div>
      </List>
      <button onClick={handleClose} className="simple-button" type='submit'>Submit</button>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo(date) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = useState('')

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      {/* <div className="text-select" style={{letterSpacing:"normal"}}variant="subtitle1">Day Selected: {selectedValue}</div>
      <div className="text-select" style={{letterSpacing:"normal"}}variant="subtitle1">Time Selected: </div>  */}
      <br />
      <button style={{marginLeft:"30%"}}className="submit-button delivery-button" variant="outlined" color="primary" onClick={handleClickOpen}>
        Choose your time delivery
      </button>
      <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
    </div>
  );
}
