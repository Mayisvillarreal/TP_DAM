import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'dispositivos',
    children: [
      {
        path: '',
        loadChildren: () => import('./dispositivos/dispositivos.module').then( m => m.DispositivosPageModule),
        pathMatch: 'full'
      },
      {
        path: 'detalles/:id',
        children: [
          {
            path: '',
            loadChildren: () => import('./dispositivos/detalles/detalles.module').then( m => m.DetallesPageModule),
            pathMatch: 'full'
          },
          {
            path: 'mediciones',
            loadChildren: () => import('./dispositivos/mediciones/mediciones.module').then( m => m.MedicionesPageModule),
          },
          {
            path: 'logRiego',
            loadChildren: () => import('./dispositivos/log-riegos/log-riegos.module').then( m => m.LogRiegosPageModule)
          }
        ]
      },
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
