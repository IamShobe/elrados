import React from "react";
import ReactDOM from "react-dom";
import {Provider, connect} from "react-redux";

import store from "./store";
import {bindDataTypeToStore} from "./store";
import {updateResourcesData, updateDisplayList} from "./store/actions/data_actions";
import { CallbackWebSocket } from "./websocket";

import {Data} from "./components/data";
import {Resource} from "./components/resource";


import _api from "./api";
import "./index.css";

export const api = _api;


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current_resource: undefined
        };
        new CallbackWebSocket((data)=>{
            console.log(data);
            switch (data.event_type) {
                case "resource_updated":
                case "initialize-cache":
                    this.props.updateResourcesData(data.content);
                    break;

                case "initialize-display-list":
                    this.props.updateDisplayList(data.content);
                    break;

                case "initialize-settings":
                    this.setState({
                        current_resource: data.content.default_resource
                    });
                    break;

                default:
                    console.log(`can't route the event: ${data.event_type}`);
                    break;
            }

        });
    }
    get currentData() {
        const datas = [];
        if( this.state.current_resource ) {
            let resourceType = this.state.current_resource.includes("Data")? Resource : Data;
            const mapping = api.actions.getDataMapping();
            if (this.state.current_resource in mapping) {
                resourceType = mapping[this.state.current_resource];
            }
            const component = bindDataTypeToStore(resourceType);
            if (this.props.cache.resources[this.state.current_resource]) {
                for (let data of Object.values(this.props.cache.resources[this.state.current_resource])) {
                    datas.push(
                        React.createElement(component,
                            {
                                key: data.id,
                                id: data.id,
                                cache_type: this.state.current_resource
                            }
                        )
                    )

                }
            }
        }
        return datas;
    }
    render() {
        return (
        <div className="App">
            <div className="DatasContainer">
                {this.currentData}
            </div>
        </div>);
    }
}

const mapStateToProps = (state) => ({
    cache: state.cache
});
const mapDispatchToProps = dispatch => ({
    updateResourcesData: (data) => dispatch(updateResourcesData(data)),
    updateDisplayList: (data) => dispatch(updateDisplayList(data))
});
const AppRenderer = connect(mapStateToProps, mapDispatchToProps)(App);
ReactDOM.render(
        <Provider store={store}>
            <AppRenderer/>
        </Provider>
    , document.getElementById("App"));
