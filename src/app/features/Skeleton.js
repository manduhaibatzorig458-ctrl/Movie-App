export const MovieSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="aspect-2/3 w-full rounded-lg bg-gray-200 dark:bg-gray-800" />

      <div className="mt-3 h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-800" />

      <div className="mt-2 h-3 w-1/2 rounded bg-gray-200 dark:bg-gray-800" />
    </div>
  );
};

export const SectionSkeleton = () => {
  return (
    <section className="mx-auto w-full max-w-360 px-6 py-10 md:px-16">
      <div className="mb-6 flex items-center justify-between">
        <div className="h-7 w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

        <div className="h-5 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {[...Array(5)].map((_, index) => (
          <MovieSkeleton key={index} />
        ))}
      </div>
    </section>
  );
};