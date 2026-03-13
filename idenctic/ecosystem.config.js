module.exports = {
  apps: [
    {
      name: "frontend-identic",

      script: "./node_modules/next/dist/bin/next",

      cwd: "C:/Users/ITDev/Documents/project_home/workspace/IDentic", //path folder project di jenkins

      instances: 1,
      exec_mode: "fork",

      autorestart: true,
      watch: false,

      max_memory_restart: "1G",

      env: {
        NODE_ENV: "production",
        PORT: 3030,
      },

      error_file: "logs/pm2-error.log",
      out_file: "logs/pm2-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
    },
  ],
};
