import {copy, match} from '../utils';
import Model from './Model';
export default class ArrayModel extends Model {

     static ACTION_TYPES = {
          'ADD': 'ADD',
          'REMOVE': 'REMOVE',
          'UPDATE': 'UPDATE',
          'FILL': 'FILL',
          'CLEAR': 'CLEAR',
          'APPEND': 'APPEND'
     };

     constructor(storeName) {
          super(storeName);
     }

     getReducers() {
          return (store=[], action)=>{
               var newStore = this.reduce(store, action);
               if(newStore===undefined) {
                    switch(action.type) {
                         case this.getActionName(ArrayModel.ACTION_TYPES.ADD):
                              return ArrayModel.addToArray(action.payload, store);
                         case this.getActionName(ArrayModel.ACTION_TYPES.REMOVE):
                              return ArrayModel.removeFromArray(action.payload, store);
                         case this.getActionName(ArrayModel.ACTION_TYPES.UPDATE):
                              return ArrayModel.updateArrayItem(action.payload, store);
                         case this.getActionName(ArrayModel.ACTION_TYPES.FILL):
                              return ArrayModel.fillArray(action.payload, store);
                         case this.getActionName(ArrayModel.ACTION_TYPES.CLEAR):
                              return ArrayModel.clearArray(action.payload, store);
                         case this.getActionName(ArrayModel.ACTION_TYPES.APPEND):
                              return ArrayModel.appendToArray(action.payload, store);
                         default:
                              return store;
                    }
               }
               return newStore;
          }
     }

     reduce(store=[], action) {};

     add(item) {
          Model.dispatchAction({type: this.getActionName(ArrayModel.ACTION_TYPES.ADD), payload:item});
          return this;
     }

     remove(query) {
          Model.dispatchAction({type: this.getActionName(ArrayModel.ACTION_TYPES.REMOVE), payload:{query}});
          return this;
     }

     removeById(id) {
          var query = {};
          query[this.getId()] = id;
          Model.dispatchAction({
               type: this.getActionName(ArrayModel.ACTION_TYPES.REMOVE),
               payload:{query}
          });
          return this;
     }

     update(query, data, options) {
          Model.dispatchAction({type: this.getActionName(ArrayModel.ACTION_TYPES.UPDATE), payload:{query, data, options}});
          return this;
     }

     updateById(id, data, options) {
          var query = {};
          query[this.getId()] = id;
          Model.dispatchAction({
               type: this.getActionName(ArrayModel.ACTION_TYPES.UPDATE),
               payload:{query, data, options}
          });
          return this;
     }

     fill(items) {
          Model.dispatchAction({type: this.getActionName(ArrayModel.ACTION_TYPES.FILL), payload:items});
          return this;
     }

     clear() {
          Model.dispatchAction({type: this.getActionName(ArrayModel.ACTION_TYPES.CLEAR)});
          return this;
     }

     append(items) {
          Model.dispatchAction({type: this.getActionName(ArrayModel.ACTION_TYPES.APPEND), payload:items});
          return this;
     }

     find(query) {

     }

     getId() {
          throw new Error('need override getId method');
     }

     static addToArray (payload, store) {
          var newArray = store.slice(0);
          newArray.push(copy(payload));
          return newArray;
     }

     static removeFromArray (payload, store) {
          var newArr = store.slice(0);
          var i = newArr.length;
          while (i--) {
               var item = store[i];
               if(match(item, payload.query)) {
                    newArr.splice(i, 1);
               }
          }
          return newArr;
     }

     static updateArrayItem (payload, store) {
          var newArr = store.slice(0);
          for(var i=0, length=newArr.length; i<length; i++) {
               if(match(newArr[i], payload.query)) {
                    newArr[i] = Model.updateObject(payload, newArr[i]);
               }
          }
          return newArr;
     }

     static fillArray (payload) {
          return payload.slice(0);
     }

     static clearArray () {
          return [];
     }

     static appendToArray(payload, store) {
          return store.concat(payload);
     }
}
