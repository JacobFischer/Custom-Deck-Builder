export function escapeRegExp(str: string) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

export function replaceAll(target: string, search: string, replacement: string): string {
    return target.replace(new RegExp(escapeRegExp(search), 'g'), replacement);
    //return target.split(search).join(replacement);
};

interface match {
    start: number,
    end: number,
    str: string,
}

export function surroundText(search: string, regex: RegExp, front: string, end: string): string {
    let matches: match[] = [];
    while (true) {
        let result = regex.exec(search);

        if (result) {
            matches.push({
                start: result.index,
                end: result.index + result[0].length,
                str: result[0]
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
        search = search.substring(0, match.start + addedLength) + front + match.str + end +  search.substring(match.end + addedLength)
        addedLength += addLength;
    }

    return search;
}
