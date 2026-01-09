import Link from "next/link";

export type FooterColumnsProps = {
  title: string;
  links: { label: string; href: string }[];
};

const FooterColumns = ({ title, links }: FooterColumnsProps) => {
  return (
    <div className="w-full flex flex-col items-start text-neutral-white">
      <h6 className="font-semibold mb-2 text-sm sm:text-base">{title}</h6>
      <ul className="flex flex-col">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              key={index}
              href={link.href}
              className="mb-2 text-sm hover:underline transition-all"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterColumns;
