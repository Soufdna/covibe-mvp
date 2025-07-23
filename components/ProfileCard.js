export default function ProfileCard({ name, description, image }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <img src={image} alt={name} className="w-full h-56 object-cover" />
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        <p className="text-gray-600 whitespace-pre-line">{description}</p>
      </div>
    </div>
  );
}

