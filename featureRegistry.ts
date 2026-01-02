
import React, { ComponentType } from 'react';

/**
 * FEATURE ARCHITECTURE CONTRACT
 * 
 * To add a feature:
 * 1. Create a folder in /features/
 * 2. Export a Feature object
 * 3. Import and add it to the featureRegistry array below.
 * 
 * Features are removable. Deleting the folder and its registry entry 
 * must not break the core application.
 */

export interface AdminTabFeature {
  id: string;
  label: string;
  icon: string;
  component: ComponentType<any>;
}

export interface RouteFeature {
  path: string;
  component: ComponentType<any>;
}

export interface HomeSectionFeature {
  id: string;
  component: ComponentType<any>;
  order?: number; // Lower numbers render higher on the page
}

export interface FooterLinkFeature {
  label: string;
  path: string;
}

export interface Feature {
  id: string;
  routes?: RouteFeature[];
  adminTabs?: AdminTabFeature[];
  homeSections?: HomeSectionFeature[];
  footerLinks?: FooterLinkFeature[];
}

/**
 * Registry of all active optional features.
 * Currently empty, ready for future development.
 */
export const featureRegistry: Feature[] = [];

// --- Accessor Selectors for Core Consumption ---

export const getFeatureRoutes = () => featureRegistry.flatMap(f => f.routes || []);

export const getFeatureAdminTabs = () => featureRegistry.flatMap(f => f.adminTabs || []);

export const getFeatureHomeSections = () => 
  featureRegistry.flatMap(f => f.homeSections || [])
    .sort((a, b) => (a.order || 0) - (b.order || 0));

export const getFeatureFooterLinks = () => featureRegistry.flatMap(f => f.footerLinks || []);
