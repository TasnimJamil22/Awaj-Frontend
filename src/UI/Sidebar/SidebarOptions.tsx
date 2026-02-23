import { Link } from "react-router-dom";

 

interface LinkItem {
  href: string;
  label: string;
  className?: string; //optional
}
export default function SidebarOptions({ links }: { links: LinkItem[] }) {
  return (
    // <ul>
    //   {links.map((link) => {
    //     return (
    //       <li>
    //         <Link href={link.href}>{link.label}</Link>
    //       </li>
    //     );
    //   })}
    // </ul>
    <ul className="  justify-center gap-6 py-6">
      {links.map((link, index) => (
        <li key={index}>
          <Link
            className="relative px-4 py-2 text-lg font-medium text-[#a17c37] hover:text-[#8b6d2f] transition-all duration-300 
                   after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r from-[#e0c066] to-[#a17c37]
                   hover:after:w-full after:transition-all after:duration-300"
            to={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}