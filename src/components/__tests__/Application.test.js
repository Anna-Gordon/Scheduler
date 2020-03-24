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
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

})

      // console.log(debug(day))
      // expect(getByText("Monday")).toBeInTheDocument();