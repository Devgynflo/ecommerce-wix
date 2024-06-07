import { wixClientServer } from "@/lib/wix-client-server";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

interface CategoryListProps {}

export const CategoryList: NextPage<CategoryListProps> = async () => {
  const wixClient = await wixClientServer();
  const { items: categories } = await wixClient.collections
    .queryCollections()
    .find();

  return (
    <section className="scrollbar-hide overflow-x-scroll px-4">
      <div className="flex gap-4 md:gap-8">
        {categories.map((category) => (
          <article
            key={category._id}
            className="w-full flex-shrink-0 sm:w-1/2 lg:w-1/4 xl:w-1/6"
          >
            <Link href={`/list?category=${category.slug}`}>
              <div className="relative h-96 w-full bg-slate-100">
                <Image
                  src={category.media?.mainMedia?.image?.url || "/category.png"}
                  alt={`${category.media?.mainMedia?.image?.altText || "test"}`}
                  fill
                  sizes="20vw"
                  className="object-cover"
                />
              </div>
              <h1 className="mt-8 text-xl font-light tracking-wide">
                {category.name}
              </h1>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};
