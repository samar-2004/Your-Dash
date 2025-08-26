import { useState, useEffect } from "react";
import TaskList from "../components/TaskList.jsx";
import Analytics from "../components/Analytics.jsx";
import { FaEye, FaPlus } from "react-icons/fa";
import MetricCard from "../components/MetricCard.jsx";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { TbProgressCheck } from "react-icons/tb";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { LuCopyPlus } from "react-icons/lu";

export default function Overview() {
  // State for API data - replace with actual API calls
  const [metrics, setMetrics] = useState({
    completedTasks: 12,
    inProgressTasks: 6,
    closedTasks: 18,
    newTasks: 6,
  });

  const now = new Date();
  const [active, setActive] = useState(now.getDate());
  const year = now.getFullYear();
  const month = now.getMonth();
  const start = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < start; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "PSD to HTML",
      assignedBy: "Rohim Chand",
      status: "In progress",
      progress: 60,
      date: "19-sep-24",
      statusColor: "bg-yellow-500",
    },
    {
      id: 2,
      name: "Stock Marketing",
      assignedBy: "Chandraskar/JS",
      status: "Complete",
      progress: 100,
      date: "19-sep-24",
      statusColor: "bg-green-500",
    },
    {
      id: 3,
      name: "Stock Marketing",
      assignedBy: "Chandraskar/JS",
      status: "Closed",
      progress: 100,
      date: "19-sep-24",
      statusColor: "bg-blue-500",
    },
  ]);

  const [reminders, setReminders] = useState([
    {
      id: 1,
      name: "Call with client for marketing",
      date: "19-sep-24 • 12:00PM",
      status: "Pending",
    },
    {
      id: 2,
      name: "Complete the task of UI",
      date: "19-sep-24 • 12:00PM",
      status: "Pending",
    },
    {
      id: 3,
      name: "Meetup with suraya",
      date: "19-sep-24 • 12:00PM",
      status: "Pending",
    },
    {
      id: 4,
      name: "Meetup with suraya",
      date: "19-sep-24 • 12:00PM",
      status: "Pending",
    },
  ]);

  const [meetings, setMeetings] = useState([
    {
      id: 1,
      title: "Meeting with client",
      subtitle: "Marketing",
      time: "10:30 AM",
    },
    {
      id: 2,
      title: "Meeting with client",
      subtitle: "Marketing",
      time: "10:40 AM",
    },
    {
      id: 3,
      title: "Meeting with client",
      subtitle: "Marketing",
      time: "10:50 AM",
    },
  ]);

  // TODO: Replace with actual API calls
  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        // const metricsData = await api.getMetrics();
        // const tasksData = await api.getTasks({ limit: 3 });
        // const remindersData = await api.getReminders({ limit: 4 });
        // const meetingsData = await api.getTodayMeetings();
        // setMetrics(metricsData);
        // setTasks(tasksData);
        // setReminders(remindersData);
        // setMeetings(meetingsData);
      } catch (error) {
        console.error("Error fetching overview data:", error);
      }
    };

    fetchOverviewData();
  }, []);

  return (
    <div className="flex flex-col gap-6 md:p-1">
      <h1 className="text-2xl font-semibold ml-3 md:ml-0 text-foreground">
        Overview
      </h1>

      {/* Metric Cards and Analytics - flex layout instead of grid */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Metric Cards - 2x2 layout using flex */}
        <section className="backdrop:blur-xl bg-surface md:rounded-xl w-full lg:w-1/2 shadow-md p-4 md:p-6">
          <div className="grid grid-cols-2 gap-2 md:gap-4">
            <MetricCard
              title="Completed Task"
              value={metrics.completedTasks}
              icon={IoMdCheckmarkCircleOutline}
              bgColor="bg-[#00c308]"
            />
            <MetricCard
              title="In Progress Task"
              value={metrics.inProgressTasks}
              icon={TbProgressCheck}
              bgColor="bg-[#ffbf1a]"
            />
            <MetricCard
              title="Closed Task"
              value={metrics.closedTasks}
              icon={AiOutlineEyeInvisible}
              bgColor="bg-[#0b9efa]"
            />
            <MetricCard
              title="New Task"
              value={metrics.newTasks}
              icon={LuCopyPlus}
              bgColor="bg-[#d700c1]"
            />
          </div>
        </section>

        {/* Task Analytics */}
        <div className="flex-1 backdrop:blur-xl bg-surface md:rounded-xl shadow-md p-2  md:p-1 md:pt-2 ">
          <h2 className="text-lg text-center font-semibold text-muted mb-4">
            Task Analytics
          </h2>
          <Analytics height={210} />
        </div>
      </div>

      {/* Main content area - flex instead of grid */}
      <div className="flex flex-col xl:flex-row gap-6 items-stretch">
        {/* Left Column - Task List and Reminders */}
        <div className="flex flex-col gap-6 xl:w-2/3 h-full">
          {/* Task List */}
          <div className="bg-surface md:rounded-xl shadow-md p-4 md:p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-muted">Task List</h2>
              <div className="flex items-center gap-0">
                <button className="text-sm font-medium text-primary rounded-md border text-primary border-primary hover:bg-gray-500/30 px-2 flex items-center gap-2">
                  + Task
                </button>
                <button className="text-sm font-medium text-primary hover:bg-gray-500/30 px-3 py-2 rounded-lg">
                  View All
                </button>
              </div>
            </div>

            {/* Table (Flex-based) */}
            <div className="flex flex-col gap-3">
              {/* Table Head */}
              <div className="flex text-xs md:text-md font-medium text-muted px-6">
                <div className="w-1/3 md:w-1/5">Task name</div>
                <div className="w-1/3 md:w-1/4 text-center">Assign By</div>
                <div className="w-1/3 md:w-1/4 text-center">Status</div>
                <div className="hidden md:block md:w-1/4 text-center">Date</div>
                <div className="hidden md:block md:w-[10px] text-center">
                  Action
                </div>
              </div>

              {/* Table Body */}
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center bg-surface3 rounded-lg shadow-sm px-4 md:py-5 py-3"
                >
                  {/* Task Name */}
                  <div className="w-1/3 md:w-1/5 text-xs md:text-md text-muted">
                    {task.name}
                  </div>

                  {/* Assigned By */}
                  <div className="w-1/3 md:w-1/4 text-center text-xs md:text-md text-muted">
                    {task.assignedBy}
                  </div>

                  {/* Status */}
                  <div className="w-1/3 md:w-1/4 flex flex-col items-center gap-2">
                    {/* Status Name + % */}
                    <div className="flex justify-between w-full max-w-[80px] md:max-w-[160px] ">
                      <span className="text-muted text-[8px] md:text-md">
                        {task.status}
                      </span>
                      <span className=" text-[10px] md:text-md text-muted-foreground">
                        {task.progress}%
                      </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full max-w-[80px] md:max-w-[160px] bg-muted rounded-full h-2">
                      <div
                        className={`${task.statusColor} h-2 rounded-full`}
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Date - Hidden on small screens */}
                  <div className="hidden md:block md:w-1/4 text-center text-muted-foreground">
                    {task.date}
                  </div>

                  {/* Action - Hidden on small screens */}
                  <div className="hidden md:block md:w-[10px] text-center">
                    <span className="text-muted-foreground cursor-pointer hover:text-surface text-lg">
                      •••
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Reminders */}
          <div className="bg-surface md:rounded-xl shadow-md p-4 md:p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-muted">Reminders</h2>
              <button className="text-sm font-medium text-primary rounded-md border text-primary border-primary hover:bg-gray-500/30 px-2 flex items-center gap-2">
                + Reminder
              </button>
            </div>

            {/* Table (Flex-based like Task List) */}
            <div className="flex flex-col gap-3">
              {/* Table Head */}
              <div className="flex text-xs md:text-md font-medium text-muted px-4">
                <div className="md:w-1/3 w-2/5">Name</div>
                <div className="md:w-1/3 w-1/2 text-center">Date</div>
                <div className="md:w-1/3 w-1/6 text-center">Status</div>
                <div className="hidden md:block md:w-1/12 text-center">
                  Action
                </div>
              </div>

              {/* Table Body */}
              {reminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className="flex items-center bg-surface3 rounded-lg shadow-sm px-4 py-4"
                >
                  {/* Name */}
                  <div className="md:w-1/3 w-2/5 text-xs md:text-md text-muted-foreground">
                    {reminder.name}
                  </div>

                  {/* Date */}
                  <div className="md:w-1/3 w-1/2 text-center text-xs md:text-md text-muted-foreground">
                    {reminder.date}
                  </div>

                  {/* Status */}
                  <div className="md:w-1/3 w-1/6 text-center">
                    <span className="inline-block px-3 py-1 text-xs text-yellow-400">
                      {reminder.status}
                    </span>
                  </div>

                  {/* Action - Hidden on small screens */}
                  <div className="hidden md:block md:w-1/12 text-center">
                    <span className="text-muted-foreground cursor-pointer hover:text-surface text-lg">
                      •••
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Goals, Calendar, Meetings */}
        <div className="flex flex-col gap-6 xl:w-1/3 h-full mb-17 md:mb-0">
          {/* Your Goals */}
          <div className="bg-surface md:rounded-xl shadow-md py-3 px-3 ">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-muted">Your Goals</h2>
              <button className="text-sm font-medium text-primary rounded-md border text-primary border-primary hover:bg-gray-500/30 px-2 flex items-center gap-2">
                + Goals
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between">
              {/* Circular progress rings */}
              <div className="relative w-32 h-32 mb-4 sm:mb-0">
                <svg className="w-32 h-32 -rotate-90" viewBox="0 0 36 36">
                  {/* Background ring 1 */}
                  <circle
                    cx="18"
                    cy="18"
                    r="15.9155"
                    strokeOpacity="0.3"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="1.5"
                  />
                  {/* Ring 1 */}
                  <circle
                    cx="18"
                    cy="18"
                    r="15.9155"
                    fill="none"
                    stroke="#FACC15" // yellow
                    strokeWidth="1.5"
                    strokeDasharray="24, 100"
                    strokeLinecap="round"
                  />
                  {/* Background ring 2 */}
                  <circle
                    cx="18"
                    cy="18"
                    r="12"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeOpacity="0.3"
                    strokeWidth="1.5"
                  />
                  {/* Ring 2 */}
                  <circle
                    cx="18"
                    cy="18"
                    r="12"
                    fill="none"
                    stroke="#A855F7" // purple
                    strokeWidth="1.5"
                    strokeDasharray="24, 100"
                    strokeLinecap="round"
                  />
                  {/* Background ring 3*/}
                  <circle
                    cx="18"
                    cy="18"
                    strokeOpacity="0.3"
                    r="8.5"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="1.5"
                  />
                  {/* Ring 3 */}
                  <circle
                    cx="18"
                    cy="18"
                    r="8.5"
                    fill="none"
                    stroke="#FB923C" // orange
                    strokeWidth="1.5"
                    strokeDasharray="24, 100"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* Legend */}
              <div className="w-full sm:ml-4 space-y-2">
                <div className="flex items-center justify-between w-full border-b border-muted pb-1">
                  <span className="flex items-center text-muted-foreground text-sm">
                    <span className="w-1 h-6 bg-yellow-400 mr-2 rounded"></span>
                    Option 1
                  </span>
                  <span className="text-sm font-medium text-muted-foreground">
                    24%
                  </span>
                </div>
                <div className="flex items-center justify-between w-full border-b border-muted pb-1">
                  <span className="flex items-center text-muted-foreground text-sm">
                    <span className="w-1 h-6 bg-purple-500 mr-2 rounded"></span>
                    Option 2
                  </span>
                  <span className="text-sm font-medium text-muted-foreground">
                    24%
                  </span>
                </div>
                <div className="flex items-center justify-between w-full border-b border-muted pb-1">
                  <span className="flex items-center text-muted-foreground text-sm">
                    <span className="w-1 h-6 bg-orange-400 mr-2 rounded"></span>
                    Option 3
                  </span>
                  <span className="text-sm font-medium text-muted-foreground">
                    24%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Calendar + Meetings Container */}
          <div
            className="bg-surface md:rounded-xl shadow-md p-3 md:p-6 
  md:grid md:grid-cols-2 md:gap-6 lg:block"
          >
            {/* Calendar */}
            <div className="bg-surface2 rounded-xl shadow-md p-3 md:p-4">
              <div>
                {/* Header */}
                <h2 className="text-sm text-muted flex items-center justify-between mb-3">
                  September {year}
                  <span className="flex items-center gap-2 text-xs text-muted-foreground font-normal">
                    <span>Day</span>
                    <span className="border-l border-gray-400 h-4" />{" "}
                    <span>Week</span>
                  </span>
                </h2>

                {/* Calendar Grid */}
                <div className="calendar-grid grid gap-1 text-center">
                  {/* Days of Week */}
                  {["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"].map(
                    (d, index) => (
                      <div
                        key={`${d}-${index}`}
                        className="text-[10px] font-semibold text-muted-foreground"
                      >
                        {d}
                      </div>
                    )
                  )}

                  {/* Dates */}
                  {cells.map((d, i) =>
                    d ? (
                      <div
                        key={i}
                        onClick={() => setActive(d)}
                        className={`text-sm w-8 h-8 flex items-center justify-center rounded-full transition
                ${
                  d === active
                    ? "bg-[rgb(135,103,228)] text-white hover:cursor-pointer"
                    : "bg-transparent text-muted hover:cursor-pointer"
                }`}
                      >
                        {d}
                      </div>
                    ) : (
                      <div key={i} />
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Today Meetings */}
            <div className="mt-4 md:mt-0 lg:mt-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-surface">
                  Today Meetings
                </h2>
                <button className="text-sm font-medium text-primary rounded-md border text-primary border-primary hover:bg-gray-500/30 px-2 flex items-center gap-2">
                  + Meeting
                </button>
              </div>
              <div className="space-y-3">
                {meetings.map((meeting) => (
                  <div
                    key={meeting.id}
                    className="flex relative justify-between items-center bg-surface3 rounded-lg px-2 py-2"
                  >
                    {/* left line */}
                    <span className="absolute left-0 top-2 bottom-2 w-[3px] bg-[rgb(180,155,255)] rounded"></span>
                    {/* right line */}
                    <span className="absolute right-0 top-2 bottom-2 w-[3px] bg-[rgb(180,155,255)] rounded"></span>

                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-surface">
                        {meeting.title}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {meeting.subtitle}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">
                      {meeting.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
