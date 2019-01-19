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
            group_filter: url.searchParams.get("group"),
            items_in_line: 0
        };
        this.container = React.createRef();
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
        window.addEventListener("resize", this.rerenderIfChange.bind(this))
    }

    componentDidMount() {
        this.rerenderIfChange();
    }
    rerenderIfChange() {
        const items_in_line = this.calculate_items_in_line();
        if(items_in_line !== this.state.items_in_line) {
            this.setState({
                ...this.state,
                items_in_line: items_in_line
            });
        }
    }
    calculate_items_in_line() {
        const container = this.container.current;
        const min_width = 380;
        const max_in_line = 4;
        if(container) {
            const width = container.offsetWidth;
            const data_in_line = Math.floor(width / (min_width + 20));
            return data_in_line > max_in_line ? max_in_line : data_in_line;
        }

        return 0;
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
        const component_width = `calc(${100 / this.state.items_in_line}% - 16px)`;
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
                        if (group && group.name !== this.state.group_filter) {
                            continue;
                        }
                    }
                    datas.push(
                        React.createElement(component,
                            {
                                width: component_width,
                                key: data.id,
                                id: data.id,
                                cache_type: this.state.current_resource
                            }
                        )
                    );

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
            <div className="AppContent" ref={this.container}>
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
