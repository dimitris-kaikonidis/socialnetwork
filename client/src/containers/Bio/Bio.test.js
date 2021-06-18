import Bio from "./Bio";
import { render } from "@testing-library/react";
import { expect, test } from "@jest/globals";

test("When bio is empty render Add", () => {
    const { container } = render(<Bio bio="notempty" />);
    expect(container.querySelector("button").textContent).toBe("notempty");
});

// test("When bio is not empty render Edit", () => {

// });

