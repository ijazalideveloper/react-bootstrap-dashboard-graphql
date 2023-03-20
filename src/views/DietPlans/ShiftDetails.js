import React, { useState, useEffect } from "react";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Modal,
  Form,
} from "react-bootstrap";
import services from "services";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useToast } from "components/Toast";
import Loader from "components/Loader";
import Shift from "./SingleShift";

function ShiftDetails(props) {
  const { recipes, day, setDays } = props;
  const [shifts, setShifts] = useState(day.shifts);

  const toast = useToast();

  const spliceShift = (id) => {
    if (shifts.length == 1) {
      toast.add("tr", "danger", "At Least 1 shift is required");
      return;
    } else {
      let splicedArray = shifts.filter((sf) => {
        return sf.id != id;
      });
      day.shifts = splicedArray;
      setShifts(splicedArray);

      toast.add("tr", "primary", "Shift Deleted");
    }
  };

  const addShift = (shift) => {
    let index = shifts.indexOf(shift);

    let newShifts = shifts.map((sf, i) => {
      if (i === index) {
        sf = shift;
      }

      return sf;
    });
    day["shifts"] = newShifts;
    console.log(day);
    setShifts(newShifts);
    toast.add("tr", "primary", "Shift Updated");
  };
  return (
    <div className="diet-plan-shifts mt-2 ">
      <h5>Add Recipe Details in Each Shift </h5>
      {shifts.length &&
        shifts?.map((shift, key) => (
          <Shift
            shift={shift}
            addShift={addShift}
            recipes={recipes}
            spliceShift={spliceShift}
          />
        ))}
    </div>
  );
}

export default ShiftDetails;
