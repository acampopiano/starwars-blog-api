"use strict";
// To parse this data:
//
//   import { Convert, Vehicles } from "./file";
//
//   const vehicles = Convert.toVehicles(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.
exports.__esModule = true;
exports.Convert = void 0;
// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
var Convert = /** @class */ (function () {
    function Convert() {
    }
    Convert.toVehicles = function (json) {
        return cast(JSON.parse(json), r("Vehicles"));
    };
    Convert.vehiclesToJson = function (value) {
        return JSON.stringify(uncast(value, r("Vehicles")), null, 2);
    };
    return Convert;
}());
exports.Convert = Convert;
function invalidValue(typ, val, key) {
    if (key === void 0) { key = ''; }
    if (key) {
        throw Error("Invalid value for key \"" + key + "\". Expected type " + JSON.stringify(typ) + " but got " + JSON.stringify(val));
    }
    throw Error("Invalid value " + JSON.stringify(val) + " for type " + JSON.stringify(typ));
}
function jsonToJSProps(typ) {
    if (typ.jsonToJS === undefined) {
        var map_1 = {};
        typ.props.forEach(function (p) { return map_1[p.json] = { key: p.js, typ: p.typ }; });
        typ.jsonToJS = map_1;
    }
    return typ.jsonToJS;
}
function jsToJSONProps(typ) {
    if (typ.jsToJSON === undefined) {
        var map_2 = {};
        typ.props.forEach(function (p) { return map_2[p.js] = { key: p.json, typ: p.typ }; });
        typ.jsToJSON = map_2;
    }
    return typ.jsToJSON;
}
function transform(val, typ, getProps, key) {
    if (key === void 0) { key = ''; }
    function transformPrimitive(typ, val) {
        if (typeof typ === typeof val)
            return val;
        return invalidValue(typ, val, key);
    }
    function transformUnion(typs, val) {
        // val must validate against one typ in typs
        var l = typs.length;
        for (var i = 0; i < l; i++) {
            var typ_1 = typs[i];
            try {
                return transform(val, typ_1, getProps);
            }
            catch (_) { }
        }
        return invalidValue(typs, val);
    }
    function transformEnum(cases, val) {
        if (cases.indexOf(val) !== -1)
            return val;
        return invalidValue(cases, val);
    }
    function transformArray(typ, val) {
        // val must be an array with no invalid elements
        if (!Array.isArray(val))
            return invalidValue("array", val);
        return val.map(function (el) { return transform(el, typ, getProps); });
    }
    function transformDate(val) {
        if (val === null) {
            return null;
        }
        var d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }
    function transformObject(props, additional, val) {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        var result = {};
        Object.getOwnPropertyNames(props).forEach(function (key) {
            var prop = props[key];
            var v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, prop.key);
        });
        Object.getOwnPropertyNames(val).forEach(function (key) {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key);
            }
        });
        return result;
    }
    if (typ === "any")
        return val;
    if (typ === null) {
        if (val === null)
            return val;
        return invalidValue(typ, val);
    }
    if (typ === false)
        return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ))
        return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems") ? transformArray(typ.arrayItems, val)
                : typ.hasOwnProperty("props") ? transformObject(getProps(typ), typ.additional, val)
                    : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number")
        return transformDate(val);
    return transformPrimitive(typ, val);
}
function cast(val, typ) {
    return transform(val, typ, jsonToJSProps);
}
function uncast(val, typ) {
    return transform(val, typ, jsToJSONProps);
}
function a(typ) {
    return { arrayItems: typ };
}
function u() {
    var typs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        typs[_i] = arguments[_i];
    }
    return { unionMembers: typs };
}
function o(props, additional) {
    return { props: props, additional: additional };
}
function m(additional) {
    return { props: [], additional: additional };
}
function r(name) {
    return { ref: name };
}
var typeMap = {
    "Vehicles": o([
        { json: "count", js: "count", typ: 0 },
        { json: "next", js: "next", typ: "" },
        { json: "previous", js: "previous", typ: null },
        { json: "results", js: "results", typ: a(r("Result")) },
    ], false),
    "Result": o([
        { json: "name", js: "name", typ: "" },
        { json: "model", js: "model", typ: "" },
        { json: "manufacturer", js: "manufacturer", typ: "" },
        { json: "cost_in_credits", js: "cost_in_credits", typ: "" },
        { json: "length", js: "length", typ: "" },
        { json: "max_atmosphering_speed", js: "max_atmosphering_speed", typ: "" },
        { json: "crew", js: "crew", typ: "" },
        { json: "passengers", js: "passengers", typ: "" },
        { json: "cargo_capacity", js: "cargo_capacity", typ: "" },
        { json: "consumables", js: "consumables", typ: "" },
        { json: "hyperdrive_rating", js: "hyperdrive_rating", typ: "" },
        { json: "MGLT", js: "MGLT", typ: "" },
        { json: "starship_class", js: "starship_class", typ: "" },
        { json: "pilots", js: "pilots", typ: a("") },
        { json: "films", js: "films", typ: a("") },
        { json: "created", js: "created", typ: Date },
        { json: "edited", js: "edited", typ: Date },
        { json: "url", js: "url", typ: "" },
    ], false)
};
