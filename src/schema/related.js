export default `
  query related($id: ID, $tags: [ID], $limit: Int) {
    data: related(id: $id, tags: $tags, limit: $limit) {
      ID
      post_title
      post_content
    }
  }
`;
