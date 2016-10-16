import copy from '../utils/copy';
import {set} from '../utils/path';

export default class Model {

    constructor(storeName) {
        this.storeName = storeName;
        this.getReducers = this.reduce.bind(this);
        this.reduce = this.reduce.bind(this);
    }

    getActionName(type) {
        return this.storeName+'_'+type;
    }

    static dispatchAction(action) {
        dispatch(action);
    }

    static state() {
        return getState();
    }

    getReducers() {
        return (store, action)=> {
            return this.reduce(store, action);
        }
    }

    reduce(store, action) {
        return store;
    }

    static updateObject (payload, store) {
        if(payload.data['$set']) {
            var newObject = copy(store);
            var data = payload.data['$set'];
            var keys = Object.keys(data);
            for(var i=0,length = keys.length; i<length; i++) {
                var key = keys[i];
                set(newObject, key, copy(data[key]));
            }
            return newObject;
        }
        else if(payload.options && payload.options.rewrite) {
            return copy(payload.data);
        }
        else {
            return copy(copy(store), payload.data);
        }
    }
};
