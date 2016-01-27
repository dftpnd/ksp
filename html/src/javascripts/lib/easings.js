function easeInExpo (x, t, b, c, d) { return (t===0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b; };
function easeOutExpo (x, t, b, c, d) { return (t===d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b; };
function easeInOutExpo (x, t, b, c, d) { if (t===0) return b; if (t===d) return b+c; if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b; return c/2 * (-Math.pow(2, -10 * --t) + 2) + b; };

export default { easeInExpo, easeOutExpo, easeInOutExpo };
