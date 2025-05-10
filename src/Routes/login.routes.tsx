

import { lazy, Suspense } from "react";
import LoginLayout from "../assets/leyout/LoginLayout";
import Loading from "../components/commoen/Loading";
const Forms= lazy (()=> import ("../components/commoen/Forms"))
const Suspenswrapper : React.FC <{children:React.ReactNode }>=({children})=>{
    return <Suspense fallback={<Loading/>}>{children}</Suspense>

}

const LoginRoutes = {
path: "/login",
element: <LoginLayout/>
,
children : [{
path: "",
element: <Suspenswrapper>
    <Forms/>
</Suspenswrapper>,

    
}

]

};

export default LoginRoutes;