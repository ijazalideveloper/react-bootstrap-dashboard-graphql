import React, { useState, useEffect } from "react";
import Pagination from 'react-bootstrap-4-pagination';
import { Card, Table, Container, Row, Col } from "react-bootstrap";

import { Link } from "react-router-dom";
import services from "services";
import { useToast } from "components/Toast";
import { useDispatch } from "react-redux";
import Loader from "components/Loader";

import { getAllClasses } from "redux/actions/classActions";

function Classes() {
  const toast = useToast();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [classes, setClasses] = useState([]);
  const [paginationConfig, setPaginationConfig] = useState({});

  const getData = async (search, page) => {
    try {
      let data = await services.ClassService.getAllClasses(search, page);
      
      let classes = data.response.data;
      let pagination = data.response.pagination;
      let paginationConfig = {
        totalPages: pagination.totalPages,
        currentPage: pagination.page,
        showMax: pagination.page == pagination.totalPages ? 1 : 10,
        threeDots: true,
        prevNext: true,
        disabledClass: "pagination-disabled-item",
        activeBorderColor: '#78c043',
        activeBgColor: '#78c043',
        color: '#3e5569',
        onClick: function (pageNumber) {
          if( pageNumber > pagination.totalPages)
            return;
          getData(search, pageNumber)
        }
      };
      setPaginationConfig(paginationConfig); 
      dispatch(getAllClasses(classes));
      setClasses(classes);
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

  const _handleKeyDown = (event) =>{
    if (event.key === 'Enter') {
      getData( event.target.value )
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return !isLoading ? (
    <>
      <Container fluid>
        <Row>
          <div className="col">
            <h2>Classes</h2>
          </div>
          <div className="col-auto">
            <Link
              to="/admin/classes/create"
              className="btn btn-fill  btn-primary"
            >
              <i className="nc-icon nc-simple-add mr-2"></i>
              Add new
            </Link>
            <br/>
            <br/>
            <input className="form-control" placeholder="search classes" onKeyDown={_handleKeyDown} classtype="text" name="search"/>
          </div>
        </Row>
        <Row>
          <Col md="12">
            {" "}
            {classes.length ? (
              <Card className="strpied-tabled-with-hover">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th className="">ID</th>
                      <th className="">Name</th>
                      <th className="">Class Type</th>
                      {/* <th className="">Start Date</th>
                    <th className="">End Date</th> */}
                      <th>Go</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classes?.map((cl, key) => (
                      <tr key={key}>
                        <td>{cl.id}</td>
                        <td>{cl.name}</td>
                        <td>{cl.classType?.name}</td>

                        <td>
                          <Link to={`/admin/classes/${cl.id}/edit`}>
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
              <p>No Class Found</p>
            )}
          </Col>
        </Row>
        {
          paginationConfig.totalPages !=0 && (  <Pagination {...paginationConfig} />)
        }
      </Container>
    </>
  ) : (
    <Loader />
  );
}
export default Classes;
