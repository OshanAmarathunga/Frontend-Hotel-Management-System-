import UserData from "../userData/UserData";


function Header({scrollToAboutUs,scrollToGallery}) {
  return (
    <header className='w-full backdrop-blur-md  flex h-[100px] relative items-center p-[20px]'>
      <h1 className='text-black text-[30px] font-bold'>HOTEL OCEAN BREEZE</h1>
      <UserData scrollToAboutUs={scrollToAboutUs} scrollToGallery={scrollToGallery} name="Oshan" image="https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"/>
    </header>
  );
}

export default Header;
