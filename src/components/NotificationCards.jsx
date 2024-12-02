import { lazy, Suspense } from "react";
import { notificationsService } from "../services";
import reactQuery from "../helpers/reactQuery";

const NotificationCard = lazy(() => import("./NotificationCard"));

function NotificationCards() {
  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    reactQuery.useCustomInfiniteQuery(
      "notifications",
      {},
      notificationsService.query,
    );

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (isError) {
    return <div>Error</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col">
        {data?.pages?.[0]?.documents?.length &&
          data.pages[0].documents.map((card) => (
            <NotificationCard
              key={card._id}
              id={card._id}
              userName={card.userName}
              type={card.type}
              isRead={card.isRead}
              createdAt={card.createdAt}
            />
          ))}

        <button
          className="mx-auto my-6 w-fit rounded-md border border-blue-400 px-12 py-3 outline-none"
          onClick={() => {
            console.log("hasNextPage", hasNextPage);
            fetchNextPage();
          }}
        >
          Load More
        </button>
      </div>
    </Suspense>
  );
}

export default NotificationCards;
