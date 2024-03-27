import {
  Form,
  Input,
  Select,
  Button,
  Divider,
  Upload,
  DatePicker,
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

function AntDForm(props) {
  const { Option } = Select;
  const { getFieldDecorator } = props.form;

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
    // Can not select days before today and today
    return current && current >= moment().endOf("day");
  }

  return (
    <Form layout="vertical" wrapperCol={{ span: 6 }}>
      <Form.Item label="Status">
        {getFieldDecorator("status", {
          initialValue: "Active",
          rules: [
            {
              required: true,
              message: "Please select a sttus",
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
      <div className="row-1">
        <div className="row-1-pt-1">
          <Form.Item label="Patient Name">
            {getFieldDecorator("patientName", {
              rules: [
                {
                  required: true,
                  message: "Please enter a Patient Name",
                },
              ],
            })(
              <>
                <Input
                  addonBefore={prefixSelector}
                  style={{ width: "100%" }}
                  placeholder="Given Name"
                />
                <Input placeholder="Middle Name" />
                <Input placeholder="Surname" />
              </>
            )}
          </Form.Item>

          <Form.Item label="Alias Name">
            {getFieldDecorator("aliasName")(<Input placeholder="Alias Name" />)}
          </Form.Item>

          <Form.Item label="Gender">
            {getFieldDecorator("gender", {
              initialValue: "",
              rules: [
                {
                  required: true,
                  message: "Please input your age!",
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
        </div>
        <Form.Item label="Patient Image">
          {getFieldDecorator("patientImage", {
            valuePropName: "fileList",
          })(
            <Upload.Dragger name="files" action="/upload.do">
              +<p className="ant-upload-hint">Patient Image</p>
            </Upload.Dragger>
          )}
        </Form.Item>
      </div>
      <div className="row-2">
        <Form.Item label="Age">
          {getFieldDecorator("age")(<Input disabled />)}
        </Form.Item>
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
              format="YYYY-MM-DD HH:mm:ss"
              disabledDate={disabledDate}
            />
          )}
        </Form.Item>
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
        <Form.Item label="ID No. /Passport No.">
          {getFieldDecorator("identify")(
            <Input placeholder="National/Millitary/Birth cert" />
          )}
        </Form.Item>
        <Form.Item label="Primary Contact">
          {getFieldDecorator("primaryContact", {
            rules: [
              { required: true, message: "Please input your primary contact!" },
            ],
          })(<Input placeholder="Phone" />)}
        </Form.Item>
        <Form.Item label="Residence">
          {getFieldDecorator("residence", {
            rules: [
              { required: true, message: "Please input your residence!" },
            ],
          })(<Input placeholder="Residence" />)}
        </Form.Item>
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
        <Form.Item label="Nationality">
          {getFieldDecorator("nationality", {
            rules: [
              { required: true, message: "Please input your nationality!" },
            ],
          })(<Input placeholder="Natonality" />)}
        </Form.Item>
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
        <Form.Item label="Constituency">
          {getFieldDecorator("constituency")(
            <Select style={{ width: "100%" }} placeholder="Select Constituency">
              {nairobiConstituencies.map((item, index) => (
                <Option value={item} key={index}>
                  {item}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
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
      </div>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Patient
        </Button>
      </Form.Item>
    </Form>
  );
}
export default Form.create()(AntDForm);
