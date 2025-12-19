function returnTrue(): true {
    return true;
}

interface AjvFakeType {
    compile: () => typeof returnTrue;
}

const ajvFakeInstance: AjvFakeType = {
    compile: function compile() {
        return returnTrue;
    },
};

export default function AjvFake(): AjvFakeType {
    return ajvFakeInstance;
}
