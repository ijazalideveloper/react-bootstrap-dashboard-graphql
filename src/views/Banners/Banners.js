import React, { useState, useEffect } from 'react'
import Pagination from 'react-bootstrap-4-pagination'
import { Card, Table, Container, Row, Col } from 'react-bootstrap'

import { Link } from 'react-router-dom'
import services from 'services'
import { useToast } from 'components/Toast'
import { useDispatch } from 'react-redux'
import Loader from 'components/Loader'

function Banners() {
  const toast = useToast()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const [bannersList, setBannersList] = useState([])
  const [paginationConfig, setPaginationConfig] = useState({})

  const getData = async (page=1,limit=10) => {
    try {
      let data = await services.BannerService.getAllBannersList(page,limit);
      let bannersList = data?.response?.data?.banners;
      
      let pagination = data.response.data.pagination;
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
          getData(pageNumber)
        }
      };
      setPaginationConfig(paginationConfig); 
      setBannersList(bannersList);

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
    getData()
  }, [])

  return !isLoading ? (
    <>
      <Container fluid>
        <Row>
          <div className="col">
            <h2>Banners</h2>
          </div>
          <div className="col-auto">
            <Link
              to="/admin/banner/create"
              className="btn btn-fill  btn-primary"
            >
              <i className="nc-icon nc-simple-add mr-2"></i>
              Add new
            </Link>
            <br />
            <br />
          </div>
        </Row>
        <Row>
          <Col md="12">
            {bannersList.length ? (
              <Card className="strpied-tabled-with-hover">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Image</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">URl</th>
                      <th className="border-0">Go</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bannersList?.map((banner, key) => (
                      <tr key={key}>
                        <td>{banner.id}</td>
                        <td>
                          <img
                            src={
                              banner.imageUrl
                                ? banner.imageUrl
                                : require('assets/img/image.png').default
                            }
                            height="70px"
                            width="70px"
                          />
                        </td>
                        <td>{banner.name}</td>
                        <td>{banner.url}</td>
                        <td>
                          <Link to={`/admin/banner/${banner.id}/edit`}>
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
              <p>No Banner Found</p>
            )}
          </Col>
        </Row>
        {paginationConfig.totalPages != 0 && (
          <Pagination {...paginationConfig} />
        )}
      </Container>
    </>
  ) : (
    <Loader />
  )
}
export default Banners
