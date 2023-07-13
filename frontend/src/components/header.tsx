import Logo from "./logo";
import { RenderMenu } from "./structure/Navigation";

export default function Header() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center ">
        <Logo />
        <span className="h-2"></span>
        <RenderMenu />
      </div>
    </div>
  );
}
