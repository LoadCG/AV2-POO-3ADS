import { render, screen, act } from "@testing-library/react";
import { AuthProvider, useAuth } from "@/lib/auth-context";
import { useEffect } from "react";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({ replace: jest.fn() }),
  usePathname: () => "/",
}));

function TestComponent() {
  const { usuario, loading, temPermissao } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!usuario) return <div>Not logged in</div>;
  
  return (
    <div>
      <span data-testid="user-name">{usuario.nome}</span>
      <span data-testid="is-admin">{temPermissao("ADMINISTRADOR") ? "Yes" : "No"}</span>
    </div>
  );
}

describe("AuthContext", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("loads without user initially", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    expect(screen.getByText("Not logged in")).toBeInTheDocument();
  });

  it("restores user from sessionStorage", () => {
    sessionStorage.setItem(
      "skyforge_session",
      JSON.stringify({
        id: "001",
        nome: "Admin Test",
        telefone: "",
        endereco: "",
        usuario: "admin",
        nivelPermissao: "ADMINISTRADOR",
      })
    );

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId("user-name")).toHaveTextContent("Admin Test");
    expect(screen.getByTestId("is-admin")).toHaveTextContent("Yes");
  });
});
