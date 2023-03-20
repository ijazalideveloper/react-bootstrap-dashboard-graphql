import HTTPClient from "./http.services";
import httpMuxService from "./httpMux.service";

class ClassService {
  getAllClasses(search='', page=1,limit=15) {
    return new Promise((resolve, reject) => {
      HTTPClient.get("/get/all/classes?fromAdmin=true&search="+search+"&page="+page+"&limit="+limit)
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  addClass(obj) {
    return new Promise((resolve, reject) => {
      HTTPClient.post("/add/class", obj)
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }z
  addClassVideo(obj) {
    console.log(obj , "from normal one")
    return new Promise((resolve, reject) => {
      HTTPClient.post("/file/upload", obj)
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  addClassVideoMux(obj) {
    console.log('add class video mux obj',obj)
    return new Promise((resolve, reject) => {
      HTTPClient.get("/mux/createUploadUrl?title="+obj.title)
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  getMuxAssetFromId(id){
    return new Promise((resolve, reject) => {
      HTTPClient.get("/mux/getMuxAssetFromId?id="+id)
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  removeClassVideo(obj) {
    return new Promise((resolve, reject) => {
      HTTPClient.post("/file/delete", obj)
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  removeClassVideoMux(obj) {
    return new Promise((resolve, reject) => {
      HTTPClient.post("/mux/removeMuxAsset?assetId="+obj, obj)
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  getPlaybackIDLink(obj){
    return new Promise((resolve, reject) => {
      HTTPClient.get("/mux/getPlaybackIDLink?assetId="+obj)
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  updateClass(obj) {
    return new Promise((resolve, reject) => {
      HTTPClient.post("/update/class", obj)
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  getClassById(id) {
    return new Promise((resolve, reject) => {
      HTTPClient.get("/get/class?id=" + id)
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  getAllClassTypes() {
    return new Promise((resolve, reject) => {
      HTTPClient.get("/get/classTypes")
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  getAllClassEquipments() {
    return new Promise((resolve, reject) => {
      HTTPClient.get("/get/all/classEquipments")
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  checkSlot(obj) {
    return new Promise((resolve, reject) => {
      HTTPClient.post("/check/slot", obj)
        .then((response) => {
          resolve({ response: response.data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  getAllInstructors(){
    return new Promise(
      (resolve,reject)=>{
        HTTPClient.get("/get/allInstructors")
        .then((result)=>{
          console.log("endpoint hit!!")
          resolve({ response:result.data.data });
        })
        .catch((err)=>{
          reject(err);
        })
      }
    );
  }
  getAllReadyVideos(){
    return new Promise(
      (resolve,reject)=>{
        HTTPClient.get("/mux/videos/ready")
        .then((result)=>{
          console.log("endpoint hit!!")
          resolve({ response:result.data.data });
        })
        .catch((err)=>{
          reject(err);
        })
      }
    );
  }

  filterClassAndClassSlots(params) {
    return (async () => {
      try {
        let { search, type } = params;
        console.log("search, type",search, type)
        let response = await HTTPClient.get("/admin/classes/filterswithslots?psize=100&pnumber=1&slots=5&search="+search+"&type="+type);
        if (response.data.data.rows) {
          return response.data.data.rows
        } else {
          return response.data.data
        }
      } catch(err) {
        console.log(err)

        throw new Error(err)
      }
    })();
  }
}

export default new ClassService();
