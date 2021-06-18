import ProfilePicture from "./ProfilePicture";
import { render, fireEvent } from "@testing-library/react";

test("default pic when no url", () => {
    const { container } = render(<ProfilePicture />);
});

test("image has correct src", () => {
    const { container } = render(<ProfilePicture url="/test.pic" />);
    expect(container.querySelector("img").src).toContain("/test.pic");
});

test("onClick props get attached as an event listener to divs", () => {
    const mockClickHandler = jest.fn(() => console.log("Clicked!"));
    const { container } = render(<ProfilePicture clickHandler={mockClickHandler} />);
    fireEvent.click(container.querySelector("img"));

    expect(mockClickHandler).toToHaveBeenCalled(1);
});
