import Marquee from "react-fast-marquee"

const BusinessThatTrustUs = () => {

  const icons = [
    {
      id: 1,
      icon: '/sports/icon1.png',
    },
    {
      id: 2,
      icon: '/sports/icon2.png',
    },
    {
      id: 3,
      icon: '/sports/icon3.png',
    },
    {
      id: 4,
      icon: '/sports/icon4.png',
    },
    {
      id: 5,
      icon: '/sports/icon5.png',
    },
    {
      id: 6,
      icon: '/sports/icon6.png',
    },
    {
      id: 7,
      icon: '/sports/icon7.png',
    },
    {
      id: 8,
      icon: '/sports/icon8.png',
    },
    {
      id: 9,
      icon: '/sports/icon9.png',
    },
    {
      id: 10,
      icon: '/sports/icon10.png',
    },
    {
      id: 11,
      icon: '/sports/icon11.png',
    },
    {
      id: 12,
      icon: '/sports/icon12.png',
    },
    {
      id: 13,
      icon: '/sports/icon13.png',
    },
    {
      id: 14,
      icon: '/sports/icon14.png',
    }
  ]

  return (
    <section>
      <h3 className="text-center text-blue-700 font-black text-2xl mt-4 mb-8">Businesses That Trust Us</h3>

      <Marquee speed={50} direction="right" pauseOnHover={true}>
        {
          icons.map((icon) => (
            <img src={icon.icon} alt="icon" key={icon.id} className="w-[200px] mx-10 cursor-pointer hover:scale-110 duration-200" />
          ))
        }
      </Marquee>
    </section>
  )
}

export default BusinessThatTrustUs