export default function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition text-center h-full">
      <div className="flex justify-center mb-4 text-primary text-5xl">
        {icon}
      </div>
      <h3 className="font-semibold text-lg mb-2 font-poppins">{title}</h3>
      <p className="text-gray-600 font-roboto">{description}</p>
    </div>
  );
}
