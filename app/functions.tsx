const easeInOutQuad = (t: number) =>
  t < 0.5 ? 2 * t ** 2 : -1 + (4 - 2 * t) * t;

export const scrollToRef = (
  ref: React.RefObject<HTMLHeadingElement>,
  offset: number
) => {
  const start = window.pageYOffset;
  const target = ref.current?.offsetTop! - offset || 0;
  const duration = 1000;

  const startTime = performance.now();

  const animateScroll = (currentTime: DOMHighResTimeStamp) => {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    const ease = easeInOutQuad(progress);

    window.scrollTo(0, start + ease * (target - start));

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  };

  requestAnimationFrame(animateScroll);
};
