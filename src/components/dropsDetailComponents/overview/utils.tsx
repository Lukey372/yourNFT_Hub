export const getColor = (input) => {
  if (inRange(input, 75, 100)) return "#4E9F3D";
  if (inRange(input, 50, 75)) return "#FFD369";
  if (inRange(input, 25, 50)) return "#FA7D09";
  if (inRange(input, 0, 25)) return "#950101";
};

export const getDeg = (input) => {
  return -150 + (180 / 100) * input;
};

// return true if in range, otherwise false
function inRange(x, min, max) {
  return (x - min) * (x - max) <= 0;
}
