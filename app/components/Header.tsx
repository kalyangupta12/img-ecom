import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="navbar bg-base-300 sticky top-0 z-40 shadow-sm">
      <div className="container mx-auto">
        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="btn btn-ghost btn-circle"
            aria-label="Toggle mobile menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 w-full bg-base-100 shadow-lg">
            <ul className="menu p-4">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/orders">My Orders</Link>
              </li>
              <li>
                {/* <button onClick={handleSignOut}>Sign Out</button> */}
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}