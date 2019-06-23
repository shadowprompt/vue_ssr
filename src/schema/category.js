export default `
query($currentPage: Int, $pageSize: Int, $taxonomy: String) {
  data: termTaxonomies(pageSize:$pageSize, currentPage:$currentPage, taxonomy: $taxonomy){
    name
    count
    description
    slug
    term_id
    term_taxonomy_id
    children{
      name
      count
      description
      slug
      term_id
      term_taxonomy_id
    }
  }
}
`;
