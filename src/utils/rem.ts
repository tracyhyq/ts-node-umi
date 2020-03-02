// rem 自动缩放

function setRem() {
  const remBase: number = 100;
  const width: number = window.innerWidth;
  let fontSize: number = remBase;
  if (width < 425) {
    fontSize = (width / 375) * remBase;
  }
  document.documentElement.style.fontSize = fontSize + 'px';
}

const rem = () => {
  window.addEventListener('resize', setRem);
  window.addEventListener('orientationchange', setRem);
  window.addEventListener('DOMContentLoaded', () => {
    // 禁止缩放
    const viewport: HTMLDivElement | null = document.querySelector(
      'meta[name=viewport]'
    );
    if (viewport) {
      viewport.setAttribute(
        'content',
        'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
      );
    }
  });

  setRem();
};

export default rem;
