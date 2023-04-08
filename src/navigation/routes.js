const Routes = {
  OUTSIDE_STACK: "Outside Stack",
  ...{
    //Outside screens
    ONBOARDING_SCREEN: "Onboarding Screen",
    ONBOARDING_SCREEN1: "Onboarding Screen1",
    ONBOARDING_SCREEN2: "Onboarding Screen2",
    ONBOARDING_SCREEN3: "Onboarding Screen3",
    ONBOARDING_SCREEN4: "Onboarding Screen4",
    ONBOARDING_SCREEN5: "Onboarding Screen5",
  },
  MAIN_STACK: "Dashboard Stack",
  ...{
    BOTTOM_TAB_STACK: "Bottom Tab Stack",
    ...{
      ...{
        DASHBOARD_STACK: "Dashboard Stack",
        ...{
          DASHBOARD_SCREEN: "Dashboard Screen",
          CARD_DETAILS_SCREEN: "Card Details Screen",
        },
      },
      ACCOUNT_STACK: "ACCOUNT Stack",
      ...{
        SETTING_SCREEN: "Account Screen",
      },
      EXPLORE_STACK: "EXPLORE Stack",
      ...{
        EXPLORE_SCREEN: "Explore Screen",
      },
      TARGET_STACK: "TARGET Stack",
      ...{
        TARGET_SCREEN: "Target Screen",
      },
    },
  },
  INSIDE_STACK: "Inside Stack",
  INSIDE_MODAL_STACK: "Inside Modal Stack",
  BACKDROP: "BACKDROP",
  COURSE_LIST_SCREEN: "Course List Screen",
  COURSE_BY_TOPIC_SCREEN: "Courses By Topic Screen",
  LIST_VIEW_SCREEN: "List View Screen",
};

export default Routes;
