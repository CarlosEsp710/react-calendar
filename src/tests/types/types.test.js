import { types } from "../../types/types";

describe("test types", () => {
  test("should be equal to types object", () => {
    expect(types).toEqual({
      // AUTH
      authLogin: "[AUTH] Login",
      authRegister: "[AUTH] Register",
      authLogout: "[AUTH] Logout",
      authCheckToken: "[AUTH] Check Token",
      // CALENDAR
      calendarGetEvents: "[CALENDAR] Get Events",
      calendarAddEvent: "[CALENDAR] Add Event",
      calendarUpdateEvent: "[CALENDAR] Update Event",
      calendarDeleteEvent: "[CALENDAR] Delete Event",
      calendarSetActiveEvent: "[CALENDAR] Set Active Event",
      calendarClearActiveEvent: "[CALENDAR] Clear Active Event",
      calendarClear: "[CALENDAR] Clear",
      // UI
      uiOpenModal: "[UI] Open Modal",
      uiCloseModal: "[UI] Close Modal",
    });
  });
});
