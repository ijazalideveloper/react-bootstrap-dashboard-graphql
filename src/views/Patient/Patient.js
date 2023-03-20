import React, { useState, useEffect } from "react";
// react-bootstrap components
import { Card, Table, Container, Row, Col } from "react-bootstrap";

import { Link } from "react-router-dom";
import services from "services";
import { useSelector, useDispatch } from "react-redux";
import { useToast } from "components/Toast";
import Loader from "components/Loader";
function Patient() {
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);

  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      let data = await services.UsersService.getAllUsers();

      let users = data.response;
      setUsers(users);
    } catch (err) {
      console.log("err.response", err.response);

      toast.add(
        "tr",
        "danger",
        err.message || err?.response?.data?.code || "Something went wrong"
      );
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return !isLoading ? (
    <>
      <Container fluid>
        <Row>
          <div className="col">
            <h2>Patient</h2>
          </div>
          <div className="col-auto">
            <Link
              to="/admin/patient/create"
              className="btn btn-fill  btn-primary"
            >
              <i className="nc-icon nc-simple-add mr-2"></i>
              Add new
            </Link>
          </div>
        </Row>
        <Row>
          <Col md="12">
            {users.length ? (
              <Card className="strpied-tabled-with-hover">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Phone</th>
                      <th className="border-0">Email</th>
                      <th className="border-0">Address</th>
                      <th className="border-0">Role</th>
                      <th className="border-0">Go</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users?.map((item, key) => (
                      <tr>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.phone}</td>

                        <td>{item.email}</td>
                        <td>{item.address}</td>
                        <td>{item.role}</td>

                        <td>
                          <Link to={`/admin/patient/${item.id}/edit`}>
                            <i
                              className="fa fa-arrow-right"
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
              <p>No User Found</p>
            )}
          </Col>
        </Row>
      </Container>
    </>
  ) : (
    <Loader />
  );
}

export default Patient;
