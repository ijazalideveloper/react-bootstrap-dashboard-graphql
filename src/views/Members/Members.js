import React, { useState, useEffect } from "react";
import Pagination from 'react-bootstrap-4-pagination';
import { Card, Table, Container, Row, Col } from "react-bootstrap";

import { Link } from "react-router-dom";
import services from "services";
import { useToast } from "components/Toast";
import Loader from "components/Loader";
function Members() {

  let memberActionButtonStyle = {display: 'inline-block'}
  
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);

  const [paginationConfig, setPaginationConfig] = useState({});

  const [members, setMembers] = useState([]);

  const getData = async (search="",page=1,size=15) => {
    try {
      let data = await services.MemberService.getAllMembers(search,page,size);
      let members = data.response.data;
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
      setMembers(members);

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
            <h2>Members</h2>
          </div>
          <div className="col-auto">
          <input className="form-control" onKeyDown={_handleKeyDown} classtype="text" name="search"/>

            {/* <Link
              to="/admin/member/create"
              className="btn btn-fill  btn-primary"
            >
              <i className="nc-icon nc-simple-add mr-2"></i>
              Add new
            </Link> */}
          </div>
        </Row>
        <Row>
          <Col md="12">
            {members.length ? (
              <Card className="strpied-tabled-with-hover">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Phone</th>
                      <th className="border-0">Email</th>
                      <th className="border-0">Address</th>
                      <th className="border-0">Go</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members?.map((item, key) => (
                      <tr>
                        <td>{item.id}</td>
                        <td>{item.fullName}</td>
                        <td>{item.phone}</td>

                        <td>{item.email}</td>
                        <td>{item.address}</td>

                        <td>
                          
                          <Link  to={`/admin/member/${item.id}/attendance`}>
                            <i style={memberActionButtonStyle}
 className="fa fa-book" color="primary"></i>
                          </Link>

                          <Link to={`/admin/member/${item.id}/edit`}>
                            <i 
                              style={memberActionButtonStyle}
                              className="fa fa-user"
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
              <p>No Member Found</p>
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

export default Members;
