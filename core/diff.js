function diff(oldVdom, newVdom) {
    if (oldVdom.tag !== newVdom.tag) {
       
        return newVdom;
    }

    if (oldVdom.type === "text") {
        if (oldVdom.value !== newVdom.value) {
            return newVdom;
        }
    }
}
