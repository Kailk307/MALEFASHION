import httpAxios from "../httpAxios";

const CommentService = {
  addComment: (commentData) => {
    return httpAxios.post("/comments", commentData);
  },
};
export default CommentService;
