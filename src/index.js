import globalCompositeOperation from 'globalcompositeoperation';

const fabricImg = document.getElementById('fabricImg');
const multiplyImg = document.getElementById('multiplyImg');
const softlightImg = document.getElementById('softlightImg');
const textImg = document.getElementById('textImg');

const fabric = getImageData(fabricImg);

const softlight = getImageData(softlightImg);
manualComposition(fabric.data, softlight.data, 'soft-light');

const multiply = getImageData(multiplyImg);
manualComposition(fabric.data, multiply.data, 'multiply');

canvas.width = fabricImg.clientWidth;
canvas.height = fabricImg.clientHeight;
const context = canvas.getContext('2d');
context.putImageData(fabric, 0, 0);

context.drawImage(textImg, 0, 0);

function getImageData(img) {
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);

  return ctx.getImageData(0, 0, img.naturalWidth, img.naturalHeight);
}

function manualComposition(dstData, srcData, operator) {
  const composition = globalCompositeOperation(false);
  const destStartIndex = 0;
  const srcStartIndex = 0;
  const pixelsCount = 700 * 700;

  /**
   * @param {Uint8ClampedArray} destData [out]
   * @param {Uint8ClampedArray} srcData [in]
   * @param {Number} destStartIndex [in] - should be integer and fits in destData range
   * @param {Number} srcStartIndex [in] - should be integer and fits in srcData range
   * @param {Number} pixelsCount [in] - should be integer
   */
  composition[operator](
    dstData,
    srcData,
    destStartIndex,
    srcStartIndex,
    pixelsCount,
  );
}
