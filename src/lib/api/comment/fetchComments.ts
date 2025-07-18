import axios from 'axios';

type FetchCommentsProps =
  | { target: 'study'; studyId: number; postId: number }
  | { target: 'recruitment'; postId: number };

export const fetchComments = async (props: FetchCommentsProps) => {
  const { target, postId } = props;

  let url = '';
  if (target === 'study') {
    url = `/api/studies/${props.studyId}/posts/${postId}/comments`;
  } else {
    url = `/api/recruitment-posts/${postId}/comments`;
  }

  const response = await axios.get(url);
  return response.data.data;
};
