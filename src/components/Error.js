import { useRouteError } from "react-router-dom";



const Error = () =>{
    const  err = useRouteError();
    console.log(err);
    return(
        <div>
            <h1>Opps!! page not found</h1>
        </div>
    )
}

export default Error;