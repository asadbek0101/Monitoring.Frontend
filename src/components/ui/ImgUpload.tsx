import "./assets/upload.scss";

interface ImgUploadProps{
    readonly setImage: (value: any) => void;
    readonly className?: string;
}

export default function ImgUpload({
    setImage, 
    className
}:ImgUploadProps){

    return (
        <div className={`upload-container ${className}`}>
            <input id="fileUpload" multiple className="hidden" type="file" hidden onChange={(event: any) => setImage(event)} />
            <label className="upload-label" htmlFor="fileUpload">Загрузка изображений</label>
        </div>
    )
}