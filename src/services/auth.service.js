import HTTPClient from "./http.services";

class UserService {
  loginUser(obj) {
    return new Promise((resolve, reject) => {
      HTTPClient.post("/signIn", obj)
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export default new UserService();
