import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useRouter } from "next/router";
import { format } from "date-fns"
import InforCard from "../components/InfoCard";
import Map from "@/components/Map";

function Search({ searchResult}) {
    const router = useRouter();
    const { location, startDate, endDate, numberOfGuest } = router.query;
    const formatedStartDate = format(new Date(startDate), "dd MMMM yy");
    const formatedEndDate = format(new Date(endDate), "dd MMMM yy");
    const range = `${formatedStartDate} - ${formatedEndDate}`
  
    return (
    <div>
      <Header placeholder={`${location} | ${range} | ${numberOfGuest} guests`}/>

      <main className="flex">
        <section className="flex-grow pt-14 px-6">
            <p>300+ Stays - {range} - for {numberOfGuest} guests</p>

            <h1 className="text-3xl font-semibold mt-2 mb-6">Stays in {location}</h1>
        
            <div className="hidden lg:inline-flex mb-5 space-x-5 text-gray-800 whitespace-nowrap">
                <p className="button">Cancellation Flexibility</p>
                <p className="button">Type of Place</p>
                <p className="button">Price</p>
                <p className="button">Rooms and Beds</p>
                <p className="button">More Filters</p>
            </div>

            <div className="flex flex-col">
                {searchResult.map(({img, location, title, description, star, price, total}) => (
                <InforCard
                    key={img}
                    img={img}
                    location={location}
                    title={title}
                    description={description}
                    star={star}
                    price={price}
                    total={total}
                />
            ))}
            </div>
        </section>

        <section className="hidden xl:inline-flex xl:min-w-[600px]">
            <Map searchResult={searchResult}/>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}

export default Search

export async function getServerSideProps() {
    const searchResult = await fetch("https://www.jsonkeeper.com/b/5NPS").
    then(
    res => res.json()
    );

    return{
        props: {
            searchResult,
        }
    }
}