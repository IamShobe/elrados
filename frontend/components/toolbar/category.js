import React from "react";

const OPEN_HEIGHT = 200;
const CLOSE_HEIGHT = 0;

import showhide_icon from "./open.svg";

export class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        };
    }
    onClick(e) {
        this.setState({
            ...this.state,
            isOpen: !this.state.isOpen
        });
    }
    optionOnClick(value) {
        if(this.props.click_callback) {
            this.props.click_callback(value);
        }
        this.setState({
            ...this.state,
            isOpen: false,
        });
    }
    render() {
        let render_options = [];
        for (let [i, option] of Object.entries(this.props.options)) {
            render_options.push(
                <div className="Option" onClick={this.optionOnClick.bind(this, option)} key={i} value={option}>
                    <div className="Decore"><div className="Dot"/></div>
                    <span>{option}</span>
                </div>
            );
        }
        return (
            <div className="Category">
                <div className="CategoryTitle" onClick={this.onClick.bind(this)}>
                    <img className="Symbol" src={this.props.src}/>
                    <div className="Details">
                        <span className="Name">{this.props.title}</span>
                        <div className="CurrentSelection">{this.props.current}</div>
                    </div>
                    <div className="ShowHide" style={{transform: this.state.isOpen? "scale(1, -1)": "scale(1, 1)"}}>
                        <img src={showhide_icon}/>
                    </div>
                </div>
                <div className="Options">
                    <div className="DecoreBar"></div>
                    <div className="OptionsContainer" style={{maxHeight: this.state.isOpen? OPEN_HEIGHT:CLOSE_HEIGHT}}>
                        {render_options}
                    </div>
                </div>
            </div>
        );
    }
}