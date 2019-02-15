const measureDomNode = (node, enhanceMeasurableNode = e => e) => {
    const container = document.createElement("div");
    container.style = {
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        visibility: "hidden",
        zIndex: -1
    };
    const clonedNode = node.cloneNode(true);
    const content = enhanceMeasurableNode(clonedNode);

    container.appendChild(content);
    document.body.appendChild(container);

    const height = container.offsetHeight;
    const width = container.offsetWidth;

    container.parentNode.removeChild(container);

    return {width, height};
}

const enhanceMeasurableNode = node => {
    node.style.height = "auto";
    node.style.maxHeight = "none";
    return node;
}
export const measureSubmenu = node => measureDomNode(node, enhanceMeasurableNode);
