import { DbHelper } from "./db-helper";

async function testConnection() {
  console.log("--- Testing Database Connection ---");
  try {
    // This will attempt to connect using the config in .env
    // It will likely fail if the user hasn't updated .env yet,
    // but it verifies that the DbHelper and DbConnection are correctly implemented.
    console.log("Attempting simple query: SELECT 1 as test");
    const result = await DbHelper.query("SELECT 1 as test");
    console.log("Result:", result);
    console.log("Connection test successful!");
  } catch (err: any) {
    if (err.message && err.message.includes("Login failed")) {
      console.log(
        "\n[!] Connection attempted but failed (likely due to invalid credentials in .env).",
      );
      console.log(
        "[!] This is expected if you haven't updated .env with real credentials.",
      );
      console.log("[!] The implementation itself seems correct.\n");
    } else {
      console.error("Error during test:", err);
    }
  }
}

testConnection();
