import CodeEditor from "@/components/CodeEditor"
import HelperHeader from "@/components/HelperHeader"
import RenderCode from "@/components/RenderCode"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { updatefullCode } from "@/redux/slices/compilerSlice"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { toast } from "sonner"


export default function Compiler() {
  const {urlId}=useParams();
  const dispatch=useDispatch();
  const loadCode=async()=>{
    try{
      const response=await axios.post("http://localhost:4000/compiler/load",{
        urlId:urlId,
      });
      dispatch(updatefullCode(response.data.fullCode))
    }
    catch(error){
      if(axios.isAxiosError(error)){
        if(error?.response?.status===500){
          toast("Invalid Code URL",{
            className:"bg-black text-white",
          });
        }
      }
      console.log(error);
    }
  }
  useEffect(()=>{
    if(urlId){
      loadCode();
    }
  },[urlId]);
  return (
    <div>
   
   <ResizablePanelGroup direction="horizontal">
      <ResizablePanel className="h-[calc(100dvh-60px)] min-w-[350px]" defaultSize={50}>
        <HelperHeader/>
     <CodeEditor/>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel className="h-[calc(100dvh-60px)] min-w-[350px]" defaultSize={50}>
        <RenderCode/>
      </ResizablePanel>
    </ResizablePanelGroup>

    </div>
  )
}
