/** Canvas-local pointer → NDC. Top-left of the rect is (−1, +1). */
export function clientToNdc(clientX, clientY, rect) {
  return {
    x: ((clientX - rect.left) / rect.width) * 2 - 1,
    y: -((clientY - rect.top) / rect.height) * 2 + 1,
  };
}
