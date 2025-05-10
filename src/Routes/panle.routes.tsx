import { lazy, Suspense } from "react";
import PanelLayout from "../leyout/PanleLeyout";
import Loading from "../components/commoen/Loading";
  
const Forms= lazy (()=> import ("../components/commoen/Forms"))
const Suspenswrapper : React.FC <{children:React.ReactNode }>=({children})=>{
    return <Suspense fallback={<Loading/>}>{children}</Suspense>
}


const PanelRoutes = {
path: "/panle",
 element: <PanelLayout/>,
children : [{
path: "",
element: <Suspenswrapper>
    <Forms/>
</Suspenswrapper>,

    
}

]

};

export default PanelRoutes;