import HTTPClient from "./http.services";

class TeamService {
  getAllTeams() {
    return new Promise((resolve, reject) => {
      HTTPClient.get("/get/teams")
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  getTeamById(id) {
    return new Promise((resolve, reject) => {
      HTTPClient.get("/get/team?id=" + id)
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  updateTeam(obj) {
    return new Promise((resolve, reject) => {
      HTTPClient.post("/update/team", obj)
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  addTeam(obj) {
    return new Promise((resolve, reject) => {
      HTTPClient.post("/add/team", obj)
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export default new TeamService();
