import { GifCard } from "@/components";

const LoadingPage = () => {
  return (
    <div className="flex h-full flex-col items-center py-8">
      <GifCard
        gif="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGhzM20xYTZiNmZuMzVnYmQ2YjBkbzVyOGZ3bjVpaHQ0dTdoMW1iaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/slVWEctHZKvWU/giphy.gif"
        message="Loading..."
      />
    </div>
  );
};

export default LoadingPage;
