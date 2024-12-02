import { lazy, Suspense } from "react";
import { notificationsService } from "../services";
import reactQuery from "../helpers/reactQuery";

const NotificationCard = lazy(() => import("./NotificationCard"));

function NotificationCards() {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = reactQuery.useCustomInfiniteQuery(
    "notifications",
    {},
    notificationsService.query,
  );

  if (isLoading) {
    return <div>Loading notifications...</div>;
  } else if (isError) {
    return <div>Error fetching notifications. Please try again later.</div>;
  }

  const cards = data?.pages?.flatMap((page) => page.documents) || [];
  if (cards.length === 0) {
    return <div>No notifications available.</div>;
  }

  return (
    <Suspense fallback={<div>Loading notifications...</div>}>
      <div className="flex flex-col">
        {cards.map((card) => (
          <NotificationCard
            key={card._id}
            id={card._id}
            userName={card.userName}
            type={card.type}
            isRead={card.isRead}
            createdAt={card.createdAt}
          />
        ))}

        {hasNextPage && (
          <button
            disabled={isFetchingNextPage}
            className={`mx-auto my-6 w-fit rounded-md border border-blue-400 px-12 py-3 outline-none ${isFetchingNextPage ? "cursor-not-allowed" : "hover:bg-blue-400 hover:text-white"}`}
            onClick={() => {
              console.log("hasNextPage", hasNextPage);
              fetchNextPage();
            }}
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </button>
        )}
      </div>
    </Suspense>
  );
}

export default NotificationCards;
