import React from "react";

import {Data} from "../data";
import Lock from "../fields/lock";
import TextField from "../fields/text_field";

const AVAILABLE_TITLE_COLOR = "#4CAF50";
const RESERVED_TITLE_COLOR = "#FFEB3B";
const OWNER_TITLE_COLOR = "#f44336";

export class Resource extends Data {
    get filter_list() {
        return ["owner", "reserved", "is_available", "name"].concat(super.filter_list);
    }
    get titleExpensionBefore() {
        return super.titleExpensionAfter.concat([
            <Lock key="Lock"
                  resourceName={this.getName.bind(this)}
                  isLocked={this.isLocked.bind(this)}/>
        ]);
    }
    get fields() {
        const class_fields = [
            <TextField name="User"
                       key="User"
                       field_name={this.getUserFieldName.bind(this)}
                       cache_type={this.props.cache_type}
                       object_id={this.props.id}
            />
        ];
        return class_fields.concat(super.fields);
    }
    getName() {
        return this.cache.name;
    }
    isLocked() {
        return (this.cache.owner || this.cache.reserved || !this.cache.is_available);
    }
    get titleType() {
        const reserved = this.cache.reserved;
        const owner = this.cache.owner;
        let status = "Available";
        if (owner) {
            status = "Currently Running";
        } else if (reserved) {
            status = "Reserved";
        }

        return `${this.state.name} - ${status}`
    }

    get titleColor() {
        const reserved = this.cache.reserved;
        const owner = this.cache.owner;
        let title_color = AVAILABLE_TITLE_COLOR;
        if (owner) {
            title_color = OWNER_TITLE_COLOR;
        } else if (reserved) {
            title_color = RESERVED_TITLE_COLOR;
        }
        return title_color;
    }

    getUserFieldName() {
        const reserved = this.cache.reserved;
        const owner = this.cache.owner;
        let user_field = "undefined";
        if (owner) {
            user_field = "owner";
        } else if (reserved) {
            user_field = "reserved";
        }
        return user_field;
    }

}
