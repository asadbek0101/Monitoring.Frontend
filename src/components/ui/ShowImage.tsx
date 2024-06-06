import "./assets/show-image.scss"

interface Props{
    readonly imageLink: string;
}

export default function ShowImage({
    imageLink
}:Props){
    return (
        <div className="show-image">
            <img src={imageLink} width="100%" height="100%" alt="Img" />
        </div>
    )
}