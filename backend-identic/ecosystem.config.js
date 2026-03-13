module.exports = {
  apps: [
    {
      name: "backend-identic",
      script: "./dist/server.js",
      instances: 1,
      cwd: "C:/Users/ITDev/Documents/project_home/workspace/Backend IDentic",
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      error_file: "logs/pm2-errors.log",
      out_file: "logs/pm2-output.log",
      log_date_format: "YYYY-MM-DD HH:mm Z",
    },
  ],
};
