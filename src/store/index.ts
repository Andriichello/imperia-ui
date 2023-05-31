import { createStore } from "vuex";
import nav from "./modules/nav";
import auth from "./modules/auth";
import theme from "./modules/theme";
import basket from "./modules/basket";
import history from "./modules/history";
import customers from "./modules/customers";
import marketplace from "./modules/marketplace";
import banquets from "./modules/banquets";
import restaurants from "@/store/modules/restaurants";

export default createStore({
  modules: {
    'nav': nav,
    'auth': auth,
    'theme': theme,
    'basket': basket,
    'history': history,
    'customers': customers,
    'banquets': banquets,
    'marketplace': marketplace,
    'restaurants': restaurants,
  }
});