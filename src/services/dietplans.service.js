import HTTPClient from "./http.services";

class DietPlanService {
  getAllDietPlans() {
    return new Promise((resolve, reject) => {
      HTTPClient.get("/get/dietplans")
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  addDietPlan(obj) {
    return new Promise((resolve, reject) => {
      HTTPClient.post("/add/dietplan", obj)
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  updateDietPlan(obj) {
    return new Promise((resolve, reject) => {
      HTTPClient.post("/update/dietplan", obj)
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  getPlanById(id) {
    return new Promise((resolve, reject) => {
      HTTPClient.get("/get/dietplan?id=" + id)
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  getAllShifts() {
    return new Promise((resolve, reject) => {
      HTTPClient.get("/get/dietplan/shifts")
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  getAllDays() {
    return new Promise((resolve, reject) => {
      HTTPClient.get("/get/dietplan/days")
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export default new DietPlanService();
