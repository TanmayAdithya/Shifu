import { sidebarItems } from "@/app/constants";
import Link from "next/link";

function SideBar() {
  return (
    <main className="bg-red-900">
      <aside className="flex h-screen w-[80px] flex-col items-center bg-[#0F090C] py-6 opacity-70 backdrop:blur-sm">
        <img
          src="/shifu-320-trans.webp"
          alt="shifu-logo"
          style={{ width: "3rem", marginBottom: "1.5rem" }}
        />
        <div className="mb-8 w-[70%] border-[1px] border-red-900"></div>
        <ul className="flex flex-col items-center">
          {sidebarItems.map(({ id, title, href, icon: Icon }) => {
            return (
              <li
                key={id}
                className={`mb-4 rounded-md border-0 bg-slate-500 p-3 hover:bg-red-500`}
              >
                <Link href={href}>
                  <span>{<Icon size={"1.6rem"} color="white" />}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
    </main>
  );
}

export default SideBar;
