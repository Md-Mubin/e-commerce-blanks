import Link from "next/link"
import { Flex } from "../reusables"

const ShoppingBanner = () => {
  return (
    <section className="bg-[#f3f3f4]">
      <Flex className="container mx-auto p-10 items-start gap-10 ">
        <div className="">
          <h2 className="w-[200px] font-black text-[70px] leading-16 text-[#d95c8a]">CUSTOM CLOTHING PRINTING</h2>
          <div className="font-black text-[35px] text-[#f3c64d]">OTTAWA . TORONTO . MONTREAL</div>
          <Flex className="w-[600px] flex-col gap-4">
            <Link className="w-full bg-[#d95c8a] py-3 font-black text-white text-lg text-center rounded-full" href="tel:+16130000000">CALL US</Link>
            <Link className="w-full bg-[#d95c8a] py-3 font-black text-white text-lg text-center rounded-full" href="/products/custom">DESIGN NOW</Link>
            <Link className="w-full bg-[#d95c8a] py-3 font-black text-white text-lg text-center rounded-full" href="/pages/bulk-quote">GET A QUOTE</Link>
          </Flex>
        </div>
        <div className="flex flex-col">
          <div className="font-black text-sm text-[#d95c8a]">HIGH QUALITY</div>
          <div className="font-black text-sm text-[#d95c8a]">LOW PRICES</div>
          <div className="font-black text-sm text-[#d95c8a]">FREE DELIVERY</div>
          <div className="font-black text-sm text-[#d95c8a]">EXPRESS SERVICE</div>
        </div>
      </Flex>
    </section>
  )
}

export default ShoppingBanner