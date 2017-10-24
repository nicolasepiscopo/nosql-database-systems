const createMenu = require('simple-terminal-menu');
const readline = require('readline'); 
const renderKeyValueStoreMenu = require('./keyValueStoreMenu.js');
const renderDocumentStoreMenu = require('./documentStoreMenu.js');

function showSelection(label, marker) {
    console.log("label: " + label + "; marker: " + marker + ";")
}

function renderMainMenu () {
    var menu = createMenu({
        x: 3,
        y: 2
    });
    menu.writeLine('NoSQL Database Systems');
    menu.writeSeparator();
    menu.add('KEY VALUE STORE', renderKeyValueStoreMenu.bind(this, renderMainMenu));
    menu.add('DOCUMENT STORE', renderDocumentStoreMenu.bind(this, renderMainMenu));
    menu.writeSeparator();
    menu.add('EXIT', menu.close);
}

module.exports = renderMainMenu;