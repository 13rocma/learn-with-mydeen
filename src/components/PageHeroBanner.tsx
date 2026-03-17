import heroBg from "@/assets/hero-calligraphy.png";

const PageHeroBanner = () => (
  <section className="relative h-[30vh] min-h-[200px] flex items-center justify-center overflow-hidden">
    <img
      src={heroBg}
      alt="Calligraphie arabe dorée"
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-background/70" />
    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-background" />
  </section>
);

export default PageHeroBanner;
