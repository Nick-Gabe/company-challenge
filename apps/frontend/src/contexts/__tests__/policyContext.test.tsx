import { render, screen, act } from "@testing-library/react";
import { PolicyContext, PolicyContextProvider } from "contexts";
import { describe, beforeEach, test, expect } from "vitest";

import { mockedPolicy } from "./mocks";

describe("Policy context", () => {
  beforeEach(() => {
    render(
      <PolicyContextProvider>
        <PolicyContext.Consumer>
          {({
            setPolicyId,
            updateNodeData,
            nodes,
            title,
            updateTitle,
            resetPolicyBoard,
            loadPolicy,
            policyId,
          }) => (
            <>
              <button data-testid="setPolicy" onClick={() => setPolicyId(1)} />
              <button
                data-testid="updateNode"
                data-isconnectable={nodes[0]?.data.isConnectable}
                onClick={() =>
                  updateNodeData(nodes[0].id, { isConnectable: false })
                }
              />
              <button
                data-testid="title"
                onClick={() => updateTitle("New title")}
              >
                {title}
              </button>
              <button data-testid="reset" onClick={resetPolicyBoard} />
              <button
                data-testid="load"
                data-policyid={policyId}
                onClick={() => loadPolicy(mockedPolicy)}
              />
            </>
          )}
        </PolicyContext.Consumer>
      </PolicyContextProvider>,
    );
  });

  test("should save policy id on localStorage", () => {
    const policyButton = screen.getByTestId("setPolicy");
    expect(localStorage.policyId).toBeUndefined();
    act(() => policyButton.click());
    expect(localStorage.policyId).toBe("1");
  });

  test("should be able to update node data", () => {
    const nodeButton = screen.getByTestId("updateNode");
    expect(nodeButton.dataset.isconnectable).toBe("true");
    act(() => nodeButton.click());
    expect(nodeButton.dataset.isconnectable).toBe("false");
  });

  test("should change title", () => {
    const titleButton = screen.getByTestId("title");
    expect(titleButton.textContent).toBe("Untitled");
    act(() => titleButton.click());
    expect(titleButton.textContent).toBe("New title");
  });

  test("should reset board", () => {
    const titleButton = screen.getByTestId("title");
    const nodeButton = screen.getByTestId("updateNode");
    const resetButton = screen.getByTestId("reset");

    expect(titleButton.textContent).toBe("Untitled");
    expect(nodeButton.dataset.isconnectable).toBe("true");

    act(() => {
      titleButton.click();
      nodeButton.click();
    });

    expect(titleButton.textContent).toBe("New title");
    expect(nodeButton.dataset.isconnectable).toBe("false");

    act(() => resetButton.click());

    expect(titleButton.textContent).toBe("Untitled");
    expect(nodeButton.dataset.isconnectable).toBe("true");
  });

  test("should load board", () => {
    const titleButton = screen.getByTestId("title");
    const loadButton = screen.getByTestId("load");

    expect(titleButton.textContent).toBe("Untitled");
    expect(loadButton.dataset.policyid).toBeUndefined();

    act(() => loadButton.click());

    expect(titleButton.textContent).toBe("New policy");
    expect(loadButton.dataset.policyid).toBe("123");
  });
});
