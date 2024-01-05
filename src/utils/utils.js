/**
 *
 * @param {*} query : req.query
 * @param {*} model : Model
 * @returns
 */
export const PaginateQuery = async (query, model) => {
  const page = parseInt(query.page) || 1;
  const pageSize = parseInt(query.pageSize) || 10;

  const totalCount = await model.countDocuments();
  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    page,
    pageSize,
    totalPages,
    totalCount,
  };
};
