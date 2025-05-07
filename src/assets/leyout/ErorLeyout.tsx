
function ErorLeyout() {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-8">صفحه مورد نظر پیدا نشد.</p>
      <button
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        بازگشت به صفحه اصلی
      </button>
    </div>
  );
}

export default ErorLeyout;