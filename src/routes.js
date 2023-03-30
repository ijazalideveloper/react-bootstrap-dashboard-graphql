/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import Providers from './views/Providers';
import Beneficary from './views/Beneficary';

import AddProvider from "views/Providers/AddProvider";
import PriceList from "views/PriceList/Price_list";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/add-provider",
    name: "Add Provider",
    icon: "nc-icon nc-circle-09",
    component: AddProvider,
    layout: "/admin"
  },
  {
    path: "/beneficary",
    name: "Beneficary",
    icon: "nc-icon nc-circle-09",
    component: Beneficary,
    layout: "/admin"
  },

  {
    path: "/add-price-list",
    name: "Add Price List",
    icon: "nc-icon nc-circle-09",
    component: PriceList,
    layout: "/admin"
  },
];

export default dashboardRoutes;
