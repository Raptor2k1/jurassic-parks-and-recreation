import React, { useState, useEffect } from 'react';
import Axios from 'axios';




// If no old value passed, defaults the old value to "null". Also adjusts autoFocus and required rendering aspects as needed.
const SelectorTasksAssigned = ({preSelected, isRequired, autoFocus, hostURL, setTaskName}) => {

  // Create useState for the selection and list
  // For update, just update pre-selected image to match an input variable first
  const [selected, setSelected] = useState()
  const [list, setList] = useState([])

  // Selection event handler to pass on selection data to DB
  const selectionHandler = (event) => {
    setSelected(event.target.value)
    setTaskName(event.target.value)
  };
  
  // Update the field to the preset option any time it's null
  useEffect(()=> {
    if (preSelected !== null) {setSelected(preSelected);}}, [preSelected])

  // TasksAssigned SQL Endpoints
  const getListURL = hostURL + '/api/getTasksAssignedList';

  // Populate list
  useEffect(()=> {
    Axios.get(getListURL).then((response)=> {
    setList(response.data)
    console.log(response.data)
    })
  }, []);

  // Autofocus and isRequired elements passed in can tailor it to use on different pages
  return (
    <>
      <div><label htmlFor="tasksAssignedSelector">Tasks</label></div>
      <select id="tasksAssignedSelector" value={selected} onChange={selectionHandler} autoFocus={autoFocus ? true : false} required={isRequired ? true : false}>
        {/* Set default option then map query results to populate the select menu */}
        <option value="">None (Select an existing Assigned Task)</option>
        {list.map((val, index) => {
          return <option key={index} value={val.taskName}>{val.taskName} (Started: {val.taskStart})</option>;
        })}
      </select>
    </>
  );
};


export default SelectorTasksAssigned;