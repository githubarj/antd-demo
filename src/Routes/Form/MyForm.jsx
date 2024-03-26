import { Layout, Typography } from "antd";
import AntDForm from "../../Components/AntDForm/AntDForm";

function MyForm() {
  const { Header, Content } = Layout;
  const { Title } = Typography;

  return (
    <div className=" table-container">
      <div className="table-container__content">
        <Layout>
          <Header className="navbar">
            <Title level={4} strong={false}>
              Patient Master Register
            </Title>
          </Header>
          <hr />
          <Content className="table-main">
            <AntDForm/>
          </Content>
        </Layout>
      </div>
    </div>
  );
}

export default MyForm;
