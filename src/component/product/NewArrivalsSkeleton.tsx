const NewArrivalsSkeleton = () => {
  return (
    <div className="flex space-x-6 overflow-hidden">
      {[1, 2, 3].map((i) => (
        <div key={i} className="min-w-[30%] animate-pulse">
          <div className="bg-gray-200 aspect-[3/4] rounded-2xl mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
      ))}
    </div>
  );
};

export default NewArrivalsSkeleton;
