import { FaBell } from "react-icons/fa";

function StickyNavbar({ setOpen }) {
  return (
    <nav className="container sticky mx-auto flex items-center justify-between bg-white p-4 px-4 shadow-md">
      <h1 className="text-2xl font-semibold">Notifications</h1>
      <FaBell
        onClick={() => setOpen((s) => !s)}
        className="h-6 w-6 text-blue-500 hover:cursor-pointer"
      />
    </nav>
  );
}
export default StickyNavbar;
