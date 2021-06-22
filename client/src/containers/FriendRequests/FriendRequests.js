import "./styles.css";
import Loading from "../../components/Loading/Loading";
import Button from "../../components/Button/Button";
import axios from "../../utilities/axios";
import { useState } from "react";

export default function FriendRequests(props) {
    const [receivedFriendRequests, setReceivedFriendRequests] = useState([]);
    const [sentFriendRequests, setSentFriendRequests] = useState([]);
    const [visibility, setVisibility] = useState(false);
    const { id } = props;

    const getFriendRequests = async () => {
        try {
            const response = await axios.get(`/api/friends/requests?id=${id}`);
            setReceivedFriendRequests([...response.data]);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div id="friend-requests">
            <Button
                icon="/assets/friend_requests.svg"
                action={() => {
                    getFriendRequests();
                    setVisibility(!visibility);
                }}
            />
            <ul id="friend-requests-result">
                {visibility
                    ?
                    receivedFriendRequests.length || sentFriendRequests.length
                        ?
                        receivedFriendRequests.map(request =>
                            <li key={request.id}>1222222222</li>
                        )
                        : <Loading type="friends-loading" />
                    :
                    null
                }
            </ul>
        </div>
    );
}