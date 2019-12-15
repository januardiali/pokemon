// Smooth a value using an exponential graph that opens downward,
// intersects 0,0 and intersects max,max.
function smoothExponentially(value, max) {
    // function will be y = a * (x - max)^2 + max; just need to figure out what a is, such that it intercepts 0,0
    // if you solve for a when y is 0 and x is 0, you get (-m / (m^2)) = a
    const a = -max / Math.pow(max, 2);
    return a * Math.pow(value - max, 2) + max;
  }
  
export default function getStatDisplayRatio(statValue) {
    const maxStat = 255; // verified by grepping
    const smoothedValue = smoothExponentially(statValue, maxStat);
    return smoothedValue / maxStat;
}