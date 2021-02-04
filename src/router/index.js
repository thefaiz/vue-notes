import Vue from 'vue'
import VueRouter from 'vue-router'
import Folders from '../views/Folders.vue'
import Notes from '../views/Notes.vue'
import EditNote from '../views/EditNote.vue'
import CreateNote from '../views/CreateNote.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Folders',
    component:Folders
  },

  {
    path: '/folders/:id',
    name: 'Notes',
    component: Notes
  },

  {
    path: '/notes/:id',
    name: 'EditNote',
    component: EditNote
  },

  {
    path: '/folders/:id/create',
    name: 'CreateNote',
    component: CreateNote
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
