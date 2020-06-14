import { render } from "@testing-library/react";
import React from "react";
import App from "../App";

test("renders CTA", () => {
  const { getByText } = render(<App />);
  const CTA = getByText("Att göra");
  expect(CTA).toBeInTheDocument();
});
