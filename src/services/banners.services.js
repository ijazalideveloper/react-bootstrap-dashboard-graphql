import HTTPClient from "./http.services";

class BannerService {

  getAllBannersList( page, limit) {
    return new Promise((resolve, reject) => {
      HTTPClient.get("/admin/banners?&page="+page+"&limit="+limit)
        .then((response) => {
          resolve({ response: response.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  getAllBannersListWithoutPagination() {
    return new Promise((resolve, reject) => {
      HTTPClient.get("/admin/banners")
        .then((response) => {
          resolve({ response: response.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  getBannerById(id) {
    return new Promise((resolve, reject) => {
      HTTPClient.get("/admin/banners/" + id)
        .then((response) => {
          resolve({ response: response.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  addBanner(obj) {
    return new Promise((resolve, reject) => {
      HTTPClient.post("/admin/banners", obj)
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  updateBanner(obj, data) {
    return new Promise((resolve, reject) => {
      HTTPClient.put("/admin/banners/"+ obj, data)
        .then((response) => {
          resolve({ response: response.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  delBanner(obj) {
    return new Promise((resolve, reject) => {
      HTTPClient.delete("/admin/banners/"+ obj)
        .then((response) => {
          resolve({ response: response.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export default new BannerService();
