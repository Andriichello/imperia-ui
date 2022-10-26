import { createStore } from "vuex";
import auth from "./modules/auth";
import theme from "./modules/theme";

export default createStore({
  modules: {
    'auth': auth,
    'theme': theme,
  }
});