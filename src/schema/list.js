export default `
query($currentPage: Int, $slug: String){
  data: posts(currentPage: $currentPage, slug: $slug, pageSize: 10, post_type: "post", post_status: "publish", order:["ID", "DESC"]){
    condition {
      term_id
      name
      slug
      term_group
    }
    list {
      ID
      post_title
      post_content
      post_date
      total
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
}
`;
