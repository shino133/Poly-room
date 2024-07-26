import { Link } from "react-router-dom";

function Header() {

  return (
    <>
      <div className="flex justify-between p-4 items-center">
        <div>FPT</div>
        <div className="flex">
          <ul className="flex gap-5 font-medium cursor-pointer">
            <li>
              <Link to={"/"} className="hover:text-blue-500 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                to={"/booking"}
                className="hover:text-blue-500 transition-colors"
              >
                Booking
              </Link>
            </li>
            <li className="hover:text-blue-500 transition-colors">Contact</li>
            <li className="hover:text-blue-500 transition-colors">Blog</li>
          </ul>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://facebook.com"
            className=" hover:text-blue-800"
            aria-label="Facebook"
          >
            <svg width="25" height="25" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12.1c0-5.3-4.3-9.6-9.6-9.6-5.3 0-9.6 4.3-9.6 9.6 0 4.8 3.5 8.8 8.1 9.4v-6.6h-2.4v-2.8h2.4v-2.1c0-2.4 1.5-3.7 3.6-3.7 1.1 0 2.2.1 2.2.1v2.5h-1.2c-1.2 0-1.6.8-1.6 1.6v1.8h2.7l-.4 2.8h-2.3v6.6c4.6-.6 8.1-4.6 8.1-9.4z" />
            </svg>
          </a>
          <a
            href="https://instagram.com"
            className=" hover:text-purple-800"
            aria-label="Instagram"
          >
            <svg width="25" height="25" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.5 0 2.8.5 3.8 1.5s1.5 2.3 1.5 3.8c0 1.3.1 1.7.1 4.9s-.1 3.6-.1 4.9c-.1 1.5-.5 2.8-1.5 3.8s-2.3 1.5-3.8 1.5c-1.3 0-1.7.1-4.9.1s-3.6-.1-4.9-.1c-1.5 0-2.8-.5-3.8-1.5s-1.5-2.3-1.5-3.8c0-1.3-.1-1.7-.1-4.9s.1-3.6.1-4.9c.1-1.5.5-2.8 1.5-3.8s2.3-1.5 3.8-1.5zm0-2c-3.3 0-3.7 0-5 .1-2.1.1-3.9.7-5.3 2-1.4 1.4-1.9 3.2-2 5.3-.1 1.3-.1 1.7-.1 5s.1 3.7.1 5c.1 2.1.7 3.9 2 5.3s3.2 1.9 5.3 2c1.3.1 1.7.1 5 .1s3.7 0 5-.1c2.1-.1 3.9-.7 5.3-2 1.4-1.4 1.9-3.2 2-5.3.1-1.3.1-1.7.1-5s-.1-3.7-.1-5c-.1-2.1-.7-3.9-2-5.3-1.4-1.4-3.2-1.9-5.3-2-1.3-.1-1.7-.1-5-.1zm0 11.8c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm0-6.6c-1.5 0-2.6 1.2-2.6 2.6s1.2 2.6 2.6 2.6 2.6-1.2 2.6-2.6-1.2-2.6-2.6-2.6zm5.7-3.4c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7z" />
            </svg>
          </a>
          <a
            href="https://tiktok.com"
            className=" hover:text-gray-800"
            aria-label="TikTok"
          >
            <svg width="25" height="25" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.5c1.3 0 2.4.1 3.6.3 1.1.2 2.1.6 3 .9.8.4 1.4.9 2 1.6.6.6 1.1 1.4 1.5 2.3.3.8.5 1.6.5 2.5v8.6c0 1.4-.1 2.7-.4 4-1.3 5.1-5.4 9.4-10.5 10.4-1.1.3-2.3.5-3.5.5-3.3 0-6.6-1.4-9.1-3.6-.8-.7-1.5-1.4-2.1-2.3-.4-.5-.7-1.1-1-1.7-.4-.6-.6-1.3-.8-2-.1-.6-.2-1.3-.2-1.9v-6.6c0-.7.1-1.4.3-2.1.2-.8.5-1.5.9-2.2.7-1.2 1.5-2.2 2.5-3 1.1-.9 2.4-1.7 3.7-2.2.7-.2 1.4-.4 2.2-.4zm-1.6 6.4v6.1c.7.1 1.4.1 2.1.1s1.4-.1 2.1-.3v-2.8c-1.6.1-3.1-.5-4.3-1.6zm-1.7 4.4c-.6.5-1.2 1-1.8 1.6-.7.6-1.5 1.1-2.3 1.6-.6.4-1.3.7-2 .8-.7.2-1.5.3-2.2.3-.6 0-1.2-.1-1.8-.2-.6-.2-1.3-.5-1.8-.9-.5-.5-.9-1.1-1.1-1.7-.2-.6-.3-1.2-.3-1.9v-6.6c0-.7.1-1.3.3-1.9.2-.6.6-1.2 1.1-1.7.5-.4 1.1-.7 1.8-.9.7-.2 1.2-.3 1.8-.3s1.2.1 1.8.2c.6.2 1.3.5 1.8.9.6.5 1.1 1 1.6 1.6.5.7.8 1.4 1.1 2.1.3.6.4 1.3.4 2v2.8c-.7.1-1.4.2-2.1.3-.7.1-1.4.1-2.1.1v-2.8c-.7-.6-1.4-1.1-2.1-1.5z" />
            </svg>
          </a>
          <div className="p-1.5 px-5 cursor-pointer font-medium rounded-xl bg-gray-50 hover:bg-white transition-colors">
            Log Out
          </div>
        </div>

      </div>
    </>
  );
}

export default Header;
