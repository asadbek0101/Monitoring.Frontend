interface Props{
    readonly color?: string;
    readonly height?: string;
}

export default function CustomLine({
    color = "#fff",
    height = "2px"
}:Props){
    return (
        <div className="w-100" style={{
            width: "100%",
            height: height,
            backgroundColor: color
        }}/>
    )
}