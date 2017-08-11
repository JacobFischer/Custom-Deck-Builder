// if you include this file, we'll just give you all the util functions
export * from "./dom";
export * from "./math";
export * from "./pixi";
export * from "./string";

/**
 * Clones an object except those with an empty string key/value pair
 * @param args list of objects to clone into the final result
 * @returns all the key value pairs in args merged into one new object result
 */
export function cloneExceptEmpty(...args: any[]): any {
    const result: any = {};
    for (const arg of args) {
        for (const key in arg) {
            if (Object.prototype.hasOwnProperty.call(arg, key) && arg[key] !== "") {
                result[key] = arg[key];
            }
        }
    }

    return result;
}

/**
 * Clones object(s), basically Object.assign
 * @param args list of objects to clone
 * @returns a new object with all the properties of the args shallow cloned
 */
export function clone(...args: any[]): any {
    return Object.assign.call(Object, {}, ...args);
}
