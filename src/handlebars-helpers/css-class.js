module.exports = function(str) {
    // cast to lower case and replace spaces with '-'
    return str.toLowerCase().replace(new RegExp(' ', 'g'), '-');
};
