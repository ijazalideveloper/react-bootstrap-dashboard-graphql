import React, { useState, useEffect } from "react";
import { Card, Row } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useToast } from "components/Toast";
import services from "services";
import Loader from "components/Loader";
import moment from "moment";
const AddOrEditTeam = (props) => {
  const toast = useToast();
  const [disable, setDisable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(null);
  const [initialValues, setInitialValues] = useState({
    name: "",
  });

  const handleValidations = (values) => {
    const errors = {};
    if (!values.name && !values.deletedAt) {
      errors.name = "* This field is required";
    }

    return errors;
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    let obj = values;

    isEditing ? (obj["id"] = values.id) : null;
    isEditing
      ? services.TeamService.updateTeam(obj).then((response) => {
        if (values.deletedAt) {
          toast.add("tr", "primary", "Team Deleted");
        } else {
          toast.add("tr", "primary", "Team Updated");
        }
        goBack();
      })
      : services.TeamService.addTeam(obj)
        .then((response) => {
          toast.add("tr", "primary", "Team Created");
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

  const getData = async () => {
    try {
      let id = props?.match?.params?.id;
      if (id) {
        let data = await services.TeamService.getTeamById(id);

        data = data.response;
        if (!data) {
          throw Error("Team not Found");
        }
        setInitialValues({ id: data.id, name: data.name });
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

  useEffect(() => {
    getData();
  }, []);

  const goBack = () => props.history.push("/admin/teams");
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
                    <h2>{isEditing ? "Edit" : "Create"} Team</h2>
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
                    <Field name="name" className="form-control" type="text" />
                    <ErrorMessage
                      name="name"
                      component="small"
                      className="text-danger"
                    />
                  </div>
                </Row>
              </Card.Body>
            </Card>
          </Form>
        )}
      </Formik>
    </div>
  ) : (
    <Loader />
  );
};

export default AddOrEditTeam;
