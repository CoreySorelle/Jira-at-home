import WelcomeUser from "./WelcomeUser";
import CreateBoard from "./CreateBoard";
import ShowBoards from "./ShowBoards";

const Dashboard = () => {
    return (
        <>
            <WelcomeUser/>

            <h1>Dashboard</h1>

            <CreateBoard/>
            <ShowBoards/>

        </>
    );
  };
  
  export default Dashboard;