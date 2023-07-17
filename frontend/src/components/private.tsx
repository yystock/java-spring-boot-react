import UserList from "./user-list";

export default function Private() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center ">
        <h2 className="mt-10">This is a Private Route</h2>
        <p className="mt-10">Only registered user can see</p>
        <UserList />
      </div>
    </div>
  );
}
