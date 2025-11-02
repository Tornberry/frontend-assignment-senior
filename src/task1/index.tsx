import { FC } from "react";
import "./index.scss";
import GitHubUsers from "./components/githubUsers";


const Task1: FC = () => {

  // Use this api endpoint to get a list of users
  // https://api.github.com/users

  return (
    <div className="dashboard">
      {/* show the loading state here */}
      {/* show the error if any here */}
      {/* show the input search here*/}

      {/** Loading, error and input are contained inside the GitHubUsers component */}
      <ul>
        <GitHubUsers />
      </ul>
    </div>
  );
};

export default Task1;