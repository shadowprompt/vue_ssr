export default `
query($id: ID) {
  data:post(id: $id){
    ID
    post_title
    post_content
    post_date
  }
}
`;
