
import app from './app.ts';
import pool from './config/database.ts';
import { ENV } from './config/env.ts';
import process from 'process';

async function bootstrap() {
  try {
    // Validate Database Connection
    const connection = await pool.getConnection();
    console.log('✅ Database Connection Verified.');
    connection.release();

    app.listen(ENV.PORT, () => {
      console.log(`🚀 SMS Backend listening on port ${ENV.PORT}`);
      console.log(`📡 API URL: http://localhost:${ENV.PORT}/api`);
    });
  } catch (error) {
    console.error('❌ Bootstrap Failure:', error);
    process.exit(1);
  }
}

process.on('unhandledRejection', (err: Error) => {
  console.error('🔥 Unhandled Rejection:', err.message);
  process.exit(1);
});

bootstrap();
