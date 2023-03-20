import * as authActions from "./authActions";
import * as classActions from "./classActions";

const rootActions = {
  ...authActions,
  ...classActions,
};

export default rootActions;
