import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";


export const appRoutes: Routes = [
  { path: "", redirectTo: "/drafter", pathMatch: "full" },
  { path: "drafter", loadChildren: "./+drafter/drafter.module#DrafterModule" },
  { path: "**", redirectTo: "/drafter", pathMatch: "full" },
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
