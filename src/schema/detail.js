export default `
query($id: ID) {
  data:post(id: $id){
    ID
    post_title
    post_content
    post_date
    user {
      display_name
    }
    tags{
      term_taxonomy_id
      term_id
      name
      slug
      term_group
    }
    categories{
      term_taxonomy_id
      term_id
      name
      slug
      term_group
    }
  }
}
`;
