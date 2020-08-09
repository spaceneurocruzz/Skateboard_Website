import { countCommentRating } from "../utility";

let normalData = {
  dataByMapId: [
    { mapId: 1, rating: 1 },
    { mapId: 2, rating: 4 },
  ],
  ratingVal: 1,
};

let noData = {
  dataByMapId: [],
  ratingVal: 5,
};

let undefinedData = {
  dataByMapId: undefined,
  ratingVal: 5,
};

let stringRatingValData = {
  dataByMapId: [
    { mapId: 1, rating: 1 },
    { mapId: 2, rating: 4 },
  ],
  ratingVal: "1",
};

test("Test countCommentRating", () => {
  expect(countCommentRating(normalData.dataByMapId, normalData.ratingVal)).toBe(
    2
  );
  expect(countCommentRating(noData.dataByMapId, noData.ratingVal)).toBe(5);
  expect(
    countCommentRating(undefinedData.dataByMapId, undefinedData.ratingVal)
  ).toBe(5);
  expect(
    countCommentRating(
      stringRatingValData.dataByMapId,
      stringRatingValData.ratingVal
    )
  ).toBe(2);
});
