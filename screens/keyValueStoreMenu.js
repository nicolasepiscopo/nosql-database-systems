var createMenu = require('simple-terminal-menu');
const readline = require('readline'); 
//stores
const KeyValueStore = require('../engines/key-value-store.js');

function showSelection(label, marker) {
    console.log("label: " + label + "; marker: " + marker + ";")
}

function renderKeyValueStoreMenu (previousMenu) {
    var menu = createMenu({ 
        x: 3,
        y: 2
    });
    menu.writeLine('Key Value Store');
    menu.writeSeparator();
    menu.add('PUT', () => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
            
        rl.question('Write the key: ', key => {
            rl.question('Write the value for "'+key+'": ', value => {
                const store = new KeyValueStore();
                
                store.put(key, value);
                
                rl.close();
                renderKeyValueStoreMenu(previousMenu);
            });
        });
    });
    menu.add('GET', () => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
            
        rl.question('Write the key: ', key => {
            const store = new KeyValueStore();
            
            console.log('Value for key "'+key+'": ' + store.get(key));

            rl.question('Press any key to go back...', key => {
                rl.close();
                renderKeyValueStoreMenu(previousMenu);
            });
        });
    });
    menu.writeSeparator();
    menu.add('BACK', previousMenu);
} 

module.exports = renderKeyValueStoreMenu;