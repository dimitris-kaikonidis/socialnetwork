import "./styles.css";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import { Link } from "react-router-dom";

export default function SearchResultsBox(props) {

    const { searchResults, requestStatus, focus } = props;

    return (
        <ul id="search-results" className={focus ? "" : "hidden"} >
            {searchResults.length === 0 && requestStatus ? <p>No user found matching your search.</p> : null}
            {searchResults.map(user => (
                <li key={user.id}>
                    {!user ? null :
                        <>
                            <Link to={`/user/${user.id}`} >
                                <ProfilePicture pictureUrl={user.profile_picture_url} />
                                <p>{user.first} {user.last}</p>
                            </Link>
                        </>
                    }
                </li>
            ))}
        </ul>
    );
}