import HTTPClient from "./http.services";

class MuxService {

  getAllMuxVideos(body) {
    return new Promise((resolve, reject) => {
      HTTPClient.post("/mux/videos", body)
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  getAllVideos(search, page, limit) {
    return new Promise((resolve, reject) => {
      HTTPClient.get("/mux/videos?search="+search+"&page="+page+"&limit="+limit)
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  addVideo(body) {
    return new Promise((resolve, reject) => {
      HTTPClient.post("/mux/save", body)
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

}

export default new MuxService();
