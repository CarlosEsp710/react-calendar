import { fetchWithoutToken, fetchWithToken } from "../../helpers/fetch";

describe("test fetch helper", () => {
  let token = "";

  test("should work fetchWithoutToken", async () => {
    const res = await fetchWithoutToken("auth/login", "POST", {
      email: "carlos@gmail.com",
      password: "123456",
    });

    const data = await res.json();
    token = data.token;

    expect(res instanceof Response).toBe(true);
    expect(data.ok).toBe(true);
  });

  test("should work fetchWithToken", async () => {
    localStorage.setItem("token", token);

    const res = await fetchWithToken("auth/renew-token", "GET");
    const data = await res.json();

    expect(res instanceof Response).toBe(true);
    expect(data.ok).toBe(true);
  });
});
