import HTTPClient from "./http.services";

class SubscriptionService {
  
    getActivePlans(  ){
      return new Promise((resolve, reject) => {
          HTTPClient.get("/v1/plans/getactive")
            .then((response) => {
              resolve(response.data.data );
            })
            .catch((err) => {
              reject(err);
            });
        });
    }
  
    getActivePaymentMethods(  ){
      return new Promise((resolve, reject) => {
          HTTPClient.get("/v1/payments/getactivemethod")
            .then((response) => {
              resolve(response.data.data );
            })
            .catch((err) => {
              reject(err);
            });
        });
    }
  
    getActiveSubscription( userId ){
      return new Promise((resolve, reject) => {
          HTTPClient.get("/v1/subscriptions/users/"+userId+"/active?transactions=true")
            .then((response) => {
              resolve(response.data.data );
            })
            .catch((err) => {
              reject(err);
            });
        });
    }
    
    getAllSubscriptions( userId, page ){
      return new Promise((resolve, reject) => {
          HTTPClient.get("/v1/subscriptions/users/"+userId+"/all?page="+page)
            .then((response) => {
              resolve(response.data.data );
            })
            .catch((err) => {
              reject(err);
            });
        });
    }
    
    updateSubscriptionStatus ( subId, state  ) {
      return new Promise((resolve, reject) => {
        HTTPClient.post("/v1/subscriptions/"+subId+"/update", { 'status' : state })
          .then((response) => {
            resolve(response.data.data );
          })
          .catch((err) => {
            reject(err);
          });
      });
    }

    addSubscription( requestData  ) {
      return new Promise((resolve, reject) => {
        HTTPClient.post("/v1/subscriptions/add", requestData)
          .then((response) => {
            resolve(response.data.data );
          })
          .catch((err) => {
            reject(err.response.data.message);
          });
      });
    }

    addSubscriptionPayment( requestData  ) {
      return new Promise((resolve, reject) => {
        HTTPClient.post("/v1/subscriptions/create_payment", requestData)
          .then((response) => {
            resolve(response.data.data );
          })
          .catch((err) => {
            reject(err.response.data.message);
          });
      });
    }

    renewSubscription( id  ) {
      return new Promise((resolve, reject) => {
        HTTPClient.get("/v1/subscriptions/"+id+"/renew")
          .then((response) => {
            resolve(response.data.data );
          })
          .catch((err) => {
            reject(err.response.data.message);
          });
      });
    }

}

export default new SubscriptionService();