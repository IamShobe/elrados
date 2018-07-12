/**
 * Created by Shobe on 12.07.2018.
 */
import React from "react";

import {Data} from "./components/data";
import {Resource} from "./components/resource";

import TextFieldRedux from "./components/fields/text_field";
import LockRedux from "./components/fields/lock";
import IndicatorFieldRedux from "./components/fields/indicator";
import {followLink} from "./store/index";


const dataMapping = {};

const mapDataType = (dataDBName, dataClassName) => {

    dataMapping[dataDBName] = dataClassName;
};

const getDataMapping = () => {
    return {...dataMapping};
};


export default {
    export: {
        React
    },
    actions: {
        getDataMapping,
        mapDataType,
        followLink
    },
    components: {
        Data,
        Resource
    },
    fields: {
        TextField: TextFieldRedux,
        Lock: LockRedux,
        IndicatorField: IndicatorFieldRedux
    }
};