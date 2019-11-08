import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
 {
   path:'/',
   redirect:'/login'
 },
  {
    path:'/register',
    component:()=>import('../views/register.vue')
  },
  {
    path:'/login',
    component:()=>import('../views/login.vue')
  },
  {
    path:'/index',
    component:()=>import('../views/index.vue'),
    redirect:'/index/home',
    
    children:[
      {
        path:'/detail/:id',
        name:'detail',
        component:()=>import('../views/detail.vue')
      },
      {
        path:'/index/home',
        component:()=>import('../views/home.vue'),
        children:[
         
          {
            path:'/index/home/one',
            component:()=>import('../views/one.vue')
          },  {
            path:'/index/home/two',
            component:()=>import('../views/two.vue')
          },  {
            path:'/index/home/three',
            component:()=>import('../views/three.vue')
          }
        ]
      },
      {
        path:'/index/mybook',
        component:()=>import('../views/mybook.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
