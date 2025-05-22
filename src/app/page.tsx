import Userinfo from "@/components/userinfo"
import PostForm from "@/components/postform"


export default function Home() {
  return (
   <div className="grid grid-cols-8 mt-5 sm:px-5">
    <section className="hidden md:inline md:col-span-2">
      <Userinfo/>
    </section>

    <section className="col-span-full md:col-span-6 xl:col-span-4 xl:max-w-xl mx-auto w-full">
      <PostForm/>

      {/* user feed */}
    </section>

    <section className="hidden xl:inline justify-center col-span-2">
      {/* widget */}
    </section>
   </div>
  )
}

