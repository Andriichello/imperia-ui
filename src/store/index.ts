import { createStore } from "vuex";
import nav from "./modules/nav";
import auth from "./modules/auth";
import theme from "./modules/theme";
import basket from "./modules/basket";
import history from "./modules/history";
import marketplace from "./modules/marketplace";

export default createStore({
  modules: {
    'nav': nav,
    'auth': auth,
    'theme': theme,
    'basket': basket,
    'history': history,
    'marketplace': marketplace,
  }
});