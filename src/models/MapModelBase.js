import Model from './Model';
import {copy} from '../utils';
export default class MapModel extends Model {
     constructor(storeName) {
          super(storeName);
     }

     getActionName(type) {
          return this.storeName+'_'+type;
     }

     create(data) {
          Model.dispatchAction({type: this.getActionName('CREATE'), payload:data});
     }

     remove() {
          Model.dispatchAction({type: this.getActionName('REMOVE'), payload:null});
     }

     update(data, options) {
          Model.dispatchAction({type: this.getActionName('UPDATE'), payload:{data, options}});
     }

     getReducers() {
          return (store = [], action)=> {
               var newStore = this.reduce(store, action);
               if (newStore === undefined) {
                    switch(action.type) {
                         case this.getActionName('CREATE'):
                              return MapModel.createObject(action.payload, store);
                         case this.getActionName('REMOVE'):
                              return MapModel.removeObject(action.payload, store);
                         case this.getActionName('UPDATE'):
                              return MapModel.updateObject(action.payload, store);
                         default:
                              return store;
                    }
               }
               return newStore;
          }
     }

     reduce(store, action) {}

     static createObject(payload) {
          return copy(payload);
     }

     static removeObject() {
          return undefined;
     }
};
