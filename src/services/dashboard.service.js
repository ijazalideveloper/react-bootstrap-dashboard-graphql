import HTTPClient from "./http.services";

class DashboardService {
  getLiveClasData() {
    return new Promise((resolve, reject) => {
      HTTPClient.get("/get/dashboard/live")
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export default new DashboardService();
