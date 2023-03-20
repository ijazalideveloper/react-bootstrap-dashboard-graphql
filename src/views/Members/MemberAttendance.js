import React, { useState, useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import services from "services";
import DateTimePicker from 'react-datetime-picker';
import { useToast } from "components/Toast";

function MemberAttendance(props) {

    const toast = useToast();
    let searchControl = useRef()
    let { memberId } = useParams()
    let [ isSaving, setIsSaving ] = useState(false)
    let [ isSearching, setIsSearching ] = useState(false)
    let [ classType, setClassType ] = useState("live")
    let [ classSlots, setClassSlots] = useState([])
    let [ selectedClass, setSelectedClass] = useState(null)
    const [vodDateTime, setvodDateTime] = useState(new Date());

    // let onSearchKeyPress = (e) => {
    //     console.log(searchControl.current)
    // }

    // useEffect(() => {        
    // },[])
    let typeSelect = (e) => {
        console.log('radio button clicked')
        let type = (document.querySelector('input[name="type"]:checked').value)
        setClassType(type)
        console.log('radio button value',type)
    }


    let cardStyle = {
        border: '1px solid gray',
        borderRadius: '10px',
        padding: '50px',
        marginTop: '10px',
        boxShadow: '3px 3px 5px 3px #ccc',
    };
    let selectBtnStyle = {
        marginLeft: '10px'
    }

    let classCardLive = (classObject, key) => {
        console.log('live class object')
        return (
            <div key={key} style={cardStyle}>
                <h4>{classObject.name}<br></br>{new Date(classObject.start_date).toString()}</h4>
                {/* Start time: {}<br></br> */}
                Duration: {classObject.duration} minutes
                <Button style={selectBtnStyle} onClick={(e) => {
                    setSelectedClass(classObject)
                }}>Select</Button>
            </div>
        )
    }

    let classCardVOD = (classObject, key) => {
        console.log('vod class object')
        return (
            <div style={cardStyle}>
                <h3>{classObject.name}</h3>
                {/* Start time: {classObject.start_date}<br></br> */}
                Duration: {classObject.duration} minutes
                <Button style={selectBtnStyle} onClick={(e) => {
                    setSelectedClass(classObject)
                }}>Select</Button>
            </div>
        )
    }

    let populateClassList = () => {
        let slots = []
        // let slots = [<option key = {0} value = {0}>{"Select once this has something"}</option>];
        // slots.push()
        let componentFunction;
        let key;
        if (classSlots.length > 0 && classSlots[0].class_type_id == 1) {
            componentFunction = classCardLive;
            console.log('live class function', componentFunction)
            key = 'id'
        } else {
            componentFunction = classCardVOD;
            console.log('vod class function', componentFunction) 
            key = 'id'
        }
        for (let i = 0 ; i < classSlots.length; i++) {
            slots.push( componentFunction(classSlots[i], i+1)  )
            
        }
        // console.log(slots)
        // throw 123
        return slots;
    }

    const searchCallback = async (e) => {
        e.preventDefault()
        if (!isSearching) {
            try {
                setIsSearching(true);
                // setClassSlots([])
                // setSelectedClass(null)
                let search = searchControl.current.value;
                let response = await services.ClassService
                    .filterClassAndClassSlots(
                        {
                            search,
                            psize: 20,
                            pnumber: 1,
                            slots: 10,
                            type: classType
                        }
                    );
                console.log('response in component',response)
                setIsSearching(false)
                setClassSlots(response)

            } catch (err) {
                toast.add("tr", "danger", "exception occured");
            }
        }
        // console.log('response in component',response);
        
    }

    const selectClass = (key) => {
        console.log(key)
    }

    let classesList = () => {
        if (isSearching) {
            return   <i class="fas fa-circle-notch fa-spin"></i>
        } else {
            return (
            <div>
                { populateClassList() }
            </div>
            )
        }

    };

    let selectedClassComponent = () => {
        if (selectedClass == null) {
            return "no class selected for attendance, search and select"
        }

        let details = selectedClass
        let items=[];
        if (details.class_type_id == 1) {
            
            items =[
                <h3>{details.name}</h3>,
                <h4>Type: LIVE</h4>,
                <h4>Class ID: {details.class_id}</h4>,
                <h4>Slot start time: <h5>{new Date(details.start_date).toString()}</h5></h4>
            ]
            
        } else {
            items =[
                <h3>{details.name}</h3>,
                <h4>Type: VOD</h4>,
                <h4>Class ID: {details.id}</h4>,
                <div> Set viewed at:<br></br>
                <DateTimePicker
                    onChange={setvodDateTime}
                    value={vodDateTime}
                    maxDate={new Date()}
                />
                </div>,
                // <div>{JSON.stringify(details)}</div>
            
            ]
        }
        let text = isSaving ?   <i class="fas fa-circle-notch fa-spin"></i> : 'Mark Attendance'
        items.push(
            <Button onClick={saveAttendance}>{text}</Button>
        )
        return (
            <div style={{
                float: 'right',
                position: 'fixed',
                border: '1px solid gray',
                padding: '20px'
            }}>
                {items}
            </div>
        )

    }

    let saveAttendance = async(e) => {
        e.preventDefault()
        if (!isSaving) {
            setIsSaving(true);
            // setClassSlots([])
            // setSelectedClass(null)
            let viewedAt;
            let classId;
            let classSlotId;
            // let memberId;

            if (selectedClass.class_type_id == 1) {
                viewedAt = selectedClass.start_date;
                classId = selectedClass.class_id
                classSlotId = selectedClass.class_slot_id
            } else {
                viewedAt = vodDateTime;
                classId = selectedClass.id
                classSlotId = null
            }
            memberId = parseInt(memberId);
            let response = await services.MemberService
                .markMemberAttendance(
                    {
                        memberId, 
                        classId, 
                        classSlotId, 
                        viewedAt
                    }
                );
                console.log('response',response)
            let toastMessage = typeof response.data.data === 'string' ? response.data.data : response.data.message
            toast.add("tr", "primary", toastMessage);
            setIsSaving(false)
        }
    }

    return (
    <>  
    <div className="row">
        <div className="col-md-12">
            <div >
                <form>
                <input type="radio" id="liveType"
                name="type" checked={classType == "live"} value="live" onChange={typeSelect}></input>
                LIVE
                <input style={ { 'marginLeft': "15px" } } type="radio" id="vodType"
                name="type" checked={classType == "vod"} value="vod" onChange={typeSelect}></input>
                VOD
                </form>
            </div>
        </div>
        <div className="col-md-12">
            <Form.Control style={{ display: 'inline-block', width: '60%' }} ref={searchControl} type="text" placeholder="search..." />
            <Button
                style={ { display: 'inline-block' } } 
                variant="success" onClick={ searchCallback }>
                Search
            </Button>{' '}
        </div>
        <div className="col-md-8">
            { classesList() }
        </div>
        <div className="col-md-4">
            <div>
            { selectedClassComponent() }
            </div>
        </div>
    </div>
    </>
    )

}

export default MemberAttendance;