import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductList from "../components/ProductList";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <ProductList />
      </main>
    </>
  );
}