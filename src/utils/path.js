export function get (obj, key) {
    var path = key.split('.');
    var _obj = obj;
    for (var i = 0, pathLength = path.length; i < pathLength; i++) {
        if(_obj === null || _obj === undefined) {
            return;
        }
        _obj = _obj[path[i]];
    }
    return _obj;
}

export function set (obj, key, value) {
    var path = key.split('.');
    var _obj = obj;
    for(var i=0, length=path.length; i<length; i++) {
        var subPath = path[i];
        if(_obj[subPath] === null || _obj[subPath] === undefined) {
            _obj[subPath] = {};
        }
        if(i==length-1) {
            _obj[subPath] = value;
        }
        else {
            _obj = _obj[subPath];
        }
    }
    return obj;
}