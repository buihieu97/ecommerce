const productContainer = document.querySelector(".product-list .box-card");
const boxDots = Array.from(document.querySelectorAll(".box-dot"));
boxDots.forEach((e, index) => {
  const sliderContainer = e.parentElement;
  sliderContainer.style.scrollBehavior = "smooth";
  const sliderItems = Array.from(sliderContainer.children).filter(
    (e, index) => index < sliderContainer.children.length - 1
  );
  const widthItem = sliderItems[0].clientWidth;
  const widthItemSlider = widthItem * sliderItems.length;
  const containerWidth = sliderContainer.clientWidth;
  const countItemVisible = Math.round(containerWidth / widthItem);
  const countDot = Math.ceil(widthItemSlider / countItemVisible / widthItem);
  new Array(countDot).fill(0).forEach((e, i) => {
    let dot = document.createElement("div");
    dot.classList = "dot";
    if (i === 0) {
      dot.classList = "dot active";
    }
    boxDots[index].appendChild(dot);
  });
  const dots = [...e.children];

  dots.forEach((e, i) => {
    e.addEventListener("click", (e) => {
      sliderContainer.scrollLeft = widthItem * countItemVisible * i;
      if (i === dots.length - 1) {
        sliderContainer.scrollLeft = widthItem * 2 * countItemVisible * i;
      }
    });
  });
  sliderContainer.addEventListener("scroll", (e) => {
    let indexDotActive = Math.floor(
      e.target.scrollLeft /
        (sliderContainer.children[0].clientWidth * countItemVisible)
    );
    dots.forEach((e) => {
      e.classList.remove("active");
    });
    dots[indexDotActive].classList = "dot active";
    let b = e.target.scrollWidth - e.target.scrollLeft;
    if (b <= e.target.clientWidth + widthItem) {
      dots.forEach((e) => {
        e.classList.remove("active");
      });
      dots[dots.length - 1].classList = "dot active";
    }
  });
});
