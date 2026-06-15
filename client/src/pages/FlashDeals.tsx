import { useEffect, useState } from "react"
import type { Product } from "../types"
import { dummyProducts } from "../assets/assets";
import { Zap } from "lucide-react";
import Loading from "../components/Loading";
import ProductCard from "../components/Home/ProductCard";

const FlashDeals = () => {

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const PRODUCTS_PER_PAGE = 12;

  useEffect(() => {
    const filteredProducts = dummyProducts.filter((p) => p.stock > 0);
    setProducts(filteredProducts);
    setTimeout(() => setLoading(false), 1000);
  }, [])

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  const currentProducts = products.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-app-cream">
      {/* Banner */}
      <div className="bg-linear-to-r from-app-orange to-app-orange-dark py-10 text-white">
        <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="flex-center gap-3 mb-3">
            <Zap className="size-6 fill-white" />
            <h1 className="text-3xl font-semibold">Flash Deals</h1>
            <Zap className="size-6 fill-white" />
          </div>

          <p className="text-white/80 max-w-md mx-auto">Limited-time offers on your favorite organic products. Grab them before they're gone</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {loading ? (<Loading />) : (products.length === 0 ? (
          <div className="text-center py-16">
            <Zap className="size-16 text-app-border mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-app-green mb-2">No deals right now</h2>
            <p className="text-sm text-app-text-light">Check back soon for amazing offers!</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
              {currentProducts.map((product) => product.stock > 0 && (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-10">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button key={i} onClick={() => { setPage(i + 1); window.scrollTo({ top: 0, behavior: "smooth", }); }}
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${page === i + 1
                      ? "bg-app-green text-white"
                      : "bg-white text-app-text-light hover:bg-app-cream"
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}

          </>


        ))}
      </div>
    </div>
  )
}

export default FlashDeals