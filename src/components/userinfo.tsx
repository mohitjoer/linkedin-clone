import { currentUser } from "@clerk/nextjs/server"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SignedIn ,SignInButton ,SignedOut } from "@clerk/nextjs"
import { Button } from "./ui/button";
import { IPostDocument } from "../../mongodb/models/post"; 

async function Userinfo({posts}:{posts : IPostDocument[]}) {
    const user = await currentUser()
    const firstName = user?.firstName ;
    const lastName = user?.lastName ;
    const imageUrl = user?.imageUrl ;


    const userPosts = posts.filter(post => post.user.userId === user?.id);

    const userComment = posts.flatMap((post) =>
    post?.comments?.filter((comment) => comment.user.userId === user?.id) || []
   );
  return (
    <div className="flex flex-col items-center justify-center mr-6  bg-white rounded-lg border py-4 shadow-md">
        <Avatar>
            {user?.id ?(
                <AvatarImage src={imageUrl }/>
            ) :(
                <AvatarImage src="https://github.com/shadcn.png"/>
            )}
            
            <AvatarFallback>
                {firstName?.charAt(0)} 
                {lastName?.charAt(0)}
            </AvatarFallback>
        </Avatar>
        <SignedIn>
            <div className="text-center">
                <p className="font-semibold">
                    {firstName} {lastName}
                </p>

                <p className="text-xs">
                    @{firstName}{lastName}-{user?.id?.slice(-4)}
                </p>
            </div>
        </SignedIn>

        <SignedOut>
            <div className="text-center space-y-2">
                <p className="font-semibold">You are not signed in.</p>
                <Button asChild className="bg-[#0B63C4] text-white" >
                   <SignInButton>Sign In</SignInButton>
                </Button>
            </div>
        </SignedOut>

        <hr className="w-full border-gray-200 my-5"/>

        <div className="flex justify-between w-full px-4 text-sm">
            <p className="font-semibold text-gray-400">Posts</p>
            <p className="text-gray-400">{userPosts.length}</p>
        </div>

         <div className="flex justify-between w-full px-4 text-sm">
            <p className="font-semibold text-gray-400">Comments</p>
            <p className="text-gray-400">{userComment.length}</p>
        </div>

    </div>
  )
}
export default Userinfo