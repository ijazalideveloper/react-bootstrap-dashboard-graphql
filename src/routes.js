import Dashboard from "views/Dashboard/Dashboard";
import Classes from "views/Classes/Classes.js";
import AddOrEditClass from "views/Classes/createOrEdit";
import Categories from "views/Categories/Categories.js";
import AddOrEditCat from "views/Categories/createOrEdit";
import Members from "views/Members/Members.js";
import AddOrEditMember from "views/Members/createOrEdit";
import MemberAttendance from "views/Members/MemberAttendance";
import Teams from "views/Teams/Teams.js";
import AddOrEditTeam from "views/Teams/createOrEdit";
import Users from "views/Users/Users";
import AddOrEditUser from "views/Users/createOrEdit";
import AddOrEditRecipe from "views/Recipes/createOrEdit";
import Recipes from "views/Recipes/Recipes";
import RecipeCategories from "views/RecipeCategories/RecipeCategories";
import AddOrEditRecipeCat from "views/RecipeCategories/createOrEdit";
import DietPlans from "views/DietPlans/DietPlan";
import AddOrEditDietPlan from "views/DietPlans/createOrEdit";
import Controlls from "views/Controlls/Controlls";
import MuxVideos from "views/MuxVideos/MuxVideos";
import MuxVideoCreateOrUpdate from "views/MuxVideos/CreateEdit";
import Foods from "views/Foods/Food";
import AddOrEditFood from "views/Foods/createOrEdit";
import FoodCategories from "views/FoodsCategories/FoodCategories";
import AddOrEditFoodCat from "views/FoodsCategories/createOrEdit";

import UserTags from "views/UserTags/UserTags";
import AddOrEditUserTag from "views/UserTags/createOrEdit";
import Banners from "views/Banners/Banners";
import AddOrEditBanner from "views/Banners/createOrEdit";
import Patient from "views/Patient/Patient";
import AddOrEditPatient from "./views/Patient/createOrEdit";
import Care from "./views/Care/Care";
import AddOrEditCare from "views/Care/createOrEdit";

const dashboardRoutes = [
  // {
  //   path: "/dashboard",
  //   name: "Instructor Dashboard",
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
    path: "/users/create",
    name: "Create User",
    icon: "fa fa-list",
    component: AddOrEditUser,
    layout: "/admin",
    exact: true,
    hidden: true,
  },
  {
    path: "/users/:id/edit",
    name: "User",
    layout: "/admin",
    icon: "fa fa-list",
    component: AddOrEditUser,
    hidden: true,
  },
  {
    path: "/users",
    name: "Providers",
    icon: "fa fa-users",
    component: Users,
    layout: "/admin",
  },
  // {
  //   path: "/member/:memberId/attendance",
  //   name: "Member Attendance",
  //   icon: "fa fa-list",
  //   component: MemberAttendance,
  //   layout: "/admin",
  //   hidden: true
  // },
  // {
  //   path: "/member/create",
  //   name: "Create UseMemberr",
  //   icon: "fa fa-list",
  //   component: AddOrEditMember,
  //   layout: "/admin",
  //   exact: true,
  //   hidden: true,
  // },
  // {
  //   path: "/member/:id/edit",
  //   name: "Member",
  //   layout: "/admin",
  //   icon: "fa fa-list",
  //   component: AddOrEditMember,
  //   hidden: true,
  // },
  // {
  //   path: "/members",
  //   name: "Members",
  //   icon: "fa fa-people-carry",
  //   component: Members,
  //   layout: "/admin",
  // },
  // {
  //   path: "/category/create",
  //   name: "Create Cat",
  //   icon: "fa fa-list",
  //   component: AddOrEditCat,
  //   layout: "/admin",
  //   exact: true,
  //   hidden: true,
  // },
  // {
  //   path: "/category/:id/edit",
  //   name: "Cat",
  //   layout: "/admin",
  //   icon: "fa fa-list",
  //   component: AddOrEditCat,
  //   hidden: true,
  // },

  // {
  //   path: "/categories",
  //   name: "Class Categories",
  //   icon: "fa fa-list",
  //   component: Categories,
  //   layout: "/admin",
  // },
  // {
  //   path: "/classes/create",
  //   name: "Create Class",
  //   icon: "fa fa-list",
  //   component: AddOrEditClass,
  //   layout: "/admin",
  //   exact: true,
  //   hidden: true,
  // },
  // {
  //   path: "/classes/:id/edit",
  //   name: "Class",
  //   layout: "/admin",
  //   icon: "fa fa-list",
  //   component: AddOrEditClass,
  //   hidden: true,
  // },
  // {
  //   path: "/classes",
  //   name: "Classes",
  //   icon: " fa fa-cubes",
  //   component: Classes,
  //   layout: "/admin",
  // },

  // ********** food section *************
  // {
  //   path: "/food/create",
  //   name: "Create Food",
  //   icon: "fa fa-list",
  //   component: AddOrEditFood,
  //   layout: "/admin",
  //   exact: true,
  //   hidden: true,
  // },
  // {
  //   path: "/food/:id/edit",
  //   name: "Food",
  //   layout: "/admin",
  //   icon: "fa fa-list",
  //   component: AddOrEditFood,
  //   hidden: true,
  // },
  // {
  //   path: "/foods",
  //   name: "Foods",
  //   icon: "fa fa-utensils",
  //   component: Foods,
  //   layout: "/admin",
  // },
  // -----------
  // {
  //   path: "/food-cat/create",
  //   name: "Create Food Category",
  //   icon: "fa fa-list",
  //   component: AddOrEditFoodCat,
  //   layout: "/admin",
  //   exact: true,
  //   hidden: true,
  // },
  // {
  //   path: "/food-cat/:id/edit",
  //   name: "Food Category",
  //   layout: "/admin",
  //   icon: "fa fa-list",
  //   component: AddOrEditFoodCat,
  //   hidden: true,
  // },
  // {
  //   path: "/food-cat",
  //   name: "Foods Categories",
  //   icon: "fa fa-utensils",
  //   component: FoodCategories,
  //   layout: "/admin",
  // },
  // ********** food section ends *************
  // ********** user tags starts *************
  // {
  //   path: "/usertag/create",
  //   name: "Create User Tag",
  //   icon: "fa fa-list",
  //   component: AddOrEditUserTag,
  //   layout: "/admin",
  //   exact: true,
  //   hidden: true,
  // },
  // {
  //   path: "/usertag/:id/edit",
  //   name: "User Tag",
  //   layout: "/admin",
  //   icon: "fa fa-list",
  //   component: AddOrEditUserTag,
  //   hidden: true,
  // },
  // {
  //   path: "/usertag",
  //   name: "User Tags",
  //   icon: "fa fa-list",
  //   component: UserTags,
  //   layout: "/admin",
  // },
  // ********** user tags ends *************

  // {
  //   path: "/muxvideos",
  //   name: "Videos (mux)",
  //   icon: "fa fa-people-carry",
  //   // component: MuxVideoCreateOrUpdate,
  //   component: MuxVideos,
  //   layout: "/admin"
  // },
  // {
  //   path: "/create-muxvideos",
  //   name: "Create / Update Mux Video",
  //   icon: "fa fa-people-carry",
  //   component: MuxVideoCreateOrUpdate,
  //   layout: "/admin",
  //   hidden: true,
  //   exact: true
  // },
  // {
  //   path: "/teams/create",
  //   name: "Create Team",
  //   icon: "fa fa-list",
  //   component: AddOrEditTeam,
  //   layout: "/admin",
  //   exact: true,
  //   hidden: true,
  // },
  // {
  //   path: "/teams/:id/edit",
  //   name: "Team",
  //   layout: "/admin",
  //   icon: "fa fa-list",
  //   component: AddOrEditTeam,
  //   hidden: true,
  // },
  // {
  //   path: "/teams",
  //   name: "Teams",
  //   icon: "fa fa-american-sign-language-interpreting",
  //   component: Teams,
  //   layout: "/admin",
  // },
  // {
  //   path: "/recipe-category/create",
  //   name: "Create Recipe Category",
  //   icon: "fa fa-list",
  //   component: AddOrEditRecipeCat,
  //   layout: "/admin",
  //   exact: true,
  //   hidden: true,
  // },
  // {
  //   path: "/recipe-category/:id/edit",
  //   name: "Category",
  //   layout: "/admin",
  //   icon: "fa fa-utensils",
  //   component: AddOrEditRecipeCat,
  //   hidden: true,
  // },

  // {
  //   path: "/recipe-categories",
  //   name: "Recipe Categories",
  //   icon: "fa fa-utensils",
  //   component: RecipeCategories,
  //   layout: "/admin",
  // },
  // {
  //   path: "/recipe/create",
  //   name: "Create Recipe",
  //   icon: "fa fa-list",
  //   component: AddOrEditRecipe,
  //   layout: "/admin",
  //   exact: true,
  //   hidden: true,
  // },
  // {
  //   path: "/recipe/:id/edit",
  //   name: "Category",
  //   layout: "/admin",
  //   icon: "fa fa-list",
  //   component: AddOrEditRecipe,
  //   hidden: true,
  // },
  // {
  //   path: "/recipes",
  //   name: "Recipes",

  //   component: Recipes,
  //   layout: "/admin",
  // },
  // {
  //   path: "/diet-plan/create",
  //   name: "Diet Plan Shifts",
  //   component: AddOrEditDietPlan,
  //   layout: "/admin",
  //   exact: true,
  //   hidden: true,
  // },
  // {
  //   path: "/diet-plan/:id/edit",
  //   name: "Diet Plans",
  //   layout: "/admin",
  //   iconName: "dietPlan",
  //   component: AddOrEditDietPlan,
  //   hidden: true,
  // },

  // {
  //   path: "/diet-plans",
  //   name: "Diet Plans",
  //   component: DietPlans,
  //   layout: "/admin",
  // },
  // {
  //   path: "/controls",
  //   name: "Controls",
  //   component: Controlls,
  //   icon: "fa fa-list",
  //   layout: "/admin",
  // },

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

  // ********** Banner START *************
  // {
  //   path: "/banner/create",
  //   name: "Create Banner",
  //   icon: "fa fa-list",
  //   component: AddOrEditBanner,
  //   layout: "/admin",
  //   exact: true,
  //   hidden: true,
  // },
  // {
  //   path: "/banner/:id/edit",
  //   name: "Banner",
  //   layout: "/admin",
  //   icon: "fa fa-list",
  //   component: AddOrEditBanner,
  //   hidden: true,
  // },
  // {
  //   path: "/banners",
  //   name: "Banners",
  //   icon: " fa fa-cubes",
  //   component: Banners,
  //   layout: "/admin",
  // },
  // ********** Banner END *************

  {
    path: "/patient/create",
    name: "Create Patient",
    icon: "fa fa-list",
    component: AddOrEditPatient,
    layout: "/admin",
    exact: true,
    hidden: true,
  },
  {
    path: "/patient/:id/edit",
    name: "Patient",
    layout: "/admin",
    icon: "fa fa-list",
    component: AddOrEditPatient,
    hidden: true,
  },
  {
    path: "/patient",
    name: "Patient",
    icon: "fa fa-users",
    component: Patient,
    layout: "/admin",
  },

  {
    path: "/care/create",
    name: "Create Care",
    icon: "fa fa-list",
    component: AddOrEditCare,
    layout: "/admin",
    exact: true,
    hidden: true,
  },
  {
    path: "/care/:id/edit",
    name: "Care",
    layout: "/admin",
    icon: "fa fa-list",
    component: AddOrEditCare,
    hidden: true,
  },
  {
    path: "/care",
    name: "Care",
    icon: "fa fa-users",
    component: Care,
    layout: "/admin",
  },
];

export default dashboardRoutes;
