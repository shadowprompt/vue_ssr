export default `
query{
  data: posts(post_type: "post",  post_status: "publish"){
    ID
    post_title
    post_content
    post_date
    tags{
      name
      slug
    }
    categories{
      name
      slug
    }
  }
}
`;
