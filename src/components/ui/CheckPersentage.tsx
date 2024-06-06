import { useCallback } from "react";

interface Props{
    readonly persentage: string;
}

export default function CheckPersentage({
    persentage
}:Props){

    const color = useCallback(()=>{
        const rep = Number(persentage);
        if(rep >= 60){
            return "green";
        }else{
            return "red";
        }
    },[persentage]);

    return (
        <span style={{
            color: color(),
            fontWeight: "bold"
        }}>{persentage}%</span>
    )
}