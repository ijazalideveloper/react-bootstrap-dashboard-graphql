import React, { useState, useEffect } from "react";
import Pagination from 'react-bootstrap-4-pagination';
import { Card, Row } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useToast } from "components/Toast";
import services from "services";
import Select from "react-select";
import Loader from "components/Loader";
import makeAnimated from "react-select/animated";
import moment, { lang } from "moment";
import { MoengageEventTrack, MoengageEventTrackOnClickEnableOrDisable } from "utils/moengage/moengage";

const AddOrEditMember = (props) => {
  const toast = useToast();
  const animatedComponents = makeAnimated();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(null);
  const [disable, setDisable] = useState(false);
  
  const [plans, setPlans] = useState();
  
  const [activeSubscription, setActiveSubscription] = useState(undefined)
  const [subscriptions, setSubscriptions] = useState(undefined);
  const [availablePlans, setAvailablePlans] = useState([]);
  const [availablePaymentMethods, setAvailablePaymentMethods] = useState([]);
  const [tagsArr, setTagsArr] = useState([]);

  const [paginationConfig, setPaginationConfig] = useState({});
  const [instructors,setInstructors] = useState();
  const [instID,setInstID] = useState();
  const [presentInstructor,setPresentInstructor] = useState({})

  const [planSubscription, setPlanSubscription] = useState({
    plan: 0,
    user:  props?.match?.params?.id,
    payment_method: 0,

    subscription: 0,
    amount: 0,
    response: "",
    reference: "",
    product_id: ""
  });

  const [selectedPlan, setSelectedPlan] = useState();
  const [initialValues, setInitialValues] = useState({
    fullName: "",
    password: "",
    address: "",
    phone: "",
    cnic: "",
    email: "",
    paymentPlan: "",
    type: "",
    isTestUser: 0,
    welcomeUserId: null
  });

  const findInstructorById = (id)=>{
    let instructor = instructors.filter( option => option.value == id)

    setPresentInstructor(instructor[0] ? instructor[0]:{})
    setInstID( instructor[0] ? instructor[0].value : null);
  }
  const handleValidations = (values) => {
    const errors = {};
    if (!values.fullName && !values.deletedAt) {
      errors.fullName = "* This field is required";
    }

    return errors;
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    let obj = values;
    values["welcomeUserId"] = instID? instID:null;
    !isEditing && delete obj.disabled;
    delete obj.type;
    isEditing ? (obj["member"] = values.id) : undefined;
    obj["isPregnant"] = values["isPregnant"]? true : false;
    
    isEditing
      ? services.MemberService.updateMember(obj).then((response) => {
          if (values.deletedAt) {
            toast.add("tr", "primary", "Member Deleted");
          } else {
            toast.add("tr", "primary", "Member Updated");
          }
          goBack();
        })
      : services.MemberService.addMember(obj)
          .then((response) => {
            toast.add("tr", "primary", "Member Created");
            goBack();
          })

          .catch((error) => {
            console.log(error);
            goBack();
            toast.add("tr", "danger", "Something Bad Happened");
          });

    setSubmitting(false);
    setDisable(true);
  };

  const getUserTags = async () => {
    try {
      let data = await services.UserTagsService.getUserTags();
      let tagsArr = [{ value: null, label: 'None' }];
      data?.response?.data?.forEach((element) => {
        tagsArr = [
          ...tagsArr,
          { value: element.id, label: element.name },
        ];
      });
      setTagsArr(tagsArr);
    } catch (err) {
      toast.add(
        "tr",
        "danger",
        err.message || err?.response?.data?.code || "Something went wrong"
      );
    }
  };

  const getAllUsersHook = async () => {
    services.UsersService.getAllUsers()
      .then((res) => {
        let allInstructors = res.response;
        let instructor = allInstructors?.map((item) => {
          let option = {
            value: item.id,
            label: (
              <div>
                {item.name}
              </div>
            ),
          };
          return option;
        });
        setInstructors(instructor);

      })
      .catch((error) => console.log(error));
  };
  const getData = async () => {
    try {
      let id = props?.match?.params?.id;
      if (id) {
        let data = await services.MemberService.getMemberById(id);

        data = data.response;
       // setInstID(data["welcomeUserId"])
       findInstructorById(data.welcomeUserId)
        if (!data) {
          throw Error("Member not Found");
        }
        if (data.paymentPlan) {
          data["paymentPlan"] = {
            value: data.paymentPlan.id,
            label: <div>{data.paymentPlan.name}</div>,
          };
        }
        setInitialValues(data);
      }
      setIsEditing(id);
    } catch (err) {
      console.log("err.response", err.response);

      toast.add(
        "tr",
        "danger",
        err.message || err?.response?.data?.code || "Something went wrong"
      );

      goBack();
    }
    setIsLoading(false);
  };
  // const getAllPlans = async () => {
  //   services.PlanService.getAllPlans()
  //     .then((res) => {
  //       let response = res.response;
  //       let plans = response?.map((item) => {
  //         let option = {
  //           value: item.id,
  //           label: <div>{item.name}</div>,
  //         };
  //         return option;
  //       });
  //       setPlans(plans);
  //     })
  //     .catch((error) => console.log(error));
  // };

  // const selectPlan = () => {
  //   services.PlanService.selectPlan({
  //     planId: selectedPlan.value,
  //     paymentReference: "manual",
  //     memberId: props?.match?.params?.id,
  //   })
  //     .then((response) => {
  //       toast.add("tr", "primary", "Payment Plan Updated");
  //       goBack();
  //     })

  //     .catch((error) => {
  //       console.log(error);
  //       goBack();
  //       toast.add("tr", "danger", "Something Bad Happened");
  //     });
  // };

  const getActiveSubscription = () => {
    services.SubscriptionService.getActiveSubscription(  props?.match?.params?.id )
      .then((response) => {
        setActiveSubscription( response);
        setInitialValues({
          ...initialValues,
          ["type"]: 'paying',
        });
      })
      .catch((error) => {
        toast.add("tr", "danger", "No active subscription");
        setActiveSubscription( undefined );
      });
  };

  // const getAllSubscriptions = () => {
  const getAllSubscriptions = (page=1) => {

    services.SubscriptionService.getAllSubscriptions(  props?.match?.params?.id, page )
      .then((response) => {
        let pagination = response.pagination;
        let paginationConfig = {
          totalPages: pagination.totalPages,
          currentPage: pagination.pageNumber,
          showMax: pagination.page == pagination.totalPages ? 1 : 10,
          threeDots: true,
          prevNext: true,
          disabledClass: "pagination-disabled-item",
          activeBorderColor: '#78c043',
          activeBgColor: '#78c043',
          color: '#3e5569',
          onClick: function (pageNumber) {
            if( pageNumber > pagination.totalPages)
              return;
              getAllSubscriptions(pageNumber)
          }
        };
        setPaginationConfig(paginationConfig); 
        setSubscriptions( response.subscriptions? response.subscriptions: response );
        setInitialValues({
          ...initialValues,
          ["type"]:'inactive',
        });
      })
      .catch((error) => {
        toast.add("tr", "danger", "Error getting subscriptions");
        setSubscriptions( undefined );
        setInitialValues({
          ...initialValues,
          ["type"]:'free',
        });
      });


  };

  const getAllAvailablePlans = () => {

    services.SubscriptionService.getActivePlans(   )
      .then((response) => {
        
        setAvailablePlans( response);
      })
      .catch((error) => {
        toast.add("tr", "danger", "Error getting plans");

        setAvailablePlans( [] );
      });

  };

  const getAllAvailablePaymentMethods = () => {

    services.SubscriptionService.getActivePaymentMethods(   )
      .then((response) => {
        ;
        setAvailablePaymentMethods( response);
      })
      .catch((error) => {
        toast.add("tr", "danger", "Error getting payment methods");

        setAvailablePaymentMethods( [] );
      });

  };

  const handlePlanChange = ( id ) => {

    if( id == 0 ){
      setPlanSubscription({
        ...planSubscription,
        ["plan"]: 0,
        ["product_id"]: "",
        ["amount"] : 0
      })
    }
    else{
     
      let plan = availablePlans.filter(function(plan){
        return plan.id == id;
      })[0];
  
      // let ref = planCoupns[plan.code];
       // const [planCoupns, setPlanCoupns] = useState({
  //   a_basic_month : "0011223", 
  //   a_advance_quarter: "0011224"
  // });

      setPlanSubscription({
        ...planSubscription,
        ["plan"]: id,
        ["product_id"]: plan.product_id,
        ["amount"] : plan.price,
        ["reference"]: "0011224"
      })
    };

  }
  
  const handlePaymentChange = ( id ) => {

    if( id == 0 ){
      setPlanSubscription({
        ...planSubscription,
        ["payment_method"]: 0,
        ["package"] : "",
        ["platform"] : ""
      })
    }
    else{
      let paymentMethod = availablePaymentMethods.filter(function(paymentMethod){
        return paymentMethod.id == id;
      })[0];

      let packageName = "web";
      let platform = "web";

      switch(paymentMethod.code){
        case "googlepay":
          packageName = "com.aimfit";
          platform = "android";
          break;
      }
      
      setPlanSubscription({
        ...planSubscription,
        ["payment_method"]: id,
        ["package"] : packageName,
        ["platform"] : platform
      })
    }
    
  }

  const handleRefrenceChange = ( val ) => {

    setPlanSubscription({
      ...planSubscription,
      ["reference"]: val,
    })

  }

  const handleSubscriptionSubmission = () => {
   
    if( planSubscription.plan == 0 || planSubscription.payment_method == 0 || !planSubscription.reference || planSubscription.reference == '' ){
  
      toast.add("tr", "danger", " missing selection ");
      return;
    }

    let requestDataSubscription = {
      user: parseInt(planSubscription.user),
      plan: parseInt(planSubscription.plan),
      payment_method: parseInt(planSubscription.payment_method)
    }

    setIsLoading(true);

    services.SubscriptionService.addSubscription(  requestDataSubscription )
      .then(( subscriptionResponse ) => {
       
        let requestDatatransaction = {
          user: parseInt(planSubscription.user),
          plan: parseInt(planSubscription.plan),
          payment_method: parseInt(planSubscription.payment_method),
          subscription: parseInt(subscriptionResponse.id),
          amount: parseFloat(planSubscription.amount),
          response: "subscription added from admin panel",
          reference: planSubscription.reference,
          package: planSubscription.package,
          platform: planSubscription.platform
          
        }
        services.SubscriptionService.addSubscriptionPayment(  requestDatatransaction )
        .then((response) => {
    
          getAllSubscriptions();
          getActiveSubscription();
  
          setInitialValues({
            ...initialValues,
            ["type"]: 'paying',
          });

          toast.add("tr", "primary", "Subscribed to a service ");

          /*
            START CODE => Tracking MoEngage event when user Successfully subscribed the plan from coupon 
          */
          if(subscriptionResponse?.payment_method === "coupon") {
            MoengageEventTrack("Purchase", initialValues, subscriptionResponse)
          }
          /*
            End CODE => Tracking MoEngage event when user Successfully subscribed the plan from coupon 
          */
            setIsLoading(false);

        })
        .catch((error) => {
          console.log(error)
          toast.add("tr", "danger", "Error while updating subscription payment status");
          setIsLoading(false);
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error)
        toast.add("tr", "danger", "Error creating subscription");
        setIsLoading(false);
      });

  }

  const statusUpdate = ( sub, state ) => {
    setIsLoading(true);
    services.SubscriptionService.updateSubscriptionStatus(  sub.id, state )
      .then((response) => {
        getActiveSubscription();
        getAllSubscriptions();
        // setInitialValues({
        //   ...initialValues,
        //   ["type"]: state == 'inactive' ? 'free' : 'inactive',
        // });
        
        /*
          START CODE => Tracking MoEngage event when user Successfully subscribed the plan from coupon 
        */
        if(sub?.payment_method === "coupon" && sub?.payment_method === "safepay") {
          MoengageEventTrackOnClickEnableOrDisable("Purchase", initialValues, sub, state)
        }
        /*
          End CODE => Tracking MoEngage event when user Successfully subscribed the plan from coupon 
        */

        toast.add("tr", "primary", "Status Updated");
        setIsLoading(false);
      })
      .catch((error) => {
        toast.add("tr", "danger", "Error updating status");
        setIsLoading(false);
      });

  }

  const renewSubscription = ( id ) => {

    
    services.SubscriptionService.renewSubscription( id  )
      .then((response) => {

        getActiveSubscription();
      
        toast.add("tr", "primary", "Updated");
      })
      .catch((error) => {
 
        toast.add("tr", "danger", "Error Renewing");
      });

  }

  const getAction = (sub) => {
    let action = "n/a";
    if(sub.payment_status == 'paid' ) {
      if(  sub.status == 'pause' || sub.status == 'inactive'){
        let diff = new Date(sub.end_date).getTime() - new Date().getTime();
        if("coupon" == sub.payment_method){
          diff = (diff + (1000 * 3600 * 24 * 5))
        }
        return  activeSubscription == undefined &&  diff > 0 ?
        <a href='#' 
          onClick={
            () => statusUpdate( sub , 'active' )
            // () => moengageEventTrackOnClickEnableOrDisable(sub)
          } 
        >   
          Enable  
        </a>
        : "n/a"
      }else if(  sub.status == 'active' ){
          return (
            <a href='#' 
              onClick={
                () => statusUpdate( sub , 'inactive' )
                // () => moengageEventTrackOnClickEnableOrDisable(sub)
              } 
            > 
              Disable 
            </a>
          ) 
      }

    }
    return action;
  }

  useEffect(()=>{
    if(instructors)
    getData();
  },[instructors])

  useEffect(()=>{
    if(instructors)
    getData();
  },[paginationConfig])

  useEffect(() => {

    // getAllPlans();
    getUserTags();
    getAllUsersHook();
    getAllSubscriptions();
    getActiveSubscription();
    getAllAvailablePlans();
    getAllAvailablePaymentMethods();
  }, []);

  const goBack = () => props.history.push("/admin/members");

  return !isLoading ? (
    <div>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validate={handleValidations}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form>
            <Row>
              <div className="col">
                <div className="row">
                  <div className="col-sm-4">
                    <h2>{isEditing ? "Edit" : "Create"} Member</h2>
                  </div>
                </div>
              </div>
              <div className="col-auto">
                <button
                  className="btn btn-light mr-2  "
                  type="button"
                  onClick={() => goBack()}
                >
                  Back
                </button>
                {isEditing && (
                  <button
                    className="btn btn-secondary mr-2  btn-fill "
                    type="submit"
                    disabled={disable}
                    onClick={() => {
                      setFieldValue(
                        "deletedAt",
                        new Date(moment().format("YYYY-M-DD HH:mm:ss"))
                      );
                    }}
                  >
                    Delete
                  </button>
                )}
                <button
                  className="btn btn-success mr-2  btn-fill"
                  type="submit"
                  disabled={disable}
                  // disabled={isSubmitting}
                >
                  Save
                </button>
              </div>
            </Row>

            <Card>
              <Card.Body>
                <Row>
                  <div className="col-sm-6 form-group">
                    <label htmlFor="">Name</label>
                    <Field
                      name="fullName"
                      className="form-control"
                      type="text"
                    />
                    <ErrorMessage
                      name="fullName"
                      component="small"
                      className="text-danger"
                    />
                  </div>
                  <div className="col-sm-6 form-group">
                    <label>Address</label>
                    <Field
                      className="form-control"
                      type="text"
                      rows={1}
                      name="address"
                      placeholder="Address"
                    />
                    <ErrorMessage
                      name="address"
                      component="small"
                      className="text-danger"
                    />
                  </div>
                </Row>
                <Row>
                  <div className="col-sm-6 form-group">
                    <label htmlFor="">Email</label>
                    <Field name="email" className="form-control" type="email" />
                    <ErrorMessage
                      name="email"
                      component="small"
                      className="text-danger"
                    />
                  </div>
                  <div className="col-sm-6 form-group">
                    <label htmlFor="">CNIC</label>
                    <Field name="cnic" className="form-control" type="text" />
                    <ErrorMessage
                      name="cnic"
                      component="small"
                      className="text-danger"
                    />
                  </div>
                </Row>
                <Row>
                  <div className="col-sm-6 form-group">
                    <label htmlFor="">Phone</label>
                    <Field name="phone" className="form-control" type="text" />
                    <ErrorMessage
                      name="phone"
                      component="small"
                      className="text-danger"
                    />
                  </div>
                  {isEditing && (
                    <div class="col-sm-6 row form-group">
                    <div className="col-sm-4 form-group">
                    <label>Test Member</label>
                        <div class="d-flex align-items-center mt-3">
                            <label className="pr-3">No</label>
                            <div className="custom-control custom-switch">
                              <Field
                                name="isTestUser"
                                checked={values.isTestUser}
                                type="checkbox"
                                className="custom-control-input"
                                id="customSwitch2"
                                onChange={(event) => {
                                  setInitialValues({
                                    ...initialValues,
                                    ["isTestUser"]: !values.isTestUser,
                                  });
                                }}
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="customSwitch2"
                              >
                                Yes
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    
                  )}
                </Row>
                {/* <Row ngIf="type == free ">
                  <div className="col form-group">
                    <label htmlFor="">Payment Plan</label>
                    <Select
                      defaultValue={values.paymentPlan}
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      placeholder="Select Payment Plan"
                      onChange={(selectedOption) => {
                        setSelectedPlan(selectedOption);
                      }}
                      options={plans}
                    />
                  </div>
                  <div className="col-sm-2 mt-4">
                    <span
                      className="btn btn-success mr-2  btn-fill"
                      onClick={selectPlan}
                    >
                      Change Plan
                    </span>
                  </div>
                </Row> */}
                <Row>
                  <div className="col form-group">
                    <label htmlFor="">Member Type</label>
                    <Field name="type" className="form-control" type="text" disabled />
                  </div>
                  <div className="col form-group">
                        <label htmlFor="">Welcome Instructor</label>
                        <Select
                          // defaultValue={}
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                          placeholder={presentInstructor ? presentInstructor.label:"S"}
                          onChange={(selectedOption) => {
                            setInstID(selectedOption.value);
                          }}
                          options={instructors}
                        />
                    </div>
                </Row>
                <Row>
                <div className="col form-group">
                    <label htmlFor="">User Tag</label>
                    <Select
                      name="tagId"
                      closeMenuOnSelect={true}
                      components={animatedComponents}
                      placeholder={
                        isEditing
                          ? values.tagId ? tagsArr.filter(e => e.value === values.tagId)[0].label : ' '
                          : "Tag"
                      }
                      onChange={selectedOption => {
                        values.tagId = selectedOption.value;
                        services.UserTagsService.addRemoveTag({
                          memberId: values.id, 
                          tagId: selectedOption.value
                        })
                      }}
                      options={tagsArr}
                    />
                  </div>
                </Row>
              </Card.Body>
            </Card>
          </Form>
        )}
      </Formik>
      <div>
        <h3>Active Plan</h3>
        <div className="card">
            <div className="card-body">
                   {
                    activeSubscription == undefined && (
                        <form>
                          <h4> No Active Subscription </h4> 
                          <div class="form-group">
                            <label >Plan</label>
                            <select  class="form-control"  onChange={ ( val ) => handlePlanChange( val.target.value ) } name="plan">
                              <option value="0" >None</option>
                              {
                                availablePlans.map((plan, i) => <option value={plan.id} key={i} > { plan.name } - { plan.price } / { plan.days} days </option>)
                              }
                            </select>
                          </div>
                          
                          <div class="form-group">
                            <label >Payment Method</label>
                            <select  class="form-control"  onChange={ ( val ) => handlePaymentChange( val.target.value ) }  name="selected_payment_method">
                              <option value="0" >None</option>
                              {
                                availablePaymentMethods.map((payment_method, i) => <option value={payment_method.id} key={i} > { payment_method.name } </option>)
                              }
                            </select>
                          </div>
                         
                          {/* <div class="form-group">
                            <label >Payment Reference</label>
                            <input class="form-control" type="text" name="reference" onChange={ ( val ) => handleRefrenceChange( val.target.value ) } />
                          </div> */}
                          
                          <div class="form-group">
                          <a href="#" onClick={ () => handleSubscriptionSubmission()} > Subscribe to plan </a>
                          </div>
                          
                        </form>
                     ) 

                   } 
                   {
                    activeSubscription != undefined && (
                      <div>
                        <div className="row">
                          <div className="col-sm-6">
                            <h5> Plan </h5>
                            <p>{ activeSubscription.plan_name}</p>
                            <h5> Start Date </h5>
                            <p>{ activeSubscription.start_date}</p>
                            <h5> Payment Status </h5>
                            <p>{ activeSubscription.payment_status}</p>
                          </div> 
                          <div className="col-sm-6">
                            <h5> Price </h5>
                            <p>{ activeSubscription.plan_amount}</p>
                            <h5> End Date </h5>
                            <p>{ activeSubscription.end_date}</p>
                            <h5> Payment Method </h5>
                            <p>{ activeSubscription.payment_method}</p>
                          </div>  
                        </div>   
                        <hr/>
                        <div className="row" >
                          <div className="col-sm-12">
                            <h5> Payments </h5>
                            <table className="table">
                              <thead>
                                <tr>
                                  <th scope="col"> Status  </th> <th scope="col">  Date </th> <th scope="col"> Type </th> <th scope="col"> Platform </th> <th scope="col"> Response </th> <th scope="col"> Action </th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                activeSubscription.transactions.map(function(trans, i){
                                  return  <tr> <td>{trans.status}</td> <td>{trans.date}</td> <td>{trans.type}</td> <td>{trans.platform}</td> <td>{trans.response}</td>  <td> 
                                    {
                                      (((new Date(activeSubscription.end_date).getTime() - new Date().getTime())/(1000 * 3600 * 24)) < 4 ) && activeSubscription.transactions.length === i + 1 && "coupon" == activeSubscription.payment_method ?
                                      (
                                        <a href="#"  onClick={() => renewSubscription( activeSubscription.id  )} > Renew</a>
                                      )
                                      :
                                      (
                                        <p>n/a</p>
                                      )
                                    }
                                    </td> </tr>
                                })
                                }
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      )
                   }
            </div>
        </div>
      </div>
      <div>
        <h3>Plans History</h3>
        <div className="card">
            <div className="card-body">
                   {
                    subscriptions == undefined && (
                        <p> No Subscriptions history </p> 
                     ) 
                   } 
                   {
                    subscriptions  && (
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">
                                  Plan
                              </th>
                              <th scope="col">
                                  Amount
                              </th>
                              <th scope="col">
                                  Status
                              </th>
                              <th scope="col">
                                  Start Date
                              </th>
                              <th scope="col">
                                  End Date
                              </th>
                              <th scope="col">
                                  Payment Method
                              </th>
                              <th scope="col">
                                  Payment Status
                              </th>
                              <th scope="col">
                                  Action
                              </th>
                            </tr>
                            </thead>
                            <tbody>
                              {
                                subscriptions.map(function(sub, i){
                                    return <tr className={ sub.status == 'active' && 'table-success' } >
                                      <th scope="row">{sub.plan_name}</th>
                                      <td>{sub.plan_amount}</td>
                                      <td>{sub.status}</td>
                                      <td>{sub.start_date}</td>
                                      <td>{sub.end_date}</td>
                                      <td>{sub.payment_method}</td>
                                      <td>{sub.payment_status}</td>
                                      <td>
                                      { 
                                        getAction( sub )
                                      }
                                      </td>
                                    </tr>;
                                })
                              }
                            </tbody>
                        </table>
                      )
                   }
            </div>
        </div>
        {
          paginationConfig.totalPages !=0 && (  <Pagination {...paginationConfig} />)
        }

      </div>
    
    </div>
  
  ) : (
    <Loader />
  );
};

export default AddOrEditMember;
