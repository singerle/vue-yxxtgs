import router from '@/router/teacher'
import store from './store'
router.beforeEach((to, from, next) => {
  if (to.query.userid) {
    store.commit('SET_TOKEN', to.query.userid)
  }
  next()
})
