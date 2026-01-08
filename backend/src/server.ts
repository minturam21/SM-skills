import process from 'process';
import app from './app.ts';
import pool from './config/database.ts';
import { ENV } from './config/env.ts';

/**
 * BOOTSTRAP SEQUENCE
 * 1. Verify DB connectivity
 * 2. Initialize HTTP listener
 * 3. Bind process safety events
 */
async function bootstrap() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ DATABASE: Connection sequence successful.');
    connection.release();

    app.listen(ENV.PORT, () => {
      console.log(`🚀 SMS SERVER: Active on port ${ENV.PORT}`);
      console.log(`📡 API BASE: http://localhost:${ENV.PORT}/api`);
    });
  } catch (error) {
    console.error('❌ BOOTSTRAP ERROR:', error);
    // Fix: Using imported process to ensure 'exit' exists on type
    process.exit(1);
  }
}

// Fix: Using imported process to ensure 'on' exists on type
process.on('unhandledRejection', (err: Error) => {
  console.error('🔥 CRITICAL: Unhandled Promise Rejection ->', err.message);
  // Fix: Using imported process to ensure 'exit' exists on type
  process.exit(1);
});

bootstrap();