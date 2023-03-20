import HTTPClient from "./http.services";

class CategoryService {
  getAllCategories() {
    return new Promise((resolve, reject) => {
      HTTPClient.get("/get/categories")
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  getCatById(id) {
    return new Promise((resolve, reject) => {
      HTTPClient.get("/get/category?id=" + id)
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  updateCategory(obj) {
    return new Promise((resolve, reject) => {
      HTTPClient.post("/update/category", obj)
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  addCategory(obj) {
    return new Promise((resolve, reject) => {
      HTTPClient.post("/add/category", obj)
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  reorderCategories(reorderedList) {
    return new Promise((resolve, reject) => {
      HTTPClient.put('/reorder/categories', {items: reorderedList})
        .then((resp) => resolve({ response: resp?.data }))
        .catch((err) => reject(err));
    });
  }
}

export default new CategoryService();
