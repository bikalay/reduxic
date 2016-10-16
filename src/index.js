var _store = null;
export function init(store) {
    _store = store;
}

export function dispatch(action) {
    return _store.dispatch(action);
}

export function getState() {
    return _store.getState();
}