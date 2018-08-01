const getters = {
  userid: state => state.teacher.userId,
  type: state => state.teacher.type,
  code: state => state.teacher.code,
  search: state => state.teacher.search,
  token: state => state.teacher.token,
  news: state => state.teacher.news
}
export default getters