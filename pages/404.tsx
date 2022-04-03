import Link from "next/link";

export default function Custom404() {
  return (
    <div>
      Oops I did it again!
      <Link href={"/"}>Back to all countries</Link>
    </div>
  );
}
