import HTTPClient from "./http.services";

class FoodCategoriesService {
  getFoodCategories(page = 1, limit = 10) {
    return new Promise((resolve, reject) => {
      HTTPClient.get("/foods/categories")
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  addFoodCategory(obj) {
    return new Promise((resolve, reject) => {
      HTTPClient.post("/foods/categories", obj)
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  updateFoodCategory(obj) {
    return new Promise((resolve, reject) => {
      HTTPClient.post("/foods/categories/edit", obj)
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  deleteFoodCategory(obj) {
    return new Promise((resolve, reject) => {
      HTTPClient.post("/foods/categories/edit", obj)
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  getFoodCategoryById(id) {
    return new Promise((resolve, reject) => {
      HTTPClient.get("/foods/categories/" + id)
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  addRemoveFoods(obj) {
    return new Promise((resolve, reject) => {
      HTTPClient.post("/foods/categories/populate", obj)
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export default new FoodCategoriesService();
