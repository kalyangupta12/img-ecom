import { IKImage } from "imagekitio-next";
import Link from "next/link";
import { IProduct, IMAGE_VARIANTS } from "@/models/Product";
import { Eye, Heart, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductCard({ product }: { product: IProduct }) {
  // Calculate lowest and highest prices
  const prices = product.variants.map((variant) => variant.price);
  const lowestPrice = Math.min(...prices);
  const highestPrice = Math.max(...prices);

  return (
    <motion.div
      className="card bg-base-100 shadow hover:shadow-xl transition-all duration-300 overflow-hidden"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <figure className="relative px-4 pt-4">
        <Link
          href={`/products/${product._id}`}
          className="relative group w-full block"
          aria-label={`View ${product.name}`}
        >
          <div
            className="rounded-xl overflow-hidden relative w-full"
            style={{
              aspectRatio:
                IMAGE_VARIANTS.SQUARE.dimensions.width /
                IMAGE_VARIANTS.SQUARE.dimensions.height,
            }}
          >
            <IKImage
              path={product.imageUrl}
              alt={product.name}
              loading="lazy"
              transformation={[
                {
                  height: IMAGE_VARIANTS.SQUARE.dimensions.height.toString(),
                  width: IMAGE_VARIANTS.SQUARE.dimensions.width.toString(),
                  cropMode: "extract",
                  focus: "center",
                  quality: "80",
                },
              ]}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-xl" />
          </div>
        </Link>
      </figure>

      <div className="card-body p-4">
        <Link
          href={`/products/${product._id}`}
          className="hover:opacity-80 transition-opacity"
          aria-label={`View details of ${product.name}`}
        >
          <h2 className="card-title text-lg font-semibold">{product.name}</h2>
        </Link>

        <p className="text-sm text-base-content/70 line-clamp-2 min-h-[2.5rem]">
          {product.description}
        </p>
        <div className="card-actions justify-between items-center mt-2">
          <div className="flex flex-col">
            <span className="text-lg font-bold">
              From ${lowestPrice.toFixed(2)}
              {highestPrice > lowestPrice && ` - $${highestPrice.toFixed(2)}`}
            </span>
            <span className="text-xs text-base-content/50">
              {product.variants.length} sizes available
            </span>
          </div>

          <div className="flex gap-2">
            <button
              className="btn btn-ghost btn-sm p-2 hover:bg-base-200"
              aria-label="Add to wishlist"
            >
              <Heart className="w-4 h-4" />
            </button>
            <button
              className="btn btn-ghost btn-sm p-2 hover:bg-base-200"
              aria-label="Add to cart"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
            <Link
              href={`/products/${product._id}`}
              className="btn btn-primary btn-sm gap-2"
              aria-label="View product options"
            >
              <Eye className="w-4 h-4" />
              View Options
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}