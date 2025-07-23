export default function ProfileCard({ name, description, image }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 flex items-start gap-4">
      {/* Avatar rond */}
      <img
        src={image}
        alt={name}
        className="w-16 h-16 rounded-full object-cover shrink-0 border-4 border-pink-200"
        loading="lazy"
      />

      {/* Texte */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        <p className="text-gray-600 whitespace-pre-line text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
