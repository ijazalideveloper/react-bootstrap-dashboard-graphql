import React, { useState, useEffect } from "react";
// react-bootstrap components
import { useToast } from "components/Toast";
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
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import services from "services";
import Loader from "components/Loader";
import moment from "moment";
function LiveClassData() {
  let weekDay = new Date();
  weekDay.setDate(weekDay.getDate() - 7);
  console.log(weekDay);

  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [birthdayCount, setBirthdayCount] = useState();
  const [newUsers, setNewUsers] = useState([]);
  const toast = useToast();
  const getData = async () => {
    try {
      let data = await services.DashboardService.getLiveClasData();
      data = data.response;
      if (!data.length) {
        throw Error("Class not Found");
        return;
      }
      let today = new Date();
      var nowMonth = today.getMonth() + 1;
      var nowDay = today.getDate();
      let newMembers = [];
      let userBirthday = 0;
      let allUsers =
        data &&
        data.map((user) => {
          let birthdayMonth = new Date(moment(user.birthday)).getMonth() + 1;
          let birthday = new Date(moment(user.birthday)).getDate();
          if (nowMonth == birthdayMonth && nowDay == birthday) {
            userBirthday = userBirthday + 1;
            user["isBirthday"] = true;
          } else {
            user["isBirthday"] = false;
          }

          if (new Date(user.created_at) >= weekDay) {
            user["isNew"] = true;
            newMembers.push(user);
          } else {
            user["isNew"] = false;
          }

          return user;
        });
      setBirthdayCount(userBirthday);

      console.log(allUsers);
      setNewUsers(newMembers);
      setUsers(allUsers);
      setIsLoading(false);
    } catch (err) {
      toast.add(
        "tr",
        "danger",
        err.message || err?.response?.data?.code || "Something went wrong"
      );
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return !isLoading ? (
    <>
      <Container fluid>
        <Row>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="fa fa-star text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Ranked Users</p>
                      <Card.Title as="h4">{users && users.length}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fa fa-star mr-1"></i>
                  Ranked Users
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="fa fa-users text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">New Users</p>
                      <Card.Title as="h4">
                        {newUsers && newUsers.length}
                      </Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fa fa-users mr-1"></i>
                  Today
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="fa fa-birthday-cake text-danger"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Birthdays</p>
                      <Card.Title as="h4">{birthdayCount}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fa fa-birthday-cake mr-1"></i>
                  Today
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="fa fa-trophy text-primary"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Trophies</p>
                      <Card.Title as="h4">0</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fa fa-trophy mr-1"></i>
                  Trophies
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>{" "}
      {users.length ? (
        <Container fluid className="instructor-dashboard">
          <Row>
            <Col sm="6">
              <h3>Ranked Users</h3>
              {users?.map((user, key) => (
                <Card className="card-stats mb-1">
                  <Card.Body className="mb-3">
                    <div className="d-flex align-items-center">
                      <span className="dashboard-user-number">{key + 1}</span>
                      <div className="flex-grow-1">
                        <h6 className="user-name">{user.full_name}</h6>
                        <span className="classes">classes</span>{" "}
                        <span> {user.totalClasses}</span>
                      </div>
                      {user.isBirthday ? (
                        <div>
                          <img
                            src={require("assets/img/birthday.png").default}
                            height="30px"
                            width="30px"
                          />
                        </div>
                      ) : null}
                      {user.trophyData && user.trophyData[0].icon ? (
                        <div>
                          <img
                            src={user.trophyData[0].icon}
                            height="45"
                            width="45"
                          />
                        </div>
                      ) : null}
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </Col>

            <Col sm="6">
              <h3>New Users</h3>
              {newUsers?.map((user, key) => (
                <Card className="card-stats mb-1">
                  <Card.Body className="mb-3">
                    <div className="d-flex align-items-center">
                      <span className="dashboard-user-number">{key + 1}</span>
                      <div className="flex-grow-1">
                        <h6 className="user-name">{user.full_name}</h6>
                        <span>
                          Joined{" "}
                          {weekDay.getDay() -
                            new Date(user.created_at).getDay()}{" "}
                          days ago
                        </span>
                      </div>

                      <div className="text-center">
                        <h6>classes</h6>
                        <b> {user.totalClasses}</b>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </Col>
          </Row>
        </Container>
      ) : null}
    </>
  ) : (
    <Loader />
  );
}

export default LiveClassData;
