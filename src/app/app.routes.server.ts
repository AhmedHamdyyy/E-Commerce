import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'productdetails/:id',
    renderMode: RenderMode.Server  // لحل مشكلة ال Deploy Vercel
  },
  {
    path: 'shippingaddress/:id',
    renderMode: RenderMode.Server  // لحل مشكلة ال Deploy Vercel
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
