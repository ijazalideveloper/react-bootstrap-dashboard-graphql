import React, { useState, useEffect } from "react";
// react-bootstrap components
import { Card, Table, Container, Row, Col } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { Link } from "react-router-dom";
import services from "services";
import { useToast } from "components/Toast";
import { useDispatch } from "react-redux";
import Loader from "components/Loader";

import './Controlls.css'

function Controlls(){

    let [isLoading, setIsLoading] = useState(true)
    let [danceFitToggle,setDanceFitToggle] = useState(0);
    let [geoIpToggle,setGeoIpToggle] = useState(0);
    let [apiCall, setApiCall] = useState(false)
    const toast = useToast();


    const updateAppConfig = (obj) =>{
        if (apiCall) return
        setApiCall(true)
        services.ControlsService.setAppConfig(obj)
        .then((data)=>{
            setApiCall(false)
            // data.response.data !== danceFitToggle ? setDanceFitToggle(danceFitToggle == 1 ? 0 : 1) :  null.b ;
            setDanceFitToggle(data.response.dancefitIos);
            setGeoIpToggle(data.response.geoipEnabled)
            toast.add("tr", "primary", "Done");
        })
        .catch(()=>{
            setApiCall(false)
            toast.add("tr", "danger", "Error from API side.")
        })
        
    } 

    const fetchAppConfig = () => {
        services.ControlsService.fetchAppConfig()
        .then((data)=>{
            setDanceFitToggle(data.response.dancefitIos);
            setGeoIpToggle(data.response.geoipEnabled)
            setIsLoading(false)
            console.log('state variables', danceFitToggle, geoIpToggle)
        })
        .catch((error)=>{
        })
    }

    useEffect(()=>{
        fetchAppConfig()
    },[])

        let mainComponent = <div>
        <Row>
            <label className="pt-1 ml-5 mr-5" >Dance Fit Content On IOS</label>
            <div className="toggle-container" onClick={()=>updateAppConfig({ dancefitIos: !danceFitToggle })}>
                <div className={`dialog-button ${danceFitToggle == false ? "disabled" : "enabled"}`}>
                { danceFitToggle ? "Shown" : "Hidden"}
                </div>
            </div>
        </Row>
        <Row>
            <label className="pt-1 ml-5 mr-5" >Geoip Toggle</label>
            <div className="toggle-container" onClick={()=>updateAppConfig({ geoipEnabled: !geoIpToggle })}>
                <div className={`dialog-button ${geoIpToggle == false ? "disabled" : "enabled"}`}>
                { geoIpToggle ? "Shown" : "Hidden"}
                </div>
            </div>
        </Row>

    </div>;


    return isLoading == true ? ("Please wait") :  mainComponent

    
}
export default Controlls;