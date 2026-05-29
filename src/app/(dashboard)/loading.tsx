export default function DashboardLoading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-gold border-t-transparent" />
        <p className="text-sm text-brown-light">Memuat...</p>
      </div>
    </div>
  );
}
