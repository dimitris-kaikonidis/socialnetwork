import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProfilePic } from "../../redux/actions";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../utilities/cropImage";
import dataURLtoFile from "../../utilities/upload";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";
import Button from "../../components/Button/Button";
// import useSnapshot from "../../custom-hooks/useSnapshot";

import "./styles.css";

export default function Uploader(props) {
    const [file, setFile] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    // const [canvasRef, takeSnapshot] = useSnapshot(true);
    const profilePictureUrl = useSelector(state => state.user && state.user.profile_picture_url)

    const dispatch = useDispatch();

    const handleFileChange = event => setFile(event.target.files[0]);
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => setCroppedAreaPixels(croppedAreaPixels), []);

    const uploadFile = async () => {
        try {
            const url = URL.createObjectURL(file);
            const croppedImage = await getCroppedImg(
                url,
                croppedAreaPixels,
            );
            const base64ToFile = dataURLtoFile(croppedImage, file.name);
            const formData = new FormData();
            formData.append("file", base64ToFile);
            dispatch(editProfilePic(formData));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div id="uploader">
            {file ?
                <div id="upload-img-container">
                    <div id="cropper">
                        <Cropper
                            image={URL.createObjectURL(file)}
                            crop={crop}
                            aspect={1 / 1}
                            zoom={zoom}
                            cropShape="round"
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                            showGrid={false}
                        />
                    </div>
                </div>
                :
                <ProfilePicture pictureUrl={profilePictureUrl} />
            }
            <Button className="close" icon="/assets/close.svg" action={props.closeUpload} />
            <label>
                <span>{file ? file.name : "Choose File..."}</span>
                <input id="choose-file" name="file" type="file" accept="image/*" onInput={handleFileChange} />
                <Button id="upload" name="Upload" action={uploadFile} />
                <Button className="cancel" icon="/assets/close.svg" action={() => setFile(null)} />
            </label>
            {/* <canvas width={400} height={400} ref={canvasRef} />
            <button onClick={takeSnapshot}>Take Snapshot</button> */}
        </div>
    );
}
