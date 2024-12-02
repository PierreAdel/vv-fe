import { formatDistanceToNow } from "date-fns";
import defaultImage from "../assets/default-user-image.png";
import { notificationsService } from "../services";
import reactQuery from "../helpers/reactQuery";
import { TYPE_TO_TEXT_MAP } from "../constants";

function NotificationCard({ id, userName, type, isRead, createdAt }) {
  const readMutation = reactQuery.useCustomMutation(
    notificationsService.read,
    "notifications",
    undefined,
    undefined,
    false,
  );
  return (
    <div
      onClick={() => readMutation.mutate({ id })}
      className={`flex w-full gap-2 shadow-md ${isRead || "hover:cursor-pointer"} p-4 transition hover:bg-blue-100`}
    >
      <img src={defaultImage} alt="user" className="rounded-full" />
      <div className="flex flex-col text-sm">
        <div>
          {userName && <span className="mr-1 font-semibold">{userName}</span>}
          <span>{TYPE_TO_TEXT_MAP[type]}</span>
        </div>
        <p className="text-sm text-blue-500">
          {formatDistanceToNow(createdAt, { addSuffix: true })}
        </p>
      </div>
      {isRead || (
        <div className="my-auto ml-auto h-3 w-3 rounded-full bg-blue-500" />
      )}
    </div>
  );
}
export default NotificationCard;
