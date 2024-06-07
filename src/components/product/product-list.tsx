import { wixClientServer } from "@/lib/wix-client-server";
import DOMPurify from "isomorphic-dompurify";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { Pagination } from "../pagination";

interface ProductListProps {
  categoryId?: string;
  limit?: number;
  searchParams?: any;
}

const PRODUCT_PER_PAGE = 8;

export const ProductList: NextPage<ProductListProps> = async ({
  categoryId,
  limit,
  searchParams,
}) => {
  const wixClient = await wixClientServer();

  const productQuery = wixClient.products
    .queryProducts()
    .startsWith("name", searchParams?.name || "")
    .eq("collectionIds", categoryId)
    .hasSome(
      "productType",
      searchParams?.type ? [searchParams.type] : ["physical", "digital"],
    )
    .gt("priceData.price", searchParams?.min || 0)
    .lt("priceData.price", searchParams?.max || 999999)
    .limit(limit || PRODUCT_PER_PAGE)
    .skip(
      searchParams?.page
        ? parseInt(searchParams.page) * (limit || PRODUCT_PER_PAGE)
        : 0,
    );

  if (searchParams?.sort) {
    const [sortType, sortBy] = searchParams.sort.split(" ");

    if (sortType === "asc") {
      productQuery.ascending(sortBy);
    }
    if (sortType === "desc") {
      productQuery.descending(sortBy);
    }
  }

  const res = await productQuery.find();

  return (
    <section className="mt-24 flex flex-wrap justify-start gap-x-8 gap-y-16">
      {res.items.map((article) => (
        <article className="w-full sm:w-[45%] lg:w-[22%]" key={article._id}>
          <Link href={`/${article.slug}`} className="flex flex-col gap-4">
            <div className="relative h-80 w-full">
              <Image
                src={article.media?.mainMedia?.image?.url || "/product.png"}
                alt=""
                fill
                sizes="25vw"
                className="absolute z-10 rounded-md object-cover transition-opacity duration-500 ease-in hover:opacity-0"
                priority
              />
              {article.media?.items && (
                <Image
                  src={article.media?.items[1]?.image?.url || ""}
                  alt=""
                  fill
                  sizes="25vw"
                  className="absolute rounded-md object-cover"
                  priority
                />
              )}
            </div>
            <div className="flex justify-between">
              <span className="font-medium">{article.name}</span>
              <span className="flex items-center gap-1 font-semibold">
                <span className="">{article.price?.price}</span>
                <span className="text-xs">{article.price?.currency}</span>
              </span>
            </div>
            <div
              className="text-sm text-gray-500"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  `${
                    article.additionalInfoSections?.find(
                      (section: any) => section.title === "shortDesc",
                    )?.description ?? ""
                  }`,
                ),
              }}
            ></div>
            <button className="w-max rounded-2xl px-4 py-2 text-xs text-lama ring-1 ring-lama hover:bg-lama hover:text-white">
              Add to cart
            </button>
          </Link>
        </article>
      ))}
      <Pagination
        currentPage={res.currentPage || 0}
        hasPrev={res.hasPrev()}
        hasNext={res.hasNext()}
      />
    </section>
  );
};
