import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SearchResults } from "@/components/search/SearchResults";

export const metadata = { title: "Search | Toy Kingdom Online" };

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const q = searchParams.q ?? "";
  return (
    <div className="tk-container py-6">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Search" }]} />
      <h1 className="font-fredoka uppercase text-2xl md:text-3xl text-tk-black mt-4 mb-6">
        Search Results
      </h1>
      <SearchResults query={q} />
    </div>
  );
}
