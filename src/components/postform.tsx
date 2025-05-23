"use client"
import { useUser } from "@clerk/nextjs"
import {useRef} from "react"
import { Avatar , AvatarImage , AvatarFallback } from "@radix-ui/react-avatar"
import { Button } from "./ui/button";
import { ImageIcon, XIcon } from "lucide-react";
import { useState } from "react";
import createPostAction from "../../actions/createpostaction";


function Postform() {
    const ref = useRef<HTMLFormElement>(null);
    const fileInputRef =useRef<HTMLInputElement>(null);
    const {user} = useUser();
    const [preview , setPreview] = useState <string | null> (null);

    const handlePostAction = async (FormData :FormData )=>{
        const formDataCopy = FormData ;
        ref.current?.reset();

        const text = formDataCopy.get("postInput") as string;

        if (!text.trim()){
            throw new Error("Post input is required");
        }

        setPreview(null);

        try{
            await createPostAction(formDataCopy);
        }catch(error){
            console.log("Error creating post ",error)
        }
    }


    const handleImageChange =(event: React.ChangeEvent<HTMLInputElement>)=>{
        const file =event.target.files?.[0];
        if (file){
            setPreview(URL.createObjectURL(file));
        }
    }


    const firstName = user?.firstName ;
    const lastName = user?.lastName ;
    const imageUrl = user?.imageUrl ;
  return (
    <div className="mb-2">
        <form ref={ref} action={formData=>{
            // handel submission 
            handlePostAction(formData);

            // toast notification 
        }} className="p-3 bg-white border rounded-lg">
            <div className="flex items-center space-x-2">
                <Avatar>
                    {user?.id ?(
                        <AvatarImage src={imageUrl} className="h-10 w-10 rounded-full" />
                    ) : (
                        <AvatarImage src="https://github.com/shadcn.png" className="h-10 w-10 rounded-full" />
                    )}
                    
                    <AvatarFallback>
                        {firstName?.charAt(0)} 
                        {lastName?.charAt(0)}
                    </AvatarFallback>
                </Avatar>

                <input  type="text" name="postInput" placeholder="Start writing a post ..."
                    className="flex-1 outline-none rounded-full py-3 px-4 border"/>
            </div>

            <input ref={fileInputRef} type="file" name="image" accept="image/*" 
                hidden  onChange={handleImageChange}/>
            
            <button type="submit" hidden>
                Post
            </button>

            {/* preview check */}
            {
                preview && (
                    <div className="mt-3">
                        <img src={preview} alt="previw" className="w-full object-cover"/>
                    </div>
                )
            }
            <div className="flex justify-end mt-2 space-x-2">
                <Button type="button" onClick={()=> fileInputRef.current?.click()}>
                    <ImageIcon className="mr-2" size={16} color="currentColor"/>
                    {preview ? "Change":"Add"} Image
                </Button>

            {/* add a remove preview button */}

            {
                preview && (
                    <Button variant="outline" type="button" onClick={()=> setPreview(null)}>
                        <XIcon className="mr-2" size={16} color="currentColor" />
                        Remove Image
                    </Button>
                )
            }
            </div>
        </form>

        <hr className="mt-2 border-gray-300"/>
    </div>
  )
}
export default Postform