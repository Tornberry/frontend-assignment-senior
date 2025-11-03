import { FC } from "react";
import "./index.scss";
import { GitHubUsers } from "./components/github-users";


const Task1: FC = () => {
  return (
    <div className="dashboard">
      {/** Loading, error and input are contained inside the GitHubUsers component */}
      <GitHubUsers />
    </div>
  );
};

export default Task1;