import {
    BellIcon,
    HashtagIcon,
    BookmarkIcon,
    CollectionIcon,
    DotsCircleHorizontalIcon,
    MailIcon,
    UserIcon,
    HomeIcon,
} from '@heroicons/react/outline'
import SidebarRow from './SidebarRow'
import { useSession, signIn, signOut } from 'next-auth/react'

function Sidebar() {
  const { data: session } = useSession()
  return (
    <div className='flex flex-col col-span-1 sm:col-span-2 px-4 items-center sm:items-start'>
        <img src="https://links.papareact.com/drq" alt="" className='h-10 w-10 m-3 object-contain rounded-full' />
        <SidebarRow Icon = {HomeIcon} title = "Home"/>
        <SidebarRow Icon = {HashtagIcon} title = "Explore"/>
        <SidebarRow Icon = {BellIcon} title = "Notifications"/>
        <SidebarRow Icon = {MailIcon} title = "Messages"/>
        <SidebarRow Icon = {BookmarkIcon} title = "Bookmarks"/>
        <SidebarRow Icon = {CollectionIcon} title = "Lists"/>
        <SidebarRow onClick = {session ? signOut : signIn } Icon = {UserIcon} title = {session ? 'Sign Out': 'Sign In'}/>
        <SidebarRow Icon = {DotsCircleHorizontalIcon} title = "More"/>
    </div>
  )
}

export default Sidebar