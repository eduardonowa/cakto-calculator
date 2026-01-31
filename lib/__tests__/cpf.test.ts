/// <reference types="jest" />
import { stripCpf, maskCpf, validateCpf } from "../cpf";

describe("stripCpf", () => {
  it("removes dots and dash", () => {
    expect(stripCpf("123.456.789-01")).toBe("12345678901");
  });
  it("returns digits only", () => {
    expect(stripCpf("12345678901")).toBe("12345678901");
  });
});

describe("maskCpf", () => {
  it("formats as 000.000.000-00", () => {
    expect(maskCpf("12345678901")).toBe("123.456.789-01");
  });
  it("limits to 11 digits", () => {
    expect(maskCpf("12345678901234")).toBe("123.456.789-01");
  });
});

describe("validateCpf", () => {
  it("rejects wrong length", () => {
    expect(validateCpf("1234567890")).toBe(false);
    expect(validateCpf("123.456.789-0")).toBe(false);
  });
  it("rejects repeated digits", () => {
    expect(validateCpf("111.111.111-11")).toBe(false);
  });
  it("accepts valid CPF (111.444.777-35 per geradorcpf.com)", () => {
    expect(validateCpf("111.444.777-35")).toBe(true);
    expect(validateCpf("11144477735")).toBe(true);
  });
  it("rejects invalid check digits", () => {
    expect(validateCpf("111.444.777-00")).toBe(false);
  });
});
