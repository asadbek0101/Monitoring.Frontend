import { Outlet } from "react-router-dom";
import AppLayout from "../components/app/AppLayout";

export default function AppContainer(){
    return (
        <AppLayout>
           <Outlet/>
        </AppLayout>
    )
}