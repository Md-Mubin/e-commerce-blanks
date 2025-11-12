import { Search, ShoppingBag } from "lucide-react"
import Link from "next/link"

const SportsPageNavbar = () => {
  return (
    <nav>
      <div className="py-2 flex justify-center text-white font-semibold text-sm bg-[#3d90d8]">
        FREE DELIVERY ON ELIGIBLE ORDERS!
      </div>

      <header className="bg-white py-2 shadow-sm">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
          <Link href="/" className="text-3xl font-black text-gray-800 hover:text-gray-600 transition">
            YAYA SPORTS
          </Link>

          <div className="flex flex-col items-end">
            <div className="flex items-center gap-4">
              <div className="text-center sm:text-left">
                <h3 className="text-xl font-black text-red-400">Call Us: 613-666-YAYA (9292)</h3>
                <h3 className="text-xl font-black text-red-400">Email Us: INFO@YAYASPORTS.CA</h3>
              </div>

              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded transition">
                  <span className="text-sm font-medium">en</span>
                </button>
              </div>

              <div className="relative">
                <input
                  type="search"
                  placeholder="Search"
                  className="w-[200px] text-sm px-4 py-1 border-none bg-[#fafafa] shadow-[0px_1px_1px_#00000033] rounded-sm outline-none placeholder:text-blue-700"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600 ">
                  <Search size={14} />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <a href="/cart" className="relative flex items-center gap-2 px-4 py-2 text-red-600 ">
                <ShoppingBag />
                <span className="hidden sm:inline text-sm font-normal">Shopping Cart</span>
                <span className=" bg-red-100 text-blue-600 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">0</span>
              </a>

              <a href="/account" className="text-blue-600 font-normal text-sm transition">
                Sign In
              </a>
            </div>
          </div>

        </div>

      </header>
      <div className="bg-[#a8edfd]  py-2 ">
        <ul className="container mx-auto flex items-center gap-5 font-black text-md" >
          <li>
            <Link href="/" aria-current="page">
              HOME
            </Link>
          </li>
          <li>
            <Link href="/collections/all">
              PRODUCTS
            </Link>
          </li>
          <li>
            <Link href="/products/build-a-gang-sheet">
              DTF GANG SHEET BUILDER
            </Link>
          </li>
          <li>
            <Link href="/pages/sizing">
              OUR WORK
            </Link>
          </li>
          <li>
            <Link href="/pages/test">
              CONTACT US
            </Link>
          </li>
          <li>
            <Link href="/pages/faq">
              FAQs
            </Link>
          </li>
          <li>
            <Link href="/policies/privacy-policy">
              PRIVACY POLICY
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default SportsPageNavbar