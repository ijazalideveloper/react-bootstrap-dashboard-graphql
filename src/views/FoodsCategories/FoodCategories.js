import React, { useState, useEffect } from "react";
// react-bootstrap components
import { Card, Table, Container, Row, Col } from "react-bootstrap";
import services from "services";
import { Link } from "react-router-dom";
import { useToast } from "components/Toast";
import Loader from "components/Loader";

const FoodCategories = () => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const getData = async (page) => {
    try {
      let data = await services.FoodCategoriesService.getFoodCategories(page);
      let categories = data.response;
      setCategories(categories);
    } catch (err) {
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
            <h2>Food Categories</h2>
          </div>
          <div className="col-auto">
            <Link
              to="/admin/food-cat/create"
              className="btn btn-fill  btn-primary"
            >
              <i className="nc-icon nc-simple-add mr-2"></i>
              Add new
            </Link>
          </div>
        </Row>
        <Row>
          <Col md="12">
            {categories.data.length ? (
              <Card className="strpied-tabled-with-hover">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Image</th>
                      <th className="border-0">Title</th>

                      <th className="border-0">Go</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.data?.map((cat, key) => (
                      <tr key={key}>
                        <td>{cat.id}</td>
                        <td>
                          <img
                            src={
                              cat.image
                                ? cat.image
                                : require("assets/img/image.png").default
                            }
                            height="70px"
                            width="70px"
                          />
                        </td>
                        <td>{cat.title}</td>
                        <td>
                          <Link to={`/admin/food-cat/${cat.id}/edit`}>
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
              <p>No Food Category Found</p>
            )}
          </Col>
        </Row>
      </Container>
    </>
  ) : (
    <Loader />
  );
}

export default FoodCategories;
