import { Link } from "react-router-dom";
import productZero from "../assets/products-2/1.png";
import productPower from "../assets/products-2/2.png";
import productFlex from "../assets/products-2/3.png";
import productControl from "../assets/products-2/4.png";

const PRODUCTS = [
  {
    id: "zero",
    title: "RAD ZERO",
    subtitle: "Premium Flame Retardant Wire",
    lines: ["Zero smoke.", "Zero fire.", "Zero compromise."],
    image: productZero,
    imageAlt: "RAD Zero premium flame retardant wire",
    href: "/products/rad-zero",
  },
  {
    id: "power",
    title: "RAD POWER",
    subtitle: "High Performance House Wire",
    lines: ["Consistent performance for safe and stable connections."],
    image: productPower,
    imageAlt: "RAD Power house wire cable cross-section",
    href: "/products/multi-core-control-cable",
  },
  {
    id: "flex",
    title: "RAD FLEX",
    subtitle: "Flexible Industrial Cable",
    lines: ["High flexibility.", "High durability.", "Easy installation."],
    image: productFlex,
    imageAlt: "RAD Flex industrial cable",
    href: "/products/multi-core-control-cable",
  },
  {
    id: "control",
    title: "RAD CONTROL",
    subtitle: "Control & Signal Cable",
    lines: ["Precise control.", "Reliable performance.", "Stable transmission."],
    image: productControl,
    imageAlt: "RAD Control signal cable",
    href: "/products/multi-core-control-cable",
  },
];

function ProductCard({ title, subtitle, lines, image, imageAlt, href }) {
  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-800/90 bg-zinc-950/90 transition-all duration-300 hover:border-[#e50914] hover:bg-gradient-to-br hover:from-[#5a0008] hover:via-[#1a0508] hover:to-black hover:shadow-[0_0_48px_rgba(229,9,20,0.35)] sm:flex-row"
    >
      <div className="flex min-w-0 flex-1 flex-col justify-between p-6 sm:p-7 lg:p-8">
        <div>
          <h3 className="whitespace-nowrap text-[clamp(1.125rem,2.4vw,1.65rem)] font-black uppercase leading-tight tracking-wide text-white">
            {title.startsWith("RAD ") ? (
              <>
                <span className="text-white transition-colors duration-300 group-hover:text-[#e50914]">RAD</span>
                <span className="text-white"> {title.slice(4).trim()}</span>
              </>
            ) : (
              <span>{title}</span>
            )}
          </h3>
          <p className="mt-2 text-sm font-semibold text-white/95 lg:text-base">{subtitle}</p>
          <ul className="mt-4 space-y-1.5">
            {lines.map((line) => (
              <li key={line} className="text-xs leading-relaxed text-zinc-400 lg:text-sm">
                {line}
              </li>
            ))}
          </ul>
        </div>

        <Link
          to={href}
          className="mt-6 inline-flex w-fit items-center justify-center rounded-md border border-white/80 bg-transparent px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white transition-all duration-300 group-hover:border-[#e50914] group-hover:bg-[#e50914] group-hover:text-white group-hover:shadow-[0_0_24px_rgba(229,9,20,0.5)] lg:px-6 lg:py-3.5 lg:text-sm"
        >
          View Details
        </Link>
      </div>

      <div className="relative flex min-h-[200px] shrink-0 items-end justify-end overflow-hidden bg-black/40 transition-colors duration-300 group-hover:bg-[#e50914]/10 sm:min-h-0 sm:w-[44%] lg:w-[46%]">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_70%_50%,rgba(249,115,22,0.12),transparent)] transition-opacity duration-300 group-hover:bg-[radial-gradient(ellipse_80%_80%_at_70%_50%,rgba(229,9,20,0.2),transparent)]"
          aria-hidden
        />
        {/* Slightly oversized, half clipped on the right — slides in on hover without edge cut-off */}
        <div className="relative z-[1] flex h-[240px] w-full items-end justify-end overflow-hidden pb-1 pr-1 sm:h-[300px] lg:h-[340px]">
          <img
            src={image}
            alt={imageAlt}
            className="h-[106%] w-[106%] max-w-none origin-bottom-right object-contain object-bottom transition-transform duration-500 ease-out will-change-transform translate-x-[30%] group-hover:translate-x-[5%] sm:h-[108%] sm:w-[108%] sm:translate-x-[34%] sm:group-hover:translate-x-[4%] lg:h-[110%] lg:w-[110%] lg:translate-x-[36%] lg:group-hover:translate-x-[3%]"
            decoding="async"
          />
        </div>
      </div>
    </article>
  );
}

export default function ProductsSection() {
  return (
    <section
      id="products"
      className="relative w-full overflow-hidden bg-black px-5 py-16 font-sans sm:px-10 sm:py-20 lg:px-14 lg:py-24 xl:px-16 2xl:px-20"
      aria-labelledby="products-section-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_15%_0%,rgba(229,9,20,0.07),transparent_55%)]"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-[1920px]">
        <header className="mb-12 max-w-3xl sm:mb-14 lg:mb-16">
          <h2
            id="products-section-heading"
            className="site-section-title site-section-title--xl"
          >
            Our <span className="text-[#e50914]">Products</span>
          </h2>
          <p className="site-section-desc">
            Advanced solution for every need
          </p>
        </header>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 xl:gap-6 2xl:gap-7">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
