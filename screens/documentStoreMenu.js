var createMenu = require('simple-terminal-menu');
const readline = require('readline'); 
//stores
const DocumentStore = require('../engines/document-store.js');

function showSelection(label, marker) {
    console.log("label: " + label + "; marker: " + marker + ";")
}

function renderDocumentStoreMenu (previousMenu) {
    var menu = createMenu({
        x: 3,
        y: 2
    });
    menu.writeLine('Document Store');
    menu.writeSeparator();
    menu.add('QUERY', () => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
            
        rl.question('Collection: ', collection => {
            rl.question('Query (JSON format): ', query => {
                const store = new DocumentStore();
                const repository = store.getCollection(collection);
                
                try {
                    const result = repository.find(JSON.parse(query));
                    
                    if (result.length)
                        result.forEach(result => console.log(result));
                    else
                        console.log('Empty result set.');
                } catch (e) {
                    console.log('Invalid JSON object');
                }

                rl.question('Press any key to go back...', () => {
                    rl.close();
                    renderDocumentStoreMenu(previousMenu);
                });
            });
        });
    });
    menu.add('QUERY FIELD', () => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
            
        rl.question('Collection: ', collection => {
            rl.question('Query (JSON format): ', query => {
                rl.question('Field path ([myobject.]target.field): ', path => {
                    const store = new DocumentStore();
                    const repository = store.getCollection(collection);
                    
                    try {
                        const result = repository.find(JSON.parse(query), path);

                        if (result.length)
                            result.forEach(result => console.log(result));
                        else
                            console.log('Empty result set.');
                    } catch (e) {
                        console.log('Invalid sources provided');
                    }

                    rl.question('Press any key to go back...', () => {
                        rl.close();
                        renderDocumentStoreMenu(previousMenu);
                    });
                });
            });
        });
    });
    menu.add('CREATE', () => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
            
        rl.question('Collection: ', collection => {
            rl.question('Object (JSON format):', object => {
                const store = new DocumentStore();
                const repository = store.getCollection(collection);
                
                try {
                    repository.insert(JSON.parse(object));
                    console.log('Object added successfully to the ' + collection + ' collection!');
                } catch (e) {
                    console.log('Invalid JSON object');
                }

                rl.question('Press any key to go back...', query => {
                    rl.close();
                    renderDocumentStoreMenu(previousMenu);
                });
            });
        });
    });
    menu.add('UPDATE', () => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
            
        rl.question('Collection: ', collection => {
            rl.question('Query (JSON format):', query => {
                rl.question('Field path to update ([myobject.]target.field): ', path => {
                    rl.question('Value: ', value => {
                        const store = new DocumentStore();
                        const repository = store.getCollection(collection);
                        
                        try {
                            repository.update(JSON.parse(query), path, value);
                            console.log('Object/s updated successfully in the ' + collection + ' collection!');
                            repository.find(JSON.parse(query)).forEach(updated => console.log(updated));
                        } catch (e) {
                            console.log('Invalid JSON object');
                        }

                        rl.question('Press any key to go back...', query => {
                            rl.close();
                            renderDocumentStoreMenu(previousMenu);
                        });
                    });
                });
            });
        });
    });
    menu.add('DELETE', () => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
            
        rl.question('Collection: ', collection => {
            rl.question('Query (JSON format):', query => {
                const store = new DocumentStore();
                const repository = store.getCollection(collection);
                
                try {
                    repository.remove(JSON.parse(query));
                    console.log('Object/s deleted successfully from the ' + collection + ' collection!');
                } catch (e) {
                    console.log('Invalid JSON object');
                }

                rl.question('Press any key to go back...', query => {
                    rl.close();
                    renderDocumentStoreMenu(previousMenu);
                });
            });
        });
    });
    menu.writeSeparator();
    menu.add('BACK', previousMenu);
}

module.exports = renderDocumentStoreMenu;