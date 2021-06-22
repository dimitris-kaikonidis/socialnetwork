import axios from "../../utilities/axios";
import FriendButton from "./FriendButton.js";
import { render, act } from "@testing-library/react";
jest.mock("../../utilities/axios");

const NOT_FRIENDS = "not_friends";
const FRIENDS = "friends";
const FRIEND_REQUEST_MADE_BY_ME = "friend_request_made_by_me";
const FRIEND_REQUEST_MADE_TO_ME = "friend_request_made_to";

test("Status: Not Friends, Icon: Add Friend", async () => {
    axios.get.mockClear().mockResolvedValue({
        data: { status: NOT_FRIENDS },
    });
    let container;
    await act(async () => {
        container = render(<FriendButton otherUserId={2} />).container;
    });
    expect(axios.get.mock.calls.length).toBe(1);
    const button = container.querySelector("img");
    expect(button).toBeTruthy();
    expect(button).toHaveAttribute("src", "/assets/add_friend.svg");
});

test("Status: Friend Request by me, Icon: Delete Request *** Same as Delete Friend", async () => {
    axios.get.mockClear().mockResolvedValue({
        data: { status: FRIEND_REQUEST_MADE_BY_ME },
    });
    let container;
    await act(async () => {
        container = render(<FriendButton otherUserId={2} />).container;
    });
    expect(axios.get.mock.calls.length).toBe(1);
    const button = container.querySelector("img");
    expect(button).toBeTruthy();
    expect(button).toHaveAttribute("src", "/assets/reject_friend.svg");
});

test("Status: Friends, Icon: Delete Friend *** Same as Delete Request", async () => {
    axios.get.mockClear().mockResolvedValue({
        data: { status: FRIENDS },
    });
    let container;
    await act(async () => {
        container = render(<FriendButton otherUserId={2} />).container;
    });
    expect(axios.get.mock.calls.length).toBe(1);
    const button = container.querySelector("img");
    expect(button).toBeTruthy();
    expect(button).toHaveAttribute("src", "/assets/delete_friend.svg");
});

test("Status: Not Friends & Request to me, Icon: Accept Friend", async () => {
    axios.get.mockClear().mockResolvedValue({
        data: { status: FRIEND_REQUEST_MADE_TO_ME },
    });
    let container;
    await act(async () => {
        container = render(<FriendButton otherUserId={2} />).container;
    });
    expect(axios.get.mock.calls.length).toBe(1);
    const button = container.querySelector("#accept-friend > img");
    expect(button).toBeTruthy();
    expect(button).toHaveAttribute("src", "/assets/accept_friend.svg");
});

test("Status: Not Friends & Request to me, Icon: Reject Friend", async () => {
    axios.get.mockClear().mockResolvedValue({
        data: { status: FRIEND_REQUEST_MADE_TO_ME },
    });
    let container;
    await act(async () => {
        container = render(<FriendButton otherUserId={2} />).container;
    });
    expect(axios.get.mock.calls.length).toBe(1);
    const button = container.querySelector("#reject-friend > img");
    expect(button).toBeTruthy();
    expect(button).toHaveAttribute("src", "/assets/reject_friend.svg");
});

