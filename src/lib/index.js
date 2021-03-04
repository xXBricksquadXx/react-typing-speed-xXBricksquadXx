export const calcWPM = (txt, secs = 60) =>
  Math.round(txt.split("").length / 5) * (60 / secs);
