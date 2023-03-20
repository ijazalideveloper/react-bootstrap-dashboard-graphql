import HTTPClient from "./http.services";

class UsersService {
  getAllUsers(role) {
    return new Promise((resolve, reject) => {
      HTTPClient.get(role ? "/get/users?role=" + role : "/get/users")
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  getAllRoles() {
    return new Promise((resolve, reject) => {
      HTTPClient.get("/get/roles")
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  getUserById(id) {
    return new Promise((resolve, reject) => {
      HTTPClient.get("/get/user?id=" + id)
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  updateUser(obj) {
    return new Promise((resolve, reject) => {
      HTTPClient.post("/update/user", obj)
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  addUser(obj) {
    return new Promise((resolve, reject) => {
      HTTPClient.post("/add/user", obj)
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export default new UsersService();
