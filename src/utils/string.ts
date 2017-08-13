/* Contains useful string related functions */

/**
 * Tries to cast a string to a primitive value if it looks like one
 * @param value the value to try to cast. Will only work on strings.
 * @returns value as a number if it appears to be a number,
 *          or value as a boolean if it appears to be 'true' or 'false',
 *          or just value back as a string
 */
export function tryToCast(value: string | number | boolean): string | number | boolean {
    if (typeof(value) === "string") {
        // try to make it a number
        const asNum = Number(value);
        if (!isNaN(asNum)) {
            value = asNum;
        }
        else {
            // try to make it a boolean
            const lowered = value.toLowerCase();
            if (lowered === "false") {
                value = false;
            }
            else if (lowered === "true") {
                value = true;
            }
        }
    }

    return value;
}

/**
 * Converts a string in normal case (spaces) to camelCase
 * @param str the string to convert to camel case
 * @returns str now in camel case format
 * @example 'this neat variable' -> 'thisNeatVariable'
 */
export function toCamelCase(str: string): string {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (matched, index) => {
        if (+matched === 0) {
            return ""; // or if (/\s+/.test(match)) for white spaces
        }
        return index === 0 ? matched.toLowerCase() : matched.toUpperCase();
    });
}

/**
 * Converts a string from camelCase to dash-case
 * @param str string in camelCase format to convert to dash-case
 * @returns str but now in dash-case
 * @example 'thisNeatVariable' -> 'this-neat-variable'
 */
export function toDashCase(str: string): string {
    if (!str) {
        return "";
    }

    // ensure the first character is lower-cased
    str = str[0].toLowerCase() + str.substr(1);

    // and there are no spaces
    str = replaceAll(str, " ", "");

    return str.replace(/([A-Z])/g, (sub) => "-" + sub.toLowerCase());
}

/**
 * Puts escape characters in front of any non escaped characters
 * @param str the string to escape
 * @returns str now escaped
 */
export function escapeRegExp(str: string): string {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

/**
 * Removes all sub strings in <tags> from the string (strips xml tags)
 * @param str the string to remove tags from
 * @param replacement str without tagged substrings
 * @returns a string with xml tags removed
 * @example 'some<p>thing</p>' -> 'something</p>'
 */
export function removeTags(str: string, replacement: string = ""): string {
    return str.replace(/(<([^>]+)>)/ig, replacement);
}

// spell-checker:ignore hiyoutherebye

/**
 * Removes all tags from a string
 * @param str the string to remove all tags from
 * @returns the string without any tags or end tags
 * @example 'hi<p>you<b>there</b></p>bye' -> 'hiyoutherebye'
 */
export function stripTagsFromString(str: string): string {
    const div = document.createElement("div");
    div.innerHTML = str;
    return div.textContent || div.innerText || "";
}

/**
 * Replaces all instances of a search string in a target string with an optional
 * replacement string
 * @param target the target string to search for substrings to replace in
 * @param search the substring to search for in target
 * @param replacement optional replacement string to replace instances of search
 *                    with
 * @returns a string with ALL occurrences of search within target replaced with
 *          the replacement string
 */
export function replaceAll(target: string, search: string, replacement: string = ""): string {
    return target.replace(new RegExp(escapeRegExp(search), "g"), replacement);
}

interface ISurroundTextMatch {
    start: number;
    end: number;
    str: string;
}

/**
 * Searches a string for a regular expression and wraps with with a given front
 * and end string
 * @param search the string to search for
 * @param regex the regex to apply to the search string
 * @param front the string to put at the front of matches
 * @param end the string to put at the end of matches
 * @returns the string that is search with all matches of the regex having the
 *          front and end string placed around each match
 */
export function surroundText(search: string, regex: RegExp, front: string, end: string): string {
    const matches: ISurroundTextMatch[] = [];
    while (true) {
        const result = regex.exec(search);

        if (result) {
            matches.push({
                start: result.index,
                end: result.index + result[0].length,
                str: result[0],
            }); // we care about the first returned result
        }
        else {
            break; // no more matches
        }
    }

    const addLength = front.length + end.length;
    let addedLength = 0;
    for (const match of matches) {
        // bold each plus power part of the text
        search = [
            search.substring(0, match.start + addedLength),
            front,
            match.str,
            end,
            search.substring(match.end + addedLength),
        ].join("");
        addedLength += addLength;
    }

    return search;
}
