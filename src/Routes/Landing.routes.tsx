import {  lazy, Suspense } from "react";
import LandingLayout from "../leyout/LandingLeyout";
import Loading from "../components/commoen/Loading";
const Forms= lazy (()=> import ("../components/commoen/Forms"))
const Suspenswrapper : React.FC <{children:React.ReactNode }>=({children})=>{
    return <Suspense fallback={<Loading/>}>{children}</Suspense>

}
const landingRoutes = {
path: "/",
element: <LandingLayout/>,

children : [{
path: "",
element: <Suspenswrapper>
    <Forms/>
</Suspenswrapper>,

    
}

]
};


export default landingRoutes;