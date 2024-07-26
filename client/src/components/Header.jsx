import { Link } from "react-router-dom";
function Header() {
  return (
    <>
      <div className="flex justify-between p-4">
        <div>Tailwind</div>
        <div className="flex ">
          <ul className="flex gap-3 font-medium cursor-pointer">
          <Link to={"/"}>
            Home
            </Link>
            <Link to={"/booking"}>
            Booking
            </Link>
            <li>Contact</li>
            <li>Blog</li>
          </ul>
        </div>

        <div>block</div>
      </div>
    </>
  );
}

export default Header;
