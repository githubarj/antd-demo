import {
  Layout,
  Typography,
  Row,
  Col,
  Input,
  Button,
  Select,
  Table,
  Tag,
  Menu,
  Dropdown,
  Icon,
} from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function MyTable() {
  const { Header, Content } = Layout;
  const { Option } = Select;
  const { Search } = Input;
  const { Title } = Typography;

  const [tableData, setTableData] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:3000/patients")
      .then((response) => setTableData(response.data))
      .catch((err) => console.error(err));
  }, []);

  const menu = (
    <Menu>
      <Menu.Item key="1" style={{ display: "flex", alignItems: "center" }}>
        <Icon type="eye" style={{ color: "green" }} />
        View Patient
      </Menu.Item>
      <Menu.Item key="2" style={{ display: "flex", alignItems: "center" }}>
        <Icon type="form" style={{ color: "blue" }} />
        Edit patient details
      </Menu.Item>
      <Menu.Item key="3" style={{ display: "flex", alignItems: "center" }}>
        <Icon type="rest" style={{ color: "red" }} />
        Delete Patient
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "Patient No",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Patient Name",
      dataIndex: "name",
      key: "name",
      render: (nameObj) => `${nameObj.givenName}  ${nameObj.surname}`,
    },
    {
      title: "Registration Date",
      dataIndex: "registrationDate",
      key: "registrationDate",
    },
    {
      title: "Primary Contact",
      dataIndex: "primaryContact",
      key: "primaryContact",
    },
    {
      title: "Residence",
      dataIndex: "location",
      key: "residence",
      render: (locationObj) => `${locationObj.residence}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color;
        status.toLowerCase() == "active"
          ? (color = "green")
          : status.toLowerCase() == "inactive"
          ? (color = "red")
          : (color = "orange");

        return <Tag color={color}> {status} </Tag>;
      },
    },
    {
      title: "",
      key: "actions",
      render: () => (
        <Dropdown overlay={menu}>
          <Button>
            Actions <Icon type="down" />
          </Button>
        </Dropdown>
      ),
    },
  ];

  const navigate = useNavigate()
  function changeRoute () {
    navigate("/add-patient")
  }

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
            <div className="action-buttons">
              <Row type="flex" justify="space-between">
                <Col span={12} className="action-inputs">
                  <Select
                    defaultValue="Filter by Status"
                    style={{ width: "100%" }}
                  >
                    <Option value="jack">Active</Option>
                    <Option value="lucy">Inactive</Option>
                    <Option value="Yiminghe">Pending</Option>
                  </Select>
                  <Select style={{ width: "100%" }}></Select>
                  <Search placeholder="search patient"></Search>
                </Col>
                <Col className="action-inputs">
                  <Button
                    type="primary"
                    icon="user-add"
                    style={{ display: "flex", alignItems: "center" }}
                    onClick={changeRoute}
                  >
                    Add Patient
                  </Button>
                  <Button icon="file-pdf"></Button>
                  <Button icon="file-excel"></Button>
                </Col>
              </Row>
            </div>
            <div className="actual-table">
              <Table dataSource={tableData} columns={columns} />
            </div>
          </Content>
        </Layout>
      </div>
    </div>
  );
}

export default MyTable;
