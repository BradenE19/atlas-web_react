import { getFullYear, getFooterCopy, getLatestNotification } from "./utils";

describe("utils_tests", function () {
  describe("getFullYear", function () {
    it("return current year", function () {
      const year = getFullYear();
      expect(year).toEqual(new Date().getFullYear());
    });
  });
  describe("getFooterCopy", function () {
    const trueMsg = "Holberton School";
    const falseMsg = "Holberton School main dashboard";

    it("return true message", function () {
      const msg = getFooterCopy(true);
      expect(msg).toEqual(trueMsg);
    });
    it("return false message", function () {
      const msg = getFooterCopy(false);
      expect(msg).toEqual(falseMsg);
    });
  });
  describe("getLatestNotification", function () {
    it("return correct string element", function () {
      const element = "<strong>Urgent requirement</strong> - complete by EOD";
      expect(getLatestNotification()).toEqual(element);
    });
  });
});