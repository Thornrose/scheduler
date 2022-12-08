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
  waitForElement,
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
    const { container } = render(<Application />);
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
    
  });

  it("loads data, cancels an interview and increases the spots remaining for the first day by 1", async () => {
    //  1. Render the application (done)
    const { container } = render(<Application />);
    //  2. Wait until the text "Archie Cohen" is displayed (done)
    await waitForElement(() => getByText(container, "Archie Cohen"));
    //  2.5? expect that the DayListItem with the text "Monday" also has the text "1 spot remaining" (stretch)
    //  3. click delete button
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    
    fireEvent.click(getByAltText(appointment, "Delete"));
    //  4. expect confirm message is shown
    expect(queryByText(appointment, /are you sure/i)).toBeInTheDocument;
    //  5. click confirm
    fireEvent.click(getByText(appointment, "Confirm"));
    //  6. expect element to contain deleting
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    //  7. wait for element to have add button displayed
    await waitForElement(() => getByAltText(appointment, "Add"));
    //  8. expect that the dayListItem with the text "Monday" also has the text "2 spots remaining"
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();

  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
      // 1. render the Application
      const { container } = render(<Application />);
      // 2. wait until "archie cohen" is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));
      // 3. click edit Button, submit form with new values
      const appointment = getAllByTestId(container, "appointment").find(
        appointment => queryByText(appointment, "Archie Cohen")
      );
      
      fireEvent.click(getByAltText(appointment, "Edit"));

      fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
        target: { value: "Lydia Miller-Jones" }
      });
    
      fireEvent.click(getByText(appointment, "Save"));
      // 4. expect "saving" is shown
      expect(getByText(appointment, "Saving")).toBeInTheDocument();
      // 5. wait for element to be shown with new student name
      await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
      // 6. expect dayListItem with the text "Monday" also has the text "1 spot remaining"
      const day = getAllByTestId(container, "day").find(day =>
        queryByText(day, "Monday")
      );
  
      expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
                                                          
  });

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce(new Error("Error"));

    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const firstEmpty = getAllByAltText(container, "Add")[0];
    fireEvent.click(firstEmpty);
    

    const input = getByPlaceholderText(container, "Enter Student Name");
    const interviewer = getByAltText(container, "Sylvia Palmer");
    fireEvent.change(input, { target: { value: "Lydia Miller-Jones" } });
    fireEvent.click(interviewer);
    fireEvent.click(getByText(container, "Save"));
    
    expect(getByText(container, "Saving")).toBeInTheDocument();
    await waitForElement(() => getByText(container, "Something went wrong!"));
    expect(getByText(container, "Error")).toBeInTheDocument;
  });

  it("shows the delete error when failing to delete an appointment", async () => {
    axios.delete.mockRejectedValueOnce(new Error("Error"));

    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    
    fireEvent.click(getByAltText(appointment, "Delete"));

    expect(queryByText(appointment, /are you sure/i)).toBeInTheDocument;

    fireEvent.click(getByText(appointment, "Confirm"));

    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    

    await waitForElement(() => getByText(container, "Something went wrong!"));
    expect(getByText(container, "Error")).toBeInTheDocument;
  });

});