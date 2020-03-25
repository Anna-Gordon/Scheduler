import React from "react";
import axios from "axios";

import { render, cleanup , getByText, prettyDOM, queryByText, getAllByAltText} from "@testing-library/react";
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
  xit("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />)
    await waitForElement(() => getByText("Monday"));
        fireEvent.click(getByText("Tuesday"));
        expect(getByText("Leopold Silvers")).toBeInTheDocument();     
  })

  xit("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
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

    setTimeout(async () => {
      await waitForElement(() => getByText(day, "no spots remaining"));
      expect(getByText(day, "no spots remaining")).toBeInTheDocument();
    }, 1000);

    debug();
  });
  
  xit("loads data, cancels an interview and increases the spots remaining for Monday by 1" , async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
    
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"));

    fireEvent.click(getByAltText(appointment, "Delete"));
    expect(getByText(appointment, "Are you sure you would like to delete the appointment?")).toBeInTheDocument();

    fireEvent.click(getByText(appointment, "Confirm"));
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    await waitForElement(() => getByAltText(appointment, "Add"))
    const days = getAllByTestId(container, "day");
    const day = days.find(elem => queryByText(elem, "Monday"));
    
    setTimeout(async () => {
      await waitForElement(() => getByText(day, "no spots remaining"));
      expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
    }, 1000);  
    
    debug();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"));

    fireEvent.click(getByAltText(appointment, "Edit"));
    // await waitForElement(() => getByText(appointment, "Archie Cohen"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: {value: "James Cohen"}
    });
    fireEvent.click(getByAltText(appointment,"Sylvia Palmer" ));
    
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    
    await waitForElement(() => getByText(appointment, "James Cohen"));
    expect(queryByText(appointment, "James Cohen")).toBeInTheDocument();

    debug();
  })
  
  xit("shows the save error when failing to save an appointment", () => {
    axios.put.mockRejectedValueOnce();
  });
  
  
})

// console.log("CONTAINER", prettyDOM(appointment))
      // console.log(debug(day))
      // expect(getByText("Monday")).toBeInTheDocument();