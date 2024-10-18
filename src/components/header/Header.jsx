import UserData from "../userData/UserData";


function Header() {
  return (
    <header className='w-full bg-blue-500 flex h-[100px] relative items-center p-[20px]'>
      <h1 className='text-white text-[30px] '>Hotel Management System</h1>
      <UserData name="Oshan" image="https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"/>
    </header>
  );
}

export default Header;
