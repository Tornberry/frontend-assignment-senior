import { FunctionComponent } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  NavLink
} from "react-router-dom";
import Intro from "./Intro";

import Task1 from "./task1";
import Task2 from "./task2";
import Task3 from "./task3";
import { ThemeProvider, useTheme } from "./task2/context/theme-context";
import Button from "./task2/components/Button";


const Menu: FunctionComponent = () => {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <nav className="menu">
      <NavLink to="/">Intro</NavLink>

      <NavLink to="/task/1">Task 1</NavLink>

      <NavLink to="/task/2">Task 2</NavLink>

      <NavLink to="/task/3">Task 3</NavLink>
    </nav>
  );
};

interface ContainerProps {
  children: React.ReactNode;
}

const Container: FunctionComponent<ContainerProps> = (props) => {
  return (
    <>
      <Menu />
      <main>{props.children}</main>
    </>
  );
};

interface TaskContainerProps {
  children: React.ReactNode;
}

const TaskContainer: FunctionComponent<TaskContainerProps> = (props) => {
  return <div className="task-container">{props.children}</div>;
};

const Task: FunctionComponent = () => {
  let { id } = useParams<{ id: string }>();

  switch (id) {
    case "1":
      return (
        <>
          <h1>Task 1 - Data Fetching and State Management</h1>
          <p className="task-description">
            <strong>Objective:</strong> Build a paginated user list with data fetched from an API. Implement the
            following:
            <br />
            <br />
            <p>&#8226; Fetch users from a mock API using the useFetch hook.</p>
            <p>&#8226; Allow filtering of users by their username.</p>
            <p>&#8226; Handle loading states and display an appropriate message when no users match the filter.</p>
            <p>&#8226; Write integration tests using ViTest.</p>
          </p>

          <TaskContainer>
            <Task1 />
          </TaskContainer>
        </>
      );
    case "2":
      return (
        <>
          <h1>Task 2 - Component Library Creation and Theming</h1>
          <p className="task-description">
            <strong>Objective:</strong> Create a set of reusable UI components (e.g., buttons, forms, cards).
            Implement a theming system that allows easy customization of the components. Ensure the components are
            well-documented and easily integrable into different projects.
            <br />
            <br />
            <p>&#8226; Develop a few core components, such as Button, Card, and Input. Ensure these components are
              accessible, responsive, and follow best practices in UI/UX design.</p>
            <p>&#8226; Implement a theming system that allows the components to be styled differently based on a theme
              (e.g., light mode, dark mode, or different brand colors).</p>
            <p>&#8226; Write unit tests for the components to ensure they function correctly. Consider edge cases, such
              as different screen sizes, input states, and accessibility requirements.</p>
          </p>
          <TaskContainer>
            <Task2 />
          </TaskContainer>
        </>
      );
    case "3":
      return (
        <>
          <h1>Task 3 - Advanced Form Handling and Validation</h1>
          <p className="task-description">
            <strong>Objective:</strong> Develop a multi-step form with advanced validation. Implement dynamic form
            fields
            that change based on user input. Provide clear feedback to the user at every step of the form process.
            <br />
            <br />
            <p>&#8226; Design a multi-step form that collects user data across several steps.</p>
            <p>&#8226; Include fields that appear or change based on previous inputs.</p>
            <p>&#8226; Ensure fields are validated as the user progresses through the form, providing immediate
              feedback. Display error messages clearly and concisely, highlighting the fields that need correction.</p>
            <p>&#8226; Consider using a state management library (e.g., Redux) if necessary.</p>
            <p>&#8226; Implement a loading state and disable form submission during validation.</p>
          </p>

          <TaskContainer>
            <Task3 />
          </TaskContainer>
        </>
      );
    default:
      return <Navigate to="/" />;
  }
};


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ThemeProvider>
    <BrowserRouter>
      <Routes>
        <Route
          path=""
          element={
            <Container>
              <Intro />
            </Container>
          }
        />
        <Route
          path="task/:id"
          element={
            <Container>
              <Task />
            </Container>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);
