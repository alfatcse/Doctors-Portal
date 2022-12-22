import { useEffect } from "react"

const useTitleHook=(title)=>{
    useEffect(()=>{
        document.title=title
    },[title])
}
export default useTitleHook