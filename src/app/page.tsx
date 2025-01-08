import NavBar from '@/components/Navbar/Navbar';
import Home from '@/components/Home/Home';
import About from '@/components/About/About';
import Education from '@/components/Education/Education';
import Project from '@/components/Projects/Project';
import Contacts from '@/components/Contacts/Contacts';
import SideMenu from '@/components/SideMenu/SideMenu';
import Footer from '@/components/Footer/Footer';

export default function App() {
  return (
    <div className="w-full h-full">
      <div id="home">
        <NavBar></NavBar>
      </div>
      <div>
        <SideMenu></SideMenu>
      </div>
      <div className='flex justify-between w-full h-full px-4 2xl:px-16'>
        <Home></Home>
      </div>
      <div className='flex justify-between w-full h-full px-4 2xl:px-16 mt-[200px]' id="about">
        <About></About>
      </div>
      <div className='flex justify-between w-full h-full px-4 2xl:px-16 mt-[200px]' id="education">
        <Education></Education>
      </div>
      <div className='flex justify-between w-full h-full px-4 2xl:px-16 mt-[200px]' id="project">
        <Project></Project>
      </div>
      <div className='flex justify-between w-full h-full px-4 2xl:px-16 mt-[200px]' id="contacts">
        <Contacts></Contacts>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
}