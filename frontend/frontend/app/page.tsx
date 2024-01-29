import LinkButton from "@/components/link_button";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <div className="w-1/2 p-4 mx-auto text-center mt-10 bg-cyan-600">
      <h1 className="">Home Page</h1>
    </div>
      <LinkButton name="Sign Up" href="./auth" />
    </>
  );  
}
