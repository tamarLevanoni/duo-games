import Image from "next/image";
import Link from "next/link";
import GameCard from "./components/GameCard";

export default function Home() {
  return (
    <div>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <Link href="/login">התחברות</Link>
<GameCard />
      </main>
     
    </div>
  );
}
