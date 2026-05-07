import { getAeronaves, autenticar } from "@/lib/mock-api";

describe("Mock API", () => {
  it("fetches initial mock aeronaves", async () => {
    const aeronaves = await getAeronaves();
    expect(aeronaves.length).toBeGreaterThan(0);
    expect(aeronaves[0].codigo).toBe("SF-001");
  });

  it("authenticates a valid user", async () => {
    const user = await autenticar("admin", "admin123");
    expect(user).not.toBeNull();
    expect(user?.nome).toBe("Carlos Admin");
    expect(user?.nivelPermissao).toBe("ADMINISTRADOR");
  });

  it("fails authentication for invalid password", async () => {
    const user = await autenticar("admin", "wrong");
    expect(user).toBeNull();
  });
});
