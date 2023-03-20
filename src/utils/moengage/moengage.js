const MoengageEventTrackCommonProperties = (eventName, user, subscriptionResponse, changedEventObj) => {
  Moengage.add_unique_user_id(user.id); // UNIQUE_ID is used to uniquely identify a user.
  Moengage.track_event(eventName, {
    name: user?.fullName,
    address: user?.address_1,
    email: user?.email,
    phone: user?.phone,
    plan: subscriptionResponse?.plan_name,
    payment_method: subscriptionResponse?.payment_method,
    welcomeUserName: user?.welcomeUserName,
    changedEventObj
  });
}

const MoengageEventTrack = (eventName, user, subscriptionResponse) => {
  const changedEventObj = {
    memberType: user?.type,
  }
  MoengageEventTrackCommonProperties(eventName, user, subscriptionResponse, changedEventObj )
};

const MoengageEventTrackOnClickEnableOrDisable = (eventName, user, subscriptionResponse, status) => {
  const changedEventObj = {
    memberType: status,
  }
  MoengageEventTrackCommonProperties(eventName, user, subscriptionResponse, changedEventObj )
};

export { MoengageEventTrack, MoengageEventTrackOnClickEnableOrDisable };