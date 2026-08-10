import test from "node:test";
import assert from "node:assert";

test("API deve retornar status OK", async () => {
  const response = await fetch("http://localhost:3000/status");

  assert.strictEqual(response.status, 200);

  const data = await response.json();

  assert.strictEqual(data.status, "ok");
  assert.strictEqual(data.service, "lacrei-devops-api");
});
