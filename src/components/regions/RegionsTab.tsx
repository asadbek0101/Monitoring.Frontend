import { useParams } from "react-router-dom"
import RegionsTableWrapper from "./RegionsTableWrapper";
import RegionsFormWrapper from "./RegionsFormWrapper";

export default function RegionsTab(){

    const { tab = "table" } = useParams();

    return (
        <>
        {tab === "table" && (
            <RegionsTableWrapper/>
        )}
        {tab === "form" && (
            <RegionsFormWrapper/>
        )}
        </>
    )
}