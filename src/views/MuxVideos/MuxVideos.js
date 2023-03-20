import React, { useState, useEffect } from "react";
// react-bootstrap components
import Pagination from 'react-bootstrap-4-pagination';
import { Card, Table, Container, Row, Col } from "react-bootstrap";

import { Link } from "react-router-dom";
import services from "services";
import { useSelector, useDispatch } from "react-redux";
import { useToast } from "components/Toast";
import Loader from "components/Loader";

function MuxVideos() {

  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);

  const [paginationConfig, setPaginationConfig] = useState({});

  const [videos, setvideos] = useState([]);

  const getData = async (search="",page=1,size=10) => {
    try {
      let data = await services.MuxService.getAllVideos(search, page, size);
      let videos = data.response.data;
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
          getData(search,pageNumber)
        }
      };
      setPaginationConfig(paginationConfig); 
      setvideos(videos);

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
            <h2>videos</h2>
          </div>
          <div className="col-auto">
            <Link
              to="/admin/create-muxvideos"
              className="btn btn-fill  btn-primary"
            >
              <i className="nc-icon nc-simple-add mr-2"></i>
              Add new
            </Link>
            <br/>
            <br/>
            <input className="form-control" placeholder="search videos" onKeyDown={_handleKeyDown} classtype="text" name="search"/>
          </div>
        </Row>
        <Row>
          <Col md="12">
            {videos.length ? (
              <Card className="strpied-tabled-with-hover">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Title</th>
                      <th className="border-0">Status</th>
                      <th className="border-0">Timestamps</th>
                    </tr>
                  </thead>
                  <tbody>
                    {videos?.map((item, key) => (
                      <tr>
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                        <td>{item.status}</td>
                        <td>Created at: {item.created_at}<br></br>Updated at:{item.updated_at}</td>
                        {/* <td>
                          { item.status == "pending" ? 
                          <Link  to={`/admin/videos/${item.id}/edit`}>
                            <i style={memberActionButtonStyle}
 className="fa fa-book" color="primary"></i>
                          </Link> : "pendng "}

                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card>
            ) : (
              <p>No videos found</p>
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

export default MuxVideos;
