import HTTPClient from "./http.services";

class RecipeService {
  getAllRecipes() {
    return new Promise((resolve, reject) => {
      HTTPClient.get("/get/recipes")
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  addRecipe(obj) {
    return new Promise((resolve, reject) => {
      HTTPClient.post("/add/recipe", obj)
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  updateRecipe(obj) {
    return new Promise((resolve, reject) => {
      HTTPClient.post("/update/recipe", obj)
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  getRecipeById(id) {
    return new Promise((resolve, reject) => {
      HTTPClient.get("/get/recipe?id=" + id)
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  getAllCategories() {
    return new Promise((resolve, reject) => {
      HTTPClient.get("/get/recipe/categories")
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
      HTTPClient.get("/get/recipe/category?id=" + id)
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
      HTTPClient.post("/update/recipe/category", obj)
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
      HTTPClient.post("/add/recipe/category", obj)
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export default new RecipeService();
