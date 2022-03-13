import { combineReducers } from "redux";

import invoices from "./invoices";
import clients from "./clients";
import auth from "./auth";
import profiles from "./profiles";
import products from "./products";
import categories from "./categories";

export default combineReducers({
  invoices,
  clients,
  auth,
  profiles,
  products,
  categories,
});
