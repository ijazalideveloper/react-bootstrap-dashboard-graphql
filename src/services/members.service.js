import HTTPClient from "./http.services";

class MemberService {
  getAllMembers( search, page, limit) {
    return new Promise((resolve, reject) => {
      HTTPClient.get("/get/members?search="+search+"&page="+page+"&limit="+limit)
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  updateMember(obj) {
    return new Promise((resolve, reject) => {
      HTTPClient.post("/update/member/admin", obj)
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  getMemberById(id) {
    return new Promise((resolve, reject) => {
      HTTPClient.get("/get/member?id=" + id)
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  addMember(obj) {
    return new Promise((resolve, reject) => {
      HTTPClient.post("/add/member", obj)
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  markMemberAttendance(params) {
    
    return (async () => {
      try {
        let response = await HTTPClient.post('/admin/add/attendance', params);
        return response;
      } catch(err) {
        throw new Error(err)
      }
    })();


  }
}

export default new MemberService();
