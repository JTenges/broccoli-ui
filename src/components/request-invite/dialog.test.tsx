import { RequestInviteDialogTrigger } from "@/components/request-invite/dialog";
import { testWrapper } from "@/lib/test-utils";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

describe("Request Invite Dialog Trigger", () => {
  test("opens dialog when clicked", async () => {
    render(<RequestInviteDialogTrigger />, {wrapper: testWrapper});

    fireEvent.click(screen.getByText("Request an invite"));

    await screen.findAllByLabelText("Full Name");

    expect(screen.getByLabelText("Full Name")).toBeVisible();
    expect(screen.getByLabelText("Email")).toBeVisible();
    expect(screen.getByLabelText("Confirm Email")).toBeVisible();
  });
});
