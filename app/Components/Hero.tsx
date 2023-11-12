const Hero = () => {
  return (
    <div
      className="hero min-h-screen mb-8"
      style={{
        backgroundImage: "url(/banner-image.png)",
        backgroundSize: "cover",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-12 lg:mb-5 text-4xl lg:text-5xl font-bold">
            Welcome to your shopping Hub
          </h1>
          <p className="mb-5">
            At Generic Ecommerce, we take pride of selecting and curating the
            best offers to support you and your lifestyle. Whatever it is that
            you are looking for, you´ll find it here!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
