import Loader from "components/Loader";
import { useToast } from "components/Toast";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import Pagination from "react-bootstrap-4-pagination";
import { Link } from "react-router-dom";
import services from "services";
import { handleSubmitAdd, handleSubmitEdit } from "./tagsUtils";

const AddOrEditUserTag = (props) => {
  let memberActionButtonStyle = { display: "inline-block" };

  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [paginationConfig, setPaginationConfig] = useState({});
  const [members, setMembers] = useState([]);

  const handleValidations = (values) => {
    const errors = {};
    if (!values.name && !values.deletedAt) {
      errors.name = "* This field is required";
    }
    return errors;
  };

  const handleSubmit = (values) => {
    isEditing
      ? (handleSubmitEdit(values, goBack),
        setIsEditing(false),
        toast.add("tr", "primary", "User Tag Updated"))
      : handleSubmitAdd(values, goBack);
  };

  // const handleDelete = values => {
  // handleDelAddEdit(values);
  // goBack();
  // };

  const getData = async (page = 1, limit = 10) => {
    try {
      if (page === 0 || page == false) {
        return;
      }
      let id = props?.match?.params?.id;
      if (id) {
        let data = await services?.UserTagsService?.getUserTagById(
          id,
          true,
          page,
          limit
        );
        data = data?.response;
        if (!data) {
          throw Error("Tags not found");
        }
        let pagination = data?.members?.pagination;
        if (pagination) {
          let paginationConfig = {
            totalPages: pagination?.totalPages,
            currentPage: pagination?.page,
            showMax: pagination?.page == pagination?.totalPages ? 1 : 10,
            threeDots: true,
            prevNext: true,
            disabledClass: "pagination-disabled-item",
            activeBorderColor: "#78c043",
            activeBgColor: "#78c043",
            color: "#3e5569",
            onClick: function (pageNumber) {
              if (pageNumber > pagination?.totalPages) return;
              getData(pageNumber);
            },
          };
          setPaginationConfig(paginationConfig);
        }
        setInitialValues(data);
        setMembers(data?.members?.items);
        if (data) setIsEditing(true);
      }
      // setIsEditing(id);
    } catch (err) {
      console.log(err);
      toast.add(
        "tr",
        "danger",
        err?.response?.data?.code + "Something went wrong"
      );
      goBack();
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);
  const goBack = () => props.history.push("/admin/usertag");
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
                    <h2>{isEditing ? "Edit" : "Create"} User Tag</h2>
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
                {/* {isEditing && (
                  <button
                    className="btn btn-secondary mr-2  btn-fill "
                    type="submit"
                    disabled={disable}
                    onClick={() => {
                        confirm("Are You Sure to delete this ??") && handleDelete(values)
                      // setFieldValue(
                      //   "deletedAt",
                      //   new Date(moment().format("YYYY-M-DD HH:mm:ss"))
                      // );
                    }}
                  >
                    Delete
                  </button>
                )} */}
                <button
                  className="btn btn-success mr-2  btn-fill"
                  type="submit"
                  onClick={() => {
                    // handleSubmit(values);
                  }}
                >
                  Save
                </button>
              </div>
            </Row>

            <Card>
              <Card.Body>
                <Row>
                  <div className="col-sm-6 form-group">
                    <label htmlFor="">Title *</label>
                    <Field name="name" className="form-control" type="text" />
                    <ErrorMessage
                      name="title"
                      component="small"
                      className="text-danger"
                    />
                  </div>

                  <div className="col-sm-6 form-group">
                    <label htmlFor=""> Description</label>
                    <Field
                      name="description"
                      className="form-control"
                      type="text"
                    />
                  </div>
                </Row>
              </Card.Body>
            </Card>
          </Form>
        )}
      </Formik>

      <Container fluid>
        <Row>
          <div className="col">
            <h2>Members</h2>
          </div>
        </Row>
        <Row>
          <Col md="12">
            {members?.length ? (
              <Card className="strpied-tabled-with-hover">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Phone</th>
                      <th className="border-0">Go</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members?.map((item, key) => (
                      <tr>
                        <td>{item.id}</td>
                        <td>{item.fullName}</td>
                        <td>{item.phone}</td>
                        <td>
                          <Link to={`/admin/member/${item.id}/edit`}>
                            <i
                              style={memberActionButtonStyle}
                              className="fa fa-user"
                              color="primary"
                            ></i>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card>
            ) : (
              <p>No Member Found</p>
            )}
          </Col>
        </Row>
        {isEditing && paginationConfig?.totalPages != 0 && (
          <Pagination {...paginationConfig} />
        )}
      </Container>
    </div>
  );
};

export default AddOrEditUserTag;
