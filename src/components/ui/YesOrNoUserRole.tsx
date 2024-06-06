
interface Props{
    readonly temp: boolean;
}

export default function YesRoNoUserRole({
    temp
}:Props){
    return (
        <div className="yes-or-no">
            {temp? (
                <span className="text-success fw-bold">YES</span>
            ):(
                <span className="text-danger fw-bold">NO</span>
            )}
        </div>
    )
}