export function SkeletonLoading() {
  return (
    <div
      role="status"
      aria-label="Загрузка"
      className="grid grid-cols-[repeat(auto-fill,minmax(185px,1fr))] gap-6"
    >
      {Array.from({ length: 12 }, (_, index) => (
        <div
          key={index}
          className="w-full animate-pulse rounded-lg"
          aria-hidden
        >
          <div className="mb-4 aspect-3/4 w-full rounded-lg bg-surface dark:bg-surface-dark" />
          <div className="mb-2 h-6 w-3/4 rounded bg-surface dark:bg-surface-dark" />
          <div className="h-4 w-1/2 rounded bg-surface dark:bg-surface-dark" />
        </div>
      ))}
      <span className="sr-only">Загрузка данных</span>
    </div>
  );
}
