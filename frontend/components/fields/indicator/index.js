import React from "react";
import {connect} from "react-redux";

import "./index.css";

export class Indicator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            src: this.props.src,
            title: this.props.title,
            predicate: this.props.predicate,
        };
    }

    render() {
        return (
            <div style={{display: this.predicate()? "" : "none"}}
                 className="Indicator">
                <img src={this.state.src} />
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        resources_cache: state.cache.resources,
    };
};

export default connect(mapStateToProps)(Indicator);