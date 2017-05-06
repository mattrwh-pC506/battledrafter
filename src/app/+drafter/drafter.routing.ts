import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";

import { DrafterComponent } from "./drafter.component";


export const mainRoutes: Routes = [
  {
    path: "",
    component: DrafterComponent,
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(mainRoutes);
