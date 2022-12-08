import React from "react";
import axios from "axios";

import { 
  cleanup, 
  render,
  prettyDOM,
  fireEvent,
  getAllByAltText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  getByText,
  queryByText,
  waitForElement
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);
describe("Application", () => {

  xit("renders without crashing", () => {
    render(<Application />);
  });
  
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
    
    await waitForElement(() => getByText("Monday"));
  
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
    
    
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const firstEmpty = getAllByAltText(container, "Add")[0];
    fireEvent.click(firstEmpty);
    
    // await waitForElement(() => getByPlaceholderText(container, "Enter Student Name")); // thought I needed this at first, turns out no

    const input = getByPlaceholderText(container, "Enter Student Name");
    const interviewer = getByAltText(container, "Sylvia Palmer");
    fireEvent.change(input, { target: { value: "Lydia Miller-Jones" } });
    fireEvent.click(interviewer);
    fireEvent.click(getByText(container, "Save"));
    
    expect(getByText(container, "Saving")).toBeInTheDocument();
    await waitForElement(() => getByText(container, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
    
  })

});