
const SportsOurProducts = () => {

  const clothsDatas = [
    {
      id: 1,
      image: '/sports/img1.jpg',
      title: 'Custom 4 sides Hoodies',
    },

    {
      id: 2,
      image: '/sports/img2.jpg',
      title: 'Custom T-shirts',
    },

    {
      id: 3,
      image: '/sports/img3.jpg',
      title: 'Custom Cap',
    },

    {
      id: 4,
      image: '/sports/img4.jpg',
      title: 'Custom Polo',
    },

    {
      id: 5,
      image: '/sports/img5.png',
      title: 'Custom Soccer Jersey',
    }
  ]


  return (
    <section className="py-4 bg-white">
      <div className="h-[1px] w-full bg-blue-700" />
      <h1 className="text-center mt-4 font-black text-3xl text-blue-700">Our Products</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 py-10">
        {
          clothsDatas?.map((items: any) => (
            <li
              key={items.id}
              className="flex flex-col items-center gap-10">
              <img 
              src={items.image} 
              alt={items.title} 
              className="h-[280px]"/>
              <h4>{items.title}</h4>
            </li>
          ))
        }
      </ul>
    </section>
  )
}

export default SportsOurProducts