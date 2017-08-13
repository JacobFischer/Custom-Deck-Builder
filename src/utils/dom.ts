/* Useful functions for DOM Elements */

/**
 * Private scope function used to generate template functions below
 * @param required the html string required from handlebars
 * @param args optional args to apply to the template
 * @returns the newly creates node of the strings makeup
 */
function createNodeFromTemplate(
    required: (args: object) => string, args?: object): Node {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = required(args);
    const node = tempDiv.firstChild;
    node.parentElement.removeChild(node);

    return node;
}

/**
 * Takes a handlebars file require()'d, and creates a dom generating function
 * @param required the string that represents html element(s)
 * @returns a template function that generates new instances of that dom string
 */
export function template(required: (args: object) => string): (args?: object) => Node {
    return (args?: object): Node => createNodeFromTemplate(required, args);
}

/**
 * Expands an expandable HTMLElement smoothly via CSS animations
 * (assumes you use the styles in the utils.scss file)
 * @param element the element to animate expanding
 * @returns a promise which resolved once the expand animation finishes
 */
export function expand(element: HTMLElement): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        element.classList.add("measuring");
        setTimeout(() => {
            const height = `${element.clientHeight}px`;
            element.classList.remove("measuring");
            setTimeout(() => {
                element.style.height = height;
                element.classList.add("expanded");
                setTimeout(() => {
                    element.classList.remove("expanded", "expandable");
                    element.style.height = "";
                    resolve();
                }, 350);
            }, 50);
        }, 50);
    });
}

/**
 * Selects a child element from an HTMLElement based on class, id, or tag
 * @param from the html element to select a sub child from
 * @param query what to select. start with a . for classes, # for id, and
 *              neither for a tag
 * @returns the child element, if found
 */
export function select(from: HTMLElement, query: string): HTMLElement {
    if (query.startsWith(".")) {
        return from.getElementsByClassName(query.substr(1))[0] as HTMLElement;
    }

    if (query.startsWith("#")) {
        return document.getElementById(query.substr(1)) as HTMLElement;
    }

    // else assume it's a tag
    return from.getElementsByTagName(query)[0] as HTMLElement;
}
