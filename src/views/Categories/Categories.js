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
import { ReactSortable } from "react-sortablejs";

function Categories() {
  const toast = useToast();

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  let newIDX = []
  const [categories, setCategories] = useState([{}]);
  const [oldIDX, setOldIdx] = useState([]);
  const [reOrderedList, setReOrderedList] = useState([]);
  const [ordering, setOrdering] = useState(false)

  const getData = async () => {
    try {
      let data = await services.CategoryService.getAllCategories();
      let categories = data.response;
      let tempArr = []
      categories.forEach((e, idx) => {
        tempArr.push(e.id)
      });
      setCategories(categories);
      setOldIdx(tempArr);
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


  useEffect(() => {
    categories.forEach((e, idx) => {
      newIDX.push({id: e.id, idx: idx, sortOrder: e.sortOrder})
    });
    // diFa = difference of old and new indexes
    let diFA = []
    let reOrder = []
    newIDX.forEach((e, idx) => {
      diFA.push(oldIDX.indexOf(e.id))
    })
    let newSortOrder = 0;
    newIDX.forEach((e, idx) => {
      newSortOrder = e.sortOrder + (diFA[idx] - e.idx)
      reOrder.push({id: e.id, sortOrder: newSortOrder})
    });
    setReOrderedList(reOrder);
  }, [categories]);

  const saveNewOrder = async () => {
    let data = await services.CategoryService.reorderCategories(reOrderedList);
    setOrdering(false);
    toast.add(
      'tr',
      'success',
      data.response.data
    );
  };
  return !isLoading ? (
    <>
      <Container fluid>
        <Row>
          <div className="col">
            <h2>Categories</h2>
          </div>
          <div className="col-auto">
            <Link
              to="/admin/category/create"
              className="btn btn-fill  btn-primary"
            >
              <i className="nc-icon nc-simple-add mr-2"></i>
              Add new
            </Link>
          </div>
          {/* {reordered && <div className="col-auto"> */}
          {<div className="col-auto">
            <Button
            onClick={() => ordering ? saveNewOrder() : setOrdering(!ordering)}
            >
              {ordering ? 'Save Order' : '⇅ Change Order'}
            </Button>
          </div>}
        </Row>

        <Row>
          <Col md="12">
            {categories.length ? (
              <Card className="strpied-tabled-with-hover">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Image</th>
                      <th className="border-0">Name</th>

                      <th className="border-0">Go</th>
                    </tr>
                  </thead>
                    <ReactSortable tag="tbody" list={categories} setList={ordering ? setCategories : () => {}}>
                    {categories?.map((cat, key) => (
                      <tr key={key}>
                        <td>{cat.id}</td>
                        <td>
                          <img
                            src={
                              cat.icon
                              ? cat.icon
                              : require("assets/img/image.png").default
                            }
                            height="70px"
                            width="70px"
                            />
                        </td>
                        <td>{cat.name}</td>

                        <td>
                          <Link to={`/admin/category/${cat.id}/edit`}>
                            <i
                              className="fa fa-arrow-right"
                              color="primary"
                              ></i>
                          </Link>
                        </td>
                      </tr>
                    ))}
                    </ReactSortable>
                </Table>
              </Card>
            ) : (
              <p> No Category Found</p>
            )}
          </Col>
        </Row>
      </Container>
    </>
  ) : (
    <Loader />
  );
}

export default Categories;
