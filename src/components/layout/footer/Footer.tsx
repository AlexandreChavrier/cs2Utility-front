import Link from "next/link";
import Image from "next/image";
import FooterColumns from "./FooterColumns";

const Footer = () => {
  const columns = [
    {
      title: "Pages",
      links: [
        { label: "Accueil", href: "" },
        { label: "Toutes les cartes", href: "" },
        { label: "Exécutions en équipe", href: "" },
        { label: "Lineups populaires", href: "" },
      ],
    },
    {
      title: "Légale",
      links: [
        { label: "Mentions légales", href: "" },
        { label: "Politique de confidentialité", href: "" },
        { label: "CGU", href: "" },
      ],
    },
    {
      title: "Retrouvez-nous",
      links: [{ label: "Contact@turboblyat.com", href: "" }],
    },
  ];

  return (
    <footer className="w-full py-24 bg-[#15171E]">
      <div className="w-full max-w-[70%] mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-start justify-center gap-8 text-left">
          <div className="w-full flex flex-col gap-4">
            <Link href="/" className="flex-shrink-0">
              <Image src="/assets/logo.png" alt="logo" width={56} height={56} />
            </Link>
            <Image
              src="/assets/CS2-decks-img-logo.png"
              alt="CS2 Decks"
              width={220}
              height={64}
            />
          </div>

          {columns.map((column, index) => (
            <FooterColumns
              key={index}
              title={column.title}
              links={column.links}
            />
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
