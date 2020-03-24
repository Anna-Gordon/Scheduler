import React from "react";

import { render, cleanup , getByText, prettyDOM, queryByText} from "@testing-library/react";
import { waitForElement } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import { getAllByTestId, getByAltText, getByPlaceholderText } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {

  // it("defaults to Monday and changes the schedule when a new day is selected", () => {
  //   const { getByText } = render(<Application />)
  //   return waitForElement(() => getByText("Monday"))
  //     .then(() => {
  //       fireEvent.click(getByText("Tuesday"));
  //       expect(getByText("Leopold Silvers")).toBeInTheDocument();
  //     })      
  // })

  //---------ES2017------------
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />)
    await waitForElement(() => getByText("Monday"));
        fireEvent.click(getByText("Tuesday"));
        expect(getByText("Leopold Silvers")).toBeInTheDocument();     
  })

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"))
    const appointments = getAllByTestId(container, 'appointment');
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    const days = getAllByTestId(container, "day");
    const day = days.find(elem => queryByText(elem, "Monday"));

    console.log("CONTAINER", prettyDOM(day))
    setTimeout(async () => {
      await waitForElement(() => getByText(day, "no spots remaining"));
      expect(getByText(day, "no spots remaining")).toBeInTheDocument();
    }, 1000);
  });

  // it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
  //   // 1. Render the Application.
  //   const { container } = render(<Application />);
  
  //   // 2. Wait until the text "Archie Cohen" is displayed.
  //   await waitForElement(() => getByText(container, "Archie Cohen"));
  
  //   // 3. Click the "Add" button on the first empty appointment.
  //   // 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
  //   // 5. Click the first interviewer in the list.
  //   // 6. Click the "Save" button on that same appointment.
  //   // 7. Check that the element with the text "Saving" is displayed.
  //   // 8. Wait until the element with the text "Lydia Miller-Jones" is displayed.
  //   // 9. Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
  // });

})

      // console.log(debug(day))
      // expect(getByText("Monday")).toBeInTheDocument();