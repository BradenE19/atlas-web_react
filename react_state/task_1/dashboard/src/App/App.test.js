import React from "react";
import { shallow, mount } from "enzyme";
import App from "./App";
import Notification from "../Notifications/Notifications";
import Header from "../Header/Header";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";
import CourseList from "../CourseList/CourseList";
import { StyleSheetTestUtils } from 'aphrodite';


StyleSheetTestUtils.suppressStyleInjection();

describe("<App />", () => {
  it("renders an app component without crashing", () => {
	const wrapper = shallow(<App />);
	expect(wrapper.exists()).toBe(true);
  });

  it("checks for a Notifications component", () => {
	const wrapper = shallow(<App />);
	expect(wrapper.find(Notification)).toHaveLength(1);
  });

  it("checks for a Header component", () => {
	const wrapper = shallow(<App />);
	expect(wrapper.find(Header)).toHaveLength(1);
  });

  it("checks for a Login component", () => {
	const wrapper = shallow(<App />);
	expect(wrapper.find(Login)).toHaveLength(1);
  });

  it("checks for a Footer component", () => {
	const wrapper = shallow(<App />);
	expect(wrapper.find(Footer)).toHaveLength(1);
  });

  it("checks that CourseList component is not displayed", () => {
	const wrapper = shallow(<App />);
	expect(wrapper.find(CourseList)).toHaveLength(0);
  });

  it("checks component behavior when isLoggedIn is true", () => {
	const wrapper = shallow(<App isLoggedIn={true} />);
	expect(wrapper.find(Login)).toHaveLength(0);
	expect(wrapper.find(CourseList)).toHaveLength(1);
  });

  it("checks behavior of logOut", () => {
	const map = {};
	window.addEventListener = jest.fn().mockImplementation((event, cb) => {
	  map[event] = cb;
	});
	window.alert = jest.fn();
	const testProps = {
	  logOut: jest.fn()
	}
	const wrapper = mount(<App isLoggedIn={true} {...testProps}/>);
	map.keydown({key: "h", ctrlKey: true});
	expect(window.alert).toHaveBeenCalledWith("Logging you out");
	expect(testProps.logOut).toHaveBeenCalled();
	window.alert.mockRestore();
  });

  it("verify default state for displayDrawer === false", () => {
   const wrapper = shallow(<App />);
   expect(wrapper.state().displayDrawer).toBe(false);
 });

 it("verify that after calling handleDisplayDrawer, the state === true", () => {
   const wrapper = shallow(<App />);
   wrapper.instance().handleDisplayDrawer();
   expect(wrapper.state().displayDrawer).toBe(true);
 });

 it("verify that after calling handleHideDrawer, the state === false", () => {
   const wrapper = shallow(<App />);
   wrapper.setState({ displayDrawer: true });
   wrapper.instance().handleHideDrawer();
   expect(wrapper.state().displayDrawer).toBe(false);
 });
});