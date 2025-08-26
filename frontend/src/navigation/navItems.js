
import { RiPieChart2Fill } from "react-icons/ri";
import { MdOutlineDateRange } from "react-icons/md";
import {  FiSettings } from 'react-icons/fi';
import { MdOutlineTask } from "react-icons/md";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { PiChartLine } from "react-icons/pi";
import { LuMessageSquareMore } from "react-icons/lu";
import { HiOutlineLogout } from "react-icons/hi";

export const navItems = [
  { to: '/', label: 'Dashboard', icon: RiPieChart2Fill  },
  { to: '/tasks', label: 'Task', icon:  MdOutlineTask},
  { to: '/calendar', label: 'Calendar', icon: MdOutlineDateRange},
  { to: '/reminder', label: 'Reminder', icon: MdOutlineNotificationsActive },
  { to: '/progress', label: 'Progress', icon: PiChartLine},
  { to: '/messages', label: 'Messages', icon:LuMessageSquareMore },
  { to: '/settings', label: 'Settings', icon: FiSettings },
  { to: 'logout', label: 'Signout', icon:  HiOutlineLogout  },
];
