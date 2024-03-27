import { Button, Layout, Typography } from "antd";
import AntDForm from "../../Components/AntDForm/AntDForm";
import { useNavigate } from "react-router-dom";

function MyForm() {
  const { Header, Content } = Layout;
  const { Title } = Typography;
  const navigate = useNavigate();
  const navigateBack = () => {
    navigate(-1);
  };

  return (
    <div className=" table-container">
      <div className="table-container__content">
        <Layout>
          <Header className="navbar">
            <Title level={4} strong={false}>
              Patient Master Register
            </Title>
            <div className="nav-butns">
              
              <Button
                icon="arrow-left"
                default
                onClick={navigateBack}
                style={{ display: "flex", alignItems: "center" }}
              >
                Back
              </Button>
            </div>
          </Header>
          <hr />
          <Content className="table-main">
            <AntDForm  />
          </Content>
        </Layout>
      </div>
    </div>
  );
}

export default MyForm;
