import React from "react";
import {create} from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component",() => {
	test("status from props should be in the state",() => {
		const component = create(<ProfileStatus status="it is cool"/>);
		const instance = component.getInstance();
		expect(instance.state.status).toBe("it is cool");
	});

	test("after creation span should be displayed",() => {
		const component = create(<ProfileStatus status="it is cool"/>);
		const root = component.root;
		const span = root.findByType("span");
		expect(span).not.toBeNull();
	});

	test("after creation input not should be displayed",() => {
		const component = create(<ProfileStatus status="it is cool"/>);
		const root = component.root;
		expect(()=>{
			const input = root.findByType("input");
		}).toThrow();
	});

	test("span text should be correct",() => {
		const component = create(<ProfileStatus status="it is cool"/>);
		const root = component.root;
		const span = root.findByType("span");
		expect(span.children[0]).toBe("it is cool");
	});

	test("input should be displayed",() => {
		const component = create(<ProfileStatus status="it is cool"/>);
		const root = component.root;
		const span = root.findByType("span");
		span.props.onDoubleClick();
		const input = root.findByType("input");
		expect(input.props.value).toBe("it is cool");
	});

	test("callback should be called",() => {
		const mockCallback = jest.fn();
		const component = create(<ProfileStatus status="it is cool" updateStatus={mockCallback}/>);
		const instance = component.getInstance();
		instance.deactivateEditMode()
		expect(mockCallback.mock.calls.length).toBe(1);
	});
})