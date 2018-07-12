import React from "react";
import {connect} from "react-redux";

import TextField from "../fields/text_field";
import "./index.css";

const FIELD_FILTER_LIST = ["group"];
const DEFAULT_TITLE_COLOR = "#96ff77";

export class Data extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name?
                this.props.name : this.props.cache_type,
            indicators: this.props.indicators
        };
        this.title_expension = [];
    }
    get fields() {
        return [];
    }
    get filter_list() {
        return ["group"];
    }
    getField(cache_type, object_id, field_name) {
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
                this.getField(this.props.cache_type, this.props.id, field_name);
            fields.push(field);
        }
        return fields;
    }

    get titleColor() {
        return DEFAULT_TITLE_COLOR;
    }

    get titleType() {
        return this.state.name;
    }

    render() {
        let fields = this.fields;
        fields = fields.concat(
            this.getAllFields(
                this.props.display_fields_cache[this.props.cache_type]
            )
        );
        return (
        <div className="MainData">
            <div className="Title" style={{backgroundColor: this.titleColor}}>
                <div className="Type">{this.titleType}</div>
                <div className="Name">
                    <span>
                        {this.props.resources_cache
                            [this.props.cache_type][this.props.id].name}
                    </span>
                </div>
                <div className="Indicators">
                    {this.state.indicators}
                </div>
                {this.title_expension}
            </div>
            <div className="Content">
                <div className="ContentDetails">
                    {fields}
                </div>
            </div>
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        resources_cache: state.cache.resources,
        display_fields_cache: state.cache.display_list
    };
};

export default connect(mapStateToProps)(Data);
