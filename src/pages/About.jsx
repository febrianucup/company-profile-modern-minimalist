import Card from "../components/Card"
import PhotoCard from "../components/PhotoCard"
import pict from "../assets/peoplePict.png"
import pict2 from "../assets/peoplePict2.png"
import { Link } from "react-router-dom"

function About() {
  const cardDesc = [
    {
      id: 1,
      title: 'Vision',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi laboriosamat voluptas minus culpa deserunt delectus sapiente inventore pariatur',
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      ),
    },
    {
      id: 2,
      title: 'Mission',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi laboriosamat voluptas minus culpa deserunt delectus sapiente inventore pariatur',
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
        </svg>
      ),
    }
  ]

  const photoCard = [
    {
      id: 1,
      img: pict,
      mainTitle: 'Website',
      description: 'Lorem ipsum dolor sit amet',
      date: '17-02-2006',
      topic: 'Website Mobile',
    },
    {
      id: 2,
      img: pict2,
      mainTitle: 'Website',
      description: 'Lorem ipsum dolor sit amet',
      date: '17-02-2006',
      topic: 'Website Mobile',
    },
    {
      id: 3,
      img: pict,
      mainTitle: 'Website',
      description: 'Lorem ipsum dolor sit amet',
      date: '17-02-2006',
      topic: 'Website Mobile',
    },
    {
      id: 4,
      img: pict2,
      mainTitle: 'Website',
      description: 'Lorem ipsum dolor sit amet',
      date: '17-02-2006',
      topic: 'Website Mobile',
    },
    {
      id: 5,
      img: pict,
      mainTitle: 'Website',
      description: 'Lorem ipsum dolor sit amet',
      date: '17-02-2006',
      topic: 'Website Mobile',
    },
    {
      id: 6,
      img: pict2,
      mainTitle: 'Website',
      description: 'Lorem ipsum dolor sit amet',
      date: '17-02-2006',
      topic: 'Website Mobile',
    },
  ]

  return (
    <section id="AboutUs" className="bg-white py-16">
      <div className="container mx-auto px-4 lg:px-12">
        <div className="mb-12 text-center">
          <h1 className="font-mono font-semibold text-[40px] text-gray-800">Tentang Kami</h1>
          <p className="text-gray-600 max-w-xl mx-auto mt-2 text-sm">
            Kami adalah tim profesional yang berdedikasi untuk memberikan solusi digital terbaik melalui teknologi modern dan desain yang intuitif.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          <div className="lg:col-span-7 flex flex-col sm:flex-row gap-6 justify-center items-center">
            {cardDesc.map((item) => (
              <Card 
                key={item.id}
                title={item.title}
                description={item.description}
                svg={item.svg}
              />
            ))}
          </div>
          <div className="lg:col-span-5 flex flex-col justify-between gap-4 bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Pencapaian Kami</h2>

            <div className="flex flex-col gap-4">
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Proyek Selesai</p>
                  <p className="text-xs text-gray-400">Telah dipercaya berbagai klien</p>
                </div>
                <h3 className="text-3xl font-extrabold text-[#2DB34F]">50+</h3>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Kepuasan Klien</p>
                  <p className="text-xs text-gray-400">Layanan & performa terbaik</p>
                </div>
                <h3 className="text-3xl font-extrabold text-[#2DB34F]">99%</h3>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Tahun Pengalaman</p>
                  <p className="text-xs text-gray-400">Pengalaman industri digital</p>
                </div>
                <h3 className="text-3xl font-extrabold text-[#2DB34F]">5+</h3>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Github Account</p>
                  <Link to="/login" className="hidden sm:block border border-black text-black px-4 py-2 uppercase text-xs font-bold hover:bg-[#259141] hover:text-white transition">
                      Login
                  </Link>
                </div>
                <h3 className="text-3xl font-extrabold text-[#2DB34F]">5+</h3>
              </div>
            </div>
          </div>

        </div>
        <div className="pt-8 border-t border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">Karya & Portfolio</h2>
          <div className="w-full overflow-hidden py-4">
            <div className="animate-infinite-scroll flex gap-6">
              {[...photoCard, ...photoCard].map((item, index) => (
                <div key={`${item.id}-${index}`} className="flex-shrink-0">
                  <PhotoCard 
                    mainTitle={item.mainTitle}
                    topic={item.topic}
                    description={item.description}
                    date={item.date}
                    img={item.img}
                  />
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}

export default About;