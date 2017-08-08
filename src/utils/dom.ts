// useful functions for DOM Elements

/**
 * Private scope function used to generate template functions below
 * @param required the html string required from handlebars
 * @param args optional args to apply to the template
 * @returns the newly creates node of the strings makeup
 */
function createNodeFromTemplate(required: (args: object) => string, args?: object): Node {
    const tempDiv = document.createElement('div');
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
    return (args: object): Node => {
        return createNodeFromTemplate(required, args);
    };
}

/**
 * Expands an expandable HTMLElement smoothly via CSS animations
 * (assumes you use the styles in the utils.scss file)
 * @param element the element to animate expanding
 */
export function expand(element: HTMLElement): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        element.classList.add('measuring');
        setTimeout(() => {
            const height = `${element.clientHeight}px`;
            element.classList.remove('measuring');
            setTimeout(() => {
                element.style.height = height;
                element.classList.add('expanded');
                setTimeout(() => {
                    element.classList.remove('expanded', 'expandable');
                    element.style.height = '';
                    resolve();
                }, 350);
            }, 50);
        }, 50);
    });
}
