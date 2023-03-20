import React, { useState, useEffect } from "react";
import moment from "moment";
import { Card, Row } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useToast } from "components/Toast";
import services from "services";
import DateTimeRangePicker from "components/DateRangePicker";
import FileUpload from "components/FileUpload/UploadFile";
import FileUploadMux from "components/FileUpload/UploadFileMux"
import Select from "react-select";
import Loader from "components/Loader";
import makeAnimated from "react-select/animated";
import MaskedInput from "react-text-mask";
import { classSizeTagData } from "./videoSizeTagList";

const AddOrEditClass = (props) => {
  const toast = useToast();
  const [disable, setDisable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(null);
  const [editData, setEditData] = useState(null)
  const [newTempSlot, setNewTempSlot] = useState({
    startDate: "",
    endDate: "",
    users: [],
  });
  const animatedComponents = makeAnimated();
  const [isNewSlot, setNewSlot] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [categories, setCategories] = useState();
  const [classTypes, setClassTypes] = useState();
  const [selectedClassType, setSelectedClassType] = useState(0)
  const [classEquipments, setClassEquipments] = useState();
  const [selectedClassEquipments, setSelectedClassEquipments] = useState();
  const [slots, setSlots] = useState([]);
  const [userOptions, setUserOptions] = useState();
  const [presentInstructor,setPresentInstructor] = useState({})
  const [videos,setVideos] = useState([])
  const [selectedVideo, setSelectedVideo]=useState(false)
  const [presentVideo,setPresentVideo]=useState("")
  // const [allInstructorsEdit,setAllInstructorsEdit] = useState([])

  const [muxAssetId,setMuxAssetId] = useState();
  const [muxUploadId,setMuxUploadId] = useState();
  const [muxVideoLink,setMuxVideoLink] = useState();

  const [vodInstructors,setVodInstructors] = useState([]);
  const [vodInstID,setVodInstID] = useState();
  const [initialValues, setInitialValues] = useState({
    name: "",
    category: {
      id: "",
      name: "",
    },
    classType: {
      id: "",
      name: "",
    },
    description: "",
    premiumContent: 0,
    whatToExpect: "",
    difficultyLevel: 0,
    classImage: "",
    link: "",
    duration: "",
  });
  const handleDates = (newSlot, isNew) => {
    if (!isNew) {
      let index = slots.indexOf(newSlot);

      let newSls = slots.map((sl, i) => {
        if (i === index) {
          sl = newSlot;
        }
        return sl;
      });
      setSlots(newSls);
      toast.add("tr", "primary", "Slot Updated");
    } else {
      setSlots((slot) => [...slot, newSlot]);
      toast.add("tr", "primary", "Slot Added");
    }

    setNewSlot(false);
  };
  const handleValidations = (values) => {
    const errors = {};
    if (!values.deletedAt) {
      if (!values.name) {
        errors.name = "* This field is required";
      }
      if (!values.description) {
        errors.description = "* This field is required";
      }
    }

    return errors;
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    
    if (!values.deletedAt) {
      if (!selectedVideo && values.classType.id == 2) {
        toast.add("tr", "danger", "Video is required");
        return;
      }
      if (!values.classImage) {
        toast.add("tr", "danger", "Image is required");
        return;
      }
      if (!slots.length && values.classType.id != 2) {
        toast.add("tr", "danger", "Add at least one slot ");
        return;
      }

      if (!values.sizeTag && values.sizeTag === '' && values.classType.id == 2) {
        toast.add("tr", "danger", "Size tag is required");
        return;
      }

      for (let slot of slots) {
        let userIds = [];
        for (let user of slot.users) {
          userIds.push(user.value);
        }
        slot["users"] = userIds;
        slot.startDate = new Date(
          moment(slot.startDate).format("YYYY-M-DD HH:mm:ss")
        );
        slot.endDate = new Date(
          moment(slot.endDate).format("YYYY-M-DD HH:mm:ss")
        );
      }
    }
 
    let classType = values.classType.id
      ? values.classType.id
      : classTypes[0].id;
    let category = values.category.id ? values.category.id : categories[0].id;
    let vod_instructorID = vodInstID? vodInstID: null;
    let classObj = {
      name: values.name,
      description: values.description,
      classType: classType,
      category: category,
      duration: values.duration,
      size: classType == 2 ? values?.sizeTag : '',
      premiumContent: values.premiumContent,
      whatToExpect: values.whatToExpect,
      slots: classType == 1 ? slots : [],
      link: classType == 0 ? values.link : selectedVideo,
      difficultyLevel: values.difficultyLevel,
      classImage: values.classImage,
      vod_instructor_id : vod_instructorID,
      muxAssetId: muxAssetId? muxAssetId:null,
      muxUploadId: muxUploadId? muxUploadId:null,
      equipmentsNeeded: JSON.stringify(
        selectedClassEquipments?.map((item) => {
          return item.value;
        })
      ),
    };
    if (values.deletedAt) {
      classObj.deletedAt = values.deletedAt;
    }

    if (isEditing) {
      classObj.id = values.id;
    }

    isEditing
      ? services.ClassService.updateClass(classObj).then((response) => {
          if (values.deletedAt) {
            toast.add("tr", "primary", "Class Deleted");
          } else {
            toast.add("tr", "primary", "Class Updated");
          }
          goBack();
        })
      : services.ClassService.addClass(classObj)
          .then((response) => {
            toast.add("tr", "primary", "Class Created");
            goBack();
          })

          .catch((error) => {
            console.log(error);
            goBack();
            toast.add("tr", "danger", "Something Bad Happened");
          });

    setDisable(true);
  };
  const getCat = async () => {
    services.CategoryService.getAllCategories()
      .then((res) => {
        let categories = res.response;
        setCategories(categories);
      })
      .catch((error) => console.log(error));
  };
  const getUsersByRole = async () => {
    let role = 2;
    services.UsersService.getAllUsers(role)
      .then((res) => {
        let users = res.response;
        let options = users?.map((user) => {
          let option = {
            value: user.id,
            label: user.name,
          };
          return option;
        });

        setUserOptions(options);
      })
      .catch((error) => console.log(error));
  };
  const getAllClassTypes = async () => {
    services.ClassService.getAllClassTypes()
      .then((res) => {
        let classTypes = res.response;

        setClassTypes(classTypes);
      })
      .catch((error) => console.log(error));
  };
  const getAllClassEquipments = async () => {
    services.ClassService.getAllClassEquipments()
      .then((res) => {
        let classEquipments = res.response;
        let equipments = classEquipments?.map((item) => {
          let option = {
            value: item.id,
            label: (
              <div>
                <img
                  src={item.image}
                  height="30px"
                  width="30px"
                  style={{ padding: 3 }}
                />
                {item.name}
              </div>
            ),
          };
          return option;
        });

        setClassEquipments(equipments);
      })
      .catch((error) => console.log(error));
  };

  useEffect(()=>{
    if(vodInstructors)
    getData()
  }, [vodInstructors])

  useEffect(() => {
    console.log('useEffect isEditing',isEditing)
    if (isEditing && editData) {
        console.log('isEditing && editData',isEditing, editData.link)
        setSelectedVideo(editData.link)
        setPresentVideo(editData.link)
    }
  }, [isEditing])

  const findInstructorById = (id)=>{
    
    let x = vodInstructors.filter( option => option.value == id)
    if( x[0] ){
      setPresentInstructor( x[0]);
      setVodInstID(x[0].value); 
    }else{
      setPresentInstructor({});
    }
    
  }

  const getAllInstructorsHook = () => {
    services.ClassService.getAllInstructors()
      .then((res) => {
        let allInstructors = res.response;
        let instructors = allInstructors?.map((item) => {
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
        setVodInstructors(instructors);
        
      })
      .catch((error) => console.log(error));
  };

  const addNewSlot = () => {
    setNewSlot(true);
    setNewTempSlot({
      startDate: "",
      endDate: "",
      users: [],
    });
  };

  const getData = async () => {
    try {
      let id = props?.match?.params?.id;
      if (id) {
        let data = await services.ClassService.getClassById(id);
        data = data.response;
        if (!data) {
          throw Error("Class not Found");
        }
        setEditData(data);
        data.slots?.map((slot) => {
          slot["toggle"] = false;
        });
        let equipments = data.equipmentsNeeded?.map((item) => {
          let option = {
            value: item.id,

            label: (
              <div>
                <img
                  src={item.image}
                  height="30px"
                  width="30px"
                  style={{ padding: 3 }}
                />
                {item.name}
              </div>
            ),
          };
          return option;
        });
        let instructorOptions = data.instructorOptions?.map((item) => {
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
        data["instructorOptions"] = instructorOptions;
        data["equipmentsNeeded"] = equipments;
        findInstructorById(data.vod_instructor_id)
        let slotArray = data.slots;
        slotArray.map((slot) => {
          let users = slot?.users?.map((user) => {  
            let option = {
              value: user.id,
              label: user.name,
            };

            return option;
          });

          slot["users"] = users;
        });
        setSlots(slotArray);
        setInitialValues(data);
      } else {
      }
      setIsEditing(id);
    } catch (err) {
      toast.add(
        "tr",
        "danger",
        err.message || err?.response?.data?.code || "Something went wrong"
      );

      goBack();
    }
    setIsLoading(false);
  };


  const getAllReadyVideos = () => {
    services.ClassService.getAllReadyVideos()
      .then((res) => {
        let videos = res.response;
        videos = videos?.map((item) => {
          let option = {
            value: item.mux_playback_id,
            label: (
              <div>
                {item.title}
              </div>
            ),
          };
          return option;
        });
        setVideos(videos);
        
      })
      .catch((error) => console.log(error));
  };


  useEffect(async () => {
    getAllReadyVideos();
    getAllInstructorsHook();
    getCat();
    getAllClassTypes();
    getUsersByRole();
    getAllClassEquipments();
    
  }, []);

  const goBack = () => props.history.push("/admin/classes");

  const spliceSlot = async (index) => {
    if (slots.length == 1) {
      toast.add("tr", "danger", "At Least 1 slot is required");
      return;
    } else {
      const splicedArray = slots.map((sl, i) => {
        return i == index ? { ...sl, toBeDeleted: true } : sl;
      });

      setSlots(splicedArray);

      toast.add("tr", "primary", "Slot Deleted");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Formik
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
                    <h2>{isEditing ? "Edit" : "Create"} Class</h2>
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
                    onClick={() => {
                      alert("Are You Sure to delete this ??");
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
                    <Field name="name" className="form-control" type="text" />
                    <ErrorMessage
                      name="name"
                      component="small"
                      className="text-danger"
                    />
                  </div>
                  <div className="col-sm-6 form-group">
                    <label htmlFor=""> Select Class Category</label>
                    <Field
                      name="category.id"
                      className="form-control"
                      as="select"
                    >
                      {categories?.map((cat, key) => (
                        <option key={key} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="category"
                      component="small"
                      className="text-danger"
                    />
                  </div>
                </Row>

                <Row>
                  <div className="col-sm-6 form-group">
                    <label htmlFor="">Select Class Type</label>
                    <Field
                      name="classType.id"
                      className="form-control"
                      as="select"
                      // onChange={(selectedOption) => {
                      //   setSelectedClassType(selectedOption);
                      //   console.log(selectedOption.value)
                      // }}

                    >
                      {classTypes?.map((classType, key) => (
                        <option key={key} value={classType.id} id={key} selected={editData?.classType === classType.id}>
                          {classType.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="type"
                      component="small"
                      className="text-danger"
                    />
                  </div>
                  <div className="col-sm-6 form-group">
                    <label>Description</label>
                    <Field
                      className="form-control"
                      as="textarea"
                      rows={1}
                      name="description"
                      placeholder="description"
                    />
                    <ErrorMessage
                      name="description"
                      component="small"
                      className="text-danger"
                    />
                  </div>
                </Row>
                <Row>
                  <div className="col form-group">
                    <label htmlFor="">Equipments Needed</label>
                    <Select
                      defaultValue={values.equipmentsNeeded}
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      isMulti
                      placeholder="Select Class Equipments"
                      onChange={(selectedOption) => {
                        setSelectedClassEquipments(selectedOption);
                      }}
                      options={classEquipments}
                    />
                  </div>
                </Row>
                <Row>
                  <div className="col form-group">
                    <label htmlFor="">What To Expect</label>
                    <Field
                      name="whatToExpect"
                      className="form-control"
                      type="text"
                    />
                    <ErrorMessage
                      name="whatToExpect"
                      component="small"
                      className="text-danger"
                    />
                  </div>
                  <div className="col form-group">
                    <label htmlFor="">Difficulty Level</label>
                    <Field
                      name="difficultyLevel"
                      className="form-control"
                      type="number"
                      min="1"
                      max="5"
                    />
                    <ErrorMessage
                      name="difficultyLevel"
                      component="small"
                      className="text-danger"
                    />
                  </div>
                </Row>
                <Row>
                  {values.classType.id == 2 && (
                    <>
                    
                  <div className="col form-group">
                    <label>Premium Content</label>
                    <div className="d-flex align-items-center mt-2">
                      <label className="pr-3">Disable</label>
                      <div className="custom-control custom-switch">
                        <Field
                          name="premiumContent"
                          checked={values.premiumContent}
                          type="checkbox"
                          className="custom-control-input"
                          id="customSwitch1"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customSwitch1"
                        >
                          Enable
                        </label>
                      </div>
                    </div>
                  </div>

                      { selectedClassType == 0 ?
                      <FileUpload
                        type="video"
                        name="link"
                        setFieldValue={setFieldValue}
                        link={values.link}
                      />
                      : null
                      }

                      {/* <FileUploadMux
                        type="video"
                        name="linkMux"
                        setFieldValue={setFieldValue}
                        classId = {values.id}
                        assetId={muxAssetId}
                        uploadId={muxUploadId}
                        assetIdSetter={setMuxAssetId}
                        uploadIdSetter={setMuxUploadId}
                        linkSetter={setMuxVideoLink}
                      /> */}
                        <div className="col-6 form-group">
                        <label htmlFor="">SELECT VIDEO</label>
                        {/* <Select
                          defaultValue={presentInstructor? presentInstructor[0]:{}}
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                          placeholder={presentInstructor? presentInstructor.label:"S"}
                          onChange={(selectedOption) => {
                            console.log(selectedOption)
                            setVodInstID(selectedOption.value);
                          }}
                          options={vodInstructors}
                        /> */}
                        <Select
                          defaultValue={presentVideo ? presentVideo:{}}
                          placeholder={presentVideo}
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                          onChange={(selectedOption) => {
                            console.log('selected video',selectedOption)
                            setSelectedVideo(selectedOption.value);
                            setPresentVideo(selectedOption.value)
                          }}
                          options={videos}
                        />
                      </div>

                      <div className="col-sm-6 form-group">
                        <label>Add VOD Duration</label>

                        <MaskedInput
                          name="duration"
                          id="duration"
                          value={values.duration}
                          className="form-control"
                          mask={[/[0-9]/, /[0-9]/, ":", /[0-9]/, /[0-9]/]}
                          placeholder="minute : second"
                          onChange={(e) =>
                            setFieldValue("duration", e.target.value)
                          }
                        />
                        <ErrorMessage
                          name="duration"
                          component="small"
                          className="text-danger"
                        />
                      </div>
                    </>
                  )}
                  <FileUpload
                    type="image"
                    name="classImage"
                    setFieldValue={setFieldValue}
                    link={values.classImage}
                  />
                  <div className="col-6 form-group">
                        <label htmlFor="">Add Instructor</label>
                        <Select
                          defaultValue={presentInstructor? presentInstructor[0]:{}}
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                          placeholder={presentInstructor? presentInstructor.label:"S"}
                          onChange={(selectedOption) => {
                            console.log("masla here")
                            console.log(selectedOption)
                            setVodInstID(selectedOption.value);
                          }}
                          options={vodInstructors}
                        />
                      </div>
                </Row>
                
                {values.classType.id == 2 && (
                  <Row>
                    <div className="col-6 form-group">
                      <label htmlFor="">Tag</label>
                      <Field
                        name="sizeTag"
                        className="form-control"
                        as="select"

                      >
                        {classSizeTagData?.map((sizeTag, key) => (
                          <option key={key} value={sizeTag.value} id={sizeTag.value} selected={values.size === sizeTag.value}>
                            {sizeTag.text}
                          </option>
                        ))}
                      </Field>  
                    </div>
                  </Row>
                )}

                {values.classType.id != 2 && (
                  <Row className="align-items-center">
                    <div className="chips-box scrollbar col-sm-10 form-group">
                      <label>
                        {slots.length || !isNewSlot
                          ? "Time Slots"
                          : "Add Time Slot"}{" "}
                      </label>
                      {slots.length
                        ? slots.map((slot, key) =>
                            !slot.toBeDeleted ? (
                              !slot.toggle ? (
                                <span className="chip mr-1 mt-1" key={key}>
                                  {moment(slot.startDate).format(
                                    "M/DD hh:mm A"
                                  )}
                                  -{moment(slot.endDate).format("M/DD hh:mm A")}
                                  <span
                                    className="closebtn"
                                    onClick={() => spliceSlot(key)}
                                  >
                                    <i className="fa fa-times"></i>
                                  </span>
                                  <span
                                    className="editBtn"
                                    onClick={() => {
                                      slot.toggle = true;
                                      setSlots([...slots]);
                                    }}
                                  >
                                    <i className="fa fa-edit"></i>
                                  </span>
                                </span>
                              ) : (
                                <DateTimeRangePicker
                                  key={key}
                                  handleDates={handleDates}
                                  slot={slot}
                                  newSlot={false}
                                  defaultValue={slot.users}
                                  options={userOptions}
                                />
                              )
                            ) : null
                          )
                        : null}
                      {!slots.length || isNewSlot ? (
                        <DateTimeRangePicker
                          handleDates={handleDates}
                          slot={newTempSlot}
                          newSlot={true}
                          defaultValue={[]}
                          options={userOptions}
                        />
                      ) : null}
                      {!slots.length && (
                        <ErrorMessage
                          name="slots"
                          component="small"
                          className="text-danger"
                        />
                      )}
                    </div>
                    <div className="col-sm-2 mt-2">
                      {slots.length ? (
                        <span
                          className="btn btn-success mr-2  btn-fill"
                          onClick={addNewSlot}
                        >
                          Add new Slot
                        </span>
                      ) : null}
                    </div>
                  </Row>
                )}
              </Card.Body>
            </Card>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddOrEditClass;