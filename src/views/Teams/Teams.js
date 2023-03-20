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

function Teams() {
  const toast = useToast();

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const [teams, setTeams] = useState([]);

  const getData = async () => {
    try {
      let data = await services.TeamService.getAllTeams();
      let teams = data.response;
      setTeams(teams);
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
    getData();
  }, []);

  return !isLoading ? (
    <>
      <Container fluid>
        <Row>
          <div className="col">
            <h2>Teams</h2>
          </div>
          <div className="col-auto">
            <Link
              to="/admin/teams/create"
              className="btn btn-fill  btn-primary"
            >
              <i className="nc-icon nc-simple-add mr-2"></i>
              Add new
            </Link>
          </div>
        </Row>
        <Row>
          <Col md="12">
            {teams.length ? (
              <Card className="strpied-tabled-with-hover">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Name</th>

                      <th className="border-0">Go</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teams?.map((teamItem, key) => (
                      <tr key={key}>
                        <td>{teamItem.id}</td>
                        <td>{teamItem.name}</td>

                        <td>
                          <Link to={`/admin/teams/${teamItem.id}/edit`}>
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
              <p>No Team Found</p>
            )}
          </Col>
        </Row>
      </Container>
    </>
  ) : (
    <Loader />
  );
}

export default Teams;
