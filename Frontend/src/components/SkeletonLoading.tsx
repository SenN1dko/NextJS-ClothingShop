export function SkeletonLoading() {
  return (
    <div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(185px,1fr))] gap-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className=" rounded-lg  animate-pulse w-full">
            <div className="bg-surface dark:bg-surface-dark w-full mb-4 rounded-lg h-30"></div>
            <div className="h-6 bg-surface dark:bg-surface-dark rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-surface dark:bg-surface-dark rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
