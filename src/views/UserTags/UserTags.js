import React, { useState, useEffect } from "react";
// react-bootstrap components
import { Card, Table, Container, Row, Col } from "react-bootstrap";
import services from "services";
import { Link } from "react-router-dom";
import { useToast } from "components/Toast";
import Loader from "components/Loader";

const UserTags = () => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [tags, setTags] = useState([]);
  const getData = async (page) => {
    try {
      let data = await services.UserTagsService.getUserTags(page);
      let tags = data.response?.data;
      setTags(tags);
    } catch (err) {
      toast.add(
        "tr",
        "danger",
        err?.response?.data?.code + "Something went wrong"
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
            <h2>User Tags</h2>
          </div>
          <div className="col-auto">
            <Link
              to="/admin/usertag/create"
              className="btn btn-fill  btn-primary"
            >
              <i className="nc-icon nc-simple-add mr-2"></i>
              Add new
            </Link>
          </div>
        </Row>
        <Row>
          <Col md="12">
            {tags.length ? (
              <Card className="strpied-tabled-with-hover">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">No. of Members</th>
                      <th className="border-0">Go</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tags?.map((cat, key) => (
                      <tr key={key}>
                        <td>{cat.id}</td>
                        <td>{cat.name}</td>
                        <td>{cat.memberCount}</td>
                        <td>
                          <Link to={`/admin/usertag/${cat.id}/edit`}>
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
              <p>No User Tag Found</p>
            )}
          </Col>
        </Row>
      </Container>
    </>
  ) : (
    <Loader />
  );
};

export default UserTags;
