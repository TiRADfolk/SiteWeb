export default function ErrorOverlay() {
  return (
    <div className="fixed inset-0 z-[60] bg-black/60 flex items-start justify-center pt-24 px-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 text-center space-y-3 border-2 border-red-500">
        <div className="text-4xl">⚠️</div>
        <h2 className="text-xl font-bold text-[#2C221E]">Connexion indisponible</h2>
        <p className="text-gray-600 text-sm">
          Le site n'arrive pas à récupérer ses données en ce moment. Merci de réessayer dans quelques instants.
        </p>
      </div>
    </div>
  );
}