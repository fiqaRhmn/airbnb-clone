import Image from "next/image"

function MediumCard({img, title}) {
  return (
    <div className="cursor-pointer hover:105 transform transition duration-300 ease-out">
        <div className="relative h-80 w-80">
            <Image 
            className="rounded-xl"
            src={img}
            layout="fill"
            />
        </div>

        <div>
            <h3 className="text-2xl mt-3">{title}</h3>
        </div>
    </div>
  );
}

export default MediumCard;
