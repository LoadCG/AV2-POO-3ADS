import { render, screen, act } from "@testing-library/react";
import StatusBadge from "@/components/ui/StatusBadge";
import type { StatusPeca } from "@/lib/types";

describe("StatusBadge", () => {
  it("renders PRONTA status correctly", () => {
    render(<StatusBadge status={"PRONTA" as StatusPeca} />);
    const badge = screen.getByText("Pronta");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-emerald-500/15");
  });

  it("renders EM_PRODUCAO status correctly", () => {
    render(<StatusBadge status={"EM_PRODUCAO" as StatusPeca} />);
    const badge = screen.getByText("Em Produção");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-amber-500/15");
  });

  it("renders fallback for unknown status", () => {
    render(<StatusBadge status={"DESCONHECIDO" as any} />);
    const badge = screen.getByText("DESCONHECIDO");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-slate-500/15");
  });
});
