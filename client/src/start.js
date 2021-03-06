import ReactDOM from "react-dom";
import App from "./containers/App/App";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./redux/reducer";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

ReactDOM.render(
    <Provider store={store}>
        <App store={store} />
    </Provider>, document.querySelector("main")
);





