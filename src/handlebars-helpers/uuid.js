import * as uuid from 'uuid/v4';

const lookups = new Map();

module.exports = function(lookup, ...args) {
    let id;

    if (lookup) {
        if (lookups.has(lookup)) {
            id = lookups.get(lookup);
            lookups.delete(lookup);
        }
        else {
            id = uuid.default();
            lookups.set(lookup, id);
        }
    }

    return id || uuid.default();
};
