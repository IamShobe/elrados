import React from "react";

import {Category} from "./category";

import {bindDataTypeToStore} from "../../store";

import './index.css';
import group_icon from './groups.svg';
import filter_icon from './filter.svg';

class ToolBar extends React.Component {
    constructor(props) {
        super(props);
    }

    group_set(group) {
        const url = new URL(window.location);
        url.searchParams.set("group", group);
        window.location = url.href;
    }
    resource_set(data) {
        const url = new URL(window.location);
        url.searchParams.set("resource", data);
        window.location = url.href;
    }
    update_menu() {
        this.setState({
            ...this.state
        });
    }
    get groups() {
        const groups = ["None"];
        if (!("Group" in this.props.resources_cache)) {
            return groups;
        }
        for (let group of Object.values(this.props.resources_cache["Group"])) {
            groups.push(group.name)
        }
        return groups;
    }
    get resources() {
        const resources = Object.keys(this.props.resources_cache);
        const groups_index = resources.indexOf("Group");
        if(groups_index >= 0) {
            resources.splice(groups_index, 1);
        }
        const users_index = resources.indexOf("User");
        if(users_index >= 0) {
            resources.splice(users_index, 1);
        }
        return resources;
    }
    render() {
        return (
            <div className="ToolBar noselect">
                <Category title="Groups" src={group_icon} options={this.groups}
                          current={this.props.currentGroup} click_callback={this.group_set.bind(this)}/>
                <Category title="Data" src={filter_icon}
                          current={this.props.currentResource}
                          options={this.resources} click_callback={this.resource_set.bind(this)}/>
            </div>
        );
    }
}

export default bindDataTypeToStore(ToolBar);