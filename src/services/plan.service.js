import HTTPClient from "./http.services";

class PlanService {
  getAllPlans() {
    return new Promise((resolve, reject) => {
      HTTPClient.get("/fetch/plans")
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  selectPlan(obj) {
    return new Promise((resolve, reject) => {
      HTTPClient.post("/select/plan", obj)
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export default new PlanService();
