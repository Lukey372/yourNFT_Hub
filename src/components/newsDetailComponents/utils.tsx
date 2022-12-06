const getCategories = (categoriesState) => {
  const categories = categoriesState.rows?.map?.((x) => ({
    title: x.category_name,
    url: "/news/?cat=" + x.id,
  }));

  categories?.push?.({ title: "All News", url: "/news" });
  if (categories) return categories;
  else return [];
};

export default getCategories;
