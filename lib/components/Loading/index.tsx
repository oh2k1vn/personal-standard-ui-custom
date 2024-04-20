export const Loading = () => {
  return (
    <div className="relative size-14 text-surface">
      <div className="animate-spin size-full rounded-full bg-gradient-to-r from-primary via-transparent to-transparent p-1">
        <div className="flex h-full w-full rounded-full items-center justify-center bg-current"></div>
      </div>
      <img
        src="https://static.vecteezy.com/system/resources/previews/021/623/400/non_2x/shirohige-pirate-one-piece-logo-anime-free-png.png"
        alt=""
        className="size-12 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
};

// https://static.vecteezy.com/system/resources/previews/021/623/400/non_2x/shirohige-pirate-one-piece-logo-anime-free-png.png
