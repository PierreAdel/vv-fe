import { Suspense, useState, lazy } from "react";
import StickyNavbar from "../../components/StickyNavbar";

const NotificationCards = lazy(
  () => import("../../components/NotificationCards"),
);

function Home() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <StickyNavbar setOpen={setOpen} />
      {open && (
        <Suspense fallback={<div>Loading...</div>}>
          <div className="container mx-auto px-4 pt-20 text-center">
            <NotificationCards />
          </div>
        </Suspense>
      )}
    </div>
  );
}

export default Home;
