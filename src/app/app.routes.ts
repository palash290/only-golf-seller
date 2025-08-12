import { Routes } from '@angular/router';
import { authGuard, loginGuard } from './guards/auth.guard';

export const routes: Routes = [
      {
            path: '',
            loadComponent: () => import('./components/log-in/log-in.component').then(m => m.LogInComponent),
      },
      {
            path: 'forgot-password',
            loadComponent: () => import('./components/forget-password/forget-password.component').then(m => m.ForgetPasswordComponent),
            pathMatch: 'full',
      },
      {
            path: 'reset-password',
            loadComponent: () => import('./components/reset-password/reset-password.component').then(m => m.ResetPasswordComponent),
            pathMatch: 'full',
      },
      {
            path: 'home',
            loadComponent: () => import('./components/main/main.component').then(m => m.MainComponent),
            canActivate: [authGuard],
            children: [
                  {
                        path: '',
                        redirectTo: 'dashboard',
                        pathMatch: 'full'
                  },
                  {
                        path: 'dashboard',
                        loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent),
                        // canActivate: [authGuard]
                  },
                  {
                        path: 'manage-products',
                        loadComponent: () => import('./components/manage-products/manage-products.component').then(m => m.ManageProductsComponent),
                        // canActivate: [authGuard]
                  },
                  {
                        path: 'add-product',
                        loadComponent: () => import('./components/manage-products/add-product/add-product.component').then(m => m.AddProductComponent),
                        // canActivate: [authGuard]
                  },
                  {
                        path: 'view-product',
                        loadComponent: () => import('./components/manage-products/view-products/view-products.component').then(m => m.ViewProductsComponent),
                        // canActivate: [authGuard]
                  },
                  {
                        path: 'edit-product',
                        loadComponent: () => import('./components/manage-products/edit-product/edit-product.component').then(m => m.EditProductComponent),
                        // canActivate: [authGuard]
                  },

                  {
                        path: 'order-list',
                        loadComponent: () => import('./components/order-list/order-list.component').then(m => m.OrderListComponent),
                        // canActivate: [authGuard]
                  },
                  {
                        path: 'view-order',
                        loadComponent: () => import('./components/order-list/view-order/view-order.component').then(m => m.ViewOrderComponent),
                        // canActivate: [authGuard]
                  },

                  {
                        path: 'customer-connect',
                        loadComponent: () => import('./components/customer-connect/customer-connect.component').then(m => m.CustomerConnectComponent),
                        // canActivate: [authGuard]
                  },
                  {
                        path: 'enquiry-detail',
                        loadComponent: () => import('./components/customer-connect/enquiry-detail/enquiry-detail.component').then(m => m.EnquiryDetailComponent),
                        // canActivate: [authGuard]
                  },

                  {
                        path: 'ratings-reviews',
                        loadComponent: () => import('./components/ratings-reviews/ratings-reviews.component').then(m => m.RatingsReviewsComponent),
                        // canActivate: [authGuard]
                  },

                  {
                        path: 'earnings-payouts',
                        loadComponent: () => import('./components/earnings-payouts/earnings-payouts.component').then(m => m.EarningsPayoutsComponent),
                        // canActivate: [authGuard]
                  },

                  {
                        path: 'sales-analytics',
                        loadComponent: () => import('./components/sales-analytics/sales-analytics.component').then(m => m.SalesAnalyticsComponent),
                        // canActivate: [authGuard]
                  },

                  {
                        path: 'support',
                        loadComponent: () => import('./components/support/support.component').then(m => m.SupportComponent),
                        // canActivate: [authGuard]
                  },
                  {
                        path: 'raise-ticket',
                        loadComponent: () => import('./components/support/raise-ticket/raise-ticket.component').then(m => m.RaiseTicketComponent),
                        // canActivate: [authGuard]
                  },
                  {
                        path: 'support-list',
                        loadComponent: () => import('./components/support/support-list/support-list.component').then(m => m.SupportListComponent),
                        // canActivate: [authGuard]
                  },

                  {
                        path: 'shop-customization',
                        loadComponent: () => import('./components/shop-customization/shop-customization.component').then(m => m.ShopCustomizationComponent),
                        // canActivate: [authGuard]
                  },

                  {
                        path: 'notifications',
                        loadComponent: () => import('./components/notifications/notifications.component').then(m => m.NotificationsComponent),
                        // canActivate: [authGuard]
                  },

                  {
                        path: 'my-profile',
                        loadComponent: () => import('./components/my-profile/my-profile.component').then(m => m.MyProfileComponent),
                        // canActivate: [authGuard]
                  },
                  {
                        path: 'change-password',
                        loadComponent: () => import('./components/change-password/change-password.component').then(m => m.ChangePasswordComponent),
                        // canActivate: [authGuard]
                  },

            ]
      }

];
