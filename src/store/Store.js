import { createStore, combineReducers, applyMiddleware, compose } from "redux";
// import { composeWithDevTools } from 'redux-devtools-extension';
import Thunk from "redux-thunk";
import LoginReducer from "./reducers/Login";
import ForgotPasswordReducer from "./reducers/ForgotPassword";
import LoaderReducer from "./reducers/Loader";
import ModalReducer from "./reducers/Modal";
import NetworkReducer from "./reducers/Network";
import AuthReducer from "./reducers/Auth";
import ErrorReducer from "./reducers/Error";
import MiscellaneousReducer from "./reducers/MiscellaneousReducer";
import senderDetailReducers from "./reducers/SenderDetailReducer";
import TransactionReducer from "./reducers/TransactionReducer";
import SignUpReducer from "./reducers/SignUpReducer";
import AdminReducers from "./reducers/adminReducers";

const middleware = [Thunk];
const initialState = {};

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true,
      })
    : compose;

const rootReducer = combineReducers({
  login: LoginReducer,
  forgotPassword: ForgotPasswordReducer,
  loader: LoaderReducer,
  modal: ModalReducer,
  network: NetworkReducer,
  auth: AuthReducer,
  error: ErrorReducer,
  miscellaneous: MiscellaneousReducer,
  senderDetail: senderDetailReducers,
  transaction: TransactionReducer,
  signup: SignUpReducer,
  admin: AdminReducers,
});

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);
export default store;
