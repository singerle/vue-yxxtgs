import router from '@/router/routesStu'
router.beforeEach((to, from, next) => {
  if (to.query.userid) {
  	console.log(store)
    store.commit('SetUserInfo', to.query)
  }
  next()
})
