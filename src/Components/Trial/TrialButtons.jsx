import { Button } from "antd";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function TrialButtons() {

  const navigate = useNavigate()
  function switchRoute (){
    navigate("table")
  }
  return (
    <div className="trial-buttons">
      <Button type="danger">Danger</Button>
      <Button>Default</Button>
      <Button type="primary">Primary</Button>
      <Button type="dashed">Dashed</Button>
      <Button type="link">Link</Button>

      <div>
        <Button type="primary" shape="circle" icon="search"></Button>
      </div>
      <Button type="primary" shape="circle">
        A
      </Button>
      <Button type="default" icon="search">
        Search
      </Button>

      <Button type="default">
        <FaCloudDownloadAlt />
        Download
      </Button>

      <Button type="primary" ghost onClick={switchRoute}>
        Navigate
      </Button>
      <Button type="default" ghost>
        Default Ghost
      </Button>

      <Button type="primary" delay={5}>
        Loading
      </Button>
    </div>
  );
}

export default TrialButtons;
