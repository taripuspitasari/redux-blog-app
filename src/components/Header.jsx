import React from "react";
import {Link} from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full flex justify-around h-16 items-center bg-black text-white sticky top-0">
      <h1 className="font-bold  text-2xl">Redux Blog</h1>
      <nav>
        <ul className="flex gap-4">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="post">Post</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
