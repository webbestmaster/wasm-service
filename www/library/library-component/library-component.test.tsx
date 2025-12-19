/* global HTMLElement */
import {describe, expect, it} from "@jest/globals";
import {render, screen} from "@testing-library/react";

import {LibraryComponent} from "./library-component";

describe("libraryComponent", () => {
    it("default state", () => {
        expect.assertions(1);

        render(<LibraryComponent textContent="some text">child node</LibraryComponent>);

        expect(screen.getByText("child node") instanceof HTMLElement).toBe(true);
    });
});
