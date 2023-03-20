import HTTPClient from "./http.services";

// class FoodCategoriesService {
class UserTagsService {
  getUserTags(page = 1, limit = 10) {
    const endpoint = "/admin/tags/listing";
    return new Promise((resolve, reject) => {
      HTTPClient.get(endpoint)
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  addUserTag(obj) {
    const endpoint = "/admin/tags/create";
    return new Promise((resolve, reject) => {
      HTTPClient.post(endpoint, obj)
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  updateUserTag(obj) {
    const endpoint = "/admin/tags/update";
    return new Promise((resolve, reject) => {
      HTTPClient.post(endpoint, obj)
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  // deleteUserTag(obj) {
  //   return new Promise((resolve, reject) => {
  //     HTTPClient.post("", obj)
  //       .then((response) => {
  //         resolve({ response: response.data.data });
  //       })
  //       .catch((err) => {
  //         reject(err);
  //       });
  //   });
  // }

  getUserTagById(id, fetchMem = false, page, limit) {
    const endpoint =
      "/admin/tags?id=" +
      id +
      "&fetchMembers=" +
      fetchMem +
      "&page=" +
      page +
      "&limit=" +
      limit;
    return new Promise((resolve, reject) => {
      // HTTPClient.get("/admin/tags?id="+id+"&fetchMembers=false")
      HTTPClient.get(endpoint)
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  addRemoveTag(obj) {
    const endpoint = "/admin/tags/assign";
    return new Promise((resolve, reject) => {
      HTTPClient.post(endpoint, obj)
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export default new UserTagsService();
