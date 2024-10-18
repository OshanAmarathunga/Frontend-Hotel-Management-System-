import Header from "../../components/header/Header";

export default function HomePage() {
  return (
    <>
      <Header />
      <div className="w-full h-screen bg-gradient-to-r from-blue-800 to-blue-900 flex items-center justify-center">
        <div className="w-full max-w-lg h-auto bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-2xl font-bold text-center text-blue-900 mb-6">
            Book Your Stay
          </h1>
          <div className="flex flex-col space-y-4">
            {/* Check-in Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Check-in Date
              </label>
              <input
                type="date"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Check-out Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Check-out Date
              </label>
              <input
                type="date"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Room Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Room Type
              </label>
              <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                <option>Luxury</option>
                <option>Normal</option>
                <option>Simple</option>
              </select>
            </div>

            {/* Book Now Button */}
            <div className="flex justify-center">
              <button className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
