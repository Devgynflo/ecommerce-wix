import { Filter } from "@/components/filter";
import { ProductList } from "@/components/product/product-list";
import { Skeleton } from "@/components/skeleton";
import { wixClientServer } from "@/lib/wix-client-server";
import { NextPage } from "next";
import Image from "next/image";
import { Suspense } from "react";

interface ListPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const ListPage: NextPage<ListPageProps> = async ({ searchParams }) => {
  const { category } = searchParams;

  const wixClient = await wixClientServer();
  const { collection: cat } = await wixClient.collections.getCollectionBySlug(
    (category as string) || "all-products",
  );

  return (
    <section className="relative px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="hidden h-64 justify-between bg-pink-50 px-4 md:flex">
        <div className="flex w-2/3 flex-col items-center justify-center gap-8">
          <h2 className="text-4xl font-semibold leading-[48px] text-gray-700">
            Grab up to 50% off on <br /> Selected Products
          </h2>
          <button className="w-max rounded-3xl bg-lama px-5 py-3 text-sm text-white">
            Buy Now
          </button>
        </div>
        <div className="relative w-1/3">
          <Image
            src={"/woman.png"}
            alt=""
            fill
            className="object-contain"
            sizes="100%"
            priority
          />
        </div>
      </div>

      <Filter />
      <h1 className="mt-12 text-xl font-semibold">{cat?.name} for you</h1>
      <Suspense fallback={<Skeleton />}>
        <ProductList
          categoryId={cat?._id || process.env.MAIN_PRODUCT_CATEGORY_ID}
          searchParams={searchParams}
        />
      </Suspense>
    </section>
  );
};

export default ListPage;
