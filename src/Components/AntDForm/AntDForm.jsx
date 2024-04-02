import {
  Form,
  Input,
  Select,
  Button,
  Divider,
  Upload,
  DatePicker,
  Row,
  Col,
} from "antd";
import moment from "moment";
import {
  bloodTypes,
  genders,
  kenyanCounties,
  maritalStatuses,
  nairobiConstituencies,
  occupations,
  prefix,
  religions,
  socialMedia,
  status,
  westlandsWards,
} from "../MyData/myData";
import axios from "axios";
import useFetchHook from "../Hooks/useFetchHook";


const  AntDForm =  (props) =>  {


  //check for id param
 console.log( props.patientID)
 


  let initialValues =  useFetchHook(`http://localhost:3000/patients${props.PatientID}`)
  console.log(initialValues)


  const { Option } = Select;
  const { getFieldDecorator } = props.form;

// TODO: add form auto-fill on route change, try passing with custom hooks and use navigate

  const prefixSelector = getFieldDecorator("prefix", {
    initialValue: "Mr",
  })(
    <Select style={{ width: 100 }}>
      {prefix.map((item, index) => (
        <Option key={index} value={item}>
          {item}
        </Option>
      ))}
    </Select>
  );

  function disabledDate(current) {
    // Can not select days before today
    return current && current >= moment().endOf("day");
  }



  
 

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      let formData;
      if (!err) {
        const {
          residence,
          county,
          constituency,
          ward,
          prefix,
          givenName,
          middleName,
          surname,
          dateOfBirth,
          years,
          ...rest
        } = values;

        formData = {
          ...rest,
          location: {
            residence,
            county,
            constituency,
            ward,
          },
          name: {
            prefix,
            givenName,
            middleName,
            surname,
          },
          age: {
            dateOfBirth,
            years,
          },
        };
        axios
          .post("http://localhost:3000/patients", formData)
          .then((res) => console.log(res))
          .catch((err) => console.error(err));
        console.log(formData);
      }
      
    });
  };

  const handleReset = () => {
    props.form.resetFields();
  };

  const rowEndColsLayout = {
    lg: 6,
    md: 8,
    sm: 12,
    xs: 24,
  };

  const rowStartColsLayout = {
    lg: 8,
    md: 8,
    sm: 12,
    xs: 24,
  };

  return (
    <Form layout="vertical" onSubmit={handleSubmit}>
      <Form.Item>
        <Button
          htmlType="button"
          type="danger"
          onClick={handleReset}
          style={{ float: "right" }}
        >
          Clear Form
        </Button>
      </Form.Item>

      <Form.Item label="Status" wrapperCol={{ ...rowEndColsLayout }}>
        {getFieldDecorator("status", {
          initialValue: "Active",
          rules: [
            {
              required: true,
              message: "Please select a status",
            },
          ],
        })(
          <Select>
            {status.map((item, index) => (
              <Option key={index}> {item} </Option>
            ))}
          </Select>
        )}
      </Form.Item>
      <Divider dashed>Basic Info</Divider>
      <Row gutter={[16, 16]}>
        <Col lg={18} md={24}>
          <Row gutter={[16, 16]}>
            <Col {...rowStartColsLayout}>
              <Form.Item label="Patient Name">
                {getFieldDecorator("givenName", {
                  rules: [
                    {
                      required: true,
                      message: "Please enter a Patient Name",
                    },
                  ],
                })(
                  <Input
                    addonBefore={prefixSelector}
                    style={{ width: "100%" }}
                    placeholder="Given Name"
                  />
                )}
              </Form.Item>
            </Col>

            <Col {...rowStartColsLayout}>
              <Form.Item label="middle name" className="hidden-label">
                {getFieldDecorator("middleName")(
                  <Input placeholder="Middle Name" />
                )}
              </Form.Item>
            </Col>

            <Col {...rowStartColsLayout}>
              <Form.Item label="surname" className="hidden-label">
                {getFieldDecorator("surname")(<Input placeholder="Surname" />)}
              </Form.Item>
            </Col>

            <Col {...rowStartColsLayout}>
              <Form.Item label="Alias Name">
                {getFieldDecorator("aliasName")(
                  <Input placeholder="Alias Name" />
                )}
              </Form.Item>
            </Col>

            <Col {...rowStartColsLayout}>
              <Form.Item label="Gender">
                {getFieldDecorator("gender", {
                  initialValue: "",
                  rules: [
                    {
                      required: true,
                      message: "Please select your gender!",
                    },
                  ],
                })(
                  <Select style={{ width: "100%" }}>
                    {genders.map((item, index) => (
                      <Option value={item} key={index}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>

            <Col {...rowStartColsLayout}>
              <Form.Item label="Blood Type">
                {getFieldDecorator("bloodType", {
                  initialValue: "Unknown",
                })(
                  <Select style={{ width: "100%" }}>
                    {bloodTypes.map((item, index) => (
                      <Option value={item} key={index}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
        </Col>

        <Col lg={6} md={8} sm={12}>
          <Form.Item label="Patient Image" className="hidden-label">
            {getFieldDecorator("patientImage", {
              valuePropName: "fileList",
            })(
              <Upload.Dragger name="files" action="/upload.do">
                +<p className="ant-upload-hint">Patient Image</p>
              </Upload.Dragger>
            )}
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col {...rowEndColsLayout}>
          <Form.Item label="Age">
            {getFieldDecorator("years")(<Input disabled />)}
          </Form.Item>
        </Col>

        <Col {...rowEndColsLayout}>
          <Form.Item label="Date of Birth">
            {getFieldDecorator("dateOfBirth", {
              rules: [
                {
                  type: "object",
                  required: true,
                  message: "Please select date of birth!",
                },
              ],
            })(
              <DatePicker
                style={{ width: "100%" }}
                format="YYYY-MM-DD"
                disabledDate={disabledDate}
              />
            )}
          </Form.Item>
        </Col>

        <Col {...rowEndColsLayout}>
          <Form.Item label="Marital Status">
            {getFieldDecorator("maritalStatus", {
              initialValue: "",
            })(
              <Select style={{ width: "100%" }}>
                {maritalStatuses.map((item, index) => (
                  <Option value={item} key={index}>
                    {item}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>
        </Col>

        <Col {...rowEndColsLayout}>
          <Form.Item label="ID No. /Passport No.">
            {getFieldDecorator("identify")(
              <Input placeholder="National/Millitary/Birth cert" />
            )}
          </Form.Item>
        </Col>

        <Col {...rowEndColsLayout}>
          <Form.Item label="Primary Contact">
            {getFieldDecorator("primaryContact", {
              rules: [
                {
                  required: true,
                  message: "Please input your primary contact!",
                },
              ],
            })(<Input placeholder="Phone" />)}
          </Form.Item>
        </Col>

        <Col {...rowEndColsLayout}>
          <Form.Item label="Residence">
            {getFieldDecorator("residence", {
              rules: [
                { required: true, message: "Please input your residence!" },
              ],
            })(<Input placeholder="Residence" />)}
          </Form.Item>
        </Col>

        <Col {...rowEndColsLayout}>
          <Form.Item label="Religion">
            {getFieldDecorator("religion", {
              initialValue: "Not Specified",
            })(
              <Select style={{ width: "100%" }}>
                {religions.map((item, index) => (
                  <Option value={item} key={index}>
                    {item}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>
        </Col>

        <Col {...rowEndColsLayout}>
          <Form.Item label="Nationality">
            {getFieldDecorator("nationality", {
              rules: [
                { required: true, message: "Please input your nationality!" },
              ],
            })(<Input placeholder="Natonality" />)}
          </Form.Item>
        </Col>

        <Col {...rowEndColsLayout}>
          <Form.Item label="Occupation">
            {getFieldDecorator("occupation")(
              <Select style={{ width: "100%" }} placeholder="select occupation">
                {occupations.map((item, index) => (
                  <Option value={item} key={index}>
                    {item}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>
        </Col>

        <Col {...rowEndColsLayout}>
          <Form.Item label="Knew Us Through">
            {getFieldDecorator("knewUsThrough")(
              <Select
                style={{ width: "100%" }}
                placeholder="Select Knew About Us Through"
              >
                {socialMedia.map((item, index) => (
                  <Option value={item} key={index}>
                    {item}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col {...rowEndColsLayout}>
          <Form.Item label="County">
            {getFieldDecorator("county")(
              <Select style={{ width: "100%" }} placeholder="Select County">
                {kenyanCounties.map((item, index) => (
                  <Option value={item} key={index}>
                    {item}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>
        </Col>

        <Col {...rowEndColsLayout}>
          <Form.Item label="Constituency">
            {getFieldDecorator("constituency")(
              <Select
                style={{ width: "100%" }}
                placeholder="Select Constituency"
              >
                {nairobiConstituencies.map((item, index) => (
                  <Option value={item} key={index}>
                    {item}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>
        </Col>

        <Col {...rowEndColsLayout}>
          <Form.Item label="Ward">
            {getFieldDecorator("ward")(
              <Select style={{ width: "100%" }} placeholder="Select Ward">
                {westlandsWards.map((item, index) => (
                  <Option value={item} key={index}>
                    {item}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>
        </Col>
      </Row>

      <Form.Item style={{ textAlign: "right" }}>
        <Button type="primary" htmlType="submit">
          Add Patient
        </Button>
      </Form.Item>
    </Form>
  );
}
export default Form.create()(AntDForm);
