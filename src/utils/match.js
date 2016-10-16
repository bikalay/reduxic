import * as path from './path';
export function match(item, query) {
    var _match = true;
    if (!_match) {
        return false;
    }
    var keys = Object.keys(query);
    for (var i = 0, length = keys.length; i < length; i++) {
        var key = keys[i];
        switch (key) {
            case '$or':
                _match = _match && or(item, query[key]);
                break;
            case '$and':
                _match = _match && and(item, query[key]);
                break;
            default:
                var _item = path.get(item, key);
                _match = _match && matchField(_item, query[key]);
                break;
        }
    }
    return _match;
}

function or(item,  arr) {
    let _match = false;
    for(var i=0, length=arr.length; i<length; i++) {
        let query = arr[i];
        _match = _match || match(item, query);
    }
    return _match;
}

function and(item,  arr) {
    let _match = true;
    for(var i=0, length=arr.length; i<length; i++) {
        let query = arr[i];
        _match = _match && match(item, query);
    }
    return _match;
}

function matchField(field, query) {
    switch(Object.prototype.toString.call(query)) {
        case '[object Object]':
            return matchObject(field, query);
        case '[object Function]':
            return query(field);
        case '[object RegExp]':
            return query.test(field);
        default:
            if(query.valueOf) {
                return query.valueOf() == field.valueOf();
            }
            else {
                return query == field;
            }
            break;
    }
}

function _in(field, arr) {
    return arr.indexOf(field)>-1;
}

function matchObject(field, query) {
    var _match = true;
    var keys = Object.keys(query);
    for(var i=0, length=keys.length; i<length; i++) {
        var key = keys[i];
        switch(key) {
            case '$in':
                _match = _match && _in(field, query[key]);
                break;
            case '$lt':
                _match = _match && (field < query[key]);
                break;
            case '$gt':
                _match = _match && (field > query[key]);
                break;
            case '$lte':
                _match = _match && (field <= query[key]);
                break;
            case '$gte':
                _match = _match && (field >= query[key]);
                break;
            case '$exist':
                _match = _match && (query[key] ? field!==undefined : field===undefined);
        }
    }
    return _match;
}