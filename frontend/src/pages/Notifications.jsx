import BottomNav from "../components/BottomNav";
import Header from "../components/Header";

const Notifications = () => {
  return (
    <>
      <Header showCard={true} title="Notifs" />
      <div className="bg-yellow-300 min-h-screen pt-24">
        <div className="mt-1 w-full mx-auto max-w-sm md:max-w-md lg:max-w-xl">
          <div className="flex items-center justify-between rounded-3xl bg-white p-3 shadow-md">
            <p className="mt-1 text-sm font-medium text-gray-500 text-center max-w-xs mx-auto">
              Notifications' history related to your education will be visible
              here
            </p>
          </div>
        </div>
      </div>
      <BottomNav Notifs={true} />
    </>
  );
};

export default Notifications;
