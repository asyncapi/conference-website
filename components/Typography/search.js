import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="relative w-[50%] ">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
      <input
        type="text"
        placeholder="Search for a Question"
        className="pl-10 pr-4 py-3 h-12 w-full rounded-full bg-slate-300 border-none focus:outline-none "
      />
    </div>
  );
};

export default SearchBar;
