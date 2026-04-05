import heroBg from "@/assets/hero-calligraphy.png";

interface PageHeroBannerProps {
  title?: string;
  titleHighlight?: string;
  subtitle?: string;
}

const PageHeroBanner = ({ title, titleHighlight, subtitle }: PageHeroBannerProps) => (
  <section className="relative h-[30vh] min-h-[200px] flex items-end justify-center overflow-hidden">
    <img
      src={heroBg}
      alt="Calligraphie arabe dorée"
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-background/70" />
    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-background" />
    {title && (
      <div className="relative z-10 text-center px-4 pb-6">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-1">
          {title}
          {titleHighlight && <span className="text-primary"> {titleHighlight}</span>}
        </h1>
        {subtitle && (
          <p className="text-muted-foreground text-sm md:text-base">{subtitle}</p>
        )}
      </div>
    )}
  </section>
);

export default PageHeroBanner;
