import React from "react";

import TextField from "../fields/text_field";
import "./index.css";

const DEFAULT_TITLE_COLOR = "#96ff77";

export class Data extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name?
                this.props.name : this.props.cache_type,
        };
    }
    get fields() {
        return this.getAllFields(this.props.display_fields_cache[this.props.cache_type]);
    }
    get titleExpensionBefore() {
        return [];
    }
    get titleExpensionAfter() {
        return [];
    }
    get titleDetailsExpensionBefore() {
        return [];
    }
    get titleDetailsExpensionAfter() {
        return [];
    }
    get contentExpensionBefore() {
        return [];
    }
    get contentExpensionAfter() {
        return [];
    }
    get indicators() {
        return [];
    }
    get filter_list() {
        return ["group"];
    }
    get titleColor() {
        return DEFAULT_TITLE_COLOR;
    }

    get titleType() {
        return this.state.name;
    }
    get title() {
        return (
            <div className="Title" style={{backgroundColor: this.titleColor}}>
                {this.titleExpensionBefore}
                <div className="Details">
                    {this.titleDetailsExpensionBefore}
                    <div className="Name">
                        <span>
                            {this.cache.name}
                        </span>
                    </div>
                    <div className="Type">{this.titleType}</div>
                    {this.titleDetailsExpensionAfter}
                </div>
                <div className="Indicators">
                    {this.indicators}
                </div>
                {this.titleExpensionAfter}
            </div>
        );
    }


    get cache() {
        return this.props.resources_cache[this.props.cache_type][this.props.id];
    }
    static getField(cache_type, object_id, field_name) {
        return <TextField key={field_name}
                          name={field_name}
                          field_name={field_name}
                          cache_type={cache_type}
                          object_id={object_id}/>;
    }

    getAllFields(fields_names) {
        const fields = [];
        for(let field_name of Object.values(fields_names)) {
            if(this.filter_list.indexOf(field_name) >= 0) {
                continue;
            }
            const field =
                this.constructor.getField(this.props.cache_type, this.props.id, field_name);
            fields.push(field);
        }
        return fields;
    }


    render() {
        return (
        <div className="MainData" style={{width: this.props.width}}>
            {this.title}
            <div className="Content">
                {this.contentExpensionBefore}
                <div className="ContentDetails">
                    {this.fields}
                </div>
                {this.contentExpensionAfter}
            </div>
        </div>
        );
    }
}
