export default `
query($currentPage: Int, $slug: String, $keyword: String, $year: String, $month: String, $day: String){  
  data: posts(currentPage: $currentPage, slug: $slug, keyword: $keyword, year: $year, month: $month, day: $day, pageSize: 10, post_type: "post", post_status: "publish", order:["ID", "DESC"]){    
    condition {
      term_id
      name
      slug
      term_group
    }
    date
    list {
      ID
      post_title
      post_content
      post_date
      total
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
}
`;
