export default `
query{  
  data: posts(currentPage: 1, pageSize: 10, post_type: "post", post_status: "publish", order:["ID", "DESC"]){    
    list {
      ID
      post_title
    }
  }
}
`;
