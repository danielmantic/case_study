import { notFound } from "next/navigation";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import ClientProductInfo from "../../../components/ClientProductInfo";
import ProductCarousel from "../../../components/ProductCarousel";
import ProductDetailBar from "../../../components/ProductDetailBar";

export default async function ProductDetail({ params }: { params: { id: string } }) {
  const res = await fetch(`https://fakestoreapi.com/products/${params.id}`);
  if (!res.ok) return notFound();
  const product = await res.json();

  return (
    <div>
      <Header />
      <ProductDetailBar/>
      <div className="grid grid-cols-[10%_80%_10%] mt-[50px]">
      <div></div>
      <div>
      <div className="grid grid-cols-2">
        <div className="grid justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-[300px] h-[300px] object-contain mb-[2px]"
          />
          <div className="grid grid-cols-3">
            {[1, 2, 3].map((_, i) => (
              <img
                key={i}
                src={product.image}
                alt={`Thumbnail ${i + 1}`}
                className="w-[100px] h-[100px] object-contain"
              />
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-start">
          <ClientProductInfo product={product} />
        </div>
      </div>
      <ProductCarousel/>
    </div>  
    </div>
    <div></div>
    <Footer />
    </div>
  );
}

