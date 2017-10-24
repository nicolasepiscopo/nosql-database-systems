const { readFileSync, writeFileSync } = require('fs');
const { extend, find, filter, set, get, groupBy, reduce, reject } = require('lodash');
const btoa = require('btoa');

class DocumentStore {
    constructor () {
        this.filename = 'store.ds';
        this.currentCollection = null;
        this.currentCollectionName = null;
    }

    getStore () {
        return JSON.parse(readFileSync(this.filename));
    }

    updateStore (collectionName, collectionContent) {
        const store = this.getStore();

        store[this.currentCollectionName] = this.currentCollection;

        writeFileSync(this.filename, JSON.stringify(store));
    }

    getCollection (name) {
        const store = this.getStore();

        this.currentCollection = store[name];
        this.currentCollectionName = name;

        return this;
    }

    findOne (query) {
        return find(this.currentCollection, query);
    }

    find (query, pathOrGroupBy, mapper, reducer) {
        const resultSet = filter(this.currentCollection, query);

        if (typeof pathOrGroupBy === 'string'){
            const path = pathOrGroupBy;

            resultSet = resultSet.map(document => get(document, path));
        } else if (typeof pathOrGroupBy === 'function') {
            const groupByFn = pathOrGroupBy;
            const resultSet = groupBy(resultSet, groupByFn);

            if (typeof mapper === 'function') {
                resultSet = resultSet.map(mapper);
            }

            if (typeof reducer === 'function') {
                resultSet = reduce(resultSet, reducer);
            }
        }

        return resultSet;
    }

    update (query, path, value) {
        filter(this.currentCollection, query).forEach(document => set(this.currentCollection.find(({_id}) => _id === document._id), path, value));

        this.updateStore();

        return this.currentCollection;
    }

    remove (query) {
        this.currentCollection = reject(this.currentCollection, query)

        this.updateStore();

        return this.currentCollection;
    }

    insert (doc) {
        const _id = btoa(new Date().toISOString());

        if (!this.currentCollection)
            this.currentCollection = [];

        this.currentCollection.push(extend(doc, {_id}));

        this.updateStore();

        return _id;
    }
}

module.exports = DocumentStore;