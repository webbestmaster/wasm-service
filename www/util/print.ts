/* __global document, location, requestAnimationFrame */

/*
Export function sendToPrint(htmlCode: string): undefined {
    const iframe = document.createElement("iframe");

    iframe.src = location.origin;

    iframe.style.position = "fixed";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.overflow = "hidden";

    iframe.addEventListener(
        "load",
        () => {
            iframe.contentWindow?.document.write(htmlCode);
            iframe.contentWindow?.print();

            requestAnimationFrame(() => {
                iframe.remove();
            });
        },
        false
    );

    document.body.append(iframe);
}
*/
