import "./styles.css";

export default function MusicSkillsBadges({ skills }) {
    return (
        <div className="music-skills-badges">
            {skills.vocals && <img src="/assets/vocals.png" alt="vocals" />}
            {skills.guitar && <img src="/assets/guitar.png" alt="guitar" />}
            {skills.bass && <img src="/assets/bass.png" alt="bass" />}
            {skills.drums && <img src="/assets/drums.png" alt="drums" />}
            {skills.keyboards && <img src="/assets/keyboards.png" alt="keyboards" />}
        </div>
    );
}