import AuthContent from "./auth-content";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center ">
        <h2 className="mt-10">This is the Home Page</h2>
        <p className="mt-10">Login to see something interesting</p>
        <AuthContent />
      </div>
    </div>
  );
}
