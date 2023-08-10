import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AdminLayout from '../views/admin/AdminLayout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminLayout,
      children: [
        {
          path: 'products',
          name: 'products',
          component: () => import('../views/admin/ProductsView.vue'),
        },
        {
          path: 'products/new',
          name: 'new-product',
          component: () =>
            import('../views/admin/NewProductView.vue'),
        },
        {
          path: 'products/edit/:id',
          name: 'edit-product',
          component: () =>
            import('../views/admin/EditProductView.vue'),
        },
        {
          path: 'products/seeder',
          name: 'seed-products',
          component: () => import('../views/admin/SeederView.vue'),
        },
        {
          path: 'sales',
          name: 'sales',
          component: () => import('../views/admin/SalesView.vue'),
        },
      ],
    },
  ],
});

export default router;
