import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "../../utilities/axios";
import Slider from "react-slick";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import MusicSkillsBadges from "../MusicSkillsBadges/MusicSkillsBadges";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles.css";

export default function Slides() {
    const skills = useSelector(state => state.skills);
    const [recommended, setRecommended] = useState([]);

    useEffect(() => {
        if (Object.keys(skills).length) {
            let skillsArr = [];
            for (let key in skills) {
                if (skills[key] !== true) {
                    delete skills[key];
                } else {
                    skillsArr.push(key);
                }
            }
            const queryStr = skillsArr.join("+");
            (async () => {
                try {
                    const response = await axios.get(`/api/recommended?skills=${queryStr}`);
                    console.log(response.data);
                    setRecommended(response.data);
                } catch (error) {
                    console.log(error);
                    setRecommended([]);
                }
            })();
        }
    }, [skills]);

    const settings = {
        dots: true,
        // infinite: true,
        // autoplay: true,
        autoplaySpeed: 5000
    };

    return (
        <div className="slide-container">
            <Slider {...settings}>
                {recommended.length
                    ? recommended.map(user => {
                        const { vocals, guitar, bass, drums, keyboards } = user;
                        const skills = { vocals, guitar, bass, drums, keyboards };
                        return (
                            <li key={user.id} className="recommended-user">
                                <Link to={`/user/${user.id}`}>
                                    <ProfilePicture pictureUrl={user.profile_picture_url} />
                                    <div>
                                        <h1>{user.first} {user.last}</h1>
                                        <div>
                                            <p>Plays:</p>
                                            <MusicSkillsBadges skills={skills} />
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        );
                    })
                    : null
                }
                <li key="ad" className="ads">
                    <a href="https://reverb.com/" target="_blank" rel="noreferrer noopener">
                        <ProfilePicture pictureUrl={"https://i.ytimg.com/vi/igMHq7uTPCM/maxresdefault.jpg"} />
                    </a>
                </li>
            </Slider>
        </div>
    );
}




