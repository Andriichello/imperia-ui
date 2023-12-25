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
import preview from "@/store/modules/preview";
import reviews from "@/store/modules/reviews";
import error from "@/store/modules/error";
import order from "@/store/modules/order";
import waiters from "@/store/modules/waiters";

export default createStore({
  modules: {
    'nav': nav,
    'auth': auth,
    'error': error,
    'theme': theme,
    'order': order,
    'basket': basket,
    'history': history,
    'customers': customers,
    'waiters': waiters,
    'banquets': banquets,
    'reviews': reviews,
    'preview': preview,
    'marketplace': marketplace,
    'restaurants': restaurants,
  }
});