import Image from "next/image";

export default function ProfileCard({ name, description, image }) {
  return (
    <div className="flex items-center bg-white rounded-2xl shadow-lg p-5 gap-5 max-w-md mx-auto">
      <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-full border-2 border-pink-300">
        <Image
          src={image}
          alt={`Photo de ${name}`}
          fill
          style={{ objectFit: "cover" }}
          sizes="80px"
          className="rounded-full"
        />
      </div>
      <div className="text-left">
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-sm text-gray-600 whitespace-pre-line">{description}</p>
      </div>
    </div>
  );
}
