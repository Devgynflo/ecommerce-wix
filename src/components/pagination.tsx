"use client";

import { NextPage } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  hasPrev: boolean;
  hasNext: boolean;
}

export const Pagination: NextPage<PaginationProps> = ({
  currentPage,
  hasPrev,
  hasNext,
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mt-12 flex w-full items-center justify-between">
      <button
        onClick={() => createPageUrl(currentPage - 1)}
        className="w-24 cursor-pointer rounded-md bg-lama p-2 text-sm text-white disabled:cursor-not-allowed disabled:bg-pink-200"
        disabled={!hasPrev}
      >
        Previous
      </button>
      <button
        onClick={() => createPageUrl(currentPage + 1)}
        className="w-24 cursor-pointer rounded-md bg-lama p-2 text-sm text-white disabled:cursor-not-allowed disabled:bg-pink-200"
        disabled={!hasNext}
      >
        Next
      </button>
    </div>
  );
};
