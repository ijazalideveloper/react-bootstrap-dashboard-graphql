import Classes from "views/Classes/Classes.js";
import CreateOrEditClass from "views/Classes/createOrEdit";
import Categories from "views/Categories/Categories.js";
import Members from "views/Members/Members.js";
import Teams from "views/Teams/Teams.js";
import Users from "views/User/Users.js";
import MemberAttendance from 'views/Members/attendance.js'
import MuxVideoCreateOrUpdate from "views/MuxVideos/CreateEdit"
import Foods from "views/Foods/Food";
import AddOrEditFood from "views/Foods/createOrEdit";
import FoodCategories from "views/FoodsCategories/FoodCategories";
import AddOrEditFoodCat from 'views/FoodsCategories/createOrEdit';

import UserTags from 'views/UserTags/UserTags';
import AddOrEditUserTag from 'views/UserTags/createOrEdit';

const appRoutes = [
  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   icon: "fa fa-chart-pie",
  //   component: Dashboard,
  //   layout: "/admin",
  // },
  // {
  //   path: "/profile",
  //   name: "User Profile",
  //   icon: "fa fa-user-circle",
  //   component: UserProfile,
  //   layout: "/admin",
  // },
  {
    path: "/users",
    name: "Users",
    icon: "fa fa-users",
    component: Users,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "Ijaz",
    icon: "fa fa-users",
    component: Users,
    layout: "/admin",
  },
  {
    path: '/members/:id/attendance',
    name: 'Members - Attendance',
    icon: '',
    component: MemberAttendance,
    layout: '/admin',
    hidden: true,
  },
  {
    path: "/create-muxvideos",
    name: "Create / Update Mux Video",
    icon: "",
    component: MuxVideoCreateOrUpdate,
    layout: "/admin",
    exact: true,
    hidden: true
  },
  {
    path: "/members",
    name: "Members",
    icon: "fa fa-people-carry",
    component: Members,
    layout: "/admin",
  },
  {
    path: "/classes",
    name: "Classes",
    icon: " fa fa-cubes",
    component: Classes,
    layout: "/admin",
  },
  {
    path: "/admin/class/create",
    name: "Create Class",
    icon: "fa fa-list",
    component: CreateOrEditClass,
    exact: true,
    hidden: true,
  },
  {
    path: "/admin/class/:id/edit",
    name: "Class",
    icon: "fa fa-list",
    component: CreateOrEditClass,
    hidden: true,
  },

    // ********** food section *************
    {
      path: "/foods",
      name: "Foods",
      icon: "fa fa-utensils",
      component: Foods,
      layout: "/admin",
    },
    {
      path: "/admin/food/create",
      name: "Create Food",
      icon: "fa fa-list",
      component: AddOrEditFood,
      exact: true,
      hidden: true,
    },
    {
      path: "/admin/food/:id/edit",
      name: "Food",
      icon: "fa fa-list",
      component: AddOrEditFood,
      hidden: true,
    },
  // -----------
    {
      path: "/food-cat",
      name: "Foods Categories",
      icon: "fa fa-utensils",
      component: FoodCategories,
      layout: "/admin",
    },
    {
      path: "/admin/food-cat/create",
      name: "Create Food Category",
      icon: "fa fa-list",
      component: AddOrEditFoodCat,
      exact: true,
      hidden: true,
    },
    {
      path: "/admin/food-cat/:id/edit",
      name: "Food Category",
      icon: "fa fa-list",
      component: AddOrEditFoodCat,
      hidden: true,
    },
      // ********** food section ends *************
  // ********** user tags starts *************
    {
      path: "/usertag",
      name: "User Tags",
      icon: "fa fa-utensils",
      component: UserTags,
      layout: "/admin",
    },
    {
      path: "/admin/usertag/create",
      name: "Create Food Category",
      icon: "fa fa-list",
      component: AddOrEditFoodCat,
      exact: true,
      hidden: true,
    },
    {
      path: "/admin/usertag/:id/edit",
      name: "User Tag",
      icon: "fa fa-list",
      component: AddOrEditUserTag,
      hidden: true,
    },
      // ********** user tags ends *************
  
  {
    path: "/categories",
    name: "Categories",
    icon: "fa fa-list",
    component: Categories,
    layout: "/admin",
  },
  {
    path: "/teams",
    name: "Teams",
    icon: "fa fa-american-sign-language-interpreting",
    component: Teams,
    layout: "/admin",
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-atom",
  //   component: Icons,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "nc-icon nc-pin-3",
  //   component: Maps,
  //   layout: "/admin",
  // },
];

export default appRoutes;
