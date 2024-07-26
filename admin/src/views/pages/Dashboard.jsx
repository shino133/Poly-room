export default function Dashboard() {
  return (
    <>
      <div className="m-4">
        <h1 className="text-[25px] font-medium">
          Chào mừng, {JSON.parse(localStorage.getItem("CURRENT_USER")).name}!
        </h1>
      </div>
    </>
  );
}
