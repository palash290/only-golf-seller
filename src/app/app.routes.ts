import { Routes } from '@angular/router';
import { authGuard, loginGuard } from './guards/auth.guard';

export const routes: Routes = [
      {
            path: '',
            loadComponent: () => import('./components/log-in/log-in.component').then(m => m.LogInComponent),
            title: 'Login',
      },
      {
            path: 'forgot-password',
            loadComponent: () => import('./components/forget-password/forget-password.component').then(m => m.ForgetPasswordComponent),
            pathMatch: 'full',
            title: 'Forgot Password',
      },
      {
            path: 'reset-password',
            loadComponent: () => import('./components/reset-password/reset-password.component').then(m => m.ResetPasswordComponent),
            pathMatch: 'full',
            title: 'Forgot Password',
      },
      {
            path: 'home',
            loadComponent: () => import('./components/main/main.component').then(m => m.MainComponent),
            // canActivate: [authGuard]
            children: [
                  {
                        path: '',
                        redirectTo: 'dashboard',
                        pathMatch: 'full'
                  },
                  {
                        path: 'dashboard',
                        loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent),
                        title: 'Dashboard',
                        // canActivate: [authGuard]
                  },
                  {
                        path: 'manage-products',
                        loadComponent: () => import('./components/manage-products/manage-products.component').then(m => m.ManageProductsComponent),
                        title: 'manage-products',
                        // canActivate: [authGuard]
                  },
                  {
                        path: 'add-product',
                        loadComponent: () => import('./components/manage-products/add-product/add-product.component').then(m => m.AddProductComponent),
                        title: 'manage-products',
                        // canActivate: [authGuard]
                  },
                  {
                        path: 'view-product',
                        loadComponent: () => import('./components/manage-products/view-products/view-products.component').then(m => m.ViewProductsComponent),
                        title: 'manage-products',
                        // canActivate: [authGuard]
                  },
                  {
                        path: 'edit-product',
                        loadComponent: () => import('./components/manage-products/edit-product/edit-product.component').then(m => m.EditProductComponent),
                        title: 'manage-products',
                        // canActivate: [authGuard]
                  },

                  {
                        path: 'order-list',
                        loadComponent: () => import('./components/order-list/order-list.component').then(m => m.OrderListComponent),
                        title: 'manage-products',
                        // canActivate: [authGuard]
                  },
                  {
                        path: 'view-order',
                        loadComponent: () => import('./components/order-list/view-order/view-order.component').then(m => m.ViewOrderComponent),
                        title: 'manage-products',
                        // canActivate: [authGuard]
                  },

                  {
                        path: 'customer-connect',
                        loadComponent: () => import('./components/customer-connect/customer-connect.component').then(m => m.CustomerConnectComponent),
                        title: 'manage-products',
                        // canActivate: [authGuard]
                  },
                  {
                        path: 'enquiry-detail',
                        loadComponent: () => import('./components/customer-connect/enquiry-detail/enquiry-detail.component').then(m => m.EnquiryDetailComponent),
                        title: 'manage-products',
                        // canActivate: [authGuard]
                  },

                  {
                        path: 'ratings-reviews',
                        loadComponent: () => import('./components/ratings-reviews/ratings-reviews.component').then(m => m.RatingsReviewsComponent),
                        title: 'manage-products',
                        // canActivate: [authGuard]
                  },

                  {
                        path: 'earnings-payouts',
                        loadComponent: () => import('./components/earnings-payouts/earnings-payouts.component').then(m => m.EarningsPayoutsComponent),
                        title: 'manage-products',
                        // canActivate: [authGuard]
                  },

                  {
                        path: 'sales-analytics',
                        loadComponent: () => import('./components/sales-analytics/sales-analytics.component').then(m => m.SalesAnalyticsComponent),
                        title: 'manage-products',
                        // canActivate: [authGuard]
                  },

                  {
                        path: 'support',
                        loadComponent: () => import('./components/support/support.component').then(m => m.SupportComponent),
                        title: 'manage-products',
                        // canActivate: [authGuard]
                  },
                  {
                        path: 'raise-ticket',
                        loadComponent: () => import('./components/support/raise-ticket/raise-ticket.component').then(m => m.RaiseTicketComponent),
                        title: 'manage-products',
                        // canActivate: [authGuard]
                  },
                  {
                        path: 'support-list',
                        loadComponent: () => import('./components/support/support-list/support-list.component').then(m => m.SupportListComponent),
                        title: 'manage-products',
                        // canActivate: [authGuard]
                  },

                  {
                        path: 'shop-customization',
                        loadComponent: () => import('./components/shop-customization/shop-customization.component').then(m => m.ShopCustomizationComponent),
                        title: 'manage-products',
                        // canActivate: [authGuard]
                  },

                  {
                        path: 'notifications',
                        loadComponent: () => import('./components/notifications/notifications.component').then(m => m.NotificationsComponent),
                        title: 'manage-products',
                        // canActivate: [authGuard]
                  },

                  {
                        path: 'my-profile',
                        loadComponent: () => import('./components/my-profile/my-profile.component').then(m => m.MyProfileComponent),
                        title: 'manage-products',
                        // canActivate: [authGuard]
                  },
                  {
                        path: 'change-password',
                        loadComponent: () => import('./components/change-password/change-password.component').then(m => m.ChangePasswordComponent),
                        title: 'manage-products',
                        // canActivate: [authGuard]
                  },

            ]
      }

];
