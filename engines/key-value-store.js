const { readFileSync, writeFileSync } = require('fs');

class KeyValueStore {
    constructor () {
        this.filename = 'store.kvs';
    }

    get (key) {
        const store = JSON.parse(readFileSync(this.filename));

        return store[key];
    }

    put (key, value) {
        const store = JSON.parse(readFileSync(this.filename));

        store[key] = value;

        writeFileSync(this.filename, JSON.stringify(store));

        return this;
    }
}

module.exports = KeyValueStore;