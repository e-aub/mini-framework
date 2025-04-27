const refs = new Map();

function useRef(key) {
    if (key === "BODY") {
        return document.body;
    }
    return refs.get(key);
}

export { useRef, refs };
