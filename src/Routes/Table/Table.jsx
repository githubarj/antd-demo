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
  message,
  Modal,
} from "antd";
import { useNavigate } from "react-router-dom";
import useFetchHook from "../../Components/Hooks/useFetchHook";
import axios from "axios";
function MyTable() {
  const { Header, Content } = Layout;
  const { Option } = Select;
  const { Search } = Input;
  const { Title } = Typography;
  const { confirm } = Modal;


  const tableData = useFetchHook( "http://localhost:3000/patients" );


  const showConfirm = (record) => {
    confirm({
      title: 'Do you want to delete these patient?',
      content: 'This action is final and irreversible',
      okText: "Delete",
      okButtonProps: {
        type: 'danger', // Set the button type to danger
      },
      onOk() {
        axios.delete(`http://localhost:3000/patients/${record.id}`)
        .then(() => message.info("User deleted successfully"))
        .catch(err =>{ message.info(err?.message) 
          console.error(err)})
      },
      onCancel() {},
    });
  };

  function handleMenuClick(e, record){
    switch(e.key){
      case `1`: 
        message.info("View page not yet created")
        break;
      case `2`:
        message.info("Wait a minute redirecting...")
        break;
      case `3`:
        showConfirm(record)
        break;
    }


    console.log(e.key)
  }

  const menu = (record) =>  (
    <Menu onClick={(e) => handleMenuClick(e, record)}>
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
      render: (record) => (
        <Dropdown overlay={() => menu(record)}>
          <Button>
            Actions <Icon type="down" />
          </Button>
        </Dropdown>
      ),
    },
  ];

  const navigate = useNavigate();
  function changeRoute() {
    navigate("/add-patient");
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
              <Table
                dataSource={tableData ?? []}
                columns={columns}
                pagination={{ pageSize: 10 }}
                scroll={{ y: 350 }}
                loading={!tableData ? true : false}
              />
            </div>
          </Content>
        </Layout>
      </div>
    </div>
  );
}

export default MyTable;
