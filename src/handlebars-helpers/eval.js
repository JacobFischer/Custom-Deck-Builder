module.exports = function(...args) {
    // this is sketchy as fuck
    args.pop(); // remove the handler metadata
    return eval(args.join(''));
};
