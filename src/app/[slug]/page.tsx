import { CustomizeProduct } from "@/components/[slug]/customize-product";
import { ProductImages } from "@/components/[slug]/product-images";
import { Add } from "@/components/add";
import { wixClientServer } from "@/lib/wix-client-server";
import DOMPurify from "isomorphic-dompurify";

import { NextPage } from "next";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: string;
  };
}

const Page: NextPage<PageProps> = async ({ params: { slug } }) => {
  const wixClient = await wixClientServer();
  const products = await wixClient.products
    .queryProducts()
    .eq("slug", slug)
    .find();

  if (!products.items[0]) {
    return notFound();
  }

  const product = products.items[0];

  return (
    <section className="relative flex flex-col gap-16 px-4 md:px-8 lg:flex-row lg:px-16 xl:px-32 2xl:px-64">
      <div className="top-20 h-max w-full lg:sticky lg:w-1/2">
        <ProductImages items={product.media?.items} />
      </div>
      <div className="flex w-full flex-col gap-6 lg:w-1/2">
        <h1 className="text-4xl font-medium">{product.name}</h1>
        <div
          className="text-gray-500"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(product.description! || ""),
          }}
        ></div>
        <div className="h-[2px] bg-gray-100" />
        {product.discount?.value === 0 ? (
          <h2 className="text-2xl font-medium">
            {product.price?.formatted?.price}
          </h2>
        ) : (
          <div className="flex items-center gap-4">
            <h3 className="text-xl text-gray-500 line-through">
              {product.price?.formatted?.price}
            </h3>
            <h2 className="text-2xl font-medium">
              {product.price?.formatted?.discountedPrice}
            </h2>
          </div>
        )}
        <div className="h-[2px] bg-gray-100" />
        {product.variants && product.productOptions ? (
          <CustomizeProduct
            variants={product.variants}
            productOptions={product.productOptions}
            productId={product._id!}
          />
        ) : (
          <Add
            productId={product._id!}
            variantId={process.env.NEXT_PUBLIC_DEFAULT_VARIANT_ID as string}
            stockNumber={product.stock?.quantity!}
          />
        )}
        <div className="h-[2px] bg-gray-100" />
        {product.additionalInfoSections?.map((info) => (
          <div className="" key={info.title}>
            <h4 className="mb-4 font-medium">{info.title}</h4>
            <p>{info.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Page;
