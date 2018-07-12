import {createStore, applyMiddleware, compose} from 'redux';
import {connect} from "react-redux";
import thunk from 'redux-thunk';

import reducer from './reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export const followLink = (link) => {
    if(!link || !("link" in link)) {
        return null;
    }
    return store.getState().cache.resources[link.link.type][link.link.id];
};

export const bindDataTypeToStore = (dataType) => {
    const mapStateToProps = (state) => {
        return {
            resources_cache: state.cache.resources,
            display_fields_cache: state.cache.display_list
        };
    };
    return connect(mapStateToProps)(dataType);
};
export default store;