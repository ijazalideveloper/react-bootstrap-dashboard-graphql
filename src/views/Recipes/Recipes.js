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

function Recipes() {
  const toast = useToast();

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const [recipes, setRecipes] = useState([]);
  const getData = async () => {
    try {
      let data = await services.RecipeService.getAllRecipes();
      let recipes = data.response;
      setRecipes(recipes);
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
            <h2>Recipes</h2>
          </div>
          <div className="col-auto">
            <Link
              to="/admin/recipe/create"
              className="btn btn-fill  btn-primary"
            >
              <i className="nc-icon nc-simple-add mr-2"></i>
              Add new
            </Link>
          </div>
        </Row>
        <Row>
          <Col md="12">
            {recipes.length ? (
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
                    {recipes?.map((cat, key) => (
                      <tr key={key}>
                        <td>{cat.id}</td>
                        <td>{cat.name}</td>

                        <td>
                          <Link to={`/admin/recipe/${cat.id}/edit`}>
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
              <p>No Recipe Found</p>
            )}
          </Col>
        </Row>
      </Container>
    </>
  ) : (
    <Loader />
  );
}

export default Recipes;
