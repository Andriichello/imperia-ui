import { createStore } from "vuex";
import nav from "./modules/nav";
import theme from "./modules/theme";

export default createStore({
  modules: {
    'nav': nav,
    'theme': theme
  }
});