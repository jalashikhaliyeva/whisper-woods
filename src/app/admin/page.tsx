export default function AdminDashboard() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Admin Dashboard
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Hero Images
            </h3>
            <p className="text-blue-700">
              Manage hero section images for the homepage
            </p>
          </div>
          
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-green-900 mb-2">
              Collections
            </h3>
            <p className="text-green-700">
              Manage villa collections and galleries
            </p>
          </div>
          
          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-900 mb-2">
              Content
            </h3>
            <p className="text-purple-700">
              Update website content and settings
            </p>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="space-y-2">
            <p className="text-gray-600">
              • Upload new hero images to enhance the homepage
            </p>
            <p className="text-gray-600">
              • Manage existing images and their order
            </p>
            <p className="text-gray-600">
              • Update website content and settings
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 