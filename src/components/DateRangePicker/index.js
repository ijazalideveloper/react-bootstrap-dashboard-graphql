import React, { useState } from "react";
import moment from "moment";
import { Card, Row } from "react-bootstrap";
import services from "services";
import { useToast } from "components/Toast";
import DateRangePicker from "react-bootstrap-daterangepicker";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const DateTimeRangePicker = (props) => {
  const toast = useToast();
  const animatedComponents = makeAnimated();
  const [slot, setSlot] = useState(props.slot);
  const [isEditing, setIsEditing] = useState(false);
  const [slotSaverButtonText,setslotSaverButtonText] = useState("Save slot");
  const [startDate, setStartDate] = useState(
    !props.newSlot
      ? moment(props.slot.startDate).format("M/DD/YYYY hh:mm:ss A")
      : moment().startOf("hour").toDate()
  );
  const [endDate, setEndDate] = useState(
    !props.newSlot
      ? moment(props.slot.endDate).format("M/DD/YYYY hh:mm:ss A")
      : moment().startOf("hour").add(32, "hour").toDate()
  );
  const [userOptions, setUserOptions] = useState(props.defaultValue);

  const handleDates = async (event, picker) => {
    setIsEditing(true);
    let startDateMomentFormat = moment(picker.startDate).format("YYYY-M-DD HH:mm:ss");
    let endDateMomentFormat = moment(picker.endDate).format("YYYY-M-DD HH:mm:ss");
    
    let stDate = new Date(picker.startDate).toISOString();
    let edDate = new Date(picker.endDate).toISOString();

    let objectSlot = {
      startDate: stDate,
      endDate: edDate,
    };
    await services.ClassService.checkSlot(objectSlot)
      .then((res) => {
        toast.add("tr", "success", "Slot is Available");
        setStartDate(startDateMomentFormat);
        setEndDate(endDateMomentFormat);
        setIsEditing(false);
        setslotSaverButtonText("Save slot");
      })
      .catch((error) => {
        toast.add("tr", "danger", "Slot Unavailable");
        setslotSaverButtonText("Slot Unavailable");
        return;
      });
  };

  const saveSlot = async () => {
    if (!userOptions.length) {
      toast.add("tr", "danger", "Add Slot Users");
      return;
    }
    slot.startDate = startDate;
    slot.users = userOptions;
    slot.endDate = endDate;
    slot.toggle = false;

    props.handleDates(slot, props.newSlot);
  };

  const handleChange = (selectedOption) => {
    setUserOptions(selectedOption);
  };
  return (
    <div className="d-flex mt-2">
      <DateRangePicker
        className=""
        onApply={handleDates}
        initialSettings={{
          parentEl: ".unique-class",
          timePicker: true,
          startDate: startDate,
          endDate: endDate,
          locale: {
            format: "M/DD hh:mm:ss A",
          },
        }}
      >
        <input type="text" className="form-control col-sm-5 " />
      </DateRangePicker>
      <Select
        className="col-sm-5 "
        closeMenuOnSelect={false}
        components={animatedComponents}
        defaultValue={props.defaultValue}
        isMulti
        placeholder="Select Class Trainer"
        onChange={handleChange}
        options={props.options}
      />
      <button
        type="button"
        disabled={isEditing ? true : false}
        className="btn btn-success mr-2 btn-wd btn-fill"
        onClick={!isEditing ? saveSlot : null}
      >
        {slotSaverButtonText}
      </button>
    </div>
  );
};

export default DateTimeRangePicker;
