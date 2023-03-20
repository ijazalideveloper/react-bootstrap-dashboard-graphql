/**
 * @format
 *
 * This index.js must include all services, combine them and export
 */

import http from "./http.services";
import AuthService from "./auth.service";
import ClassService from "./classes.service";
import UsersService from "./users.service";
import MemberService from "./members.service";
import TeamService from "./teams.service ";
import CategoryService from "./categories.service";
import RecipeService from "./recipes.service";
import DashboardService from "./dashboard.service";
import ValidateService from "./validate.service";
import DietPlanService from "./dietplans.service";
import PlanService from "./plan.service";
import SubscriptionService from "./subscription.service";
import ControlsService from "./controls.service";
import httpMuxService from "./httpMux.service";
import MuxService from './muxvideos.service'

import FoodService from "./foods.service";
import FoodCategoriesService from "./foodCategories.service";
import UserTagsService from './userTags.services';

import BannerService from "./banners.services";

const services = {
  http,
  AuthService,
  ClassService,
  UsersService,
  MemberService,
  TeamService,
  CategoryService,
  ValidateService,
  RecipeService,
  DashboardService,
  DietPlanService,
  PlanService,
  SubscriptionService,
  ControlsService,
  httpMuxService,
  MuxService,
  FoodService,
  FoodCategoriesService,
  UserTagsService,
  BannerService
};

export default services;
