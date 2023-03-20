import React, { Component } from "react";
import { useLocation, NavLink } from "react-router-dom";

import { Nav } from "react-bootstrap";

function Sidebar({ color, image, routes }) {
  const location = useLocation();
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  return (
    <div className="sidebar" data-image={image} data-color={color}>
      <div
        className="sidebar-background"
        // style={{
        //   backgroundImage: "url(" + image + ")",
        // }}
      />
      <div className="sidebar-wrapper scrollbar">
        <div className="logo d-flex align-items-center justify-content-start">
          <a href="#" className="simple-text logo-mini mx-1">
            {/* <div className="logo-img">
              <img src={require("assets/img/logo.png").default} alt="..." />
            </div> */}
          </a>
          <a className="simple-text" href="#">
            Medical
          </a>
        </div>
        <Nav>
          {routes.map((prop, key) => {
            if (!prop.redirect) {
              return (
                <li
                  className={
                    prop.upgrade
                      ? "active active-pro"
                      : activeRoute(prop.layout + prop.path)
                  }
                  key={key}
                  style={{
                    display: prop.hidden ? "none" : "block",
                  }}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    {" "}
                    {prop.icon ? (
                      <i className={prop.icon} />
                    ) : (
                      <img
                        src={require(`assets/img/${prop.name}.png`).default}
                        alt="..."
                        style={{ marginRight: 10, width: 40, height: 40 }}
                      />
                    )}
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            }
            return null;
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
