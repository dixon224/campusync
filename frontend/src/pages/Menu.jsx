import Header from "../components/Header";
import BottomNav from "../components/BottomNav";

const Menu = () => {
  return (
    <>
      <Header title="Menu" showCard={true} />

      <main className="min-h-screen bg-yellow-300 pt-24 pb-28 px-4 flex items-center justify-center">
        <div className="w-full max-w-sm md:max-w-md lg:max-w-xl rounded-3xl bg-white p-8 shadow-md text-center">
          <img
            src="/logo_ui.jpg"
            alt="CampusSync logo"
            className="mx-auto h-28 w-28 object-contain"
          />

          <h1 className="mt-6 text-2xl font-bold text-black">
            Page under construction
          </h1>

          <p className="mt-3 text-sm text-gray-500 leading-6">
            This page is not ready yet.
            <br />
            New features will be available soon on CampusSync.
          </p>
        </div>
      </main>

      <BottomNav />
    </>
  );
};

export default Menu;
