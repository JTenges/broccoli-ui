import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import {
  describe,
  test,
  expect,
  beforeAll,
  afterAll,
  afterEach,
  vi,
} from "vitest";
import { EnterDetailsForm } from "@/components/request-invite/stage/enter-details";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { testWrapper } from "@/lib/test-utils";

vi.mock("@/lib/env", () => ({
  env: {
    apiBaseUrl: "http://api-server.com",
  },
}));

const server = setupServer(
  http.post("http://api-server.com/fake-auth", async ({ request }) => {
    const requestBody = (await request.json()) as { email: string };

    if (requestBody && requestBody["email"] === "error@example.com") {
      return HttpResponse.json(
        {
          errorMessage: "This email is already registered",
        },
        { status: 400 },
      );
    }

    if (requestBody && requestBody["email"] === "unexpected-json@error.com") {
      return HttpResponse.json({}, { status: 500 });
    }

    if (requestBody && requestBody["email"] === "unexpected-string@error.com") {
      return HttpResponse.text("Error", { status: 500 });
    }

    return HttpResponse.text("Success");
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("EnterDetailsForm", () => {
  test("validates form fields on client side", async () => {
    const onCompletedMock = vi.fn();
    render(<EnterDetailsForm onCompleted={onCompletedMock} />, {
      wrapper: testWrapper,
    });

    // Submit empty form - should trigger validation errors
    fireEvent.click(screen.getByText("Submit"));

    // Check for validation errors
    await waitFor(() => {
      expect(
        screen.getByText("Must be at least 3 characters"),
      ).toBeInTheDocument();
      expect(screen.getByText("Email cannot be empty")).toBeInTheDocument();
      expect(
        screen.getByText("Confirmation email cannot be empty"),
      ).toBeInTheDocument();
    });

    // Fill form with invalid data
    fireEvent.change(screen.getByLabelText(/Full name/i), {
      target: { value: "Jo" },
    });
    fireEvent.change(screen.getByLabelText(/^Email$/i), {
      target: { value: "not-an-email" },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Email/i), {
      target: { value: "different-email@example.com" },
    });

    fireEvent.click(screen.getByText("Submit"));

    // Check for different validation errors
    await waitFor(() => {
      expect(
        screen.getByText("Must be at least 3 characters"),
      ).toBeInTheDocument();
      expect(screen.getByText("Invalid email address")).toBeInTheDocument();
      expect(screen.getByText("Emails do not match")).toBeInTheDocument();
    });

    expect(onCompletedMock).not.toHaveBeenCalled();
  });

  test("submits valid data to API and calls onCompleted on success", async () => {
    const onCompletedMock = vi.fn();
    render(<EnterDetailsForm onCompleted={onCompletedMock} />, {
      wrapper: testWrapper,
    });

    // Fill form with valid data
    fireEvent.change(screen.getByLabelText(/Full name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/^Email$/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Email/i), {
      target: { value: "john@example.com" },
    });

    fireEvent.click(screen.getByText("Submit"));

    // Check that onCompleted is called after successful submission
    await waitFor(() => {
      expect(onCompletedMock).toHaveBeenCalledTimes(1);
    }, {});
  });

  test("displays API error message if api returns an expected error", async () => {
    const onCompletedMock = vi.fn();
    render(<EnterDetailsForm onCompleted={onCompletedMock} />, {
      wrapper: testWrapper,
    });

    // Fill form with data that will trigger API error
    fireEvent.change(screen.getByLabelText(/Full name/i), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(screen.getByLabelText(/^Email$/i), {
      target: { value: "error@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Email/i), {
      target: { value: "error@example.com" },
    });

    fireEvent.click(screen.getByText("Submit"));

    // Check that error message is displayed
    await waitFor(() => {
      expect(
        screen.getByText("This email is already registered"),
      ).toBeInTheDocument();
    });

    expect(onCompletedMock).not.toHaveBeenCalled();
  });

  test("displays default error message when api returns an unexpected error json format", async () => {
    const onCompletedMock = vi.fn();
    render(<EnterDetailsForm onCompleted={onCompletedMock} />, {
      wrapper: testWrapper,
    });

    // Fill form with data that will trigger API error
    fireEvent.change(screen.getByLabelText(/Full name/i), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(screen.getByLabelText(/^Email$/i), {
      target: { value: "unexpected-json@error.com" },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Email/i), {
      target: { value: "unexpected-json@error.com" },
    });

    fireEvent.click(screen.getByText("Submit"));

    // Check that error message is displayed
    await waitFor(() => {
      expect(
        screen.getByText("An unexpected error occurred please try again later"),
      ).toBeInTheDocument();
    });

    expect(onCompletedMock).not.toHaveBeenCalled();
  });

  test("displays default error message when api returns an unexpected error format", async () => {
    const onCompletedMock = vi.fn();
    render(<EnterDetailsForm onCompleted={onCompletedMock} />, {
      wrapper: testWrapper,
    });

    // Fill form with data that will trigger API error
    fireEvent.change(screen.getByLabelText(/Full name/i), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(screen.getByLabelText(/^Email$/i), {
      target: { value: "unexpected-string@error.com" },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Email/i), {
      target: { value: "unexpected-string@error.com" },
    });

    fireEvent.click(screen.getByText("Submit"));

    // Check that error message is displayed
    await waitFor(() => {
      expect(
        screen.getByText("An unexpected error occurred please try again later"),
      ).toBeInTheDocument();
    });

    expect(onCompletedMock).not.toHaveBeenCalled();
  });
});
