export default `
query {
  data: categories{
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
