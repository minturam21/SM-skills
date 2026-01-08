import path from 'path';
// Fix: Added process import to resolve "Property 'cwd' does not exist on type 'Process'" error
import process from 'process';

export const CONSTANTS = {
  UPLOADS: {
    // Fix: Using imported process to ensure 'cwd' exists on type
    ROOT: path.join(process.cwd(), 'src', 'uploads'),
    COURSES: 'courses',
    GALLERY: 'gallery',
    PROFILES: 'profiles'
  },
  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10
  }
};