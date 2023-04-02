import React, { useState } from "react";
import { Link } from "react-router-dom";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Modal,
  Table,
} from "react-bootstrap";

function PreAuth() {
  return (
    <>
      <Container fluid>
        <div className="d-flex">
          <div className="col px-0">
            <h2 className="mb-0 mt-0">
              <strong>Pre Auth</strong>
            </h2>
          </div>
          <div className="col-auto px-0 mb-2">
            <Link
              to="/admin/pre-auth-form"
              className="btn btn-fill  btn-primary"
            >
              <i className="nc-icon nc-simple-add mr-2"></i>
              Add new
            </Link>
          </div>
        </div>
        <div className="box">
          <div className="mb-3 d-flex justify-content-end form-group">
            <input
              className="border rounded p-2 col-md-3"
              type="text"
              placeholder="Search.."
            />
          </div>
          <div className="box-body table-responsive strpied-tabled-with-hover card">
            <table className="table-hover table">
              <tbody>
                <tr>
                  <th>#</th>
                  <th>Work</th>
                  <th>Progress</th>
                  <th>Label</th>
                </tr>
                <tr>
                  <td>1.</td>
                  <td>Install New Software</td>
                  <td>
                    <div className="progress progress-xs">
                      <div className="progress-bar progress-bar-danger"></div>
                    </div>
                  </td>
                  <td>
                    <span className="badge bg-red">55%</span>
                  </td>
                </tr>
                <tr>
                  <td>2.</td>
                  <td>Upload new SQL file</td>
                  <td>
                    <div className="progress progress-xs">
                      <div className="progress-bar progress-bar-yellow"></div>
                    </div>
                  </td>
                  <td>
                    <span className="badge bg-yellow">70%</span>
                  </td>
                </tr>
                <tr>
                  <td>3.</td>
                  <td>Cron job running</td>
                  <td>
                    <div className="progress progress-xs progress-striped active">
                      <div className="progress-bar progress-bar-primary"></div>
                    </div>
                  </td>
                  <td>
                    <span className="badge bg-light-blue">30%</span>
                  </td>
                </tr>
                <tr>
                  <td>4.</td>
                  <td>Fix and remove bugs</td>
                  <td>
                    <div className="progress progress-xs progress-striped active">
                      <div className="progress-bar progress-bar-success"></div>
                    </div>
                  </td>
                  <td>
                    <span className="badge bg-green">90%</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="box-footer clearfix">
            <ul className="pagination d-flex justify-content-end">
              <li className="page-item">
                <a className="page-link" href="#">
                  Previous
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item active">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </>
  );
}

export default PreAuth;
