export default function ProductCard() {
  return (
    <div className="border rounded p-4 shadow">
      <img src="https://via.placeholder.com/150" className="w-full h-32 object-cover" />
      <h3 className="mt-2 font-bold">Product Name</h3>
      <p className="text-sm text-gray-500">₹999</p>
      <button className="btn w-full mt-2">View</button>
    </div>
  );
}
