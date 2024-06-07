import { CategoryList } from "@/components/category/category-list";
import { ProductList } from "@/components/product/product-list";
import { Skeleton } from "@/components/skeleton";
import { Slider } from "@/components/slider";
import { wixClientServer } from "@/lib/wix-client-server";
import { Suspense } from "react";

export default async function Home() {
  const wixClient = await wixClientServer();

  return (
    <section>
      <Slider />
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl">Featured Product</h1>
        <Suspense fallback={<Skeleton />}>
          <ProductList
            categoryId={process.env.FEATURED_PRODUCT_CATEGORY_ID}
            limit={4}
          />
        </Suspense>
      </div>
      <div className="mt-24">
        <h1 className="mb-12 px-4 text-2xl md:px-8 lg:px-16 xl:px-32 2xl:px-64">
          Categories
        </h1>
        <Suspense fallback={<Skeleton />}>
          <CategoryList />
        </Suspense>
      </div>
      {/* <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl">New Products</h1>
        <ProductList />
      </div> */}
    </section>
  );
}
