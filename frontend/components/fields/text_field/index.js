import React from "react";
import {connect} from "react-redux";
import "./index.css";

const DEFAULT_FONT_SIZE = 12;

export class TextField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            font_size: this.props.fontSize | DEFAULT_FONT_SIZE
        };
    }

    render() {
        let value = [];
        try {
            for (let field of this.props.fields) {
                let current_value = "-";
                let classname = "";
                if (typeof(field) === "function") {
                    let field_values = field();
                    value = field_values.value;
                    classname = field_values.className;
                } else {
                    if (typeof(field.field_name) === "function") {
                        current_value = this.props.resources_cache
                            [field.cache_type][field.object_id][field.field_name()];
                    } else {
                        current_value = this.props.resources_cache
                            [field.cache_type][field.object_id][field.field_name];
                    }
                    if(field.className) {
                        classname = field.className;
                    }
                }
                value.push(
                    <span className={`SubValue ${classname}`}>
                        <span style={{fontSize: this.state.fontSize}}>
                            {current_value !== undefined && current_value !== "" ?
                                current_value : "-"}
                        </span>
                    </span>);
            }
        } catch(err) {
            value = "Error";
            console.error(`${err.message}. Object: `, this);
        }
        return (
            <div className="TextField">
                <div className="Name">{this.props.name}</div>
                <div className="Value">
                    {value}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        resources_cache: state.cache.resources,
    };
};

export default connect(mapStateToProps)(TextField);