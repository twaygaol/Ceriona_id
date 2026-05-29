export default function RootLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream">
      <div className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-2 border-gold border-t-transparent" />
        <p className="text-sm text-brown-light">Memuat...</p>
      </div>
    </div>
  );
}
