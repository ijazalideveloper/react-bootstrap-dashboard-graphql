import HTTPClient from "./http.services";

class FoodService {
  getAllFoods(search, page, limit = 10) {
    return new Promise((resolve, reject) => {
      HTTPClient.get(
        "/foods?page=" + page + "&limit=" + limit + "&search=" + search
      )
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  addFood(obj) {
    return new Promise((resolve, reject) => {
      HTTPClient.post("/foods", obj)
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  delFood(obj) {
    return new Promise((resolve, reject) => {
      HTTPClient.post("/foods/delete", obj)
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  updateFood(obj) {
    return new Promise((resolve, reject) => {
      HTTPClient.post("/foods/edit", obj)
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  getFoodById(id) {
    return new Promise((resolve, reject) => {
      HTTPClient.get("/foods/" + id)
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export default new FoodService();
