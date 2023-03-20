import React, { useState, useEffect } from "react";
import Pagination from "react-bootstrap-4-pagination";
import { Card, Table, Container, Row, Col, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import services from "services";
import { useToast } from "components/Toast";
import Loader from "components/Loader";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const Foods = () => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [foods, setFoods] = useState([]);
  // const [initialValues, setInitialValues] = useState({});
  const [paginationConfig, setPaginationConfig] = useState({});
  const animatedComponents = makeAnimated();
  const [categoriesArr, setCategoriesArr] = useState([]);
  const [isFromDropDown, setIsFromDropDown] = useState(false);

  const getData = async (search = "", page = 1) => {
    setIsLoading(true);
    try {
      let data = await services.FoodService.getAllFoods(search, page);
      let foods = data.response.data;
      let pagination = data.response.pagination;
      let paginationConfig = {
        totalPages: pagination.totalPages,
        currentPage: pagination.page,
        showMax: pagination.page == pagination.totalPages ? 1 : 10,
        threeDots: true,
        prevNext: true,
        disabledClass: "pagination-disabled-item",
        activeBorderColor: "#78c043",
        activeBgColor: "#78c043",
        color: "#3e5569",
        onClick: function (pageNumber) {
          if (pageNumber > pagination.totalPages) return;
          getData(search, pageNumber);
        },
      };
      setPaginationConfig(paginationConfig);
      setFoods(foods);
    } catch (err) {
      toast.add(
        "tr",
        "danger",
        err.message || err?.response?.data?.code || "Something went wrong"
      );
    }
    setIsLoading(false);
  };

  const getCatData = async (catID) => {
    try {
      let data = await services.FoodCategoriesService.getFoodCategoryById(catID);
      setFoods(data?.response?.foods);
    } catch (err) {
      toast.add(
        "tr",
        "danger",
        err.message || err?.response?.data?.code || "Something went wrong"
      );
    }
  }

  const _handleKeyDown = event => {
    if (event.key === "Enter") {
      setIsFromDropDown(false);
      getData(event?.target?.value);
    }
  };

  const getFoodCats = async () => {
    try {
      let data = await services.FoodCategoriesService.getFoodCategories();
      let categoryArr = [];
      data?.response?.data?.forEach((element) => {
        categoryArr = [
          ...categoryArr,
          { value: element.id, label: element.title },
        ];
      });
      setCategoriesArr(categoryArr);
    } catch (err) {
      toast.add(
        "tr",
        "danger",
        err.message || err?.response?.data?.code || "Something went wrong"
      );
    }
  };

  useEffect(() => {
    getData();
    getFoodCats();
  }, []);
  return !isLoading ? (
    <>
      <Container fluid>
        <Row>
          <div className="col">
            <h2>Foods</h2>
            <Table style={{ width: "20px" }}>
              <tr>
                <td>
                  <div
                    className="col form-group"
                    style={{ width: "250px", paddingLeft: "0px" }}
                  >
                    <Select
                      name="categoryId"
                      closeMenuOnSelect={true}
                      components={animatedComponents}
                      placeholder={"Category"}
                      onChange={(selectedOption) => {
                        setIsFromDropDown(true);
                        getCatData(selectedOption.value);
                      }}
                      options={categoriesArr}
                    />
                  </div>
                </td>
                <td>
                  <button
                    className="btn btn-light mr-2  "
                    type="button"
                    onClick={() => {
                      getData();
                      setIsFromDropDown(false);
                    }}
                  >
                    Reset
                  </button>
                </td>
              </tr>
            </Table>
          </div>

          <div className="col-auto">
            <Table>
              <tr>
                <td>
                  <input
                    className="form-control"
                    onKeyDown={_handleKeyDown}
                    placeholder="Search"
                    classtype="text"
                    name="search"
                  />
                </td>
                <td>
                  <Link
                    to="/admin/food/create"
                    className="btn btn-fill  btn-primary"
                  >
                    <i className="nc-icon nc-simple-add mr-2"></i>
                    Add new
                  </Link>
                </td>
              </tr>
            </Table>
          </div>
        </Row>
        <Row>
          <Col md="12">
            {" "}
            {foods.length ? (
              <Card className="strpied-tabled-with-hover">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th className="">ID</th>
                      <th className="">Name</th>
                      <th className="">Portion Size</th>
                      <th className="">Weight(g)</th>
                      <th className="">{!isFromDropDown && "Category"}</th>
                      <th>Go</th>
                    </tr>
                  </thead>
                  <tbody>
                    {foods?.map((cl, key) => (
                      <tr key={key}>
                        <td>{cl.id}</td>
                        <td>{cl.name}</td>
                        <td>{cl.portionSize}</td>
                        <td>{cl.weight}</td>
                        <td>
                          {!isFromDropDown &&
                            cl.foodCategories[cl.foodCategories.length - 1]
                              ?.title}
                        </td>
                        <td>
                          <Link to={`/admin/food/${cl.id}/edit`}>
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
              <p>No Food Found</p>
            )}
          </Col>
        </Row>
        {!isFromDropDown && paginationConfig.totalPages != 0 && (
          <Pagination {...paginationConfig} />
        )}
      </Container>
    </>
  ) : (
    <Loader />
  );
}
export default Foods;
