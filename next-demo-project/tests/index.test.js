import Dashboard from "@/app/dashboard/page";
import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react";

describe("Dashboard",()=>{
    it("render dashboard page",()=>{
        render(<Dashboard/>)
        expect(screen.getByTestId("data")).toBeInTheDocument();
    })
})