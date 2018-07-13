import React from "react";
import ReactDOM from "react-dom";
import {Provider, connect} from "react-redux";

import store from "./store";
import {bindDataTypeToStore, followLink} from "./store";
import {updateResourcesData, updateDisplayList} from "./store/actions/data_actions";
import { CallbackWebSocket } from "./websocket";

import {Data} from "./components/data";
import {Resource} from "./components/resource";

import ToolBar from "./components/toolbar";


import _api from "./api";
import "./index.css";

export const api = _api;


class App extends React.Component {
    constructor(props) {
        super(props);
        const url = new URL(window.location);
        this.state = {
            current_resource: url.searchParams.get("resource"),
            group_filter: url.searchParams.get("group")
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
                        ...this.state,
                        default_resource: data.content.default_resource,
                        current_resource: this.state.current_resource?
                            this.state.current_resource : data.content.default_resource
                    });
                    break;

                default:
                    console.log(`can't route the event: ${data.event_type}`);
                    break;
            }
        });
    }
    changeData(dataName) {
        this.setState({
            ...this.state,
            current_resource: !dataName || dataName === "None"?
                this.state.default_resource : dataName
        });
    }
    changeGroup(groupName) {
        this.setState({
            ...this.state,
            group_filter: groupName
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
                    const group = followLink(data.group);
                    if(this.state.group_filter && this.state.group_filter !== "None") {
                        if (!group || group.name !== this.state.group_filter) {
                            continue;
                        }
                    }
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
        let data = this.currentData;
        if (data.length === 0) {
            data = (
                <span style={{fontSize: "30pt", textAlign: "center"}}>
                    There is no data to display
                    <br/>
                    for group "{this.state.group_filter}" and data type of "{this.state.current_resource}"
                </span>);
        }
        return (
        <div className="App">
            <ToolBar currentResource={this.state.current_resource} currentGroup={this.state.group_filter}/>
            <div className="AppContent">
                <div className="DatasContainer">
                    {data}
                </div>
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
