export default `
  query prevNext($post_date: Float) {
    data: prevNext(post_date: $post_date) {
      ID
      post_name
      post_title
    }
  }
`;
