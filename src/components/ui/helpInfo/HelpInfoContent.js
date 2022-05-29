import { AuthHelp } from "./content/AuthHelp";
import {
  UserCalendarEditHelp,
  UserCalendarHelp,
  UserInvitationsHelp,
  UserProfileHelp,
  UserTeamsHelp,
} from "./content/UserHelp";
import {
  TeamCalendarEditHelp,
  TeamCalendarEditPreferenceHelp,
  TeamCalendarHelp,
  TeamProfileHelp,
} from "./content/TeamHelp";
import { GameHelp } from "./content/GameHelp";

export function getHelperInfo(pathname) {
  // order of statements matters
  if (pathname.includes("/login") || pathname.includes("/register")) {
    return AuthHelp;
  }
  if (pathname.includes("/user/calendar/edit")) {
    return UserCalendarEditHelp;
  }
  if (pathname.includes("/user/calendar")) {
    return UserCalendarHelp;
  }
  if (pathname.includes("/user/profile/invitations")) {
    return UserInvitationsHelp;
  }
  if (pathname.includes("/user/profile")) {
    return UserProfileHelp;
  }
  if (pathname.includes("/user/teams") || pathname.includes("/user/create")) {
    return UserTeamsHelp;
  }
  if (pathname.includes("/team/calendar/edit/preference")) {
    return TeamCalendarEditPreferenceHelp;
  }
  if (pathname.includes("/team/calendar/edit")) {
    return TeamCalendarEditHelp;
  }
  if (pathname.includes("/team/calendar")) {
    return TeamCalendarHelp;
  }
  if (pathname.includes("/team/profile")) {
    return TeamProfileHelp;
  }
  if (pathname.includes("/game")) {
    return GameHelp;
  }
  return " ";
}