import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSkills } from "../../redux/actions";
import Button from "../../components/Button/Button";
import "./styles.css";

export default function MusicSkills() {
    const dispatch = useDispatch();
    const id = useSelector(state => state.user && state.user.id);
    const skills = useSelector(state => state.skills);
    const [tempSkills, setTempSkills] = useState({});
    const [visibility, setVisibility] = useState(false);
    const [justBlurred, setJustBlurred] = useState(false);
    const skillsRef = useRef();

    useEffect(() => setTempSkills(skills), [skills]);

    useEffect(() => {
        if (skillsRef.current && visibility) {
            skillsRef.current.focus();
        }
    }, [visibility]);

    const handleChange = (event) => setTempSkills({ ...tempSkills, [event.target.name]: !tempSkills[event.target.name] });
    const saveChanges = () => {
        dispatch(updateSkills(id, tempSkills));
        setVisibility(false);
    };

    const toggleVisibility = () => {
        if (justBlurred) {
            setJustBlurred(false);
            return;
        }
        setVisibility(true);
    };
    const handleBlur = (event) => {
        if (skillsRef.current.contains(event.relatedTarget)) return;
        setVisibility(false);
        setJustBlurred(true);
    };

    return (
        <div className="music-skills">
            <Button icon="/assets/music_skills.svg" alt="music skills" action={toggleVisibility} />
            {visibility &&
                <ul id="skills-list" tabIndex="0" ref={skillsRef} onBlur={handleBlur}>
                    <div className="arrow-up"></div>
                    <h4>Your Skills</h4>
                    <li className="skill" >
                        <img src="/assets/vocals.png" alt="vocals" />
                        <label htmlFor="vocals">Vocals</label>
                        <input type="checkbox" id="vocals" name="vocals" value={skills.vocals} onChange={handleChange} defaultChecked={skills.vocals} />
                    </li>
                    <li className="skill">
                        <img src="/assets/guitar.png" alt="guitar" />
                        <label htmlFor="guitar">Guitar</label>
                        <input type="checkbox" id="guitar" name="guitar" value={skills.guitar} onChange={handleChange} defaultChecked={skills.guitar} />
                    </li>
                    <li className="skill">
                        <img src="/assets/bass.png" alt="bass guitar" />
                        <label htmlFor="bass">Bass</label>
                        <input type="checkbox" id="bass" name="bass" value={skills.bass} onChange={handleChange} defaultChecked={skills.bass} />
                    </li>
                    <li className="skill">
                        <img src="/assets/drums.png" alt="drums" />
                        <label htmlFor="drums">Drums</label>
                        <input type="checkbox" id="drums" name="drums" value={skills.drums} onChange={handleChange} defaultChecked={skills.drums} />
                    </li>
                    <li className="skill">
                        <img src="/assets/keyboards.png" alt="keyboards" />
                        <label htmlFor="keyboards">Keyboards</label>
                        <input type="checkbox" id="keyboards" name="keyboards" value={skills.keyboards} onChange={handleChange} defaultChecked={skills.keyboards} />
                    </li>
                    <Button name="Save" action={saveChanges} />
                </ul>
            }
        </div >
    );
}