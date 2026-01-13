import Link from "next/link";

const cards = [
  {
    title: "Hero Images",
    description: "Manage homepage hero section",
    href: "/admin/hero",
  },
  {
    title: "Collections",
    description: "Manage villa galleries",
    href: "/admin/collections",
  },
  {
    title: "Settings",
    description: "Configure site settings",
    href: "/admin/settings",
  },
];

export default function AdminDashboard() {
  return (
    <div className="max-w-4xl">
      <div className="mb-10">
        <h1 className="text-2xl font-semibold text-neutral-900 tracking-tight">
          Dashboard
        </h1>
        <p className="text-neutral-500 text-sm mt-1">
          Manage your website content
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="group p-6 bg-white border border-neutral-200 hover:border-neutral-300 transition-colors"
          >
            <h3 className="font-medium text-neutral-900 group-hover:text-neutral-600 transition-colors">
              {card.title}
            </h3>
            <p className="text-sm text-neutral-500 mt-1">{card.description}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 p-6 bg-white border border-neutral-200">
        <h2 className="font-medium text-neutral-900 mb-4">Quick guide</h2>
        <ul className="space-y-2 text-sm text-neutral-600">
          <li>Upload and manage hero images for the homepage</li>
          <li>Organize villa collections and galleries</li>
          <li>Configure website settings and preferences</li>
        </ul>
      </div>
    </div>
  );
}
