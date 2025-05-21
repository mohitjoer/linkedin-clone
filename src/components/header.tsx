import { HomeIcon, SearchIcon,Briefcase, UsersIcon, MessagesSquare } from "lucide-react";
import Image from "next/image";

function Header() {
  return (
    <div className="flex items-center p-2 max-w-6xl mx-auto ">
        <Image
          src="https://links.papareact.com/b3z"
          alt="logo"
          width={40}
          height={40}
          className="rounded-lg"/>

          <div className="flex-1">
            <form className="flex items-center space-x-1 bg-gray-100 p-2 rounded-mg flex-1 mx-2 max-w-96">
                <SearchIcon className="h-4 text-gray-600"/>
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent flex-1 outline-none "/>
            </form>
          </div>


          <div className="flex items-center space-x-2 justify-end">
            <a href="/" className="icon">
                <HomeIcon className="h-5"/>
                <p>Home</p>
            </a>
            <a href="/" className="icon hidden md:flex">
                <UsersIcon className="h-5"/>
                <p>Network</p>
            </a>
            <a href="/" className="icon hidden md:flex">
                <Briefcase className="h-5"/>
                <p>Jobs</p>
            </a>
            <a href="/" className="icon hidden md:flex">
                <MessagesSquare className="h-5"/>
                <p>Messaging</p>
            </a>
            
            {/* user Buttton */}


            {/* if not signed in  */}
          </div>
    </div>
  )
}
export default Header