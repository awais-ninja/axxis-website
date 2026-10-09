import { cn } from "./utils";

describe("cn", () => {
  test("joins class names and lets the later spacing utility win", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
    expect(cn("block", false && "hidden", "text-base")).toBe("block text-base");
    expect(cn("text-sm", "text-base")).toBe("text-base");
  });
});
