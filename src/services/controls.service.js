import HTTPClient from "./http.services";

class ControlsService {
    fetchAppConfig(){
        return new Promise((resolve, reject) => {
            HTTPClient.get("/app-config")
              .then((response) => {
                resolve({ response: response.data.data });
              })
              .catch((err) => {
                reject(err);
              });
          });
    }

    setAppConfig(obj){
        return new Promise((resolve, reject) => {
            HTTPClient.post("/app-config/set", obj)
                .then((response) => {
                resolve({ response: response.data.data });
                })
                .catch((err) => {
                reject(err);
                });
        });
    }
}

export default new ControlsService();
