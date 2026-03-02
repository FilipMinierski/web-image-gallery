
class Vanilla {
    static #elementArgsProto = {
        tag: "div",
        className: "",
        id: "",
        name: "",
        href: "",
        innerHTML: "",
        parent: null
    };

    static createElement(args) {
        let _args = Object.create(this.#elementArgsProto);
        Object.assign(_args, args);

        let element = document.createElement(args.tag);
        element.className = _args.className;
        element.id = _args.id;
        element.name = _args.name;
        element.innerHTML = _args.innerHTML;

        if (Vanilla.isElement(_args.parent)) 
        {
            _args.parent.appendChild(element);
        }

        return element;
    }

    /** Returns true if element is an HTMLElement, else false. */
    static isElement(element) {
        return element instanceof HTMLElement;
    }
}


class VComponent
{
    /**
     * @param {HTMLElement} root 
     */
    constructor(root)
    {
        this.root = root;
    }
}


class VUtils
{
    /**
     * 
     * @param {string} str 
     * @returns string
     */
    static capitalise(str)
    {
        if (typeof(str) === "string") 
        {
            str = str[0].toUpperCase() + str.substring(1);
        }
        return str;
    }
}
