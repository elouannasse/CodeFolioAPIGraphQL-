export default function ErrorMessage({ message }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg max-w-2xl w-full">
        <div className="flex items-center mb-2">
          <svg
            className="w-6 h-6 text-red-500 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-lg font-medium text-red-800">Erreur</h3>
        </div>
        <p className="text-red-700">{message}</p>
      </div>
    </div>
  );
}
