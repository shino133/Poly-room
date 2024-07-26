import people from "../../assets/people.svg";

export default function Dashboard() {
  return (
    <>
      <div className="m-4">
        <h1 className="text-[25px] font-medium">
          Chào mừng, 
        </h1>

        <div className="mt-4">
          <img src={people} alt="people" className="w-full" />
        </div>
      </div>
    </>
  );
}