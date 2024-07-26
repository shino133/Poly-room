import { useAuthContext } from "../../contexts/Support";

export default function Dashboard() {
  const { currentUser } = useAuthContext();

  return (
    <>
      <div>
        <h1>Welcome back, {currentUser.name}!</h1>
      </div>
    </>
  );
}
