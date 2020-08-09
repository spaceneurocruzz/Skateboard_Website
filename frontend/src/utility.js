const countCommentRating = (dataByMapId, ratingVal) => {
  let ratingTotal = 0;
  let dataCount = 0;

  for (let idx in dataByMapId) {
    ratingTotal += Number(dataByMapId[idx].rating);
    dataCount++;
  }

  ratingTotal += Number(ratingVal);

  if (dataCount === 0) {
    dataCount = 1;
  } else {
    dataCount += 1;
  }

  return Math.round((ratingTotal / dataCount) * 10) / 10;
};

export { countCommentRating };
