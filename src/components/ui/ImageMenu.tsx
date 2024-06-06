import "./assets/image-menu.scss"

interface Props{
    readonly setImage: (value: any) => void;
    readonly deleteImage: (value: any) => void;
    readonly imageMenuData: any[];
}

export default function ImageMenu({
    setImage,
    deleteImage,
    imageMenuData,
}:Props){
    return (
        <div className="image-menu-wrapper">
            {imageMenuData && imageMenuData.map((image: any)=>{
                return (
                    <div 
                        className="image-menu-item"
                        onClick={()=>setImage(image)}
                        >
                        <img src={image.imageBytes} width="100%" height="100%" alt="" />
                    </div>
                )
            })}
        </div>
    )
}